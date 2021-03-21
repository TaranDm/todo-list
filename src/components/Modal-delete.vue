<template>
    <div class="modal" @click="ModalDeleteClose">
        <div class="modal" ref="modal">
            <div class="modal__wrapper">
                <h2> Do you want to delete a user: ?</h2>
                <div class="button-block">
                    <button ref="confirm" @click="ModalDeleteConfirmed">Yes</button>
                    <button ref="close" @click="ModalDeleteClose">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import {mapActions} from 'vuex'
    export default {
        name: "Modal-delete",
        props: ['modalDeleteOpen'],
        data(){
            return {
            }
        },
        methods: {
            // ...mapActions (['removeUser']),
            ModalDeleteClose(evt) {
                evt.stopPropagation();
                if(evt.target === this.$refs.modal || evt.target === this.$refs.close){
                    this.$emit("ModalDeleteClose")
                }
            },
            ModalDeleteConfirmed(evt){
                evt.stopPropagation();
                if(evt.target === this.$refs.confirm){
                    this.$emit("ModalDeleteConfirmed")
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
        h2 {
            font-size: 24px;
            font-weight: 500;
        ;
        }
        .button-block {
            display: flex;
            justify-content: space-around;
            margin-top: 42px;
        }
        button {
            background: #464646;
            color: white;
            padding: 6px 20px;
            width: min-content;
            align-self: flex-end;
            border: none;
            border-radius: 10px;
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);

        }
        &__wrapper {
            max-width: 500px;
            border-radius: 8px;
            width: 80%;
            padding: 20px;
            background-color: #9c9c9c;
            display: flex;
            flex-direction: column;
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);
        }

        }

</style>