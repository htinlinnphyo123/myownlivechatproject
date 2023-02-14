import {db} from '../firebase/config'
import { setDoc,doc,collection } from 'firebase/firestore'
import { ref } from 'vue'


let createUserCollection = ()=>{

    let errorForDb= ref('')

    let createCollection = async(userObj)=>{

            
        try{

            let getData = doc(collection(db,'users'));

            await setDoc(getData,userObj)

            return getData;

        }
        catch(err){
            errorForDb.value = err.message;
            console.log(errorForDb)
        }

    }

    return {errorForDb,createCollection}

}


export default createUserCollection;