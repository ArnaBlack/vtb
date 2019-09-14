<template>
    <div :class="[$style.SortCell, className]">

        <div :class="$style.label" v-html="label"></div>
        <div :class="$style.icn">
            <div :class="$style.line"></div>
            <div :class="$style.line"></div>
            <div :class="$style.line"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'SortCell',

        props: {
            label: {
                type: String,
                default: ''
            },

            name: {
                type: String,
                default: ''
            },

            value: {
                type: String,
                default: ''
            }
        },

        computed: {
            className() {
                let className = '';

                if (this.value.indexOf(this.name) > 0) className = 'desc';
                if (this.value.indexOf(this.name) === 0) className = 'asc';

                return className;
            }
        },
    };
</script>

<style lang="scss" module>
    .SortCell {
        display: flex;
        align-items: center;
        opacity: .6;
        transition: all .4s $easing;
        cursor: pointer;

        &:hover {
            opacity: .8;
        }

        &:global(.desc) {
            opacity: 1;
        }

        &:global(.asc) {
            opacity: 1;

            .line {

                &:nth-child(1) {
                    transform: translate3d(0, 0, 0) scaleY(.2);
                }

                &:nth-child(3) {
                    transform: translate3d(0, 0, 0) scaleY(1);
                }
            }
        }
    }

    .label {
        flex-shrink: 0;
        font-size: 16px;
        color: white;
    }

    .icn {
        display: flex;
        justify-content: space-between;
        flex-shrink: 0;
        width: 10px;
        height: 10px;
        margin-left: 8px;
    }

    .line {
        display: block;
        width: 2px;
        height: 10px;
        background-color: white;
        transform-origin: 0 100%;
        transition: all .4s $easing;

        &:nth-child(1) {
            transform: translate3d(0, 0, 0) scaleY(1);
        }

        &:nth-child(2) {
            transform: translate3d(0, 0, 0) scaleY(.6);
        }

        &:nth-child(3) {
            transform: translate3d(0, 0, 0) scaleY(.2);
        }
    }
</style>