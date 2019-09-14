<template>
    <div :class="$style.CommonCallbackForm">
        <form :class="[$style.form, {_hidden: submitted}]"
              @submit.prevent="submitSignal">

            <h2 :class="$style.label">Записаться на просмотр</h2>

            <input type="text" name="request_type" value="callback" hidden/>

            <div :class="$style.fields" class="fields">
                <ui-input label="Имя"
                          name="name"
                          color="gold"
                          required
                          :errors="errors.name">
                </ui-input>

                <ui-phone-input
                    label="Телефон"
                    name="phone"
                    color="gold"
                    required
                    :errors="errors.phone">
                </ui-phone-input>
            </div>

            <div :class="$style.disclaimer">
                <ui-check-box
                    label="Согласен на обработку персональных данных"
                    name="terms"
                    required>
                </ui-check-box>
            </div>

            <ui-button
                :class="$style.submit"
                type="submit"
                label="Оставить заявку">
            </ui-button>
        </form>

        <form-success
            text="Ваша заявка принята"
            additional-text="Наш менеджер вскоре свяжется с вами"
            :visible="submitted">
        </form-success>
    </div>
</template>

<script>
    import FormSuccess from './FormSuccess';
    import FormMixin from '../../../mixins/FormMixin';

    export default {
        name: 'CommonCallbackForm',

        components: {
            FormSuccess
        },

        mixins: [FormMixin],

        data() {
            return {
                action: this.$api.request,
            };
        }
    };
</script>

<style lang="scss" module>
    .CommonCallbackForm {
        position: relative;
        display: block;
        border: 3px solid $c-gold;
        padding: $col-px;
    }

    .form {
        display: block;
        width: 100%;
        opacity: 1;
        visibility: visible;
        transition: opacity .4s $easing, visibility 0s $easing .4s;

        &:global(._hidden) {
            opacity: 0;
            visibility: hidden;
        }
    }

    .label {
        margin-bottom: 56px;
        font-size: 12px;
        color: $c-gold;
    }

    .fields {
        display: flex;
        margin-bottom: 60px;
    }

    .submit {
        margin-top: 60px;
    }
</style>