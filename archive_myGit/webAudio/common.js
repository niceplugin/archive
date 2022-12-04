let play;

window.addEventListener(
    'keydown',
    function (eve) {
      if (eve.key === ' ' && !play) {
        const v = document.getElementById('ipt-gain').value;
        play = new Note().gain(v).play();
      } else if (eve.key === 'q' && !play) {
        // const a = [[4,8],[4,8],[4,10],[4,10],[4,8],[4,8],[4,5],
        //   [4,8],[4,8],[4,5],[4,5],[4,3],
        //   [4,8],[4,8],[4,10],[4,10],[4,8],[4,8],[4,5],
        //   [4,8],[4,5],[4,3],[4,5],[4,1],];
        // for (let i = 0; i <a.length; i++) {
        //   new Note2(getFrequency2(a[i][0], a[i][1])).play(i * 0.5);
        // }
        const type_a = ['sine', 'square', 'sawtooth', 'triangle'];
        const type = type_a[document.getElementById('ipt-type').value];
        const harmonics = +document.getElementById('ipt-harmonics').value;
        new Note2(getFrequency2(5,12), type, harmonics).play(0);
        // new Note2(getFrequency2(4,1)).play(0);
        // new Note2(getFrequency2(4,5)).play(0.5);
        // new Note2(getFrequency2(4,8)).play(1);
        // new Note2(getFrequency2(4,1)).play(1.5);
        // new Note2(getFrequency2(4,6)).play(2);
        // new Note2(getFrequency2(4,10)).play(2.5);
        // new Note2(getFrequency2(3,12)).play(3);
        // new Note2(getFrequency2(4,3)).play(3.5);
        // new Note2(getFrequency2(4,8)).play(4);
      } else if (eve.key === 'a' && !play) {
        play = new Test();
      }
    }
);
window.addEventListener(
    'keyup',
    function (eve) {
      if (eve.key !== 'Escape') {return; }
      if (play) {
        play = play.stop();
      }
    }
);
document.getElementById('ipt-gain').addEventListener(
    'input',
    function (eve) {
      if (play) {
        play.gain(eve.target.value);
      }
    }
);
document.getElementById('ipt-master-gain').addEventListener(
    'input',
    function (eve) {
      if (play) {
        play.masterGain(eve.target.value);
      }
    }
);

function getFrequency() {
  const octave = document.getElementById('ipt-octave').value;
  const note = document.getElementById('ipt-note').value;
  const term1 = Math.pow(2, octave - 1);
  const term2 = Math.pow(2, (note - 10) / 12);
  const hz = term1 * term2 * 55;
  return hz;
}
function getFrequency2(octave, note) {
  const term1 = Math.pow(2, octave - 1);
  const term2 = Math.pow(2, (note - 10) / 12);
  const hz = term1 * term2 * 55;
  return hz;
}
document.getElementById('ipt-octave').addEventListener(
    'input',
    function (eve) {
      if (play) {
        play.frequency(getFrequency());
      }
    }
);
document.getElementById('ipt-note').addEventListener(
    'input',
    function (eve) {
      if (play) {
        play.frequency(getFrequency());
      }
    }
);

document.getElementById('btn-test').addEventListener(
    'click',
    function (eve) {
      new Note().frequency(110).play();
      new Note().frequency(111).play();
      new Note().frequency(112).play();
      new Note().frequency(112.4).play();
    }
);