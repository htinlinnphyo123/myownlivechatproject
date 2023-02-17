import { setDoc,collection,doc } from "firebase/firestore";
import { ref } from "vue";
import {db} from '../firebase/config.js'

let newChat = ()=>{

    let error = ref('');
    let createChat = async(chatObj)=>{

        try{
            let chatRef = doc(collection(db,'conversations'));

            await setDoc(chatRef,chatObj);

            return chatRef;
        }
        catch(err){
            error.value = err.message;
            console.log(error.value);
        }
    }

    return {createChat,error}

}


export default newChat;