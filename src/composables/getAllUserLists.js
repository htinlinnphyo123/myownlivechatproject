import { db } from '../firebase/config';
import { getDocs,doc, collection } from '@firebase/firestore';
import { ref } from 'vue';

let getAllUsers = ()=>{
    
    let error = ref('');
    let users = ref([]);

    let allUsers = async()=>{

        try{
            
            await new Promise((resolve,reject)=>{
                setTimeout(resolve,300)
            })

            let getUsers = await getDocs(collection(db,'users'));

            getUsers.forEach((user)=>{
                users.value.push({id:user.id,...user.data()})
            })


        }
        catch(err){
            error.value = err.message;
            console.log(error.value); 
        }

    }

    return {allUsers,error,users}

}


export default getAllUsers;