/* JCGrid_main.js */


/* -------------------------------------------- */

window.onload = setup();

var scene, camera, renderer;
var light;

/* -------------------------------------------- */


function setup() {
	
	window.addEventListener('resize', onWindowResize, false);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.id = "canvas3D";
	renderer.domElement.style.position = "absolute";
	document.body.appendChild( renderer.domElement );
	renderer.setClearColor(0xcccccc, 1);

	light = new THREE.PointLight( 0xffffff, 1);
	light.position.set( 100, 50, 100 );
	scene.add( light );

	createGUI();
	render();

}


function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);

}






var healthbar;
var inventory;

function createGUI() {

	healthbar = JCGUI.createElement();
	healthbar.id = "healthbar";
	healthbar.html = "Healthbar";

	inventory = JCGUI.createElement();
	inventory.id = "inventory";
	inventory.html = "Inventory";

	JCGUI.updateAll();

	resizeGUI();
}

function resizeGUI() {
	healthbar.width = window.innerWidth*0.1;
	healthbar.height = window.innerHeight*0.1;
	healthbar.x = window.innerWidth*0.05;
	healthbar.y = window.innerHeight*0.05;


	JCGUI.updateAll();

}



/* Event handlers ------------------------------------------------ */
function onWindowResize(){

	resizeGUI();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );   

}






