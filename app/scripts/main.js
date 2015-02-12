//big tv height: 1080
//width 1920

var theme=1;
var imageData;
var video = 1;
var msgText='hihi';
var bg = 1;
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
  'bg3.jpg',
];

var audioPlayer = document.createElement('audio');
audioPlayer.setAttribute('src', 'music/1.mp3');

function changePage(e)
{
  window.location.hash = '#'+ e;
  $('.page').hide();
  $('#'+e).show();

  audioPlayer.pause();

  if (e==='text')
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



function previewTheme(x,e)
{
  $('.themeList').removeClass('active');
  $(x).addClass('active');

  if (e===1) {
    $('#themePreview').attr('src', 'images/man.gif');
  }else
  {
    $('#themePreview').attr('src', 'images/women.gif');
  }

  theme=e;
  console.log('selected theme: '+ e);
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
  }
  else if (e===1)
  {
    $('#textImg').find('img').attr('src', 'images/yellowBall.gif');
    audioPlayer.setAttribute('src', 'music/1.mp3');
  }
  else if (e===2)
  {
    $('#textImg').find('img').attr('src', 'images/redBall.gif');
    audioPlayer.setAttribute('src', 'music/2.mp3');
  }

  $('#customText').html(customCopy[e]);
  video=e;

  msgText = customCopy[e];

  audioPlayer.play();

  console.log('selected theme: '+ e);
}

function previewBg(x,e)
{
  $('.bgList').removeClass('active');
  $(x).addClass('active');

  $('#bgPreview').attr('src','images/' + bgList[e]);

  bg = bgList[e];

  console.log('selected bg: '+ e);
}

function build()
{
  console.log(customData);
  $('.backImage').attr('src',customData.imageData);

  if (customData.theme === 1)
  {
    $('.frontImage').attr('src','images/man.gif');
  }
  else
  {
    $('.frontImage').attr('src','images/women.gif');
  }

  if (customData.video === 1)
  {
    $('.video').attr('src','images/redBall.gif');
  }
  else
  {
    $('.video').attr('src','images/yellowBall.gif');
  }

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
