<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('edit-apartment')">
            <vx-card ref="edit" title="Edit Apartment">

                <vs-row class="mb-5">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <vs-avatar class="mx-auto mb-2 block" size="120px" :src="form.image"/>
                    </vs-col>
                </vs-row>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="number" name="number" :danger="errors.has('number')" val-icon-danger="clear" :danger-text="errors.first('number')"
                                  class="w-full" icon-pack="feather" icon="icon-smartphone" label-placeholder="Number" v-model="form.number" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="number" name="floor" :danger="errors.has('floor')" val-icon-danger="clear" :danger-text="errors.first('floor')"
                                  class="w-full" icon-pack="feather" icon="icon-star" label-placeholder="Floor" v-model="form.floor" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input name="number" :danger="errors.has('area')" val-icon-danger="clear" :danger-text="errors.first('area')"
                                  class="w-full" icon-pack="feather" icon="icon-percent" label-placeholder="Area" v-model="form.area" />
                    </div>
                </div>

                <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <vs-button id="btn-edit" @click="is_requesting?$store.dispatch('viewWaitMessage', $vs):edit()" icon-pack="feather" icon="icon-save" type="gradient">Edit Project</vs-button>
                    </vs-col>
                </vs-row>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import axios from "../../http/axios";

    export default {
        name: "edit-apartment",
        mounted() {
            this.getApartmentData();
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
                    number: '',
                    floor: '',
                    area: '',
                },
                image: null,
                is_requesting: false
            }
        },
        methods: {
            getApartmentData() {
                this.$store.dispatch('apartment/view', this.$route.params.id)
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

                delete this.form['image'];

                this.$store.dispatch('apartment/update', {id: this.$route.params.id, data: (this.form)})
                    .then(response => {
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-edit > .con-vs-loading`);
                        this.$router.push(`/dashboard/apartment/${this.$route.params.id}`);
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
