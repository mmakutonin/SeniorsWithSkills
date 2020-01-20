<template>
    <div class='w3-cell-row w3-center cust-module-progress-height'>
        <div
            v-for='(module, index) in courseProgressArray'
            v-bind:key='index'
            class='w3-cell w3-container w3-padding'
        >
            <input
                type='button'
                v-bind:class='"w3-btn w3-circle " + progressColor(index, module.value, module.type)'
                v-on:click='changeModule(index)'
                v-bind:value='index + 1'
                v-bind:disabled='index > currentWorkIndex'
            />
            <br/> {{module.type}}
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';

export default {
    name: 'ModuleProgress',
    methods: {
        progressColor(index, complete, type) {
            if(index === this.currentIndex) {
                return 'w3-theme'
            }
            else if(complete && type === 'Quiz' || (type === 'Video' && index < this.currentWorkIndex)) {
                return 'w3-green'
            }
            else {
                return 'w3-theme-dark'
            }
        },
        changeModule(index) {
            this.$store.commit({
                type: 'currentModuleIndexChange',
                newIndex: index
            })
        }
    },
    computed: {
        ...mapState({
            currentIndex: state => state.currentModuleIndex,
            courseProgressArray: state => state.courseProgressArray
                .map((value, index) => ({
                    value,
                    type: state.courses[state.courseIndexStarted].modules[index].type
                }))
                .concat([{
                    value: false,
                    type: 'Final Quiz'
                }])
        }),
        currentWorkIndex() {
            return this.courseProgressArray
                .reduce((agg, current, index) => {
                    if(agg !== true) {
                        return agg
                    }
                    if(current.value === false) {
                        return index
                    }
                    else {
                        return true
                    }
                }, true)
        }
    }
}
</script>