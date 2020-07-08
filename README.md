# allisbox community edition

allisbox community edition is open source 3D display library for html components, is a core of www.allisbox.com

* include library, after tag `<body>`

```html
<body>
<script src="allisbox-min-0.1.0.js"></script>
<script type="text/javascript">
```

```javascript
// init library
var allisbox = new Allisbox(app);

// create a box of type <img>
var box = allisbox.img(
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin-logo.svg/1200px-Kotlin-logo.svg.png",
		293.0698303956947,
		-397.7736561965088,
		-121.86016868872878
		);

// add code for onselectedbox event	
box.addEventListener('onselectedbox', function (element) {
    alert("kotlin")
}, false);

// create a generic html element , for example youtube iframe :)
allisbox.addBox("<iframe width='560' height='315' src='https://www.youtube.com/embed/FGBhQbmPwH8' frameborder='0'  allowfullscreen></iframe>");
```
<img src="https://raw.githubusercontent.com/chinostroza/allisbox/master/screen_example.png" />
