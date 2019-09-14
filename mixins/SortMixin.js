const SortMixin = {

    data() {
        return {
            ordering: ''
        };
    },

    methods: {
        onSortClick(value) {
            let newSort;

            if (!this.ordering) {
                newSort = value;
            } else {
                if (this.ordering === value) {
                    newSort = `-${value}`;
                } else if (this.ordering === `-${value}`) {
                    newSort = '';
                } else {
                    newSort = value;
                }
            }
            this.ordering = newSort;
        },
    }
};

export default SortMixin;
