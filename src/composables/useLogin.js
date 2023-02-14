import { ref } from "vue"
import {auth} from '../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth";

let error = ref('');
let loginReq = async(email,password)=>{

    try{
        let res = await signInWithEmailAndPassword(auth,email,password);

        if(!res){
            throw new Error("can't login to your account")
        }
        
        return {res}
    }
    catch(err){
        error.value = err.message;
    }

}

let useLogin = ()=>{
    return {error,loginReq}
}

export default useLogin;
