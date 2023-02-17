<template>
  
    <div>
        <form @submit.prevent="sendFunction">
                <div class="row">
                    <div class="col-11">
                        <input type="text" placeholder="Text messages" class="form-control" v-model="message">
                    </div>
                    <div class="col-1">
                        <button class="btn btn-primary">
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
        </form>
    </div>

</template>

<script>
import { timestamp } from '../firebase/config'
import {ref} from 'vue'
import newChat from '../composables/newChat'
export default {

    props : ['fromid','toid'],
    setup(props){

        let fromid = props.fromid;
        let toid = props.toid;

        let message = ref('');
        let chatRoomId = ref(fromid+toid);
        let {createChat,error} = newChat();

        let sendFunction = async()=>{
            
            let chat = ref({
                chatRoomId : chatRoomId.value,
                senderId : fromid,
                receiverId : toid,
                message : message.value,
                sendTime : timestamp
            })
            console.log(chat.value);
            
            await createChat(chat.value);

            message.value = '';
    
        }
        

        return {sendFunction,message}
    }


}
</script>

<style>

</style>