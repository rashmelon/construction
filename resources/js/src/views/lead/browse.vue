<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('browse-follow-up')">
            <vx-card ref="lead" title="Lead List" collapse-action refreshContentAction @refresh="getFollowUpsData">
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <v-select v-model="status" label="Status" :options="statuses" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                    </div>
                    <vs-button @click="getFollowUpsData">Filter</vs-button>
                </div>
                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <label for="important">Important</label>
                        <input @change="getFollowUpsData" id="important" type="checkbox" name="important" v-model="important" />
                    </div>
                </div>
                <vs-table :data="followUps">
                    <template slot="header">
                        <vs-button size="small" to="/dashboard/lead/create" icon-pack="feather" icon="icon-plus" type="filled">Create Lead</vs-button>
                    </template>
                    <template slot="thead">
                        <vs-th sort-key="id">ID</vs-th>
                        <vs-th sort-key="display_name" v-if="!customer">Customer Name</vs-th>
                        <vs-th sort-key="display_name">Date</vs-th>
                        <vs-th sort-key="display_name">Time</vs-th>
                        <vs-th sort-key="display_name">Notes</vs-th>
                        <vs-th sort-key="display_name">Call Status</vs-th>
                        <vs-th sort-key="display_name">Status</vs-th>
                        <vs-th sort-key="display_name">Important</vs-th>
                        <vs-th>Action</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="index" v-for="(followUp, index) in data">
                            <vs-td :data="followUp.id">
                                {{ index+1 }}
                            </vs-td>

                            <vs-td :data="followUp.customer" v-if="!customer && followUp.customer">
                                {{ followUp.customer.name}}
                            </vs-td>

                            <vs-td :data="followUp.date">
                                {{ followUp.date}}
                            </vs-td>

                            <vs-td :data="followUp.time">
                                {{ followUp.time}}
                            </vs-td>

                            <vs-td :data="followUp.notes">
                                {{ followUp.notes}}
                            </vs-td>

                            <vs-td :data="followUp.call_status">
                                {{ followUp.call_status}}
                            </vs-td>

                            <vs-td :data="followUp.status">
                                {{ followUp.status}}
                            </vs-td>

                            <vs-td :data="followUp.important">
                                {{ followUp.important? "yes":"no" }}
                            </vs-td>

                            <vs-td>
                                <vs-row>
                                    <div class="flex mb-4">
                                        <div class="w-1/3">
                                            <vs-button :to="`/dashboard/lead/${followUp.id}`" radius color="primary"
                                                       type="border" icon-pack="feather" icon="icon-eye"/>
                                        </div>
                                        <div class="w-1/3 ml-5" >
                                            <vs-button :to="`/dashboard/lead/${followUp.id}/edit`" radius
                                                       color="warning" type="border" icon-pack="feather"
                                                       icon="icon-edit"/>
                                        </div>
                                        <div class="w-1/3 ml-5">
                                            <vs-button :id="`btn-delete-${followUp.id}`"
                                                       class="vs-con-loading__container" radius color="danger"
                                                       type="border" icon-pack="feather" icon="icon-trash"
                                                       @click="is_requesting?$store.dispatch('viewWaitMessage', $vs):confirmDeleteFollowUp(followUp)"/>
                                        </div>
                                    </div>
                                </vs-row>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import "@fortawesome/fontawesome-free/css/all.css"
    import "@fortawesome/fontawesome-free/js/all.js"
    import authCan from './../../mixins/auth'
    import vSelect from 'vue-select';

    export default {
        name: "lead",
        mounted() {
            if (authCan.methods.can('browse-follow-up')){
                this.getFollowUpsData();
            }
        },
        components: {
            'v-select': vSelect,
        },
        data: function (){
            return {
                searchText: "",
                resultTime: 0,
                followUps: [],
                is_requesting: false,
                important: false,
                status: '',
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
            }
        },
        props: {
            'filter': {
                required : false,
            },
            'customer': {
                required : false,
            }
        },
        methods: {
            getFollowUpsData(){
                console.log("hamada");
                this.$vs.loading({container: this.$refs.browse, scale: 0.5});

                let filter = this.filter;

                if (this.important){
                    if (filter){
                        filter += '&important=true';
                    }
                    else{
                        filter = '?important=true';
                    }
                }
                if (this.status){
                    if (filter || this.important){
                        filter += `&status=${this.status}`;
                    }
                    else{
                        filter = `?status=${this.status}`;
                    }
                }

                this.$store.dispatch('followUp/getData', filter? filter:'')
                    .then(response => {
                        this.$vs.loading.close(this.$refs.browse);
                        this.followUps = response.data.data.data;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$vs.loading.close(this.$refs.browse);
                        this.$vs.notify({
                            title: 'Error',
                            text: error.response.data.error,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                    });
            },

            confirmDeleteFollowUp(type)
            {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: `Are you sure!`,
                    text: 'This data can not be retrieved again.',
                    accept: this.deleteFollowUp,
                    parameters: [type]
                });
            },

            deleteFollowUp(params)
            {
                this.is_requesting=true;
                this.$vs.loading({container: `#btn-delete-${params[0].id}`, color: 'danger', scale: 0.45});
                this.$store.dispatch('followUp/delete', params[0].id)
                    .then(response => {
                        this.is_requesting = false;
                        this.$vs.loading.close(`#btn-delete-${params[0].id} > .con-vs-loading`);
                        this.followUps = this.followUps.filter(type => {return type.id !== params[0].id});
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
                        this.$vs.loading.close(`#btn-delete-${params[0].id} > .con-vs-loading`);
                        this.$vs.notify({
                            title: 'Error',
                            text: error.response.data.error,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                    });
            },

            copyToClipboard(text) {
                if (window.clipboardData && window.clipboardData.setData) {
                    // IE specific code path to prevent textarea being shown while dialog is visible.
                    this.onCopy();
                    return clipboardData.setData("Text", text);

                } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                    var textarea = document.createElement("textarea");
                    textarea.textContent = text;
                    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                        document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        this.onCopy();
                        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                    } catch (ex) {
                        this.onError();
                        return false;
                    } finally {
                        document.body.removeChild(textarea);
                    }
                }
            },
            onCopy() {
                this.$vs.notify({
                    title: 'Success!',
                    text: 'Text copied successfully.',
                    color: 'success',
                    iconPack: 'feather',
                    position: 'bottom-right',
                    icon: 'icon-check-circle'
                });
            },
            onError() {
                this.$vs.notify({
                    title: 'Failed!',
                    text: 'Error in copying text.',
                    color: 'danger',
                    iconPack: 'feather',
                    position: 'bottom-right',
                    icon: 'icon-alert-circle'
                })
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
