<template>
    <div :class="$style.Calculator">
        <h2 :class="$style.title">Калькулятор</h2>

        <div :class="$style.body">
            <div :class="$style.wrap">
                <calculator-field v-if="!hiddenPrice"
                                 :class="$style.filter"
                                 name="Стоимость квартиры"
                                 suffix="руб">
                    <div :class="$style.value">
                        {{ price|splitThousands }}
                    </div>
                    <div :class="$style.filter"
                         class="range-filter">
                        <no-ssr>
                            <vue-slider :value="price"
                                        :min="specs.price.min"
                                        :max="specs.price.max"
                                        :interval="1"
                                        :height="1"
                                        :dot-size="24"
                                        :clickable="false"
                                        tooltip="none"
                                        @dragging="$emit('update:price', $event)"
                                        @drag-end="emitChange">
                            </vue-slider>
                        </no-ssr>
                    </div>
                </calculator-field>

                <calculator-field :class="$style.filter"
                                 name="Первоначальный взнос"
                                 suffix="руб">
                    <div :class="$style.value">
                        {{ depositPrice|splitThousands }}
                    </div>
                    <div :class="$style.filter"
                         class="range-filter">
                        <no-ssr>
                            <vue-slider :value="deposit"
                                        :min="specs.deposit.min"
                                        :max="specs.deposit.max"
                                        :interval="1"
                                        :height="1"
                                        :dot-size="24"
                                        :clickable="false"
                                        tooltip="none"
                                        @dragging="$emit('update:deposit', $event)"
                                        @drag-end="emitChange">
                            </vue-slider>
                        </no-ssr>
                    </div>
                </calculator-field>

                <calculator-field :class="$style.filter"
                                 name="Срок кредита"
                                 suffix="лет">
                    <div :class="$style.value">
                        {{ term }}
                    </div>
                    <div :class="$style.filter"
                         class="range-filter">
                        <no-ssr>
                            <vue-slider :value="term"
                                        :min="specs.term.min"
                                        :max="specs.term.max"
                                        :interval="1"
                                        :height="1"
                                        :dot-size="24"
                                        :clickable="false"
                                        tooltip="none"
                                        @dragging="$emit('update:term', $event)"
                                        @drag-end="emitChange">
                            </vue-slider>
                        </no-ssr>
                    </div>
                </calculator-field>
            </div>

            <slot v-if="$slots.callback" name="callback"></slot>
            <UiButton v-else
                      :class="$style.btn"
                      label="Оставить заявку"
                      @click.native="scrollToForm"/>
        </div>
    </div>
</template>

<script>
    import CalculatorField from './CalculatorField';
    import {scrollTo} from '../../../assets/js/utils';

    export default {
        components: {CalculatorField},

        props: {
            specs: {
                type: Object,
                default: () => ({})
            },
            price: {
                type: Number,
                required: true
            },
            deposit: {
                type: Number,
                required: true
            },
            term: {
                type: Number,
                required: true
            },
            hiddenPrice: {
                type: Boolean,
                default: false,
            }
        },

        computed: {
            depositPrice() {
                return Math.floor(this.price * (this.deposit / 100));
            }
        },

        methods: {
            emitChange() {
                this.$emit('change');
            },

            scrollToForm() {
                scrollTo('mortgage-form');
            }
        }
    };
</script>

<style lang="scss" module>
    .Calculator {
        width: 100%;
    }

    .title {
        margin-bottom: 16px;
        color: #424263;
        font-size: 12px;
    }

    .btn {
        width: 100%;
        margin-top: 56px;
        cursor: pointer;
    }

    .body {
        padding: 48px 64px;
        border: 1px solid rgba(255, 255, 255, .1);
    }

    .filter {
        margin-bottom: 40px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .value {
        font-size: 18px;
        color: #fff;
    }
</style>
