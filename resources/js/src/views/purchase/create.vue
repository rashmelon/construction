<template>
    <div>
        <div v-if="can('create-purchase')" class="vx-col w-full mb-base">
            <vx-card ref="create" title="Purchase Data">
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="date" name="end_date" :danger="errors.has('end_date')" val-icon-danger="clear" :danger-text="errors.first('end_date')"
                                  icon-pack="feather" icon="icon-date" label-placeholder="End Date" v-model="form.end_date" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="checkbox" name="finished" :danger="errors.has('finished')" val-icon-danger="clear" :danger-text="errors.first('finished')"
                                  icon-pack="feather" icon="icon-check" label-placeholder="Finished" v-model="form.finished" />
                    </div>
                </div>

                <div class="vx-row" v-if="!customer">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <v-select v-model="form.customer_id" label="name" :options="customers" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                    </div>
                </div>

                <div class="vx-row" v-if="!apartment">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <v-select v-model="form.apartment_id" label="number" :options="apartments" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                    </div>
                </div>


                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-row>
                            <vs-col vs-w="9">
                                <vs-input type="date" class="w-full" icon-pack="feather" icon="icon-date" v-model="installment.date" label-placeholder="Date"/>
                            </vs-col>
                            <vs-col vs-w="9">
                                <vs-input type="number" class="w-full" icon-pack="feather" icon="icon-date" v-model="installment.amount" label-placeholder="Amount"/>
                            </vs-col>
                            <vs-col vs-w="3">
                                <vs-button icon-pack="feather" icon="icon-plus" @click="addInstallment" class="w-full input-btn" type="gradient">Add</vs-button>
                            </vs-col>
                        </vs-row>
                        <br>
                        <vs-row>
                            <vs-col vs-w="12">
                                <vs-chip
                                    :key="index"
                                    @click="removeInstallment(installment)"
                                    v-for="(installment, index) in form.installments"
                                    closable>
                                    {{ installment.date }} - {{installment.amount}}
                                </vs-chip>
                            </vs-col>
                        </vs-row>
                    </div>
                </div>

                <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <vs-button id="btn-create" @click="is_requesting?$store.dispatch('viewWaitMessage', $vs):create()" icon-pack="feather" icon="icon-save" type="gradient">Create Purchase</vs-button>
                    </vs-col>
                </vs-row>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    export default {
        name: "add-purchase",
        mounted() {
          this.getDate();
        },
        components: {
            'v-select': vSelect,
        },
        data: function () {
            return {
                customers: [],
                apartments: [],
                form: {
                    finished: 0,
                    end_date: '',
                    customer_id: '',
                    apartment_id: '',
                    installments: [],
                },
                installment: {
                    date: '',
                    amount: ''
                },
                is_requesting: false
            }
        },
        props: {
            'customer': {
                required : false
            },
            'apartment': {
                required : false
            },
        },
        methods: {
            getDate(){
                this.$store.dispatch('purchase/getCreate', '')
                    .then(response => {
                        this.is_requesting=false;
                        this.customers = response.data.data.customers.data;
                        this.apartments = response.data.data.apartments.data;
                    })
                    .catch(error => {
                        console.log(error);
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-create > .con-vs-loading`);
                        this.$vs.notify({
                            title: 'Error',
                            text: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0],
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                    });
            },
            create() {
                this.is_requesting=true;
                this.$vs.loading({container: `#btn-create`, color: 'primary', scale: 0.45});

                this.form['apartment_id'] = this.form['apartment_id'].id;
                this.form['customer_id'] =   this.form['customer_id'].id;
                console.log(this.form.installments);

                this.$store.dispatch('purchase/create', this.form)
                    .then(response => {
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-create > .con-vs-loading`);
                        this.$router.push(`/dashboard/purchase/${response.data.data.data.id}`);
                        this.$vs.notify({
                            title: 'Success',
                            text: response.data.message,
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-create > .con-vs-loading`);
                        this.$vs.notify({
                            title: 'Error',
                            text: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0],
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                    });
            },

            removeInstallment (item) {
                this.form.installments.splice(this.form.installments.indexOf(item), 1)
            },

            addInstallment () {
                if (this.installment.amount !== '' && this.installment.date !== '') {
                    this.form.installments.push({
                        'amount': this.installment.amount,
                        'date': this.installment.date,
                    });
                    this.installment.date = '';
                    this.installment.amount = '';
                }
            }
        }
    }
</script>

<style>
    .image-preview {
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        padding-right: 20px;
        top: 6px;
        position: relative;
    }

    #img-upload {
        display: none;
    }

    img.preview {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        background-color: white;
        border: 1px solid #DDD;
        padding: 5px;
    }
</style>
