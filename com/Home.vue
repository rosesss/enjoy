<template>
    <div class="wrap"  @scroll = "getscrollTop">
        <header class="header">
            <span class = 'home' @click = 'tokind()'>分类</span>
            <div class = 'citykind' >
                <img src = '../img/logo.png'/>
                <span @click = 'getcity()'>
                    <em class = 'cityname'>北京</em>
                    <i class = 'iconfont'>&#xe61f;</i>
                </span>
            </div>
            <span class = 'login' @click = 'islogin()'>登录</span>
            <span class = 'search iconfont' @click = 'toshow()'>&#xe67a;</span>
            <i class = 'iconfont' id = 'top'>&#xe600;</i>
        </header>
        <div id="content" ref = 'con'>
            <form >
                <input type = 'text' placeholder="搜索本地精选/快递到家" class = 'tet'/><button class = 'btn' @click = 'toserach()'>搜索</button>
            </form>
            <div class = 'list'>
                <div v-for='(item,index) in prolist' :key='index' class = 'week'>
                    <h1>{{item.group_section.title}}</h1>
                    <p class = 'pro'>{{item.group_section.desc}}</p>   
                    <ul>
                        <li v-for='(item1,index) in item.tabs'  :key='index'>
                            <img  @click = 'godetail($event)' :url = 'item1.enjoy_url' :src='item1.url' />
                            <div class = 'title'>
                                <p class = 'tit'>{{item1.title}}</p>
                                <p class = 'desc'>{{item1.desc}}</p>    
                            </div>
                        </li>
                    </ul> 
                </div>
            </div>
                <div class = 'mainfooter' id = 'homefooter'>
                    <div class = 'no'></div>
                    <p>&copy;2016  ENJOY</p>
                    <p>京ICP备12040847</p>
                    <p>京公安网备11010502025574 京ICP证150031号</p>
                </div>
        </div>

        <div class = 'wrapcity'>
            <div class = 'kong'></div>
            <p>本地服务开通城市</p>
            <ul id = 'citylist'>
                <li v-for='(item,index) in citylist'  :key='index' @click = 'changecity($event)'>
                    <a :cityid="item.id" :name="item.city" href = 'javascript:;'>{{item.city}}</a>    
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
            page:0,
            citylist:[],
            str:''
        }
    },
    mounted(){
        var that = this;
        var str = localStorage.getItem('list');
        if(str == null){
            var url = 'https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=140&page=0';
            MyAjax.fetch(url,function(data){
                console.log(data);
                that.prolist = data;
                $('cityname').html('北京')
            },function(err){
                console.log(err)
            })
            $('.footer').css('display','block');
        }else{
            var obj = JSON.parse(str);
            var ID = obj.id;
            var name = obj.name;
             var url = 'https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+ID+'&page=0';
            MyAjax.fetch(url,function(data){
                console.log(data);
                $('.cityname').html(name);
                that.prolist = data;
            },function(err){
                console.log(err)
            })
            $('.footer').css('display','block');
        }
    },
    methods:{
        godetail(ev){
            var url = ev.target.getAttribute('url');
            var id = url.replace(/-/g,'_')
            console.log(id);
            this.$router.push({
                name:'detail',
                query:{
                    id:id
                }
            })
        },
        toshow(){
            $('#top').toggle();
            $('form').toggle();
        },
        islogin(){
            var str = localStorage.getItem('pro');
            if(str == null){
                this.$router.push({
                    name:'login'
                })
            }else{
                this.$router.push({
                        name:'user'
                    })
            }
        },
        toserach(){
            var tet = $('.tet').val();
            this.$router.push({
                name:'chose',
                query:{
                    tet:tet
                }
            });
            

        },
        getscrollTop(){
            var that = this;
            var viewH = $('.wrap').height();
            var contentH = $('.wrap').get(0).scrollHeight;
            var scrollH = $('.wrap').scrollTop();
            // console.log(viewH,contentH,scrollH);
            if(contentH - viewH - scrollH < 100){
                that.page++;
                var url = 'https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=140&page='+that.page;
                MyAjax.fetch(url,function(data){
                    // console.log(data);
                    that.prolist =that.prolist.concat(data);
                },function(err){
                    console.log(err)
                })
            }
        },

        getcity(){
            var that = this;
            $('#content').toggle();
            $('.wrapcity').toggle();
            $('.footer').toggle();
            var url = './city.json';
            MyAjax.fetch(url,function(data){
                // console.log(data.Array);
                that.citylist = data.Array;
            },function(err){
                console.log(err)
            })
        },

        changecity(ev){
            console.log(ev.target.getAttribute('cityid'));
            var id = ev.target.getAttribute('cityid');
            var name = ev.target.getAttribute('name');
            var cityobj = {
                id:id,
                name:name
            };
            var citystr = JSON.stringify(cityobj);
            localStorage.setItem('city',citystr);
            var that = this;
            $('#content').toggle();
            $('.wrapcity').toggle();
            $('.footer').toggle();
            var url = 'https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+id+'&page='+that.page;
            MyAjax.fetch(url,function(data){
                console.log(data);
                $('.cityname').html(name);
                that.prolist = data;
            },function(err){
                console.log(err)
            })
        },

        tokind(){
            this.$router.push({
                name:'kind'
            })
            $('.footer').toggle();
        }
        
    }
}

</script>

<style>
    
</style>
