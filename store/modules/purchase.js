const state = () => ({
    links: [
        {
            id: 1,
            link: '/purchase/mortgage',
            title: 'Ипотека',
            info: '5%',
            info_text: 'от',
        },
        // {
        //     id: 2,
        //     link: '/purchase/installment',
        //     title: 'Рассрочка',
        //     info: '0%',
        //     info_text: '',
        // },
        // {
        //     id: 3,
        //     link: '/purchase/military',
        //     title: 'Военная ипотека',
        //     info: '',
        //     info_text: '',
        // },
        // {
        //     id: 4,
        //     link: '/purchase/capital',
        //     title: 'Материнский капитал',
        //     info: '',
        //     info_text: '',
        // }
    ],
});

const getters = {
    links: (state, getters, rootState) => {
        // return state.links.filter((prop) => ![prop.link, `${prop.link}/`].includes(rootState.route.path));
    }
};

const actions = {
    /* Временный костыль по определению минималього рейта */
    async CHANGE_MORTGAGE_RATE({state, commit}) {
        let offers = await this.$axios.$get(this.$api.mortgage.offers);
        let minRate = Math.min(...offers.map(prop => prop.min_rate));

        commit('SET_MORTGAGE_RATE', minRate);
    }
};

const mutations = {
    SET_MORTGAGE_RATE(state, rateValue) {
        state.links[0].info = `${rateValue}%`;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
