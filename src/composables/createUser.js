import {auth,db} from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref } from 'vue';

let error = ref('');
let create = async(email,password,displayName,userProfilePicSrc)=>{

    try{
        let res = await createUserWithEmailAndPassword(auth,email,password)
        
        if(!res){
            throw new Error('failed to create account')
        }

        await updateProfile(auth.currentUser,{
            displayName : displayName,
            photoURL : userProfilePicSrc
        })



        return res;
    }
    catch(err){
        error.value =  err.message;
    }


}

let createUser = ()=>{

    return {error,create}

}

export default createUser;