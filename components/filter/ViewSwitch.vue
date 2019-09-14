<template>
    <div :class="$style.ViewSwitch">

        <div :class="$style.label">Вид</div>

        <svg :class="[$style.icn, {_active: value === 'cards'}]"
             viewBox="0 0 11 7"
             @click="clickSignal('cards')">
            <rect width="11" height="1"/>
            <rect y="3" width="11" height="1"/>
            <rect y="6" width="11" height="1"/>
        </svg>

        <svg :class="[$style.icn, {_active: value === 'rows'}]"
             viewBox="0 0 11 7"
             @click="clickSignal('rows')">
            <rect width="5" height="1"/>
            <rect y="3" width="5" height="1"/>
            <rect y="6" width="5" height="1"/>
            <rect x="6" y="3" width="5" height="1"/>
            <rect x="6" y="6" width="5" height="1"/>
            <rect x="6" width="5" height="1"/>
        </svg>
    </div>
</template>

<script>
    export default {
        name: 'ViewSwitch',

        props: {
            value: {
                type: String,
                default: 'cards'
            },

            name: {
                type: String,
                default: 'view'
            }
        },

        methods: {
            clickSignal(value) {
                if (this.value === value) return false;

                this.$emit('change', value);
            }
        },
    };
</script>

<style lang="scss" module>
    .ViewSwitch {
        display: flex;
        align-items: center;
    }

    .label {
        flex-shrink: 0;
        margin-right: 14px;
        font-size: 16px;
        color: white;
    }

    .icn {
        flex-shrink: 0;
        margin-left: 10px;
        height: 10px;
        fill: white;
        opacity: .5;
        transition: all .4s $easing;
        cursor: pointer;

        &:hover,
        &:global(._active) {
            opacity: 1;
        }
    }
</style>