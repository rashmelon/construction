<template>
    <div>
        <div class="vx-col w-full mb-base" v-if="can('view-project')">
            <vx-card ref="view" title="Personal Information" collapseAction>
                <vs-row v-if="project">
                    <vs-row class="mb-5">
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <vs-avatar class="mx-auto mb-2 block" size="120px" :src="project.image"/>
                        </vs-col>
                    </vs-row>
                    <vs-row class="mb-2">
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            {{project.name}}
                        </vs-col>
                    </vs-row>
                </vs-row>
            </vx-card>
            <apartments :project="$route.params.id"/>
        </div>
    </div>
</template>

<script>
    import apartment from "./../apartment/browse";
    export default {
        name: "viewData",
        mounted() {
            this.getProjectData();
        },
        data: () => {
            return {
                project: null,
                is_requesting: false,
            }
        },
        components: {
            'apartments': apartment
        },
        methods: {
            getProjectData() {
                this.$vs.loading({container: this.$refs.view.$refs.content, scale: 0.5});
                this.$store.dispatch('project/view', this.$route.params.id)
                    .then(response => {
                        this.project = response.data.data.data;
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
