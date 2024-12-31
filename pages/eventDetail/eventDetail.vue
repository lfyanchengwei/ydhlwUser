<template>
  <view class="event-details">
    <!-- Header: Title and Image -->
    <view class="header">
      <text class="title">{{ event.title }}</text>
      <image class="event-image" :src="event.picUrl" mode="aspectFill"></image>
    </view>

    <!-- Event Details -->
    <view class="details">
      <text class="description">{{ event.description }}</text>

      <view class="info">
        <view class="info-item">
          <text class="label">活动时间：</text>
          <text class="value">{{ formatDate(event.eventDate) }}</text>
        </view>
        <view class="info-item">
          <text class="label">活动地点：</text>
          <text class="value">{{ event.location }}</text>
        </view>
        <view class="info-item">
          <text class="label">活动容量：</text>
          <text class="value">{{ event.capacity }}人</text>
        </view>
        <view class="info-item">
          <text class="label">报名截止：</text>
          <text class="value">{{ formatDate(event.registrationDeadline) }}</text>
        </view>
      </view>
    </view>

    <!-- Interactive Section: Register Button and Comments -->
    <view class="interactive">
      <button 
        class="register-button" 
        :disabled="registrationStatus !== 'notReg' " 
        @click="handleRegister">{{ registrationButtonText }}</button>

      <!-- Registration Modal -->
	  <view class="modal-wrapper" v-if="showRegistrationModal">
	    <view class="modal-overlay" @click="closeModal"></view>
	    <view class="modal-container">
	      <view class="modal-header">
	        <text class="modal-title">报名参加活动</text>
	        <button class="modal-close" @click="closeModal">×</button>
	      </view>
	      <view class="modal-body">
	        <view class="modal-image">
	          <image :src="event.picUrl" mode="aspectFill" />
	        </view>
	        <view class="modal-info">
	          <text class="modal-event-title">{{ event.title }}</text>
	          <text class="modal-event-date">{{ formatDate(event.eventDate) }}</text>
	          <text class="modal-event-location">📍 {{ event.location }}</text>
	        </view>
	        <textarea 
	          v-model="registrationText" 
	          class="modal-textarea" 
	          placeholder="请填写您的报名理由...">
	        </textarea>
	      </view>
	      <view class="modal-footer">
	        <button 
	          class="submit-button" 
	          :disabled="!registrationText.trim()" 
	          @click="registerForEvent">
	          提交报名
	        </button>
	      </view>
	    </view>
	  </view>
      <!-- <view v-if="showRegistrationModal" class="registration-modal">
        <textarea 
          class="registration-input" 
          v-model="registrationReason" 
          placeholder="请输入报名理由..."></textarea>
        <button class="submit-registration" @click="registerForEvent">提交报名</button>
      </view> -->

      <!-- Comment Section -->
      <view class="comments">
        <view class="add-comment">
          <textarea class="comment-input" v-model="newCommentText" placeholder="输入您的评论..."></textarea>
          <button class="submit-comment" @click="addComment(newCommentText)" >提交评论</button>
        </view>

        <view class="comment-list">
          <view class="comment-item" v-for="comment in comments" :key="comment.commentId">
            <text class="comment-user">{{ comment.username }}</text>
            <text class="comment-time">{{ formatDate(comment.commentedAt) }}</text>
            <text class="comment-content">{{ comment.commentText }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Footer: Created Info -->
    <view class="footer">
      <text class="created-info">创建者：{{ event.createdBy }}</text>
      <text class="created-info">创建时间：{{ formatDate(event.createdAt) }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      event: {},
      comments: [],
      registrationStatus: '',
      registrationButtonText: '',
      showRegistrationModal: false,
      registrationText: '',
	  newCommentText:''
    };
  },
  methods: {
    fetchEventDetails() {
      const eventId = this.$route.query.eventId;
      uni.request({
        url: `http://154.8.140.108:8883/api/events/get?eventId=${eventId}`,
        method: 'GET',
        success: (response) => {
          if (response.data.code === 1) {
            this.event = response.data.data;
          }
        }
      });
    },
    fetchEventComments() {
      const eventId = this.$route.query.eventId;
      uni.request({
        url: `http://154.8.140.108:8883/api/comments/getEventComments?eventId=${eventId}`,
        method: 'GET',
        success: (response) => {
          if (response.data.code === 1) {
            this.comments = response.data.data;
          }
        }
      });
    },
	fetchRegistrationStatus() {
      const eventId = this.$route.query.eventId;
      const userId = uni.getStorageSync('userId'); 
      uni.request({
        url: `http://154.8.140.108:8883/api/registration/getUserRegistrationStatus?eventId=${eventId}&userId=${userId}`,
        method: 'GET',
        success: (response) => {
          if (response.data.code === 1) {
			  console.log(response.data.data);
            this.registrationStatus = response.data.data;
            this.updateRegistrationButtonText();
          }
        }
      });
    },
    updateRegistrationButtonText() {
      const statusTextMap = {
        'notReg': '报名参加',
        'pending': '等待审核',
        'approved': '审核已通过',
        'rejected': '审核未通过',
		'participated':'已成功参加'
      };
      this.registrationButtonText = statusTextMap[this.registrationStatus] || '状态未知';
    },
    handleRegister() {
      if (this.registrationStatus === 'notReg') {
        this.showRegistrationModal = true;
		console.log(this.showRegistrationModal);
      }
    },
	closeModal(){
		this.showRegistrationModal = false;
	},
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleString('zh-CN', options);
    },
	registerForEvent() {
	  const eventId = this.$route.query.eventId;
	  const userId = uni.getStorageSync('userId'); 
	  const registrationText = this.registrationText;
	
	  uni.request({
	    url: 'http://154.8.140.108:8883/api/registration/registerEvent',
	    method: 'POST',
	    data: {
	      eventId,
	      userId,
	      registrationText
	    },
	    success: (response) => {
	      if (response.data.code === 1) {
			this.showRegistrationModal = false;
			this.fetchRegistrationStatus();
	        uni.showToast({ title: response.data.data, icon: 'success' });
	      } else {
	        uni.showToast({ title: '报名失败', icon: 'none' });
	      }
	    },
	    fail: () => {
	      uni.showToast({ title: '网络错误', icon: 'none' });
	    }
	  });
	},
	addComment(commentText) {
	  const eventId = this.$route.query.eventId;
	  const userId = uni.getStorageSync('userId'); 
	
	  if (!commentText.trim()) {
	    uni.showToast({ title: '评论内容不能为空', icon: 'none' });
	    return;
	  }
	
	  uni.request({
	    url: 'http://154.8.140.108:8883/api/comments/addComment',
	    method: 'POST',
	    data: {
	      eventId,
	      userId,
	      commentText
	    },
	    success: (response) => {
	      if (response.data.code === 1) {
	        uni.showToast({ title: response.data.data, icon: 'success' });
			this.newCommentText='';
	        this.fetchEventComments(); // 刷新评论列表
	      } else {
	        uni.showToast({ title: '评论失败', icon: 'none' });
	      }
	    },
	    fail: () => {
	      uni.showToast({ title: '网络错误', icon: 'none' });
	    }
	  });
	},
  },
  mounted() {
    this.fetchEventDetails();
    this.fetchEventComments();
	this.fetchRegistrationStatus();
  }
};
</script>

