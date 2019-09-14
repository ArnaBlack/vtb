const exportedPlugins = [
    '~/plugins/axios.js',
    '~/plugins/sentry.js',
    '~/plugins/api.js',
    '~/plugins/modal.js',
    '~/plugins/filters.js',
    '~/plugins/vue-lazy-load.js',
    '~/plugins/vue-mq.js',
    '~/plugins/vue-scroll-to.js',
    {
        src: '~/plugins/mapbox-gl.js',
        ssr: false
    },
    {
        src: '~/plugins/vue-slider-component.js',
        ssr: false
    },
    {
        src: '~/plugins/smoothscroll.js',
        ssr: false
    },
];

export default exportedPlugins;