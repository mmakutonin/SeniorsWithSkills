<template>
  <div class='cust-vh-full w3-theme-light'>
    <Header />
    <div class='w3-container cust-mainview'>
      <StartPage v-if='!courseSelected' />
      <div v-else class='w3-card w3-round-xlarge cust-card w3-container'>
        <ModuleProgress />
        <div
          v-for='(module, index) in course.modules'
          v-bind:key='index'
        >
          <component
            v-if='index===currentModuleIndex'
            v-bind:is='module.type'
            v-bind='{module}'
          />
        </div>
        <div v-if='currentModuleIndex === course.modules.length'>
          <Quiz v-bind:module='finalQuizModule' />
        </div>
        <Navigation />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import StartPage from './components/AppStartPage'
import Quiz from './components/ModuleQuiz'
import Video from './components/ModuleVideo'
import Navigation from './components/ModuleNavigation'
import Header from './components/AppHeader'
import ModuleProgress from './components/ModuleProgress'

export default {
  name: 'app',
  components: {
    Header,
    StartPage,
    Quiz,
    Video,
    Navigation,
    ModuleProgress
  },
  computed: {
    ...mapState([
      'courseIndexStarted',
      'courses',
      'currentModuleIndex'
    ]),
    courseSelected() {
      return this.courseIndexStarted !== -1
    },
    course() {
      if(!this.courseSelected){
        return null
      }
      else {
        return this.courses[this.courseIndexStarted]
      }
    },
    finalQuizModule() {
      const questionsArray = this.course.modules
        .filter(module => module.type === 'Quiz')
        .reduce((aggregate, {questions}) => aggregate.concat(questions), [])
      return {
        questions: questionsArray,
        passingScore: Math.ceil(questionsArray.length * .8)
      }
    }
  }
}
</script>
