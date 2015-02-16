//big tv height: 1080
//width 1920

var foreground=0;
var imageData;
var midplate = 0;
var msgText='hihi';
var bg = 0;
var customData;

var customCopy=
[
  '',
  'Copy 2',
  'Copy 3',
  'Copy 4',
  'Copy 5'
];

var bgList=
[
  'bg1.jpg',
  'bg2.jpg',
  'bg3.jpg'
];

var foregroundList=
[
  'man.gif',
  'women.gif'
];

var midplateFront =
[
  '',
  'yellowBall.gif',
  'redBall.gif',
  'yellowBall.gif',
  'redBall.gif'
];

var midplateBack =
[
  '',
  'yellowBall.gif',
  'redBall.gif',
  'yellowBall.gif',
  'redBall.gif'
];

var musicList=
[
  '1.mp3',
  '2.mp3',
  '2.mp3'
];



var audioPlayer = document.createElement('audio');
audioPlayer.setAttribute('src', 'music/1.mp3');

function changePage(e)
{
  window.location.hash = '#'+ e;
  $('.page').hide();
  $('#'+e).show();

  audioPlayer.pause();

  if (e==='foreground')
  {
    audioPlayer.play();
  }
  else if(e==='preview_2d' || e==='preview_4d')
  {
    // var audioPlayer = document.createElement('audio');
    audioPlayer.setAttribute('src', 'music/'+ musicList[customData.foreground]);
    audioPlayer.play();
  }
}


$(window).on('hashchange', function() {
  var hash = window.location.hash.substring(1);
  changePage(hash);
});



function previewforeground(x,e)
{
  $('.foregroundList').removeClass('active');
  $(x).addClass('active');

  $('#foregroundPreview').attr('src', 'images/'+foregroundList[e]);

  //music player
  audioPlayer.pause();
  audioPlayer.setAttribute('src', 'music/'+ musicList[e]);
  audioPlayer.play();

  foreground=e;

  console.log('selected foreground: '+ e);
}

$(window).on('hashchange', function() {
  var hash = window.location.hash.substring(1);
  changePage(hash);
});


function previewMid(x,e)
{
  $('#customeCopyCon').hide();

  if (e===0)
  {
    $('#customeCopyCon').show();
    $('#textImg1').hide();
    $('#textImg2').hide();
    $('#customText').html('custom text');
  }
  else
  {
    $('#textImg1').show();
    $('#textImg2').show();
    $('#textImg1').find('img').attr('src', 'images/'+ midplateFront[e]);
    $('#textImg2').find('img').attr('src', 'images/'+ midplateBack[e]);
    $('#customText').html(customCopy[e]);
  }

  midplate=e;

  msgText = customCopy[e];

  console.log('selected foreground: '+ e);
}

function previewBg(x,e)
{
  $('.bgList').removeClass('active');
  $(x).addClass('active');

  $('.bgPreview').attr('src','images/' + bgList[e]);

  bg = e;



  console.log('selected bg: '+ e);
}

function build()
{
  console.log(customData);

  if (customData.imageData !== '')
  {
    $('#container_2d .backImage').attr('src', customData.imageData);
    $('#container_4d .backImage').attr('src', customData.imageData);
    $('.backImage').show();
  }
  else
  {
    $('#container_2d .backImage').hide();
    $('#container_4d .backImage').hide();
  }

  $('.frontImage').attr('src','images/'+ foregroundList[customData.foreground]);

  if (customData.midplate !== 0)
  {
    $('.previewFront').attr('src','images/'+ midplateFront[customData.midplate]);

    $('.previewBack').attr('src','images/'+ midplateBack[customData.midplate]);
  }
  else
  {
    $('#preview_4d .video').hide();
  }

    $('.preview_bg').attr('src','images/'+ bgList[customData.bg]);

  $('.previewText').html(customData.msgText);
}

function updateText()
{
  var text = $('#textInput').val();
  $('#customText').html(text);
  msgText = text;
}

function uploadPhoto()
{
  $('#fileUpload').click();
}

function showTerms()
{
  $('#terms').show();
}

function hideOverlay()
{
  $('.overlay').hide();
}
