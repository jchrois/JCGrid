/* JCGrid_main.js */

/*
TODO

Make animatable & snap work toghether


*/


/* -------------------------------------------- */

window.onload = setup();

var ww;
var wh;

var on3D = false;
var onGUI = false;

var scene, camera, renderer;
var light;

/* -------------------------------------------- */


var box1;
var box2;


function setup() {
	
	ww = window.innerWidth;
	wh = window.innerHeight;

	window.addEventListener('resize', onWindowResize, false);

	if(on3D) create3D();
	if(onGUI) createGUI();

	box1 = JCGUI.createElement();
	box1.width_relative = 0.5;
	box1.height_relative = 0.1;

	box2 = JCGUI.createElement();
	box2.width_relative = 0.45;
	box2.height_relative = 0.3;
	box2.x_relative = 0.05;
	box2.y_relative = 0.2;
	
	JCGUI.updateAllElements();

	TweenLite.from(box2, 1, {x: JCGUI.fitGridX(1000), onComplete: function() {box2.snapToGrid=true}});

	render();

}


function render() {
	requestAnimationFrame(render);

	JCGUI.updateAllElements();
	
	if(on3D) renderer.render(scene, camera);	
	
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
















/* Event handlers ------------------------------------------------ */
function onWindowResize(){

	ww = window.innerWidth;
	wh = window.innerHeight;

	JCGUI.updateGrid();
	
	if(on3D) { 
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth, window.innerHeight );   
	}

}












