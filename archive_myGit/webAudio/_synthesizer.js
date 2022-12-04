(function($){
  const AudioContext = $.AudioContext || $.webkitAudioContext;
  let audio;
  let dynamicsCompressor;
  let masterGainNode;

  if (!AudioContext) {return; }

  // 오디오 컨텍스트 생성
  function _createAudioContext() {
    audio = new AudioContext();
    dynamicsCompressor = audio.createDynamicsCompressor();
    dynamicsCompressor.connect(audio.destination);

    masterGainNode = audio.createGain();
    masterGainNode.connect(dynamicsCompressor);
    $._masterGain = masterGainNode.gain;
  }

  // 사운드 플레이어 인스턴스 생성
  function SoundPlayer() {
    if (!audio) {_createAudioContext(); }

    this.audioContext = audio;

    this.gainNode = this.audioContext.createGain();
    this.oscillator = this.audioContext.createOscillator();

    this.oscillator.connect(this.gainNode);
    // this.gainNode.connect(dynamicsCompressor);

    this.gainNode.connect(masterGainNode);
  }

  // 사운드 프리퀀시 세팅
  //  설명:
  //    0옥타브 D# 음계 (20.6 Hz) ~ 10옥타브 D# 음계 (19.9 kHz) 까지 설정 가능
  //    노트 값을 활용하여 해당 옥타브 범위 밖인 -20음계에서 +16음계 까지 조작 가능
  //  전달인자:
  //    octave: 2 ~ 8 (옥타브) [4]
  //    note: 1 ~ 12 (음계: C, C#, D, Eb, E, F, F#, G, G#, A, Bb, B) [10]
  //      값으로 -19 ~ 28 까지 허용된다 (비브라토 응용가능)
  SoundPlayer.prototype.setFrequency = function(note, octave) {
    const currentTime = this.audioContext.currentTime;

    // octave 유효성 검사
    octave = +octave;
    if (isNaN(octave)) {octave = 4; }
    else if (octave < 2) {octave = 2; }
    else if (octave > 8) {octave = 8; }
    octave = Math.round(octave);

    // note 유효성 검사
    note = +note;
    if (isNaN(note)) {note = 10; }
    else if (note < -19) {note = -19; }
    else if (note > 28) {note = 28; }

    // 옥타브와 음계로 hz 계산 공식
    const term1 = Math.pow(2, octave - 1);
    const term2 = Math.pow(2, (note - 10) / 12);
    const hz = term1 * term2 * 55;

    this.oscillator.frequency.setValueAtTime(hz, currentTime);

    return this;
  };

  // 사운드 웨이브 세팅
  //  설명: 출력할 사운드의 웨이브 형태를 설정(custom 미구현상태)
  //  전달인자:
  //    waveType: 'sine', 'square', 'sawtooth', 'triangle'
  SoundPlayer.prototype.setWaveType = function(waveType) {
    if (waveType === 'sine' ||
        waveType === 'square' ||
        waveType === 'sawtooth' ||
        waveType === 'triangle') {
      this.oscillator.type = waveType;
    }

    return this;
  };

  // 사운드 볼륨 조절
  //  설명: 별도의 시차 이팩트 없이 즉시 사운드 볼륨 조절
  //  전달인자:
  //    volume: Number (minValue ~ 1)
  //    fade: 0 <= Number (fade 이팩트 시간: 단위 초) [0]
  SoundPlayer.prototype.setVolume = function(volume, fade) {
    const gain = this.gainNode.gain;
    const currentTime = this.audioContext.currentTime;

    // volume 값 유효성 검사
    volume = +volume;
    if (isNaN(volume)) {volume = gain.value; }
    else if (volume < Number.EPSILON) {volume = Number.EPSILON; }
    else if (volume > 1) {volume = 1; }

    // fade 값 유효성 검사
    fade = +fade;
    if (isNaN(fade) || fade < 0) {fade = 0; }
    fade += currentTime;

    gain.exponentialRampToValueAtTime(volume, fade);

    return this;
  };

  // 사운드 플레이
  //  설명: 설정된 값에 해당하는 음을 재생
  //  전달인자:
  //    when: 0 <= Number (재생을 시작할 시간: 단위 초) [0]
  SoundPlayer.prototype.play = function(when) {
    const oscillator = this.oscillator;
    const currentTime = this.audioContext.currentTime;

    // when 값 유효성 검사
    when = +when;
    if (isNaN(when)) {when = 0; }
    else if (when < 0) {when = 0; }
    when += currentTime;

    this.setVolume(1);
    oscillator.start(when);

    return this;
  };

  // 사운드 중지
  //  설명: 설정된 시간에 재생중인 사운드를 중지
  //  전달인자:
  //    when: 0 <= Number (재생을 중지할 시간: 단위 초) [0]
  //    fade: 0 <= Number (재생 중지 시 fade-out 이팩트 시간: 단위 초) [0]
  SoundPlayer.prototype.stop = function(when, fade) {
    const oscillator = this.oscillator;
    const currentTime = this.audioContext.currentTime;

    // fade 값 유효성 검사
    fade = +fade;
    if (isNaN(fade) || fade < 0) {fade = 0; }

    // when 값 유효성 검사
    when = +when;
    if (isNaN(when)) {when = 0; }
    else if (when < 0) {when = 0; }
    when += currentTime + fade;

    if (fade) {
      this.setVolume(0, fade);
    }
    oscillator.stop(when);

    return this;
  };

  $._SoundPlayer = SoundPlayer;
})(window);

const SoundPlayer = _SoundPlayer;
delete window._SoundPlayer;