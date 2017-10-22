"use strict"

var buttons = document.querySelectorAll('#calculator button');
var ans;
var mr = 0;
var equationElements = [];

for (var i=0; i<buttons.length; i++) {
  buttons[i].onclick = function(e) {
    var input = document.getElementById('expression');
    var output = document.getElementById('result');
    var btnValue = this.innerHTML;

    switch (btnValue) {
      case 'MC':
        mr = 0;
        resetDisplay();
        break;

      case 'M+':
        if (output.innerHTML !== '') { mr += ans; }
        break;

      case 'CE':
        equationElements.pop();
        resetDisplay(btnValue);
        break;

      case 'AC':
        equationElements = [];
        resetDisplay(btnValue);
        break;

      case '=':
        var equation = formatEquation(equationElements);
        if (equation) {
          try {
            var result = eval(equation);
            output.innerHTML = result;
            ans = result;
          }
          catch (e) {
            if (e instanceof SyntaxError) {
              equationElements = [];
              input.innerHTML = 'Syntax ERROR';
              output.innerHTML = '';
              ans = 0;
            } else {
              throw( e );
            }
          }
        }
        break;

      case '×':
      case '÷':
      case '+':
      case '-':
        equationElements.push(btnValue);
        resetDisplay(btnValue);
        break;

      default:
        equationElements.push(btnValue);
        resetDisplay();
    }

    function resetDisplay(operator = '') {
      if (output.innerHTML !== '') {
        if (operator == '') {
          equationElements = [equationElements[equationElements.length - 1]];
        } else if (operator == 'AC' || operator == 'CE') {
          equationElements = [];
        } else {
          equationElements = ['Ans', operator];
        }
      }
      input.innerHTML = '<span>' + equationElements.join('');
      output.innerHTML = '';
    }

    function formatEquation(equationElements) {
      var equation = '';
      for (var i=0; i<equationElements.length; i++) {
        switch (equationElements[i]) {
          case '×':
            equation += '*';
            break;

          case '÷':
            equation += '/';
            break;

          default:
            equation += equationElements[i].toLowerCase();
            break;
        }
      }
      return equation;
    }

    e.preventDefault();
  }
}

function specialKeys(key) {
  switch (key) {
    case 'Enter':
      return '=';

    case 'Delete':
    case 'Backspace':
      return 'CE';

    case 'Escape':
      return 'AC';

    case 'a':
      return 'Ans';

    case '*':
      return '×';

    case '/':
      return '÷';

    default:
      return key;
  }
}

document.onkeydown = function(e) {
  var key = e.key;
  key = specialKeys(key);

  for (var i=0; i<buttons.length; i++) {
    if (key == buttons[i].innerHTML){
      buttons[i].click();
      buttons[i].classList.add("btn-active");
      return;
    }
  }
};

document.onkeyup = function(e) {
  var key = e.key;
  key = specialKeys(key);

  for (var i=0; i<buttons.length; i++) {
    if (key == buttons[i].innerHTML){
      buttons[i].classList.remove("btn-active");
      return;
    }
  }
};
