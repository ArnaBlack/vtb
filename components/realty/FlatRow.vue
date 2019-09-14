<template>
    <nuxt-link :to="url"
               :class="$style.FlatRow">

        <div :class="$style.wrapper" class="container-px">

            <div v-if="isBooked"
                 :class="$style.booked">
                <svg viewBox="0 0 50 50" :class="$style.bookedIcn">
                    <use xlink:href="#icn-lock"></use>
                </svg>
                <div :class="$style.bookedLabel">Забронирована</div>
            </div>

            <div :class="[$style.plan, {'_is-booked': isBooked}, {'_no-plan': !plan}]">
                <div :class="$style.planImage"
                     :style="planImage"></div>
            </div>

            <div :class="$style.area">{{ area }} <span>м2</span></div>

            <div :class="$style.info">
                <div :class="$style.facing">
                    <template v-if="facing">С отделкой</template>
                    <template v-else>Без отделки</template>
                </div>

                <div :class="$style.name" v-html="flatName"></div>
            </div>

            <div :class="$style.params">
                <div v-if="section" :class="$style.param">{{ section }} <span>секция</span></div>
                <div v-if="floor" :class="$style.param">{{ floor }} <span>этаж</span></div>
            </div>

            <div :class="$style.price">
                <div v-if="discount && hasDiscount" :class="$style.priceOld">{{ priceOld|splitThousands }}</div>

                <div :class="$style.priceBottom">
                    <div :class="$style.priceActual">{{ priceActual|splitThousands }} <span>руб</span></div>
                    <div v-if="discount && hasDiscount" :class="$style.discount">-{{ discount }}%</div>
                </div>
            </div>

            <favourite-button
                :class="$style.favourite"
                :pk="pk"
                :in-favorite="inFavourite"
                sm
                @click.prevent>
            </favourite-button>
        </div>

    </nuxt-link>
</template>

<script>
    import FavouriteButton from '../common/FavouriteButton';

    export default {
        name: 'FlatRow',
        components: {FavouriteButton},
        props: {
            pk: {
                type: Number,
                default: 0
            },

            plan: {
                type: String,
                default: ''
            },

            rooms: {
                type: Number,
                default: 0
            },

            number: {
                type: [Number, String],
                default: null
            },

            section: {
                type: [String, Number],
                default: null
            },

            floor: {
                type: Number,
                default: 0
            },

            area: {
                type: Number,
                default: 0
            },

            priceActual: {
                type: Number,
                default: 0
            },

            priceOld: {
                type: Number,
                default: 0
            },

            hasDiscount: {
                type: Boolean,
                default: false
            },

            discount: {
                type: Number,
                default: 0
            },

            facing: {
                type: Boolean,
                default: false
            },

            inFavourite: {
                type: Boolean,
                default: false
            },

            isBooked: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            flatName() {
                let name = '';

                if (this.rooms === 0) name += 'Студия';
                if (this.rooms === 1) name += 'Однокомнатная квартира';
                if (this.rooms === 2) name += 'Двухкомнатная квартира';
                if (this.rooms === 3) name += 'Трехкомнатная квартира';
                if (this.rooms === 4) name += 'Четрыехкомнатная квартира';

                if (this.number)
                    name += ` №${this.number}`;

                return name;
            },

            planImage() {
                return this.plan
                    ? {backgroundImage: `url(${this.plan})`}
                    : {backgroundImage: 'url(/assets/empty_plan.svg)'};
            },

            url() {
                return `/flats/${this.pk}`;
            }
        }
    };
</script>

<style lang="scss" module>
    .FlatRow {
        position: relative;
        display: block;
        width: 100%;
        min-height: 190px;
        color: white;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: $c-blue-d;
            opacity: 0;
            transform: translate3d(0, 0, 0);
            transition: all .4s $easing;
        }

        &:hover {

            &:before {
                opacity: 1;
            }

            .favourite {
                opacity: 1;
            }
        }
    }

    .wrapper {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        padding: 44px 0;

        & > * {
            flex-shrink: 0;
        }
    }

    .plan {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: $col-px * 3;
        min-height: 100px;

        &:global(._no-plan) {
            opacity: .5;
        }

        &:global(._is-booked) {
            opacity: .2;
        }
    }

    .planImage {
        width: calc(100% - 40px);
        min-height: 100px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .area {
        width: $col-px * 4;
        font-weight: 300;
        font-size: 64px;

        span {
            font-size: 14px;
            opacity: .5;
        }
    }

    .info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: $col-px * 5;
    }

    .facing {
        position: absolute;
        bottom: calc(100% + 4px);
        left: 0;
        font-size: 12px;
        opacity: .2;
    }

    .name {
        font-size: 16px;
    }

    .params {
        display: flex;
        width: $col-px * 3;
    }

    .param {
        font-size: 16px;

        span {
            font-size: 12px;
        }

        &:not(:first-child) {
            margin-left: 28px;
        }
    }

    .price {
        position: relative;
    }

    .priceBottom {
        display: flex;
        align-items: flex-end;
    }

    .priceOld {
        position: absolute;
        bottom: calc(100% + 4px);
        font-size: 12px;
        font-weight: 300;
        color: $c-grey;

        &:after {
            content: '';
            position: absolute;
            top: .5em;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: $c-grey;
        }

        span {
            font-size: 10px;
        }
    }

    .priceActual {
        font-size: 16px;

        span {
            font-size: 12px;
        }
    }

    .discount {
        margin-left: 10px;
        margin-bottom: -2px;
        font-size: 16px;
        color: $c-red;
    }

    .booked {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: $col-px * 3;
        height: 100%;
    }

    .bookedIcn {
        display: block;
        flex-shrink: 0;
        height: 14px;
        fill: white;
    }

    .bookedLabel {
        margin-top: 2px;
        text-align: center;
        font-size: 12px;
        color: white;
    }

    .favourite {
        margin-left: auto;
        margin-right: $col-px;
        opacity: 0;
        transition: all .4s $easing;
    }
</style>