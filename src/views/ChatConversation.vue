<template>
    
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 bg-white navbars">
                <AccountNav></AccountNav>
                <UserLists></UserLists>
            </div>
            <div class="col-9">
                <EachChat></EachChat>    
            </div>

        </div>
    </div>

</template>

<script>
import UserLists from '../components/userLists'
import AccountNav from '../components/AccountNav.vue';
import getUser from '../composables/getUser';
import EachChat from '@/components/EachChat.vue';
import { watch } from 'vue'
import { useRouter } from 'vue-router';
export default {
    components: {
    UserLists, AccountNav,EachChat },
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

</style>