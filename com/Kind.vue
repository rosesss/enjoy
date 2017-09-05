<template>
    <div class="wrap">
        <header class="header">
            <span class = 'kind' @click = 'gohome()'>首页</span>
            <div class = 'citykind' @click = 'getcity()'>
                <img src = '../img/logo.png'/>
                <span >
                    <em class = 'cityname' >北京</em>
                    <i class = 'iconfont'>&#xe61f;</i>
                </span>
            </div>
            <span class = 'login'>登录</span>
            <span class = 'search iconfont'>&#xe67a;</span>
            <i class = 'iconfont' id = 'top'>&#xe600;</i>
        </header>
        <div id="content">
            <div class = 'location' v-for='(item,index) in localist' :key="index">
                <p>{{item.name}}</p>
                 <ul>
                    <li v-for="(item1,index) in item.sub_category_list" :key="index" @click = 'goprolist(item1.id+1,item1.city_id)'>
                            {{item1.name}}
                    </li>
                 </ul> 
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
        return {
            localist:[],
            citylist:[]
        }
    },
    mounted(){
        var that = this;
        var citystr = localStorage.getItem('city');
        
        if(citystr == null){
            var url = 'https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id=140&is_new_local=true';
            MyAjax.fetch(url,function(data){
                console.log(data);
                that.localist = data
            },function(err){
                console.log(err)
            })
        }else{
            var cityobj = JSON.parse(citystr);
            var cityid = cityobj.id;
            var cityname = cityobj.name;
            var url = 'https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id='+cityid+'&is_new_local=true';
                MyAjax.fetch(url,function(data){
                    // console.log(data);
                    $('.cityname').html(cityname);
                    that.localist = data;
                },function(err){
                    console.log(err)
                })
        }
        
        $('.footer').css('display','none');
    },
    methods:{
        gohome(){
            this.$router.push({
                name:'head'
            })
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
            var id = ev.target.getAttribute('cityid');
            var name = ev.target.getAttribute('name');
            var obj = {
                id:id,
                name:name
            };
            var str = JSON.stringify(obj);
            // console.log(str)
            localStorage.setItem('list',str);
            var that = this;
            $('#content').toggle();
            $('.wrapcity').toggle();
            $('.footer').toggle();
            var url = 'https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id='+id+'&is_new_local=true';
            MyAjax.fetch(url,function(data){
                console.log(data);
                $('.cityname').html(name);
                that.localist = data;
            },function(err){
                console.log(err)
            })
        },
        goprolist(id,cityid){
            console.log(id)
            this.$router.push({
                name:'prolist',
                query:{
                    id:id,
                    cityid:cityid
                }
            })
        }
    }
}
</script>

<style>

</style>



