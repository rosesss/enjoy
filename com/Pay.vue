<template>
    <div class = 'cons'>
        <div class = 'address' @click = 'goaddress()'>
            <p>
                <i class = 'iconfont zuobiao'>&#xe647;</i>
                <span class = 'adres'>
                    {{address.name}}{{address.num}}{{address.province}}{{address.city}}{{address.district2}}{{address.ress}}
                </span>
                <i class = 'iconfont go' >&#xe60a;</i>
            </p>
        </div>
        <div class = 'local'>
            <p>本地精选</p>
        </div>
        <ul class = 'shoplist'>
            <li v-for='(item,index) in locallist' :key='index'>
                <p>
                    <span class = 'title'>{{item.name}}</span>
                    <span class = 'price'>{{item.price}}元 x {{item.num}}</span>
                </p>
            </li>
        </ul>
        <div class = 'num'>
            <p>
                <span class = 'shoptitle'>商品金额</span>
                <span class = 'money'>{{money}}元</span>
            </p>
        </div>
        <div class = 'payfooter'>
            <div class = 'left'>
                <p>
                    <span>合计：</span>
                    <span>{{money}}元</span>
                </p>
            </div>
            <div class = 'right' @click = 'pay()'>
                去支付
            </div>
        </div>
         <span class = 'toast'></span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            locallist:[],
            money:'',
            address:[],
            yes:false
        }
    },
    mounted(){
        var that = this;
        var str = localStorage.getItem('cart');
        var obj = JSON.parse(str);
        console.log(obj);
        that.locallist = obj;
        var moneys = localStorage.getItem('TotalMoney');
        console.log(moneys)
        that.money = moneys;
        var str = localStorage.getItem('address');
        console.log(str)
       if(str == null){
           $('.adres').html('添加新地址');
       }else{
           var arr = JSON.parse(str);
           console.log(arr)
           that.address = arr[0];
       }

       
    },
    methods:{
        pay(){
            var str = localStorage.getItem('address');
            if(str == null){
                $('.toast').css('display','block');
                $('.toast').html('您还没有添加地址哦');
                var timer = setTimeout(function(){
                    $('.toast').css('display','none');
                    $('toast').html('')
                },2000)
            }else{
                this.$router.push({
                    name:'paymoney'
                })
            }
        },
        goaddress(){
            this.$router.push({
                name:'address'
            })
        }
    }
}
</script>

<style>

</style>
