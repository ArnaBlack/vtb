<template>
    <div :class="$style.RangeFilter" class="range-filter">
        <div :class="$style.values">
            <span v-html="lower"></span>
            <span v-html="upper"></span>
        </div>
        <no-ssr>
            <vue-slider v-model="sliderValue"
                        :class="$style.slider"
                        :min="spec.min"
                        :max="spec.max"
                        :interval="1"
                        :height="1"
                        :dot-size="$mq === 'tabS' ? 30 : 24"
                        :contained="true"
                        tooltip="none"
                        @drag="emitInput"
                        @drag-end="emitChange">
            </vue-slider>
        </no-ssr>
    </div>
</template>

<script>
    export default {
        name: 'RangeFilter',

        props: {
            spec: {
                type: Object,
                default: () => {
                    return {min: 1, max: 100};
                },
            },

            facet: {
                type: Object,
                default: () => {
                    return {};
                }
            },

            minValue: {
                type: String,
                default: null
            },

            maxValue: {
                type: String,
                default: null
            },

            name: {
                type: String,
                required: true,
            },

            allowFacets: {
                type: Boolean,
                default: false
            }
        },

        data: function () {
            return {
                sliderValue: [(this.minValue ? +this.minValue : this.spec.min), (this.maxValue ? +this.maxValue : this.spec.max)],
            };
        },

        computed: {
            lower() {
                return this.$options.filters.splitThousands(this.sliderValue[0]);
            },

            upper() {
                return this.$options.filters.splitThousands(this.sliderValue[1]);
            }
        },

        watch: {
            facet() {
                if (this.allowFacets) {
                    this.applyFacet();
                }
            }
        },

        created() {
            if (this.allowFacets) {
                this.applyFacet();
            }
        },

        methods: {
            applyFacet() {
                if ((this.facet.min && this.facet.max) && (!this.minValue && !this.maxValue)) {
                    this.sliderValue = [this.facet.min, this.facet.max];
                } else if ((this.facet.min && this.facet.max) && !this.minValue) {
                    this.sliderValue = [this.facet.min, this.maxValue];
                } else if ((this.facet.min && this.facet.max) && !this.maxValue) {
                    this.sliderValue = [this.minValue, this.facet.max];
                } else {
                    console.log(this.name);
                    console.log(this.facet.min);
                    console.log(this.facet.max);
                    console.warn('Something wrong with range facets');
                }
            },

            emitChange() {
                let minValue = this.sliderValue[0].toString();
                let maxValue = this.sliderValue[1].toString();

                if (minValue <= this.spec.min) minValue = null;
                if (maxValue >= this.spec.max) maxValue = null;

                this.$emit('change', {
                    [`${this.name}_min`]: minValue,
                    [`${this.name}_max`]: maxValue
                });
            },

            emitInput() {
                let minValue = this.sliderValue[0].toString();
                let maxValue = this.sliderValue[1].toString();

                if (minValue <= this.spec.min) minValue = null;
                if (maxValue >= this.spec.max) maxValue = null;

                this.$emit('change', {
                    [`${this.name}_min`]: minValue,
                    [`${this.name}_max`]: maxValue
                });
            },
        }
    };
</script>

<style lang="scss" module>
    .RangeFilter {
        width: 100%;
    }

    .values {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }
</style>
