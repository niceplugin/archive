import * as Tone from 'tone'

class Kalimba {
  #sampler

  setInstrument(name, callback) {
    this.#sampler = new Tone.Sampler({
      urls: {
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'F5': 'F5.mp3',
      },
      baseUrl: `/se/${ name }/`,
      onload() {
        typeof (callback) === 'function' && callback()
      },
    }).toDestination()
  }

  stopNote(note) {
    this.#sampler.triggerRelease(note, Tone.now())
  }

  playNote(note) {
    this.#sampler.triggerAttack(note, Tone.now())
  }

}



export default new Kalimba















