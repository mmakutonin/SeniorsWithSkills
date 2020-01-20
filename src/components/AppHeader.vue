<template>
    <div v-if='fname && lname' class='w3-block w3-theme-dark w3-row cust-header-height w3-center cust-header-font-height'>
        <div class='w3-third'> Hi, {{fname}} {{lname}}! </div>
        <div class='w3-third'> 
            <img src='../assets/logo.png' class='w3-cell cust-header-height' />
        </div>
        <div class='w3-third'> Course: {{course}} </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState({
            fname: state => state.participant.fname,
            lname: state => state.participant.lname,
            course: state => {
                if(state.courseIndexStarted === -1){
                    return 'To be selected'
                }
                else {
                    return state.courses[state.courseIndexStarted].title
                }
            }
        })
    }
}

</script>