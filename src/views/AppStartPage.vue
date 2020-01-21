<template>
    <div>
        <div v-if='!submitted' class='w3-modal w3-animate-zoom cust-display-modal'>
            <div class='w3-modal-content w3-center w3-card w3-round-large'>
                <h2 class='w3-text-theme'>Welcome! Please Enter Your Information before starting the course.</h2>
                <img src='../assets/logo.png' class='w3-image'/>
                <input 
                    type='text'
                    placeholder='First Name'
                    v-model='fname'
                    class='w3-input'
                />
                <input
                    type='text'
                    placeholder='Last Name'
                    v-model='lname'
                    class='w3-input'
                />
                <input 
                    type='email'
                    placeholder='email@email.com'
                    v-model='email'
                    class='w3-input'
                />
                <input
                    type='button'
                    value='Submit Data'
                    v-on:click='submitParticipantInfo'
                    v-on:keyup.enter='submitParticipantInfo'
                    v-bind:disabled='!personalInfoFilled'
                    class='w3-button w3-theme-dark w3-block'
                />
            </div>
        </div>
        <div v-else>
            <div class='w3-card w3-l2 w3-round-large w3-three-quarter w3-theme-l4 cust-card'>
                <ul class='w3-ul w3-border'>
                    <li class='w3-xlarge w3-padding-small w3-border-theme'> Please select a course to take: </li>
                    <li 
                        v-for='(course, index) in $store.state.courses'
                        v-bind:key='index'
                        v-on:click='startCourse(index)'
                        class='w3-padding-small w3-hover-theme'
                    >
                        {{course.title}}
                        {{course.hours}}
                    </li>
                </ul>
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
        email: '',
        submitted: false
    }),
    created() {
        if(this.$store.state.participant.email) {
            this.submitted = true
        }
    },
    methods: {
        submitParticipantInfo() {
            this.$store.commit({
                type: 'populateParticipantMetadata',
                participant: {
                    fname: this.fname,
                    lname: this.lname,
                    email: this.email
                }
            })
            this.submitted = true
        },
        startCourse(index) {
            this.$store.dispatch({
                type: 'startCourse',
                courseIndex: index
            })
            this.$router.push('/course')
        }
    },
    computed: {
        personalInfoFilled() {
            return this.fname && this.lname && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
        }
    }
    
}
</script>