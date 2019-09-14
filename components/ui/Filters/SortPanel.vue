<template>
    <div :class="[$style.SortPanel, {_active: !!value}]">
        <div :class="$style.label" v-html="label"></div>

        <div :class="$style.list">
            <sort-cell
                v-for="(option, index) in options"
                :key="index"
                :label="option.label"
                :name="option.name"
                :value="value"
                @click.native="$emit('change', option.name)">
            </sort-cell>
        </div>
    </div>
</template>

<script>
    import SortCell from './SortCell';

    export default {
        name: 'SortPanel',

        components: {
            SortCell
        },

        props: {
            label: {
                type: String,
                default: 'Сортировать по'
            },

            value: {
                type: String,
                default: ''
            },

            options: {
                type: Array,
                default: () => []
            }
        },
    };
</script>

<style lang="scss" module>
    .SortPanel {
        display: flex;

        &:global(._active) {

            .label {
                opacity: 1;
            }
        }
    }

    .label {
        font-size: 16px;
        color: white;
        opacity: .6;
        transition: opacity .4s $easing;
    }

    .list {
        display: flex;
        margin-left: 50px;

        & > * {

            &:not(:first-child) {
                margin-left: 30px;
            }
        }
    }
</style>