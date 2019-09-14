<template>
    <div :class="$style.Subscribe">

        <form :class="[$style.form, {_hidden: submitted}]"
              @submit.prevent="submitSignal">
            <div :class="$style.title">{{ title }}</div>

            <input v-model="category" name="category" type="text" hidden/>
            <div :class="$style.fields">

                <div :class="$style.field">
                    <ui-input
                        label="Ваш e-mail"
                        name="email"
                        required
                        :errors="errors.email">
                    </ui-input>
                </div>

            </div>

            <ui-button
                :class="$style.submit"
                type="submit"
                label="Подписаться">
            </ui-button>
        </form>

        <form-success
            :visible="submitted"
            text="Теперь вы точно ничего не&nbsp;пропустите">
        </form-success>

    </div>
</template>

<script>
    import FormSuccess from './FormSuccess';
    import FormMixin from '../../../mixins/FormMixin';

    export default {
        name: 'Subscribe',

        components: {FormSuccess},

        mixins: [FormMixin],

        props: {
            title: {
                type: String,
                default: ''
            },
            action: {
                type: String,
                default: '/api/subscriber/'
            },
            category: {
                type: String,
                default: 'post'
            }
        },

        methods: {
            cleanError(errorKey) {
                let errors = Object.assign({}, this.errors);
                delete errors[errorKey];

                this.errors = Object.assign({}, errors);
            }
        },
    };
</script>

<style lang="scss" module>
    .Subscribe {
        position: relative;
        display: block;
        width: 100%;
        padding: $col-px;
        border: 3px solid $c-gold;

        @include respond-to(tablet) {
            padding: $col;
        }
    }

    .form {
        width: 100%;
        opacity: 1;
        visibility: visible;
        transition: opacity .4s $easing, visibility 0s $easing .4s;

        &:global(._hidden) {
            opacity: 0;
            visibility: hidden;
        }
    }

    .title {
        font-size: 18px;
        font-weight: 300;
        color: $c-gold;
    }

    .fields {
        margin-top: 14px;

        @include respond-to(tablet) {
            margin-top: 1.4rem;
        }
    }

    .field {

        &:not(:first-child) {
            margin-top: 32px;

            @include respond-to(tablet) {
                margin-top: 3.2rem;
            }
        }
    }

    .submit {
        width: 100%;
        margin-top: 50px;

        @include respond-to(tablet) {
            margin-top: 5rem;
        }
    }
</style>
