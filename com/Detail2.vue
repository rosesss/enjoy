<template>
    <div class="wrap" v-if = 'yes'>
         <header class="header">
            <span class='home' @click='gohome()'>首页</span>
            <div class='citykind'>
                <img src='../img/logo.png' />
                <span @click='getcity()'>
                    <em class='cityname'>北京</em>
                </span>
            </div>
            <span class='login'>登录</span>
            <span class='search iconfont' @click='toshow()'>&#xe67a;</span>
            <i class='iconfont' id='top'>&#xe600;</i>
        </header>
        <div id = 'content'>

            <!--轮播·-->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for='(item,index) in list.basic.product_images' :key='index'>
                        <img :src = 'item.img_url'/>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>

                <!-- 商品介绍 -->
            <div class='instro'>
                <p class='tit'>{{instrolist.short_name}}-{{instrolist.spec}}</p>
                <div class='like'>
                    <i class='iconfont' id='dont'>&#xe618;</i>
                    <i class='iconfont' id='like'>&#xe6b9;</i>
                </div>
                <span class='litle'>{{instrolist.description}}</span>
                <p class='price'>
                    <span>{{instrolist.price/100}} 元</span>/{{instrolist.show_entity_name}}
                </p>
            </div>

            <ul class='information'>
                <li v-for='(tit,index) in instrolist.display_property_group' :key='index' class='iii'>
                    <span>{{tit.name}}</span>
                </li>
            </ul>
            <p class='ppp'></p>
            <div class = 'have'>
                
            </div>

        </div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax.js';
export default {
    data(){
        return{
            yes:false,
            list:[],
            have:false,
            instrolist:[]
        }
    },
    mounted(){
        var that = this;
        console.log(this.$route.query.id);
        var id = this.$route.query.id;
        var url = 'https://api.ricebook.com/product/info/product_detail.json?product_' + id;
        MyAjax.fetch(url,function(data){
            console.log(data.basic.product_images)
            that.list = data;
            that.instrolist = data.basic;
            if(!data.modules[4]){
                that.have = true;
            }
            that.yes = true;
        },function(err){
            console.log(err)
        })
    },
    updated(){
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
        })
    }
}
</script>

<style scoped>
    #like {
    color: #f00;
    font-size: 30px;
}

.information .iii span {
    background: #F6FAFF;
    color: #8DA2BC;
}
</style>
