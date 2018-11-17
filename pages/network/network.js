// pages/network/network.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classInfo: null,
    setProcess: false,
    forward:null
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

   this.getClassInfo()

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
    this.getClassInfo()
    this.setData({
      setProcess:false
    })
    wx.stopPullDownRefresh()
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
  getClassInfo:function(){
    var _this = this

    _this.setData({
      classInfo: false
    })

    wx.request({
      url: app.globalData.base_url + "/xcx/query?type=network",
      header: {
        "cookie": "session=" + app.globalData.cookie
      },
      success: function (e) {
        
        _this.setData({
          classInfo: e.data.all_class_info
        })
        _this.data.forward = e.data.forwardUrl
        // console.log(e)

      }
    })
  },
  setNetwork: function(e){

    this.setData({
      classInfo:false,
      setProcess:true
    })

    var _this = this
      
    var url_encode = encodeURIComponent(_this.data.forward + e.target.id)
    // console.log(url_encode)

    wx.request({
      url: app.globalData.base_url+"/xcx/forward_url/"+"?url="+url_encode,
      header:{
        "Cookie":"session="+app.globalData.cookie
      },
      success:function(e){
        // console.log(e)
        if (e.statusCode == 200 && e.data.statusCode=='200'){
          wx.showModal({
            title: '网络操作',
            content: e.data.status,
            showCancel: false
          })

          _this.wait_refresh()
          _this.setData({
            setProcess: false
          })
        }else{
          wx.showModal({
            title: '请求失败',
            content: e.data.status,
          })
          //_this.data.setProcess = false
          _this.setData({
            setProcess:false
          })
          _this.wait_refresh()
          
        }
      },
      fail:function(){
        wx.showModal({
          title: '网络异常',
          content: '请手动下拉看是否是否有变化,或者联系beetle处理,我的微信号是:myemaillzx',
          showCancel: false,
          cancelText: '',
          cancelColor: '',
          confirmText: 'ok!',
          confirmColor: '',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        _this.setData({
          setProcess: false
        })
        _this.wait_refresh()
      }
    })

    
  },
  wait_refresh:function(){

    var _this = this
    setTimeout(function(){
      _this.data.setProcess = true
      _this.getClassInfo()
      
    },4000)
  }

})