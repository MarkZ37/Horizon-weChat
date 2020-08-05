// pages/about_my/index.js
let userStatus = require('../status/status.js')
var app = getApp();
Page({

  //页面初始化
  onLoad: function() {

  },
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: app.globalData.isLogin
  },

  // 事件函数
  goToSetup: function(){
    // 跳转到设置界面
    wx.navigateTo({
      url: 'setup/setup',
    })
  },
  goToMore: function(){
    // 跳转到more
    wx.navigateTo({
      url: 'more/more',
    })
  },
  goToDeploy: function(){
    //跳转deploy
    wx.navigateTo({
      url: '../deploy/deploy',
    })
  },
  dealLogin: function(){
    var this_ = this;
    //授权登录
    wx.login({
      success: function(res) {
        // console.log(res)
        wx.getUserInfo({
          //获取用户信息
          lang: 'zh_CN',
          success: function(result) {
            // console.log(result);
            wx.request({
              url: 'http://localhost:8080/api/user/login',
              method: 'POST',
              data: {
                encryptedData: result.encryptedData,
                iv: result.iv,
                code: res.code
              },
              success: function(userInfo) {
                console.log(userInfo);
                //登录成功
                if(userInfo.data.status == 777) {
                  wx.setStorageSync('userInfo', userInfo.data.data);
                  this_.setUserInfo();
                  this_.setArticle();
                  app.globalData.isLogin = true;
                  this_.setData({
                    isLogin: app.globalData.isLogin
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  setUserInfo: function() {
    var this_ = this;
    var userInfo = wx.getStorageSync('userInfo');
    this_.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
      gender: userInfo.gender=1 ? '男':'女'
    })
  },
  setArticle: function(){
    //设置前端文章显示
    var openid = wx.getStorageSync('userInfo').openId;
    var this_ = this;
    wx.request({
      url: 'http://localhost:8080/api/article/getArticle',
      data: {
        openid: openid,
      },
      method: 'POST',
      success: function(e) {
        console.log(e);
        // wx.setStorageSync('articles', e.data.data);
        this_.setData({
          articles: e.data.data,
        })
      }
    })
  },
  onShow: function(){
    var this_ = this;
    this_.setArticle();
  }
})