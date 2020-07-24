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
      success: function (res) {
        console.log(res);
        wx.getSetting({
          success(setRes) {
            //判断是否已授权
            if (!setRes.authSetting['scope.userInfo']) {
              //授权访问
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  wx.getUserInfo({
                    lang: zh_CN,
                    success: function (userRes) {
                      //发起网络请求
                      wx.request({
                        url: 'url',
                        data: {
                          code: res.code,
                          encryptedData: userRes.encryptedData,
                          iv: userRes.iv
                        },
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'POST',
                        //服务器的回调
                        success: function (result) {
                          var data = result.data.result;
                          data.expireTime = nowDate + EXPIRETIME;
                          wx.setStorageSync('userInfo', data);
                          userInfo = data;
                        }
                      })
                    }
                  })
                }
              })
            } else {
              //获取用户信息
              wx.getUserInfo({
                lang: zh_CN,
                success: function (userRes) {
                  //网络请求
                  wx.request({
                    url: 'url',
                    data: {
                      code: res.code,
                      encryptedData: userRes.encryptedData,
                      iv: userRes.iv
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    success: function (result) {
                      var data = result.data.result;
                      data.expireTime = nowDate + EXPIRETIME;
                      wx.setStorageSync('userInfo', data);
                      userInfo = data;
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }
})