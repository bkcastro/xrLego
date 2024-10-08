import ThreeMeshUI from 'three-mesh-ui';
import * as THREE from 'three';

const selectedAttributes = {
  offset: 0.002,
  backgroundOpacity: 0.7,
  backgroundColor: new THREE.Color(0x777777),
  fontColor: new THREE.Color(0x222222)
};

const hoveredStateAttributes = {
  state: 'hovered',
  attributes: {
    offset: 0.002,
    backgroundColor: new THREE.Color(0x999999),
    backgroundOpacity: 0.3,
    fontColor: new THREE.Color(0xffffff)
  },
};

const idleStateAttributes = {
  state: 'idle',
  attributes: {
    offset: 0.002,
    backgroundColor: new THREE.Color(0x666666),
    backgroundOpacity: 0.5,
    fontColor: new THREE.Color(0xffffff)
  },
};

const legoBuilds = [
  {
    name: 'Car',
    image: 'images/Car.png',
    file: 'models/car.ldr_Packed.mpd',
  },
  {
    name: 'Radar Truck',
    image: 'images/Radar Truck.png',
    file: 'models/889-1-RadarTruck.mpd_Packed.mpd',
  },
  {
    name: 'Trailer',
    image: 'images/Trailer.png',
    file: 'models/4838-1-MiniVehicles.mpd_Packed.mpd',
  },
  {
    name: 'Bulldozer',
    image: 'images/Bulldozer.png',
    file: 'models/4915-1-MiniConstruction.mpd_Packed.mpd',
  },
  {
    name: 'Helicopter',
    image: 'images/Helicopter.png',
    file: 'models/4918-1-MiniFlyers.mpd_Packed.mpd',
  },
  {
    name: 'X-Wing mini',
    image: 'images/X-Wing mini.png',
    file: 'models/30051-1-X-wingFighter-Mini.mpd_Packed.mpd',
  },
  {
    name: 'AT-ST mini',
    image: 'images/AT-ST mini.png',
    file: 'models/30054-1-AT-ST-Mini.mpd_Packed.mpd',
  },
  {
    name: 'Mini Colosseum',
    image: 'images/Mini Colosseum.png',
    file: 'models/Mini-Colosseum.mpd_Packed.mpd',
  },
  {
    name: 'Taipei',
    image: 'images/Taipei.png',
    file: 'models/Taipei.mpd_Packed.mpd',
  },
  {
    name: 'London Bus',
    image: 'images/London Bus.png',
    file: 'models/LondonBus.mpd_Packed.mpd',
  }
];

export default class xrLegoMainUI extends THREE.Group {
  constructor() {
    super();

    // Make the body  
    const body = new ThreeMeshUI.Block({
      padding: 0.1,
      height: 1,
      width: 1,
      backgroundOpacity: 0.0,
      justifyContent: 'center',
      contentDirection: 'column',
      fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
      fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png'
    });

    body.userData = {
      type: 'ui_handle'
    };

    makeTitle(body);
    makeLegoViewer(body);
    makeLegoControler(body);

    body.scale.multiplyScalar(2 / 5);
    this.add(body);
  }

  update(camera) {

  }
}

function makeTitle(body) {

  const titleContianer = new ThreeMeshUI.Block({
    height: .27,
    width: 1,
    backgroundOpacity: 0.5,
    justifyContent: 'center',
    contentDirection: 'row',
    fontColor: new THREE.Color(0xf0fc44),
  });

  titleContianer.set({
    borderRadius: [0, 0.15, 0, 0],
    borderWidth: 0.01,
    borderColor: new THREE.Color(0.4 + 0.4 * Math.sin(Date.now() / 20), 0.5, 1),
    borderOpacity: 1
  });

  const titleText = new ThreeMeshUI.Text({
    content: 'xrBrickViewer',
    fontSize: 0.1,
  });
  titleContianer.add(titleText);

  body.add(titleContianer);

}

