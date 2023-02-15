<template>
  
    <div class="">
        <div class="d-flex justify-content-between pt-3">
            <div>
                <h3 class="p-0 m-0 titles">Chat</h3>
                <small class="p-0">{{ user.email }}</small>
            </div>
            <div>
                <i class="fa-solid fa-pen-to-square icons"></i>
                <i class="fa-solid fa-right-from-bracket icons" @click="signOutFun"></i>
            </div>
        </div>
        <div class="mt-3">
            <input type="text" style="font-family:Arial,'Font Awesome 6 Free'" placeholder=" &#xf002; Search Messenger" class="fas fa-search w-100 searchs">
        </div>
    </div>


</template>

<script>
import useSignout from '../composables/useSignout'
import {auth} from '../firebase/config'

export default {

    setup(){
        let {error,signoutReq} = useSignout();
        
        let user = auth.currentUser;

        let signOutFun = ()=>{

            let signout = signoutReq();
            if(signout){
                console.log('user logout out')
            }

        }


        return {signOutFun,user}
    }

}
</script>

<style>
.icons{
    background-color:#f4f4f4;
    color:#000;
    border-radius:50%;
    padding:10px;
    margin:0 10px;
    cursor:pointer;
}
.titles{
    font-weight:bolder;
}
.searchs{
    padding:10px;
    background-color:#f4f4f4;
    border-radius:15px;
    outline:0;
    border:none;
}
</style>