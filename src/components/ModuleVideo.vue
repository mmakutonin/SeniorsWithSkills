<template>
    <iframe v-bind:src='videoUrl' style='width: 500px; height: 500px'/>
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