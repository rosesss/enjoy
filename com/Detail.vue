<template>
    <div class='wrap' v-if="have">
        <header class="header">
            <span class='home' @click='gohome()'>首页</span>
            <div class='citykind'>
                <img src='../img/logo.png' />
                <span @click='getcity()'>
                    <em class='cityname'>{{name}}</em>
                </span>
            </div>
            <span class='login'>登录</span>
            <span class='search iconfont' @click='toshow()'>&#xe67a;</span>
            <i class='iconfont' id='top'>&#xe600;</i>
        </header>
         <div id='content'>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for='(item,index) in imglist' :key='index'>
                        <img :src='item.img_url' />
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
            <div class='instro'>
                <p class='tit'>{{instrolist.short_name}}-{{instrolist.spec}}</p>
                <div class='like' @click='tochange()'>
                    <i class='iconfont' id='dont'>&#xe60f;</i>
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

             <div class="xu" v-if="zhen">
                <div class='store'>
                    <h3 class='card-title'>商户信息</h3>
                    <p class='address'>
                        {{list[1].data.restaurants[0].restaurant_name}}
                    </p>
                     <p class='address'>
                        <i class='iconfont'>&#xe647;</i>
                        {{list[1].data.restaurants[0].restaurant_address}}
                    </p>
                    <p class='address'>
                        <i class='iconfont'>&#xe7dd;</i>
                        {{list[1].data.restaurants[0].restaurant_phone_numbers[0]}}
                    </p> 
                </div>
               
                 <p class='ppp'></p>
                    <div class='menu'>
                    <h3 class='card-title'>MENU</h3>
                    <div v-for='(item,index) in list[2].data.contents' :key='index' class='con'>
                        <p>
                            -{{item.sub_title}}-
                        </p>
                       <ul>
                            <li v-for='(items,index) in item.text' :key='index'>
                                {{items}}
                            </li>
                        </ul>
                    </div>
                </div>
                <p class='ppp'></p>
            <div class='mark'>
                <h3 class='card-title'>亮点</h3>
                <ul class='marklist'>
                    <li v-for='(ins,index) in list[3].data.lights' :key='index'>
                        <img :src='ins.img_url' />
                        <p class='mark-title'>{{ins.title}}</p>
                        <p class='mark-content'>{{ins.content}}</p>
                    </li>
                </ul>
            </div>
            <p class='ppp'></p>
            <div class='hint'>
                <h3 class='card-title'>使用提示</h3>
                <ul>
                    <li v-for='(use,index) in list[4].data.contents' :key='index'>
                        {{use.text}}
                    </li>
                </ul>
                <div class='contact'>
                    <i class='iconfont'>&#xe62d;</i>
                    <p>联系客服</p>
                </div>
            </div>
            <p class='ppp'></p>
            <div class='guess'>
                <h3 class='card-title'>猜你喜欢</h3>
                <ul>
                    <li v-for='(cla,index) in list[5].data.recommend' :key='index' @click = 'tocarts(cla)'>
                        <div class='left'>
                            <img :src='cla.product_image_url' />
                        </div>
                        <div class='right'>
                            <p>{{cla.product_name}}</p>
                            <p class='pir'>
                                <span>{{cla.price/100}}元/{{cla.show_entity_name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            </div>  




              <div class="xu" v-if="!zhen">
                 <h3 class='card-title'>商品详情</h3>
                <ul class='list'>
                    <li v-for='(xi,index) in list[1].data.menu_attributes' :key='index'>
                        <div class='list-tit'>
                            <h3>{{xi.key}}</h3>
                        </div>
                        <div class='list-con'>{{xi.value}}</div>
                    </li>
                </ul> 
                <div class='mark'>
                <h3 class='card-title'>亮点</h3>
                <ul class='marklist'>
                    <li v-for='(ins,index) in list[2].data.lights' :key='index'>
                        <img :src='ins.img_url' />
                        <p class='mark-title'>{{ins.title}}</p>
                        <p class='mark-content'>{{ins.content}}</p>
                    </li>
                </ul>
            </div>
            <p class='ppp'></p>
            <div class='hint'>
                <h3 class='card-title'>使用提示</h3>
                <ul>
                    <li v-for='(use,index) in list[3].data.contents' :key='index'>
                        {{use.text}}
                    </li>
                </ul>
                <div class='contact'>
                    <i class='iconfont'>&#xe62d;</i>
                    <p>联系客服</p>
                </div>
            </div>
            <p class='ppp'></p>
            <div class='guess'>
                <h3 class='card-title'>猜你喜欢</h3>
                <ul>
                    <li v-for='(cla,index) in list[4].data.recommend' :key='index' @click = 'tocarts(cla.enjoy_url)'>
                        <div class='left'>
                            <img :src='cla.product_image_url' />
                        </div>
                        <div class='right'>
                            <p>{{cla.product_name}}</p>
                            <p class='pir'>
                                <span>{{cla.price/100}}元/{{cla.show_entity_name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            </div>  

            
            <div class='detailfooyer'>
                <div class = 'out'>
                    <span class = 'outshow'>+1</span>
                    <i class='iconfont' @click = 'tocart()'>&#xe601;</i>
                </div>
                
                <div class='addcart' @click = 'addcart()'>加入购物车</div>
                <div class='goshop' @click = 'topay()'>立即购买</div>
            </div>
        </div> 
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax.js';
export default {
    data() {
        return {
            proInfo:[],
            imglist: [],
            instrolist: [],
            inforlist: [],
            menulist: [],
            marklist: [],
            hintlist: [],
            guesslist: [],
            list: [],
            list:[],
            zhen: true,
            movetop: true,
            length:0,
            name:'北京',
            have:false
        }
    },
    methods: {
        addcart(){
            $('.outshow').css('display','block');
            var timer = setTimeout(function(){
                $('.outshow').css('display','none')
            },1000)
            function isexit(currentobj,cartpro){
                for(var i in cartpro){
                    if(currentobj.name == cartpro[i].name){
                        return cartpro[i]
                    }
                }
                return false;
            }

            var that = this;
            var loginstr = localStorage.getItem('pro');
            if(loginstr == null){
                this.$router.push({
                    name:'login',
                    query:{
                        my:300
                    }
                })
            }else{
                var name = that.proInfo.basic.short_name;
                var img = that.proInfo.basic.product_images[0].img_url;
                var price = that.proInfo.basic.price/100;
                var id = this.$route.query.id;
                var ids = id.split('&')[1];
                var obj = {
                    name:name,
                    img:img,
                    price:price
                    
                };
                var str = JSON.stringify(obj);
                // console.log(str);
                var islocalstorage = localStorage.getItem('cart');
                if(islocalstorage == null){
                    var arr = [];
                    obj.num = 1;
                    arr.push(obj);
                    var cartstr = JSON.stringify(arr);
                    localStorage.setItem('cart',cartstr);
                }else{
                    var cartArr = JSON.parse(islocalstorage);
                    // console.log(cartArr)
                    var flag = isexit(obj,cartArr);
                    if(flag){
                        flag.num++;
                    }else{
                        obj.num = 1;
                        cartArr.push(obj);
                    }
                    var arrstr = JSON.stringify(cartArr);
                    localStorage.setItem('cart',arrstr)
                    // console.log(arrstr);
                }
            }
        
        },

        topay(){
            var arr = [];
            var that = this;
            var obj = {
                'name':that.instrolist.short_name,
                'price':that.instrolist.price/100,
                'num':1
            }
            var money = obj.price;
            console.log(money)
            console.log(obj)
            arr.push(obj);
            var str = JSON.stringify(arr);
            localStorage.setItem('cart',str);
            localStorage.setItem('TotalMoney',money);
            this.$router.push({
                name:'pay'
            })
        },
        tocart(){
            var that = this;
            var loginstr = localStorage.getItem('pro');
            if(loginstr == null){
                this.$router.push({
                    name:'login',
                    query:{
                        my:300
                    }
                })
            }else{
                this.$router.push({
                    name:'cart'
                })
            }
        },
  
        gohome() {
            this.$router.push({
                name: '/'
            })
        },
        tochange() {
            $('#dont').toggle();
            $('#like').toggle();
        },
        toshow() {
            $('.hint').css('height', '100%');
            $('.show').css('display', 'none');
        },
        go() {
            var that = this;
            var flag = that.movetop;
             $('.choseshop').toggle();
             $('.close').toggle();
            if (flag) {
                $('#movetop').animate({
                    bottom: 0
                })
               $('#movetop').css('z-index','9999');
                that.movetop = false;
            }else{
                $('#movetop').animate({
                    bottom: -160
                })
                $('#movetop').css('z-index','10');
                that.movetop = true;
            }
        },
        tocarts(id){
            var id = id;
            console.log(id)
            window.location.reload();
            this.$router.push({
                name:'detail',
                query:{
                    id:id
                }
            })
        }
    },
    mounted() {
        var that = this;
        var id = this.$route.query.id.slice(29);
        console.log(id)
        var url = 'https://api.ricebook.com/product/info/product_detail.json?product_id=' + id;
        MyAjax.fetch(url, function (data) {
             console.log(data);
             that.proInfo = data;
             that.have=true;
            var img = data.basic.product_images;
            that.imglist = img;
            that.instrolist = data.basic;
            if(!data.modules[5]){
                that.zhen = false;
            }
            that.list = data.modules;
            console.log(data);
            console.log(localStorage.getItem('city'));
            var str = localStorage.getItem('city');
            var obj = JSON.parse(str);
            console.log(obj.name)
           that.name = obj.name;
          
        })  
    },
    updated() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
            autoplay:2000,
            loop: true,
			autoplayDisableOnInteraction: false	
        })
    }

}
</script>

<style>
.information .iii span {
    background: #F6FAFF;
    color: #8DA2BC;
}
</style>
