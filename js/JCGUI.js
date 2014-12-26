





/* JCGUI Class ------------------------------------------ */

var JCGUI = function() {

	this.grid_ratio = 1.618;
	this.column_amount = 16;

	this.grid_size_x;
	this.grid_size_y;

	this.type_base = window.getComputedStyle(document.body, null).fontSize.slice(0, -2);
	this.type_scale = [];

	this.grid_ctx;
	this.elements = [];

	this.ww = window.innerWidth;
	this.wh = window.innerHeight;

	this.createGrid();

};



JCGUI.prototype.createElement = function() {
	var element = new JCGUIElement();
	var num = this.elements.length;
	element.idnum = num;
	this.elements.push(element);
	return(element);
};



JCGUI.prototype.updateAllElements = function() {
	var len = this.elements.length;
	for(var i=0; i<len; ++i) {
		this.elements[i].update(false);
	}
};



JCGUI.prototype.createGrid = function() {

	var c = document.createElement("canvas");
	c.id = "grid_canvas";
	document.body.appendChild(c);
	this.grid_ctx = c.getContext("2d");
	this.type_scale = this.calcScale(this.type_base, this.grid_ratio);

	this.updateGrid();
	//this.updateType();

}


JCGUI.prototype.updateGrid = function() {

	/* canvas draw */
	this.ww = window.innerWidth;
	this.wh = window.innerHeight;

	this.grid_ctx.canvas.width = this.ww;
	this.grid_ctx.canvas.height = this.wh;
	
	this.grid_size_x = (this.ww/this.column_amount).toFixed(1);
	this.grid_size_y = (Math.floor(this.type_scale[5])).toFixed(1);

	/* draw grid lines --------------------------------- */
	var hor_lines = Math.floor((this.wh/this.type_base));
	var ver_lines = Math.floor(this.ww/this.column_amount);

	for(var i=0; i<hor_lines; ++i) {
		
		var y = (Math.floor((this.grid_size_y * (i+1)-this.grid_size_y))-0.5);
		this.grid_ctx.beginPath();
		this.grid_ctx.moveTo(0,y);
		this.grid_ctx.lineTo(this.ww, y);
		this.grid_ctx.lineWidth = 0.5;
		this.grid_ctx.strokeStyle = (i%2) ? "#555555" : "#888888";
		this.grid_ctx.stroke();
		this.grid_ctx.closePath();
		
	}

	for(var i=0; i<ver_lines; ++i) {
		var x = (Math.floor(this.grid_size_x * (i+1))-0.5);
		this.grid_ctx.beginPath();
		this.grid_ctx.moveTo(x,0);
		this.grid_ctx.lineTo(x, this.wh);
		this.grid_ctx.lineWidth = 1;
		this.grid_ctx.strokeStyle = '#33cccc';
		this.grid_ctx.stroke();
		this.grid_ctx.closePath();
	}

	this.updateAllElements();

}


JCGUI.prototype.updateType = function() {

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


JCGUI.prototype.calcScale = function(base, ratio) {
	var scale = [];

	scale.push(base);
	scale.push((base/ratio).toFixed(2), ((base/ratio)/ratio).toFixed(2), (((base/ratio)/ratio)/ratio).toFixed(2), ((((base/ratio)/ratio)/ratio)/ratio).toFixed(2));
	scale.push((base*ratio).toFixed(2), ((base*ratio)*ratio).toFixed(2), (((base*ratio)*ratio)*ratio).toFixed(2), ((((base*ratio)*ratio)*ratio)*ratio).toFixed(2));
	scale.sort(function(a, b){return a-b});

	return scale;

}



JCGUI.prototype.getColumnWidth = function(numColumns) {
	return numColumns*this.grid_size_x;
}

JCGUI.prototype.fitGridX = function(number) {
	return this.grid_size_x*Math.round(number/this.grid_size_x);
}

JCGUI.prototype.fitGridY = function(number) {
	return this.grid_size_y*Math.round(number/this.grid_size_y);
}




JCGUI = new JCGUI();








/* JCGUIElement Class ------------------------------- */


var JCGUIElement = function(type) {
	type = typeof type !== 'undefined' ? type : "div";

	this.GUIParent;	
	this.children = [];

	this.snapToGrid = true;

	this.x = 0;
	this.y = 0;
	this.x_relative;
	this.y_relative;

	this.width = JCGUI.grid_size_x;
	this.height = JCGUI.grid_size_y;
	this.width_relative;
	this.height_relative;

	this.rotation = 0;

	this.id;
	this.idnum;
	this.classes = [];
	this.addClass("gui_element");

	this.dom = document.createElement('div');
	document.body.appendChild(this.dom);
	this.dom.style.position = "absolute";

	this.update();

};




JCGUIElement.prototype.update = function() {
	
	var classes_str = this.classes.join();
	var width = this.width;
	var height = this.height;
	var x = this.x;
	var y = this.y;

	this.dom.className = classes_str;
	
	if(typeof this.width_relative !== 'undefined' && this.width_relative !== 0) {
		width = this.width_relative*JCGUI.ww;
	}

	if(typeof this.height_relative !== 'undefined' && this.height_relative !== 0) {
		height = this.height_relative*JCGUI.wh;
	}

	if(typeof this.x_relative !== 'undefined' && this.x_relative !== 0) {
		x = this.x_relative*JCGUI.ww;
	} 

	if(typeof this.y_relative !== 'undefined' && this.y_relative !== 0) {
		y = this.y_relative*JCGUI.wh;
	}  


	if(this.snapToGrid) {
		width = JCGUI.grid_size_x*Math.round(width / JCGUI.grid_size_x);
		height = JCGUI.grid_size_y*Math.round(height / JCGUI.grid_size_y);
		x = JCGUI.grid_size_x*Math.round(x / JCGUI.grid_size_x);
		y = JCGUI.grid_size_y*Math.round(y / JCGUI.grid_size_y);
	}





	this.dom.style.width = width + "px";
	this.dom.style.height = height + "px";
	this.dom.style.left = x + "px";
	this.dom.style.top = y + "px";
	
	if (typeof(this.id) != "undefined") {
		this.dom.id = this.id;
	} else {
		this.dom.id = "JCGUIElement_" + this.idnum;
	}


}





JCGUIElement.prototype.addClass = function(classname) {
	this.classes.push(classname);
}



JCGUIElement.prototype.addChild = function(child) {
	this.dom.appendChild(child.dom);
	child.GUIParent = this;
	this.children.push(child);

}



JCGUIElement.prototype.setXRel= function(percent, subself) {
	var pw;

	if(typeof this.GUIParent !== 'undefined') {
		pw = this.GUIParent.width;
	} else {
		pw = window.innerWidth;
	}

	var minus = (subself) ? this.width/2 : 0;
	this.x = (pw*percent)-minus;
	

}

JCGUIElement.prototype.setYRel= function(percent, subself) {
	var pw;
	
	if(typeof this.GUIParent !== 'undefined') {
		pw = this.GUIParent.height;
	} else {
		pw = window.innerHeight;
	}

	var minus = (subself) ? this.height/2 : 0;
	this.y = (pw*percent)-minus;
	

}



/* JCGUIElement Sub class example ------------------------------- */

var JCGUIElementPsysics = function(type) {
	JCGUIElement.call(this, type);
}


JCGUIElementPsysics.prototype.update = function() {
	console.log("override update");

}











