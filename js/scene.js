
var camera, scene, renderer;

var tree, skyDome, ufo, moon,geometry, material,mesh;
var ufoDirection = new THREE.Vector3(0, 0, 0);
var directionalLight, ambientLight, spotLight;
var clock = new THREE.Clock();

var pointLights = [];

var clock = new THREE.Clock();

var ufoBody, ufoCockpit;

var heightMap=[];

var moonMaterials = [];

const movementSpeed = 1;
let movementX = 0;
let movementZ = 0;



function createUFO(x, y, z) {
    'use strict';
  
    ufo = new THREE.Object3D();

    const bodyGeometry = new THREE.SphereGeometry(2, 32, 32);
    bodyGeometry.scale(4,1,4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, wireframe: true });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    ufo.add(body);


    // Create the cockpit (spherical dome)
    const cockpitGeometry = new THREE.SphereGeometry(5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 4);
    const cockpitMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.set(body.position.x, body.position.y - 1.7, body.position.z); 
    ufo.add(cockpit);

    const windowGeometry = new THREE.SphereGeometry(3.97, 32, 16, 0, Math.PI * 2, 0.7, 0.05);
    const windowMaterial = new THREE.MeshPhongMaterial({ color: 0x2adbd2, 
        wireframe: true,
        emissive: 0x2adbd2,
        emissiveIntensity: 0.3 });
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(body.position.x, body.position.y-0.4, body.position.z)
    ufo.add(window);


    // Create the small spheres at the bottom of the ship
    const sphereGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x2adbd2,
        emissive: 0x2adbd2,
        emissiveIntensity: 0.3});

    const radius = 6;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(Math.cos(angle) * radius, -1.2, Math.sin(angle) * radius ); // Swap Y and Z coordinates
      const pointLight = new THREE.PointLight(0xffffff, 0.8, 50);
      pointLight.position.set(sphere.position.x, sphere.position.y, sphere.position.z)
      pointLights.push(pointLight);
      sphere.add(pointLight);
      ufo.add(sphere);
    }
  
    // Create the flat cylinder in the center of the bottom part
    const cylinderGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 30);
    const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x2adbd2, 
        wireframe: true,
        emissive:0x2adbd2,
        emissiveIntensity: 0.3 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(body.position.x, body.position.y - 1.8, body.position.z); 
    ufo.add(cylinder);

    const ringGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 30);
    const ringMaterial = new THREE.MeshPhongMaterial({ color: 0x2adbd2, 
        wireframe: true,
        emissive:0x2adbd2,
        emissiveIntensity: 0.3 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(body.position.x, body.position.y - 1.8, body.position.z)
    ufo.add(ring);



    
    // Criar a luz spotlight apontada para baixo

    spotLight = new THREE.SpotLight(0xffffff, 2, 0, 0.2, 0.2, 1);

    
    const spotHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotHelper);
    
    
    // Position the entire UFO object
    ufo.position.set(x, y, z);

    ufo.scale.set(4, 4, 4);
    spotLight.position.set(x, - 1.8, z);
    ufo.add(spotLight);
    scene.add(ufo);
}

function getRandomMultipleOfThree(x) {
    let number = Math.floor(Math.random() * x);
  
    while (number % 3 != 0) {
      number = Math.floor(Math.random() * x);
    }
    console.log(number);
    return number;
  }

