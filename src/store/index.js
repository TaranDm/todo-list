import Vue from 'vue'
import Vuex from 'vuex'

import users from "./modules/users";
import tasks from "./modules/tasks";
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
      users,
      tasks,
  }
})
