<template>
  <view class="personal-center">
    <!-- 用户信息展示 -->
    <view class="card user-info">
	  <view style="margin-bottom: 30px;">
        <text class="section-title">个人信息</text>
	  </view>
      <view class="info-item">
        <text class="info-label">用户名：</text>
        <text class="info-value">{{ userInfo.username }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">邮箱：</text>
        <text class="info-value">{{ userInfo.email }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">角色：</text>
        <text class="info-value">{{ userInfo.role }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">注册时间：</text>
        <text class="info-value">{{ userInfo.createdAt }}</text>
      </view>
    </view>

    <!-- 活动履历 -->
      <view class="card activity-history">
        <view style="margin-bottom: 30px;">
          <text class="section-title">活动履历</text>
        </view>
        <view v-if="activities.length">
          <view
            class="activity-item"
            v-for="activity in activities"
            :key="activity.eventId"
          >
            <view class="activity-info">
              <image :src="activity.picUrl" class="activity-image" mode="aspectFill" />
              <view class="activity-details">
                <text class="activity-title">{{ activity.title }}</text>
                <text class="activity-location">📍 {{ activity.location }}</text>
                <text class="activity-date">🗓 {{ formatDate(activity.eventTime) }}</text>
              </view>
            </view>
          </view>
        </view>
        <view v-else>
          <text class="empty-text">暂无已报名的活动</text>
        </view>
      </view>

    <!-- 功能区 -->
    <view class="functional-section">
      <button class="btn-primary" @click="navigateToFeedback">反馈与帮助</button>
      <button class="btn-danger" @click="logout">退出登录</button>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      userInfo: uni.getStorageSync('userInfo') || {},
      activities: []
    };
  },
  onShow() {
      this.fetchActivities();
    },
  methods: {
	// 格式化日期
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
    },
	// 获取用户活动履历
    fetchUserActivities() {
      const userId = uni.getStorageSync('userId'); // 从本地存储获取 userId
      uni.request({
        url: `http://154.8.140.108:8883/api/registration/listUsersParticipation?userId=${userId}`,
        method: 'GET',
        success: (res) => {
          if (res.data.code === 1) {
            this.activities = res.data.data; // 赋值活动列表
          } else {
            uni.showToast({
              title: '获取活动列表失败',
              icon: 'none',
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: '请求失败，请检查网络连接',
            icon: 'none',
          });
        },
      });
    },
    navigateToFeedback() {
      uni.navigateTo({ url: '/pages/feedback/feedback' });
    },
    logout() {
          uni.removeStorageSync('userInfo');
          uni.removeStorageSync('token');
          uni.reLaunch({ url: '/pages/login/login' });
        }
  },
  mounted() {
    this.fetchUserActivities(); // 初始化时获取活动列表
  },
};
</script>

<style scoped>
.personal-center {
  padding: 16px;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 92%;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.info-item, .activity-item {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 1.5;
}

.info-label {
  color: #666;
}

.info-value, .activity-title {
  color: #333;
  font-weight: bold;
}

.activity-date {
  font-size: 14px;
  color: #999;
}

.empty-text {
  text-align: center;
  font-size: 16px;
  color: #aaa;
  margin-top: 12px;
}

.functional-section {
  display: flex; /* 让按钮并排显示 */
  justify-content: center; /* 可选：按钮居中对齐 */
  gap: 10px; /* 可选：设置按钮之间的间距 */
}

.btn {
  border: 1px solid; /* 显示边框 */
  background-color: transparent; /* 设置无填充颜色 */
  color: inherit; /* 继承文本颜色 */
  padding: 5px 15px; /* 设置按钮的内边距 */
  border-radius: 4px; /* 可选：设置圆角边框 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  font-size: 14px; /* 设置字体大小 */
}

.btn-feedback {
  border-color: #007bff; /* 边框颜色（蓝色） */
  color: #007bff; /* 文字颜色（蓝色） */
}

.btn-logout {
  border-color: #dc3545; /* 边框颜色（红色） */
  color: #dc3545; /* 文字颜色（红色） */
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.05); /* 悬停时的轻微背景变化 */
}
/* 活动卡片样式 */
.card2 {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

/* 标题样式 */
.section-title {
  font-size: 18px;
  font-weight: bold;
}

/* 活动项样式 */
.activity-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

/* 图片样式 */
.activity-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
  object-fit: cover;
}

/* 活动详情样式 */
.activity-details {
  flex: 1;
}

.activity-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.activity-location,
.activity-date {
  font-size: 14px;
  color: #888;
  margin-bottom: 2px;
}

/* 空状态样式 */
.empty-text {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 16px;
}
</style>
