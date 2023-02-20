<template>
  
    <div v-if="friInfo" class="eachChat-container">
        <div class=" px-3 py-3 fri-navs">
            <div class="d-flex justify-content-between align-items-center">
                <div class="text-uppercase fw-bolder account-infos">
                    <h5 class="d-inline"> {{ friInfo.displayName }} </h5> <small>({{ friInfo.email }})</small>
                </div>
                <div class="text-success">
                    <i class="fa-solid fa-phone px-2"></i>
                    <i class="fa-solid fa-video px-2"></i>
                    <i class="fa-solid fa-circle-info px-2"></i>
                </div>
            </div>
        </div>
        <div class="conversations">
            <ConversationList :fromid="fromid" :toid="toid"></ConversationList>
        </div>
        <div class="typings px-3 py-3">
            <NewChatForm :fromid="fromid" :toid="toid"></NewChatForm>
        </div>
    </div>

</template>

<script>
import { watch,ref } from 'vue';
import { useRoute } from 'vue-router';
import getAllUsers from '../composables/getAllUserLists';
import { computed } from 'vue';
import NewChatForm from './NewChatForm.vue';
import ConversationList from './ConversationList.vue';

export default {
    
    components: { NewChatForm, ConversationList },

    setup() {

        let route = useRoute();
        let fromid = ref(route.params.fromid);
        let toid = ref(route.params.toid);
        let { allUsers, error, users } = getAllUsers();
        allUsers();
        //friend info for each chat
        let friInfo = computed(() => {
            return users.value.find((user) => {
                return user.user_id === toid.value;
            });
        });
        //for route change with users
        watch(route, () => {
            toid.value = route.params.toid;
            // console.log(toid.value);
        });
        //START CHAT MESSAGE
        return { fromid, toid, friInfo };
    },


}
</script>

<style scoped>
.eachChat-container{
    color:red;
    height:100vh;
    background-color:#f4f4f4;
    border-left:1px solid #eee;

    position:relative;
}
.fri-navs{
    height:10%;
    background-color:#fff;
    border-bottom:1px solid #eee;
}
.conversations{
    max-height:80%;
    background-color:#fff;
}
.typings{
    width:100%;
    height:10%;
    background-color:#eee;

    position:absolute;
    left:0;
    bottom:0;
}
.fa-solid{
    cursor:pointer;
}
</style>