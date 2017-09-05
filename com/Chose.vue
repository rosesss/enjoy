<template>
    <div id = 'wrap'>
        <header class="header">
            <span class = 'home' @click = 'gohome()'>首页</span>
            <div class = 'citykind' >
                <img src = '../img/logo.png'/>
                <span>
                    <em class = 'cityname'>北京</em>
                </span>
            </div>
            <span class = 'login' @click = 'islogin()'>登录</span>
            <span class = 'search iconfont'>&#xe67a;</span>
            <i class = 'iconfont' id = 'top'>&#xe600;</i>
        </header>
        <div id = 'con'>
            <div class = 'mainheader'>
                <div class = 'local active' @click = 'toshow()'>本地精选</div>
                <div class = 'all' @click = 'tohide()'>全国送</div>
            </div>
            <div class = 'search'>根据您的关键词快递到家为您推荐以下商品</div>
            <ul class = 'prolist'>
                <li v-for='(item,index) in prolist.products' :key='index'>
                    <div class = 'left' @click = 'todetail(item.enjoy_url)'>
                        <img :src = 'item.product_image' />
                    </div>
                    <div class = 'right'>
                        <p class = 'title'>{{item.short_name}}</p>
                        <p class = 'price'>
                            <span class = 'new'>{{item.price/100}}/{{item.show_entity_name}}</span>
                            <del class = 'old'>￥{{item.original_price/100}}</del>
                        </p>
                    </div>
                </li>
            </ul>
            <ul class = 'country'>
                <li v-for='(i,index) in countrylist.products' :key='index'>
                    <div class = 'left' @click = 'todetail(i.enjoy_url)'>
                        <img :src = 'i.product_image' />
                    </div>
                    <div class = 'right'>
                        <p class = 'title'>{{i.short_name}}</p>
                        <p class = 'price'>
                            <span class = 'new'>{{i.price/100}}/{{i.show_entity_name}}</span>
                            <del class = 'old'>￥{{i.original_price/100}}</del>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax.js';
export default {
    data(){
        return{
            prolist:[],
            countrylist:[]
        }
    },
    mounted(){
        var that = this;
        var tet = this.$route.query.tet;
        var str = localStorage.getItem('city');
        var obj = JSON.parse(str);
        var id = obj.id;
         $('.cityname').html(obj.name)
        // console.log(id);
        var url = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id='+id+'&keyword='+tet+'&page=0';
        MyAjax.fetch(url,function(data){
            // console.log(data)
            that.prolist = data;
           
        },function(err){
            console.log(err)
        })


        var url1 = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id='+id+'&keyword=%E5%BF%AB%E9%80%92%E5%88%B0%E5%AE%B6&page=0';
        MyAjax.fetch(url1,function(data){
            console.log(data)
            that.countrylist = data;

        },function(err){
            console.log(err)
        })
    },
    methods:{
        toshow(){
            $('.local').addClass('active').siblings().removeClass('active');
            $('.country').toggle();
            $('.prolist').toggle();
        },
        tohide(){
            $('.all').addClass('active').siblings().removeClass('active');
            $('.country').toggle();
            $('.prolist').toggle()
        },
        gohome(){
            var str = localStorage.getItem('city');
            var obj = JSON.parse(str);
            var id = obj.id;
            this.$router.push({
                name:'home',
            })
        },
        todetail(id){
            console.log(id);
            var id = id;
            this.$router.push({
                name:'detail',
                query:{
                    id:id
                }
            })
        }
        
    }
}
</script>

<style>
    
</style>
