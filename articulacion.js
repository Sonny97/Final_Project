$(document).ready(function(){
  $('.arriba').hide();

  $(window).scroll(function(){
    if ($(this).scrollTop() > 100 ) {
      $('.arriba').fadeIn();
    }
    else{
      $('.arriba').fadeOut();
    }
  });
  $('.arriba').click(function(){
    $('body, html').animate({
      scrollTop: 0
    },500);
  });


  initPlayer();
  getSongs();

  var audio = document.getElementById('player');
});
var audio = document.getElementById('player');
var music;
function initPlayer(){
  $('#shuffle').click(function(){
    $('#playlist').empty();
    console.log(shuffle(music.songs));
    genList(music);
    playSong(0);
  });
}

function getSongs(){
  $.getJSON("app.json",function(mjson){
    music = mjson;
    genList(music);
  });
}
function playSong(id){
  var long = music.songs;
  if (id >= long.length) {
    console.log('se acabo');
    audio.pause();
  }else{
    $('#player').attr('src', music.songs[id].song)
    var audio = document.getElementById('player');
    audio.play();
    console.log('hay mas caciones');
    scheduleSong(id);
  }
}
function genList(music){
  $.each(music.songs, function(i,song){
    $('#playlist').append('<li class="list-group-item" id="'+i+'">'+song.name+'</li>')
  });
  $('#playlist li').click(function(){
    var selectedsong = $(this).attr('id');
    playSong(selectedsong);
  });
}

function scheduleSong(id){
  var audio = document.getElementById('player');
  audio.onended = function(){
    console.log('termino la cancion');
    playSong(parseInt(id)+1);
  }
}

function shuffle(array){
  for (var random, temp, position = array.length; position; random = Math.floor(Math.random()*position),
   temp = array[--position], array[position] = array [random], array[random] = temp); {
    return array;
  }
}
