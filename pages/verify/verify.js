const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    email:null,
    verify:null,
    userRegisterInfo : '',
    isRegister: false,
    code: null,
    req_url: app.globalData.base_url+"/xcx/verify"
  },

  //检查用户已经是登陆用户

  checkUserRegisterInfo: function(){
    //后台请求,携带code给后台
    var userRegisterInfo = this.data.userRegisterInfo
    var _this = this
    var code = ''
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
            if (res.data.statusCode == '200'){
              
              _this.data.isRegister = true,
              _this.setData({
                isRegister:true
              })
            }else{
              _this.setData({
                isRegister: false
              })
            }
            _this.setData({
            userRegisterInfo: userRegisterInfo
            })}
          })
        } else {
          // console.log('登录失败！' + res.errMsg)
        }
    }
    })
  },
  formSubmit: function (e) {

    
    if (this.data.code && e.detail.value.realname){
      //参数不为空,请求后台注册账号
      var realname = e.detail.value.realname
      var req_url = this.data.req_url
      

      wx.login({
        success: function (e) {
        
          wx.request({
            url: req_url,
            data: {
              "code": e.code,
              "realname": realname
            },
            method: "post",
            success: function (e) {
              wx.showModal({
                title: '后台提示',
                content: e.data.status,
                showCancel:false
              })
              // console.log(e)
            }
          })
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

    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formSubmitMail: function (e) {

    var _this = this

    if (e.detail.value.verifyCode && e.detail.value.email && e.detail.value.email!='@wolfcode.cn') {
      //参数不为空,请求后台注册账号
      var mail = e.detail.value.email
      var verifyCode = e.detail.value.verifyCode
      

      wx.login({
        success: function (e) {

          wx.request({
            url: app.globalData.base_url+"/xcx/verify_code/?code="+e.code,
            data: {
              "email": mail,
              "verifyCode": verifyCode
            },
            method: "post",

            success: function (e) {
              wx.showModal({
                title: '后台提示',
                content: e.data.status,
                showCancel: false
              })
              if (e.data.statusCode == '200'){
                _this.checkUserRegisterInfo()
              }
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '邮箱或者验证码都不能为空',
        showCancel: false,
        cancelColor: '',
        confirmText: 'AMD YES',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  sendVerifyCode: function(e){
   
    var _this = this
    if (this.data.mail && this.data.mail != '@wolfcode.cn'){

      wx.login({

        success:function(e){

          wx.request({
            url: app.globalData.base_url + "/xcx/verify_code/?code="+e.code+"&email=" + encodeURIComponent(_this.data.mail),
            success: function (e) {
              
              wx.showModal({
                title: '提示',
                content: e.data.status,
                showCancel: false,
                cancelText: '',
                cancelColor: '',
                confirmText: 'ok',
                confirmColor: '',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
              // console.log(e)

            }
          })

        }
        
      })
      

    }else{
      wx.showModal({
        title: '邮箱不能为空',
        content: '',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: 'OK',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }

  },
  formReset: function () {
    // console.log('form发生了reset事件')
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
    this.checkUserRegisterInfo()
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
  //下拉刷新
  onPullDownRefresh: function () {
    this.checkUserRegisterInfo()
    this.onLoad()
    if (this.data.isRegister){
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
    wx.stopPullDownRefresh()
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  setMail: function(e){

    this.data.mail = e.detail.value
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})