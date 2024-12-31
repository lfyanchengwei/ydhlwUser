<template>
    <view class="container">
      <!-- Logo -->
      <view class="logo">
        <text class="logo-text">活动报名助手</text>
      </view>
  
      <!-- Login Title -->
      <text class="login-title">登录</text>
  
      <!-- Username and Password Fields -->
      <view class="form">
        <input class="input" placeholder="Email" v-model="email" />
        <view class="password-wrapper">
          <input class="input" placeholder="Password" v-model="password" password />
          <view class="toggle-password" @click="togglePassword">
            <text>{{ showPassword ? '🙈' : '👁️' }}</text>
          </view>
        </view>
      </view>
  
      <!-- Login Button -->
      <button class="login-button" @click="login">登录</button>
  
      <!-- Forgot Password -->
      <text class="forgot-password">忘记密码</text>
  
      <!-- Social Login Buttons -->
      <view class="social-login">
        <button class="social-button facebook">WX</button>
        <button class="social-button google">QQ</button>
        <button class="social-button twitter">WB</button>
      </view>
  
      <!-- Signup and Guest Options -->
      <view class="signup">
        <text>还没注册？<navigator url="/pages/register/register"><text class="signup-link">注册</text></navigator></text>
      </view>
      <button class="guest-button">游客登陆</button>
    </view>
</template>

<script>
export default {

  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
		console.log(this.email,this.password)
      uni.request({
        url: 'http://154.8.140.108:8883/api/users/login',
        method: 'POST',
        data: {
			email: this.email,
            password: this.password,
		  // email: "testuser@example.com",
		  // password:"testpassword123",
		  showPassword: false
        },
        success: (res) => {
          if (res.data.code === 1) {
			  console.log("登陆成功")
            uni.setStorageSync('userInfo', res.data.data);
            uni.setStorageSync('token', res.data.data.userId);
			uni.setStorageSync('userId', res.data.data.userId);
            uni.switchTab({
            	 url: '/pages/tabbar/tabbar-1/tabbar-1' 
            });
          } else {
            uni.showToast({
              title: res.data.message || '登录失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '网络错误，请稍后重试',
            icon: 'none'
          });
        }
      });
    },
	togglePassword() {
	      this.showPassword = !this.showPassword;
	    }
  }
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

.logo {
  margin-top: 50px;
  margin-bottom: 20px;
}

.logo-text {
  font-size: 28px;
  font-weight: bold;
  color: #8c8c8c;
}

.login-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
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

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 10px;
  right: 10px;
}

.login-button {
  width: 100%;
  max-width: 300px;
  height: 40px;
  background-color: #8c8c8c;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
}

.forgot-password {
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 20px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.social-button {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.facebook {
  background-color: #898f98;
  color: #fff;
}

.google {
  background-color: #db4437;
  color: #fff;
}

.twitter {
  background-color: #1da1f2;
  color: #fff;
}

.signup {
  font-size: 14px;
  margin-bottom: 10px;
}

.signup-link {
  color: #8c8c8c;
  font-weight: bold;
}

.guest-button {
  width: 100%;
  max-width: 300px;
  height: 40px;
  background-color: #f0f0f0;
  font-size: 16px;
  color: #8c8c8c;
  border: none;
  border-radius: 5px;
}
</style>
