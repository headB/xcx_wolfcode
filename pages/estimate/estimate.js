// pages/estimate/estimate.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    header_info:{},
    array: ['点击选择我','讲师', '辅导员', '班主任'],
    objectArray: [
      {
        id: 1,
        name: '讲师'
      },
      {
        id: 2,
        name: '辅导员'
      },
      {
        id: 3,
        name: '班主任'
      },
      {
        id: 0,
        name: ''
      }
    ],
    index: 0,
    type:null,
    estimateInfo:null,
  },

  bindPickerChange: function (e) {

    var _this = this
    
    this.setData({
      index: e.detail.value
    })

    var type_value = this.data.array[e.detail.value]

    console.log(type_value)

    wx.request({
      url: app.globalData.base_url + '/xcx/query?type=estimate_info&port=' + type_value,
      header:{
        "Cookie":'session='+app.globalData.cookie,
      },
      success:function(e){
        if (e.data.statusCode == '200'){
          _this.setData({
            estimateInfo: e.data.class_info
          })
        }else{
          wx.showModal({
            title: '错误',
            content: '网络异常',
            showCancel: false,
          })
        }
        console.log(e)
        
      },
      fail:function(){
        wx.showModal({
          title: '错误',
          content: '网络异常',
          showCancel:false,
        })
      }
    })

  },

  showDetail:function(e){
    console.log(e)
    var _this = this
    var id = encodeURIComponent(e.target.id)
    wx.request({
      url: app.globalData.base_url+'/xcx/query?type=show_detail&url='+id,
      header: _this.data.header_info,
      success:function(e){
        console.log(e)
        wx.showModal({
          title: '评分查看',
          content: e.data.content,
          showCancel: false,
          cancelText: '',
          cancelColor: '',
          confirmText: '确定',
          confirmColor: '',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
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

    this.data.header_info = {
      "Cookie": 'session=' + app.globalData.cookie
    }
    

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
})