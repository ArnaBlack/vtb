const state = () => ({
    office: {},
});

const getters = {
    location: (state) => {
        return state.office.location ? state.office.location.split(',').reverse() : [];
    }
};

const actions = {
    async GET_CONTACTS({ commit, state, rootState }) {

        try {
            const { data } = await this.$axios.get(this.$api.office);

            if (data?.length) {
                commit('SET_DATA', data[0]);
            }

        } catch (e) {
            console.error(e);
        }

    },
};

const mutations = {
    SET_DATA(state, payload) {
        state.office = {...payload};
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
