var MONDAI_LENGTH = 30;
var MONDAI_CHARS = "qwerasdfzxcv"
var mondai_str = "";
var typed_length = 0;
var now_char = "";
var miss = 0;
var start_time = 0;

function start() {
  MONDAI_CHARS = $("#chars")[0].value;
  MONDAI_LENGTH = Number($("#length")[0].value);
  var mondai_chars_length = MONDAI_CHARS.length;
  mondai_str = "";
  for (var i = 0; i < MONDAI_LENGTH; i++) {
    mondai_str += MONDAI_CHARS[Math.floor(Math.random()*mondai_chars_length)];
  }
  var mondai = $("#mondai");
  mondai[0].innerHTML = mondai_str;

  now_char = mondai_str[0];
  miss = 0;
  typed_length = 0;
  $("#chars")[0].blur();
  $("#length")[0].blur();
  start_time = +new Date();
}

function prepare_start() {
  $("#chars")[0].blur();
  $("#length")[0].blur();
  var notice = $("#notice");
  var count = 3;
  notice[0].innerHTML = "" + count;
  var timer1 = setInterval(function() {
    count -= 1;
    if (count <= 0) {
      notice[0].innerHTML = "がんばれ";
      start();
      clearInterval(timer1);
    } else {
      notice[0].innerHTML = "" + count;
    }
  }, 1000);
}

$(document).ready(function() {
  var mondai = $("#mondai");
  $(document).delegate("#start", "click", function(e) {
    prepare_start();
  });

  $(document).keypress(function(e) {
    e =  e || window.event;
    if (e.keyCode == 16) return;
    if (e.keyCode == 13) {
      prepare_start();
      return;
    }
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (charStr == now_char) {
      typed_length += 1;
      now_char = mondai_str[typed_length];
      mondai[0].innerHTML = '<span style="color:#cccccc">' + mondai_str.slice(0, typed_length) + '</span>' + mondai_str.slice(typed_length, MONDAI_LENGTH);
      if (typed_length >= MONDAI_LENGTH) {
        var t = (+new Date()) - start_time;
        alert("すごいすごい\nタイム:" + (t/1000.0) + "秒\nミス：" + miss);
      }
    } else {
      miss += 1;
    }
  });

});

