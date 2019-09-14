const state = () => ({
    project: {},
    pages: [],
    page: {},
});

const getters = {
    pageBySlug: state => slug => {
        return state.pages.find(prop => prop.slug === slug);
    },
};

const actions = {
    async GET_PROJECT({ state, commit }) {
        const res = await this.$axios.$get(this.$api.project.current);

        const {
            pk,
            name,
            address,
            coords,
            plan_display,
            plan_preview,
            frontend_name,
            social_links,
        } = res;

        const project = {
            id: pk,
            genplan: {
                preview: plan_preview,
                origin: plan_display
            },
            name,
            address,
            coords,
            frontend_name,
            social_links,
        };

        commit('SET_PROJECT', project);
    },

    /**
     * Получаем список страниц для страницы преимущества
     */
    async GET_PROJECT_PAGES({ state, commit }) {
        if (!state.project.id) {
            console.error('Cant get project id');
        }

        try {
            const res = await this.$axios.$get(this.$api.project.projectPages(state.project.id));

            commit('SET_PROJECT_PAGES', res);
        } catch (e) {
            console.log(e);
        }

    },

    /**
     * Получаем детальную страницу для страницы преимущества
     */
    async GET_PROJECT_PAGE({ state, commit }, url) {

        if (!url) {
            console.error('Cant get url to GET_PROJECT_PAGE');
        }

        try {
            const res = await this.$axios.$get(url);

            commit('SET_PROJECT_PAGE', res);
        } catch (e) {
            console.log(e);
        }

    }
};

const mutations = {
    SET_PROJECT(state, value) {
        state.project = value;
    },

    SET_PROJECT_PAGES(state, value) {
        state.pages = value;
    },

    SET_PROJECT_PAGE(state, value) {
        state.page = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
