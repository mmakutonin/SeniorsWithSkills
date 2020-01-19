<template>
    <div>
        <div v-for='(question, index) in randomQuestionSet' v-bind:key='index'>
            <div v-if='index===currentQuestionIndex'>
                {{question.question}}
                <div v-for='(answer, qIndex) in question.answers' v-bind:key='qIndex'>
                    <input type='radio' v-model='answers[index]' name='answer' v-bind:value='qIndex'/> {{answer}}
                </div>
            </div>
        </div>
        <input type='button' value='Submit Answer' v-bind:disabled='answers[currentQuestionIndex] === undefined' v-on:click='currentQuestionIndex++'/>
        <div v-if='currentQuestionIndex >= module.questions.length'>
            {{finalMessage}}
            You got a score of:
            {{score}}%
            Mastery Score:
            {{masteryScore}}%
            <input type='button' value='Retake Quiz' v-on:click='populateRandomQuestionArray' />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Quiz',
    props: ['module'],
    data: () => ({
        currentQuestionIndex: 0,
        answers: [],
        randomQuestionSet: []
    }),
    created() {
        this.populateRandomQuestionArray()
    },
    watch: {
        currentQuestionIndex(index) {
            if(index >= this.module.questions.length && this.score >= 80) {
                this.$store.commit('completeModule')
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