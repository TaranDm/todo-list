<template>

       <div class="modal">
           <div class="modal" ref="modal" @click="modalCloses" >
<!--               <v-card>-->
<!--                   <v-card-title class="headline grey lighten-2">-->
<!--                       Privacy Policy-->
<!--                   </v-card-title>-->
               <div class="modal__wrapper">
                   <form @submit.prevent @submit="onSubmit">
<!--                       <label for="name">Добавьте пользователя:</label>-->
<!--                       <input  type="text" id="name" name="name"-->
<!--                               v-model = "personName"-->
<!--                               placeholder="Ввдите имя пользователя"-->
<!--                               :disabled="mode === 'show'"-->
<!--                       >-->
                       <v-text-field
                               label="Name"
                               type="text" id="name" name="name"
                               v-model = "personName"
                               :disabled="mode === 'show'"
                       ></v-text-field>
                       <v-text-field
                               label="Email"
                               type="text" id="email" name="email"
                               v-model = "personEmail"
                               placeholder="Ввдите email пользователя"
                               :disabled="mode === 'show'"
                       ></v-text-field>

                       <div class="control">
                           <button type="submit" v-if="mode === 'add'">Добавить</button>
                           <button type="submit" v-if="mode === 'edit'">Редактировать</button>
                           <button ref="closeBtn" type="button" @click="modalCloses">Закрыть</button>
                       </div>
                   </form>
               </div>
<!--               </v-card>-->
           </div>
       </div>

</template>

<script>
    // import db from "../firebase/firebase";
    export default {
        props : ['users', 'mode', 'id'],
        name: "Modal",
        data(props) {
            const {users, mode, id} = props;
            const user =  users.find(user => user.id === id);

            const currentItem = (mode === 'show') || (mode === 'edit') ? {
                personName: user.fio,
                personEmail: user.email,
            } : {
                personName: '',
                personEmail: '',
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
                    if (this.personName === '' || this.personEmail === '' ) {
                        // eslint-disable-next-line
                        alert('please fill in the field');
                    } else {
                        const user = {
                            fio: this.personName,
                            email: this.personEmail,
                        }
                        if(this.id) {
                            user.id = this.id;
                        }
                        this.$store.dispatch(this.mode === 'add' ? 'addUser' : 'editUser', user)
                        .then(()=>{
                            console.log('after addPerson');
                            this.$emit("ModalClose")
                        })
                    }

                },
            }
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