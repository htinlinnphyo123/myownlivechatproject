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
import {onUpdated, ref , watch } from 'vue'
import newChat from '../composables/newChat'
import { useRoute } from 'vue-router'
export default {

    props : ['fromid','toid'],
    setup(props){

        let fromid = props.fromid;
        let route = useRoute();
        let toid = ref(props.toid);

        let message = ref('');
        let {createChat,error} = newChat();

        console.log(toid.value)

        watch(route,()=>{
            toid.value = route.params.toid;
        })


        let sendFunction = async()=>{

            if(message.value!==''){
                
                let chat = ref({
                chatRoomId : fromid+toid.value,
                senderId : fromid,
                receiverId : toid.value,
                message : message.value,
                sendTime : timestamp
                })
                await createChat(chat.value);

                message.value = '';
            
            }
    
        }
        

        return {sendFunction,message}
    }


}
</script>

<style>

</style>