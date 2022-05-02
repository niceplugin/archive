export default {
  workingState(state, boolean = false) {
    state.minifyWorking = boolean
  },
  stopState(state, boolean = false) {
    state.minifyStop = boolean
  },
  dragState(state, boolean = false) {
    state.dragOn = boolean
  },
  zippingState(state, boolean = false) {
    state.zipping = boolean
  },
  addResultList(state, item) {
    state.resultList.push(item)
  },
  addRequestList(state, item) {
    state.requestList.push(item)
  },
  subRequestList(state) {
    state.requestList.shift()
  },
}