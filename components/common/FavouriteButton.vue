<template>
    <button :class="$style.FavouriteButton"
            @click.prevent="toggleFavourites(pk)">
        <svg :class="[$style.icn, {_favourite: inFavourite}, {'_not-favourite': !inFavourite}]" viewBox="0 0 50 50">
            <use xlink:href="#icn-favourite"></use>
        </svg>

        <span v-if="!sm" :class="$style.label" v-html="labelText"></span>
    </button>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex';
    const {mapState, mapActions} = createNamespacedHelpers('favourite');

    export default {
        name: 'FavouriteButton',

        props: {
            pk: {
                type: Number,
                default: 0
            },

            sm: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            ...mapState(['favouriteList']),

            inFavourite() {
                return this.favouriteList.includes(this.pk);
            },

            labelText() {
                return this.inFavourite
                    ? 'В избранном'
                    : 'В избранное';
            }
        },

        methods: {
            ...mapActions(['toggleFavourites'])
        },
    };
</script>

<style lang="scss" module>
    .FavouriteButton {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;

        &:hover {

            .icn {
                transform: translate3d(0, 0, 0) scale(1.1);
            }
        }
    }

    .icn {
        display: block;
        width: 20px;
        transform: translate3d(0, 0, 0);
        transition: all .4s $easing;

        &:global {

            &._favourite {
                fill: $c-gold;
            }

            &._not-favourite {
                fill: white;
            }
        }
    }

    .label {
        display: block;
        margin-left: 14px;
        font-size: 14px;
        color: white;
    }
</style>
