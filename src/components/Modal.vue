<template>

    <div class="modal">
        <div class="modal" ref="modal" @click="modalCloses">
            <div class="modal__wrapper">
                <form @submit.prevent @submit="onSubmit" novalidate>

                    <v-text-field
                            label="Name"
                            :error-messages="nameErrors"
                            required
                            type="text" id="name" name="name"
                            v-model="personName"
                            :disabled="mode === 'show'"
                            @input="$v.personName.$touch()"
                            @blur="$v.personName.$touch()"
                    ></v-text-field>
                    <v-text-field
                            label="Email"
                            required
                            :error-messages="emailErrors"
                            type="text" id="email" name="email"
                            v-model="personEmail"
                            placeholder="Ввдите email пользователя"
                            :disabled="mode === 'show'"
                            @input="$v.personEmail.$touch()"
                            @blur="$v.personEmail.$touch()"
                    ></v-text-field>

                    <div class="control">
                        <button type="submit" v-if="mode === 'add'">Добавить</button>
                        <button type="submit" v-if="mode === 'edit'">Редактировать</button>
                        <button ref="closeBtn" type="button" @click="modalCloses">Закрыть</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import Vuelidate from 'vuelidate'

    Vue.use(Vuelidate)
    const {required, maxLength, email} = require('vuelidate/lib/validators')
    export default {
        props: ['users', 'mode', 'id'],
        name: "Modal",
        validations: {
            personName: {required, maxLength: maxLength(255)},
            personEmail: {required, email},
        },
        data(props) {
            const {users, mode, id} = props;
            const user = users.find(user => user.id === id);

            const currentItem = (mode === 'show') || (mode === 'edit') ? {
                personName: user.fio,
                personEmail: user.email,
            } : {
                personName: '',
                personEmail: '',
            }
            return {
                ...currentItem,
            }

        },
        computed: {
            nameErrors() {
                const errors = []
                if (!this.$v.personName.$dirty) return errors
                !this.$v.personName.maxLength && errors.push('Name must be at most 10 characters long')
                !this.$v.personName.required && errors.push('Name is required.')
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.personEmail.$dirty) return errors
                !this.$v.personEmail.email && errors.push('Must be valid e-mail')
                !this.$v.personEmail.required && errors.push('E-mail is required')
                return errors
            },
        },
        methods: {
            modalCloses(evt) {
                evt.stopPropagation();

                if (evt.target === this.$refs.modal || evt.target === this.$refs.closeBtn) {
                    this.$emit("ModalClose")
                }
            },
            // добавление нового пользователя
            onSubmit(e) {
                e.stopPropagation();
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    const user = {
                        fio: this.personName,
                        email: this.personEmail,
                    }
                    if (this.id) {
                        user.id = this.id;
                    }
                    this.$store.dispatch(this.mode === 'add' ? 'addUser' : 'editUser', user)
                        .then(() => {
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