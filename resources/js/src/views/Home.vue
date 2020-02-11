<template>
    <div>
        <h4>You are in home.</h4>
        <follow-up :filter="`?today=true`"/>
        <installment :filter="`?today=true`"/>
    </div>
</template>

<script>
    import followUp from "./lead/browse";
    import installment from "./installment/browse";
    export default {
        components: {
            'installment': installment,
            'follow-up': followUp
        },
    }
</script>


