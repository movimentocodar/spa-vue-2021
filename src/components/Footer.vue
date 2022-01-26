<template>
    <div class="footer">
        <div>© Copyright by Jandson</div>
        <a href="https://github.com/Jand-S/spa-vue-2021">
            <img src="https://image.flaticon.com/icons/png/512/733/733609.png">
        </a>
    </div>
</template>

<style scoped>
.footer {
    height: 40px;
    width: 100%;
    background-color: rgb(44, 68, 141);
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    line-height: 45px;
    opacity: 0;
    transition: 0.3s;
    color: white;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
}

a:hover{
    cursor: pointer;
}

.footer:hover{
    opacity: 1;
}

img{
    width: 30px;
    margin-top: 5px;
    margin-left: 10px;
    filter: invert(95%);
    transition: 0.3s;
}

img:hover{
    filter: none;
}
</style>
