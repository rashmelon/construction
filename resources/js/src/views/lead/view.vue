<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('view-follow-up')">
            <vx-card ref="view" title="Lead Data" collapseAction>
                <vs-row v-if="followUp">
                    <vs-row class="mb-2">
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="name">Customer Name: </label><span id="name" v-if="followUp.customer">{{followUp.customer.name}}</span>
                        </vs-col>
                            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="date">Date: </label><span id="date">{{followUp.date}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="time">Time: </label><span id="time">{{followUp.time}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="status">Status: </label><span id="status">{{followUp.status}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="notes">Notes: </label><span id="notes">{{followUp.notes}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="call_status">Call Status: </label><span id="call_status">{{followUp.call_status}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12" class="m-2">
                            <label for="important">Important: </label><span id="important">
                                {{ followUp.important? "yes":"no" }}</span>
                        </vs-col>
                    </vs-row>
                </vs-row>
            </vx-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "viewData",
        mounted() {
            this.getFollowUpData();
        },
        data: () => {
            return {
                followUp: null,
                is_requesting: false,
            }
        },
        methods: {
            getFollowUpData() {
                this.$vs.loading({container: this.$refs.view.$refs.content, scale: 0.5});
                this.$store.dispatch('followUp/view', this.$route.params.id)
                    .then(response => {
                        this.followUp = response.data.data.data;
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
