import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Document from './views/Document.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/document',
            name: 'document',
            component: Document,
        },
    ],
});
