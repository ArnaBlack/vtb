const state = () => ({
    menuOpened: false,
    isJump: false,
});

const mutations = {
    SET_MENU_STATE(state, newState) {
        state.menuOpened = newState;
    },

    JUMP_TO_NEXT_VIEW(state, val) {
        state.isJump = val;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
};
