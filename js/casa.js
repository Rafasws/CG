
/*global THREE, requestAnimationFrame, console*/

var skyDome, moon;
var geometryHouse, materialHouse, meshHouse;
var geometryWindow, materialWindow, meshWindow;
var geometryRoof, materialRoof, meshRoof;
var geometryDoor, materialDoor, meshDoor;
var geometryCross, materialCross, meshCross;
var geometryGlass, materialGlass, meshGlass;
var geometryBaseboard, materialBaseboard, meshBaseboard;
var geometryBase, materialBase, meshBase;

function addEdges(mesh, geometry) {
    'use strict'
    const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 2,
        })
    )

    mesh.add(edges);
}



function createDoor(obj, x, y, z){

    const verticesDoor = new Float32Array([
      20.0, -10.0, 5.0,  // 0
      20.0, -10.0, -5.0, // 1
      20.0, 5.0, -5.0,// 2
      20.0, 5.0, 5.0, // 3
      20.75, -10.0, 5.0, // 4
      20.75, 5.0, 5.0,// 5
      20.75, 5.0, -5.0,// 6
      20.75, -10.0, -5.0// 7
    ]);
  
    const facesDoor = [
      // Left face
      2, 1, 0,
      0, 3, 2,

      // Front face
      5, 3, 0,
      0, 4, 5,

      // Right face
      6, 5, 4,
      4, 7, 6,

      // Back face
      6, 7, 1,
      1, 2, 6,

      // Bottom face
      1, 7, 4,
      4, 0, 1,

        
      // Top face
        3, 5, 6,
        6, 2, 3
    ];
  
    geometryDoor = new THREE.BufferGeometry();
    geometryDoor.setIndex( facesDoor );
    geometryDoor.setAttribute('position', new THREE.BufferAttribute(verticesDoor, 3));
    geometryDoor.computeVertexNormals();
    geometryDoor.normalizeNormals();
  
    materialDoor = new THREE.MeshPhongMaterial({ color: 0xd2b48c });
    meshDoor = new THREE.Mesh(geometryDoor, materialDoor);
    addEdges(meshDoor, geometryDoor);
    obj.add(meshDoor);
    meshDoor.position.set(x, y, z);
  }
  
  function createRoof(obj, x, y, z){
  
    var verticesRoof = new Float32Array([
      31, 10, -16,  // 0
      31, 10, 16,   // 1
      25, 15, 0,    // 2
      -25, 15, 0,   // 3
      -31, 10, 16,  // 4
      -31, 10, -16, // 5
      31, 10, 0,    // 6
      -31, 10, 0    // 7
    ]);
  
    var facesRoof =[
      // Roof Front face
      1, 2, 3,
      3, 4, 1,
      // Roof Back face
      5, 3, 2,
      2,0, 5,
      // Right Roof faces
      1, 6, 2,
      6, 0, 2,
      // Left Roof faces
      4, 3, 7,
      5, 7, 3,
    // Bottom face
        1, 4, 5,
        5, 0, 1

    ];
  
    geometryRoof = new THREE.BufferGeometry();
    geometryRoof.setIndex( facesRoof );
    geometryRoof.setAttribute('position', new THREE.BufferAttribute(verticesRoof, 3));
    geometryRoof.computeVertexNormals();
    geometryRoof.normalizeNormals();
    
    // Create mesh
  
    materialRoof = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    meshRoof = new THREE.Mesh(geometryRoof, materialRoof);
    addEdges(meshRoof, geometryRoof);
    obj.add(meshRoof);
    meshRoof.rotation.y = Math.PI/2;
    meshRoof.position.set(x, y, z);

  }

    function createChimney(obj, x, y, z){
        var chimney = new THREE.Object3D(); 

        var verticesChimney = new Float32Array([
            5, 10, 2.5,  // 0
            5, 10, -2.5, // 1
            5, 18, -2.5, // 2
            5, 18, 2.5,  // 3
            -5, 10, 2.5, // 4
            -5, 18, 2.5, // 5
            -5, 18, -2.5,// 6
            -5, 10, -2.5 // 7
        ]);
    
        var facesChimney = [
            // Left face
            0, 1, 2,
            2, 3, 0,
            // Front face
            0, 3, 5,
            5, 4, 0,
            // Right face
            4, 5, 6,
            6, 7, 4,
            // Back face
            1, 7, 6,
            6, 2, 1,
            // Bottom face
            4, 7, 1,
            1, 0, 4,
            // Top face
            3, 2, 6, 
            6, 5, 3
        ];
    
        geometryChimney = new THREE.BufferGeometry();
        geometryChimney.setIndex( facesChimney );
        geometryChimney.setAttribute('position', new THREE.BufferAttribute(verticesChimney, 3));
        geometryChimney.computeVertexNormals();
        geometryChimney.normalizeNormals();
        

        materialChimney = new THREE.MeshPhongMaterial({ color: 0xffffff });
        meshChimney = new THREE.Mesh(geometryChimney, materialChimney);
        addEdges(meshChimney, geometryChimney);
        chimney.add(meshChimney);
        chimney.position.set(x, y, z);
        chimney.rotation.y = Math.PI/2;
        obj.add(chimney);
    }

    function createCross(obj, x, y, z){
        'use strict';

        var cross = new THREE.Object3D();

        var verticesCross = new Float32Array([
            15, 2.5, 17, // 0
            15, 2.5, 18,  // 1
            15, 0.5, 17,   // 2
            15, 0.5, 18,    // 3
            15, -0.5, 17,  // 4
            15, -0.5, 18,   // 5
            15, -2.5, 17,// 6
            15, -2.5, 18, // 7
            15, 0.5, 22,    // 8
            15, -0.5, 22,   // 9
            15, 0.5, 13,    // 10 
            15, -0.5, 13   // 11
        ]);

        var facesCross = [
            0, 1, 3,
            3, 2, 0,

            4, 5, 7,
            7, 6, 4,

            10, 8, 9,
            9, 11, 10

        ];

        geometryCross = new THREE.BufferGeometry();
        geometryCross.setIndex( facesCross );
        geometryCross.setAttribute('position', new THREE.BufferAttribute(verticesCross, 3));
        geometryCross.computeVertexNormals();
        geometryCross.normalizeNormals();



        materialCross = new THREE.MeshPhongMaterial({ color: 0xd2b48c });
        meshCross = new THREE.Mesh(geometryCross, materialCross);
        addEdges(meshCross, geometryCross);
        cross.add(meshCross);
        cross.position.set(x, y, z);

        obj.add(cross);
    }

    function createGlass(obj, x, y, z){
        'use strict';

        var glass = new THREE.Object3D();

        var verticesGlass = new Float32Array([
            15, 2.5, 22, // 0
            15, 2.5, 18, // 1
            15, 0.5, 22,// 2
            15, 0.5, 18,// 3
        ]);

        var facesGlass = [

            3, 1, 0,
            0, 2, 3
        ];

        geometryGlass = new THREE.BufferGeometry();
        geometryGlass.setIndex( facesGlass );
        geometryGlass.setAttribute('position', new THREE.BufferAttribute(verticesGlass, 3));
        geometryGlass.computeVertexNormals();
        geometryGlass.normalizeNormals();



        materialGlass = new THREE.MeshPhongMaterial({ color: 0x9cf5ff });
        meshGlass = new THREE.Mesh(geometryGlass, materialGlass);

        glass.add(meshGlass);
        glass.position.set(x, y, z);

        obj.add(glass);

    }

    function createWindow(obj, x, y, z, rot){
        'use strict';

        var window = new THREE.Object3D();

        var verticesWindow = new Float32Array([
            15, 3, 22.5, // 0
            15, 3, 12.5, // 1
            15, -3, 22.5,// 2
            15, -3, 12.5,// 3
            15, 2.5, 22, // 4
            15, 2.5, 13, // 5
            15, -2.5, 22,// 6
            15, -2.5, 13// 7
        ]);

        var facesWindow = [
            4, 0, 2,
            2, 6, 4,

            4, 5, 1,
            1, 0, 4,

            5, 7, 3,
            3, 1, 5,

            7, 6, 2,
            2, 3, 7
        ];

        geometryWindow = new THREE.BufferGeometry();
        geometryWindow.setIndex( facesWindow );
        geometryWindow.setAttribute('position', new THREE.BufferAttribute(verticesWindow, 3));
        geometryWindow.computeVertexNormals();
        geometryWindow.normalizeNormals();



        materialWindow = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        meshWindow = new THREE.Mesh(geometryWindow, materialWindow);
        addEdges(meshWindow, geometryWindow);
        window.add(meshWindow);
        
        createCross(window, 0, 0, 0);
        createGlass(window, 0, 0, -5);
        createGlass(window, 0, -3, 0);
        createGlass(window, 0, -3, -5);
        createGlass(window, 0, 0, 0);

        window.rotation.y = rot;
        window.position.set(x, y, z);
        obj.add(window);
    }

