/* JCGrid_main.js */

/*
TODO

GUI Baseline grid
Element snap to grid

*/



/* -------------------------------------------- */

window.onload = setup();

var ww;
var wh;

var on3D;
var scene, camera, renderer;
var light;

/* -------------------------------------------- */


function setup() {
	
	ww = window.innerWidth;
	wh = window.innerHeight;

	window.addEventListener('resize', onWindowResize, false);

	create3D();
	createGUI();
	render();

}


function render() {
	requestAnimationFrame(render);
	if(on3D) {
		renderer.render(scene, camera);	
	}
	
}


function create3D() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.id = "canvas3D";
	renderer.domElement.style.position = "absolute";
	document.body.appendChild( renderer.domElement );
	renderer.setClearColor(0x000000, 0);

	light = new THREE.PointLight( 0xffffff, 1);
	light.position.set( 100, 50, 100 );
	scene.add( light );

	on3D = true;

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
	inventory_bnt1.html = "bnt1";
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
	inventory.height = 300;

	
	inventory.setXRel(0.05);
	inventory.setYRel(0.70, true);
	inventory_bnt1.setXRel(0.5, true);

	JCGUI.updateAll();

}



/* Event handlers ------------------------------------------------ */
function onWindowResize(){

	ww = window.innerWidth;
	wh = window.innerHeight;

	resizeGUI();
	
	if(on3D) { 
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth, window.innerHeight );   
	}

}






