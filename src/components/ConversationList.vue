<template>

    <div class="chat-window text-dark">
        <div v-if="!readyForChat">
          <div class="card" aria-hidden="true">
            <div class="card-body">
              <span class="card-text placeholder-glow">
                <p class="placeholder col-5 d-inline-block rounded-3 p-3 mb-4"></p>
                <p class="placeholder col-6 d-inline-block rounded-3 p-3 mb-4 offset-md-7"></p>
                <p class="placeholder col-3 d-inline-block rounded-3 p-3 mb-4"></p>
                <p class="placeholder col-4 d-inline-block rounded-3 p-3 mb-4 offset-md-7"></p>
                <p class="placeholder col-3 d-inline-block rounded-3 p-3 mb-4"></p>
                <p class="placeholder col-6 d-inline-block rounded-3 p-3 mb-4 offset-md-7"></p>
                <p class="placeholder col-4 d-inline-block rounded-3 p-3 mb-4"></p>
                <p class="placeholder col-5 d-inline-block rounded-3 p-3 mb-4 offset-md-7"></p>
                <p class="placeholder col-4 d-inline-block rounded-3 p-3 mb-4"></p>
                <p class="placeholder col-3 d-inline-block rounded-3 p-3 mb-4 offset-md-7"></p>
              </span>
            </div>
          </div>
        </div>

        <div v-else-if="readyForChat" class="messages" ref="msgContainer">
            <div v-if="formattedMessage.length>0" >
              <div class="single"  v-for="message in formattedMessage" :key="message.id">
                <div :class="{'isUser':message.isUser}">
                  <span class="created-at">{{ message.sendTime }}</span>
                  <span @click="clickFun" class="message">{{ message.message }}</span>
                </div>
              </div>
            </div>
            <div v-else class="my-5">
              <p class="h2 text-center text-dark">Start a chat with this friend.</p>
            </div>
        </div>
    </div>

</template>

<script>
import getMessage from '../composables/getMessage';
import { useRoute } from 'vue-router';
import { ref,watch,computed,onUpdated } from 'vue';

export default {

    props : ['fromid','toid'],
    setup(props){

        let route = useRoute();
        let toid = ref(route.params.toid);
        let readyForChat = ref(false);

        setTimeout(()=>{
          readyForChat.value = true;
        },1000)


        //to watch route change
        watch(route,()=>{
            toid.value = route.params.toid;
            messageReq(props.fromid,toid.value);

        })

        let {error,messageReq,messages} = getMessage();

        messageReq(props.fromid,toid.value);

        let sortedMessage = computed(()=>{
          return messages.value.sort((a,b)=>{
            return a.sendTime - b.sendTime
          })
        })
        
        let formattedMessage = computed(()=>{
          return sortedMessage.value.map((msg)=>{
            let showTime = ref(true);
            let formatDate = msg.sendTime.toDate();
              return {...msg,sendTime:formatDate,showTime:showTime.value} 
          })
        })

        let msgContainer = ref(null)

        onUpdated(()=>{
          msgContainer.value.scrollTop = msgContainer.value.scrollHeight;
        
        })  


        //show time function
        let clickFun = (event)=>{
          event.target.parentElement.querySelector('.created-at').classList.toggle('showTime')
        }


        return {messages,formattedMessage,clickFun,msgContainer,readyForChat}
    }


}
</script>

<style>
     .chat-window{
        width:100%;
        /* padding:0 10px; */
      }
      .messages{
        height:519.9px;
        overflow-y:scroll;
        padding:0 10px;
        background-color:#fff;
      }
      .single {
        margin:5px 0;
        padding:10px 0;
      }
      .created-at {
        display: none;
        color: #999;
        font-size: 12px;
        text-align:center;
        margin-bottom: 4px;
      }
      .showTime{
        display:block;
      }
      .name {
        display:block;
        font-weight: bold;
        margin-right: 6px;
      }
      .message{
        display:inline-block;
        max-width:200px;
        padding:10px;
        border-radius:10px;
        background-color:#eee;
        color:#000;
        cursor:pointer;
        text-align:left;
      }
      .isUser{
        text-align:right;
      }
      .isUser .message{
        background-color:steelblue;
        color:#fff;
      }
</style>