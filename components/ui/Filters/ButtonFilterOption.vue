<template>
    <div :class="[$style.ButtonFilterItem, {_disabled: disabled}, {_active: active}]">
        <span v-html="label"></span>
    </div>
</template>

<script>
    export default {
        name: 'ButtonFilterOption',

        props: {
            label: {
                type: String,
                default: ''
            },

            name: {
                type: [String, Number]
            },

            value: {
                type: [String, Number],
                default: null
            },

            facet: {
                type: Array,
                default: () => []
            },

            allowFacets: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            disabled() {
                return this.allowFacets && this.facet && !this.facet.includes(this.name);
            },

            active() {
                return this.value && this.value.split(',').includes(this.name.toString());
            }
        },
    };
</script>

<style lang="scss" module>
    .ButtonFilterItem {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: transparent;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(white, .2);
        border-radius: 50%;
        text-align: center;
        font-size: 16px;
        line-height: 40px;
        color: white;
        transition: all .4s $easing;
        cursor: pointer;

        span {
            display: block;
            margin-bottom: -2px;
        }

        &:global {

            &._active {
                background-color: white;
                border-color: white;
                color: $c-blue-d;
            }

            &._disabled {
                opacity: .5;
                pointer-events: none;
            }
        }
    }
</style>