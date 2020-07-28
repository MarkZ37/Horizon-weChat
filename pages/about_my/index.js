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
      success: function(res) {
        console.log(res)
        wx.getUserInfo({
          //获取用户信息
          lang: 'zh_CN',
          success: function(result) {
            console.log(result);
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
              }
            })
          }
        })
        // wx.request({
        //   url: 'http://localhost:8080/api/user/login',
        //   method: 'POST',
        //   data: {
        //   //将code传到后端
        //     code: res.code,
        //     // iv: res.iv,
        //     // encryptedData: res.encryptedData
        //   },
        //   success: res => {
        //     //获取到openid
        //     console.log(res);
        //     wx.getUserInfo({
        //       //获取用户信息，成功后传入后端进行数据解析
        //       lang: 'zh_CN',
        //       success: function(r){
        //         console.log(r);
        //       }
        //     })
        //     // console.log("userInfo:"+app.globalData.userInfo)
        //     // wx.request({
        //     //   url: '/wx-login/',
        //     //   method: 'POST',
        //     //   data: {
        //     //     openid: res.openid,
        //     //     session_key: res.session_key,
        //     //     // nickname: app.globalData.userInfo.nickName,
        //     //     // avatar_url: app.globalData.userInfo.avatarUrl,
        //     //     // gender: app.globalData.userInfo.gender
        //     //   },
        //     //   //登录成功后返回token保存在storage中
        //     //   success: res => {
        //     //     console.log(res)
        //     //     //token存入storage
        //     //     wx.setStorageSync('jwt_token', res.token)
        //     //     wx.setStorageSync('user_id', res.user_id)
        //     //     this.reFreshUserProfile()
        //     //     //登录状态置为true
        //     //     this.setData({
        //     //       isLogin: true,
        //     //       hasUserInfo: true
        //     //     })
        //     //     // app.globalData.isLogin = true
        //     //   }
        //     // })

        //   }
        // })
      }
    })
  }
})