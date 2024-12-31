<template>
  <view class="user-activities-page">
    <!-- 页头 -->
    <view class="header">
      <text class="header-title">我的报名</text>
      <text class="header-subtitle">实时跟踪报名状态，掌握活动动态</text>
    </view>

    <!-- 活动列表 -->
    <view class="activities-list">
      <view 
        class="activity-card" 
        v-for="activity in activities" 
        :key="activity.eventId"
        @click="navigateToDetail(activity.eventId)"
      >
        <image class="activity-image" :src="activity.picUrl" mode="aspectFill" />
        <view class="activity-details">
          <text class="activity-title">{{ activity.title }}</text>
          <text class="activity-location">📍 {{ activity.location }}</text>
          <text class="activity-date">🗓 {{ formatDate(activity.eventTime) }}</text>
          <text class="activity-registered">报名时间：{{ formatDate(activity.registeredAt) }}</text>
        </view>
        <view :class="['status-tag', activity.status]">
          {{ formatStatus(activity.status) }}
        </view>
      </view>
    </view>

    <!-- 如果没有活动 -->
    <view v-if="!activities.length" class="empty-state">
      <image src="/static/empty.png" class="empty-image" mode="aspectFill" />
      <text class="empty-text">您还没有报名任何活动哦</text>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      activities: [], // 活动数据列表
    };
  },
  mounted() {
    this.fetchActivities(); // 页面加载时获取活动数据
  },
  methods: {
    // 格式化日期
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`;
    },
    // 格式化状态
    formatStatus(status) {
      const statusMap = {
        null: "未报名",
        pending: "审核中",
        approved: "已通过",
        rejected: "未通过",
      };
      return statusMap[status] || "未知状态";
    },
    // 跳转到活动详情页
    navigateToDetail(eventId) {
      uni.navigateTo({
        url: `/pages/eventDetail/eventDetail?eventId=${eventId}`,
      });
    },
    // 获取活动数据
    fetchActivities() {
      const userId = uni.getStorageSync("userId");
      if (!userId) {
        uni.showToast({
          title: "用户未登录",
          icon: "none",
        });
        return;
      }

      uni.request({
        url: `http://154.8.140.108:8883/api/registration/listUsersRegistrations`,
        method: "GET",
        data: { userId },
        success: (res) => {
          if (res.data.code === 1) {
            this.activities = res.data.data;
          } else {
            uni.showToast({
              title: "获取活动数据失败",
              icon: "none",
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: "网络请求失败",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>

<style scoped>
/* 页面整体样式 */
.user-activities-page {
  padding: 16px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

/* 页头样式 */
.header {
  text-align: center;
  margin-bottom: 20px;
}
.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.header-subtitle {
  font-size: 14px;
  color: #888;
}

/* 活动列表样式 */
.activities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 活动卡片样式 */
.activity-card {
  display: flex;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
}
.activity-card:hover {
  transform: translateY(-5px);
}
.activity-image {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}
.activity-details {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.activity-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}
.activity-location,
.activity-date,
.activity-registered {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

/* 状态标签样式 */
.status-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
}
.status-tag.pending {
  background-color: #f39c12;
}
.status-tag.approved {
  background-color: #27ae60;
}
.status-tag.rejected {
  background-color: #e74c3c;
}
.status-tag.null {
  background-color: #bdc3c7;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  margin-top: 40px;
}
.empty-image {
  width: 200px;
  height: 200px;
  margin-bottom: 16px;
}
.empty-text {
  font-size: 16px;
  color: #aaa;
}
</style>
