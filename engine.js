/*
Bu kod, üç boyutlu bir grafik ortamında çalışan bir oyunun temel yapı taşlarını oluşturan bir JavaScript programını içerir. 
Kod, bir 3D sahne oluşturur ve bu sahnede bazı nesneleri, ışıkları ve oyun mantığını yönetir. Basit bir 3D oyunun temel altyapısını 
oluşturan birçok bileşeni içerir ve oyuncu etkileşimleri ile nesne hareketleri arasındaki mantığı yönetir. Ayrıca, çarpışmaları kontrol 
eder ve skorları günceller.
*/

var camera;
var scene;
var renderer;
var gui;
var secondScore=0;
//var firstScore = 0;
var boxJumpSpeed = 0.1; // Kutunun zıplama hızı
var isJumpingbox2 = false;
var isJumpingbox3 = false;
var isJumpingSpehere = false;

var audioElement = document.getElementById('audio');



var firstScoreElement = document.getElementById("firstScore");
var secondScoreElement = document.getElementById("secondScore");

var initialScore = 0; // İlk skor değeri
firstScoreElement.innerHTML = initialScore;
secondScoreElement.innerHTML = initialScore;

function createScene() {
     gui = new dat.GUI();
     scene = new THREE.Scene();
     camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    renderer = new THREE.WebGLRenderer({ physicallyCorrectLights: true, antialias:true, powerPreference:'high-performance' }); // daha iyi ışık performansı
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);


    camera.position.x = 20;
    camera.position.y = 16;
    camera.position.z = 00;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var ambientLight = new THREE.AmbientLight(0x404040, 0);// griye yakın bir ton gerçekçi renkte gölgeler.
    gui.add(ambientLight, 'intensity', 0,2).step(0.11);
    scene.add(ambientLight);

    scene.background = new THREE.Color(0x404040);

    //klasörleme
    var fp = gui.addFolder('Objects Position');
    var fp2 = gui.addFolder('Ball Position');
    var fr = gui.addFolder('Ball Rotation');
    var cf = gui.addFolder('Camera Position');
    var cr = gui.addFolder('Camera Rotation');
    var ls = gui.addFolder('Light Settings'); //directional light settings

    createFloor('floor', 20, 1, 30, 0, -0.5, 0, "floor",0x00ffa0);

    //createBox('box1', 1, 1, 1, 0, 0.5, 0, 0xff0000);
    createFloor('box2', 1, 3, 1, 0, 0.5, -13.9, "gs", 0xffffff);
    createFloor('box3', 1, 3, 1, 0, 0.5, 13.9, "bjk", 0xffffff);

   // createPlayer('box10', 1, 3, 1, 0, 0.5, 0, "bjk", 0xffffff);

    //createFloor('fb', 1, 1, 1, -13, 1.5, 14.5, "fb", 0xffffff);
    createFloor('bjk', 1, 1, 1, -13, 1.5, 12.5, "bjk", 0xffffff);
    createFloor('gs', 1, 1, 1, -13, 1.5, 10.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -13, 1.5, 8.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -13, 1.5, 6.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, -13, 1.5, 4.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -13, 1.5, 2.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -13, 1.5, 0.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, -13, 1.5, -1.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -13, 1.5, -3.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -13, 1.5, -5.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, -13, 1.5, -7.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -13, 1.5, -9.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -13, 1.5, -11.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, -13, 1.5, -13.5, "gs", 0xffffff);


    //2.kat taraftar
    createFloor('fb', 1, 1, 1, -15, 3.5, 15.5, "fb", 0xffffff);
    createFloor('fb', 1, 1, 1, -15, 3.5, 13.5, "fb", 0xffffff);
    createFloor('bjk', 1, 1, 1, -15, 3.5, 11.5, "bjk", 0xffffff);
    createFloor('gs', 1, 1, 1, -15, 3.5, 9.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -15, 3.5, 7.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -15, 3.5, 5.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, -15, 3.5, 3.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -15, 3.5, 1.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -15, 3.5, -0.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, -15, 3.5, -2.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -15, 3.5, -4.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -15, 3.5, -6.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, -15, 3.5, -8.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, -15, 3.5, -10.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, -15, 3.5, -12.5, "fb", 0xffffff);
    createFloor('fb', 1, 1, 1, -15, 3.5, -14.5, "fb", 0xffffff);


    // tribün
    createFloor('gs', 1, 1, 28, 13, 0.5, 0, 'gs', 0xffffff);
    createFloor('gs', 1, 1, 30, 14, 1.5, 0, 'gs', 0xffffff);
    createFloor('gs', 1, 1, 32, 15, 2.5, 0, 'gs', 0xffffff);
    createFloor('gs', 1, 1, 34, 16, 3.5, 0, 'gs', 0xffffff);
    createFloor('gs', 1, 1, 36, 17, 4.5, 0, 'gs', 0xffffff);
    createFloor('gs', 1, 1, 38, 18, 5.5, 0, 'gs', 0xffffff);
    createFloor('gs', 1, 1, 40, 19, 6.5, 0, 'gs', 0xffffff);

    // tribün
    createFloor('bjk', 1, 1, 28, -13, 0.5, 0, 'bjk', 0xffffff);
    createFloor('bjk', 1, 1, 30, -14, 1.5, 0, 'bjk', 0xffffff);
    createFloor('bjk', 1, 1, 32, -15, 2.5, 0, 'bjk', 0xffffff);
    createFloor('bjk', 1, 1, 34, -16, 3.5, 0, 'bjk', 0xffffff);
    createFloor('bjk', 1, 1, 36, -17, 4.5, 0, 'bjk', 0xffffff);
    createFloor('bjk', 1, 1, 38, -18, 5.5, 0, 'bjk', 0xffffff);
    createFloor('bjk', 1, 1, 40, -19, 6.5, 0, 'bjk', 0xffffff);
   // function createFloor(name, w, h, d, x, y, z, texture, color) {



    createFloor('bjk', 1, 1, 1, 13, 1.5, 12.5, "bjk", 0xffffff);
    createFloor('gs', 1, 1, 1, 13, 1.5, 10.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 13, 1.5, 8.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 13, 1.5, 6.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 13, 1.5, 4.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 13, 1.5, 2.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 13, 1.5, 0.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 13, 1.5, -1.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 13, 1.5, -3.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 13, 1.5, -5.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 13, 1.5, -7.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 13, 1.5, -9.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 13, 1.5, -11.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 13, 1.5, -13.5, "fb", 0xffffff);

    createFloor('bjk', 1, 1, 1, 15, 3.5, 12.5, "bjk", 0xffffff);
    createFloor('gs', 1, 1, 1, 15, 3.5, 10.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 15, 3.5, 8.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 15, 3.5, 6.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 15, 3.5, 4.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 15, 3.5, 2.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 15, 3.5, 0.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 15, 3.5, -1.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 15, 3.5, -3.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 15, 3.5, -5.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 15, 3.5, -7.5, "gs", 0xffffff);
    createFloor('bjk', 1, 1, 1, 15, 3.5, -9.5, "bjk", 0xffffff);
    createFloor('fb', 1, 1, 1, 15, 3.5, -11.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 15, 3.5, -13.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 15, 3.5, -15.5, "fb", 0xffffff);
    createFloor('gs', 1, 1, 1, 15, 3.5, 14.5, "fb", 0xffffff);


    // createFloor("teknik1", 2, 2, .01, 12, 1, -16, "terim", 0xffffff);
    // createFloor("teknik2", 2, 2, .01, -12, 1, 16, "senol", 0xffffff);


    createFloor('box4', 0.1, 5, 0.1, -2.5, 2, 15.5, "kaled", 0xffffff);
    createFloor('box5', 0.1, 5, 0.1, 2.5, 2, 15.5, "kaled", 0xffffff);
    createFloor('box6', 5, .1, .1, 0, 4.5, 15.5, "kaled", 0xffffff);

    createFloor('box7', 0.1, 5, 0.1, -2.5, 2, -15.5, "kaled", 0xffffff);
    createFloor('box8', 0.1, 5, 0.1, 2.5, 2, -15.5, "kaled", 0xffffff);
    createFloor('box9', 5, .1, .1, 0, 4.5, -15.5, "kaled", 0xffffff);

    createSphere("sphere1", .5,32,16, 0,.5,0,"ball" ,0xffffff)


    cr.add(camera.rotation, 'x', -2, -1.3, 0.01);
    cr.add(camera.rotation, 'y', 1, 1.5, 0.01);
    cr.add(camera.rotation, 'z', -2, 2, 0.01);
    cf.add(camera, 'zoom', 0.5, 1.5).onChange(function () { camera.updateProjectionMatrix(); });

    cf.add(camera.position, 'x', -60, 60).onChange(function () { camera.lookAt(new THREE.Vector3(0, 0, 0)); });
    cf.add(camera.position, 'y', 5, 40).onChange(function () { camera.lookAt(new THREE.Vector3(0, 0, 0)); });
    cf.add(camera.position, 'z', -40, 40).onChange(function () { camera.lookAt(new THREE.Vector3(0, 0, 0)); });

                                                   
   /* fp.add(scene.getObjectByName('box1').position, 'x', -9.5, 9.5);
    fp.add(scene.getObjectByName('box1').position, 'y', 0.5, 1);
    fp.add(scene.getObjectByName('box1').position, 'z', -14.5, 14.5);*/

    /*fp2.add(scene.getObjectByName('box10').position, 'x', -9.5, 9.5);
    fp2.add(scene.getObjectByName('box10').position, 'y', 0.5, 1);
    fp2.add(scene.getObjectByName('box10').position, 'z', -14.4, 14.4);*/

    fp2.add(scene.getObjectByName('sphere1').position, 'x', -9.5, 9.5);
    fp2.add(scene.getObjectByName('sphere1').position, 'y', 0.5, 1);
    fp2.add(scene.getObjectByName('sphere1').position, 'z', -14.4, 14.4);

    fp.add(scene.getObjectByName('box2').position, 'x', -9.5, 9.5);
    fp.add(scene.getObjectByName('box2').position, 'y', 0.5, 1);
    fp.add(scene.getObjectByName('box2').position, 'z', -14.5, 14.5);

    fp.add(scene.getObjectByName('box3').position, 'x', -9.5, 9.5);
    fp.add(scene.getObjectByName('box3').position, 'y', 0.5, 1);
    fp.add(scene.getObjectByName('box3').position, 'z', -14.5, 14.5);

    fr.add(scene.getObjectByName('sphere1').rotation, 'x', 0, 5);
    fr.add(scene.getObjectByName('sphere1').rotation, 'y', 0, 5);
    fr.add(scene.getObjectByName('sphere1').rotation, 'z', 0, 5);

    createDirectionalLight(-10,10,15);
    createDirectionalLight(10,10,-15);

    createDirectionalLight(10, 10, 15);
    createDirectionalLight(-10, 10, -15);



    

    // Klavye Kontrolleri
    document.addEventListener('keydown', onKeyDown);

    function onKeyDown(event) {
        var box2 = scene.getObjectByName('box2');
        var box3 = scene.getObjectByName('box3');
   

        var step = 1;

        switch (event.keyCode) {
            case 37: // Sol tuş
                if (box2.position.z + step <= 15) { // Z eksenindeki pozisyon sınırını kontrol et
                    box2.position.z += step;
                }
                break;
            case 38: // Yukarı tuş
                if (box2.position.x - step >= -9.75) { // X eksenindeki pozisyon sınırını kontrol et
                    box2.position.x -= step;
                }
                break;
            case 39: // Sağ tuş
                if (box2.position.z - step >= -15) { // Z eksenindeki pozisyon sınırını kontrol et
                    box2.position.z -= step;
                }
                break;
            case 40: // Aşağı tuş
                if (box2.position.x + step <= 9.75) { // X eksenindeki pozisyon sınırını kontrol et
                    box2.position.x += step;
                }
                break;
            case 65: // A tuşu
                if (box3.position.z + step <= 14.5) { // Z eksenindeki pozisyon sınırını kontrol et
                    box3.position.z += step;
                }
                break;
            case 87: // W tuşu
                if (box3.position.x - step >= -9.5) { // X eksenindeki pozisyon sınırını kontrol et
                    box3.position.x -= step;
                }
                break;
            case 68: // D tuşu
                if (box3.position.z - step >= -14.5) { // Z eksenindeki pozisyon sınırını kontrol et
                    box3.position.z -= step;
                }
                break;
            case 83: // S tuşu
                if (box3.position.x + step <= 9.5) { // X eksenindeki pozisyon sınırını kontrol et
                    box3.position.x += step;
                }
                break;
        }
    }
  

    update_render();
}

