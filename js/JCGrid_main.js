/* JCGrid_main.js */

/*
TODO

Combine GUI & Baseline grid
Element snap to grid

*/


//var col_width = 190;
var grid_ratio = 1.618; //1.618;

var grid_size_x;
var grid_size_y;

var column_amount = 16;

var type_base;
var type_scale = [];

var grid_ctx;



/* -------------------------------------------- */

window.onload = setup();

var ww;
var wh;

var on3D = false;
var onGUI = false;

var scene, camera, renderer;
var light;

/* -------------------------------------------- */


function setup() {
	
	ww = window.innerWidth;
	wh = window.innerHeight;

	type_base = window.getComputedStyle(document.body, null).fontSize.slice(0, -2);

	window.addEventListener('resize', onWindowResize, false);

	if(on3D) create3D();
	if(onGUI) createGUI();
	createGrid();
	render();

}


function render() {
	requestAnimationFrame(render);
	
	//updateGrid();
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








function createGrid() {

	//console.log("Create grid");

	var c = document.createElement("canvas");
	c.id = "grid_canvas";
	document.body.appendChild(c);
	grid_ctx = c.getContext("2d");

	type_scale = calcScale(type_base, grid_ratio);

	updateGrid();
	updateType();


	var txt_div = document.getElementById('txt');
	txt_div.isOpen = true;
	txt_div.addEventListener("click", onTxtDivClick)
	
}



function updateGrid() {


	/* canvas draw */
	grid_ctx.canvas.width = ww;
	grid_ctx.canvas.height = wh;
	
	grid_size_x = ww /column_amount;
	grid_size_y = Math.floor(type_scale[5]);


	/* draw grid lines --------------------------------- */
	var hor_lines = Math.floor((wh/type_base));
	var ver_lines = Math.floor(ww/column_amount);

	for(var i=0; i<hor_lines; ++i) {
		
		var y = (Math.floor((grid_size_y * (i+1)-grid_size_y))-0.5);
		grid_ctx.beginPath();
		grid_ctx.moveTo(0,y);
		grid_ctx.lineTo(ww, y);
		grid_ctx.lineWidth = 0.5;
		grid_ctx.strokeStyle = (i%2) ? "#555555" : "#888888";
		grid_ctx.stroke();
		grid_ctx.closePath();
		
	}

	for(var i=0; i<ver_lines; ++i) {
		var x = (Math.floor(grid_size_x * (i+1))-0.5);
		grid_ctx.beginPath();
		grid_ctx.moveTo(x,0);
		grid_ctx.lineTo(x, wh);
		grid_ctx.lineWidth = 1;
		grid_ctx.strokeStyle = '#33cccc';
		grid_ctx.stroke();
		grid_ctx.closePath();

	}

	var txt_div = document.getElementById('txt');
	txt_div.style.width = grid_size_x * 10 + "px";
	txt_div.style.height = grid_size_y * 35 + "px";
	txt_div.style.top = grid_size_y * 2 + "px";
	txt_div.style.left = grid_size_x * 1 + "px";


}





function updateType() {

	updateTypeElement("p", type_base);
	updateTypeElement("h1", type_scale[7], true);
	updateTypeElement("h2", type_scale[6], true);
	updateTypeElement("h3", type_scale[5], true);
	updateTypeElement("h4", type_scale[4], true);
	updateTypeElement("small", type_scale[3]);

	function updateTypeElement(element, scale, head) {
		var elements = document.querySelectorAll(element);
		for(var i=0; i<elements.length;++i) {

			var new_line_height = (head) ? grid_size_y*Math.ceil(scale/(grid_size_y)) : grid_size_y;
			var margin_top = (head) ? grid_size_y : 0;

			elements[i].style.fontSize = scale + "px";
			elements[i].style.lineHeight = new_line_height + "px";
			elements[i].style.marginTop = margin_top + "px";
			elements[i].style.marginBottom = grid_size_y + "px";
			elements[i].style.paddingLeft = grid_size_y + "px";
			elements[i].style.paddingRight = grid_size_y + "px";
		}

	}

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

	updateGrid();

	if(onGUI) resizeGUI();
	
	if(on3D) { 
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth, window.innerHeight );   
	}



}





function onTxtDivClick(e) {
	//console.log(e.currentTarget.isOpen);
	var isOpen = e.currentTarget.isOpen;
	if(isOpen !== 'undefined' && isOpen) {
		var ani = new TweenLite.to(e.currentTarget, 1, {css:{height:grid_size_y*3}, ease:Cubic.easeInOut});
		e.currentTarget.isOpen = false;

		fuckupText(e.currentTarget);

	} else {
		var ani = new TweenLite.to(e.currentTarget, 1, {css:{height:grid_size_y*35}, ease:Cubic.easeInOut});
		e.currentTarget.isOpen = true;
		restoreText(e.currentTarget);
	}
}



function fuckupText(element) {
	console.log("fuck up");
	var nodes = element.childNodes;

	for(var i=0; i<nodes.length; i++) {
		//console.log(nodes[i].nodeName);
		if(nodes[i].nodeName === 'H2') {
			console.log("test");
			TweenLite.to(nodes[i], 1, {css:{fontSize: type_base + "px", lineHeight: grid_size_y + "px"}, ease:Cubic.easeInOut});
		}  else if(nodes[i].nodeName !== '#text') {
	   	 	//console.log(nodes[i]);
	   		//nodes[i].style.whiteSpace = "";
	   		TweenLite.to(nodes[i], 1, {css:{color:"#ffffff"}, ease:Cubic.easeInOut});
	   }
	}

}

function restoreText(element) {
	
	var nodes = element.childNodes;

	//element.style.background = "";

	for(var i=0; i<nodes.length; i++) {
	   if(nodes[i].nodeName === 'H2') {
			console.log("test");
			TweenLite.to(nodes[i], 1, {css:{fontSize: type_scale[6] + "px", lineHeight: grid_size_y*2 + "px"}, ease:Cubic.easeInOut});
		} else if(nodes[i].nodeName !== '#text') {
	   	 	//console.log(nodes[i]);
	   		//nodes[i].style.whiteSpace = "";
	   		TweenLite.to(nodes[i], 1, {css:{color:"#999999"}, ease:Cubic.easeInOut});
	   }
	}

}










/* Utils --------------------------------------------------------- */

function calcScale(base, ratio) {
	var scale = [];

	scale.push(base);
	scale.push((base/ratio).toFixed(2), ((base/ratio)/ratio).toFixed(2), (((base/ratio)/ratio)/ratio).toFixed(2), ((((base/ratio)/ratio)/ratio)/ratio).toFixed(2));
	scale.push((base*ratio).toFixed(2), ((base*ratio)*ratio).toFixed(2), (((base*ratio)*ratio)*ratio).toFixed(2), ((((base*ratio)*ratio)*ratio)*ratio).toFixed(2));
	scale.sort(function(a, b){return a-b});

	return scale;

}


String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}