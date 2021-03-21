<template>

       <div class="modal">
           <div class="modal" ref="modal" @click="modalCloses" >
               <div class="modal__wrapper">
                   <form @submit.prevent @submit="onSubmit">
                       <v-text-field
                               label="Title"
                               type="text"
                               id="task_title"
                               name="name"
                               v-model = "task_title"
                               placeholder="Title"
                               :disabled="mode === 'show'"
                       ></v-text-field>
                       <v-select
                               v-model="selectedUser"
                               :hint="`${selectedUser.fio}`"
                               :items="users"
                               label="User"
                               item-text="fio"
                               item-value="id"
                               persistent-hint
                               return-object
                               single-line
                               :disabled="mode === 'show'"
                       ></v-select>
                       <v-textarea
                               label="Description"
                               id="task_description"
                               name="task_description"
                               v-model = "task_description"
                               placeholder="Description"
                               :disabled="mode === 'show'"

                       ></v-textarea>


                       <div class="control">
                           <button type="submit" v-if="mode === 'add'">Create</button>
                           <button type="submit" v-if="mode === 'edit'">Update</button>
                           <button ref="closeBtn" type="button" @click="modalCloses">Close</button>
                       </div>
                   </form>
               </div>
           </div>
       </div>

</template>

<script>
    // import db from "../firebase/firebase";
    import {mapGetters} from "vuex";

    export default {
        props : ['tasks', 'mode', 'id'],
        name: "Modal",
        data(props) {
            console.log('this.$store.state.users.users', this.$store.state.users.users);
            const {tasks, mode, id} = props;
            const task =  tasks.find(task => task.task_id === id);
            const user =  task && this.$store.state.users.users.find(user => user.id === task.task_person_id);
            console.log('task', task);
            console.log('user', user)
            const currentItem = (mode === 'show') || (mode === 'edit') ? {
                task_title: task.task_title,
                task_description: task.task_description,
                selectedUser: {fio: user.fio, id: user.id},
            } : {
                task_title: '',
                task_description: '',
                selectedUser: {fio: '', id: 0},
            }
            return currentItem;
        },
        methods: {
            modalCloses(evt) {
                evt.stopPropagation();

                if(evt.target === this.$refs.modal || evt.target === this.$refs.closeBtn){
                    this.$emit("ModalClose")
                }
            },
            // добавление нового пользователя
            onSubmit(e) {
                    e.stopPropagation();
                    if (this.task_title === '' || this.personEmail === '' ) {
                        // eslint-disable-next-line
                        alert('please fill in the field');
                    } else {
                        const task = {
                            task_title: this.task_title,
                            task_person_id: this.selectedUser.id,
                            task_description : this.task_description,
                        }
                        if(this.id) {
                            task.task_id = this.id;
                        }
                        this.$store.dispatch(this.mode === 'add' ? 'addTask' : 'editTask', task)
                        .then(()=>{
                            this.$emit("ModalClose")
                        })
                    }

                },
            },
        computed: {
            ...mapGetters([
                'users',
            ]),
        },
    }
</script>

<style scoped lang="scss">
    .modal {
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        label {

        }
        /*.control {*/
        /*    display: flex;*/
        /*    justify-content: space-between;*/
        /*}*/
        button {
            background: #464646;
            color: white;
            padding: 6px 20px;
            width: min-content;
            align-self: flex-end;
            border: none;
            border-radius: 10px;
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);
            margin-right: 10px;
        }
        &__wrapper {
            max-width: 500px;
            border-radius: 8px;
            width: 80%;
            padding: 20px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);
        }
        input {
            color: #fff;
            border: none;
            background-color: transparent;
            width: 100%;
            padding: 6px 4px;
            margin: 10px 0 20px;
            &:focus {
                outline: none;
            }
        }
    }
</style>