<template>
    
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 bg-white navbars">
                <AccountNav></AccountNav>
                <UserLists></UserLists>
            </div>
            <div class="col-9 d-flex justify-content-center align-items-center chats">
                <h5 class="text-center">Start a chat or conversation</h5>
            </div>
        </div>
    </div>

</template>

<script>
import UserLists from '../components/userLists'
import AccountNav from '../components/AccountNav.vue';
import getUser from '../composables/getUser';
import { watch } from 'vue'
import { useRouter } from 'vue-router';
export default {
    components: {
    UserLists, AccountNav },
    setup() {
        let route = useRouter();
        let { user } = getUser();


        watch(user, ()=>{
            if(!user.value){
                route.push('/');
            }
        })


        return { };
    }

}
</script>

<style>
.chats{
    height:100vh;
    background-color:#f4f4f4;
}
</style>