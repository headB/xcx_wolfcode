//index.js
//获取应用实例
const app = getApp()

Page({
  onPullDownRefresh: function(){
        this.checkAuthen()
        wx.stopPullDownRefresh()
    },
  networkController: function(){
    this.setData({msg:""})
    var currObj = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          
          //这里成功之后,就可以尝试去获取用户的openid了
          var res_url = ""
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getUserInfo({
      withCredentials: true,
      success: function(res){
        console.log(res)
      }
      })

    },
  verify: function(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  data: {
    userDetailInfo: '',
    openid: '',
    motto: '欢迎使用 beetle_Lai 轻办公',
    userInfo: {},
    hasUserInfo: false,
    hasRegister:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      //你好,我是第一次加载的!

      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    var _this = this
    setTimeout(function(){
      if (_this.data.hasUserInfo) { _this.checkAuthen() }
    },1000)
    
    },
  wifiInfo:function(){
    wx.navigateTo({
      url: '../wifi/wifi',
    })
    },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.errMsg == 'getUserInfo:ok'){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    this.checkAuthen()
  },
  checkAuthen:function(){
    var _this = this
    wx.login({
      success:function(e){
        wx.request({
          url: app.globalData.req_url,
          data:{
            'code':e.code
          },
          success:function(e1){
              if (e1.data.statusCode=='200'){
                  _this.data.hasRegister = true
                  app.globalData.testPublic = true
                  _this.setData({
                    hasRegister:true
                  })
              }
              else{

                wx.showModal({
                  title: '需要先认证',
                  content: '使用本功能需要先登记然后使用',
                  showCancel: false,
                  success:function(){
                    wx.switchTab({
                      url: '/pages/verify/verify',
                    })
                  },
                  
                })

                
              }
          }
        })
      }
    })
    
  }
})
