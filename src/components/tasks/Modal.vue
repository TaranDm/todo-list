<template>

       <div class="modal">
           <div class="modal" ref="modal" @click="modalCloses" >
               <div class="modal__wrapper">
                   <form @submit.prevent @submit="onSubmit" novalidate>
                       <v-text-field
                               label="Title"
                               type="text"
                               id="task_title"
                               v-model = "task_title"

                               :error-messages="titleErrors"
                               placeholder="Title"
                               required
                               :disabled="mode === 'show'"
                               @input="$v.task_title.$touch()"
                               @blur="$v.task_title.$touch()"
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

                               :error-messages="selectedUserErrors"
                               required
                               @change="$v.selectedUser.$touch()"
                               @blur="$v.selectedUser.$touch()"
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
    import {mapGetters} from "vuex";
    import Vue from 'vue';
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)
    const { required, maxLength, } = require('vuelidate/lib/validators')
    export default {
        props : ['tasks', 'mode', 'id'],
        name: "Modal",
        validations: {
            task_title: { required, maxLength: maxLength(50) },
            // task_description: { required, },
            selectedUser: {
                id: { required },
            }

        },
        data(props) {

            const {tasks, mode, id} = props;
            const task =  tasks.find(task => task.task_id === id);
            const user =  task && this.$store.state.users.users.find(user => user.id === task.task_person_id);

            const currentItem = (mode === 'show') || (mode === 'edit') ? {
                task_title: task.task_title,
                task_description: task.task_description,
                selectedUser: {fio: user.fio, id: user.id},
            } : {
                task_title: '',
                task_description: '',
                selectedUser: {fio: '', id: 0},
            }
            return {
                ...currentItem,

            };
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
                    this.$v.$touch();
                    if (!this.$v.$invalid) {
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
            titleErrors () {
                const errors = []
                if (!this.$v.task_title.$dirty) return errors
                !this.$v.task_title.maxLength && errors.push('Title must be at most 5 characters long')
                !this.$v.task_title.required && errors.push('Title is required.')
                return errors
            },
            selectedUserErrors () {
                const errors = []
                console.log('this.$v.selectedUser', this.$v.selectedUser);
                if (!this.$v.selectedUser.$dirty) return errors
                !this.$v.selectedUser.required && errors.push('User is required.')
                return errors
            },
            // Errors () {
            //     const errors = []
            //     if (!this.$v.task_title.$dirty) return errors
            //     !this.$v.task_title.maxLength && errors.push('Name must be at most 5 characters long')
            //     !this.$v.task_title.required && errors.push('Name is required.')
            //     return errors
            // },

            // emailErrors () {
            //     const errors = []
            //     if (!this.$v.personEmail.$dirty) return errors
            //     !this.$v.personEmail.email && errors.push('Must be valid e-mail')
            //     !this.$v.personEmail.required && errors.push('E-mail is required')
            //     return errors
            // },
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