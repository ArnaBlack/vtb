import path from 'path';
import fs from 'fs';

require('dotenv').config();

import {componentFolder} from './nuxt-config/Helpers';
import scrollBehavior from './nuxt-config/scrollBehavior';
import exportedPlugins from './plugins';

const StyleLintPlugin = require('stylelint-webpack-plugin');

let ModalComponents = componentFolder('./components/default/Modals/');

const env = {
    apiUrl: process.env.API_URL,
    cert: process.env.SSL_CERTIFICATE,
    certKey: process.env.SSL_CERTIFICATE_KEY,
    sentryDSN: process.env.SENTRY_FRONTEND_DSN,
    proxy: process.env.PROXY
};

module.exports = {
    mode: 'universal',

    server: env.cert && env.certKey ? {
        https: {
            cert: fs.readFileSync(path.resolve(__dirname, env.cert)),
            key: fs.readFileSync(path.resolve(__dirname, env.certKey))
        }
    } : {},

    render: {
        http2: {
            push: true,
        }
    },

    watchers: {
        webpack: {
            poll: 1000
        }
    },

    env: {
        ModalComponents: ModalComponents
    },

    /*
     ** Headers of the page
     */
    head: {
        title: 'ЖК Legacy',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'ЖК «Legacy»'
            }
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/assets/favicons/favicon.ico'},
            {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicons/favicon-32x32.png'},
            {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicons/favicon-16x16.png'},
            {rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicons/apple-touch-icon.png'},
            {rel: 'manifest', href: '/assets/favicons/site.webmanifest'},
        ],
        script: []
    },


    /*
     ** Customize the progress-bar color
     */
    loading: {color: '#000'},

    /*
     ** Global CSS
     */
    css: [
        '~/node_modules/mapbox-gl/dist/mapbox-gl.css',
        '~/assets/styles/main.scss'
    ],

    styleResources: {
        scss: '~/assets/styles/shared/*.scss'
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: exportedPlugins,

    router: {
        linkActiveClass: '_active-link',
        linkExactActiveClass: '_active-exact',
        scrollBehavior
    },

    modules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/style-resources',
        '@nuxtjs/sentry',
        ['@nuxtjs/google-tag-manager', {id: 'GTM-T7CTZJN'}]
    ],

    axios: {
        baseURL: env.apiUrl || 'http://backend:8000',
        browserBaseURL: '/',
        proxy: env.proxy
    },

    proxy: {
        '/api': env.apiUrl || '/admin',
        '/admin': env.apiUrl || '/admin',
        '/static': env.apiUrl || '/static',
    },

    sentry: {
        dsn: env.sentryDSN || false,
    },

    build: {
        publicPath: '/n/',

        babel: {
            plugins: [
                ['@babel/plugin-proposal-optional-chaining']
            ],
        },

        terser: {
            terserOptions: {
                mangle: {
                    safari10: true
                }
            }
        },

        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });

                config.plugins.push(
                    new StyleLintPlugin({
                        files: ['**/*.scss', '**/*.vue'],
                        failOnError: false,
                        quiet: false
                    })
                );
            }
        }
    }
};
