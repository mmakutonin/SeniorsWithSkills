<template>
  <div class='w3-center cust-module-content w3-row-padding'>
    <div class='w3-quarter w3-container w3-round w3-white'>
      <label> Please review your information before printing your certificate. </label>
      <label> First Name: </label>
      <input
        type="text"
        placeholder="First Name"
        v-model="fname"
        class="w3-input w3-margin-bottom"
      />
      <label> Last Name: </label>
      <input
        type="text"
        placeholder="Last Name"
        v-model="lname"
        class="w3-input w3-margin-bottom"
      />
      <label> Email: </label>
      <input
        type="email"
        placeholder="email@email.com"
        v-model="email"
        class="w3-input w3-margin-bottom"
      />
    </div>
    <div class='w3-rest w3-container'>
      <div class='w3-white cust-certificate-width' ref='certificate'>
        <img
          src='../assets/logo.png'
          />
        <div class='w3-xlarge'>
          <span class='cust-certificate-font'>This document certifies that</span><br/>
          <span>{{pFname}} {{pLname}}</span><br/>
          <span>at {{pEmail}}</span><br/>
          <span class='cust-certificate-font'>Completed the Seniors with Skills</span><br/>
          <span class='cust-certificate-font'>{{courseTitle}} Course</span><br/>
        </div>
      </div>
      <div ref='htmltest' />
    </div>
    <div class='w3-container w3-row w3-section'>
      <div class='w3-half'>
        <input
          type='button'
          value='Download Your Certificate'
          v-on:click='printCertificate'
          class='w3-btn w3-round w3-border w3-border-theme'
        />
      </div>
      <div class='w3-half'>
        <input
          type='button'
          value='Start Another Course'
          v-on:click='navigateToCourseSelection'
          v-bind:disabled='!certificateObtained'
          class='w3-btn w3-round w3-border w3-border-theme'
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
const jsPDF = require('jspdf')
import html2canvas from 'html2canvas'

export default {
  name: "ModuleCertificate",
  data: () => ({
      certificateObtained: false
  }),
  methods: {
      printCertificate() {
        html2canvas(this.$refs.certificate).then(res => {
          const doc = jsPDF()
          doc.addImage(res.toDataURL('image/png'), 'PNG', 0, 0)
          doc.save('certificate.pdf')
          this.certificateObtained = true
        })
      },
      navigateToCourseSelection() {
          this.$store.dispatch('completeCourse', {
            courseIndex: this.courseIndex
          })
          this.$router.push('/')
      }
  },
  computed: {
    ...mapState({
      fname: state => state.participant.fname,  
      lname: state => state.participant.lname,
      email: state => state.participant.email,
      courseTitle: state => state.courses[state.courseIndexStarted].title,
      courseIndex: state => state.courseIndexStarted
    }),
    pFname: {
        get() {
          return this.fname
        },
        set(val) {
          this.$store.commit({
            type: 'populateParticipantMetadata',
            participant: {
                fname: val,
                lname,
                email
            }
          })
        }
    },
    pLname: {
        get() {
          return this.lname
        },
        set(val) {
          this.$store.commit({
            type: 'populateParticipantMetadata',
            participant: {
                fname,
                lname: val,
                email
            }
          })
        }
    },
    pEmail: {
        get() {
          return this.email
        },
        set(val) {
          this.$store.commit({
            type: 'populateParticipantMetadata',
            participant: {
                fname,
                lname,
                email: val
            }
          })
        }
    },
  }
};
</script>