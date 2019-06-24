// pages/activity1/activity1.js

//全局变量!
const app = getApp()

Page({

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    // console.log(app.globalData.cookie);
    var _this = this;
    console.log(_this.data);
    wx.request({
      url: app.globalData.base_url+"/xcx/activity", //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        topic: e.detail.value.topic,
        name: e.detail.value.name,
        startDate: _this.data.startDate, 
        endDate: _this.data.endDate
      },
      header: {
        'content-type': 'application/json', // 默认值
        "cookie": "session=" + app.globalData.cookie //设置了之后才有登陆状态啊~
      },
      success(res) {
        console.log(res.data)
        console.log(res.data.status)
        console.log(this.data)


      }
    })
    
  //然后提交到后台

  //然后成功之后就跳到首页

  },

  startDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  endDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

    startDate:"←点击设置开始时间(郁我阿笨)",
    endDate:"←点击设置结束时间(收皮时间)",
    topic:"",
    name:""
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