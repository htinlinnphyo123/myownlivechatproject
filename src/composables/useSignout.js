import {auth} from '../firebase/config'
import { signOut } from '@firebase/auth'
import { ref } from 'vue'

let errors = ref('');

let useSignout = ()=>{

    let signoutReq = async()=>{

        try{
            
            await signOut(auth);
            
        }
        catch(err){
            errors.value = err.message;
        }


    }


    return {errors,signoutReq}
}


export default useSignout;