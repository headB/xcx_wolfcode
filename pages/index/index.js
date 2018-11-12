//index.js
//获取应用实例
const app = getApp()

Page({
 onPullDownRefresh: function(){
   
   setTimeout(function(){
     console.log("我是网络延迟!")
     wx.stopPullDownRefresh()
   },2000)
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
  }
  
})
