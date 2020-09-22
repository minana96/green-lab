<template>
    <div id='home'>
        <intro-section/>
        <feature-section/>
        <about-section/>
        <used-by-section/>
        <contact-section/>
    </div>
</template>

<script>
import IntroSection from '@/components/IntroSection.vue'
import FeatureSection from '@/components/FeatureSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import UsedBySection from '@/components/UsedBySection.vue'
import ContactSection from '@/components/ContactSection.vue'

export default {
    name: 'Home',
    components: {
        IntroSection,
        FeatureSection,
        AboutSection,
        UsedBySection,
        ContactSection,
    },
}
</script>

<style lang='sass'>
@import 'sass/global.sass'

#home
    overflow-x: hidden
</style>
