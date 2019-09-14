<template>
    <div :class="$style.body">
        <button-filter-option
            v-for="option in spec"
            :key="option.value"
            :class="$style.option"
            :label="option.label"
            :name="option.value"
            :allow-facets="allowFacets"
            :facet="facet"
            :value="value"
            @click.native="onButtonClick(option.value.toString())">
        </button-filter-option>
    </div>
</template>


<script>
    import ButtonFilterOption from './ButtonFilterOption';

    export default {
        components: {ButtonFilterOption},
        props: {
            spec: {
                type: Array,
                default: () => [],
            },
            value: {
                type: [String, Number],
                default: null,
            },
            facet: {
                type: Array,
                required: false,
            },
            name: {
                type: String,
                required: true
            },
            allowFacets: {
                type: Boolean,
                default: false
            },
        },

        methods: {
            onButtonClick(value) {
                let newValue = [];

                if (!this.value) {
                    newValue = value.toString();
                } else {
                    newValue = this.value.split(',');
                    let index = newValue.indexOf(value);

                    (index > -1) ? newValue.splice(index, 1) : newValue.push(value);

                    if (newValue.length === this.spec.length || !newValue.length) {
                        newValue = null;
                    } else {
                        newValue = newValue.join(',');
                    }
                }

                this.$emit('change', {[this.name]: newValue});
            }
        }
    };
</script>

<style lang="scss" module>
    .body {
        display: flex;
    }

    .option {
        flex-shrink: 0;

        &:not(:first-child) {
            margin-left: 12px;
        }
    }
</style>
