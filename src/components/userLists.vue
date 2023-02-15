<template>

    <div>
        <div v-if="users.length>0" class="userList-container">
            <div v-for="user in withoutMyAcc" :key="user.id">
                <div class="py-3 border-none border-bottom">
                    <router-link :to="{name:'ChatConversation',params:{fromid:myUserId,toid:user.user_id}}">
                        <h5>Name - {{ user.displayName }}</h5>
                    </router-link>
                    <span>Email - {{ user.email }}</span>
                </div>
            </div>
        </div>
        <div v-else-if="users.length==0">
            <Loader></Loader>
        </div>  
    </div>
    

</template>

<script>

import getAllUserLists from '../composables/getAllUserLists'
import { computed } from 'vue';
import { auth } from '@/firebase/config';
import Loader from '../components/Loader.vue';

export default {

    components : {Loader},
    setup(){

        let {allUsers,error,users} = getAllUserLists();

        // console.log(user)

        allUsers();

        let formattUsers = computed(()=>{
            return users.value.map((user)=>{
                let capitalName = user.displayName.toUpperCase();
              
                return {...user,displayName:capitalName}
            })
        })

        let myUserId = auth.currentUser.uid

        
        let withoutMyAcc = computed(()=>{
            return formattUsers.value.filter((user)=>{
                return user.user_id != myUserId
            })
        })


        return {users,formattUsers,myUserId,withoutMyAcc}

    }

}
</script>

<style>
.userList-container{
    height:90vh;
    overflow-y:scroll;
    margin-top:15px;
    padding-top:5px;
}
</style>