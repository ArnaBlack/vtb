const messageTemplate = (msg, log) => {
    return [`store:favourite || ${msg}`, log];
};

const state = () => ({
    favouriteList: [],
    count: 0
});

const actions = {
    async getFavourites({commit}) {
        try {
            const data = await this.$axios.$get(this.$api.flats.favorites);
            commit('SET_FAVORITES', data);
            commit('CHANGE_COUNT');
        } catch (e) {
            console.error(messageTemplate('getting error', e));
        }
    },

    toggleFavourites({state, commit, dispatch}, id) {
        let isIn = state.favouriteList.includes(id);

        isIn
            ? dispatch('removeFavourites', id)
            : dispatch('addFavourites', id);
    },

    async addFavourites({commit}, id) {
        try {
            await this.$axios.$post(this.$api.favourites.add(id));
            commit('ADD_FAVORITE_OBJECT', id);
            commit('CHANGE_COUNT');
        } catch (e) {
            console.error(messageTemplate('adding error', e));
            this.$sentry.captureException(new Error(JSON.stringify(messageTemplate('adding error', e))));
        }
    },

    async removeFavourites({commit}, id) {
        try {
            await this.$axios.$post(this.$api.favourites.remove(id));
            commit('REMOVE_FAVORITE_OBJECT', id);
            commit('CHANGE_COUNT');
        } catch (e) {
            console.error(messageTemplate('removing error', e));
        }
    },
};

const mutations = {
    SET_FAVORITES(state, flats) {
        state.favouriteList = flats.map(flat => flat.id);
    },

    ADD_FAVORITE_OBJECT(state, id) {
        state.favouriteList.push(id);

        // console.log(messageTemplate('ADD_FAVORITE_OBJECT', id));
    },

    REMOVE_FAVORITE_OBJECT(state, id) {
        state.favouriteList = state.favouriteList.filter(flatID => flatID !== id);
        // console.log(messageTemplate('REMOVE_FAVORITE_OBJECT', id));
    },

    CHANGE_COUNT(state) {
        state.count = state.favouriteList.length;
        // console.log(messageTemplate('CHANGE_COUNT', state.count));
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