function createBaseboard(obj, x, y, z){
    'use strict';

    var baseboard = new THREE.Object3D();

    var verticesBaseboard = new Float32Array([
        15, -10, -5,  // 0
        15, -10, 5, // 1
        15, -5, -5,// 2
        15, -5, 5, // 3
        15, -10, -30, // 4
        15, -10, 30,// 5
        15, -5, -30,// 6
        15, -5, 30,// 7
        -15, -10, -30,  // 8
        -15, -10, 30, // 9
        -15, -5, -30,// 10
        -15, -5, 30, // 11

        15.2, -10, -5,  // 12
        15.2, -10, 5, // 13
        15.2, -5, -5,// 14
        15.2, -5, 5, // 15
        15.2, -10, -30, // 16
        15.2, -10, 30,// 17
        15.2, -5, -30,// 18
        15.2, -5, 30,// 19

        -15.2, -5, -30,  // 20
        -15.2, -5, 30, // 21
        -15.2, -10, -30,// 22
        -15.2, -10, 30, // 23
        -15.2, -5, -5,  // 24
        -15.2, -10, -5, // 25

        15.2, -5, -30.2,  // 26
        15.2, -5, 30.2, // 27
        15.2, -10, -30.2,// 28
        15.2, -10, 30.2, // 29
        -15.2, -5, -30.2,  // 30
        -15.2, -5, 30.2, // 31
        -15.2, -10, -30.2,// 32
        -15.2, -10, 30.2, // 33

    ]);

    var facesBaseboard = [
        6, 2, 0,
        0, 4, 6,

        6, 2, 14,
        14, 18, 6,

        6, 18, 16,
        16, 4, 6,

        12, 14, 2,
        2, 0, 12,

        12, 0, 4,
        4, 16, 12,

        12, 16, 18,
        18, 14, 12,

        8, 10, 11,
        11, 9, 8,

        8, 22, 20,
        20, 10, 8,

        8, 9, 23,
        23, 22, 8,

        21, 23, 9,
        9, 11, 21,

        21, 11, 10,
        10, 20, 21,

        21, 20, 22,
        22, 23, 21,

        1, 13, 17,
        17, 5, 1,

        1, 3, 15,
        15, 13, 1,

        1, 5, 7,
        7, 3, 1,

        19, 17, 13,
        13, 15, 19,

        19, 15, 3,
        3, 7, 19,

        19, 7, 5,
        5, 17, 19,

        //
        26, 30, 20,
        20, 24, 26,

        16, 28, 26,
        26, 18, 16,

        32, 28, 16,
        16, 22, 32,

        32, 22, 20,
        20, 30, 32,

        30, 26, 28,
        28, 32, 30,

        21, 31, 27,
        27, 19, 21,

        27, 29, 17,
        17, 19, 27,

        17, 29, 33,
        33, 23, 17,

        21, 23, 33,
        33, 31, 21,

        29, 27, 31,
        31, 33, 29
        
    ];

    geometryBaseboard = new THREE.BufferGeometry();
    geometryBaseboard.setIndex( facesBaseboard );
    geometryBaseboard.setAttribute('position', new THREE.BufferAttribute(verticesBaseboard, 3));
    geometryBaseboard.computeVertexNormals();
    geometryBaseboard.normalizeNormals();



    materialBaseboard = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    meshBaseboard = new THREE.Mesh(geometryBaseboard, materialBaseboard);
    addEdges(meshBaseboard, geometryBaseboard);
    baseboard.add(meshBaseboard);

    baseboard.position.set(x, y, z);
    obj.add(baseboard);
}
function createBase(obj, x, y, z) {
    'use strict';
    var base = new THREE.Object3D();

    var baseVertices = new Float32Array( [ 
        17, -10, 32,  // 0
        17, -10, -32, // 1
        -17, -10, -32,// 2
        -17, -10, 32, // 3
        17, -20, 32, // 4
        17, -20, -32,// 5
        -17, -20, -32,// 6
        -17, -20, 32,// 7

        17, -20, 7.5,  // 8
        17, -20, -7.5, // 9
        17, -10, -7.5,// 10
        17, -10, 7.5, // 11
        19, -20, 7.5,  // 12
        19, -20, -7.5, // 13
        19, -10, -7.5,// 14
        19, -10, 7.5, // 15

        19, -20, 7.5,  // 16
        19, -20, -7.5, // 17
        19, -12, -7.5,// 18
        19, -12, 7.5, // 19
        21, -20, 7.5,  // 20
        21, -20, -7.5, // 21
        21, -12, -7.5,// 22
        21, -12, 7.5, // 23

        21, -20, 7.5,  // 24
        21, -20, -7.5, // 25
        21, -14, -7.5,// 26
        21, -14, 7.5, // 27
        23, -20, 7.5,  // 28
        23, -20, -7.5, // 29
        23, -14, -7.5,// 30
        23, -14, 7.5, // 31

        23, -20, 7.5,  // 32
        23, -20, -7.5, // 33
        23, -16, -7.5,// 34
        23, -16, 7.5, // 35
        25, -20, 7.5,  // 36
        25, -20, -7.5, // 37
        25, -16, -7.5,// 38
        25, -16, 7.5, // 39
    ]);

    var baseFaces = [ 
        0, 1, 2,
        2, 3, 0,

        0, 4, 5,
        5, 1, 0,

        1, 5, 6,
        6, 2, 1,

        2, 6, 7,
        7, 3, 2,

        3, 7, 4,
        4, 0, 3,

        4, 7, 6,
        6, 5, 4,

        8, 9, 10,
        10, 11, 8,

        13, 12, 8,
        8, 9, 13,

        14, 13, 9,
        9, 10, 14,

        14, 10, 11,
        11, 15, 14,

        15, 11, 8,
        8, 12, 15,

        15, 12, 13,
        13, 14, 15,
        //
        16, 17, 18,
        18, 19, 16,

        20, 21, 22,
        22, 23, 20,

        21, 20, 12,
        16, 17, 21,

        22, 21, 17,
        17, 18, 22,

        23, 22, 18,
        18, 19, 23,

        20, 23, 19,
        19, 16, 20,
        //
        24, 25, 26,
        26, 27, 24,

        28, 29, 30,
        30, 31, 28,

        29, 28, 12,
        24, 25, 29,

        30, 29, 25,
        25, 26, 30,

        31, 30, 26,
        26, 27, 31,

        28, 31, 27,
        27, 24, 28,
        //
        32, 33, 34,
        34, 35, 32,

        36, 37, 38,
        38, 39, 36,

        37, 36, 12,
        32, 33, 37,

        38, 37, 33,
        33, 34, 38,

        39, 38, 34,
        34, 35, 39,

        36, 39, 35,
        35, 32, 36,
    ];

    geometryBase = new THREE.BufferGeometry();
    geometryBase.setIndex( baseFaces );
    geometryBase.setAttribute('position', new THREE.BufferAttribute(baseVertices, 3));
    geometryBase.computeVertexNormals();
    geometryBase.normalizeNormals();



    materialBase = new THREE.MeshPhongMaterial({ color: 0xDDDDDD });
    meshBase = new THREE.Mesh(geometryBase, materialBase);
    addEdges(meshBase, geometryBase);
    base.add(meshBase);
    
    obj.add(base);
    base.position.set(x, y, z);
}
function createHouse(x, y, z) {
      'use strict';
  
    var house = new THREE.Object3D();
    
      // Define vertices
    var vertices = new Float32Array( [
          
          15, -10, 30,  // 0
          15, -10, -30, // 1
          15, 10, -30,// 2
          15, 10, 30, // 3
          -15, -10, 30, // 4
          -15, 10, 30,// 5
          -15, 10, -30,// 6
          -15, -10, -30,// 7
  
          15, -10, 5,  // 8
          15, -10, -5, // 9
          15, 5, -5,// 10
          15, 5, 5, // 11
  
          15, 10,-5, //12
          15, 10, 5, //13

          //Pontos janela z positivo
          15, -3, 22.5, //14
            15, -3, 12.5, //15
            15, 3, 12.5, //16
            15, 3, 22.5, //17
            15, -10, 22.5, //18
            15, -10, 12.5, //19
            15, 10, 22.5, //20
            15, 10, 12.5, //21
        
            //Pontos janela z negativo
            15, -3, -22.5, //22
            15, -3, -12.5, //23
            15, 3, -12.5, //24
            15, 3, -22.5, //25
            15, -10, -22.5, //26
            15, -10, -12.5, //27
            15, 10, -22.5, //28
            15, 10, -12.5, //29

            //pontos janela z = 30
            -5, -10, 30, //30
            -5, -3, 30, //31
            5, -10, 30, //32
            5, -3, 30, //33
            -5, 10, 30, //34
            -5, 3, 30, //35
            5, 10, 30, //36
            5, 3, 30, //37

            //pontos janela z = -30
            -5, -10, -30, //38
            -5, -3, -30, //39
            5, -10, -30, //40
            5, -3, -30, //41
            -5, 10, -30, //42
            -5, 3, -30, //43
            5, 10, -30, //44
            5, 3, -30, //45

  
    ]);
  
      // Define faces
    var faces = [
        // Left face
        // face janela z positivo
        0, 18, 20,
        20, 3, 0,

        18, 19, 15,
        15, 14, 18,

        17, 16, 21,
        21, 20, 17,

        19, 8, 13,
        13, 21, 19,

        // meio cima da porta
        11, 10, 12,
        12, 13, 11,
        
        // face janela z negativo
        9, 27, 29,
        29, 12, 9,

        27, 26, 22,
        22, 23, 27,

        24, 25, 28,
        28, 29, 24,

        26, 1, 2,
        2, 28, 26,
         
        // Front face
        0, 3, 36,
        36, 32, 0,

        30, 32, 33,
        33, 31, 30,
        
        35, 37, 36,
        36, 34, 35,

        34, 5, 4,
        4, 30, 34,

        // Right face
        4, 5, 6,
        6, 7, 4,

        // Back face
        6, 42, 38,
        38, 7, 6,

        42, 44, 45,
        45, 43, 42,

        39, 41, 40,
        40, 38, 39,

        44, 2, 1,
        1, 40, 44,

        // Bottom face
        4, 7, 1,
        1, 0, 4
    ];
  
    geometryHouse = new THREE.BufferGeometry();
    geometryHouse.setIndex( faces );
    geometryHouse.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometryHouse.computeVertexNormals();
    geometryHouse.normalizeNormals();
    
    // Create mesh
    materialHouse = new THREE.MeshPhongMaterial({ color: 0xffffff });
    meshHouse = new THREE.Mesh(geometryHouse, materialHouse);
    //addEdges(meshHouse, geometryHouse);
    house.add(meshHouse);
    createBase(house,0,0,0);
    createWindow(house,0,0,0, 0);
    createWindow(house,0,0,-35, 0);
    createWindow(house,-17.5, 0, -15, Math.PI/2);
    createWindow(house,17.5, 0, 15, -Math.PI/2);
    createRoof(house,0,0,0);
    createChimney(house,-8,0,0);
    createDoor(house,-5,0,0);
    createBaseboard(house,0,0,0);
    scene.add(house);

    house.position.x = x;
    house.position.y = y;
    house.position.z = z;
}