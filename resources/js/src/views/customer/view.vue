<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('view-customer')">
            <vx-card ref="view" title="customer Data" collapseAction>
                <vs-row v-if="customer">
                    <vs-row class="mb-2">
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="email">Email: </label><span id="email">{{customer.email}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="name">Name: </label><span id="name">{{customer.name}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="phone">Phone: </label><span id="phone">{{customer.phone}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="reference">Reference: </label><span id="reference">{{customer.reference}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="birth_date">Birth Date: </label><span id="birth_date">{{customer.birth_date}}</span>
                        </vs-col>
                    </vs-row>
                </vs-row>
            </vx-card>
            <follow-up :filter="`?customer=${$route.params.id}`" :customer="$route.params.id"/>
            <purchase :filter="`?customer=${$route.params.id}`" :customer="$route.params.id"/>
        </div>
    </div>
</template>

<script>
    import followUp from "../lead/browse";
    import purchase from "./../purchase/browse";
    export default {
        name: "viewData",
        mounted() {
            this.getCustomerData();
        },
        data: () => {
            return {
                customer: null,
                is_requesting: false,
            }
        },
        components: {
            'follow-up': followUp,
            'purchase': purchase
        },
        methods: {
            getCustomerData() {
                this.$vs.loading({container: this.$refs.view.$refs.content, scale: 0.5});
                this.$store.dispatch('customer/view', this.$route.params.id)
                    .then(response => {
                        this.customer = response.data.data.data;
                        this.$vs.loading.close(this.$refs.view.$refs.content);
                    })
                    .catch(error => {
                        console.log(error);
                        this.$vs.loading.close(this.$refs.view.$refs.content);
                        this.$vs.notify({
                            title: 'Error',
                            text: error.response.data.error,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                    });
            },
        }
    }
</script>

<style>
    .txt-hover:hover{
        cursor: pointer;
        color: black !important;
    }
</style>
