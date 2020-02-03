import Vue from 'vue'
import Vuex from 'vuex'
import data from '../assets/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...data,
    courseIndexStarted: -1,
    participant: {
      fname: '',
      lname: '',
      email: ''
    },
    courseProgressArray: [],
    currentModuleIndex: -1,
    courseCompletionArray: []
  },
  mutations: {
    startCourse (state, payload) {
      state.courseIndexStarted = payload.index
    },
    populateParticipantMetadata (state, payload) {
      state.participant = payload.participant
    },
    populateCourseProgressArray (state, payload) {
      state.courseProgressArray = state.courses[payload.courseIndex].modules.map(module => {
        if(payload.courseCompleted || module.type === 'Video') {
          return true
        }
        else {
          return false
        }
      })
    },
    currentModuleIndexReset (state) {
      state.currentModuleIndex = 0
    },
    currentModuleIndexIncrement (state) {
      state.currentModuleIndex++
    },
    currentModuleIndexDecrement (state) {
      state.currentModuleIndex--
    },
    currentModuleIndexChange (state, payload) {
      state.currentModuleIndex = payload.newIndex;
    },
    completeModule (state) {
      Vue.set(state.courseProgressArray, state.currentModuleIndex, true)
    },
    addToCompletionArray (state, payload) {
      Vue.set(state.courseCompletionArray, state.courseCompletionArray.length, payload.courseIndex)
    },
    resetModuleData (state) {
      state.courseProgressArray = []
      state.currentModuleIndex = -1
      state.courseIndexStarted = -1
    }
  },
  actions: {
    startCourse({commit, state}, payload) {
      let courseCompleted
      if(state.courseCompletionArray.includes(payload.courseIndex)) {
        courseCompleted = true
      }
      else {
        courseCompleted = false
      }
      commit({
        type: 'populateCourseProgressArray',
        courseIndex: payload.courseIndex,
        courseCompleted
      })
      commit('currentModuleIndexReset')
      commit({
        type: 'startCourse',
        index: payload.courseIndex
      })
    },
    completeCourse({commit, state}, payload) {
      if(!state.courseCompletionArray.includes(payload.courseIndex)) {
        commit({
          type: 'addToCompletionArray',
          courseIndex: payload.courseIndex
        })
      }
      commit('resetModuleData')
    }
  }
})
