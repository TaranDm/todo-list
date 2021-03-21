<template>
  <div class="about">
      <v-btn color="primary"
             class="btn"
             @click="addTask"
             v-if="!usersLoading"
      >
          Add task
      </v-btn>
      <Modal
              :tasks = tasks
              :mode = mode
              :id = currentItemId
              v-if="isNewPersonOpened"
              @ModalClose = "modalAddTogle"
      />
      <modal-delete
              v-if="modalDeleteOpen"
              @ModalDeleteClose = "modalDeleteTogle"
              @ModalDeleteConfirmed = "deleteTask"

      />
      <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
      ></v-text-field>
      <v-data-table
              :headers="headers"
              :items="tasks"
              :items-per-page="5"
              class="elevation-1"
              :search="search"
              :loading = "tasksLoading"
              loading-text="Loading... Please wait"
      >
          <template v-slot:item.actions="item" v-key="'actions-for-'+item.item.task_id">
              <v-icon @click="editTask(item.item.task_id)"
                      small
                      class="mr-2"

              >
                  mdi-pencil
              </v-icon>
              <v-icon @click="showTask(item.item.task_id)"
                      small
                      class="mr-2"

              >
                  mdi-eye
              </v-icon>
              <v-icon @click="modalDeleteTogle(item.item)"
                      small
              >
                  mdi-delete
              </v-icon>
          </template>
          <template v-slot:no-data>
              <v-btn
                      color="primary"
              >
                  Reset
              </v-btn>
          </template>
      </v-data-table>
  </div>
</template>

<script>
    import ModalDelete from "../components/tasks/Modal-delete"
    import Modal from "../components/tasks/Modal";
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'Home',
        components: {
            Modal,
            ModalDelete,
        },
        data() {
            return {
                modalDeleteOpen: false,
                isNewPersonOpened: false,
                dialogDelete: true,
                searchQuery: "",
                search: "",
                headers: [
                    { text: 'ID', value: 'task_id',
                        align: 'start',
                        sortable: true,
                    },
                    { text: 'User ID', value: 'task_person_id' },
                    { text: 'Title', value: 'task_title' },
                    { text: 'Description', value: 'task_description' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                footer: {},
                mode: null,
                currentItem: null,
                currentItemId: null,
            }
        },
        created() {
            console.log('created')
            this.$store.dispatch('getUsers');
            this.$store.dispatch('getTasks');
        },
        methods: {
            ...mapActions (['removeTask']),
            showTask(id) {
                this.mode = 'show';
                this.currentItemId = id;
                this.modalAddTogle();
            },
            editTask(id) {
                this.mode = 'edit';
                this.currentItemId = id;
                this.modalAddTogle();
            },
            addTask() {
                this.mode = 'add';
                this.modalAddTogle();
            },
            modalAddTogle() {
                this.isNewPersonOpened = !this.isNewPersonOpened
            },
//открытие модалки
            modalDeleteTogle(item = null) {
                if (item) {
                    this.currentItem = item;
                }
                this.modalDeleteOpen = !this.modalDeleteOpen
            },
//удаление user
            deleteTask() {
                this.$store.dispatch('removeTask', this.currentItem.task_id)
                    .then(()=>{
                        this.modalDeleteTogle();
                    });
            },

//     // вариант с promise
// //     async function getArr (resolve) {
// //        resolve(db.collection("users").get())
// //     }
// //     getArr().then(response => {
// //         response.forEach(doc => {
// //                 this.users.push(doc.data());
// //         });
// //         console.log('this.users', this.users)
// //     }).catch(err => {
// //                 console.log("Error getting documents", err);
// //             });
//  }
        },
        computed: {
            ...mapGetters([
                'tasks',
                'tasksLoading',
                'usersLoading',
            ]),
        },

    }
</script>

<style scoped lang="scss">
    .home {
        display: flex;
        flex-direction: column;
    }
    .btn {
        color: #fff;
        width: min-content;
        background-color: #2656ce!important;
        align-self: flex-end;
    }

</style>
