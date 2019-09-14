<template>
    <button :class="[$style.FilterReset]">
        <div :class="$style.icn"></div>
        <div :class="$style.label" v-html="label"></div>
    </button>
</template>

<script>
    export default {
        name: 'FilterReset',
        props: {
            label: {
                type: String,
                default: 'Сбросить фильтр'
            }
        },
    };
</script>

<style lang="scss" module>
    .FilterReset {
        display: inline-flex;
        align-items: center;
        background-color: transparent;
        padding: 0;
        border: none;
        outline: none;
        opacity: .2;
        transform: translate3d(0, 0, 0);
        transition: all .1s $easing;
        cursor: pointer;

        &:hover {
            opacity: 1;

            .icn {

                &:before {
                    transform: translate3d(-50%, -50%, 0) rotate(-35deg);
                }

                &:after {
                    transform: translate3d(-50%, -50%, 0) rotate(55deg);
                }
            }
        }
    }

    .icn {
        position: relative;
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid white;

        &:before,
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 12px;
            height: 1px;
            background-color: white;
            transition: all .4s $easing;
        }

        &:before {
            transform: translate3d(-50%, -50%, 0) rotate(-45deg);
        }

        &:after {
            transform: translate3d(-50%, -50%, 0) rotate(45deg);
        }
    }

    .label {
        margin-left: 20px;
        font-size: 16px;
        line-height: .8;
        color: white;
    }
</style>