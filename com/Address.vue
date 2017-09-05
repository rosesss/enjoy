<template>
    <div class = 'con'>
        <div class = 'address'>
            <ul>
                <li v-for='(item,index) in list' :key='index'>
                    <p class = 'person'>
                        <span>{{item.name}}</span>
                        <span class = 'phone'>{{item.num}}</span>
                    </p>
                    <p>
                        {{item.province}}{{item.city}}{{item.district2}}{{item.ress}}
                    </p>
                </li>
            </ul>
        </div>
        <div class = 'addbtn' @click = 'addnew()'>
            <p>
                <i class = 'iconfont'>&#xe620;</i>
                <span>新地址</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    methods:{
        addnew(){
            this.$router.push({
                name:'revise'
            })
        }
    },
    mounted(){
        var that = this;
        var str = localStorage.getItem('address');
        var obj = JSON.parse(str);
        that.list = obj;
    }
}
</script>

<style>

</style>
