<template>
    <div :class="[$style.FilterCell, {_active: active}]">
        <div :class="$style.label"> {{ label }} <span v-html="suffix"></span></div>
        <div :class="$style.inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FilterCell',

        props: {
            values: {
                type: Object,
                default: () => ({})
            },

            label: {
                type: String,
                default: ''
            },

            name: {
                type: String,
                default: ''
            },

            suffix: {
                type: String,
                default: ''
            }
        },

        computed: {
            active() {
                return Object.keys(this.values).includes(this.name)
                    || Object.keys(this.values).includes(`${this.name}_min`)
                    || Object.keys(this.values).includes(`${this.name}_max`);
            }
        },
    };
</script>

<style lang="scss" module>
    .FilterCell {
        display: flex;
        flex-direction: column;

        &:global(._active) {

            .label {
                color: rgba(white, .6);
            }
        }
    }

    .label {
        display: flex;
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: .5em;
        color: rgba(white, .2);
        transition: all .4s $easing;

        span {
            display: block;
            margin-left: 12px;
            color: #66668a;
        }
    }

    .inner {
        width: 100%;
        margin-top: 14px;
    }
</style>