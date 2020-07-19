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
  goToRegist: function(){
    // 跳转到regist
    wx.navigateTo({
      url: '../regist/regist',
    })
  },
  formSubmit: function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // 信息错误判定
    if(e.detail.value.account == "" || e.detail.value.password == ""){
      wx.showModal({
        title: '提示',
        content: '请填写所有信息',
        success(res) {
          if (res.confirm) {
           console.log('用户点击确定')
          } else if (res.cancel) {
           console.log('用户点击取消')
          }
         }
      })
    }else{
      wx.request({
        url: 'http://localhost:8080/login',
        data: e.detail.value,
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          console.log(res.data);
        },
        fail:function(res){
          console.log("--------fail--------");
        }
      })
    }
  },
  
})