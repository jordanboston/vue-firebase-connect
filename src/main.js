import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import configKeys from './config.js'

import VueToastr from '@deveodk/vue-toastr'

Vue.use(VueToastr);

Vue.use(VueResource);

//  Setup VueResoure global options: https://github.com/pagekit/vue-resource/blob/develop/docs/api.md
// '$' $http is only needed from inside the instance but not here
// the 'root' key will set our main base url for this app
Vue.http.options.root = 'https://vuejs-http-example-ef7a8.firebaseio.com/';

// example of interceptor (will change our request to a PUT request)
// intercept request
// Vue.http.interceptors.push((request, next) => {
//   console.log(request);
//   if (request.method == 'POST') {
//     request.method = 'PUT';
//   }
//   next(response => {
//   	// intercept response
//     response.json = () => { return {messages: response.body} }
//   });
// });

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Setup Firebase
var config = configKeys;

// firebase.initializeApp(config)

// var usersRef = firebase.database().ref('users')

new Vue({
  el: '#app',
  render: h => h(App)
})
