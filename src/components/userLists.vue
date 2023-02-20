<template>

    <div>
        <div class="userList-container">
            <div v-for="user in withoutMyAcc" :key="user.id">
                <div class="py-3 border-none border-bottom">
                    <div>
                        {{ search }}
                        <router-link :to="{name:'ChatConversation',params:{fromid:myUserId,toid:user.user_id}}">
                            <div class="row">
                                <div class="col-12 col-lg-3 text-center">
                                    <img src="https://i2-prod.mirror.co.uk/incoming/article29042221.ece/ALTERNATES/s1200/0_GettyImages-1454081779.jpg" width="70" height="70" class="rounded-circle imgs" alt="">                                    
                                </div>
                                <div class="d-none d-lg-block col-lg-9">
                                    <h5>Name - {{ user.displayName }}</h5>
                                    <small>Email - {{ user.email }}</small>
                                </div>          
                            </div>        
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div v-else-if="users.length==0"> -->
            <Loader></Loader>
        <!-- </div>   -->
    </div>
    

</template>

<script>

import getAllUserLists from '../composables/getAllUserLists'
import { ref,computed,onUpdated,watch } from 'vue';
import { auth } from '@/firebase/config';
import Loader from '../components/Loader.vue';

export default {

    props : ['searchValue'],
    components : {Loader},
    setup(props){

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

        let search = ref(props.searchValue);

        watch(()=>props.searchValue,(newVal,oldVal)=>{
            // search.value = props.searchValue;
            search.value = newVal;
        })


        let withoutMyAcc = computed(()=>{
            const query = search.value.toLowerCase();
            return formattUsers.value.filter((user)=>{
                return user.displayName.toLowerCase().includes(query) && user.user_id!=myUserId;
            })
        })


        return {users,formattUsers,myUserId,withoutMyAcc,search}

    }

}
</script>

<style>
.userList-container{
    height:80vh;
    overflow-y:scroll;
    margin-top:15px;
    padding-top:5px;
}
.userList-container a{
    text-decoration:none;
}
.imgs{
    object-fit:cover;
}
</style>