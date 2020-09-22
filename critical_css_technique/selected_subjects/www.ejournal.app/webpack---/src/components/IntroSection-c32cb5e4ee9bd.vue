<template>
    <section
        id="intro-section"
        class="pattern-background"
    >
        <header-section/>
        <b-row>
            <b-col md="6">
                <img class="screenshot" src="../assets/images/journal-view.png" data-aos='fade-up'/>
            </b-col>
            <b-col md="6" class="text-content right">
                <h1>Bringing structure to long term assignments and journals.</h1>
                <p>
                    eJournal is a blended learning web application that provides an easy to manage graded journal system focused on education.
                    Curious what eJournal has to offer for your education?
                </p>
                <b-button href="#feature-section">
                    <v-icon name="play"/>
                    Learn more
                </b-button>
                <b-button
                    href="mailto:contact@ejournal.app?subject=I%20would%20like%20to%20know%20more%20about%20eJournal!"
                    class="white-button ml-2"
                >
                    <v-icon name="desktop"/>
                    Request a demo
                </b-button>
            </b-col>
        </b-row>
    </section>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue'

export default {
    components: {
        HeaderSection,
    },
}
</script>

<style lang='sass'>
@import '../sass/modules/colors.sass'
@import '../sass/modules/breakpoints.sass'

#intro-section
    padding: 20px 20px 40px 20px
    min-height: 100vh
    h1, p
        color: white
    p
        margin-bottom: 40px
    .row
        @include md
            height: calc(100vh - 200px)
</style>
