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

function canvasAni()
{
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
  // $('.page').hide();
  // $('#'+e).show();
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
	$('#'+hashData).show();
});
