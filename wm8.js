// 全局变量
var global = {
      game_area: null,
      pics: [],
      empty: null,
      time: null,
      step: null,
      start: false,
      firstload: true,
      difficulty: 1,
      timeId: null
}

window.onload = function () {
      if (global.firstload == true) { // Initializations
            global.firstload = false;
            global.game_area = document.getElementById('fifteen');
            global.step = document.getElementById('step');
            global.time = document.getElementById('time');
            global.difficulty = document.getElementsByTagName('select')[0];
      }
      else {
            while (global.game_area.hasChildNodes())
                  global.game_area.removeChild(global.game_area.firstChild);
      }

      // Create Puzzle
      createPuzzle();

      global.empty = document.getElementById('empty');
      global.pics = document.getElementById('fifteen').children;
      for (var i = 0; i + 1 < global.pics.length; ++i) {
            global.pics[i].onclick = function () {
                  if (!global.start)  // do not move before the game starts
                        return;
                  var clickPos = this.className.match(/[0-9]/g); // the clicked piece's location
                  var emptyPos = empty.className.match(/[0-9]/g); // Blank's location
                  // If the location of the pics are valid, exchange with the blank piece
                  if (isValid(clickPos, emptyPos)) {
                        var temp = this.className;
                        this.className = empty.className;
                        global.empty.className = temp;
                        ++global.step.innerHTML;
                        // 判断是否完成拼图
                        if (isDone())
                              success();
                  }
            };
      }

      if (global.start == true) {
            initPos(global.difficulty.selectedIndex + 1);  // initialize the pieces' position
            global.time.textContent = '00:00';
            global.step.textContent = 0;
            global.timeId = setInterval(showTime, 1000);   // clock
      }

      // Click the Start putton will restart everything
      document.getElementById('restart').onclick = function () {
            clearInterval(global.timeId);
            global.start = true;
            window.onload();
      }
}

// create a 4x4 puzzle
function createPuzzle() {
      var frag = document.createDocumentFragment();
      for (var i = 1; i <= 4; ++i) {
            for (var j = 1; j <= 4; ++j) {
                  if (i == 4 && j == 4) {
                        var empty = document.createElement("div");
                        empty.setAttribute('id', 'empty');
                        empty.setAttribute('class', 'row4 col4');
                        frag.appendChild(empty);
                        break;
                  }
                  var pic = document.createElement("div");
                  pic.setAttribute("id", "pic" + ((i - 1) * 4 + j));
                  pic.setAttribute("class", "row" + i + " col" + j);
                  frag.appendChild(pic);
            }
      }
      document.getElementById("fifteen").appendChild(frag);
}

// initialize the position of pieces, 3 different difficulty modes
function initPos(difficulty) {
      var arr = [];
      if (difficulty == 1)
            arr = [10, 11, 14];
      else if (difficulty == 2)
            arr = [5, 6, 7, 9, 10, 11, 13, 14];
      else arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

      // randomly shuffule
      arr.sort(function () {
            return Math.random() - 0.5;
      });

      // exchange the position of three pieces at one time to ensure the puzzle can be restored
      // the higher the difficulty mode, the more of pieces are exchanged
      for (i = 0; i < difficulty * 3; i += 3) {
            var temp = global.pics[arr[i]].className;
            global.pics[arr[i]].className = global.pics[arr[i + 1]].className;
            global.pics[arr[i + 1]].className = global.pics[arr[i + 2]].className;
            global.pics[arr[i + 2]].className = temp;
      }
}

// Show the puzzle time
function showTime() {
      var curTime = global.time.textContent.split(':'),
            min = parseInt(curTime[0]),
            sec = parseInt(curTime[1]);
      if (sec == 59) {
            ++min, sec = 0;
      }
      else {
            ++sec;
      }
      if (min < 10)
            min = '0' + min;
      if (sec < 10)
            sec = '0' + sec;
      global.time.innerHTML = min + ':' + sec
}

// Check if the pic's location is valid - blank pic around
function isValid(a, b) {
      return (a[0] == b[0] && Math.abs(a[1] - b[1]) == 1)
            || (a[1] == b[1] && Math.abs(a[0] - b[0]) == 1);
}

// Check if the puzzle is completed
function isDone() {
      var done = true, pos = [];
      for (var i = 0; i < global.pics.length; ++i) {
            pos = global.pics[i].className.match(/[0-9]/g);
            id = global.pics[i].id.match(/[0-9]+/);
            if (id && id[0] != (pos[0] - 1) * 4 + parseInt(pos[1])) {
                  done = false;
                  break;
            }
      }
      return done;
}

// Complete the puzzle
function success() {
      clearInterval(global.timeId);
      var curTime = global.time.textContent.split(':');
      var diff = global.difficulty.selectedIndex,
            str = 'Congratulations! You passes the ' + global.difficulty[diff].textContent + ' of W&M statue pazzle, using ';
      if (parseInt(curTime[0]))
            str += parseInt(curTime[0]) + ' minutes';
      if (parseInt(curTime[1]))
            str += parseInt(curTime[1]) + ' seconds';
      str += ', ' + global.step.textContent + ' steps!\n \nThis is James Blair. Go to the place between James Blair and Chancellor Hall to look at this statue!';
      if (diff == 3)
            str += ' Give the harder mode a try!';
      else
            str += ' You are the Puzzle master!';
      global.start = false;
      setTimeout(function () { alert(str) }, 500);
}


var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
