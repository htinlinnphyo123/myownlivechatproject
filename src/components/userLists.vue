<template>
    
    <div>

    </div>

</template>

<script>
import { db } from '../firebase/config';
import { getDoc,doc } from '@firebase/firestore';
import { ref } from 'vue';

export default {

    setup(){

        let error = ref('');

        try{

            

        }
        catch(err){
           error.value = err.message;
           console.log(error.value); 
        }

    }

}
</script>

<style>

</style>