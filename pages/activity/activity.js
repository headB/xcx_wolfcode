// pages/activity.js
Page({


//自己写的程序部分
//就是叩丁狼活动室
  applyFor: function () {
    wx.navigateTo({
      url: '/pages/activity/activity1/activity1',
    })
  },

  detail: function () {
    wx.navigateTo({
      url: '/pages/activity/activity2/activity2',
    })
  },

  myActivity: function () {
    wx.navigateTo({
      url: '/pages/activity/activity3/activity3',
    })
  },

  review: function () {
    wx.navigateTo({
      url: '/pages/activity/activity4/activity4',
    })
  },


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

  }
})