<template>
    <div class='wrap'>
        <div class='logo'>
            <img src='../img/biglogo.png' />
        </div>
        <div class='logininfor'>
            <input type="text" placeholder="手机号" @blur="changestate()" @keyup='changeyes()' class='phonenum' />
            <input type="text" placeholder="短信验证码" class='phone' />
            <div class='yanzheng' @click='changenum()'>
                获取验证码
            </div>
        </div>
        <div class='tologin' @click='tologin()'>
            <a href='javascript:;' class='islogin'>登录</a>
        </div>
        <div class='loginfooter'>
            <p>未注册的用户登录后自动创建账户</p>
            <p>登录即表示您同意
                <a href="javascipt:;">
                    用户协议
                </a>
            </p>
        </div>
        <span class='toast'></span>
    </div>
</template>

<script>
export default {
    data() {
        return {
           my:this.$route.query.my
        }
    },
    mounted(){
        console.log(this.my)
    },
    methods: {
        changenum() {
            var code = '';
            var codeLength = 4;
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++) {
                var charNum = Math.floor(Math.random() * 52);
                code += codeChars[charNum];
            }
            console.log(code)
            $('.yanzheng').html(code);
        },
        changestate() {
            var that = this;
            var phone = $('.phonenum').val();
            if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(phone)) {
                $('.toast').html('请输入正确的手机号');
                $('.toast').css('display', 'block');
                var timer = setTimeout(function () {
                    $('.toast').css('display', 'none');
                    $('.toast').html('');
                }, 2000)
            }
        },
        changeyes() {
            var phone = $('.phonenum').val();
            if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(phone)) {
            } else {
                setTimeout(function () {
                    $('.yanzheng').css({ borderColor: '#343434' }, { color: '#000' })
                }, 2000)
            }
        },

        tologin() {
            var that = this;
            var num = $('.phone').val();
            var phone = $('.phonenum').val();
            if (num == '' || phone == '') {
                $('.toast').html('请完善您的信息');
                $('.toast').css('display', 'block');
                var timer = setTimeout(function () {
                    $('.toast').css('display', 'none');
                    $('.toast').html('');
                }, 2000)
            } else {
                localStorage.setItem('pro', phone);
                 $('.islogin').html('登录中')
                var timer = setTimeout(function () {
                    $('.toast').css('display', 'none');
                    $('.toast').html('');
                   $('.islogin').html('登录')
                   if(that.my == 200){
                        that.$router.push({
                            name:'invite'
                        })
                   }else if(that.my == 100){
                       that.$router.push({
                            name:'user'
                        })
                   }else if(that.my == 300){
                    that.$router.go(-1)
                   }
                    
                   
                }, 2000)

            }
        }
    }
}
</script>

<style>

</style>
