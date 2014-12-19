

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
		this.elements[i].update();
	}
};


JCGUI = new JCGUI();






var JCGUIElement = function() {
	
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = 100;
	this.rotation = 0;

	this.id;
	this.idnum;
	this.classes = [];
	this.html = "";

	this.addClass("gui_element");

	this.dom = document.createElement('div');
	document.body.appendChild(this.dom);
	this.dom.style.position = "absolute";

	this.update();

};

JCGUIElement.prototype.addClass = function(classname) {
	this.classes.push(classname);
}


JCGUIElement.prototype.update = function() {

	var classes_str = this.classes.join();
	console.log(classes_str);
	this.dom.className = classes_str;

	this.dom.style.width = this.width + "px";
	this.dom.style.height = this.height + "px";
	this.dom.style.left = this.x + "px";
	this.dom.style.top = this.y + "px";

	this.dom.innerHTML = this.html;
	
	if (typeof(this.id) != "undefined") {
		this.dom.id = this.id;
	} else {
		this.dom.id = "JCGUIElement_" + this.idnum;
	}

}


