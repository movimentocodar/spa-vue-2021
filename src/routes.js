import Cadastro from './views/Contato.vue';
import Produtos from './views/Produtos.vue';

export const routes = [
    { path: '', component: Produtos, titulo: 'Produtos'},
    { path: '/contato', component: Cadastro, titulo: 'Contato'}
];