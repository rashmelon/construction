<template>
    <div>
        <div v-if="can('create-customer')" class="vx-col w-full mb-base">
            <vx-card ref="create" title="Customer Data">

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="email" name="email" :danger="errors.has('email')" val-icon-danger="clear" :danger-text="errors.first('email')"
                                  class="w-full" icon-pack="feather" icon="icon-message-circle" label-placeholder="Email" v-model="form.email" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="text" name="name" :danger="errors.has('name')" val-icon-danger="clear" :danger-text="errors.first('name')"
                                  class="w-full" icon-pack="feather" icon="icon-clipboard" label-placeholder="Name" v-model="form.name" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="text" name="phone" :danger="errors.has('phone')" val-icon-danger="clear" :danger-text="errors.first('phone')"
                                  class="w-full" icon-pack="feather" icon="icon-smartphone" label-placeholder="Phone" v-model="form.phone" />
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <v-select v-model="form.reference" label="name" :options="references" :dir="$vs.rtl ? 'rtl' : 'ltr'" placeholder="Reference"/>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <vs-input type="date" name="birth_date" :danger="errors.has('birth_date')" val-icon-danger="clear" :danger-text="errors.first('birth_date')"
                                  class="w-full" icon-pack="feather" icon="icon-date" label-placeholder="Birth Date" v-model="form.birth_date" />
                    </div>
                </div>

                <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <vs-button id="btn-create" @click="is_requesting?$store.dispatch('viewWaitMessage', $vs):create()" icon-pack="feather" icon="icon-save" type="gradient">Create Customer</vs-button>
                    </vs-col>
                </vs-row>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    export default {
        name: "add-customer",
        components: {
            'v-select': vSelect,
        },
        data: function () {
            return {
                form: {
                    email: '',
                    name: '',
                    phone: '',
                    birth_date: '',
                    reference: '',
                },
                references:[
                    '',
                    'Facebook',
                    'Olx',
                    'Friend',
                    'Others'
                ],
                uploadedImage: null,
                is_requesting: false
            }
        },
        methods: {
            create() {
                this.is_requesting=true;
                this.$vs.loading({container: `#btn-create`, color: 'primary', scale: 0.45});

                this.$store.dispatch('customer/create', this.form)
                    .then(response => {
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-create > .con-vs-loading`);
                        this.$router.push(`/dashboard/customer/${response.data.data.data.id}`);
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

            previewImage: function(event) {
                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.uploadedImage = e.target.result;
                        this.form.image = input.files;
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
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
