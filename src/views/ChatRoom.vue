<template>
    
    <div class="container-fluid">
        <div class="row">
            <div class="col-4 bg-white">
                <AccountNav></AccountNav>
                <UserLists></UserLists>
            </div>
            <div class="col-8 bg-warning">
                hello mandalay
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

</style>