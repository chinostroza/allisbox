var scene, camera, renderer;
var geometry, material, mesh;
var controls;
var drag;
var _mouse = new THREE.Vector2();
var _raycaster = new THREE.Raycaster();

var objects = [];

var app = {
	objectSelected:{},
	objectBeforeChange:{},
	isObjectSelected:false,
	mode:'default',
	controlCSS3Object:{},
	pageX:0,
	pageY:0,
	bufferKey:''
}

app.addBox = function(
	htmlString,
	x,
	y,
	z
	){

	if (x == undefined) { x = Math.random() * 800 - 400; }
	if (y == undefined) { y = Math.random() * 800 - 400; }
	if (z == undefined) { z = Math.random() * 800 - 400; }

    var element = document.createElement( 'div' );
	element.className = 'element';
	element.style.backgroundColor = 'transparent';

	
    element.innerHTML = htmlString;

    var object = new THREE.CSS3DObject( element );
			object.position.x = x;
			object.position.y = y;
			object.position.z = z;
		
	object.element.addEventListener('click',function(event){
		app.mouseDownElement(event);
		app.objectSelected = object;
		app.isObjectSelected = true;
		    // Create a new event
		var event = new CustomEvent('onselectedbox');

		// Dispatch the event
		this.dispatchEvent(event);

	});
	
	console.log( object );
    scene.add( object );
	objects.push( object );
	
	return object.element;
}

document.addEventListener('keydown', function(event){

	//console.log(event.keyCode);


	if ( app.mode == 'edit-text' ) {
		//app.insertText( event );
	}

	if( ( event.keyCode == 69 ) && app.isObjectSelected ){
		app.mode = 'edit-text';
	}

	if (event.keyCode == 87 && app.isObjectSelected){
		app.mode = 'edit';
		//console.log('mode: ',app.mode)
		app.showTranslateMode();
	}

	if (event.keyCode == 90 && app.isObjectSelected){
		app.mode = 'z';
		//console.log('mode :',app.mode)
		app.showTranslateMode();
	}

	if (event.keyCode == 82 && app.isObjectSelected){
		app.mode = 'scale';
		//console.log('mode :',app.mode)
		app.showTranslateMode();
	}
	if (event.keyCode == 48){
		app.mode = 'default';
        app.resetCamera(event);
    }
    
    if (event.keyCode == 27){
		app.mode = 'default';
		app.bufferKey='';
	}

	if (
		( event.keyCode == 37 ||
			event.keyCode == 38 || event.keyCode == 39 ||
			event.keyCode == 40 ) 
		&& app.mode == 'edit') app.moveKey(event)


	if (
		( event.keyCode == 37 ||
			event.keyCode == 38 || event.keyCode == 39 ||
			event.keyCode == 40 ) 
		&& app.mode == 'scale') app.scaleKey(event)


	if (
		( event.keyCode == 37 ||
			event.keyCode == 38 || event.keyCode == 39 ||
			event.keyCode == 40 ) 
        && app.mode == 'z') app.moveZKey(event)
        

});

document.addEventListener('mousemove',function(event){
	if (app.mode == 'edit'){
		//app.moveElement(event);
	}

});

app.moveElement = function(event){


	_mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	_raycaster.setFromCamera( _mouse, camera );

	//console.log(_raycaster.ray.direction);

	
}


app.mouseDownElement = function (event){

	_raycaster.setFromCamera( _mouse, camera );
	var intersects = _raycaster.intersectObjects( objects );
	for ( var  i = 0 ; i < objects.length ; i++ ){
		//console.log(objects[i].position.x);
		//console.log(event);
		//console.log(window.innerWidth)

	}
}


app.moveKey = function(event){
	if (event.keyCode == 37) app.objectSelected.position.x = app.objectSelected.position.x - 20;
	if (event.keyCode == 38) app.objectSelected.position.y = app.objectSelected.position.y + 20;
	if (event.keyCode == 39) app.objectSelected.position.x = app.objectSelected.position.x + 20;
	if (event.keyCode == 40) app.objectSelected.position.y = app.objectSelected.position.y - 20;
}

app.scaleKey = function(event){
	if (event.keyCode == 37) app.objectSelected.scale.x = app.objectSelected.scale.x + 0.1;
	if (event.keyCode == 38) app.objectSelected.scale.y = app.objectSelected.scale.y + 0.1;
	if (event.keyCode == 39) app.objectSelected.scale.x = app.objectSelected.scale.x - 0.1;
	if (event.keyCode == 40) app.objectSelected.scale.y = app.objectSelected.scale.y - 0.1;
}

app.moveZKey = function(event){

	if (event.keyCode == 37) app.objectSelected.position.z = app.objectSelected.position.z - 20;
	if (event.keyCode == 38) app.objectSelected.position.z = app.objectSelected.position.z + 20;
	if (event.keyCode == 39) app.objectSelected.position.z = app.objectSelected.position.z + 20;
	if (event.keyCode == 40) app.objectSelected.position.z = app.objectSelected.position.z - 20;
	
}

app.resetCamera = function(event){
    console.log(event.keyCode)
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3000;
}

app.showTranslateMode = function(){}

init();
animate();

function init() {

    var x_body = document.getElementsByTagName("body")[0];
    x_body.style.margin = 0;
	scene = new THREE.Scene();
	//scene.background = new THREE.Color( 0x000000 );
	/*
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	*/
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 3000;
	
	/*
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
	camera.position.set(0, 0, 100);
	*/
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	geometry = new THREE.BoxGeometry( 200, 200, 200 );
	material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

	//create a blue LineBasicMaterial
	var material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });

	var geometry_line = new THREE.Geometry();
	geometry_line.vertices.push(new THREE.Vector3(-10, 0, 0));
	geometry_line.vertices.push(new THREE.Vector3(0, 10, 0));
	geometry_line.vertices.push(new THREE.Vector3(10, 0, 0));

	var line = new THREE.Line(geometry_line, material_line);

	scene.add( line );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	/*renderer = new THREE.WebGLRenderer();*/
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute';

	document.body.appendChild( renderer.domElement );



	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 0.5;
	controls.minDistance = 0;
	controls.maxDistance = 6000;
	controls.addEventListener( 'change', render );


	renderer.domElement.addEventListener('mousedown',function(event){
		//console.info(renderer);
	});

    window.addEventListener( 'resize', onWindowResize, false );    
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    if (app.mode == 'default'){
    controls.update();
}

renderer.render( scene, camera );

}
function render() {
    renderer.render( scene, camera );
}
