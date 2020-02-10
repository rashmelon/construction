<template>
    <div>
        <div v-if="can('create-apartment')" class="vx-col w-full mb-base">
            <vx-card ref="create" title="Apartment Data">

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

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <v-select v-model="form.project_id" label="name" :options="projects" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-1/2 w-full mb-6">
                        <div style="display: inline-flex;position: relative;top: -15px;">
                            <input id="img-upload" type="file" @change="previewImage" accept="image/*">
                            <vs-button size="small" icon-pack="feather" icon="icon-upload" type="gradient" onclick="document.getElementById('img-upload').click()">Upload Image</vs-button>
                        </div>
                    </div>
                </div>

                <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <vs-button id="btn-create" @click="is_requesting?$store.dispatch('viewWaitMessage', $vs):create()" icon-pack="feather" icon="icon-save" type="gradient">Create Project</vs-button>
                    </vs-col>
                </vs-row>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select';
    export default {
        name: "add-apartment",
        mounted() {
          this.getProjects();
        },
        components: {
            'v-select': vSelect,
        },
        data: function () {
            return {
                projects: [],
            form: {
                number: '',
                floor: '',
                area: '',
                    project_id: '',
                    image: null,
                },
                uploadedImage: null,
                is_requesting: false
            }
        },
        methods: {
            getProjects(){
                this.$store.dispatch('project/getData', '?sortDesc=created_at')
                    .then(response => {
                        this.is_requesting=false;
                        this.projects = response.data.data.data;
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
                let form_data = new FormData();

                for (let key in this.form ) {
                    if ((key === 'image') && this.form.hasOwnProperty(key)){
                        if (this.form[key]) {
                            for (let i=0; i<this.form[key].length; i++){
                                form_data.append(key, this.form[key][i]);
                            }
                        }
                    }
                    else if (key === 'project_id'){
                        form_data.append(key, this.form['project_id']['id'])
                    }
                    else {
                        form_data.append(key, this.form[key]);
                    }
                }
                this.$store.dispatch('apartment/create', form_data)
                    .then(response => {
                        this.is_requesting=false;
                        this.$vs.loading.close(`#btn-create > .con-vs-loading`);
                        this.$router.push(`/dashboard/apartment/${response.data.data.data.id}`);
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
