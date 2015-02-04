//config

var fps = 24;
var imgPath1 = './images/ice.png';
var imgPath2 = './images/fire.png';

var frameHeight;
var frameWidth;

var canvas = null;
var img = null;
var ctx = null;
var imageReady = false;
var frame = 0;
var hashData;

//customise item
var customData=[];
var videoNum;

var theme;
var msgValue;
var msgText = 'I love SVG';
var video;



function preview()
{
  var previewGifPath;

  if (customData.theme===1)
  {
    previewGifPath = 'images/dancer.gif';
    $('#previewAudio').attr('src','music/1.mp3');

  }else
  {
    previewGifPath = 'images/band.gif';
    $('#previewAudio').attr('src','music/2.mp3');
  }

  $('#previewGif').attr('src',previewGifPath);

  canvasAni();

  previewSvg();

  document.getElementById('previewAudio').play();
}

function canvasAni()
{
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  img = new Image();

    if (customData.videoNum===1)
    {
      img.src = imgPath1;
    }else
    {
      img.src = imgPath2;
    }

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

function previewSvg()
{
  $('#svgContainer').html('<svg id="svg" height="86px" width="300px"><text id="copyText" x="10" y="70%" fill="white">'+customData.msgText+'<animate attributeName="x" from="0%" to="100%" begin="0s" dur="4s" repeatCount="indefinite"></animate></text></svg>');
}


function textUpdate()
{
  var text = document.getElementById('inputBox').value;

  console.log(text);

  $('#svgContainer').html('<svg id="svg" height="86px" width="300px"><text id="copyText" x="10" y="70%" fill="white">'+text+'<animate attributeName="x" from="0%" to="100%" begin="0s" dur="4s" repeatCount="indefinite"></animate></text></svg>');

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
	$('#'+hashData).show();

  if (hashData !== 'preview')
  {
  	document.getElementById('previewAudio').pause();
    document.getElementById('videoAudio').pause();
  }else
  {
    document.getElementById('previewAudio').play();
  }
});


var videoManager = function() {
    this.audio = document.getElementById('videoAudio');
    this.gif = document.getElementById('gif');
};

videoManager.prototype.play = function(x) {

  this.audio.src = 'music/'+x+'.mp3';
  this.audio.play();

  if (x===1)
  {
    this.gif.src = 'images/dancer.gif';
  }else
  {
    this.gif.src = 'images/band.gif';
  }

  this.theme = x;
};

videoManager.prototype.save = function() {
  this.audio.pause();
  theme=this.theme;
};


//middleManager

var targetCanvas = null;
var canvasImg = null;
var targetCtx = null;

function canvasManager(canvasId, source)
{
  targetCanvas = document.getElementById(canvasId);
  targetCtx = targetCanvas.getContext('2d');
  canvasImg = new Image();
  canvasImg.onload = loadCanvas();

  if (source===1) {
    canvasImg.src = imgPath1;
  }
  else
  {
    canvasImg.src = imgPath2;
  }

  video = source;

  frameHeight = targetCanvas.height;
  frameWidth = targetCanvas.width;
}

function loadCanvas() {
  imageReady = true;
  setTimeout( updateCanvas, 1000 / 60 );
}

function redrawCanvas() {

  targetCtx.clearRect(0, 0, frameWidth, frameHeight);
  targetCtx.fillStyle = 'rgba(0, 0, 200, 0)';
  targetCtx.fillRect(0, 0, frameWidth, frameHeight);
  // if (imageReady) {
      // ctx.drawImage(img, frame*96, 0, 96, 54,canvas.width/2 - 48, canvas.height/2 - 48, 96, 54);
      // ctx.drawImage(img, frame*96, 0, 96, 54,canvas.width/2 - 200, canvas.height/2 - 48, 70, 38);
      // ctx.drawImage(img, frame*96, 0, 96, 54,canvas.width/2 + 100, canvas.height/2 - 48, 60, 30);
      //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
      targetCtx.drawImage(canvasImg, frame*96, 0, 96, 54,0, 0, frameWidth, frameHeight);
  // }
}

function updateCanvas(){
  redrawCanvas();
  frame++;
  if (frame >= 6)
  {
    frame = 0;
  }
  setTimeout( updateCanvas, 1000 / fps );
}

function saveMsg()
{
  var text = document.getElementById('msgInputBox').value;
  videoNum=video;
}

function updateMsgText()
{
  var text = document.getElementById('msgInputBox').value;

  console.log(text);

  if (text.length>0)
  {
    msgText = text;
  }

  $('#msgSvgContainer').html('<svg id="msgSvg"><text class="msgCopyText" x="10" y="70%" fill="white">'+msgText+'<animate attributeName="x" from="0%" to="100%" begin="0s" dur="4s" repeatCount="indefinite"></animate></text></svg>');

}
