import Vue from 'vue';

import Home from './../com/Home.vue';
import Commend from './../com/Commend.vue';
import Invite from './../com/Invite.vue';
import User from './../com/User.vue';
import MainFooter from './../com/MainFooter.vue';
import Kind from './../com/Kind.vue';
import Prolist from './../com/Prolist.vue';
import Detail from './../com/Detail.vue';
import Login from './../com/Login.vue';
import Cart from './../com/Cart.vue';
import Pay from './../com/Pay.vue';
import Chose from './../com/Chose.vue';
import Pro from './../com/Pro.vue';
import Address from './../com/Address.vue';
import Revise from './../com/Revise.vue';
import Paymoney from './../com/Paymoney.vue';
const routes = [
    {
        path:'/',
        name:'head',
        components:{
            default:Home,
            footer:MainFooter
        }
    },
    {
        path:'/home',
        components:{
            default:Home,
            footer:MainFooter
        }
    },
    {
        path:'/commend',
        components:{
            default:Commend,
            footer:MainFooter
        }
    },
    {
        path:'/invite',
        name:'invite',
        components:{
            default:Invite,
            footer:MainFooter
        }
    },
    {
        path:'/user',
        name:'user',
        components:{
            default:User,
            footer:MainFooter
        }
    },
    {
        path:'/kind',
        name:'kind',
        components:{
            default:Kind
        }
    },
    {
        path:'/prolist',
        name:'prolist',
        components:{
            default:Prolist
        }
    },
    {
        path:'/detail',
        name:'detail',
        components:{
            default:Detail
        }
    },
    {
        path:'/login',
        name:'login',
        components:{
            default:Login
        }
    },
    {
        path:'/cart',
        name:'cart',
        components:{
            default:Cart
        }
    },
    {
        path:'/pay',
        name:'pay',
        components:{
            default:Pay
        }
    },
    {
        path:'/chose',
        name:'chose',
        components:{
            default:Chose
        }
    },
    {
        path:'/pro',
        name:'pro',
        components:{
            default:Pro
        }
    },
    {
        path:'/address',
        name:'address',
        components:{
            default:Address
        }
    },
    {
        path:'/revise',
        name:'revise',
        components:{
            default:Revise
        }
    },
    {
        path:'/paymoney',
        name:'paymoney',
        components:{
            default:Paymoney
        }
    }
]

export default routes;