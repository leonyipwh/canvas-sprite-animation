//big tv height: 1080
//width 1920

var foreground=0;
var imageData;
var video = 0;
var msgText='hihi';
var bg = 0;
var customData;

var customCopy=
[
  '',
  'Copy 2',
  'Copy 3'
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
  'redBall.gif'
];

var midplateBack =
[
  '',
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
    audioPlayer.setAttribute('src', 'music/'+ customData.video +'.mp3');
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

  foreground=foregroundList[e];

  console.log('selected foreground: '+ e);
}

$(window).on('hashchange', function() {
  var hash = window.location.hash.substring(1);
  changePage(hash);
});


function previewVideo(x,e)
{
  $('#customeCopyCon').hide();

  if (e===0)
  {
    $('#customeCopyCon').show();
    $('#textImg1').find('img').hide();
    $('#textImg2').find('img').hide();
    $('#customText').html('custom text');
  }
  else
  {
    $('#textImg').find('img').show();
    $('#textImg1').find('img').attr('src', 'images/'+ midplateFront[e]);
    $('#textImg2').find('img').attr('src', 'images/'+ midplateBack[e]);
    $('#customText').html(customCopy[e]);
  }

  video=e;

  msgText = customCopy[e];

  console.log('selected foreground: '+ e);
}

function previewBg(x,e)
{
  $('.bgList').removeClass('active');
  $(x).addClass('active');

  $('.bgPreview').attr('src','images/' + bgList[e]);

  bg = bgList[e];

  console.log('selected bg: '+ e);
}

function build()
{
  console.log(customData);
  $('.backImage').attr('src', customData.imageData);

  $('.frontImage').attr('src','images/'+ foregroundList[customData.foreground]);

  $('.video').attr('src','images/'+ midplateFront[customData.video]);

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
