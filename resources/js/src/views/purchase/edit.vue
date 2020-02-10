<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('edit-purchase')">
            <vx-card ref="edit" title="Edit Purchase">
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

                <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <vs-button id="btn-edit" @click="is_requesting?$store.dispatch('viewWaitMessage', $vs):edit()" icon-pack="feather" icon="icon-save" type="gradient">Edit Purchase</vs-button>
                    </vs-col>
                </vs-row>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import axios from "../../http/axios";

    export default {
        name: "edit-purchase",
        mounted() {
            this.getPurchaseData();
        },
        computed: {
            validateForm() {
                return !this.errors.any() && this.form.name;
            }
        },
        data: function () {
            return {
                roles: [],
                form: {
                    finished: 0,
                    end_date: '',
                },
                is_requesting: false
            }
        },
        methods: {
            getPurchaseData() {
                this.$store.dispatch('purchase/view', this.$route.params.id)
                    .then(response => {
                        this.$vs.loading.close(this.$refs.edit.$refs.content);
                        this.form = response.data.data.data;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$vs.loading.close(this.$refs.edit.$refs.content);
                        this.$vs.notify({
                            title: 'Error',
                            text: error.response.data.error,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                    });
            },

            edit() {

                this.is_requesting=true;

                this.$vs.loading({container: `#btn-edit`, color: 'primary', scale: 0.45});

                this.$store.dispatch('purchase/update', {id: this.$route.params.id, data: (this.form)})
                    .then(response => {
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-edit > .con-vs-loading`);
                        this.$router.push(`/dashboard/purchase/${this.$route.params.id}`);
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
                        this.$vs.loading.close(`#btn-edit > .con-vs-loading`);
                        this.$vs.notify({
                            title: 'Error',
                            text: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0],
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                    });
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
