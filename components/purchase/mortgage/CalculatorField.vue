<template>
    <div :class="$style.CalculatorField">
        <div :class="$style.name">
            {{ name }}
            <span v-if="suffix">{{ suffix }}</span>
        </div>

        <div :class="$style.body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            suffix: String
        }
    };
</script>

<style lang="scss" module>
    .CalculatorField {
        //
    }

    .name {
        display: flex;
        margin-bottom: 16px;
        font-size: 14px;
        color: #5f697c;

        & > span {
            margin-left: 12px;
            color: rgba(255, 255, 255, .2);
        }
    }
</style>
