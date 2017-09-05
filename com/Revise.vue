<template>
<div class = 'con1'>
     <div class = 'personinfor'>
            <input type="text" placeholder="收货人姓名" class = 'username'> 
            <input type="text" placeholder="手机号" class = 'num'>
            <input type="text" placeholder="邮编(选填)">
            <form class="form-inline">
                <div data-toggle="distpicker" class = 'toggle' id = 'distpicker'>
                    <div class="form-group">
                        <select class="form-control" id="province2" data-province="---- 选择省 ----"><option value="" data-code="">---- 选择省 ----</option><option value="北京市" data-code="110000" selected="">北京市</option><option value="天津市" data-code="120000">天津市</option><option value="河北省" data-code="130000">河北省</option><option value="山西省" data-code="140000">山西省</option><option value="内蒙古自治区" data-code="150000">内蒙古自治区</option><option value="辽宁省" data-code="210000">辽宁省</option><option value="吉林省" data-code="220000">吉林省</option><option value="黑龙江省" data-code="230000">黑龙江省</option><option value="上海市" data-code="310000">上海市</option><option value="江苏省" data-code="320000">江苏省</option><option value="浙江省" data-code="330000">浙江省</option><option value="安徽省" data-code="340000">安徽省</option><option value="福建省" data-code="350000">福建省</option><option value="江西省" data-code="360000">江西省</option><option value="山东省" data-code="370000">山东省</option><option value="河南省" data-code="410000">河南省</option><option value="湖北省" data-code="420000">湖北省</option><option value="湖南省" data-code="430000">湖南省</option><option value="广东省" data-code="440000">广东省</option><option value="广西壮族自治区" data-code="450000">广西壮族自治区</option><option value="海南省" data-code="460000">海南省</option><option value="重庆市" data-code="500000">重庆市</option><option value="四川省" data-code="510000">四川省</option><option value="贵州省" data-code="520000">贵州省</option><option value="云南省" data-code="530000">云南省</option><option value="西藏自治区" data-code="540000">西藏自治区</option><option value="陕西省" data-code="610000">陕西省</option><option value="甘肃省" data-code="620000">甘肃省</option><option value="青海省" data-code="630000">青海省</option><option value="宁夏回族自治区" data-code="640000">宁夏回族自治区</option><option value="新疆维吾尔自治区" data-code="650000">新疆维吾尔自治区</option><option value="台湾省" data-code="710000">台湾省</option><option value="香港特别行政区" data-code="810000">香港特别行政区</option><option value="澳门特别行政区" data-code="820000">澳门特别行政区</option></select>
                    </div>
                    <div class="form-group">
                        <select class="form-control" id="city2" data-city="---- 选择市 ----"><option value="" data-code="">---- 选择市 ----</option><option value="北京市市辖区" data-code="110100" selected="">北京市市辖区</option></select>
                    </div>
                    <div class="form-group">
                        <select class="form-control" id="district2" data-district="---- 选择区 ----"><option value="" data-code="">---- 选择区 ----</option><option value="东城区" data-code="110101" selected="">东城区</option><option value="西城区" data-code="110102">西城区</option><option value="朝阳区" data-code="110105">朝阳区</option><option value="丰台区" data-code="110106">丰台区</option><option value="石景山区" data-code="110107">石景山区</option><option value="海淀区" data-code="110108">海淀区</option><option value="门头沟区" data-code="110109">门头沟区</option><option value="房山区" data-code="110111">房山区</option><option value="通州区" data-code="110112">通州区</option><option value="顺义区" data-code="110113">顺义区</option><option value="昌平区" data-code="110114">昌平区</option><option value="大兴区" data-code="110115">大兴区</option><option value="怀柔区" data-code="110116">怀柔区</option><option value="平谷区" data-code="110117">平谷区</option><option value="密云区" data-code="110118">密云区</option><option value="延庆区" data-code="110119">延庆区</option></select>
                    </div>
                </div>
            </form>
            <input type="text" placeholder="详细地址" class = 'ress'>
            <div class = 'btn'>
                <div class = 'save' @click = 'save()'>保存并返回</div>
                <div class = 'back' @click = 'back()'>返回</div>
            </div>
        </div>
</div>
       
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
var router = new VueRouter({
	})
export default {
    data(){
        return{

        }
    },
    mounted(){
         var $distpicker = $('#distpicker');

            $distpicker.distpicker({
                province: '福建省',
                city: '厦门市',
                district: '思明区'
            });

            $('#reset').click(function () {
                $distpicker.distpicker('reset');
            });

            $('#reset-deep').click(function () {
                $distpicker.distpicker('reset', true);
            });

            $('#destroy').click(function () {
                $distpicker.distpicker('destroy');
            });

            $('#distpicker1').distpicker();
    },
    methods:{
         save(){
            var name = $('.username').val();
            var num = $('.num').val();
            var ress = $('.ress').val();
            var province = $('#province2').val();
            var city = $('#city2').val();
            var district2 = $('#district2').val();
            if(name == '' || num == '' || ress == ''){
                alert('信息不完整')
            }else{
                var obj = {
                    name:name,
                    num:num,
                    province:province,
                    city:city,
                    district2:district2,
                    ress:ress
                };
              var arr = [];
                var str = localStorage.getItem('address');
                if(str == null){
                    arr.push(obj);
                    var str = JSON.stringify(arr);
                    localStorage.setItem('address',str);
                }else{
                    var newArr = JSON.parse(str);
                    newArr.push(obj)
                    var str = JSON.stringify(newArr);
                    localStorage.setItem('address',str);
                }
               console.log(localStorage.getItem('address'))
                router.go(-1)
            }
        },
        back(){
           router.go(-1) 
        }
    }
}
</script>

<style>

</style>
