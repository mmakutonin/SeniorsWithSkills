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
    error: {
      message: ''
    }
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
        if(module.type === 'Video') {
          return true
        }
        else {
          return false
        }
      }).concat([false])
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
    completeModule (state) {
      Vue.set(state.courseProgressArray, state.currentModuleIndex, true)
    },
    createError(state, payload) {
      state.error.message = payload.errorMessage
    },
    removeError(state) {
      state.error.message = ''
    }
  },
  actions: {
    startCourse({commit}, payload) {
      commit({
        type: 'populateCourseProgressArray',
        courseIndex: payload.courseIndex
      })
      commit('currentModuleIndexReset')
      commit({
        type: 'startCourse',
        index: payload.courseIndex
      })
    }
  },
  modules: {
  }
})
