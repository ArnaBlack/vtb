const FormMixin = {
    data() {
        return {
            submitted: false,
            errors: []
        };
    },

    methods: {
        onSuccess() {
            console.log('form submitted');
        },

        submitSignal(e) {
            if (this.submitted) return;

            let data = new FormData(e.target);

            this.$axios.$post(this.action, data)
                .then(result => {
                    this.submitted = true;
                    this.errors = [].slice();

                    this.onSuccess();
                })
                .catch(error => {
                    this.errors = Object.assign(error.response.data);
                });
        }
    }
};

export default FormMixin;
