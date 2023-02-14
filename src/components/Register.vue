<template>
  <div>
    <h3 class="text-center pt-3">Register your account</h3>
            <form class="p-4" @submit.prevent="registerForm">
                <div v-if="error">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>{{ error }}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="mb-1">UserName</label>
                    <input type="text" class="form-control" placeholder="Enter your username" v-model="displayName">
                </div>
                <div class="mb-3">
                    <label class="mb-1">Email</label>
                    <input type="text" class="form-control" placeholder="Enter your Email" v-model="email">
                </div>
                <div class="mb-4">
                    <label class="mb-1">Password</label>
                    <input type="text" class="form-control" placeholder="Enter your Password" v-model="password">
                </div>
                <div class="upload-btn-wrapper mb-3 d-grid">
                    <button class="btns"><span class="d-block display-5">+</span><span>Upload your photo</span></button>
                    <input type="file" name="myfile" v-on:change="handleProfilePic"/>
                </div>
                <div class="mb-3">
                    <input type="checkbox" class="form-check-input">
                    <label class="px-2">You must agree to the terms and conditions.</label>
                </div>
                <div class="d-grid">
                    <button class="btn btn-info">Register</button>
                </div>
            </form>
  </div>
</template>

<script>

import { ref } from 'vue'
import createUser from '../composables/createUser';
import getUser from '@/composables/getUser'
import createUserCollection from '../composables/createUserCollection'

export default {

    setup(props,context){

        let displayName = ref('');
        let email = ref('');
        let password = ref('');
        let userProfile = ref('');
        let {error,create} = createUser();
        let {user} = getUser();
        let {errorForDb,createCollection} = createUserCollection();


        let handleProfilePic = (e)=>{
            let photoName = e.target.files[0].name
            let number = Math.floor(Math.random()*10000000);
            userProfile.value = number+photoName;
        }
        
        let registerForm = async()=>{

            let res = await create(email.value,password.value,displayName.value,userProfile.value)
            if(res){
                let userId = user.value.uid;

                let userObj = {
                    user_id :userId,
                    email : user.value.email,
                    displayName : displayName.value,
                    photoURL : userProfile.value
                }

                await createCollection(userObj);
                

                context.emit('enterChatRoom',userId);
                

            }else{
                console.log(error)
            }
            
        }



        return {displayName,email,password,registerForm,handleProfilePic,error}
    }

}
</script>

<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btns {
    border: 2px solid grey;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>