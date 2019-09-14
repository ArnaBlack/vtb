<template>
    <button :class="[$style.FilterToggle, {_opened: opened}]">
        <div :class="$style.icn"></div>
        <div :class="$style.label" v-html="label"></div>
    </button>
</template>

<script>
    export default {
        name: 'FilterToggle',
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: 'Расширенный фильтр'
            },
        },
    };
</script>

<style lang="scss" module>
    .FilterToggle {
        display: inline-flex;
        align-items: center;
        background-color: transparent;
        padding: 0;
        border: none;
        outline: none;
        opacity: .8;
        transform: translate3d(0, 0, 0);
        transition: all .1s $easing;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }

        &:global(._opened) {

            .icn {

                &:after {
                    transform: translate3d(-50%, -50%, 0) rotate(180deg);
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
        transform: translate3d(0, 0, 0);

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
            transform: translate3d(-50%, -50%, 0);
        }

        &:after {
            transform: translate3d(-50%, -50%, 0) rotate(90deg);
        }
    }

    .label {
        margin-left: 20px;
        font-size: 16px;
        line-height: .8;
        color: white;
    }
</style>