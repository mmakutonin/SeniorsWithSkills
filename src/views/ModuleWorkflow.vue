<template>
    <div class='w3-card w3-round-xlarge cust-card w3-container'>
        <ModuleProgress />
        <div
          v-for='(module, index) in courseModules'
          v-bind:key='index'
        >
          <component
            v-if='index===currentModuleIndex'
            v-bind:is='module.type'
            v-bind='{module}'
          />
        </div>
        <ModuleCertificate v-if='currentModuleIndex === courseModules.length' />
        <Navigation />
      </div>
</template>

<script>
import {mapState} from 'vuex'
import Quiz from '../components/ModuleQuiz'
import Video from '../components/ModuleVideo'
import ModuleCertificate from '../components/ModuleCertificate'
import Navigation from '../components/ModuleNavigation'
import ModuleProgress from '../components/ModuleProgress'

export default {
    name: 'ModuleWorkflow',
    components: {
        Quiz,
        Video,
        Navigation,
        ModuleProgress,
        ModuleCertificate
    },
    computed: {
    ...mapState({
        courseModules: state => state.courses[state.courseIndexStarted].modules
            .map(module => {
                if(module.type === 'Final Quiz') {
                    const questions = state.courses[state.courseIndexStarted].modules
                        .filter(module => module.type === 'Quiz')
                        .reduce((aggregate, {questions}) => aggregate.concat(questions), [])
                    return {
                        ...module,
                        type: 'Quiz',
                        questions,
                        passingScore: Math.ceil(questions.length * .8)
                    }
                }
                else {
                    return {
                        ...module
                    }
                }
            }),
        currentModuleIndex: state => state.currentModuleIndex
    }),
  }
}
</script>