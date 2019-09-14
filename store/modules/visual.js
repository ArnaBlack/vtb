const state = () => ({
    buildings: null,
    building: null,
    section: null,
});

const actions = {
    async GET_BUILDINGS({state, rootState, commit}) {
        try {
            const {data} = await this.$axios.get(this.$api.visual.building);
            if (!data) throw 'Cant get buildings from api';

            commit('SET_BUILDINGS', data);

        } catch (e) {
            console.error(e);
        }
    },

    async GET_BUILDING({state, rootState, commit}, buildingId) {
        try {
            const {data} = await this.$axios.get(`${this.$api.visual.building}${buildingId}`);
            if (!data) throw 'Cant get building from api';

            commit('SET_BUILDING', data);

        } catch (e) {
            console.error(e);
        }
    },

    async GET_SECTION({state, rootState, commit}, sectionId) {
        try {
            const {data} = await this.$axios.get(`${this.$api.visual.section}${sectionId}`);
            if (!data) throw 'Cant get section from api';

            commit('SET_SECTION', data);

        } catch (e) {
            console.error(e);
        }
    }
};

const mutations = {
    SET_BUILDINGS(state, value) {
        state.buildings = value;
    },

    SET_BUILDING(state, value) {
        state.building = value;
    },

    SET_SECTION(state, value) {
        state.section = value;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