function update_render() {
    renderer.render(scene, camera);
    var sphere1 = scene.getObjectByName('sphere1');
    var box2 = scene.getObjectByName('box2');
    var box3 = scene.getObjectByName('box3');


    // Zıplama mantığını uygula
    if (isJumpingbox2) {
        box2.position.y += boxJumpSpeed; // Kutuyu y ekseninde yukarı doğru hareket ettir
        if (box2.position.y >= 2.5) {
            isJumpingbox2 = false; // Zirveye ulaşıldığında zıplama durumunu kapat
        }
    } else {
        box2.position.y -= boxJumpSpeed; // Kutuyu y ekseninde aşağı doğru hareket ettir
        if (box2.position.y <= 0.5) {
            isJumpingbox2 = true; // Zemin seviyesine ulaşıldığında zıplama durumunu aç
        }
    }



    // Zıplama mantığını uygula
    if (isJumpingbox3) {
        box3.position.y += boxJumpSpeed; // Kutuyu y ekseninde yukarı doğru hareket ettir
        if (box3.position.y >= 2.5) {
            isJumpingbox3 = false; // Zirveye ulaşıldığında zıplama durumunu kapat
        }
    } else {
        box3.position.y -= boxJumpSpeed; // Kutuyu y ekseninde aşağı doğru hareket ettir
        if (box3.position.y <= 0.5) {
            isJumpingbox3 = true; // Zemin seviyesine ulaşıldığında zıplama durumunu aç
        }
    }

    // Zıplama mantığını uygula
    if (isJumpingSpehere) {
        sphere1.position.y += boxJumpSpeed; // Kutuyu y ekseninde yukarı doğru hareket ettir
        if (sphere1.position.y >= 4.5) {
            isJumpingSpehere = false; // Zirveye ulaşıldığında zıplama durumunu kapat
        }
    } else {
        sphere1.position.y -= boxJumpSpeed; // Kutuyu y ekseninde aşağı doğru hareket ettir
        if (sphere1.position.y <= 0.5) {
            isJumpingSpehere = true; // Zemin seviyesine ulaşıldığında zıplama durumunu aç
        }
    }



    

    sphere1.position.y += 5;
    sphere1.position.y -= 5;
    if (sphere1.position.x < 2.5 && sphere1.position.x > -2.5 && sphere1.position.z > 15.5) {
                // goooooool
        console.log("gool");
        playGoalMusic(); // Müziği çal

        sphere1.position.x = 0;
        sphere1.position.y = 0.5;
        sphere1.position.z = 0;
        box2.position.x = 0;
        box2.position.y = 0.5;
        box2.position.z = -14.5;
        box3.position.x = 0;
        box3.position.y = 0.5;
        box3.position.z = 14.5;
        // Skoru bir artır
        var currentScore = parseInt(secondScoreElement.innerHTML);
        var newScore = currentScore + 1;
        secondScoreElement.innerHTML = newScore;
    }
    if (sphere1.position.x < 2.5 && sphere1.position.x > -2.5 && sphere1.position.z < -15.5) {
        // goooooool
        console.log("gool");
        playGoalMusic(); // Müziği çal

        sphere1.position.x = 0;
        sphere1.position.y = 0.5;
        sphere1.position.z = 0;
        box2.position.x = 0;
        box2.position.y = 0.5;
        box2.position.z = -14.5;
        box3.position.x = 0;
        box3.position.y = 0.5;
        box3.position.z = 14.5;
        // Skoru bir artır
        var currentScore = parseInt(firstScoreElement.innerHTML);
        var newScore = currentScore + 1; 
        firstScoreElement.innerHTML = newScore; 
    }

        // Check for collision
    if (box2.position.distanceTo(sphere1.position) < 1.5) {
        // Collision occurred

        var sut = Math.floor(Math.random() * 5);
        sphere1.position.z += sut;


        scene.getObjectByName('sphere1').rotation.x += 2.0;
        scene.getObjectByName('sphere1').rotation.y += 2.0;

    }
    if (box3.position.distanceTo(sphere1.position) < 1.5) {
        // Collision occurred
        var sut = Math.floor(Math.random() * 5);
        sphere1.position.z -= sut;
     


        scene.getObjectByName('sphere1').rotation.x += 2.0;
        scene.getObjectByName('sphere1').rotation.y += 2.0;

    }
    if (box3.position.distanceTo(box2.position) < 1.5) {
        // Collision occurred
        box3.position.z = +1;
        box2.position.z = -1;
    }

    requestAnimationFrame(update_render);
}