<style>
.event-details {
  padding: 16px;
  background-color: #fff;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #4a4a8c;
}

.event-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-top: 8px;
}

.details {
  margin-bottom: 16px;
}

.description {
  font-size: 16px;
  color: #333;
  margin-bottom: 16px;
}

.info {
  display: flex;
  flex-direction: column;
}

.info-item {
  margin-bottom: 8px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #777;
}

.interactive {
  margin-top: 16px;
  text-align: center;
}

.register-button {
  border: 2px solid #4a4a8c;
  background-color: transparent;
  color: #000;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.register-button:disabled {
  cursor: not-allowed;
  background-color: #f0f0f0;
  color: #aaa;
}

.register-button:hover {
  background-color: #f3f3f3;
}

.registration-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.registration-input {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  resize: none;
}

.submit-registration {
  align-self: flex-end;
  border: 2px solid #4a4a8c;
  background-color: transparent;
  color: #000;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.comments {
  margin-top: 24px;
  text-align: left;
}

.add-comment {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.comment-input {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  resize: none;
}

.submit-comment {
  align-self: flex-end;
  border: 2px solid #4a4a8c;
  background-color: transparent;
  color: #000;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.comment-list {
  margin-top: 16px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}

.comment-user {
  font-weight: bold;
  color: #4a4a8c;
}

.comment-time {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.comment-content {
  display: block;
  margin-top: 4px;
  color: #333;
}

.footer {
  margin-top: 32px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
}
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  position: relative;
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

.modal-header {
  position: relative;
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
}

.modal-body {
  padding: 16px;
}

.modal-image image {
  width: 100%;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.modal-info {
  margin-bottom: 16px;
}

.modal-event-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.modal-event-date, 
.modal-event-location {
  font-size: 14px;
  color: #555;
}

.modal-textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  color: #333;
  resize: none;
  outline: none;
}

.modal-footer {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.submit-button {
  width: 100%;
  max-width: 200px;
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #0056b3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
