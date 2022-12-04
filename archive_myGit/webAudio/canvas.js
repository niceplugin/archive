// (function($) {
//   const canvas = document.getElementById('canvas');
//   const cw = window.innerWidth - 48;
//   const ch = 300;
//   canvas.width = cw;
//   canvas.height = ch;
//   const ctx = canvas.getContext('2d');
//
//   let arr;
//   let i_arr;
//
//   function draw() {
//     ctx.fillStyle = 'rgba(0, 0, 0, 1)';
//     ctx.fillRect(0, 0, cw, ch);
//
//     if (play) {
//       const l = play.anls.frequencyBinCount;
//       let i;
//
//       if (!arr) {arr = new Uint8Array(l); }
//       play.anls.getByteFrequencyData(arr);
//
//       for (i = 0; i < l; i++) {
//         const width = cw / l;
//         const height = arr[i] / 255 * ch;
//         const hue = (i / l) * 360;
//
//         ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
//         ctx.fillRect(i * width, ch, width, -height);
//       }
//     }
//
//     $.requestAnimationFrame(draw);
//   }
//
//   draw();
//
//   window.ctx = ctx;
// })(window);

(function($) {
  const canvas = document.getElementById('canvas');
  const cw = $.screen.width;
  const ch = Math.floor(cw / 3);
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');

  let arr;
  let i_arr = [];
  let clipping = false;

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, cw, ch);

    if (play) {
      let i;

      if (!arr) {
        const sampleRate = play.ctx.sampleRate;
        const fftSize = play.anls.fftSize;
        for (let octave = 1; octave <= 7; octave++) {
          for (let note = 1; note <= 12; note++) {
            const term1 = Math.pow(2, octave - 1);
            const term2 = Math.pow(2, (note - 10) / 12);
            const hz = term1 * term2 * 55;
            const i = Math.round(hz * fftSize / sampleRate);
            i_arr.push(i);
          }
        }
        arr = new Uint8Array(play.anls.frequencyBinCount);
      }
      play.anls.getByteFrequencyData(arr);

      const l = i_arr.length;
      for (i = 0; i < l; i++) {
        const width = cw / l;
        const height = arr[i_arr[i]] / 255 * ch;
        const hue = (i / l) * 360;

        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.fillRect(i * width, ch, width, -height);
      }
    }

    $.requestAnimationFrame(draw);
  }

  draw();

  window.ctx = ctx;
})(window);