import { ref } from 'vue'

export default {
  setup() {
    const message = ref('안녕 Vue!')
    const isRed = ref(true)
    const color = ref('green')

    function toggleRed() {
      isRed.value = !isRed.value
    }

    function toggleColor() {
      color.value = color.value === 'green' ? 'blue' : 'green'
    }

    return {
      message,
      isRed,
      color,
      toggleRed,
      toggleColor
    }
  }
}
