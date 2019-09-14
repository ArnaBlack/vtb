const state = () => ({
    state: false,
});

const getters = {
    getState: state => state.state,
};

const actions = {
    CLOSE_MODAL({state, commit}) {
        commit('SET_STATE', false);
    },

    SET_MODAL({state, commit}, payload) {
        commit('SET_STATE', !!payload);
    },
};

const mutations = {
    SET_STATE(state, value) {
        state.state = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
