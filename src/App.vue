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
		              	<li class="list-group-item" v-for="(u, index) in users" :key="u.key">
		              		{{ u.username }} - {{ u.email }} <button class="glyphicon glyphicon-trash btn btn-danger" @click="deleteUsers(index, u.key)"></button>
		              	</li>
		              </ul>
              	</div>
              	<div class="panel-footer">
              		<div class="form-group">
									  <label for="selectThis">Choose type:</label>
									  <select class="form-control" id="selectThis" v-model="node">
									    <option>users</option>
									    <option>alternative</option>
									  </select>
									</div>
              		<button class="btn btn-success" @click="fetchUsers">Get Users</button>
              		<!-- <button class="btn btn-danger" @click="deleteUsers(u)">Delete ALL Users</button> -->
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
				key: '',
				username: '',
				email: ''
			},
			// empty array for getting (get request) our users
			users: [],
			resource: {},
			// node will be users by default but can be altered
			node: 'users'
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
			this.resource.save({node: 'users'}, this.user);
			// this.resource.saveAlt(this.user);
		},
		fetchUsers() {
			// url is set with 'root' key option in main.js
			// this.$http.get('users.json')
			// 	.then(response => {
			// 		return response.json();
			// 	})
			// 	.then(users => {
			// 		// console.log(users)
			// 		const resultArray = [];
			// 		for (let key in users) {
			// 			resultArray.push(users[key]);
			// 		}
			// 		this.users = resultArray;
			// 	});

			// this.node is getting passed in from our select form
			this.resource.getUsers({node: this.node})
				.then(response => {
					return response.json();
				})
				.then(users => {
					// console.log(users);

					//  IMPORTANT!!!
					// this is needed so that we will have a key for the Firebase object that allows us to use it when deleting a user
					let resultArray = Object.entries(users).map(e => Object.assign(e[1], { key: e[0] }));

					this.users = resultArray;
					// console.log(resultArray);
				});
		},
		deleteUsers(index, key) {
			// pass in key which is the Firebase object key/id and use it in the delete request url
      this.resource.deleteUser({node: 'users/' + key})
       	.then(response => {
       		// this removes the user from the DOM using the index
      		this.$delete(this.users, index);
      		this.$toastr('success', 'You have deleted that user.', 'User Deleted!');
      	});
		}
	},
	created() {
		const customActions = {
			saveAlt: {method: 'POST', url: 'alternative.json'},
			getUsers: {method: 'GET'},
			deleteUser: {method: 'DELETE'}
		}
		// pass in {node} variable
		this.resource = this.$resource('{node}.json', {}, customActions);
	}
}
</script>

<style>
</style>
