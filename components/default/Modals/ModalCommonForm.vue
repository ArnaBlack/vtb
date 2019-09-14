<template>
    <div :class="$style.ModalCommonForm"
         class="modal-form">

        <div :class="[$style.wrapper, {_hidden: submitted}]" class="modal-form__wrapper">
            <div class="modal-form__name" v-html="title"></div>

            <form class="modal-form__form"
                  @submit.prevent="submitSignal">

                <input
                    v-for="(input, index) in input_set"
                    :key="index"
                    type="text"
                    :name="input.name"
                    :value="input.value"
                    hidden>

                <div class="modal-form__fields">
                    <div class="modal-form__cell">
                        <ui-input label="Имя"
                                  name="name"
                                  color="gold"
                                  required
                                  :errors="errors.name">
                        </ui-input>
                    </div>

                    <div class="modal-form__cell">
                        <ui-phone-input
                            label="Телефон"
                            name="phone"
                            color="gold"
                            required
                            :errors="errors.phone">
                        </ui-phone-input>
                    </div>
                </div>

                <div class="modal-form__policy">
                    <ui-check-box
                        v-if="policy"
                        label="Нажимая «Отправить» вы даёте свое согласие на обработку ваших персональных данных"
                        name="terms"
                        required>
                    </ui-check-box>
                </div>

                <div class="modal-form__submit">
                    <ui-button
                        type="submit"
                        :label="button">
                    </ui-button>
                </div>
            </form>
        </div>

        <form-success
            text="Ваша заявка принята"
            additional-text="Наш менеджер вскоре свяжется с вами"
            :visible="submitted">
        </form-success>
    </div>
</template>

<script>
    import FormMixin from '../../../mixins/FormMixin';
    import FormSuccess from '../../common/Forms/FormSuccess';

    export default {
        name: 'ModalCommonForm',

        components: {
            FormSuccess
        },

        mixins: [FormMixin],

        props: {
            props: {
                type: Object,
                default: () => ({})
            },
        },

        computed: {
            action() {
                return this.props.action ? this.props.action : this.$api.request;
            },

            input_set() {
                return this.props.input_set ? this.props.input_set : [{name: 'request_type', value: 'callback'}];
            },

            title() {
                return this.props.title ? this.props.title : 'Заказать звонок';
            },

            button() {
                return this.props.button ? this.props.button : 'Отправить';
            },

            policy() {
                return this.props.policy ? this.props.policy : true;
            }
        },

        methods: {
            onSuccess() {
                setTimeout(() => {
                    this.$modal.close();
                }, 2000);
            }
        },
    };
</script>

<style lang="scss" module>
    .ModalCommonForm {
        display: block;
    }

    .wrapper {
        transition: all .4s $easing;

        &:global(._hidden) {
            opacity: 0;
        }
    }
</style>