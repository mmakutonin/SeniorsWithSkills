<template>
    <div class='w3-block w3-row cust-module-nav-height w3-border-top w3-border-black'>
        <input
            type='button'
            value='Previous Module'
            v-on:click='$store.commit("currentModuleIndexDecrement")'
            v-bind:disabled='$store.state.currentModuleIndex === 0'
            class='w3-button w3-half cust-module-nav-height w3-border-right w3-border-theme'
        />
        <input
            type='button'
            value='Next Module'
            v-on:click='$store.commit("currentModuleIndexIncrement")'
            v-bind:disabled='!currentModuleComplete'
            class='w3-button w3-half cust-module-nav-height'
        />
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