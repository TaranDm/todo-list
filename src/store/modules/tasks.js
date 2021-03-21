import db from "../../firebase/firebase";

export default {
    state: {
        tasks:[],
        loading : true,
    },
    mutations: {
        GET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        SET_TASKS_LOADING(state, loading) {
            state.loading = loading;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        EDIT_TASK(state, task) {
            const index = state.tasks.map(o => o.task_id).indexOf(task.task_id);
            state.tasks.splice(index, 1, task);
        },
        DELETE_TASK(state, id) {
            const index = state.tasks.findIndex((task) => task.task_id === id);
            state.tasks.splice(index, 1);
        }
    },
    actions: {
        async addTask({commit}, task) {
            const task_id = this.state.tasks.tasks.length > 0 ?
                Math.max.apply(Math, this.state.tasks.tasks.map(task => task.task_id)) + 1 : 1;

            db.collection('tasks').doc()
                .set({...task, task_id})
                .then(response => {
                    console.log('response', response)
                    commit('ADD_TASK', {...task, task_id});
                    return response;
                }).catch(e => {
                console.log('error', e)
            });
        },
        async editTask({commit}, task) {
            db.collection('tasks').where('task_id','==', task.task_id)
                .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.update(task).then(() => commit('EDIT_TASK', task));
                });
            });
        },
        //удаление task
        removeTask({ commit }, id) {
            db.collection('tasks').where('task_id','==', id)
                .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete().then(() => commit('DELETE_TASK', id));
                });
            });
        },
        getTasks({commit}) {
              const tasks = [];
              db.collection("tasks").get().then(response => {
                    response.forEach(doc => {
                            tasks.push(doc.data());
                    });
                    commit('GET_TASKS', tasks);
                    commit('SET_TASKS_LOADING', false)
                }).catch(err => {
                    console.log("Error getting documents", err);
                });
        }
    },
    getters: {
        tasks(state) {
            return state.tasks;
        },
        tasksLoading(state) {
            return state.loading;
        },
    },
};