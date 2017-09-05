<template>
    <div class="wrap" v-if='have'>
        <header class="header">
            <span class='home'>首页</span>
            <div class='citykind'>
                <img src='../img/logo.png' />
                <span>
                    <em class='cityname'>北京</em>
                </span>
            </div>
            <span class='login'>登录</span>
            <span class='search iconfont'>&#xe67a;</span>
            <i class='iconfont' id='top'>&#xe600;</i>
        </header>
        <div id="content">
            <!-- 轮播 -->
            <div class='lunbo'>
                <div class='lunbotitle'>
                    <h2>{{headerlist[0].data.group_section.title}}</h2>
                    <p>{{headerlist[0].data.group_section.desc}}</p>
                </div>
                <div class="swiper-container" id = 'swiper-container1'>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(i,index) in headerlist[0].data.tabs' :key='index'>
                            <img :src = 'i.url' />
                            <p class = 'tag'>{{i.tag}}</p>
                            <p class = 'i-title'>{{i.title}}</p>
                            <p class = 'i-desc'>{{i.desc}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 精选 -->
            <div class = 'choselunbo'>
                <div class="swiper-container" id = 'swiper-container2'>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" id = 'swiper-slide1' @click = 'topro(headerlist[1].data.tabs[0].enjoy_url)'>
                            <p class = 'tabs-title'>{{headerlist[1].data.tabs[0].title}}</p>
                            <p class = 'tabs-desc'>{{headerlist[1].data.tabs[0].desc}}</p>
                        </div>
                        <div class="swiper-slide" id = 'swiper-slide2'  @click = 'topro(headerlist[1].data.tabs[1].enjoy_url)'>
                             <p class = 'tabs-title'>{{headerlist[1].data.tabs[1].title}}</p>
                            <p class = 'tabs-desc'>{{headerlist[1].data.tabs[1].desc}}</p>
                        </div>
                        <div class="swiper-slide" id = 'swiper-slide3'>
                             <p class = 'tabs-title3'>{{headerlist[1].data.tabs[2].title}}</p>
                        </div>
                    </div>
                </div>
            </div>


            <!-- 好物更多 -->
            <div class = 'moregoods'>
                <div class = 'more1'>
                    <div class = 'more-con'>
                        <h3>{{headerlist[2].data.group_section.title}}</h3>
                        <a href = 'javascript:;'>{{headerlist[2].data.group_section.enjoy_url_text}}</a>
                        <p>{{headerlist[2].data.group_section.desc}}</p>
                    </div>
                        
                    <ul class = 'imglist'>
                        <li v-for='(j,index) in headerlist[2].data.tabs' :key='index'>
                            <img :src = 'j.url' />
                        </li>
                    </ul>
                </div>
                <div class = 'more1'>
                    <div class = 'more-con'>
                        <h3>{{headerlist[3].data.group_section.title}}</h3>
                        <a href = 'javascript:;'>{{headerlist[3].data.group_section.enjoy_url_text}}</a>
                        <p>{{headerlist[3].data.group_section.desc}}</p>
                    </div>
                        
                        
                    <ul class = 'imglist'>
                        <li v-for='(j,index) in headerlist[3].data.tabs' :key='index'>
                            <img :src = 'j.url' />
                        </li>
                    </ul>
                </div><div class = 'more1'>
                    <div class = 'more-con'>
                        <h3>{{headerlist[4].data.group_section.title}}</h3>
                        <a href = 'javascript:;'>{{headerlist[4].data.group_section.enjoy_url_text}}</a>
                        <p>{{headerlist[4].data.group_section.desc}}</p>
                    </div>
                        
                        
                    <ul class = 'imglist'>
                        <li v-for='(j,index) in headerlist[4].data.tabs' :key='index'>
                            <img :src = 'j.url' />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
var router = new VueRouter({
})
export default {
    data() {
        return {
            have: false,
            headerlist: []
        }
    },
    mounted() {
        var that = this;
        var str = localStorage.getItem('city');
        console.log(str);
        
        if(str == null){
            var url = 'https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=140';
            MyAjax.fetch(url, function (data) {
                console.log(data);
                that.have = true;
                that.headerlist = data;
            }, function (err) {
                console.log(err)
            })
        }
        else{
            var obj = JSON.parse(str);
            var id = obj.id;
            var url = 'https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=' + id;
                MyAjax.fetch(url, function (data) {
                    console.log(data);
                    that.have = true;
                    that.headerlist = data;
                }, function (err) {
                    console.log(err)
                })
        }
    },
    updated(){
        var swiper = new Swiper('#swiper-container1', {
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            slidesPerView: 1,
            autoplayDisableOnInteraction: true
        });


        var swiper = new Swiper('#swiper-container2', {
            slidesPerView: 2,
            paginationClickable: true,
            spaceBetween: 10,

        });
    },
    methods:{
        topro(id){
            console.log(id)
            router.push({
                path:'/pro',
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
