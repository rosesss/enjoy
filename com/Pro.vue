<template>
    <div class = 'wrap' v-if = 'have'>
        <header class = 'header'>
            <span class='home' @click = 'gohome()'>首页</span>
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

         <div id = 'content'>
                <div class = 'top' >
                    <div class = 'cover'>
                        <p id = 'title'>{{list.group_section.title}}</p>
                        <p id = 'desc'>{{list.group_section.desc}}</p>
                    </div>
                    <img :src = 'list.list[0].data.url' />
                </div>
                <ul class = 'title'>
                    <li v-for='(item,index) in list.columns' :key='index' @click = 'change(item.alias)'>{{item.text}}</li>
                </ul>
                <ul class = 'prolist'>
                    <li v-for='(i,index) in prolist' :key='index' @click = 'todetail(i.data.enjoy_url)'>
                        <div class = 'left'>
                            <p class = 'data-title'>{{i.data.title}}</p>
                            <p class = 'data-desc'>{{i.data.desc}}</p>
                            <p class = 'price'>
                                <span class = 'new'>{{i.data.price}}元/{{i.data.entity_name}}</span>
                                <del class = 'old'>{{i.data.original_price}}</del>
                            </p>
                        </div>
                        <div class = 'right'>
                            <img :src = 'i.data.url' />
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
            list:[],
            have:false,
            prolist:[]
        }
    },
    mounted(){
        
        var that = this;
        var queryid = this.$route.query.id;
        console.log(queryid);
        var id = queryid.split('e&')[1];
        console.log(id)
        var url = 'https://api.ricebook.com/hub/home/v1/web/category_detail.json?'+id+'&type=choice&page=0';
        MyAjax.fetch(url,function(data){
            console.log(data)
            that.list = data;
            that.have = true;
            that.prolist = data.list;
            console.log(that.list.list)
        },function(err){
            console.log(err)
        })
    },
    methods:{
        change(str){
            var that = this;
            var queryid = this.$route.query.id;
            var id = queryid.split('e&')[1];
            var txt = str;
            console.log(txt)
            var url = 'https://api.ricebook.com/hub/home/v1/web/category_detail.json?'+id+'&type='+txt+'&page=0'
            MyAjax.fetch(url,function(data){
                console.log(data);
                that.list = data;
                that.have = true;
                that.prolist = data.list;
            },function(err){
                console.log(err)
            })
        },
        todetail(id){
            console.log(id);
            var id = id.split('?')[1];
            var src2 = id.replace(/-/g,'_');
            console.log(src2)
            this.$router.push({
                name:'detail',
                query:{
                    id:src2
                }
            })
        },
        gohome(){
            this.$router.push({
                name:'home'
            })
        }
    }
}
</script>

<style>

</style>
