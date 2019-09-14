<template>
    <svg :class="$style.SvgSprite">
        <defs>
            <icn-arrow/>
        </defs>
    </svg>
</template>

<script>
    import IcnArrow from './SpriteSet/IcnArrow';

    export default {
        name: 'SvgSprite',
        components: {
            IcnArrow,
        }
    };
</script>

<style lang="scss" module>
    .SvgSprite {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }
</style>
