const state = () => ({
    all: [],
});

const actions = {
    async GET_DOCUMENTS({ commit, state, rootState }) {

        try {
            const { data } = await this.$axios.get(this.$api.documents);

            if (data?.length) {
                commit('SET_DOCUMENTS', data);
            }

        } catch (e) {
            console.error(e);
        }

    },
};

const mutations = {
    SET_DOCUMENTS(state, payload) {
        state.all = [...payload];
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
