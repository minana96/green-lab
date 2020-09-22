import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/brands/github'
import 'vue-awesome/icons/brands/linkedin'
import 'vue-awesome/icons/desktop'
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/play'
import 'vue-awesome/icons/pen-alt'
import 'vue-awesome/icons/sign-in-alt'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/user-shield'

import Home from './Home.vue'

Vue.use(BootstrapVue)

Vue.use(Toasted, {
    position: 'bottom-center',
    duration: 4000,
    fullWidth: true,
    className: 'toaster-error',
})

Vue.component('v-icon', Icon)

Vue.config.productionTip = false

Vue.prototype.$mailTo = (email, subject = null) => {
    window.location.href = `mailto:${email}${(subject) ? `?subject=${encodeURI(subject)}` : ''}`
    setTimeout(() => {
        if (document.hasFocus()) {
            Vue.toasted.info(
                `It appears your browser has no configured email client, you can email us at:
                ${email}`,
                { duration: 12000 },
            )
        }
    }, 500)
}

new Vue({
    created () {
        AOS.init({
            once: true,
        })
    },
    render: h => h(Home),
}).$mount('#app')
