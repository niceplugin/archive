import * as Tone from 'tone'
import lineNoteSource from './lineNoteSource.js'
import lineNoteFret from './lineNoteFret.js'
import codeInfo from './codeInfo.js'

class Guitar {
  #line = []
  #currentCode = []
  #currentVolume = []
  #gap = 0.02

  init() {
    if (this.#line.length) {
      return
    }

    const self = this
    lineNoteSource.forEach(urls => {
      const baseUrl = '/se/'
      const line = new Tone
        .Sampler({urls, baseUrl})
        .toDestination()

      self.#line.push(line)
    })

    return Tone.loaded()
  }

  #getCodeArr(code) {
    const flats = codeInfo[code].slice()
    return flats.map((flat, idx) => lineNoteFret[idx][flat])
  }

  #setVolume(direction) {
    this.#currentVolume = this.#getVolumeArr(direction)
  }

  #getVolumeArr(direction) {
    switch (direction) {
      case 1:
        return [ -3, -3, -4, -4, -5, -5 ]
      case -1:
        return [ -5, -5, -4, -4, -3, -3 ]
    }
  }

  #setAccent(accent) {
    this.#currentVolume =
      this.#currentVolume.map(vol => vol + accent)
  }

  #getCutBaseIdx(direction) {
    if (direction === -1) {
      return 6
    }
    let idx = 0
    this.#currentCode.map((code, i) => {
      if (typeof (code) === 'string') {
        idx = i
      }
    })
    return idx

  }

  setCode(code) {
    this.#currentCode = this.#getCodeArr(code)
  }

  playTick() {
    const self = this
    this.#line.forEach((line, idx) => {
      const code = self.#currentCode[idx]
      const duration = 0.08
      line.releaseAll()
      line.volume.value = 0
      code && line.triggerAttackRelease(code, duration)
    })
  }

  playStroke(direction, accent) {
    const gap = this.#gap * direction
    const max = this.#getCutBaseIdx(direction)
    let i = this.#getCutBaseIdx(direction)

    this.#setVolume(direction)
    this.#setAccent(accent)

    while (i--) {
      const code = this.#currentCode[i]
      let now = direction === 1 ?
        Tone.now() + Math.abs(gap * i) :
        Tone.now() + Math.abs(gap * (max - i))
      this.#line[i].releaseAll()
      this.#line[i].volume.value = this.#currentVolume[i]
      code && this.#line[i].triggerAttack(code, now)
    }
  }
}

const guitar = new Guitar()

export default guitar