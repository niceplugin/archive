import * as Tone from 'tone';
import lineNoteSource from './lineNoteSource.js';

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


}

const guitar = new Guitar();

export default guitar;