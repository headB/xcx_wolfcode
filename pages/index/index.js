//index.js
//获取应用实例
const app = getApp()

Page({
  onPullDownRefresh: function(){
        this.checkAuthen()
        wx.stopPullDownRefresh()
    },
  networkController: function(){
    wx.navigateTo({
      url: '/pages/network/network',
    })
    },
  verify: function(){

    // wx.reLaunch({
    //   url: '/pages/account/acount',
    // })

    wx.navigateTo({
      url: '/pages/account/account',
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
    var _this1 = this
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
          url: app.globalData.base_url+"/xcx/verify",
          data:{
            'code':e.code
          },
          success:function(e1){
            console.log(e1)
              if (e1.data.statusCode=='200'){
                  _this.data.hasRegister = true
                  app.globalData.testPublic = true
                  _this.setData({
                    hasRegister:true
                  })
                  //headerInfo = e1
                app.globalData.cookie  = e1.header["Set-Cookie"].split(/;/)[0].split(/=/)[1]
                if(!app.globalData.cookie){
                  wx.showModal({
                    title: '登陆后台',
                    content: '获取或者设置cookie失败',
                    showCancel: false,
                    cancelText: '',
                    cancelColor: '',
                    confirmText: 'roger',
                    confirmColor: '',
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                  })
                }
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
    
  },
  onShow:function(){
    
    var _this = this
    if (app.globalData.firstTime){
      setTimeout(function(
        
      ) {
        if (_this.data.hasUserInfo && !_this.data.hasRegister) {

          _this.checkAuthen()
        }},1000)
      app.globalData.firstTime = false
    }
   
    if (this.data.hasUserInfo && !this.data.hasRegister){
      
        this.checkAuthen()
      }
  },
  tryLogin: function(){

  }
})
