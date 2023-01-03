var view = 1;
var time = 10;
var Timer;
var count = 1;
var score = 0;
var difficulty = 1;
var BGM = new Audio("src/start.mp3");
var press = new Audio("src/button.mp3");
var win = new Audio("src/win.mp3");
var fail = new Audio("src/fail.mp3");
var game = new Audio("src/game.mp3");
var right = new Audio("src/right.mp3");
var button;
game.loop = true;
BGM.loop = true;
function type() {
  let i = Math.floor(Math.random() * 6) + 1;
  button = new Audio("src/type/" + i + ".mp3");
  button.play();
}
var TextGenerateEasy = function (n) {
  var text = "";
  for (let i = 0; i < n; i++) {
    var num = Math.ceil(Math.random() * 25);
    var char = String.fromCharCode(65 + num);
    text += char;
  }
  return text;
};
var TextGenerateMid = function (n) {
  var text = "";
  if (Math.random() > 0.5) {
    for (let i = 0; i < n; i++) {
      var num = Math.ceil(Math.random() * 25);
      var char = String.fromCharCode(65 + num);
      text += char;
    }
  } else {
    for (let i = 0; i < n; i++) {
      var num = Math.ceil(Math.random() * 25);
      var char = String.fromCharCode(97 + num);
      text += char;
    }
  }
  return text;
};
var TextGenerateHard = function (n) {
  var text = "";
  for (let i = 0; i < n; i++) {
    var num = Math.ceil(Math.random() * 25);
    if (Math.random() > 0.5) {
      var char = String.fromCharCode(65 + num);
    } else {
      var char = String.fromCharCode(97 + num);
    }
    text += char;
  }
  return text;
};
var TextGeneratePass = function (n) {
  if (count <= 5) return TextGenerateEasy(n);
  else if (count > 5 && count <= 15) return TextGenerateMid(n);
  else return TextGenerateHard(n);
};
function Countdown() {
  if (time >= 0) {
    document.getElementById("time").innerText = time;
    time--;
  } else {
    document.getElementById("box").style.visibility = "hidden";
    document.getElementById("fail").style.visibility = "visible";
    freshScore();
    clearInterval(Timer);
  }
}
function freshScore() {
  document.getElementById("now_score").innerText = score;
  let text = document.querySelector("#fail h1");
  switch (difficulty) {
    case 1:
      if (localStorage.easy <= score) {
        view = 5;
        localStorage.easy = score;
        text.innerText = "恭喜你打破最高纪录，是否重新挑战？";
      } else {
        view = 6;
        text.innerText = "您失败了，是否重新挑战？";
      }
      document.getElementById("max_score").innerText =
        localStorage.getItem("easy");
      break;
    case 2:
      if (localStorage.mid <= score) {
        view = 5;
        localStorage.mid = score;
        text.innerText = "恭喜你打破最高纪录，是否重新挑战？";
      } else {
        view = 6;
        text.innerText = "您失败了，是否重新挑战？";
      }
      document.getElementById("max_score").innerText =
        localStorage.getItem("mid");
      break;
    case 3:
      if (localStorage.hard <= score) {
        view = 5;
        localStorage.hard = score;
        text.innerText = "恭喜你打破最高纪录，是否重新挑战？";
      } else {
        view = 6;
        text.innerText = "您失败了，是否重新挑战？";
      }
      document.getElementById("max_score").innerText =
        localStorage.getItem("hard");
      break;
    case 4:
      if (localStorage.pass <= score) {
        view = 5;
        localStorage.pass = score;
        text.innerText = "恭喜你打破最高纪录，是否重新挑战？";
      } else {
        view = 6;
        text.innerText = "您失败了，是否重新挑战？";
      }
      document.getElementById("max_score").innerText =
        localStorage.getItem("pass");
      break;
  }
  if (text.innerText == "恭喜你打破最高纪录，是否重新挑战？") {
    if (
      document.querySelector("#music i").className == "iconfont icon-musicfill"
    ) {
      win.currentTime = 0;
      BGM.pause();
      win.play();
      fail.pause();
      game.pause();
    }
  } else {
    if (
      document.querySelector("#music i").className == "iconfont icon-musicfill"
    ) {
      fail.currentTime = 0;
      BGM.pause();
      win.pause();
      fail.play();
      game.pause();
    }
  }
}
var change = function () {
  switch (difficulty) {
    case 1:
      document.getElementById("screen").innerText = TextGenerateEasy(
        Math.floor(count / 5) + 3
      );
      break;
    case 2:
      document.getElementById("screen").innerText = TextGenerateMid(
        Math.floor(count / 5) + 3
      );
      break;
    case 3:
      document.getElementById("screen").innerText = TextGenerateHard(
        Math.floor(count / 5) + 3
      );
      break;
    default:
      document.getElementById("screen").innerText = TextGeneratePass(
        Math.floor(count / 5) + 3
      );
  }
};
function Judge() {
  type();
  if (document.getElementById("screen").innerText == input.value.trim()) {
    Reset();
    right.play();
    document.getElementById("count").innerText = "关卡：第" + ++count + "关";
    scoreCtrl();
  }
}
function animation(s) {
  var pop = document.getElementById("pop");
  pop.innerText = "+" + s + "分";
  pop.style.display = "none";
  setTimeout(function () {
    pop.style.display = "inline";
  }, 10);
  setTimeout(function () {
    pop.style.opacity = 0;
  }, 1000);
}
function scoreCtrl() {
  var s = (Math.floor(count / 5) + 1) * 10;
  for (let i = 0; i < s; i++) {
    setTimeout(function () {
      document.getElementById("score").innerText = "得分：" + ++score + "分";
    }, 20 * (i + 1));
    animation(s);
  }
}
function Reset() {
  change();
  timeFloor();
  clearInterval(Timer);
  Countdown();
  input.value = "";
  Timer = setInterval(Countdown, 1000);
}
function timeFloor() {
  if (Math.floor(count / 5) <= 6) time = 10 - Math.floor(count / 5);
  else time = 3;
}
function reFresh() {
  change();
  input.value = "";
}
function difficult() {
  switch (difficulty) {
    case 1:
      document.getElementById("difficult").innerText = "当前难度：简单";
      break;
    case 2:
      document.getElementById("difficult").innerText = "当前难度：中等";
      break;
    case 3:
      document.getElementById("difficult").innerText = "当前难度：困难";
      break;
    case 4:
      document.getElementById("difficult").innerText = "当前模式：闯关";
      break;
  }
}
function Restart() {
  if (
    document.querySelector("#music i").className == "iconfont icon-musicfill"
  ) {
    game.currentTime = 0;
    BGM.pause();
    win.pause();
    fail.pause();
    game.play();
  }
  view = 4;
  count = 1;
  score = 0;
  change(difficulty);
  difficult();
  timeFloor();
  clearInterval(Timer);
  Countdown();
  document.getElementById("count").innerText = "关卡：第" + count + "关";
  document.getElementById("score").innerText = "得分：" + score + "分";
  input.value = "";
  Timer = setInterval(Countdown, 1000);
  document.getElementById("box").style.visibility = "visible";
  document.getElementById("fail").style.visibility = "hidden";
  document.getElementsByClassName("scoreStatic")[0].style.visibility = "hidden";
  document.getElementsByClassName("menu")[0].style.visibility = "hidden";
  document.getElementsByClassName("choice")[0].style.visibility = "hidden";
}
function start(mode) {
  view = 4;
  if (
    document.querySelector("#music i").className == "iconfont icon-musicfill"
  ) {
    game.currentTime = 0;
    BGM.pause();
    win.pause();
    fail.pause();
    game.play();
  }
  count = 1;
  score = 0;
  difficulty = mode;
  change(difficulty);
  difficult();
  timeFloor();
  clearInterval(Timer);
  Countdown();
  document.getElementById("count").innerText = "关卡：第" + count + "关";
  document.getElementById("score").innerText = "得分：" + score + "分";
  input.value = "";
  Timer = setInterval(Countdown, 1000);
  document.getElementById("box").style.visibility = "visible";
  document.getElementById("fail").style.visibility = "hidden";
  document.getElementsByClassName("menu")[0].style.visibility = "hidden";
  document.getElementsByClassName("choice")[0].style.visibility = "hidden";
}
function freshStatic() {
  document.getElementById("1").innerText = localStorage.easy;
  document.getElementById("2").innerText = localStorage.mid;
  document.getElementById("3").innerText = localStorage.hard;
  document.getElementById("4").innerText = localStorage.pass;
}
function ToStatic() {
  view = 3;
  freshStatic();
  document.getElementById("box").style.visibility = "hidden";
  document.getElementById("fail").style.visibility = "hidden";
  document.getElementsByClassName("menu")[0].style.visibility = "hidden";
  document.getElementsByClassName("scoreStatic")[0].style.visibility =
    "visible";
  document.getElementsByClassName("choice")[0].style.visibility = "hidden";
}
function ToMenu() {
  if (
    document.querySelector("#music i").className == "iconfont icon-musicfill"
  ) {
    BGM.currentTime = 0;
    BGM.play();
    win.pause();
    fail.pause();
    game.pause();
  }
  view = 1;
  document.getElementById("box").style.visibility = "hidden";
  document.getElementById("fail").style.visibility = "hidden";
  document.getElementsByClassName("menu")[0].style.visibility = "visible";
  document.getElementsByClassName("scoreStatic")[0].style.visibility = "hidden";
  document.getElementsByClassName("choice")[0].style.visibility = "hidden";
}
function ToChoice() {
  view = 2;
  document.getElementById("box").style.visibility = "hidden";
  document.getElementById("fail").style.visibility = "hidden";
  document.getElementsByClassName("menu")[0].style.visibility = "hidden";
  document.getElementsByClassName("scoreStatic")[0].style.visibility = "hidden";
  document.getElementsByClassName("choice")[0].style.visibility = "visible";
}
function toggleIcon() {
  switch (view) {
    case 1:
    case 2:
    case 3:
      controlMusic(BGM);
      break;
    case 4:
      controlMusic(game);
      break;
    case 5:
      controlMusic(win);
      break;
    case 6:
      controlMusic(fail);
      break;
  }
  let icon = document.querySelector("#music i");
  if (icon.className == "iconfont icon-musicfill")
    icon.className = "iconfont icon-musicforbidfill";
  else icon.className = "iconfont icon-musicfill";
}
function controlMusic(bgm) {
  if (document.querySelector("#music i").className == "iconfont icon-musicfill")
    bgm.pause();
  else bgm.play();
}
window.onload = function () {
  if (localStorage.easy === undefined) localStorage.easy = 0;
  if (localStorage.mid === undefined) localStorage.mid = 0;
  if (localStorage.hard === undefined) localStorage.hard = 0;
  if (localStorage.pass === undefined) localStorage.pass = 0;
  document.getElementById("GoBack").onclick = ToMenu;
  document.getElementById("music").onclick = toggleIcon;
  var list = document.querySelectorAll(".list button");
  list[0].onclick = ToChoice;
  list[1].onclick = ToStatic;
  document.querySelectorAll("button").forEach(function (e) {
    e.addEventListener("click", function () {
      press.play();
    });
  });
  document.getElementById("button").onclick = reFresh;
  var choice = document.querySelectorAll(".choice button");
  choice[0].onclick = function () {
    start(1);
  };
  choice[1].onclick = function () {
    start(2);
  };
  choice[2].onclick = function () {
    start(3);
  };
  choice[3].onclick = function () {
    start(4);
  };
  var btn = document.querySelectorAll("#fail button");
  btn[0].onclick = Restart;
  btn[1].onclick = ToMenu;
};
