<template>
    <transition name="modal">

        <div v-if="active"
             :class="$style.SiteModal">

            <slot v-if="$slots.close" name="close"></slot>
            <ui-close-button v-else
                             :class="$style.close"
                             @click.native="$modal.close()">
            </ui-close-button>

            <transition name="inner">
                <div v-if="!!component"
                     :class="$style.content">
                    <component :is="component"
                               :props="props || {}">
                    </component>
                </div>
            </transition>
        </div>

    </transition>
</template>

<script>
    import {scrollbarWidth} from '../../assets/js/utils';

    export default {
        name: 'SiteModal',
        data() {
            return {
                active: false,
                component: null,
                props: null,
                timing: 600
            };
        },

        beforeMount() {
            this.$modal.event.$on('open', this.onOpen);
            this.$modal.event.$on('close', this.onClose);
        },

        beforeDestroy() {
            this.$modal.event.$off('open', this.onOpen);
            this.$modal.event.$off('close', this.onClose);
        },

        methods: {
            onOpen(component, props) {
                this.lockBody();
                this.active = true;
                this.component = null;

                setTimeout(() => {
                    this.component = component;
                    this.props = Object.assign({}, props);
                }, this.timing);
            },

            onClose() {
                this.component = null;
                this.props = Object.assign({}, {});

                setTimeout(() => {
                    this.active = false;
                    this.unlockBody();
                }, this.timing);
            },

            lockBody() {
                document.body.classList.add('_locked');
                document.body.style.paddingRight = `${scrollbarWidth()}px`;
                document.body.style.height = '100%';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.height = '100%';

            },

            unlockBody() {
                document.documentElement.style.height = '';
                document.body.style.height = '';
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.body.classList.remove('_locked');

            }
        }
    };
</script>

<style lang="scss" module>
    .SiteModal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 11;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            transform-origin: 100% 0;
            transform: translate3d(0, 0, 0) scaleX(1);
            transition: all .6s $easing;
            background-color: $c-blue-d;
        }

        &:global(.modal-enter-active),
        &:global(.modal-leave-active) {
            transition: all .6s $easing;

            &:before {
                transition: all .6s $easing;
            }

            .close {
                transform: translate3d(0, 0, 0) scale(1);
                transition: all .4s $easing .2s;
            }
        }

        &:global(.modal-enter),
        &:global(.modal-leave-to) {
            transition: all .4s $easing .4s;

            &:before {
                transform: translate3d(0, 0, 0) scaleX(0);
                transition: all .4s $easing .4s;
            }

            .close {
                transform: translate3d(0, 0, 0) scale(0);
                transition: all .2s $easing;
            }
        }
    }

    .content {
        position: relative;
        z-index: 2;

        &:global(.inner-enter-active),
        &:global(.inner-active) {
            transition: all .6s $easing;
        }

        &:global(.inner-enter),
        &:global(.inner-leave-active) {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
            transition: all .4s $easing;
        }
    }

    .close {
        position: absolute;
        top: 32px;
        right: $col;
        z-index: 3;

        :global {

            .icn {
                width: 50px;
                height: 50px;
            }
        }
    }

    .rect {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 5;
        background-color: red;
        width: 220px;
        height: 220px;

        &:global(.inner-enter-active),
        &:global(.inner-active) {
            height: 100px;
            transition: all .6s $easing .6s;
        }

        &:global(.inner-enter),
        &:global(.inner-leave-active) {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
            transition: all .4s $easing;
        }
    }
</style>
