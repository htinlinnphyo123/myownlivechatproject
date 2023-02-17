<template>

    <div class="spin">
        <div class="circle"></div>
    </div>

</template>

<script>
    export default  {


    }
</script>


<style>
    .spin{
        width:0;
        height:2px;
        background-color:skyblue;
        position:fixed;
        top:0;
        left:0;
        animation:myani 2s ease-out;
        
        z-index:100;
    }
    @keyframes myani{
        50%{
            width:10vw;
        }
        100%{
            width:100vw;
        }
    }
</style>