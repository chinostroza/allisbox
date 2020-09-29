function Allisbox () {
    this.application = app
}

Allisbox.prototype.addBox = function( htmlString ){
    return this.application.addBox(htmlString);
};

Allisbox.prototype.img = function( src , x , y , z ){
    return this.application.addBox("<img src='"+ src +"' />", x, y, z);
}

Allisbox.prototype.getBoxSelected = function(){
    return this.application.objectSelected;
}