Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRegisterInfo : '',
    
  },

  //检查用户已经是登陆用户

  checkUserRegisterInfo: function(){
    //后台请求,携带code给后台

    var userRegisterInfo = this.data.userRegisterInfo
    var req_url = "http://127.0.0.1:5000/xcx/verify?code="
    var _this = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: req_url+res.code,
            success: function(res){
              
              userRegisterInfo = res.data.status
              _this.setData({
                userRegisterInfo:userRegisterInfo
              })
              // this.setData({
              //   userRegisterInfo: res.data.status
              // })
              
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkUserRegisterInfo()
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