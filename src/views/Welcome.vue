<template>
    
    <div class="pt-5 body-container">
        <div class="shadow-sm rounded-5 welcome-container">
            <div v-if="!loginStatus">
                <Register @enterChatRoom="enterChatRoom"></Register>
                <p class="text-center pb-2">Already have an account ? <a class="statusChange" @click="loginStatus=!loginStatus">login here</a> </p>
            </div>
            <div v-if="loginStatus">
                <Login @enterChatRoom="enterChatRoom"></Login>
                <p class="text-center pb-2">You don't have an account <a class="statusChange" @click="loginStatus=!loginStatus">Register here</a> </p>
            </div>
        </div>
    </div>

</template>

<script>
import Register from '@/components/Register.vue';
import Login from '../components/Login.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: { Register,Login },

    setup(){

        let loginStatus = ref(true);
        let route = useRouter();

        let enterChatRoom = (ids)=>{
            route.push({name:'ChatRoom',params:{id:ids}})
        }

        return {loginStatus,enterChatRoom}
    }

}
</script>

<style scoped>
.body-container{
    height:100vh;
    background-color:#f4f4f4;
}
.welcome-container{
    width:700px;
    margin:0 auto;
    background-color:#fff;
}
input[type=checkbox]{
    cursor:pointer;
}
.statusChange{
    text-decoration:underline;
    cursor:pointer;
}

</style>