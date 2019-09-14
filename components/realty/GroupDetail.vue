<template>
    <div :class="$style.GroupDetail">

        <div v-if="layout"
             :class="$style.top" class="container-px">
            <div :class="$style.info">

                <ui-close-button
                    :class="$style.close"
                    color="gold"
                    @click.native="$emit('close')">
                </ui-close-button>

                <div :class="$style.plan"
                     :style="planImage">
                </div>

                <div :class="$style.params">
                    <div
                        v-if="groupName"
                        :class="$style.groupName"
                        v-html="groupName">
                    </div>

                    <div v-if="flatName"
                         :class="$style.cell"
                         v-html="flatName">
                    </div>

                    <div v-if="area"
                         :class="$style.cell">
                        {{ area }} <span>м2</span>
                    </div>

                    <div :class="[$style.cell, $style.params]">
                        <div :class="$style.cellHalf">{{ layout.min_section_number }} <span>секция</span></div>
                        <div :class="$style.cellHalf">{{ floor }} <span>этаж</span></div>
                    </div>

                    <div :class="$style.cell">
                        <template><span>от </span> {{ layout.min_price|splitThousands }}</template>
                        <!--                        <template><span>до </span> {{ layout.max_price|splitThousands }}</template>-->
                        <span> руб</span>
                    </div>

                </div>

            </div>
        </div>

        <div ref="list"
             :class="$style.results">

            <flat-row
                v-for="flat in flats"
                :key="flat.id"
                :pk="flat.id"
                :is-booked="flat.is_booked"
                :plan="flat.plan"
                :area="flat.area"
                :rooms="flat.rooms"
                :section="flat.section_number"
                :floor="flat.floor_number"
                :price-actual="flat.origin_price"
                :price-old="flat.price"
                :has-discount="flat.has_discount"
                :discount="flat.discount_value"
                :in-favourite="flat.in_favorite">
            </flat-row>
        </div>

    </div>
</template>

<script>
    import {getElementOffset, getMinMaxLabel} from '../../assets/js/utils';
    import FlatRow from './FlatRow';

    export default {
        name: 'GroupDetail',
        components: {FlatRow},
        props: {
            slug: {
                type: [String, Number],
                default: null
            },

            values: {
                type: Object,
                default: () => ({})
            },
        },

        data() {
            return {
                layout: null,
                options: {},
                flats: [],
                stepLength: 10,
                offset: 0,
                loading: false,
                scroll: {
                    raf: undefined,
                    y: 0
                }
            };
        },

        computed: {
            area() {
                if (!this.layout) return null;

                let mn = Math.round(this.layout.min_area);
                let mx = Math.round(this.layout.max_area);

                return getMinMaxLabel(mn, mx);
            },

            floor() {
                if (!this.layout) return null;

                let mn = Math.round(this.layout.min_floor);
                let mx = Math.round(this.layout.max_floor);

                return getMinMaxLabel(mn, mx);
            },

            groupName() {
                if (!this.layout) return null;

                return this.layout.name ? `Тип ${this.layout.name}` : null;
            },

            flatName() {
                if (!this.layout) return null;

                let name = '';

                if (this.layout.rooms === 0) name += 'Студия';
                if (this.layout.rooms === 1) name += 'Однокомнатная квартира';
                if (this.layout.rooms === 2) name += 'Двухкомнатная квартира';
                if (this.layout.rooms === 3) name += 'Трехкомнатная квартира';
                if (this.layout.rooms === 4) name += 'Четрыехкомнатная квартира';

                return name;
            },

            planImage() {
                if (!this.layout) return null;

                return this.layout.plan
                    ? {backgroundImage: `url(${this.layout.plan})`}
                    : {backgroundImage: 'url(/assets/empty_plan.svg)'};
            }
        },

        async created() {
            await this.getLayout();
            await this.getFlats();
        },

        mounted() {
            this.checkScroll();
        },

        beforeDestroy() {
            this.clearScrollObserver();
        },

        methods: {
            async getLayout() {
                this.options = Object.assign({}, this.values);

                delete this.options.type;
                delete this.options.group;

                this.layout = await this.$axios.$get(this.$api.layouts.detail(this.slug), {params: {...this.options}});
            },

            async getFlats(loadMore) {
                if (this.loading) return false;
                this.loading = true;

                let options = {...this.options, ...{type: this.slug}};

                if (this.offset)
                    options.offset = this.offset;

                options.layout = this.slug;

                let data = await this.$axios.$get(this.$api.flats.list, {params: {...options}});

                this.flats = !loadMore ? data.results.slice() : this.flats.concat(data.results);
                this.offset = data.next ? this.offset + this.stepLength : 0;

                this.loading = false;
            },

            clearScrollObserver() {
                cancelAnimationFrame(this.scroll.raf);
                this.scroll.raf = undefined;
            },

            checkScroll() {
                this.scroll.raf = requestAnimationFrame(this.checkScroll);

                console.log('checking');

                let ws = window.scrollY;
                let wh = window.innerHeight;

                if (this.offset && ws !== this.scroll.y) {
                    this.scroll.y = ws;
                    let height = document.body.offsetHeight;

                    if (ws + wh > height - wh * .75) this.getFlats(true);
                }
            }
        }
    };
</script>

<style lang="scss" module>
    .GroupDetail {
        display: block;
        width: 100%;
    }

    .info {
        position: relative;
        display: flex;
        align-items: center;
        padding: $col-px;
        border: 1px solid rgba($c-gold, 4);
        color: $c-gold;
    }

    .close {
        position: absolute;
        top: 14px;
        right: 14px;
        opacity: .6;
        transition: opacity .1s $easing;

        &:hover {
            opacity: 1;
        }

        :global {

            .icn {
                width: 44px;
                height: 44px;

                &:before,
                &:after {
                    width: 16px;
                }
            }
        }
    }

    .plan {
        display: block;
        flex-shrink: 0;
        width: $col-px * 4;
        min-height: 160px;
        margin-right: $col-px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .params {
        display: flex;
        flex-wrap: wrap;
    }

    .groupName {
        width: 100%;
        font-size: 12px;
    }

    .cell {
        width: $col-px * 6;
        padding: 22px 0;
        font-size: 24px;

        span {
            font-size: 14px;
        }
    }

    .cellHalf {
        display: inline-block;
        width: 50%;
    }

    .results {
        margin-top: 30px;
    }
</style>