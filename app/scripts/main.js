var theme=1;
var imageData;
var video;
var customData;
var msgText='hihi';

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

function previewTheme(e)
{
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



function previewTheme(e)
{
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


function previewVideo(e)
{

  if (e===1) {
    $('#textImg').find('img').attr('src', 'images/redBall.gif');
      audioPlayer.setAttribute('src', 'music/1.mp3');
  }else
  {
    $('#textImg').find('img').attr('src', 'images/yellowBall.gif');
    audioPlayer.setAttribute('src', 'music/2.mp3');
  }

  video=e;

  audioPlayer.play();

  console.log('selected theme: '+ e);
}

function build()
{
  console.log(customData);
  $('.backImage').attr('src',customData.imageData);

  console.log(customData.theme);

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
