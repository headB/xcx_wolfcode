// pages/account/account.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountInfo: null
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

    var _this = this

    wx.request({
      url: app.globalData.base_url+'/xcx/query?type=class_network_account',
      header: {
        "Cookie":"session="+app.globalData.cookie
      },
      success:function(e){

        if (e.data.statusCode == '200'){
          _this.setData({
            accountInfo:e.data.status
          })
        }else{
          _this.setData({
            accountInfo: "错误"
          })
        }

        console.log(e)

      },
      fail:function(){
        _this.setData({
          accountInfo: "错误!"
        })
      }
    })

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