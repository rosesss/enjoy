import Vue from 'vue';
import VueRouter from 'vue-router';
import APP from './com/APP.vue';
import routes from './routes/routes.js';
import './scss/main.scss';
import './scss/home.scss';
import './scss/kind.scss';
import './scss/prolist.scss';
import './scss/detail.scss';
import './scss/commend.scss';
import './scss/login.scss';
import './scss/invite.scss';
import './scss/user.scss';
import './scss/cart.scss';
import './scss/pay.scss';
import './scss/chose.scss';
import './scss/pro.scss';
import './scss/address.scss';
import './scss/revise.scss';
import './scss/paymoney.scss';
Vue.use(VueRouter);

var router = new VueRouter({
		routes:routes
	})
new Vue({
    router:router,
    el:'#app',
    data:{

    },
    components:{
        'v-app':APP
    }
})