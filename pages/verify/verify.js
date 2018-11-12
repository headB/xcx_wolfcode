Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRegisterInfo : '',
    isRegister: false,
    code: null,
    req_url: "http://127.0.0.1:5000/xcx/verify"
  },

  //检查用户已经是登陆用户

  checkUserRegisterInfo: function(){
    //后台请求,携带code给后台

    var userRegisterInfo = this.data.userRegisterInfo
    var _this = this
    wx.login({
      success(res) {
        if (res.code) {
          _this.data.code = res.code
          wx.request({
            url: _this.data.req_url,
            data:{
              'code':res.code
            },
            success: function (res) {
            userRegisterInfo = res.data.status
            _this.setData({
            userRegisterInfo: userRegisterInfo
            })}
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
    }
    })
  },
  formSubmit: function (e) {

    
    if (this.data.code && e.detail.value.realname){
      //参数不为空,请求后台注册账号
      var realname = e.detail.value.realname
      wx.request({
        url: this.data.req_url,
        data:{
          "code":this.data.code,
          "realname":realname
        },
        method:"post",
        success:function(e){
          console.log(e)
        }
      })

    }else{
      wx.showModal({
        title: '提示',
        content: '名字不能为空',
        showCancel: true,
        cancelText: 'Intel NO',
        cancelColor: '',
        confirmText: 'AMD YES',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
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