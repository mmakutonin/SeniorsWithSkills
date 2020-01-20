<template>
    <iframe v-bind:src='videoUrl' class='w3-block w3-padding w3-border-0 cust-module-content' allowfullscreen/>
</template>

<script>
export default {
    name: 'Video',
    computed: {
        videoUrl() {
            return this.$store.state.courses[this.$store.state.courseIndexStarted].modules[this.$store.state.currentModuleIndex].url
        }
    }
}
</script>