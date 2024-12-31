<template>
	<view class="homepage">
	    <!-- 顶部导航栏 -->
	    <view class="navbar">
	      <text class="title">活动助手</text>
	      <view class="search-bar">
	        <input type="text" placeholder="搜索活动" />
	        <button>搜索</button>
	      </view>
	    </view>
	
	    <!-- 活动分类展示 -->
	    <view class="category-bar">
	        <scroll-view scroll-x="true" class="categories">
	          <text 
	            class="category-item" 
	            v-for="(category, index) in categories" 
	            :key="index" 
	            :class="{ 'active-category': selectedCategory === index }" 
	            @click="selectCategory(index)">
	            {{ category }}
	          </text>
	        </scroll-view>
	    </view>
	
	    <!-- 活动列表 -->
	     <view class="activity-list">
	       <view
	         class="activity-card"
	         v-for="activity in filteredActivities"
	         :key="activity.eventId"
	         @click="goToActivityDetail(activity.eventId)"
	       >
	         <image class="activity-image" :src="activity.picUrl" />
	         <view class="activity-info">
	           <text class="activity-title">{{ activity.title }}</text>
	           <text class="activity-details">{{ activity.eventDate }} | {{ activity.location }}</text>
	           <text class="activity-status">容量：{{ activity.capacity }}</text>
	         </view>
	       </view>
		   <uni-section title="默认样式" type="line" padding>
		   	 <uni-pagination :page-size="pageSize" :current="current" :total="total" title="标题文字" @change="handlePageChange"/>
		   </uni-section>
	     </view>
		 
	
	    <!-- 轮播图区域 -->
	    <view class="carousel">
	      <swiper autoplay="true" interval="3000" circular="true">
	        <swiper-item v-for="banner in banners" :key="banner.id">
	          <image :src="banner.image" class="banner-image" />
	        </swiper-item>
	      </swiper>
	    </view>
	
	    <!-- 公告栏 -->
	    <view class="announcement">
	      <text>平台公告：新活动已上线，快来报名！</text>
	    </view>
	  </view>
</template>

<script>

export default {
	data() {
		return {
		      banners: [
		        { id: 1, image: '/static/img/activity/news/new1.jpg' },
		        { id: 2, image: '/static/img/activity/news/new2.jpg' },
		        { id: 3, image: '/static/img/activity/news/new3.jpg' }
		      ],
			  categories: ['全部活动', '讲座', '比赛', '志愿活动'],
			  selectedCategory: 0,
		      activities: [],
			  current: 1,
			  total: 0,
			  pageSize: 5
		};
	},
	onLoad() {},
	computed: {
		filteredActivities() {
		  if (this.selectedCategory === 0) return this.activities;
		  return this.activities.filter(activity => activity.type === this.categories[this.selectedCategory]);
		}
	},
	methods: {
	  handlePageChange(newPage) {
		  console.log(newPage)
        this.current = newPage.current; // 更新当前页码 
        this.fetchActivities(); // 重新获取数据 
      }, 
		selectCategory(index) {
		this.selectedCategory = index;
		},
		fetchActivities() {
		  console.log(this.current,this.pageSize,this.total);
		  uni.request({
			url: `http://154.8.140.108:8883/api/events/list?pageNum=${this.current}&pageSize=${this.pageSize}`,
			method: 'GET',
			success: (res) => {
			  if (res.data.code === 1) {
				this.activities = res.data.data.records;
				this.total = res.data.data.total;
			  } else {
				console.error('Failed to fetch activities:', res.data.msg);
			  }
			},
			fail: (err) => {
			  console.error('Request failed:', err);
			}
		  });
		},
		goToActivityDetail(eventId) {
		    uni.navigateTo({
		      url: `/pages/eventDetail/eventDetail?eventId=${eventId}`,
		    });
		  },
	},
  mounted() {
    this.fetchActivities();
  }
};
</script>

<style scoped>
.homepage {
  padding: 16px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.search-bar {
  display: flex;
  align-items: center;
}
.search-bar input {
  width: 150px;
  padding: 4px;
  margin-right: 8px;
}
.category-bar {
  margin-top: 16px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.categories {
  display: flex;
  padding: 8px;
}
.category-item {
  margin-right: 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.active-category {
  font-weight: bold;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
.activity-list {
  margin-top: 16px;
}
.activity-card {
  display: flex;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.activity-image {
  width: 100px;
  height: 100px;
}
.activity-info {
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.activity-title {
  font-size: 16px;
  font-weight: bold;
}
.activity-details {
  font-size: 12px;
  color: #666;
}
.activity-status {
  font-size: 12px;
  font-weight: bold;
}
.carousel {
  margin-top: 16px;
}
.banner-image {
  width: 100%;
  height: 150px;
}
.announcement {
  margin-top: 16px;
  padding: 8px;
  background-color: #fffae6;
  border-left: 4px solid #ffd700;
  font-size: 14px;
}
</style>
