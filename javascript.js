
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 10, 550 );

    var renderer = new THREE.WebGLRenderer({precision: "highp", antialias: true, canvas: document.getElementById("canvas") });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    //Ambient light
    var ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
    scene.add( ambient );
    //Light
    /*var light = new THREE.PointLight( 0xffffff, 2, 5000 );
    light.position.set(0, 4000, 0);
    scene.add( light );*/
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
    directionalLight.position.z = 100;
    scene.add( directionalLight );

    var texture = new THREE.TextureLoader().load( "/stars.jpeg" );
    scene.background = texture;

    camera.position.z = 100;
    camera.position.y = 200;
    camera.rotation.x = -0.9;

    let issObject = null;
    function loadGLTF() {
        // Instantiate a loader
        var loader = new THREE.GLTFLoader();

        // Optional: Provide a DRACOLoader instance to decode compressed mesh data
        //THREE.DRACOLoader.setDecoderPath( '/examples/js/libs/draco' );
        //loader.setDRACOLoader( new THREE.DRACOLoader() );

        // Load a glTF resource
        loader.load(
            // resource URL
            '/models/scene.gltf',
            // called when the resource is loaded
            function ( gltf ) {
                issObject = gltf.scene.children[0];
                var m = new THREE.Matrix4();
                m.makeScale(0.1, 0.1, -0.1);
                issObject.applyMatrix(m);
                //issObject.scale = new THREE.Vector3(0.001, 0.001, 0.001); 
                scene.add( issObject );
                //TODO: start presentation
/*
                gltf.animations; // Array<THREE.AnimationClip>  
                gltf.scene; // THREE.Scene
                gltf.scenes; // Array<THREE.Scene>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
*/
            },
            // called while loading is progressing
            function ( xhr ) {
                // TODO: draw [====-----]
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened:', error );
            }
        );
    }

    var animate = function () {
        requestAnimationFrame( animate );
        if (issObject) {
            directionalLight.target = issObject
            issObject.rotation.z += 0.003;
            //camera.lookAt(issObject.position);
        }
        renderer.render( scene, camera );
    };
    loadGLTF();    
    animate();            
            
            
            
            
    const STRINGS = ["Аэрокосмическая инженерия - это основное направление в инженерии, которое занимается вопросами развития летательных и космических аппаратов.     Она состоит из двух основных, и дублирующих друг друга ветвей: авиационной техники и астронавтики.",
                        "Аэрокосмической инженерией занимается инженер аэрокосмических систем."];
    let strN = 0;
    let cursorVisible = true;
    let end = true;

    /*function startCursor(){
        let cursor = document.getElementById("cursor");
        if(cursorVisible){
            cursor.style.color = "white";
        } else {
            cursor.style.color = "green";
        }
        cursorVisible = !cursorVisible;
    }*/

    function clear(){
        if(!end)
            return;
        document.getElementById("info").innerHTML = "";
    }

    function addLetter(letter, info){
        info.innerHTML = info.innerHTML + letter;
    }

    function print(text){
        let info = document.getElementById("info");
        printPiece(text, info, 90);
    }

    function printFast(text){
        let info = document.getElementById("info");
        printPiece(text, info, 50);
    }

    
    function printPiece(text, info, delay){
        if(!end)
            return;
        document.getElementById("button").classList.add("disabled");
        end = false;
        let piece = 0;
        printMini();
        function printMini(){
            //printPiece(text, info);
            addLetter(text.charAt(piece), info);
            piece++;
            if(piece > text.length){
                document.getElementById("button").classList.remove("disabled");
                end = true;
                return;
            }
            setTimeout(printMini, delay);
        }
    }

    function handler(){
        clear();               
        //print("Аэрокосмической инженерией занимается инженер аэрокосмических систем.");
        if(STRINGS[strN].length < 200)
            print(STRINGS[strN]);
        else
            printFast(STRINGS[strN]);
        strN++;
        if(strN >= STRINGS.length){
            strN = 0;
        }
    }

    //setInterval(startCursor, 500);
    //print("Аэрокосмическая инженерия - это основное направление в инженерии, которое занимается вопросами развития летательных и космических аппаратов.     Она состоит из двух основных, и дублирующих друг друга ветвей: авиационной техники и астронавтики.");
    //print("Папа, помоги исправить ошибку в коде!");
    handler();