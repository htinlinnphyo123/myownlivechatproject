import { collection, query, where } from "firebase/firestore"
import { onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config";
import { ref } from "vue";
import {auth} from '../firebase/config';

let getMessage = ()=>{

    let messages = ref([]);
    let error = ref('');
    let messageReq = (senderId,receiverId)=>{

        let msgRef = query(collection(db,'conversations'),
                            where('chatRoomId','in',[senderId+receiverId,receiverId+senderId]),
                           );


        onSnapshot(msgRef,(shots)=>{

            messages.value = [];
            shots.docs.forEach((shot)=>{

                let isUser = ref(false);

                if(shot.data().sendTime){

                    if(shot.data().senderId===auth.currentUser.uid){
                        isUser.value = true;
                    }else{
                        isUser.value = false;
                    }

                    let document = {id:shot.id,...shot.data(),isUser:isUser.value};
                    messages.value.push(document);
                }

            })
        
        
        })

    }

    return {error,messageReq,messages}

}

export default getMessage;