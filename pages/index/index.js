//index.js
//获取应用实例
const app = getApp()

Page({

clickMe: function(){
this.setData({msg:"哈哈哈哈"})
wx.login({
  success(res) {
    console.log("I am kumanxuan")
    if (res.code) {
      //发起网络请求
      
      //这里成功之后,就可以尝试去获取用户的openid了
      var res_url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2f6212c8f8f7172e&secret=e7e73777f0b044961cc47a720853b226&js_code='+res.code+'&grant_type=authorization_code'

      wx.request({
        url: res_url,
        success(res1){
          console.log(res1)
          this.setData({openid:res1.data.openid})
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
  data: {
    userDetailInfo: '',
    openid: '',
    motto: '欢迎使用-狼码办公小程序',
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
