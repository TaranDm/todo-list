<template>

  <div class="home">
          <v-btn color="primary"
                 class="btn"
                 @click="addUser"
          >
              Add user
          </v-btn>
          <Modal
                  :users = users
                  :mode = mode
                  :id = currentItemId
                  v-if="isNewPersonOpened"
                  @ModalClose = "modalAddTogle"
          />
      <modal-delete
              v-if="modalDeleteOpen"
              @ModalDeleteClose = "modalDeleteTogle"
              @ModalDeleteConfirmed = "deleteUser"

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
              :items="users"
              :items-per-page="5"
              class="elevation-1"
              :search="search"
              :loading = "usersLoading"
              loading-text="Loading... Please wait"
      >
<!--          <template v-slot:item="{ item }">-->
<!--              <tr>-->
<!--                  <td>{{ item.id }}</td>-->
<!--                  <td>{{ item.fio }}</td>-->
<!--                  <td>{{ item.email }}</td>-->
<!--              </tr>-->
<!--          </template>-->
          <template v-slot:item.actions="item" v-key="'actions-for-'+item.item.id">
              <v-icon @click="editUser(item.item.id)"
                      small
                      class="mr-2"

              >
                  mdi-pencil
              </v-icon>
              <v-icon @click="showUser(item.item.id)"
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
import ModalDelete from "../components/Modal-delete"
 import Modal from "../components/Modal";
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
      Modal,
       ModalDelete


  },
    data() {
        return {
            modalDeleteOpen: false,
            isNewPersonOpened: false,
            dialogDelete: true,
            searchQuery: "",
            search: "",

            headers: [
                { text: 'ID', value: 'id',
                    align: 'start',
                    sortable: true,
                },
                { text: 'FIO', value: 'fio' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            footer: {


            },
            mode: null,
            currentItem: null,
            currentItemId: null,
        }
    },
    created() {
        // this.getUsers();
        console.log('created')
        this.$store.dispatch('getUsers');
    },
    methods: {
      ...mapActions (['removeUser']),
        showUser(id) {
            this.mode = 'show';
            this.currentItemId = id;
            this.modalAddTogle();
        },
        editUser(id) {
            this.mode = 'edit';
            this.currentItemId = id;
            this.modalAddTogle();
        },
        addUser() {
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
          //   this.$store.dispatch('getUsers', item.id);
           this.modalDeleteOpen = !this.modalDeleteOpen
        },
        //удаление user
        deleteUser() {
            this.$store.dispatch('removeUser', this.currentItem.id)
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
            'users',
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
