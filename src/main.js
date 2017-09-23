import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

//  Setup VueResoure global options: https://github.com/pagekit/vue-resource/blob/develop/docs/api.md
// '$' $http is only needed from inside the instance but not here
// the 'root' key will set our main base url for this app
Vue.http.options.root = 'https://vuejs-http-example-ef7a8.firebaseio.com/users.json';

new Vue({
  el: '#app',
  render: h => h(App)
})
