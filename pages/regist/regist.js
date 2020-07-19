// pages/regist/regist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit: function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // 信息错误判定
    if(e.detail.value.id == "" || e.detail.value.password == "" || e.detail.value.surepswd == "" || e.detail.value.sex == "" || e.detail.value.password !== e.detail.value.surepswd){
      wx.showModal({
        title: '提示',
        content: '请正确完善所有注册信息',
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
        url: 'http://localhost:8080/regist',
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