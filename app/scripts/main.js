//config

var fps = 24;
// var imgPath1 = '../images/char9.png';
// var imgPath1 = '../images/fire.png';
var imgPath1 = './images/ice.png';

var frameHeight;
var frameWidth;

var canvas = null;
var img = null;
var ctx = null;
var imageReady = false;
var frame = 0;
var hashData;

function onload() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  img = new Image();
  img.src = imgPath1;
  img.onload = loaded();

  frameHeight = canvas.height;
  frameWidth = canvas.width;
}

function loaded() {
  imageReady = true;
  setTimeout( update, 1000 / 60 );
}

function redraw() {

  ctx.clearRect(0, 0, frameWidth, frameHeight);
  ctx.fillStyle = 'rgba(0, 0, 200, 0)';
  ctx.fillRect(0, 0, frameWidth, frameHeight);
  // if (imageReady) {
      // ctx.drawImage(img, frame*96, 0, 96, 54,canvas.width/2 - 48, canvas.height/2 - 48, 96, 54);
      // ctx.drawImage(img, frame*96, 0, 96, 54,canvas.width/2 - 200, canvas.height/2 - 48, 70, 38);
      // ctx.drawImage(img, frame*96, 0, 96, 54,canvas.width/2 + 100, canvas.height/2 - 48, 60, 30);
      //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
      ctx.drawImage(img, frame*96, 0, 96, 54,0, 0, frameWidth, frameHeight);
  // }
}

function update(){
  redraw();
  frame++;
  if (frame >= 6)
  {
    frame = 0;
  }
  setTimeout( update, 1000 / fps );
}


function textUpdate()
{
  var text = document.getElementById('inputBox').value;

  console.log(text);

  $('#svgContainer').html('<svg id="svg" height="86px" width="300px"><text id="copyText" x="10" y="50%" fill="white" contenteditable="true">'+text+'<animate attributeName="x" from="0%" to="100%" begin="0s" dur="4s" repeatCount="indefinite"></animate></text></svg>');

}


function changePage(e)
{
  window.location.hash = '#'+ e;
}

function getHash()
{
  hashData = window.location.hash.substring(1);

	if (hashData!==''){
    changePage(hashData);
	}
}

$(window).on('hashchange', function()
{
  hashData = window.location.hash.substring(1);

	$('.page').hide();
	$('#p'+hashData).show();
});


//Photo
var width;
var canvasHeight;

function getSize()
{
  width = $(window).width();
  // console.log("window width= "+width);
  canvasWidth = $(window).width();
  height = $(window).height();

  canvasHeight = width * 590/945;
}

window.onload = function() {
  var fileInput = document.getElementById('fileUpload');
  fileInput.onchange = function() {
    var file = fileInput.files[0];
    // MegaPixImage constructor accepts File/Blob object.
    var mpImg = new MegaPixImage(file);

    // Render resized image into image element using quality option.
    // Quality option is valid when rendering into image element.
    // var resImg = document.getElementById('resultImage');
    // mpImg.render(resImg, { maxWidth: 300, maxHeight: 300, quality: 0.5 });
    //
    // // Render resized image into canvas element.
    // var resCanvas1 = document.getElementById('resultCanvas1');
    // mpImg.render(resCanvas1, { maxWidth: 300, maxHeight: 300 });

    // Render resized image into canvas element, rotating orientation = 6 (90 deg rotate right)
    // Types of orientation is defined in EXIF specification.
    // To detect orientation of JPEG file in JS, you can use exif.js from https://github.com/jseidelin/exif-js
    var resCanvas2 = document.getElementById('resultCanvas2');
    mpImg.render(resCanvas2, {maxWidth: 1000, maxHeight: 1000, quality: 1, orientation: 6 });

    setTimeout("draw()",1000);
  };
};

//kinetic.js
var stage = new Kinetic.Stage
({
  container: 'canvasContainer',
  width: width,
  height: canvasHeight
});

var layer = new Kinetic.Layer();

$( '#fileUpload' ).change(function()
{
  layer.destroy();
});

function draw()
{
  degree = 0;

  var imageObj = new Image();

  imageObj.onload = function()
  {
    oriImgHeight = imageObj.height;
    oriImgWidth = imageObj.width;

    //zoom ratio
    var zw = width/oriImgWidth;
    var zh = canvasHeight/oriImgHeight;
    console.log("zw= " + zw);
    console.log("zh= " + zh);

    currentZ = Math.max(zw, zh);

    minZ = currentZ;

    ratioImgWidth = minZ*oriImgWidth;
    ratioImgHeight = minZ*oriImgHeight;
    editedHeight = ratioImgHeight;

    ratio = oriImgWidth/oriImgHeight;

    wideWidth = (canvasHeight*ratio);

    minX = -((ratioImgWidth-width)/2 - width/2);
    maxX = ((ratioImgWidth-width)/2 + width/2);
    minY = -((ratioImgHeight-canvasHeight)/2 - canvasHeight/2);
    maxY = ((ratioImgHeight-canvasHeight)/2 + canvasHeight/2);

    oriX = ((stage.getWidth()/2)-(ratioImgWidth/2)+ratioImgWidth/2);
    oriY = ((stage.getHeight()/2)-(ratioImgHeight/2)+ratioImgHeight/2);

    myImage = new Kinetic.Image
    ({
      image: imageObj,
      width: ratioImgWidth,
      height: editedHeight,
      x: oriX,
      y: oriY,
      offsetX:ratioImgWidth/2,
      offsetY:ratioImgHeight/2,
      draggable: true,
      dragBoundFunc: function (pos)
      {
        var X = pos.x;
        var Y = pos.y;
        if (X < minX) {
            X = minX;
        }
        if (X > maxX) {
            X = maxX;
        }
        if (Y < minY) {
            Y = minY;
        }
        if (Y > maxY) {
            Y = maxY;
        }
        return ({
            x: X,
            y: Y
        });
      }
    });

    layer.add(myImage);
    stage.add(layer);
  };

  /*var f = document.getElementById('fileUpload').files[0];
  var name = f.name;
  var url = window.URL || window.webkitURL;
  var src = url.createObjectURL(f);


  imageObj.src = src;*/

  imageObj.src = document.getElementById("resultCanvas2").toDataURL("image/png",1);

  stage.draw();
  // url.revokeObjectURL(src);

  // $("#fileUpload").replaceWith($("#fileUpload").val('').clone(true));
}
