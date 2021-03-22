import db from "../../firebase/firebase";

export default {
    state: {
        users:[],
        loading : true,
        counter: null,
    },
    mutations: {
        GET_USERS(state, users) {
            console.log('GET_USERS users', state.users);
            state.counter = 1;
            state.users = users;
        },
        SET_USERS_LOADING(state, loading) {
            state.loading = loading;
        },
        ADD_USER(state, user) {
            state.users.push(user);
        },
        EDIT_USER(state, user) {
            const index = state.users.map(o => o.id).indexOf(user.id);
            state.users.splice(index, 1, user);
        },
        DELETE_USER(state, id) {
            const index = state.users.findIndex((user) => user.id === id);
            state.users.splice(index, 1)

        },
    },
    actions: {
        async addUser({commit}, user) {
            const id = this.state.users.users.length > 0 ?
                Math.max.apply(Math, this.state.users.users.map(user => user.id)) + 1 : 1;
            console.log('addUser', user);
            db.collection('users').doc()
                .set({...user, id})
                .then((response) => {
                    commit('ADD_USER', {...user, id});
                    return response;
                }).catch(e => {
                console.log('error', e)
            });
        },
        async editUser({commit}, user) {
            db.collection('users').where('id','==', user.id)
                .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.update(user).then(() => commit('EDIT_USER', user));
                });
            });
        },
        //удаление user
        removeUser({ commit }, id) {
            db.collection('users').where('id','==', id)
                .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete().then(() => commit('DELETE_USER', id));

                    db.collection("tasks").get().then(response => {
                        response.forEach(doc => {
                            if(doc.data().task_person_id === id)
                            doc.ref.delete();
                        });
                    }).catch(err => {
                        console.log("Error getting documents", err);
                    });
                });
            });
        },
        getUsers({commit}) {
            const users = [];
            db.collection("users").get().then(response => {
                response.forEach(doc => {
                    users.push(doc.data());
                });
                commit('GET_USERS', users);
                commit('SET_USERS_LOADING', false)
            }).catch(err => {
                console.log("Error getting documents", err);
            });
        }
    },
    getters: {
        users(state) {
            return state.users;
        },
        usersLoading(state) {
            return state.loading;
        },
    },
};