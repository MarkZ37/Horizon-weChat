// pages/about_my/index.js
let userStatus = require('../status/status.js')

Page({

  //页面初始化
  onLoad: function() {

  },
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
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
                  this_.setData({
                    isLogin: true
                  })
                  this_.setArticle;
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
    var openid = wx.getStorageSync('userInfo').openId;
    wx.request({
      url: 'http://localhost:8080/api/article/getArticle',
      data: {
        openid: openid,
      },
      method: 'POST',
      success: function(e) {
        console.log(e);
      }
    })
  }
})