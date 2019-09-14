<template>
    <div :class="[$style.TrueFalseFilter, {_active: !!value}, {_disabled: disabled}]"
         @click="clickSignal">
        <div :class="$style.label" v-html="label"></div>
    </div>
</template>

<script>
    export default {
        name: 'TrueFalseFilter',

        props: {
            name: {
                type: String,
                default: ''
            },

            value: {
                type: Number,
                default: 0
            },

            facet: {
                type: Array,
                default: () => []
            },

            label: {
                type: String,
                default: ''
            },

            allowFacets: {
                type: Boolean,
                default: true
            }
        },

        computed: {
            disabled() {
                return this.facet.length < 2;
            }
        },

        methods: {
            clickSignal() {
                if (this.disabled) return false;
                let newVal = !this.value ? 1 : null;
                this.$emit('change', {[this.name]: newVal});
            }
        },
    };
</script>

<style lang="scss" module>
    .TrueFalseFilter {
        display: block;
        width: calc(100% - 2px);
        height: 38px;
        padding: 0 20px;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(white, .6);
        transition: all .4s $easing;
        cursor: pointer;

        &:hover,
        &:global(._active) {
            border-color: rgba($c-gold, .6);

            .label {
                color: rgba($c-gold, .6);
            }
        }

        &:global(._disabled) {
            opacity: .4;
            cursor: default;
            pointer-events: none;
        }
    }

    .label {
        text-align: center;
        font-size: 14px;
        line-height: 38px;
        color: rgba(white, .6);
        transition: all .4s $easing;
    }
</style>