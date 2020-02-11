<template>
    <div>
        <div class="vx-col w-full mb-base">
            <vx-card ref="view" title="Installment Data" collapseAction>
                <vs-table v-if="installments" :data="installments" >
                    <template slot="thead">
                        <vs-th sort-key="id">ID</vs-th>
                        <vs-th sort-key="display_name">Customer</vs-th>
                        <vs-th sort-key="display_name">Amount</vs-th>
                        <vs-th sort-key="display_name">Date</vs-th>
                        <vs-th sort-key="display_name">Paid At</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="index" v-for="(installment, index) in data">
                            <vs-td :data="installment.id">
                                {{ index+1 }}
                            </vs-td>
                            <vs-td :data="installment.purchase">
                                {{ installment.purchase.customer.name }}
                            </vs-td>
                            <vs-td :data="installment.amount">
                                {{ installment.amount }}
                            </vs-td>
                            <vs-td :data="installment.date">
                                {{ installment.date }}
                            </vs-td>
                            <vs-td :data="installment.paid_at">
                                {{ installment.paid_at }}
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
    export default {
        name: "installment",
        mounted() {
            this.getInstallmentData();
        },
        props: {
            'filter': {
                required : false
            },
        },
        data: function (){
            return {
                searchText: "",
                resultTime: 0,
                installments: [],
                is_requesting: false
            }
        },
        methods: {
            getInstallmentData(){
                this.$vs.loading({container: this.$refs.browse, scale: 0.5});

                this.$store.dispatch('installment/getData', this.filter?this.filter:'')
                    .then(response => {
                        this.$vs.loading.close(this.$refs.browse);
                        this.installments = response.data.data.data;
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
