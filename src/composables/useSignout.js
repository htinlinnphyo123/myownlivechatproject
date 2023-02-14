import {auth} from '../firebase/config'
import { signOut } from '@firebase/auth'
import { ref } from 'vue'

let error = ref('');

let useSignout = ()=>{

    let signoutReq = async()=>{

        try{
            
            await signOut(auth);
            
        }
        catch(err){
            error.value = err.message;
        }


    }


    return {error,signoutReq}
}


export default useSignout;