function createBox(name, w, h, d,x,y,z, color) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshStandardMaterial({ color: color });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z); // başlangıç position
    mesh.name = name;
    mesh.castShadow = true; // gölgesi oluşabilsin
    mesh.receiveShadow = true; // başkasının gölgesi üzerine düşebilsin
    scene.add(mesh);
}

function createFloor(name, w, h, d, x, y, z, texture, color) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshStandardMaterial({ color: color });

    var loader = new THREE.TextureLoader(); // texture yükleme
    material.map = loader.load("../textures/" + texture + ".jpg");
    

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z); // başlangıç position
    mesh.name = name;
    mesh.castShadow = true; // gölgesi oluşabilsin
    mesh.receiveShadow = true; // başkasının gölgesi üzerine düşebilsin
    scene.add(mesh);
}
/*
function createPlayer(name, w, h, d, x, y, z, texture, color) {


    var geometry = new THREE.BoxGeometry(w, h, d);
    var geometry2 = new THREE.SphereGeometry(1,16,32)
    var material = new THREE.MeshStandardMaterial({ color: color });
    var material2 = new THREE.MeshStandardMaterial({ color: color });

    var loader = new THREE.TextureLoader(); // texture yükleme
    material.map = loader.load("../textures/" + texture + ".jpg");


    var mesh = new THREE.Mesh(geometry, material);
    var mesh2 = new THREE.Mesh(geometry2, material2);

    mesh.position.set(x,y , z); // başlangıç position
    mesh.name = name;
    mesh.castShadow = true; // gölgesi oluşabilsin
    mesh.receiveShadow = true; // başkasının gölgesi üzerine düşebilsin
    scene.add(mesh);

    mesh2.position.set(x , y + 2.3, z ); // başlangıç position
    mesh2.name = name;
    mesh2.castShadow = true; // gölgesi oluşabilsin
    mesh2.receiveShadow = true; // başkasının gölgesi üzerine düşebilsin
    scene.add(mesh2);
}
*/

