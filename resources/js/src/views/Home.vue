<template>
    <div>
        <h4>You are in home.</h4>
        <follow-up :filter="`?today=true`"/>
    </div>
</template>

<script>
    import followUp from "./lead/browse";
    export default {
        components: {
            'follow-up': followUp
        },
    }
</script>


