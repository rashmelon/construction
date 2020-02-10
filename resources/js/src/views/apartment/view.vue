<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('view-apartment')">
            <vx-card ref="view" title="Apartment Data" collapseAction>
                <vs-row v-if="apartment">
                    <vs-row class="mb-5">
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <vs-avatar class="mx-auto mb-2 block" size="120px" :src="apartment.image"/>
                        </vs-col>
                    </vs-row>
                    <vs-row class="mb-2">
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="number">Number: </label><span id="number">{{apartment.number}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="floor">Floor: </label><span id="floor">{{apartment.floor}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="area">Area: </label><span id="area">{{apartment.area}}</span>
                        </vs-col>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <label for="project">Project: </label><span id="project" v-if="apartment.project">{{apartment.project.name}}</span>
                        </vs-col>
                    </vs-row>
                </vs-row>
            </vx-card>
            <purchase :filter="`?apartment=${$route.params.id}`" :apartment="$route.params.id"/>
        </div>
    </div>
</template>

<script>
    import purchase from "../purchase/browse";

    export default {
        name: "viewData",
        mounted() {
            this.getApartmentData();
        },
        data: () => {
            return {
                apartment: null,
                is_requesting: false,
            }
        },
        components: {
            'purchase': purchase
        },
        methods: {
            getApartmentData() {
                this.$vs.loading({container: this.$refs.view.$refs.content, scale: 0.5});
                this.$store.dispatch('apartment/view', this.$route.params.id)
                    .then(response => {
                        this.apartment = response.data.data.data;
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
