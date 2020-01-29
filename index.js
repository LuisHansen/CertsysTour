let globalState = {
	intersecting: false,
	selecao: null,
	atual: 'entrada'
}

let utils = {

	transforms: {
		'entrada' : {
			'sala': {x:0,y:-80,z:0}
		},
		'sala' : {
			'entrada': {x:0,y:100,z:0},
			'meio': {x:0,y:110,z:0}
		},
		'meio' : {
			'sala': {x:0,y:-60,z:0},
			'fundos': {x: 0, y: 140, z: 0}
		},
		'fundos' : {
			'meio': {x: 0, y: 130, z: 0}
		}
	},

	pinpoints: {
		'entrada':['#entrada-sala'],
		'sala':['#sala-entrada','#sala-meio'],
		'meio':['#meio-fundos', '#meio-sala'],
		'fundos':['#fundos-meio']
	},

	initScene: function(initialRotation) {
		const initialName = globalState.atual;

		// Inicializa o domo e a rotação da câmera
		let domoInicial = document.querySelector(`#domo-${initialName}`);
		domoInicial.setAttribute('position', {x: 0, y: 0, z: 0});
		document.querySelector("#camera-rig").setAttribute('rotation', initialRotation)

		// Inicializa os pinpoints
		utils.pinpoints[initialName].forEach(pinpoint => {
			document.querySelector(pinpoint).setAttribute('visible', true);
		});
	},

	atualizarPinPoints: function(nomeDomoAtual, nomeDomoNovo) {

		// Disable the old ones
		utils.pinpoints[nomeDomoAtual].forEach(pinpoint => {
			document.querySelector(pinpoint).setAttribute('visible', false);
		});

		// Enable the new ones
		utils.pinpoints[nomeDomoNovo].forEach(pinpoint => {
			document.querySelector(pinpoint).setAttribute('visible', true);
		});
	},

	trocarDomo: function (nomeDomoAtual, nomeDomoNovo) {

		// Pega os objetos através da referência
		let domoAtual = document.querySelector(`#domo-${nomeDomoAtual}`);
		let domoNovo = document.querySelector(`#domo-${nomeDomoNovo}`);

		// console.log("Saindo de: ", nomeDomoAtual, domoAtual.object3D);
		// console.log("Indo para: ", nomeDomoNovo, domoNovo.object3D);

		// Faz as transformações necessárias na câmera para o novo domo
		domoNovo.setAttribute('position', {x: 0, y: 0, z: 0});
		document.querySelector("#camera-rig").setAttribute('rotation',utils.transforms[nomeDomoAtual][nomeDomoNovo])

		// Tira o domo antigo do caminho
		domoAtual.setAttribute('position', {x: 400, y: 0, z: 0});

		// Atualiza os pinpoints e botões de navegação
		utils.atualizarPinPoints(nomeDomoAtual, nomeDomoNovo);

		globalState.selecao = null;
		globalState.atual = nomeDomoNovo;

		// console.log("Domo novo: ", domoNovo.object3D);
		// console.log("Domo antigo: ", domoAtual.object3D);

		// console.log("troquei");
	}
}

AFRAME.registerComponent('cursor-listener', {
  init: function () {

  	this.el.addEventListener('click', function(evt) {
    	globalState.selecao = this.getAttribute("destino");

    	utils.trocarDomo(globalState.atual, globalState.selecao);

  	});

    this.el.addEventListener('raycaster-intersected', function (evt) {
    	if (this.getAttribute("visible")) {

	    	globalState.selecao = this.getAttribute("destino");
    		
	    	globalState.intersecting = true;

			this.setAttribute('material', 'opacity', 1);
			this.setAttribute('scale', '1.2 1.2 1.2');
			
			document.querySelector("#texticulo").object3D.visible = true;
		}
    });

    this.el.addEventListener('raycaster-intersected-cleared', function (evt) {
    	if (this.getAttribute("visible")) {

	    	globalState.intersecting = false;

			this.setAttribute('material', 'opacity', 0.8);
			this.setAttribute('scale', '1 1 1');
			document.querySelector("#texticulo").object3D.visible = false;
		}
    });

  }
});

AFRAME.registerComponent('controls', {
  init: function () {

  	if (this.el.sceneEl.systems['tracked-controls-webvr'].controllers.length || this.el.sceneEl.systems['tracked-controls-webxr'].controllers.length) {

		document.querySelector("#fallback").setAttribute('enabled', false);
  	} 
  // 	else {

  // 		console.log("vou remover o controle");
  // 		document.querySelector("#debug").setAttribute('value', "vou remover o controle");

		// document.querySelector("#controlers").setAttribute('enabled', false);
  // 	}

  	this.el.addEventListener('controllerconnected', function (evt) {
  		document.querySelector("#debug").setAttribute('value', "disable");
		document.querySelector("#fallback").remove();
		document.querySelector("#fallback2").setAttribute('active', false);
		document.querySelector("#fallback2").remove();
		document.querySelector("#wtf").setAttribute('active', true);
  	});

    this.el.addEventListener('triggerdown', function (evt) {
    	if (globalState.intersecting) {
			utils.trocarDomo(globalState.atual, globalState.selecao);
    	}
    });

  }
});

AFRAME.registerComponent('dome', {

	init: function () {
		// utils.initScene({x: 0, y: 0, z: 0});
		utils.initScene({x: 0, y: 110, z: 0});
	}

});