import * as Tone from 'tone'
import lineNoteSource from './lineNoteSource.js'
import lineNoteFret from './lineNoteFret.js'
import codeInfo from './codeInfo.js'

class Guitar {
  #line = []

  init() {
    if (this.#line.length) {
      return
    }

    const self = this
    lineNoteSource.forEach(urls => {
      const baseUrl = '/se/'
      const line = new Tone
        .Sampler({ urls, baseUrl })
        .toDestination()

      self.#line.push(line)
    })

    return Tone.loaded()
  }

  #getCodeArr(code) {
    return codeInfo[code].slice()
  }

  #getVolumeArr(position = 0) {
    switch (position) {
      case 1:
        return [ -2, -2, -4, -4, -6, -6 ]
      case 0:
        return [ -6, -4, -2, -2, -4, -6 ]
      case -1:
        return [ -6, -6, -4, -4, -2, -2 ]
    }
  }

  #setAccent(accent = 0, volumeArr) {
    accent *= 2
    return volumeArr.map(vol => vol + accent)
  }




  #calcLength(arr, down) {
    arr = arr.slice()
      .reverse()
    const i = arr.findIndex(flat => flat != null)

    return down ? 6 : 5 - i
  }

  play_(code, down = true, accent = false) {
    const cloneCodeInfo = codeInfo[code].slice()
    const gap = 0.04
    let i = this.#calcLength(cloneCodeInfo, down)
    let delay = down ? 0 : i * gap
    while (i--) {
      const flat = cloneCodeInfo[i]
      const note = lineNoteFret[i][flat]
      if (flat == null) {
        continue
      }
      this.#line[i].volume.value = accent ? 0 : -6
      this.#line[i].triggerAttack(note, Tone.now() + delay)
      delay += down ? gap : -gap
    }
  }
}

const guitar = new Guitar()

export default guitar