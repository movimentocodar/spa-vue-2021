import Cadastro from './components/Contato.vue';
import Produtos from './components/Produtos.vue';

export const routes = [
    { path: '', component: Produtos, titulo: 'Produtos'},
    { path: '/contato', component: Cadastro, titulo: 'Contato'}
];