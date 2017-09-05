<template>
     <div class="wrap" @scroll = 'getscrollTop'>
        <header class="header">
            <span class = 'kind' @click = 'gohome()'>首页</span>
            <div class = 'citykind'>
                <img src = '../img/logo.png'/>
                <span @click = 'getcity()'>
                    <em class = 'cityname' ></em>
                    <i class = 'iconfont'>&#xe61f;</i>
                </span>
            </div>
            <span class = 'login'>登录</span>
            <span class = 'search iconfont'>&#xe67a;</span>
            <i class = 'iconfont' id = 'top'>&#xe600;</i>
        </header>
        <div id = 'content'>
            <div class = 'mkir'>
                <a href = 'javascript:;'>全部</a>
                <a href = 'javascript:;' @click = 'changeicon()'>
                    <span class = 'paixu'>智能排序</span>
                    <i class = 'iconfont' id = 'bottom'>&#xe642;</i>
                    <i class = 'iconfont' id = 'top1'>&#xe609;</i>
                </a>
            </div>
            <ul class = 'chose'>
                <li v-for="(item1,index) in alllist.sort" :key="index" @click = 'changecolor(index,item1.sort_id)' class = 'active' >{{item1.sort_name}}</li>
            </ul>
            <ul id = 'prolist'>
            <li v-for="(ele,index) in prolist" :key="index">
                <div class = 'left'>
                    <img :src = 'ele.product_image'  @click = 'todetail(ele.enjoy_url)'/>
                </div>
                <div class = 'right'>
                    <p>{{ele.short_name}}</p>
                    <div class = 'kong'></div>
                    <p class = 'price'>
                        <span class = 'new'>
                            {{ele.price/100}}元/{{ele.show_entity_name}}
                        </span>
                        <del class = 'old'>￥{{ele.original_price/100}}</del>
                    </p>
                    <p class = 'address' v-if='ele.area'>
                        <i class = 'iconfont'>&#xe647;</i>
                        <span>{{ele.area}}</span>
                    </p>
                </div>
            </li>
        </ul>

        <div class = 'mainfooter'>
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
            alllist:[],
            prolist:[],
            list:[],
            citylist:[],
            page:0,
            sortid:''
        }
    },
    mounted(){
        var str = localStorage.getItem('list');
        var obj = JSON.parse(str);
        var name = obj.name;
        $('.cityname').html(name);
        var that = this;
        console.log(this.$route.query.id);
        var id = this.$route.query.id;
        var cityid = this.$route.query.cityid;
        var url = 'https://api.ricebook.com/4/tab/sub_category.json?category_id='+id+'&city_id='+cityid+'&from_id=0';
        MyAjax.fetch(url,function(data){
            that.list = data.sub_category_list
            that.alllist = data;
        },function(err){
            console.log(err)
        })
        var url1 = 'https://api.ricebook.com/4/tab/category_product_list.json?category_id='+id+'&sort=1&from_id=0&city_id='+cityid+'&page=0';
        MyAjax.fetch(url1,function(data){
            console.log(data)
            that.prolist = data;
        },function(err){
            console.log(err)
        })
    },
    methods:{
        changeicon(){
            $('#bottom').toggle();
            $('#top1').toggle();
            $('.chose').toggle();
        },
        getscrollTop(){
            var that = this;
            var viewH = $('.wrap').height();
            var contentH = $('.wrap').get(0).scrollHeight;
            var scrollH = $('.wrap').scrollTop();
            // console.log(viewH,contentH,scrollH);
            var topH = contentH - viewH - scrollH;
            // console.log(topH)
            var str = localStorage.getItem('city');
            var obj = JSON.parse(str);
            var id = obj.id;
            // console.log(id)
            var sort = this.sortid;
            var ids = this.$route.query.id;
            if(topH < 100){
                that.page++;
                // console.log(that.page)
                var url = 'https://api.ricebook.com/4/tab/category_product_list.json?category_id='+ids+'&sort='+sort+'&from_id=0&city_id='+id+'&page='+that.page;
                MyAjax.fetch(url,function(data){
                    // console.log(data);
                    that.prolist =that.prolist.concat(data);
                },function(err){
                    console.log(err)
                })
            }
        },
        changecolor(index,sortid){
            var that = this;
            var id = this.$route.query.id;
            var cityStr = localStorage.getItem('city');
            var cityObj = JSON.parse(cityStr);
            var cityid = cityObj.id;
            that.sortid = sortid;
            $('.paixu').html('');
            $('.active').eq(index).addClass('changecolor').siblings().removeClass('changecolor');
            var str = $('.active').eq(index).html();
            $('.paixu').html(str);
            $('.chose').toggle();
            var url = 'https://api.ricebook.com/4/tab/category_product_list.json?category_id='+id+'&sort='+sortid+'&from_id=0&city_id='+cityid+'&page=0';
            MyAjax.fetch(url,function(data){
                that.prolist = data;
            },function(err){
                console.log(err)
            })
        },
        gohome(){
            var cityStr = localStorage.getItem('city');
            var cityObj = JSON.parse(cityStr);
            var cityid = cityObj.id;
            var name = cityObj.name;
           this.$router.push({
               path:'/',
               query:{
                    id:cityid,
                    name:name
               }
           })
        },
        getcity(){
            var that = this;
            $('#content').toggle();
            $('.wrapcity').toggle();
            $('.footer').toggle();
            var url = './../city.json';
            MyAjax.fetch(url,function(data){
                // console.log(data.Array);
                that.citylist = data.Array;
            },function(err){
                console.log(err)
            })
        },
        changecity(ev){
            var sort = this.sortid;
            var id = ev.target.getAttribute('cityid');
            var name = ev.target.getAttribute('name');
            var cityobj = {
                id:id,
                name:name
            };
            var citystr = JSON.stringify(cityobj);
            localStorage.setItem('city',citystr);
            var that = this;
            var ids = this.$route.query.id;
            $('#content').toggle();
            $('.wrapcity').toggle();
            $('.footer').toggle();
            var url = 'https://api.ricebook.com/4/tab/category_product_list.json?category_id='+ids+'&sort='+sort+'&from_id=0&city_id='+id+'&page=0';
            MyAjax.fetch(url,function(data){
                console.log(data);
                $('.cityname').html(name);
                that.prolist = data;
            },function(err){
                console.log(err)
            })
        },
        todetail(id){
            console.log(id);
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

<style scoped>
        .changecolor{
            background:#FAFAFA;
            color:#f00;
        }
</style>