function makeLegoViewer(body) {

  const container = new ThreeMeshUI.Block({
    padding: 0,
    width: 1,
    backgroundOpacity: 0.8,
    backgroundColor: new THREE.Color(0xc9c9c9),
    justifyContent: 'space-around',
    contentDirection: "row",
    fontFamily: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json',
    fontTexture: 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png'
  })

  for (let i = 0; i < 2; i++) {

    const row = new ThreeMeshUI.Block({
      padding: 0.02,
      height: 0.3 / 2 * (Math.round(legoBuilds.length / 2)) + 0.25,
      backgroundOpacity: 0.0,
      justifyContent: 'space-around',
    })

    for (let j = 0; j < legoBuilds.length / 2; j++) {

      const card = new ThreeMeshUI.Block({
        width: .4,
        justifyContent: 'start',
        contentDirection: "row",
        backgroundOpacity: 0.0,
        fontSize: 0.09,
      })

      const index = i * (Math.round(legoBuilds.length / 2)) + j

      if (index < legoBuilds.length) {

        const leftSubBlock = new ThreeMeshUI.Block({
          height: 0.3 / 2,
          width: 0.3 / 2,
          textAlign: "left",
          justifyContent: "end",
        });

        const rightSubBlock = new ThreeMeshUI.Block({
          width: 0.28,
          height: 0.3 / 2,
          padding: 0.02 / 2,
          justifyContent: "center",
          textAlign: "left",
          backgroundOpacity: 0.2,
        });

        rightSubBlock.add(
          new ThreeMeshUI.Text({
            content: "" + legoBuilds[index].name,
            fontSize: 0.05,
          }),
        )

        rightSubBlock.setupState({
          state: 'selected',
          attributes: selectedAttributes,
          onSet: () => {

            if (window.guiData && window.reloadObject) {
              window.guiData.modelFileName = legoBuilds[index].file;
              window.reloadObject();

              //count.set( { content: String( window.guiData.buildingStep + '/' + window.model.userData.numBuildingSteps-1 ) } );
            }
          }
        });

        rightSubBlock.setupState(hoveredStateAttributes);
        rightSubBlock.setupState(idleStateAttributes);
        window.objsToTest.push(rightSubBlock);

        card.add(leftSubBlock, rightSubBlock);

        new THREE.TextureLoader().load(legoBuilds[index].image, (texture) => {
          leftSubBlock.set({
            backgroundTexture: texture,
          })
        })
      }

      row.add(card);
    }

    container.add(row);
  }
  body.add(container);
}

function makeLegoControler(body) {
  const container = new ThreeMeshUI.Block({
    height: .27,
    width: 1,
    backgroundOpacity: 0.5,
    justifyContent: 'center',
    contentDirection: 'row',
    fontColor: new THREE.Color('red'),
  });

  container.set({
    borderRadius: [0, 0, 0, 0.15],
    borderWidth: 0.01,
    borderColor: new THREE.Color(0.4 + 0.4 * Math.sin(Date.now() / 500), 0.5, 1),
    borderOpacity: 1
  });

  //

  const countContainer = new ThreeMeshUI.Block({
    width: 0.25,
    height: 0.15,
    justifyContent: 'center',
    offset: 0.01,
    backgroundOpacity: 0.0,
    borderOpacity: 0.0,
  });

  const count = new ThreeMeshUI.Text({
    content: '7/7',  // default is car so just use that 
    fontSize: 0.07,
    fontColor: new THREE.Color("white")
  });

  // 

  const buttonNext = new ThreeMeshUI.Block({
    width: 0.28,
    height: 0.15,
    justifyContent: 'center',
    offset: 0.05,
    margin: 0.02,
    borderRadius: 0.075,
    backgroundColor: new THREE.Color(0xfa56fc)
  });

  const buttonPrevious = new ThreeMeshUI.Block({
    width: 0.28,
    height: 0.15,
    justifyContent: 'center',
    offset: 0.05,
    margin: 0.02,
    borderRadius: 0.075,
    backgroundColor: new THREE.Color(0x51db88)
  });

  // Add text to buttons

  buttonNext.add(
    new ThreeMeshUI.Text({ content: 'next' })
  );

  buttonPrevious.add(
    new ThreeMeshUI.Text({ content: 'previous' })
  );

  // Create states for the buttons.
  // In the loop, we will call component.setState( 'state-name' ) when mouse hover or click

  const selectedAttributes = {
    offset: 0.02,
    backgroundColor: new THREE.Color(0x777777),
    fontColor: new THREE.Color(0x222222)
  };

  buttonNext.setupState({
    state: 'selected',
    attributes: selectedAttributes,
    onSet: () => {

      if (window.model) {
        window.guiData.buildingStep = (window.guiData.buildingStep + 1) % window.model.userData.numBuildingSteps;
        count.set({ content: String(window.guiData.buildingStep + '/' + (window.model.userData.numBuildingSteps - 1)) });
        window.updateObjectsVisibility();
      }
    }
  });

  buttonNext.setupState(hoveredStateAttributes);
  buttonNext.setupState(idleStateAttributes);

  //

  buttonPrevious.setupState({
    state: 'selected',
    attributes: selectedAttributes,
    onSet: () => {

      if (window.model && window.guiData.buildingStep > 0) {
        window.guiData.buildingStep = (window.guiData.buildingStep - 1) % window.model.userData.numBuildingSteps;
        count.set({ content: String(window.guiData.buildingStep + '/' + (window.model.userData.numBuildingSteps - 1)) });
        window.updateObjectsVisibility();
      }
    }
  });

  buttonPrevious.setupState(hoveredStateAttributes);
  buttonPrevious.setupState(idleStateAttributes);

  countContainer.add(count);

  container.add(buttonPrevious, buttonNext, countContainer);
  window.objsToTest.push(buttonNext, buttonPrevious);

  body.add(container);
}