<template>
    <div v-if="profileInfo" class="login-area">
        <img :src="profileInfo.avatar_url" alt=""><span class="name">{{ profileInfo.name }}</span>
    </div>
    <div v-else>
        <form @submit.prevent="logar()">
            <label>login:</label><input type="text" v-model="user"><button>Entrar</button>
        </form>
    </div>
</template>



<script>
import ApiProfile from '../../database/ApiProfile';

export default {
    

    data(){
        return{
            user : '',
            profileInfo : ''
        }
    },
    created(){

        // const userProfile = ApiProfile.getUser(this.user)
        // userProfile.then(profileInfo => this.profileInfo = profileInfo, err => console.log(err))
    },
    methods:{
        logar(){
            const userProfile = ApiProfile.getUser(this.user)
            userProfile.then(profileInfo => this.profileInfo = profileInfo, err => console.log(err))
        }
    }
}
</script>
<style scoped>
.login-area{
    display: flex;
    align-items: center;
}
img{
    width: 50px;
    border-radius: 25px;
    margin-right: 5px;
}

input{
    width: 100px;
}
</style>