function getHeightData(scale) {

    let image = new Image();
    image.src = 'jotunheimen.png';

    image.onload = function() {
        // Create a canvas element
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        
        // Set the canvas dimensions to match the image
        canvas.width = image.width;
        canvas.height = image.height;
        
        // Draw the image onto the canvas
        context.drawImage(image, 0, 0);
        
        // Get the pixel data
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        
        // Iterate through each pixel
        var j = 0;
        for (let i = 0; i < data.length; i += 4) {
          let red = data[i];
          let green = data[i + 1];
          let blue = data[i + 2];
          let alpha = data[i + 3];
          heightMap[j] = (red + green + blue) / (12*scale);
          // Do something with the RGB values
          //console.log(j, red, green, blue, alpha);
          
          j++; 
        }

        const geometry = new THREE.PlaneGeometry(4000, 4000, canvas.width - 1, canvas.height - 1);
        j= 0;
        for (let i = 0, l = geometry.attributes.position.array.length; i < l; i += 3) {
        
            geometry.attributes.position.array[i + 2] = heightMap[j];
            j++;
        }
        var arrayDots = geometry.attributes.position.array;
        console.log(arrayDots.length/3 );
        for (let i = 0; i < 1000; i++) {
            var number = getRandomMultipleOfThree(arrayDots.length);
            var rot = Math.random() * 2 * Math.PI;
            var scl = (Math.random() * 2) + 1;
            console.log();
            createTree(arrayDots[number], arrayDots[number + 2] + 5, -arrayDots[number + 1], scl ,rot);
            
        }

        geometry.computeVertexNormals(); // Compute normals for proper lighting

        var texture = createFlowerField();

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    
        texture.repeat.set(2, 3);

        const material = new THREE.MeshLambertMaterial({ wireframe: true, map: texture });
        
            // Create a mesh using the geometry and material
        const terrain = new THREE.Mesh(geometry, material);
        terrain.rotation.x = -Math.PI/2;
            
            // Add the terrain to the scene
        scene.add(terrain);
      };

}
function createTerrain() {
    'use strict';
    getHeightData(0.7);
}

function createFlowerField() {
    const fieldTextureSize = 5500;
    const fieldCanvas = document.createElement("canvas");
    fieldCanvas.width = fieldTextureSize;
    fieldCanvas.height = fieldTextureSize;
    const fieldContext = fieldCanvas.getContext("2d");

    // Fundo verde claro
    fieldContext.fillStyle = "#4f8006";
    fieldContext.fillRect(0, 0, fieldTextureSize, fieldTextureSize);

    // Cores das flores
    const flowerColors = ["#ffffff", "#ffff00", "#d1c4e9", "#b2ebf2"];

    // Desenhar flores aleatoriamente
    const numFlowers = 20000;
    for (let i = 0; i < numFlowers; i++) {
      const x = Math.random() * fieldTextureSize;
      const y = Math.random() * fieldTextureSize;
      const radius = Math.random() * 2 + 1;
      const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      fieldContext.fillStyle = color;
      fieldContext.beginPath();
      fieldContext.arc(x, y, radius, 0, Math.PI * 2);
      fieldContext.closePath();
      fieldContext.fill();
    }

    return new THREE.CanvasTexture(fieldCanvas);

}


function createStarrySky() {
   
    const skyTextureSize = 9000;
    const skyCanvas = document.createElement("canvas");
    skyCanvas.width = skyTextureSize;
    skyCanvas.height = skyTextureSize;
    const skyContext = skyCanvas.getContext("2d");

    // Preencher o fundo degradê
    const gradient = skyContext.createLinearGradient(
        0,
        0,
        0,
        skyTextureSize
    );

    gradient.addColorStop(0, "#05072b"); // Azul escuro
    gradient.addColorStop(1, "#0e051a"); // Violeta escuro
    skyContext.fillStyle = gradient;
    skyContext.fillRect(0, 0, skyTextureSize, skyTextureSize);

    // Desenhar as estrelas
    const starCount = 10000;
    const starRadiusRange = [1, 2];
    const starColor = "#ffffff"; // Branco
    skyContext.fillStyle = starColor;

    for (let i = 0; i < starCount; i++) {
        const starX = Math.random() * skyTextureSize;
        const starY = Math.random() * skyTextureSize;
        const starRadius =
            Math.random() * (starRadiusRange[1] - starRadiusRange[0]) +
            starRadiusRange[0];

        skyContext.beginPath();
        skyContext.arc(starX, starY, starRadius, 0, Math.PI * 2);
        skyContext.fill();
    }

    return new THREE.CanvasTexture(skyCanvas);
}



function createMoon(x, y, z) {
    var moonGeometry = new THREE.SphereGeometry(5, 32, 32);

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('./assets/lroc_color_poles_1k.jpg');

    var moonPhongMaterial = new THREE.MeshPhongMaterial({ map: texture,
        emissive: 0xfaea84, 
        emissiveIntensity: 0.4, 
        wireframe: false });
    moonMaterials.push(moonPhongMaterial);
    
    var moonLambertMaterial = new THREE.MeshLambertMaterial({ map: texture,
        emissive: 0xfaea84, 
        emissiveIntensity: 0.4, 
        wireframe: false });
    moonMaterials.push(moonLambertMaterial);
    
    var moonToonMaterial = new THREE.MeshToonMaterial({ map: texture,
        emissive: 0xfaea84, 
        emissiveIntensity: 0.4, 
        wireframe: false });
    moonMaterials.push(moonToonMaterial);
        
        



    moon = new THREE.Mesh(moonGeometry, moonMaterials[0]);

    moon.position.set(x, y ,z);
    scene.add(moon);
}    

