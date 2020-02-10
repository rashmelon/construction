<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('view-purchase')">
            <vx-card ref="view" title="Apartment Data" collapseAction>
                <vs-row v-if="purchase">
                    <vs-row class="mb-2">
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="customer-name">Customer name: </label><span id="customer-name" v-if="purchase.customer.name">{{purchase.customer.name}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="apartment">Apartment: </label><span id="apartment">{{purchase.apartment.project.name}} apartment number {{purchase.apartment.number}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="end-date">End Date: </label><span id="end-date">{{purchase.end_date}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="finished">Finished: </label><span id="finished">{{purchase.finished? "yes":"no"}}</span>
                        </vs-col>
                    </vs-row>
                </vs-row>
            </vx-card>

            <vx-card ref="view" title="Installment Data" collapseAction>
                <vs-table v-if="installments" :data="installments" >
                    <template slot="thead">
                        <vs-th sort-key="id">ID</vs-th>
                        <vs-th sort-key="display_name">Amount</vs-th>
                        <vs-th sort-key="display_name">Date</vs-th>
                        <vs-th sort-key="display_name">Paid At</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="index" v-for="(installment, index) in data">
                            <vs-td :data="installment.id">
                                {{ index+1 }}
                            </vs-td>
                            <vs-td :data="installment.amount">
                                {{ installment.amount }}
                            </vs-td>
                            <vs-td :data="installment.date">
                                {{ installment.date }}
                            </vs-td>
                            <vs-td :data="installment.paid_at">
                                {{ installment.paid_at }}
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>

        </div>
    </div>
</template>

<script>
    export default {
        name: "viewData",
        mounted() {
            this.getPurchaseData();
        },
        data: () => {
            return {
                purchase: null,
                installments: [],
                is_requesting: false,
            }
        },
        methods: {
            getPurchaseData() {
                this.$vs.loading({container: this.$refs.view.$refs.content, scale: 0.5});
                this.$store.dispatch('purchase/view', this.$route.params.id)
                    .then(response => {
                        this.purchase = response.data.data.data;
                        this.installments = response.data.data.data.installments;
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
