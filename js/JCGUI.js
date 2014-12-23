

var JCGUI = function() {
	this.elements = [];
};

JCGUI.prototype.createElement = function() {
	var element = new JCGUIElement();
	var num = this.elements.length;
	element.idnum = num;
	this.elements.push(element);
	return(element);
};

JCGUI.prototype.updateAll = function() {
	var len = this.elements.length;
	for(var i=0; i<len; ++i) {
		this.elements[i].update(false);
	}
};


JCGUI = new JCGUI();






var JCGUIElement = function() {
	
	this.GUIParent;	
	this.children = [];

	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 100;
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



JCGUIElement.prototype.update = function(updateChildren) {
	updateChildren = typeof updateChildren !== 'undefined' ? updateChildren : true;

	var classes_str = this.classes.join();
	this.dom.className = classes_str;

	this.dom.style.width = this.width + "px";
	this.dom.style.height = this.height + "px";
	this.dom.style.left = this.x + "px";
	this.dom.style.top = this.y + "px";
	
	if (typeof(this.id) != "undefined") {
		this.dom.id = this.id;
	} else {
		this.dom.id = "JCGUIElement_" + this.idnum;
	}

	/*
	if(typeof updateChildren != 'undefined' && updateChildren==true) {
		console.log('updateChildren');
		for(var i=0; i<this.children.length; ++i) {
			this.children[i].update();
		}
	}
	*/



}


