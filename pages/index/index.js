//index.js
//获取应用实例
const app = getApp()

Page({

clickMe: function(){
this.setData({msg:""})
var currObj = this
wx.login({
  success(res) {
    console.log("I am kumanxuan")
    if (res.code) {
      //发起网络请求
      
      //这里成功之后,就可以尝试去获取用户的openid了
      var res_url = ""

      wx.request({
        url: res_url,
        success(res1){
          console.log(res1)
          currObj.setData({openid:res1.data.openid})
        }
        // data: {
        //   code: res.code
        // }
      })
      

    } else {
      console.log('登录失败！' + res.errMsg)
    }
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
}

,
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
  wifiInfo:function(){
    wx.navigateTo({
      url: '../wifi/wifi',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
