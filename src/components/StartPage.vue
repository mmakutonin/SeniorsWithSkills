<template>
    <div>
        <div>
            Please Enter Your Information before starting the course
            <input type='text' placeholder='First Name' v-model='fname' />
            <input type='text' placeholder='Last Name' v-model='lname'/>
            <input type='email' placeholder='email@email.com' v-model='email'/>
        </div>
        <div v-if='personalInfoFilled'>
            Please select a course to take:
            <div v-for='(course, index) in $store.state.courses' v-bind:key='index' v-on:click='startCourse(index)'>
                {{course.title}}
                {{course.hours}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StartPage',
    data: () => ({
        fname: '',
        lname: '',
        email: ''
    }),
    methods: {
        startCourse(index) {
            this.$store.dispatch({
                type: 'startCourse',
                participant: {
                    fname: this.fname,
                    lname: this.lname,
                    email: this.email
                },
                courseIndex: index
            })
        }
    },
    computed: {
        personalInfoFilled() {
            return this.fname && this.email && this.lname
        }
    }
    
}
</script>