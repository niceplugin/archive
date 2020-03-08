(function(){
  const keypress = {};
  const options = {};

  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);
  document.getElementById('btn-set').addEventListener('click', setting);

  function setting() {
    options.fadeIn = +document.getElementById('ipt-fade-in').value;
    options.playTime = +document.getElementById('ipt-play-time').value;
    options.fadeOut = +document.getElementById('ipt-fade-out').value;
    options.octave = +document.getElementById('ipt-octave').value;
    options.oscillator = document.getElementById('slt-oscillator').value;
  }

  function keydown(eve) {
    const k = eve.key;
    let note = 0;

    if (!keypress[k]) {
      keypress[k] = true;
      if (k === '0') {note = 10; }
      else if (k === '-') {note = 11; }
      else if (k === '=') {note = 12; }
      else if (1 <= k && k <= 9) {note = +k; }
      else {return; }
      play(note);
    }
  }

  function keyup(eve) {
    keypress[eve.key] = false;
  }

  const ctx = new AudioContext;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);
  function play(note) {
    const oscillator = ctx.createOscillator();
    const frequency = Math.pow(2, options.octave-1) * 55 * Math.pow(2, (note-10)/12);

    oscillator.type = options.oscillator;
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    // gain.gain.value = 0;
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(1, options.fadeIn);
    setTimeout(function() {
      const times = options.fadeIn + options.playTime + options.fadeOut;
      gain.gain.exponentialRampToValueAtTime(Number.EPSILON, times);
      setTimeout(function(){oscillator.stop(); }, options.fadeOut * 1000);
      }, (options.fadeIn + options.playTime) * 1000);
  }

  setting();
})();