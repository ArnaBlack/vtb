<template>
    <div :class="$style.Layout">
        <svg-sprite/>
        <site-modal></site-modal>

        <main :class="$style.Main">
            <nuxt/>
        </main>
    </div>
</template>

<script>
    import SvgSprite from '../components/default/SvgSprite';
    import SiteModal from '../components/default/SiteModal';

    export default {
        components: {
            SiteModal,
            SvgSprite
        }
    };
</script>

<style lang="scss" module>
    .Layout {
        display: block;
    }

    .Main {
        position: relative;
        z-index: 2;
    }
</style>
