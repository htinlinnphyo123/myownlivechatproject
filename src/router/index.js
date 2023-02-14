import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import ChatRoom from '../views/ChatRoom.vue'
import {auth} from '../firebase/config'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component : Welcome,
    beforeEnter(to,from,next){  
      let user = auth.currentUser;
      if(!user){
        next();
      }else{
        const userId = user.uid;
        console.log(userId)
        next({name:'ChatRoom',params:{id:userId}})
      }
    }
  },
  {
    path : '/:id',
    name : 'ChatRoom',
    component : ChatRoom,
    props : true,
    beforeEnter(to,from,next){
      let user = auth.currentUser;
      if(user){
        next();
      }else{
        next({name:'welcome'})
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
