<template>

    <div :class="['select-filter', {'_opened' : opened}]">
        <multiselect
            v-model="selectValue"
            :allow-empty="allowEmpty"
            :options="optionList"
            :searchable="false"
            :show-labels="false"
            :show-pointer="false"
            :hide-selected="false"
            :multiple="false"
            :close-on-select="true"
            :placeholder="placeholder"
            label="label"
            track-by="value"
            @input="changeSignal"
            @open="opened = !opened"
            @close="opened = !opened"
        />

        <div class="select-filter__arrow">
            <svg viewBox="0 0 18 60"
                 class="select-filter__arrow-el">
                <use xlink:href="#icn-narrow-arrow"></use>
            </svg>
        </div>

        <select v-if="isMobile"
                class="select-filter__select"
                @change="$emit('change', {[name]: [$event.target.value]})">
            <option v-if="allowEmpty" value>{{ placeholder }}</option>

            <option v-for="option in optionList"
                    :key="option.value"
                    :value="option.value"
                    :disabled="allowFacets && !facet.includes(option.value)"
                    :selected="value.includes(option.value)"
                    v-html="option.label">
            </option>
        </select>
    </div>

</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        name: 'SingleSelectFilter',

        components: {
            Multiselect,
        },

        props: {
            spec: {
                type: Array,
                default: () => [],
            },
            facet: {
                type: Array,
                default: () => [],
            },
            value: {
                type: Array,
                default: () => [],
            },
            placeholder: {
                type: String,
                default: 'Выберите'
            },
            name: {
                type: String,
                required: true
            },
            allowEmpty: {
                type: Boolean,
                default: true
            },
            emptyLabel: {
                type: String,
                default: 'Любой'
            },
            allowFacets: {
                type: Boolean,
                default: false,
            },
            reverse: {
                type: Boolean,
                default: false
            },
        },

        data() {
            return {
                selectValue: [],
                opened: false
            };
        },

        computed: {
            optionList() {
                let options = this.spec.slice();

                if (this.allowFacets && this.facet) {
                    options.forEach(option => {
                        if (this.facet.includes(option.value)) {
                            option.$isDisabled = false;
                        } else {
                            option.$isDisabled = true;
                        }
                    });
                }

                if (this.reverse) options.reverse();

                if (this.allowEmpty && this.selectValue.length)
                    options.unshift({value: null, label: this.emptyLabel});

                return options;
            },

            valueArray() {
                return this.selectValue ? [this.selectValue.value] : null;
            },

            initialValue() {
                return [].concat.apply([], this.spec.filter(opt => {
                    return this.value.includes(opt.value.toString()) || this.value.includes(opt.value);
                }));
            },

            isMobile() {
                return this.$mq === 'mob' || this.$mq === 'tabS';
            }
        },

        watch: {
            value() {
                this.selectValue = this.initialValue;
            }
        },

        methods: {
            changeSignal() {
                if (this.selectValue && !this.selectValue.value) this.selectValue = null;

                this.$emit('change', {[this.name]: this.valueArray});
            }
        },
    };
</script>