function addSkyDome() {
    var skyGeometry = new THREE.SphereGeometry(900, 60, 40);  

    var texture = createStarrySky();

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(1, 1);


    var skyMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        wireframe: true,
        emissive: 0xffffff,
        emissiveIntensity: 0.2,
        side: THREE.BackSide // Renderizar apenas a parte de trás da esfera
    });
    skyDome = new THREE.Mesh(skyGeometry, skyMaterial);



    skyDome.position.set(0,-50,0);
    
    scene.add(skyDome);
}


function createIllumination() {

    // Iluminação Global
    directionalLight = new THREE.DirectionalLight(0xffffe0, 0.8); // Luz branca com intensidade máxima
    directionalLight.position.set(400, 350, 500); // Ângulo de incidência da luz
    scene.add(directionalLight);

    // Luz Ambiente
    ambientLight = new THREE.AmbientLight(0x333333, 0.5); // Intensidade baixa (tom amarelado ajustado através do material e luz direcional)
    scene.add(ambientLight);

    
}
function createTree(x, y, z, scale, angle) {
    'use strict' ;
    
    var tree = new THREE.Object3D()

    createCylinder(tree, 0, 0, 0);

    material = new THREE.MeshPhongMaterial({ color: 0x00d200 } );
    geometry = new THREE.SphereGeometry(3, 32, 16);
    geometry.scale(2, 1, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 8.5, 0);
  
    tree.add(mesh);
    
    material = new THREE.MeshPhongMaterial({ color: 0xa52000 });
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-3, 3, 0);
    mesh.rotation.z += Math.PI / 4;
 
    tree.add(mesh);

    material = new THREE.MeshPhongMaterial({ color: 0x00d200 } );
    geometry = new THREE.SphereGeometry(0.5, 32, 16);
    geometry.scale(2, 1, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-4.7, 4.7, 0);
    mesh.rotation.z += Math.PI / 4;
  
    tree.add(mesh);

    scene.add(tree);
    tree.position.set(x, y, z);
    tree.scale.set(scale, scale, scale);
    tree.rotation.y = angle;
    return tree;
}

function createCylinder(obj, x, y, z) {
    'use strict';
    material = new THREE.MeshPhongMaterial({ color: 0xa52000, wireframe: false });
    geometry = new THREE.CylinderGeometry(2, 2, 12, 32);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI;
    mesh.rotation.z = Math.PI;
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


function createScene() {
    'use strict';

    scene = new THREE.Scene();

    createHouse(-55, 83, 37);
    createMoon(-200, 100, 50);
    createIllumination();
    addSkyDome();
   
    createUFO(0, 150, 0);
    createTerrain();
}

function createCamera() {
    'use strict';

    camera =  new THREE.PerspectiveCamera(85, innerWidth / innerHeight, 1, 5000);

    camera.position.x = 80;
    camera.position.y = 200;
    camera.position.z = 200;


    camera.lookAt(new THREE.Vector3( 0, 40, 0 ));
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

        case 37: // Left arrow key
            movementX = -movementSpeed;
            break;
        case 39: // Right arrow key
            movementX = movementSpeed;
            break;
        case 38: // Up arrow key
            movementZ = -movementSpeed;
            break;
        case 40: // Down arrow key
            movementZ = movementSpeed;
            break;
        case 65: //A
        case 97: //a
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 69:  //E
        case 101: //e
            break;
        case 68:
            directionalLight.visible = !directionalLight.visible;
            break;
        case 80:
            
    }
}
function onKeyUp(event) {
    'use strict';
    switch (event.keyCode) {
        case 37: // Left arrow key
        case 39: // Right arrow key
            movementX = 0;
            break;
        case 38: // Up arrow key
        case 40: // Down arrow key
            movementZ = 0;
            break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    renderer.xr.enabled = true;


    createCamera();

    createScene();
   
    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    
    
    renderer.setAnimationLoop( function () {
        var delta = clock.getDelta();

        ufo.position.x += movementX;
        ufo.position.z += movementZ;
        moon.rotation.y += 0.005; // Rotação da lua
        render();
    
    } );
}


