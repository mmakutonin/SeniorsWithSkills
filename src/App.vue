<template>
  <div>
    <StartPage v-if='!courseSelected' />
    <div v-else>
      <Header />
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
      //errorDisplay
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import StartPage from './components/StartPage'
import Quiz from './components/ModuleQuiz'
import Video from './components/ModuleVideo'
import Navigation from './components/ModuleNavigation'
import Header from './components/ModuleHeader'

export default {
  name: 'app',
  components: {
    StartPage,
    Quiz,
    Video,
    Navigation
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
