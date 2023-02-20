<template>
    
    <div class="container-fluid chat-containers">
        <div class="row">
            <div class="col-3 bg-white navbars">
                <AccountNav @searchPeople="searchPeople"></AccountNav>
                <UserLists :searchValue="searchValue"></UserLists>
            </div>
            <div class="col-9 px-0">
                <EachChat></EachChat>    
            </div>

        </div>
    </div>

</template>

<script>
import UserLists from '../components/userLists.vue'
import AccountNav from '../components/AccountNav.vue';
import getUser from '../composables/getUser';
import EachChat from '@/components/EachChat.vue';
import { watch } from 'vue'
import { useRouter } from 'vue-router';
import { ref,onUpdated } from 'vue';

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

        let searchValue = ref('');
        let searchPeople = (value)=>{
            searchValue.value = value;
        }

        return { searchPeople , searchValue};
    }

}
</script>

<style>
.chat-containers{
    height:100vh;

    overflow:hidden;
}
</style>