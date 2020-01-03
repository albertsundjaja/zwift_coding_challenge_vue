const state = {
  meteorites: []
}

const getters = {
  meteorites: (state) => {
    return state.meteorites
  }
}

const mutations = {
  setMeteorites: (state, payload) => {
    state.meteorites = payload
  }
}

export default {
  state,
  getters,
  mutations
}
