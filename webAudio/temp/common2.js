function _SoundPlayer(audioContext, filterNode) {
  this.audioCtx = audioContext;
  this.gainNode = this.audioCtx.createGain();
  if(filterNode) {
    // run output through extra filter (already connected to audioContext)
    this.gainNode.connect(filterNode);
  } else {
    this.gainNode.connect(this.audioCtx.destination);
  }
  this.oscillator = null;
}

_SoundPlayer.prototype.setFrequency = function(val, when) {
  if(when) {
    this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime + when);
  } else {
    this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime);
  }
  return this;
};

_SoundPlayer.prototype.setVolume = function(val, when) {
  if(when) {
    this.gainNode.gain.exponentialRampToValueAtTime(val, this.audioCtx.currentTime + when);
  } else {
    this.gainNode.gain.setValueAtTime(val, this.audioCtx.currentTime);
  }
  return this;
};

_SoundPlayer.prototype.setWaveType = function(waveType) {
  this.oscillator.type = waveType;
  return this;
};

_SoundPlayer.prototype.play = function(freq, vol, wave, when) {
  this.oscillator = this.audioCtx.createOscillator();
  this.oscillator.connect(this.gainNode);
  this.setFrequency(freq);
  if(wave) {
    this.setWaveType(wave);
  }
  this.setVolume(1/1000);
  if(when) {
    this.setVolume(1/1000, when - 0.02);
    this.oscillator.start(when - 0.02);
    this.setVolume(vol, when);
  } else {
    this.oscillator.start();
    this.setVolume(vol, 0.02);
  }
  return this;
};

_SoundPlayer.prototype.stop = function(when) {
  if(when) {
    this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime + when - 0.05, 0.02);
    this.oscillator.stop(this.audioCtx.currentTime + when);
  } else {
    this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime, 0.02);
    this.oscillator.stop(this.audioCtx.currentTime + 0.05);
  }
  return this;
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audio;
let compressor;

document.getElementById('btn1').addEventListener('click', function(eve){
  if (!audio) {
    audio = new AudioContext();
    compressor = audio.createDynamicsCompressor();
    compressor.connect(audio.destination);
  }
});

document.getElementById('btn2').addEventListener('click', function(eve){
  (new _SoundPlayer(audio, compressor)).play(261.6, 1, "sine").stop(2);
  (new _SoundPlayer(audio, compressor)).play(329.6, 1, "sine", 1).stop(4);
  (new _SoundPlayer(audio, compressor)).play(392.0, 1, "sine", 3).stop(5);
});
