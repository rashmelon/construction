<template>
    <div>
        <div v-if="can('create-follow-up')" class="vx-col w-full mb-base">
            <vx-card ref="create" title="Lead Data">

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <v-select v-model="form.status" label="Status" :options="statuses" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="text" name="notes" :danger="errors.has('notes')" val-icon-danger="clear" :danger-text="errors.first('notes')"
                                  class="w-full" icon-pack="feather" icon="icon-clipboard" label-placeholder="notes" v-model="form.notes" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="text" name="call_status" :danger="errors.has('call_status')" val-icon-danger="clear" :danger-text="errors.first('call_status')"
                                  class="w-full" icon-pack="feather" icon="icon-phone" label-placeholder="Call Status" v-model="form.call_status" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="date" name="date" :danger="errors.has('date')" val-icon-danger="clear" :danger-text="errors.first('date')"
                                  icon-pack="feather" icon="icon-date" label-placeholder="Date" v-model="form.date" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="time" name="time" :danger="errors.has('time')" val-icon-danger="clear" :danger-text="errors.first('time')"
                                  icon-pack="feather" icon="icon-date" label-placeholder="Time" v-model="form.time" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <label for="important">Is Important</label>
                        <input type="checkbox" name="important" id="important" v-model="form.important" />
                    </div>
                </div>

                <div class="vx-row" v-if="!customer">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <v-select v-model="form.customer_id" label="name" :options="customers" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                    </div>
                </div>

                <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <vs-button id="btn-create" @click="is_requesting?$store.dispatch('viewWaitMessage', $vs):create()" icon-pack="feather" icon="icon-save" type="gradient">Create Follow Up</vs-button>
                    </vs-col>
                </vs-row>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    export default {
        name: "add-lead",
        mounted() {
            if (!this.customer){
                this.getCustomers();
            }
            else{
                this.form['customer_id'] = this.customer;
            }
        },
        components: {
            'v-select': vSelect,
        },
        data: function () {
            return {
                customers: [],
                form: {
                    time : '',
                    date : '',
                    status : '',
                    notes : '',
                    call_status : '',
                    customer_id : '',
                    important : true
                },
                statuses: [
                    '',
                    'Delay lead',
                    'All lead',
                    'Fresh lead',
                    'Following today',
                    'Following',
                    'Meeting',
                    'Reschedule meeting',
                    'Following after meeting',
                    'Done Deal',
                    'Cancellation',
                    'Wrong No',
                    'Cancel after meeting',
                    'Hold',
                    'Done',
                ],
                uploadedImage: null,
                is_requesting: false
            }
        },
        props: {
            'customer': {
                required : false
            }
        },
        methods: {
            getCustomers(){
                this.$store.dispatch('customer/getData', '?sortDesc=created_at')
                    .then(response => {
                        this.is_requesting=false;
                        this.customers = response.data.data.data;
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

                this.form['customer_id'] = this.form['customer_id']['id'];

                this.$store.dispatch('followUp/create', this.form)
                    .then(response => {
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-create > .con-vs-loading`);
                        this.$router.push(`/dashboard/lead/${response.data.data.data.id}`);
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
