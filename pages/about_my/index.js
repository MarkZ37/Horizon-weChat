// pages/about_my/index.js
let userStatus = require('../status/status.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    //授权登录
    wx.login({
      success: res => {
        console.log(res)
		//请求后端换取openid的接口
        wx.request({
          url: 'http://localhost:8080/api/user/login',
          method: 'POST',
          data: {
          //将code传到后端
            code: res.code
          },
          success: res => {
            //获取到openid作为账号密码
            console.log(res)
            // console.log(app.globalData.userInfo)
            wx.request({
              url: '/wx-login/',
              method: 'POST',
              data: {
                openid: res.openid,
                session_key: res.session_key,
                // nickname: app.globalData.userInfo.nickName,
                // avatar_url: app.globalData.userInfo.avatarUrl,
                // gender: app.globalData.userInfo.gender
              },
              //登录成功后返回token保存在storage中
              success: res => {
                console.log(res)
                //token存入storage
                wx.setStorageSync('jwt_token', res.token)
                wx.setStorageSync('user_id', res.user_id)
                this.reFreshUserProfile()
                //登录状态置为true
                this.setData({
                  isLogin: true,
                  hasUserInfo: true
                })
                // app.globalData.isLogin = true
              }
            })

          }
        })
      }
    })
  }
})