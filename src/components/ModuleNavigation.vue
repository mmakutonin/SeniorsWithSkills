<template>
    <div>
        <input type='button' value='Previous Module' v-on:click='$store.commit("currentModuleIndexDecrement")' v-bind:disabled='$store.state.currentModuleIndex === 0'/>
        <input type='button' value='Next Module' v-on:click='$store.commit("currentModuleIndexIncrement")' v-bind:disabled='!currentModuleComplete'/>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
    computed: {
        currentModuleComplete() {
            return this.$store.state.courseProgressArray[this.$store.state.currentModuleIndex]
        }
    }
}
</script>