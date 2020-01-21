<template>
    <div class='w3-container cust-module-content'>
        <div v-for='(question, index) in randomQuestionSet' v-bind:key='index'>
            <div v-if='index===currentQuestionIndex'>
                {{question.question}}
                <div class='w3-section w3-border' />
                <div class='w3-row-padding w3-section'>
                    <div class='w3-twothird'>
                        <div v-for='(answer, qIndex) in question.answers' v-bind:key='qIndex'>
                            <input
                                type='radio'
                                v-model='answers[index]'
                                name='answer'
                                v-bind:value='qIndex'
                                class='w3-radio'
                            />
                            <label> {{answer}} </label>
                        </div>
                        <div class='w3-center'>
                        <input
                            type='button'
                            value='Submit Answer'
                            v-bind:disabled='answers[index] === undefined'
                            v-on:click='currentQuestionIndex++'
                            class='w3-btn w3-section w3-center w3-theme w3-round-xlarge'
                        />
                        </div>
                    </div>
                    <div class='w3-rest w3-round'>
                        <img
                            v-bind:src='stockPhoto'
                            class='w3-img w3-block w3-round'
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if='currentQuestionIndex >= module.questions.length' class='w3-container w3-center'>
            <h2>{{finalMessage}} </h2>
            <h3> You got a score of: </h3>
            <h2 v-bind:class='"w3-xxxlarge " + this.scoreText'> {{score}}% </h2>
            <h3> Mastery Score: </h3>
            <h2 class='w3-text-theme w3-xxxlarge'> {{masteryScore}}% </h2>
            <input 
                type='button'
                value='Retake Quiz'
                v-on:click='populateRandomQuestionArray'
                v-bind:class='"w3-theme-l1 w3-btn w3-round-xlarge"'
            />
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import P1 from '../assets/stockPhotos/P1.jpg'
import P2 from '../assets/stockPhotos/P2.jpg'
import P3 from '../assets/stockPhotos/P3.jpg'
import P4 from '../assets/stockPhotos/P4.png'

export default {
    name: 'Quiz',
    props: ['module'],
    data: () => ({
        currentQuestionIndex: 0,
        answers: [],
        randomQuestionSet: [],
        stockPhoto: [P1,P2,P3,P4][Math.floor(Math.random()*4)],
        scoreText: 'w3-text-red'
    }),
    created() {
        this.populateRandomQuestionArray()
    },
    watch: {
        currentQuestionIndex(index) {
            if(index === this.module.questions.length && this.score >= this.masteryScore) {
                this.$store.commit('completeModule')
                this.scoreText = 'w3-text-green'
            }
        }
    },
    methods: {
        populateRandomQuestionArray() {
            this.randomQuestionSet = this.module.questions
                .map((category) => category.reduce((agg,question) => {
                    if(Math.random() > .5) {
                        return agg
                    }
                    else {
                        return question
                    }
                }))
            this.answers = []
            this.currentQuestionIndex = 0
        }
    },
    computed: {
        score() {
            if(this.answers.length > 0) {
                return Math.floor(this.answers.reduce((aggregate, answer, index) => {
                    if(answer===this.randomQuestionSet[index].correctAnswerIndex) {
                        return ++aggregate
                    }
                    else {
                        return aggregate
                    }
                }, 0) / this.answers.length * 100)
            }
            else {
                return null;
            }
        },
        masteryScore() {
            return Math.floor(100 * this.module.passingScore / this.answers.length)
        },
        finalMessage() {
            if(this.score < this.masteryScore) {
                return 'Sorry, you did not pass the quiz. Please try taking it again.'
            }
            else {
                return 'Good job, you passed the quiz! You can retake it or move on to the next module.'
            }
        }
    }
}
</script>