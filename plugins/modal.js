import Vue from 'vue';

const ModalPlugin = {
    install(Vue, options = {}) {
        Vue.prototype.$modal = {
            event: new Vue(),

            open(component, props) {
                this.event.$emit('open', component, props);
            },

            close() {
                this.event.$emit('close');
            }
        };
    }
};


let components = process.env.ModalComponents ? process.env.ModalComponents.split(',') : [];

if (components.length)
    components.forEach((componentFileName) => {
        const component = require('~/components/default/Modals/' + componentFileName).default;
        Vue.component(component.name, component);
    });


Vue.use(ModalPlugin);
