<template>
  <div class='w3-center'>
    Congratulations on completing the course!
    Please review/edit the following before downloading your certificate:
    <input
      type="text"
      placeholder="First Name"
      v-model="fname"
      class="w3-input"
    />
    <input
      type="text"
      placeholder="Last Name"
      v-model="lname"
      class="w3-input"
    />
    <input
      type="email"
      placeholder="email@email.com"
      v-model="email"
      class="w3-input"
    />
    <input
      type='button'
      value='Download Your Certificate'
      v-on:click='printCertificate'
      class='w3-btn'
    />
    //Placeholder for PDFBuilder
    <input
      type='button'
      value='Start Another Course'
      v-on:click='printCertificate'
      v-bind:disabled='!certificateObtained'
      class='w3-btn w3-block'
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ModuleCertificate",
  data: () => ({
      certificateObtained: false
  }),
  methods: {
      printCertificate() {
          //create certificate
          //download certificate
      },
      navigateToCourseSelection() {
          //reset course metadata
          this.$router.push('/')
      }
  },
  computed: {
    ...mapState({
      fname: state => state.participant.fname,  
      lname: state => state.participant.lname,
      email: state => state.participant.email
    }),
    pFname: {
        get: () => this.fname,
        set: val => this.$store.commit({
            type: 'populateParticipantMetadata',
            participant: {
                fname: val,
                lname,
                email
            }
        })
    },
    pLname: {
        get: () => this.lname,
        set: val => this.$store.commit({
            type: 'populateParticipantMetadata',
            participant: {
                lname: val,
                fname,
                email
            }
        })
    },
    pEmail: {
        get: () => this.email,
        set: val => this.$store.commit({
            type: 'populateParticipantMetadata',
            participant: {
                email: val,
                fname,
                lname
            }
        })
    },
  }
};
</script>