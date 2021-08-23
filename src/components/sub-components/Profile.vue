<template>
    <div class="container-profile">
        <div v-if="profileInfo" class="login-area">
            <img :src="profileInfo.avatar_url" alt="Foto Avatar"><span class="name">{{ profileInfo.name }}</span><button @click="sair()">Sair</button>
        </div>
        <div v-else>
            <form @submit.prevent="logar()">
                <div>
                    <img class="profile-icon" src="https://image.flaticon.com/icons/png/512/747/747376.png">
                    <div class="login-container">
                        <label>login:</label>
                        <input type="text" v-model="user">
                        <button>Entrar</button>
                        <div class="cadastro">Ainda não é cadastrado?</div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ApiProfile from '../../database/ApiProfile';

export default {
    data(){
        return{
            user : '',
            profileInfo : '',
        }
    },

    methods:{
        logar(){
            if(this.user){
                const userProfile = ApiProfile.getUser(this.user)
                userProfile.then(profileInfo => this.profileInfo = profileInfo, err => console.log(err))
            }
        },

        sair(){
            this.profileInfo = ''
        }
    }
}
</script>

<style scoped>
.container-profile{
    min-width: 250px;
}
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
    width: 105px;
    display: inline-block;
    margin-bottom: 2px;
}

.profile-icon{
    filter: invert(95%);
    width: 35px;
    margin-right: 10px;
    padding: 5px;
    border: 3px solid #c8956b;
}

.name{
    margin-right: 5px;
}

.cadastro:hover{
    cursor: pointer;
    text-decoration: underline;
}

.login-container{
    display: inline-block;
    width: 180px;
    flex-direction: column;
}

label{
    display: block;
}

button{
    width: 55px;
    display: inline-block;
    margin-left: 10px;

}
</style>
