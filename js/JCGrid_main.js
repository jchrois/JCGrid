/* JCGrid_main.js */


/* -------------------------------------------- */

window.onload = setup();

var ww;
var wh;

var scene, camera, renderer;
var light;

/* -------------------------------------------- */


function setup() {
	
	ww = window.innerWidth;
	wh = window.innerHeight;

	window.addEventListener('resize', onWindowResize, false);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.id = "canvas3D";
	renderer.domElement.style.position = "absolute";
	//document.body.appendChild( renderer.domElement );
	renderer.setClearColor(0xffffff, 0);

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
var inventory_bnt1;

function createGUI() {

	healthbar = JCGUI.createElement();
	healthbar.id = "healthbar";
	healthbar.html = "Healthbar";

	inventory = JCGUI.createElement();
	inventory.id = "inventory";
	inventory.html = "Inventory";

	inventory_bnt1 = JCGUI.createElement();
	inventory_bnt1.id = "inventory_bnt1";

	inventory.addChild(inventory_bnt1);

	JCGUI.updateAll();

	resizeGUI();
}

function resizeGUI() {
	healthbar.width = ww*0.1;
	healthbar.height = wh*0.1;
	healthbar.x = ww*0.05;
	healthbar.y = wh*0.05;

	inventory.width = 300;
	inventory.x = ww*0.95 - inventory.width;
	inventory.y = wh*0.95 - inventory.height;

	inventory_bnt1.x = 10;

	JCGUI.updateAll();

}



/* Event handlers ------------------------------------------------ */
function onWindowResize(){

	ww = window.innerWidth;
	wh = window.innerHeight;

	resizeGUI();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );   

}






