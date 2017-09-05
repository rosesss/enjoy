<template>
    <div class='con'>
        <span class = 'toast'></span>
        <div class='kong'>
            <img src='../img/kong.png' />
            <p>购物车是空的哦~</p>
        </div>
        <div class='mycart' v-for='(item,index) in prolist' :key='index'>
            <div class='mygoods'>
                <div class='left'>
                    <img :src='item.img' />
                </div>
                <div class='right'>
                    <p class='pecname'>{{item.name}}</p>
                    <p class='price'>单价：<span class="singleprice">{{item.price}}</span>元</p>
                    <p class='adorre'>
                        <button class="minus" @click='minus(index)'>-</button>
                        <span class='objnum'>{{item.num}}</span>
                        <button class="add" @click='add(index)'>+</button>
                    </p>
                    <span @click='remove(item.name)'>
                        <i class='iconfont'>&#xe643;</i>
                    </span>

                </div>
            </div>
        </div>

        <div class='different'>
            <h3>猜你喜欢</h3>
            <div class='maincon'>
                <ul>
                    <li v-for='(i,index) in defaultlist.content' :key='index' @click = 'todetail(i.enjoy_url)'>
                        <img :src='i.product_image' />
                        <p>{{i.short_name}}</p>
                        <p class='price'>
                            <span>{{i.price/100}}元/{{i.show_entity_name}}</span>
                            <del>￥{{i.original_price/100}}</del>
                        </p>
                    </li>
                </ul>
            </div>
        </div>

        <div class='cartfooter'>
            <div id='money'>合计:
                <span class='nums'></span>
            </div>
            <div class='topay' @click = 'topay()'>
                去结算
            </div>
        </div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax.js';
export default {
    data() {
        return {
            prolist: [],
            defaultlist: [],
            cartlistul:[],
            money:''
        }
    },
    mounted() {
        var str = localStorage.getItem('cart');
        var that = this;
        console.log(str)
        var obj = JSON.parse(str);
        console.log(obj);
        that.prolist = obj;
        console.log(that.prolist)
        var waitMoney = 0;
        var proArr = JSON.parse(localStorage.getItem('cart'));
        that.cartlistul = proArr;
        for (var i in proArr) {
            waitMoney = waitMoney + proArr[i].price * proArr[i].num;
        }
        $('.nums').html(waitMoney);
        localStorage.setItem('TotalMoney',waitMoney);
        var url = 'https://api.ricebook.com/3/enjoy_product/cart_recommend_product.json?city_id=1';
        MyAjax.fetch(url, function(data) {
            console.log(data);
            that.defaultlist = data;
        }, function(err) {
            console.log(err)
        })
    },
    methods: {
        minus(index) {
            var waitMoney = localStorage.getItem('TotalMoney');
            var currentobj = JSON.parse(localStorage.getItem('cart'));
            var currentpro = currentobj[index];
            if (currentobj[index].num > 1) {
                currentobj[index].num--;
                 waitMoney =Math.round( waitMoney - currentpro.price);
                  $('.nums').html(waitMoney);
                   localStorage.setItem('TotalMoney', waitMoney);
            } else {
                currentobj[index].num = 1
            }
            $('.objnum').eq(index).html(currentobj[index].num);

            var str = JSON.stringify(currentobj);
            localStorage.setItem('cart', str)
        },
        add(index) {
            var currentobj = JSON.parse(localStorage.getItem('cart'));
             var currentpro = currentobj[index];
             var waitMoney = localStorage.getItem('TotalMoney');
              var toNum = Number(waitMoney);
               var pri = currentpro.num * currentpro.price;
                toNum =Math.round( toNum + currentpro.price);
                $('.nums').html(toNum);
               localStorage.setItem('TotalMoney', toNum);
            // console.log(currentobj[index].num);
            currentobj[index].num++;
            $('.objnum').eq(index).html(currentobj[index].num);
            var str = JSON.stringify(currentobj);
            // console.log(str);
            localStorage.setItem('cart', str)
        },
        remove(name) {
            var that = this;
            console.log(name)
            var currentobj = JSON.parse(localStorage.getItem('cart'));

            console.log(currentobj.length)
            for(var i = 0; i < currentobj.length; i++){
                if(currentobj[i].name == name){
                    $('.mycart').find('.mygoods').eq(i).css('display', 'none');
                    currentobj.splice(i,1);
                    localStorage.setItem('cart',JSON.stringify(currentobj));
                    var newArr = JSON.parse(localStorage.getItem('cart'));
                    that.money = 0;
                    for(var j = 0; j < newArr.length; j++){
                        that.money =that.money+ newArr[j].price*newArr[j].num;
                    }
                     $('.nums').html(that.money)
                    localStorage.setItem('TotalMoney',that.money)
                }
            }
            // var waitMoney = localStorage.getItem('TotalMoney');
            // var currentpri = Number($('.mycart').eq(index).find('.singleprice').html());
            // waitMoney = waitMoney - currentpri;
            // localStorage.setItem('TotalMoney', waitMoney);
            // $('.nums').html(waitMoney);
            // console.log(currentobj);
            // var newArr = currentobj.splice(index, 1);
            // console.log(currentobj)
            // var str = JSON.stringify(currentobj);
            // localStorage.setItem('cart', str);
            // $('.mycart').find('.mygoods').eq(index).css('display', 'none');
            console.log(currentobj.length)
            if (currentobj.length == 0) {
                $('.kong').css('display', 'block');
                $('.mycart').css('display', 'none');
                $('.nums').html('0')
            }
        },
        topay(){
            var str = localStorage.getItem('cart');
            var arr = JSON.parse(str);
            if(arr.length == 0){
                $('.toast').css('display','block');
                $('.toast').html('购物车没有商品');
                var timer = setTimeout(function(){
                    $('.toast').css('display','none')
                    $('.toast').html('');
                },2000)
            }else{
                 this.$router.push({
                    name:'pay'
                })
            }
           
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

<style>

</style>
