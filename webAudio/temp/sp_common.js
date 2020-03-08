document.getElementById('btn1').addEventListener('click', function(eve){
  let waveType = 'sine'; // sine, square, sawtooth, triangle
  (new SoundPlayer()).setWaveType(waveType).setFrequency(1).play(0).stop(0.5);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(5).play(0.5).stop(1);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(8).play(1).stop(1.5);
  waveType = 'square';
  (new SoundPlayer()).setWaveType(waveType).setFrequency(1).play(2).stop(2.5);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(5).play(2.5).stop(3);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(8).play(3).stop(3.5);
  waveType = 'sawtooth';
  (new SoundPlayer()).setWaveType(waveType).setFrequency(1).play(4).stop(4.5);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(5).play(4.5).stop(5);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(8).play(5).stop(5.5);
  waveType = 'triangle';
  (new SoundPlayer()).setWaveType(waveType).setFrequency(1).play(6).stop(6.5);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(5).play(6.5).stop(7);
  (new SoundPlayer()).setWaveType(waveType).setFrequency(8).play(7).stop(7.5);
});
document.getElementById('ipt').addEventListener('input', function(eve){
  _masterGain.setValueAtTime(+eve.target.value, 0);
});