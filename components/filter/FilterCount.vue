<template>
    <div :class="$style.FilterCount">
        <span>найдено</span> {{ currentCount }} <span>{{ count|plural(labelsPlurals) }}</span>
    </div>
</template>

<script>
    import TweenMax from 'gsap/umd/TweenMax';

    export default {
        name: 'FilterCount',

        props: {
            count: {
                type: Number,
                default: 0
            },

            labelsPlurals: {
                type: Array,
                default: () => (['объект', 'объекта', 'объектов'])
            }
        },

        data() {
            return {
                currentCount: 0
            };
        },

        watch: {
            count() {
                this.$nextTick(() => {
                    this.changeCount();
                });
            }
        },

        mounted() {
            this.changeCount();
        },

        methods: {
            changeCount() {
                let newVal = {number: this.currentCount};

                TweenMax.to(newVal, .4, {
                    number: this.count,
                    onUpdate: () => {
                        this.currentCount = Math.round(newVal.number);
                    }
                });
            }
        },
    };
</script>

<style lang="scss" module>
    .FilterCount {
        display: block;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: .5em;
        color: $c-gold;

        span {
            color: #424263;
        }
    }
</style>