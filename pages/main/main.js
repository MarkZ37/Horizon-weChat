// pages/main/main.js
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
    var this_ = this;
    this_.setArticle();
   
  },
  setArticle: function(){
    var this_ = this;
    wx.request({
      url: 'http://39.106.174.218:8080/api/article/getMain',
      data:{},
      method: 'POST',
      success: function(e) {
        console.log(e)
        for(var i = 0 ; i < e.data.data.length ; i++){
          var timeString = this_.format(e.data.data[i].time,'yyyy-MM-dd HH:mm');
          // console.log("timeString:"+timeString);
          e.data.data[i].time = timeString;
          // console.log("new time:"+e.data.data[i].time);
        }
        this_.setData({
          articles: e.data.data,
        })
      }
    })
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
  //封装时间格式
  format: function(time, format) {
    var t = new Date(time);
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    })
  }
})