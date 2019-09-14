import modal from './modules/modal';
import purchase from './modules/purchase';
import project from './modules/project';
import visual from './modules/visual';
import favourite from './modules/favourite';
import documents from './modules/documents';
import contacts from './modules/contacts';
import menu from './modules/menu';

export const state = () => {
    return {
        loaded: false,
        footer: {
            isHiddenBorder: false,
            isFixed: false
        }
    };
};

export const modules = {
    menu,
    modal,
    purchase,
    project,
    visual,
    favourite,
    documents,
    contacts
};

export const mutations = {
    LOADED() {
        this.state.loaded = true;
    },

    HIDE_FOOTER_BORDER(state, payload) {
        this.state.footer.isHiddenBorder = payload;
    },

    CHANGE_FOOTER_FIXED(state, payload) {
        this.state.footer.isFixed = payload;
    }
};

export const actions = {
    async nuxtServerInit({state, dispatch, commit}, {route}) {
        await dispatch('project/GET_PROJECT', null);
        await dispatch('contacts/GET_CONTACTS', null);
        await dispatch('favourite/getFavourites', null);
        if (route.name === 'progress') this.state.footer.isFixed = true;
    },

    changeFooterFixed({commit}, payload) {
        console.log('changeFooterFixed', payload);
        commit('CHANGE_FOOTER_FIXED', payload);
    }
};
