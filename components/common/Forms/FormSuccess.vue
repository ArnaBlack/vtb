<template>
    <div :class="[$style.FormSuccess,{_visible: visible}]">
        <div :class="$style.icn"></div>
        <div v-if="text" :class="$style.text" v-html="text"></div>
        <div v-if="additionalText" :class="$style.additional" v-html="additionalText"></div>
    </div>
</template>

<script>
    export default {
        name: 'FormSuccess',

        props: {
            text: {
                type: String,
                default: 'Ваша заявка принята'
            },

            additionalText: {
                type: String,
                default: 'Наш менеджер вскоре свяжется с вами'
            },

            visible: {
                type: Boolean,
                default: false
            }
        },
    };
</script>

<style lang="scss" module>
    .FormSuccess {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: $col-px;
        visibility: hidden;
        transition: visibility 0s;

        &:global(._visible) {
            visibility: visible;

            .icn,
            .text,
            .additional {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
    }

    .icn {
        position: relative;
        display: block;
        flex-shrink: 0;
        width: 60px;
        height: 60px;
        border: 1px solid $c-gold;
        transform: translate3d(0, 14px, 0);
        opacity: 0;
        transition: all .4s $easing .4s;

        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            width: 24px;
            height: 12px;
            border-bottom: 1px solid $c-gold;
            border-left: 1px solid $c-gold;
            transform: translate3d(-50%, -75%, 0) rotate(-45deg);
        }
    }

    .text,
    .additional {
        text-align: center;
        font-weight: 300;
        line-height: 1.6;
        color: $c-gold;
        transform: translate3d(0, 14px, 0);
        opacity: 0;
        transition: all .4s $easing .6s;
    }

    .text {
        margin-top: 24px;
        font-size: 24px;
    }

    .additional {
        margin-top: 4px;
        font-size: 16px;
    }
</style>