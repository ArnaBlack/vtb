import Vue from 'vue';
import VueMq from 'vue-mq';

export default ({app}) => {
    Vue.use(VueMq, {
        breakpoints: {
            mob: 720,
            tabS: 920,
            tab: 1280,
            lap: 1440,
            xl: Infinity,
        },
        defaultBreakpoint: 'lap'
    });
};
