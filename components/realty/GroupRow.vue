<template>
    <div id="groupDetail"
         :class="$style.GroupRow">

        <div :class="$style.wrapper" class="container-px">

            <div :class="[$style.plan, {'_no-plan': !plan}]">
                <div :class="$style.planImage"
                     :style="planImage"></div>
            </div>

            <div :class="$style.area">{{ area }}<span> м2</span></div>

            <div :class="$style.info">
                <div :class="$style.groupName"
                     v-html="groupName">
                </div>

                <div :class="$style.name" v-html="flatName"></div>
            </div>

            <div :class="$style.params">
                <div v-if="section" :class="$style.param">{{ section }} <span>секция</span></div>
                <div v-if="floor" :class="$style.param">{{ floor }} <span>этаж</span></div>
            </div>

            <div :class="$style.price">
                <span>от </span>{{ minPrice|splitThousands }}<span> руб</span>
            </div>

            <div :class="$style.count">
                {{ count }}<span> {{ count|plural(['квартира', 'квартиры', 'квартир']) }}</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {getMinMaxLabel} from '../../assets/js/utils';

    export default {
        name: 'GroupRow',
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

            name: {
                type: String,
                default: ''
            },

            section: {
                type: [String, Number],
                default: null
            },

            minFloor: {
                type: Number,
                default: 0
            },

            maxFloor: {
                type: Number,
                default: 0
            },

            minArea: {
                type: Number,
                default: 0
            },

            maxArea: {
                type: Number,
                default: 0
            },

            minPrice: {
                type: Number,
                default: 0
            },

            count: {
                type: Number,
                default: 0
            }
        },

        computed: {
            area() {
                let mn = Math.round(this.minArea);
                let mx = Math.round(this.maxArea);

                return getMinMaxLabel(mn, mx);
            },

            floor() {
                let mn = Math.round(this.minFloor);
                let mx = Math.round(this.maxFloor);

                return getMinMaxLabel(mn, mx);
            },

            groupName() {
                return this.name ? `Тип ${this.name}` : null;
            },

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
            }
        }
    };
</script>

<style lang="scss" module>
    .GroupRow {
        position: relative;
        display: block;
        width: 100%;
        min-height: 190px;
        color: white;
        cursor: pointer;

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

            .count {
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
    }

    .planImage {
        width: calc(100% - 40px);
        min-height: 100px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .area {
        width: $col-px * 5;
        font-weight: 300;
        font-size: 64px;

        span {
            font-size: 14px;
        }
    }

    .info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: $col-px * 5;
    }

    .groupName {
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
        font-size: 16px;

        span {
            font-size: 12px;
        }
    }

    .count {
        margin-left: auto;
        font-size: 16px;
        color: $c-gold;
        opacity: 0;
        transition: all .4s $easing;

        span {
            font-size: 12px;
        }
    }
</style>