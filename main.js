import '/style.css'
import guitar from '/guitar'

const btnInit = document.getElementById('btn-init')
const btnDo = document.getElementById('btn-do')
btnInit.addEventListener('click', async () => {
  await guitar.init()
  btnDo.disabled = false
  guitar.setCode('G7')
  guitar.playStroke(-1, 0)
})

btnDo.addEventListener('click', () => {
  guitar.playTick()
})