//function createSpotLight() {
//    var spotLight = new THREE.SpotLight(0XFFFFFF); //ışığın rengi
//    spotLight.position.set(2, 4, 3);
//    spotLight.castShadow = true;
//    spotLight.shadow.mapSize.width = 4096; // daha kaliteli gölge
//    spotLight.shadow.mapSize.hight = 4096;

//    var target = new THREE.Object3D();
//    target.position.set(-10, 0, -10);
//    spotLight.target = target;

//    gui.add(spotLight.position, 'x', 0, 10);
//    gui.add(spotLight.position, 'y', 0, 10);
//    gui.add(spotLight.position, 'z', 0, 10);
//    gui.add(target.position, 'x', -10, 10);
//    gui.add(target.position, 'y', -10, 10);
//    gui.add(target.position, 'z', -10, 10);

//    scene.add(spotLight);
//    scene.add(target);
//}

function createDirectionalLight(x,y,z) {

    var dirLight = new THREE.DirectionalLight(0XFFFFFF); //ışığın rengi
    dirLight.position.set(x,y,z);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 4096; // daha kaliteli gölge
    dirLight.shadow.mapSize.hight = 4096;


    gui.add(dirLight.position, 'x', -80, 80).step(1);
    gui.add(dirLight.position, 'y', -40, 40).step(1);
    gui.add(dirLight.position, 'z', -80, 80).step(1);
    gui.add(dirLight, 'intensity', 0, 2).step(0.1);


    //var helper = new THREE.DirectionalLightHelper(dirLight);
    //scene.add(helper);
    scene.add(dirLight);

}

