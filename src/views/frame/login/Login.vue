<template>
    <div class="login-main">
        <div class="container">
            <img class="logo" src="../../../assets/img/login/logo.png" />
            <div class="title">基本开发框架</div>
            <div class="comment">
                <div class="account">
                    <img class="account-img" src="../../../assets/img/login/account.png"/>
                    <input class="account-input" placeholder="请输入账号" v-model="loginParams.userName" />
                </div>
                <div class="password">
                    <img class="account-img" src="../../../assets/img/login/password.png"/>
                    <input class="account-input" placeholder="请输入密码" v-model="loginParams.password" type="password" />
                </div>
            </div>
            <div class="cherckbox"><el-checkbox v-model="isRememberPassWord">记住密码{{process.env.VUE_APP_URL}}</el-checkbox></div>
            <div class="button"><el-button type="primary" @click="login()" style="width:510px;height:70px;font-size:27px">登录</el-button></div>
        </div>
        <div class="footer">
            <span>
                Copyright (c) 2016 Renzhi,Inc .All rights reserved.
            </span>
            <br>
            <span>
                Release 1.0.0
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import LoginApi from '@/api/systemApi/loginApi';
import Storage from '@/storage/Storage';
import StringUtil from '@/utils/StringUtil';
import { Component } from 'vue-property-decorator';
@Component({
    components: {
    },
})
export default class Login extends Vue {
    private LoginApi = new LoginApi();
    public Storage: Storage = new Storage();
    public stringUtil: StringUtil = new StringUtil();
    private loginParams: any = {};
    private isRememberPassWord: boolean = false;
    public constructor() {
        super();
        if (this.Storage.isExistAccount()) {
            this.loginParams = this.Storage.getStorageAccount();
            this.isRememberPassWord = true;
        } else{
            this.loginParams = {
                userName: '',
                password: '',
            };
        }
    }

    public login() {
      const params = {
          userName: this.loginParams.userName,
          password: this.loginParams.password,
      };
      if (this.stringUtil.isNull(this.loginParams.userName) || this.stringUtil.isNull(this.loginParams.password)) {
            this.$message.info('请输入账号或密码');
            return;
        }
      this.LoginApi.login(params).then((res: any) => {
          // 保存账号密码
        if (this.isRememberPassWord) {
            this.Storage.setStorageAccount(params);
        } else {
            this.Storage.removeStorageAccount();
        }
        this.Storage.setStorageUserInfo(res.data.userInfo);
        this.Storage.setStorageMenuList(res.data.menuInfoList);
        this.$router.push({path: '/home'});
      });
    }
}
</script>

<style lang="scss" scoped>
    .login-main{
        position: absolute;
        height:100%; 
        width:100%;
        background: url('../../../assets/img/login/login-bg.png') center no-repeat;
        background-size: 100% 100%;
        .container{
            width: 632px;
            height: 533px;
            background: rgba(255, 255, 255, 0.1);
            margin: 0 auto;
            margin-top: 200px;
            .logo{
                margin-top: 43px;
                width: 63px;
                height: 61px;
                z-index: 9999;
            }
            .title{
                color: #fff;
                font-size: 28px;
                margin-top: 5px;
            }
            .comment{
                margin: 44px auto 0;
                width: 500px;
                .account{
                    height: 70px;
                    width: 510px;
                    background: #fff;
                    border-radius: 5px;
                    img{
                        float: left;
                        margin-top: 25px;
                        margin-left: 18px;
                    }
                    input{
                        float: left;
                        height: 50px;
                        margin-top: 10px !important;
                        margin-left: 30px !important;
                        font-size: 21px;
                        outline:none;
                        border-style:none;
                    }
                }
                .password{
                    margin-top:18px;
                    height: 70px;
                    width: 510px;
                    background: #fff;
                    border-radius: 5px;
                    img{
                        float: left;
                        margin-top: 25px;
                        margin-left: 18px;
                    }
                    input{
                        float: left;
                        height: 50px;
                        margin-top: 10px !important;
                        margin-left: 30px !important;
                        font-size: 21px;
                        outline:none;
                        border-style:none;
                    }
                }
            }
            .cherckbox{
                margin-top: 19px;
                float: left;
                margin-left: 70px;
            }
            .button{
                margin-top: 57px;
            }
        }
        .footer{
            position: absolute;
            width: 400px;
            font-size: 16px;
            line-height: 16px;
            color: aliceblue;
            top: 95%;
            left: 38%;
        }
    }
</style>
