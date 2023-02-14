<template>
    <div>
    <h3 class="text-center pt-3">Login to your account </h3>
            <form class="p-4" @submit.prevent="loginForm">
                <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{{ error }}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="mb-3">
                    <label class="mb-1">Email</label>
                    <input type="text" class="form-control" placeholder="Enter your Email" v-model="email">
                </div>
                <div class="mb-3">
                    <label class="mb-1">Password</label>
                    <input type="text" class="form-control" placeholder="Enter your Password" v-model="password">
                </div>
                <div class="d-grid">
                    <button class="btn btn-info">Login</button>
                </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import useLogin from '../composables/useLogin'
import getUser from '../composables/getUser';
export default {
    setup(props,context){

        let email = ref('');
        let password = ref('');
        let {error,loginReq} = useLogin();
        let {user} = getUser();

        let loginForm = async()=>{
        
            let res = await loginReq(email.value,password.value)
            if(res){
                let userId = user.value.uid;
                context.emit('enterChatRoom',userId);
            }else{
                console.log(error);
            }

        }

        return {loginForm,email,password,error}
    }
}
</script>

<style>

</style>