function createPointLight() {

    var pointLight = new THREE.PointLight(0XFFFFFF); //ışığın rengi
    pointLight.position.set(2, 4, 3);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 4096; // daha kaliteli gölge
    pointLight.shadow.mapSize.hight = 4096;
    pointLight.intensity = 2;


    gui.add(pointLight, 'intensity', 0, 10).step(1);
    gui.add(pointLight, 'distance', 0, 30).step(1);


    gui.add(pointLight.position, 'x', -20, 20).step(1);
    gui.add(pointLight.position, 'y', -20, 20).step(1);
    gui.add(pointLight.position, 'z', -20, 20).step(1);

    var helper = new THREE.PointLightHelper(pointLight);
    scene.add(helper);
    scene.add(pointLight);

}
/*
function createSphere(name, r1,ws,hs,x,y,z,texture) {
    var geometry = new THREE.SphereGeometry(r1, ws, hs);
    var mesh = new THREE.Mesh(geometry, material);
    var material = new.THREE.MeshStandardMaterial({ color: 0xffffff });
    var loader = new.THREE.TextureLoader();
    material.map = loader.load("../textures" + texture + ".jpg");
    material.aoMap = loader.load("../textures" + texture + "_ao.jpg");
    material.normalMap = loader.load("../textures" + texture + "_normal.jpg");

    material.map.wrapS = THREE.RepeatWrapper;
    material.map.wrapT = THREE.RepeatWrapper;
    material.map.repeat = new THREE.Vector2(5, 10);

    material.oaMap.wrapS = THREE.RepeatWrapper;
    material.oaMap.wrapT = THREE.RepeatWrapper;
    material.oaMap.repeat = new THREE.Vector2(5, 10);

    material.normalMap.wrapS = THREE.RepeatWrapper;
    material.normalMap.wrapT = THREE.RepeatWrapper;
    material.normalMap.repeat = new THREE.Vector2(5, 10);

    material.transparent = true;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, y, z);
    mesh.name = name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
}*/

