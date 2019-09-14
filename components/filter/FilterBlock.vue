<template>
    <div :class="[$style.FilterBlock, {_opened: opened}]">

        <!-- ROOMS FILTER -->
        <filter-cell
            :class="$style.cell"
            :values="values"
            label="Колличество комнат"
            name="rooms">
            <button-filter
                :spec="specs.rooms"
                :value="values.rooms"
                :facet="facets.rooms"
                allow-facets
                name="rooms"
                @change="val => $emit('change', val)">
            </button-filter>
        </filter-cell>

        <!-- PRICE FILTER -->
        <filter-cell
            :class="[$style.cell, $style.range]"
            :values="values"
            suffix="руб"
            label="Стоимость"
            name="price">

            <range-filter
                :spec="specs.price"
                :facet="facets.price"
                :min-value="values.price_min"
                :max-value="values.price_max"
                :allow-facets="true"
                name="price"
                @change="val => $emit('change', val)">
            </range-filter>
        </filter-cell>

        <!-- AREA FILTER -->
        <filter-cell
            :class="[$style.cell, $style.range]"
            :values="values"
            suffix="м2"
            label="Площадь"
            name="area">

            <range-filter
                :spec="specs.area"
                :facet="facets.area"
                :min-value="values.area_min"
                :max-value="values.area_max"
                :allow-facets="true"
                name="area"
                @change="val => $emit('change', val)">
            </range-filter>
        </filter-cell>

        <!-- FLOOR FILTER -->
        <filter-cell
            :class="[$style.cell, $style.range]"
            :values="values"
            label="Этаж"
            name="floor">

            <range-filter
                :spec="specs.floor"
                :facet="facets.floor"
                :min-value="values.floor_min"
                :max-value="values.floor_max"
                :allow-facets="true"
                name="floor"
                @change="val => $emit('change', val)">
            </range-filter>
        </filter-cell>

        <!-- BUILDING FILTER -->
        <div v-if="specs.building.length > 1"
             :class="$style.smallCell">
            <single-select-filter
                :spec="specs.building"
                :facet="facets.building"
                :value="values.building"
                :allow-empty="true"
                :allow-facets="true"
                name="building"
                placeholder="Корпус"
                empty-label="Любой"
                @change="val => $emit('change', val)">
            </single-select-filter>
        </div>

        <!-- COMPLETION FILTER -->
        <div v-if="specs.completion.length > 1"
             :class="$style.cell">
            <single-select-filter
                :spec="specs.completion"
                :facet="facets.completion"
                :value="values.completion"
                :allow-empty="true"
                :allow-facets="true"
                name="completion"
                empty-label="Любая"
                @change="val => $emit('change', val)">
            </single-select-filter>
        </div>

        <!-- DISCOUNT FILTER -->
        <div :class="[$style.cell, $style.button]">
            <true-false-filter
                :facet="facets.discount"
                :value="values.discount"
                name="discount"
                label="Скидка"
                @change="val => $emit('change', val)">
            </true-false-filter>
        </div>

         <!-- SPECIAL OFFER FILTER -->
        <div :class="[$style.cell, $style.button]">
            <true-false-filter
                :facet="facets.special_offer"
                :value="values.special_offer"
                name="special_offer"
                label="Спецпредложение"
                @change="val => $emit('change', val)">
            </true-false-filter>
        </div>

        <!-- FACING FILTER -->
        <div :class="[$style.cell, $style.button]">
            <true-false-filter
                :facet="facets.facing"
                :value="values.facing"
                name="facing"
                label="Отделка"
                @change="val => $emit('change', val)">
            </true-false-filter>
        </div>
    </div>
</template>

<script>
    import ButtonFilter from '../ui/Filters/ButtonFilter';
    import FilterCell from './FilterCell';
    import RangeFilter from '../ui/Filters/RangeFilter';
    import SingleSelectFilter from '../ui/Filters/SingleSelectFilter';
    import TrueFalseFilter from '../ui/Filters/TrueFalseFilter';

    export default {
        name: 'FilterBlock',
        components: {
            TrueFalseFilter,
            SingleSelectFilter,
            RangeFilter,
            FilterCell,
            ButtonFilter
        },
        props: {
            values: {
                type: Object,
                default: () => ({})
            },

            facets: {
                type: Object,
                default: () => ({})
            },

            specs: {
                type: Object,
                default: () => ({})
            },

            opened: {
                type: Boolean,
                default: false
            }
        },
    };
</script>

<style lang="scss" module>
    .FilterBlock {
        display: flex;
        flex-wrap: wrap;
        margin: -25px #{-$col-px / 2};
        max-height: 122px;
        overflow: hidden;
        transition: all .4s $easing;

        @include respond-to(tablet) {
            margin: -2.5rem #{-$col / 2};
        }

        &:global(._opened) {
            max-height: 244px;
        }

        :global {

            .select-filter,
            .multiselect__content-wrapper {
                background-color: $c-blue-d;
            }
        }
    }

    .cell {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 25%;
        padding: 25px $col-px / 2;

        @include respond-to(tablet) {
            width: 33.333%;
            padding: 2.5rem $col / 2;
        }
    }

    .button {
        width: auto;
    }

    .smallCell {
        width: $col-px * 4;
        padding: 25px $col-px / 2;
    }
</style>