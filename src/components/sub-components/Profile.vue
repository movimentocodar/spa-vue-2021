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
import Login from '../../database/Login'

export default {
    

    data(){
        return{
            user : '',
            profileInfo : '',
            login: new Login()
        }
    },
    created(){
        // const userProfile = ApiProfile.getUser(this.user)
        // userProfile.then(profileInfo => this.profileInfo = profileInfo, err => console.log(err))
    },
    methods:{
        logar(){
            if(this.user){
                const userProfile = ApiProfile.getUser(this.user)
                userProfile.then(profileInfo => this.profileInfo = profileInfo, err => console.log(err))
                this.login = new Login(this.user)
                const createDb = CarrinhoService.createDb(this.login)
                createDb.then(()=> console.log('foi'), err => console.log(err))
            }
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