<template>
    <footer class="footer">
        <ul @click="rem()">
            <li>
                <router-link to = '/home'>
                    <i class = 'iconfont red'>&#xe641;</i>
                </router-link>
            </li>
            <li>
                <router-link to = '/commend'>
                    <i class = 'iconfont'>&#xe628;</i>
                </router-link>
            </li>
            <li>
                <a href = 'javascript:;' @click = 'islogin()'>
                    <i class = 'iconfont'>&#xe617;</i>
                </a>
            </li>
            <li>
                <a href = 'javascript:;' @click = 'islogins()'>
                    <i class = 'iconfont'>&#xe666;</i>
                </a>
            </li>
        </ul>
    </footer>
</template>

<script>
export default {
    methods:{
        rem(){
            console.log(11)
            $('ul li').eq(0).removeClass('red');
        },
        islogin(){
            var pro = localStorage.getItem('pro');
            if(pro == null){
                this.$router.push({
                    name:'login',
                    query:{
                        my:200
                    }
                })
        }else{
                this.$router.push({
                    name:'invite'
                })
        }
    },
    islogins(){
        var pro = localStorage.getItem('pro');
            if(pro == null){
                this.$router.push({
                    name:'login',
                     query:{
                        my:100
                    }
                })
        }else{
                this.$router.push({
                    name:'user'
                   
                })
        }
    }
}
}
</script>

<style scoped>
  .router-link-exact-active.router-link-active i{
        color:#343434;
    }
    .red{
        color:#343434;
    }
</style>
