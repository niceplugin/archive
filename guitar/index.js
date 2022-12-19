import * as Tone from 'tone';
import lineNoteSource from './lineNoteSource.js';
import lineNoteFret from './lineNoteFret.js';
import codeInfo from './codeInfo.js';

class Guitar {
  #line = [];

  init() {
    if (this.#line.length) {
      return;
    }

    const self = this;
    lineNoteSource.forEach(urls => {
      const baseUrl = '/se/';
      const line = new Tone
        .Sampler({ urls, baseUrl })
        .toDestination();

      self.#line.push(line);
    });

    return Tone.loaded();
  }

  play(code) {
    const cloneCodeInfo = codeInfo[code].slice();
    let i = cloneCodeInfo.length;
    let delay = 0;
    while (i--) {
      const flat = cloneCodeInfo[i];
      const note = lineNoteFret[i][flat];
      if (flat == null) {
        continue;
      }
      this.#line[i].triggerAttack(note, Tone.now() + delay);
      delay += 0.015;
    }
  }
}

const guitar = new Guitar();

export default guitar;