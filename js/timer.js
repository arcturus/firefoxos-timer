'use strict';

var Timer = function Timer() {

  var currentState,
    startButton,
    pauseButton,
    resetButton,
    timer,
    counter,
    display;

  var init = function init() {
    initComponents();

    counter = 0;

    currentState = 'init';
    updateControls();
  };

  var initComponents = function initComponents() {
    startButton = document.getElementById('start');
    pauseButton = document.getElementById('pause');
    resetButton = document.getElementById('reset');

    display = document.getElementById('time');

    startButton.addEventListener('click', onStart);
    pauseButton.addEventListener('click', onPause);
    resetButton.addEventListener('click', onReset);
  };

  var updateControls = function updateControls() {
    switch (currentState) {
      case 'init':
        startButton.disabled = false;
        pause.disabled = true;
        reset.disabled = true;
        break;
      case 'running':
        startButton.disabled = true;
        pause.disabled = false;
        reset.disabled = false;
        break
      case 'pause':
        startButton.disabled = false;
        pause.disabled = true;
        reset.disabled = false;
        break;
    }
  };

  var tick = function tick() {
    counter++;
    updateCounter();
  };

  var updateCounter = function updateCounter() {
    var seconds,minutes;

    //Yeah I know ... overflow :P
    seconds = new String(counter % 60);
    minutes = new String(Math.floor(counter / 60));

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    display.textContent = minutes + ":" + seconds;
  };

  var onStart = function onStart(evt) {
    currentState = 'running';
    startButton.textContent = 'Continue';
    updateControls();

    timer = window.setInterval(tick.bind(this), 1000);
  };

  var onPause = function onPause(evt) {
    currentState = 'pause';
    updateControls();

    timer = window.clearInterval(timer);
  };

  var onReset = function onReset(evt) {
    currentState = 'init';

    startButton.textContent = 'Start';

    timer = window.clearInterval(timer);

    counter = 0;
    updateControls();

    updateCounter();
  }

  return {
    'init': init
  }
}();

window.addEventListener('load', function onLoad(evt) {
  Timer.init();
});