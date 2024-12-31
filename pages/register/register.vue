<template>
  <view class="container">
    <text class="title">注册</text>
    <view class="form">
      <input class="input" v-model="form.username" placeholder="用户名" />
      <input class="input" v-model="form.password" placeholder="密码" password />
      <input class="input" v-model="form.email" placeholder="邮箱" />
      <input class="input" v-model="form.phone" placeholder="手机号（可选）" />
    </view>
    <button class="register-button" @click="register">注册</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        phone: '',
        role: 'user',
      },
    };
  },
  methods: {
    register() {
      uni.request({
        url: 'http://154.8.140.108:8883/api/users/register',
        method: 'POST',
        data: this.form,
        success: (res) => {
          if (res.data.code === 1) {
            uni.showToast({
              title: '注册成功',
              icon: 'success',
            });
            // 跳转回登录页面
            uni.navigateTo({
              url: '/pages/login/login',
            });
          } else {
            uni.showToast({
              title: res.data.msg || '注册失败',
              icon: 'none',
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '网络错误，请稍后重试',
            icon: 'none',
          });
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  height: 100vh;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form {
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-button {
  width: 100%;
  max-width: 300px;
  height: 40px;
  background-color: #8c8c8c;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
}
</style>
