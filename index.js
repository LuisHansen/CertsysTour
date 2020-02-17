let globalState = {
	intersecting: false,
	selecao: null,
	atual: 'portas'
}

let utils = {

	cameraTransforms: {
		'portas': {
			'entrada': {x:0,y:90,z:0},
			'recepcao13': {x:0,y:0,z:0},
			'entrada11': {x:0,y:90,z:0}
		},
		'entrada11': {
			'portas': {x:0,y:-100,z:0},
			'recepcao11': {x:0,y:180,z:0}
		},
		'recepcao11': {
			'corredor11': {x:0,y:180,z:0},
			'entrada11': {x:0,y:100,z:0}
		},
		'corredor11': {
			'reuniao11': {x:0,y:130,z:0},
			'sala11': {x:0,y:0,z:0},
			'recepcao11': {x:0,y:170,z:0}
		},
		'reuniao11': {
			'sala11': {x:0,y:-30,z:0}
		},
		'sala11': {
			'corredor11': {x:0,y:150,z:0},
			'salao11': {x:0,y:0,z:0},
			'augusto11': {x:0,y:100,z:0}
		},
		'augusto11': {
			'sala11': {x:0,y:0,z:0}
		},
		'salao11': {
			'sala11': {x:0,y:0,z:0}
		},
		'recepcao13': {
			'portas': {x:0,y:-100,z:0},
			'sala13': {x:0,y:190,z:0}
		},
		'sala13': {
			'corredor13': {x:0,y:-230,z:0},
			'recepcao13': {x:0,y:0,z:0}
		},
		'corredor13': {
			'sala13': {x:0,y:180,z:0},
			'descompressao13': {x:0,y:-90,z:0}
		},
		'descompressao13': {
			'corredor13': {x:0,y:120,z:0}
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
			'sala': {x:0,y:-120,z:0}
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
		'portas':[
			{id:'#portas-entrada', position:{x:65,y:-3,z:9}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'entrada'},
			{id:'#portas-recepcao13', position:{x:65,y:-3,z:-19}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'recepcao13'},
			{id:'#portas-entrada11', position:{x:37,y:-3,z:-50}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'entrada11'},
			{id:'#infoElevador', text:'A Certsys esta dividida em dois andares! Pegue o elevador para conhecer o 11o andar!', wrapCount: 15, position:{x:23,y:-3,z:-48}, rotation: {x:0,y:0,z:0}, tipo:'info'}
		],
		
		'recepcao13':[
			{id:'#recepcao13-portas', position:{x:24,y:-3,z:33}, rotation: {x:0,y:180,z:0}, tipo:'teleport', destino:'portas'},
			{id:'#recepcao13-sala13', position:{x:-78,y:-3,z:-22}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'sala13'}
		],

		'sala13':[
			{id:'#sala13-recepcao13', position:{x:-78,y:-3,z:-9}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'recepcao13'},
			{id:'#sala13-corredor13', position:{x:-5,y:-3,z:-73}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'corredor13'}
		],

		'corredor13':[
			{id:'#corredor13-sala13', position:{x:-68,y:-3,z:52}, rotation: {x:0,y:150,z:0}, tipo:'teleport', destino:'sala13'},
			{id:'#corredor13-descompressao13', position:{x:93,y:-3,z:-30}, rotation: {x:0,y:-70,z:0}, tipo:'teleport', destino:'descompressao13'}
		],

		'descompressao13':[
			{id:'#descompressao13-corredor13', position:{x:54,y:-3,z:-3}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'corredor13'},
		],

		'entrada':[
			{id:'#entrada-sala', position:{x:-3,y:-3,z:-91}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'sala'},
			{id:'#entrada-portas', position:{x:80,y:-6,z:0}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'portas'},
			{id:'#entrada-reuniao', position:{x:29,y:-3,z:-25}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'reuniao'},
			{id:'#entrada-descompressao', position:{x:-17,y:-4,z:-36}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'descompressao'}
		],

		'reuniao':[
			{id:'#reuniao-entrada', position:{x:15,y:-3,z:-2}, rotation: {x:0,y:-74,z:0}, tipo:'teleport', destino:'entrada'}
		],

		'descompressao':[
			{id:'#descompressao-entrada', position:{x:35,y:0,z:-34}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'entrada'}
		],

		'salinha':[
			{id:'#salinha-sala', position:{x:15,y:-1,z:2}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'sala'}
		],

		'sala':[
			{id:'#sala-entrada', position:{x:14,y:7,z:-106}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'entrada'},
			{id:'#sala-meio', position:{x:-74,y:8,z:9}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'meio'},
			{id:'#sala-salinha', position:{x:20,y:3,z:-56}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'salinha'}
		],

		'meio':[
			{id:'#meio-fundos', position:{x:80,y:-6,z:-6}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'fundos'},
			{id:'#meio-sala', position:{x:-78,y:-6,z:33}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'sala'}
		],

		'fundos':[
			{id:'#fundos-meio', position:{x:-78,y:27,z:38}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'meio'}
		],

		'entrada11':[
			{id:'#entrada11-portas', position:{x:-50,y:5,z:35}, rotation: {x:0,y:180,z:0}, tipo:'teleport', destino:'portas'},
			{id:'#entrada11-recepcao11', position:{x:-70,y:5,z:2}, rotation: {x:0,y:90,z:0}, tipo:'teleport', destino:'recepcao11'}
		],

		'recepcao11':[
			{id:'#recepcao11-corredor11', position:{x:26,y:-9,z:59}, rotation: {x:0,y:180,z:0}, tipo:'teleport', destino:'corredor11'},
			{id:'#recepcao11-entrada11', position:{x:-36,y:-9,z:-67}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'entrada11'}
		],

		'corredor11':[
			{id:'#corredor11-reuniao11', position:{x:58,y:5,z:8}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'reuniao11'},
			{id:'#corredor11-sala11', position:{x:90,y:0,z:-19}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'sala11'},
			{id:'#corredor11-recepcao11', position:{x:-44,y:5,z:-55}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'recepcao11'}
		],

		'reuniao11':[
			{id:'#reuniao11-sala11', position:{x:24,y:0,z:-12}, rotation: {x:0,y:-70,z:0}, tipo:'teleport', destino:'sala11'},
		],

		'sala11':[
			{id:'#sala11-corredor11', position:{x:69,y:0,z:-47}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'corredor11'},
			{id:'#sala11-salao11', position:{x:-12,y:0,z:76}, rotation: {x:0,y:180,z:0}, tipo:'teleport', destino:'salao11'},
			{id:'#sala11-augusto11', position:{x:12,y:0,z:-67}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'augusto11'}
		],

		'augusto11':[
			{id:'#augusto11-sala11', position:{x:60,y:0,z:-5}, rotation: {x:0,y:-90,z:0}, tipo:'teleport', destino:'sala11'},
		],

		'salao11':[
			{id:'#salao11-sala11', position:{x:37,y:4,z:-86}, rotation: {x:0,y:0,z:0}, tipo:'teleport', destino:'sala11'},
		]
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
					{'tipo': 'teleport'},
			    	{'destino':pinpoint.destino},
					{'position':pinpoint.position},
					{'rotation':pinpoint.rotation},
					{'cursor-listener':''},
					{'class':'clickable pinpoint'},
					{'src':'#marker'},
					{'material':'opacity: 0.8; transparent: true; depthWrite: false; fog: false; shader: flat'},
					{'geometry':'radius: 2.5'},
					{'scale':''}
			];

				let newPinpointDOMelem = utils.createElement('a-circle',attributes);

				// console.log(newPinpointDOMelem);

				document.querySelector('a-scene').append(newPinpointDOMelem);

			} else if (pinpoint.tipo == 'info') {

				let attributesText = [
					{'id':`${pinpoint.id}-text`},
					{'geometry':'primitive: plane; height: auto; width: auto'},
					{'material':'color: blue; transparent: false; visible: false'},
					{'text':`width: 4; wrapCount:${pinpoint.wrapCount}; value:${pinpoint.text}; zOffset: 0.05`},
					{'visible': 'false'},
					{'scale':'5 5 5'}
				];

				let attributesMarker = [
					{'id':pinpoint.id},
					{'tipo': 'info'},
					{'position':pinpoint.position},
					{'rotation':pinpoint.rotation},
					{'cursor-listener':''},
					{'class':'clickable pinpoint'},
					{'src':'#info'},
					{'material':'opacity: 0.8; transparent: true; depthTest: false; depthWrite: false; fog: false; shader: flat'},
					{'geometry':'radius: 2.5'},
					{'scale':''}
				];

				let newPinpointMarker = utils.createElement('a-circle',attributesMarker);
				let newPinpointText = utils.createElement('a-entity',attributesText);

				newPinpointMarker.append(newPinpointText);

				document.querySelector('a-scene').append(newPinpointMarker);

			}
		});
	},

	createElement: function(tag, attributes) {
		let node = document.createElement(tag);

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

		// console.log("Saindo de: ", nomeDomoAtual, domoAtual.object3D);
		// console.log("Indo para: ", nomeDomoNovo, domoNovo.object3D);

		// Faz as transformações necessárias na câmera para o novo domo
		// domoNovo.setAttribute('position', {x: 0, y: 0, z: 0});
		domoNovo.setAttribute('visible', true);
		document.querySelector("#camera-rig").setAttribute('rotation',utils.cameraTransforms[nomeDomoAtual][nomeDomoNovo])

		// Tira o domo antigo do caminho
		// domoAtual.setAttribute('position', {x: 400, y: 0, z: 0});
		domoAtual.setAttribute('visible', false);

		// Atualiza os pinpoints e botões de navegação
		utils.atualizarPinPoints(nomeDomoNovo);

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
  		// console.log("Evento: ", evt);
  		if (evt.target.getAttribute('tipo') == 'teleport') {

	    	globalState.selecao = this.getAttribute("destino");

	    	utils.trocarDomo(globalState.atual, globalState.selecao);

	    }
  	});

    this.el.addEventListener('raycaster-intersected', function (evt) {

		this.setAttribute('material', 'opacity', 1);
		this.setAttribute('scale', '1.2 1.2 1.2');

  		if (evt.target.getAttribute('tipo') == 'teleport') {

	    	globalState.selecao = this.getAttribute("destino");
			
	    	globalState.intersecting = true;

		} else if(evt.target.getAttribute('tipo') == 'info') {
			evt.target.setAttribute('material', 'visible', 'false');
			evt.target.children[0].setAttribute('material', 'visible', 'true');
			evt.target.children[0].object3D.visible = true;
		}

    });

    this.el.addEventListener('raycaster-intersected-cleared', function (evt) {

		this.setAttribute('material', 'opacity', 0.8);
		this.setAttribute('scale', '1 1 1');

    	if (evt.target.getAttribute('tipo') == 'teleport') {

	    	globalState.intersecting = false;

		} else if(evt.target.getAttribute('tipo') == 'info') {
			evt.target.setAttribute('material', 'visible', 'true');
			evt.target.children[0].object3D.visible = false;
			evt.target.children[0].setAttribute('material', 'visible', 'false');
		}

    });

  }
});

AFRAME.registerComponent('controls', {
  init: function () {

  	this.el.addEventListener('controllerconnected', function (evt) {
		document.querySelector("#fuse").remove();
  		// document.querySelector("#debug").setAttribute('value', "no fuse");

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