// pages/wifi/wifi.js

const app = getApp()

Page({



  /**
   * 页面的初始数据
   */
  data: {
    wifiInfo:{},
    name:'xuan'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this

  // 第一次尝试去获取后台数据,并且显示出来先
  wx.request({
    url: app.globalData.base_url+"/xcx/request",
    method : "post",
    data:{
      "type":"wifi",
    },
    header:{
      "cookie": "session="+app.globalData.cookie
    },
    success(res){
      console.log(res)
      wx.showToast({
        title: "加载成功!",
        duration: 2000,
      })
      //console.log(_this)
      console.log(res)
      _this.setData({ wifiInfo: res.data.status })
      //_this.setData({ wifiInfo: [{'wifiName':'xx'},{"wifi":"yy"}] })
      
    }
  })

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