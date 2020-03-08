(function($) {
  if (!$.AudioContext && !$.webkitAudioContext) {return; }
  let AudioContext;
  let Analyser;
  let DynamicsCompressor;
  let MasterGain;

  // Web Audio Context 생성
  function _createAudioContext() {
    AudioContext = new ($.AudioContext || $.webkitAudioContext);

    Analyser = AudioContext.createAnalyser();
    Analyser.fftSize = 32768;

    DynamicsCompressor = AudioContext.createDynamicsCompressor();
    MasterGain = AudioContext.createGain();

    DynamicsCompressor.connect(MasterGain);
    MasterGain.connect(Analyser);
    Analyser.connect(AudioContext.destination);
  }

  // 노트 인스턴스 생성
  function Test() {
    if (!AudioContext) {_createAudioContext(); }

    this.ctx = AudioContext;
    this.masterGainNode = MasterGain;
    this.anls = Analyser;

    const gainNode = AudioContext.createGain();
    const bufferSource = AudioContext.createBufferSource();

    const request = new XMLHttpRequest();
    request.open('GET', './sample2.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      AudioContext.decodeAudioData(request.response, function(theBuffer) {
        bufferSource.buffer = theBuffer;
        bufferSource.start();
      }, function (err) {
        console.log('error');
      });
    };

    request.send();

    bufferSource.connect(gainNode);
    gainNode.connect(DynamicsCompressor);

    this.bufferSource = bufferSource;
    this.gainNode = gainNode;
  }

  // 노트 재생 중지
  Test.prototype.stop = function() {
    this.bufferSource.stop();
  };

  // 노트 게인 컨트롤
  Test.prototype.gain = function(n) {
    this.gainNode.gain.value = +n;
    return this;
  };

  // 노트 마스터 게인 컨트롤
  Test.prototype.masterGain = function(n) {
    this.masterGainNode.gain.value = +n;
    return this;
  };

  // 노트 인스턴스 생성
  function Note() {
    if (!AudioContext) {_createAudioContext(); }

    this.ctx = AudioContext;
    this.masterGainNode = MasterGain;
    this.anls = Analyser;

    const gainNode = AudioContext.createGain();
    const oscillator = AudioContext.createOscillator();

    oscillator.connect(gainNode);
    gainNode.connect(DynamicsCompressor);

    this.gainNode = gainNode;
    this.oscillator = oscillator;
  }

  // 노트 재생 시작
  Note.prototype.play = function() {
    this.oscillator.start();
    return this;
  };

  // 노트 재생 중지
  Note.prototype.stop = function() {
    this.oscillator.stop();
  };

  // 노트 게인 컨트롤
  Note.prototype.gain = function(n) {
    this.gainNode.gain.value = +n;
    return this;
  };

  // 노트 마스터 게인 컨트롤
  Note.prototype.masterGain = function(n) {
    this.masterGainNode.gain.value = +n;
    return this;
  };

  // 노트 프리컨시 컨트롤
  Note.prototype.frequency = function(n) {
    this.oscillator.frequency.value = +n;
    return this;
  };

  // Note 2 =========================================================


  // 노트 인스턴스 생성
  function Note2(hz, type, harmonics) {
    if (!AudioContext) {_createAudioContext(); }

    this.ctx = AudioContext;
    this.masterGainNode = MasterGain;
    this.anls = Analyser;

    const gainNode = [];
    const oscillator = [];

    for (let i = 0; i < harmonics; i++) {
      const o = AudioContext.createOscillator();
      const g = AudioContext.createGain();

      o.type = type;
      o.frequency.value = hz * (i + 1);
      g.gain.value = 1 / (i + 1);

      o.connect(g);
      g.connect(DynamicsCompressor);

      oscillator.push(o);
      gainNode.push(g);
    }

    this.gainNode = gainNode;
    this.oscillator = oscillator;
  }

  // 노트 재생 시작
  Note2.prototype.play = function(s) {
    const t = AudioContext.currentTime;
    this.oscillator.forEach((v, i, a)=>{
      v.start(t+s);
      v.stop(t+s+1);
    });
    this.gainNode.forEach((v, i, a)=>{
      // v.gain.value = 0;
      // v.gain.setTargetAtTime(1, t, 0.1);
      v.gain.setTargetAtTime(0, t + s + 0.1, 0.2);
    });
    return this;
  };

  // 노트 재생 중지
  Note2.prototype.stop = function() {
    this.oscillator.stop();
  };

  // 노트 게인 컨트롤
  Note2.prototype.gain = function(n) {
    this.gainNode.gain.value = +n;
    return this;
  };

  // 노트 마스터 게인 컨트롤
  Note2.prototype.masterGain = function(n) {
    this.masterGainNode.gain.value = +n;
    return this;
  };

  // 노트 프리컨시 컨트롤
  Note2.prototype.frequency = function(n) {
    this.oscillator.frequency.value = +n;
    return this;
  };

  $._Note = Note;
  $._Note2 = Note2;
  $._Test = Test;
})(window);

const Note = _Note;
delete window._Note;

const Note2 = _Note2;
delete window._Note2;

const Test = _Test;
delete window._Test;