let globalState = {
	intersecting: false,
	selecao: null,
	atual: 'portas'
}

let utils = {

	transforms: {
		'portas': {
			'entrada': {x:0,y:90,z:0}
		},
		'entrada' : {
			'sala': {x:0,y:-80,z:0},
			'portas': {x:0,y:-80,z:0},
			'reuniao': {x:0,y:-150,z:0},
			'descompressao': {x:0,y:90,z:0}
		},
		'reuniao': {
			'entrada': {x:0,y:90,z:0}
		},
		'descompressao': {
			'entrada': {x:0,y:140,z:0}
		},
		'salinha': {
			'sala': {x:0,y:0,z:0}
		},
		'sala' : {
			'entrada': {x:0,y:100,z:0},
			'meio': {x:0,y:110,z:0},
			'salinha': {x:0,y:50,z:0}
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
		'portas':[{id:'#portas-entrada', position:{x:65,y:-3,z:9}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'entrada'}],
		'entrada':[{id:'#entrada-sala', position:{x:-3,y:-3,z:-91}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'sala'}, {id:'#entrada-portas', position:{x:80,y:-6,z:0}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'portas'}, {id:'#entrada-reuniao', position:{x:29,y:-3,z:-25}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'reuniao'}, {id:'#entrada-descompressao', position:{x:-17,y:-4,z:-36}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'descompressao'}],
		'reuniao':[{id:'#reuniao-entrada', position:{x:15,y:-3,z:-2}, rotation: {x:0,y:-74,z:0}, tipo:'teleport', destino:'entrada'}],
		'descompressao':[{id:'#descompressao-entrada', position:{x:33,y:0,z:33}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'entrada'}],
		'salinha':[{id:'#salinha-sala', position:{x:15,y:-1,z:2}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'sala'}],
		'sala':[{id:'#sala-entrada', position:{x:14,y:7,z:-106}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'entrada'},{id:'#sala-meio', position:{x:-74,y:8,z:9}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'meio'},{id:'#sala-salinha', position:{x:20,y:3,z:-56}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'salinha'}],
		'meio':[{id:'#meio-fundos', position:{x:80,y:-6,z:-6}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'fundos'}, {id:'#meio-sala', position:{x:-78,y:-6,z:33}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'sala'}],
		'fundos':[{id:'#fundos-meio', position:{x:-78,y:27,z:38}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'meio'}]
	},

	initScene: function(initialRotation) {
		const initialName = globalState.atual;

		// Inicializa o domo e a rotação da câmera
		let domoInicial = document.querySelector(`#domo-${initialName}`);
		// domoInicial.setAttribute('position', {x: 0, y: 0, z: 0});
		domoInicial.setAttribute('visible', true);
		document.querySelector("#camera-rig").setAttribute('rotation', initialRotation)

		// Inicializa os pinpoints
		utils.atualizarPinPoints(initialName);
	},

	atualizarPinPoints: function(nomeDomoNovo) {

		// Remove os pinpoints antigos
		document.querySelectorAll('.pinpoint').forEach(elem => elem.remove());

		// Cria os pinpoints novos
		utils.pinpoints[nomeDomoNovo].forEach(pinpoint => {

			if (pinpoint.tipo == 'teleport') {

				let attributes = [
					{'id':pinpoint.id},
			    	{'destino':pinpoint.destino},
					{'id':pinpoint.id},
					{'position':pinpoint.position},
					{'rotation':pinpoint.rotation},
					{'cursor-listener':''},
					{'class':'clickable pinpoint'},
					{'src':'#marker'},
					{'material':'opacity: 0.8; transparent: true; depthTest: false; depthWrite: false; fog: false; shader: flat'},
					{'geometry':'radius: 2'},
					{'scale':''}
			];

				let newPinpointDOMelem = utils.createElement('a-circle',attributes);

				// console.log(newPinpointDOMelem);

				document.querySelector('a-scene').append(newPinpointDOMelem);

			}
		});
	},

	createElement: function(tag, attributes) {
		let node = document.createElement('a-circle');

		if (attributes && attributes.length) { // Verifica se attributes é realmente uma lista

			attributes.forEach((attribute) => {

				// console.log(attribute);

				for (let name in attribute) {
					// Adiciona cada atributo
					node.setAttribute(name, attribute[name]);
				}

			});
		}

		return node;
	},

	trocarDomo: function (nomeDomoAtual, nomeDomoNovo) {

		// Pega os objetos através da referência
		let domoAtual = document.querySelector(`#domo-${nomeDomoAtual}`);
		let domoNovo = document.querySelector(`#domo-${nomeDomoNovo}`);

		console.log("Saindo de: ", nomeDomoAtual, domoAtual.object3D);
		console.log("Indo para: ", nomeDomoNovo, domoNovo.object3D);

		// Faz as transformações necessárias na câmera para o novo domo
		// domoNovo.setAttribute('position', {x: 0, y: 0, z: 0});
		domoNovo.setAttribute('visible', true);
		document.querySelector("#camera-rig").setAttribute('rotation',utils.transforms[nomeDomoAtual][nomeDomoNovo])

		// Tira o domo antigo do caminho
		// domoAtual.setAttribute('position', {x: 400, y: 0, z: 0});
		domoAtual.setAttribute('visible', false);

		// Atualiza os pinpoints e botões de navegação
		utils.atualizarPinPoints(nomeDomoNovo);

		globalState.selecao = null;
		globalState.atual = nomeDomoNovo;

		console.log("Domo novo: ", domoNovo.object3D);
		console.log("Domo antigo: ", domoAtual.object3D);

		console.log("troquei");
	}
}

AFRAME.registerComponent('cursor-listener', {
  init: function () {

  	this.el.addEventListener('click', function(evt) {
  		console.log(this);
    	globalState.selecao = this.getAttribute("destino");

    	utils.trocarDomo(globalState.atual, globalState.selecao);
  	});

    this.el.addEventListener('raycaster-intersected', function (evt) {
    	globalState.selecao = this.getAttribute("destino");
		
    	globalState.intersecting = true;

		this.setAttribute('material', 'opacity', 1);
		this.setAttribute('scale', '1.2 1.2 1.2');
		
		// document.querySelector("#texticulo").object3D.visible = true;
    });

    this.el.addEventListener('raycaster-intersected-cleared', function (evt) {
    	globalState.intersecting = false;

		this.setAttribute('material', 'opacity', 0.8);
		this.setAttribute('scale', '1 1 1');
		document.querySelector("#texticulo").object3D.visible = false;
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

AFRAME.registerComponent('scene', {
	init: function () {
		this.el.addEventListener('loaded', function (evt) {
			utils.initScene({x: 0, y: -90, z: 0});
			// utils.initScene({x: 0, y: 110, z: 0});
	    });
	}
});