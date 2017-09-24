<template>
    <div class="container">
        <div class="row">
           <h1 class="text-success">VUE.JS FIREBASE HTTP</h1>
            <div class="col-md-6">
							<div class="panel panel-success">
								<div class="panel-heading">
									<h2 class="panel-title">Submit Data to Firebase</h2>
								</div>
								<div class="panel-body">
									<div class="form-group">
										<label>Username</label>
										<input type="text" class="form-control" v-model="user.username">
									</div>
									<div class="form-group">
										<label>Email</label>
										<input type="text" class="form-control" v-model="user.email">
									</div>
									<button class="btn btn-success" @click="submit">Submit</button>
								</div>
							</div>
            </div>
            <div class="col-md-6">
              <div class="panel panel-success">
								<div class="panel-heading">
									<h2 class="panel-title">Get Data from Firebase</h2>
								</div>
								<div class="panel-body">
		              <ul class="list-group">
		              	<li class="list-group-item" v-for="u in users">{{ u.username }} - {{ u.email }}</li>
		              </ul>
              	</div>
              	<div class="panel-footer">
              		<button class="btn btn-success" @click="fetchData">Get Users</button>
              	</div>
              </div>
						</div>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				username: '',
				email: ''
			},
			// empty array for getting (get request) our users
			users: [],
			resource: {}
		};
	},
	methods: {
		submit() {
			// console.log(this.user);
			// With Firebase needs a node and a second argument for data being passed in (here data will be called users)
			// Second argument here is the data we want to send in this post request (in get request 2nd arg is not needed)
			// this.$http.post('users.json', this.user)
			// 	// Promise (get back data in the future --async)
			// 	.then(response => {
			// 		console.log(response);
			// 	},	error => {
			// 		console.log(error);
			// 	});

			// https://github.com/pagekit/vue-resource/blob/develop/docs/resource.md
			// DEFAULT ACTIONS:
														// get: {method: 'GET'},
														// save: {method: 'POST'},
														// query: {method: 'GET'},
														// update: {method: 'PUT'},
														// remove: {method: 'DELETE'},
														// delete: {method: 'DELETE'}
			// this.resource.save({}, this.user);
			this.resource.saveAlt(this.user);
		},
		fetchData() {
			// url is set with 'root' key option in main.js
			this.$http.get('users.json')
				.then(response => {
					return response.json();
				})
				.then(users => {
					// console.log(users)
					const resultArray = [];
					for (let key in users) {
						resultArray.push(users[key]);
					}
					this.users = resultArray;
				});
		}
	},
	created() {
		const customActions = {
			saveAlt: {method: 'POST', url: 'alternative.json'}
		}
		this.resource = this.$resource('users.json', {}, customActions);
	}
}
</script>

<style>
</style>
