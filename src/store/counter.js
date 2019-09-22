export default {
  state: {
    counter: 0
  },

  actions: {
    asyncChangeCounter({commit}, payload) {
      setTimeout (() => {
        commit('changeCounter', payload.conterValue)
      }, payload.timeoutDelay)
    }
  },

  mutations: {
    changeCounter(state, payload) {
      state.counter +=  payload
    }
  },

  getters: {
    computedCounter(state) {
      return state.counter  * (7 - 2)
    }
  }
}