/*function getMaterial(texture) {
    var material = new.THREE.MeshStandardMaterial({ color: 0xffffff });
    var loader = new.THREE.TextureLoader();
    material.map = loader.load("../textures" + texture + ".jpg");
    material.aoMap = loader.load("../textures" + texture + "_ao.jpg");
    material.normalMap = loader.load("../textures" + texture + "_normal.jpg");

    material.map.wrapS = THREE.RepeatWrapper;
    material.map.wrapT = THREE.RepeatWrapper;
    material.map.repeat = new THREE.Vector2(5, 10);

    material.oaMap.wrapS = THREE.RepeatWrapper;
    material.oaMap.wrapT = THREE.RepeatWrapper;
    material.oaMap.repeat = new THREE.Vector2(5, 10);

    material.normalMap.wrapS = THREE.RepeatWrapper;
    material.normalMap.wrapT = THREE.RepeatWrapper;
    material.normalMap.repeat = new THREE.Vector2(5, 10);

    material.transparent = true;

    return material;

} */
// Gol olduğunda müziği çal
function playGoalSound() {
    audioElement.play();
    setTimeout(pauseGoalSound, 10); // 2 saniye sonra durdur
}
// Müziği durdur
function pauseGoalSound() {
    audioElement.pause();
}

function createSphere(name, w, h, d, x, y, z, texture, color) {
    var geometry = new THREE.SphereGeometry(w, h, d);
    var material = new THREE.MeshStandardMaterial({ color: color });
    
    var loader = new THREE.TextureLoader(); // texture yükleme
    material.map = loader.load("../textures/" + texture + ".jpg");
    

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z); // başlangıç position
    mesh.name = name;
    mesh.castShadow = true; // gölgesi oluşabilsin
    mesh.receiveShadow = true; // başkasının gölgesi üzerine düşebilsin
    scene.add(mesh);
}

function playGoalMusic() {
    var audio = document.getElementById("golMuzik");
    audio.play(); // Müziği başlat
}

createScene();