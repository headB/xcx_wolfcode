// pages/activity/activity4/activity4.js

const app = getApp();

Page({

  
  passed: function (e) {

    //#通过处理

  //获取id
  var uuid = e.target.id;

    wx.request({
      header: {
        "Cookie": 'session=' + app.globalData.cookie,

      },

      url: app.globalData.base_url + "/xcx/activity_review",
      method: "PUT",
      data: {

        id:uuid

      },
      success(res) {

        //成功之后就手动刷新
        // wx.startPullDownRefresh()
        
        //成功之后就手动刷新

        if(res.data.code == 500){

          wx.showModal({
            title: '活动申请审核',
            content: res.data.status,
          })

        }else{

          wx.showModal({
            title: '活动申请审核',
            content: '审核通过',
          })

          wx.startPullDownRefresh()
        }

       
        // wx.stopPullDownRefresh()
      }
    })


    // wx.navigateTo({
    //   url: '/pages/activity/activity2/activity2',
    // })
  },

  //驳回审核!

  reject: function (e) {

    var uuid = e.target.id;
    
    console.log(e)

    //然后就是后台请求了!
    wx.request({
      header: {
        "Cookie": 'session=' + app.globalData.cookie,

      },

      url: app.globalData.base_url + "/xcx/activity_review",
      method: "DELETE",
      data:{

        id:uuid

      },
      success(res) {

      //成功之后就手动刷新
      wx.startPullDownRefresh()

      }
    })
    // wx.navigateTo({
    //   url: '/pages/activity/activity2/activity2',
    // })

  },


  /**
   * 页面的初始数据
   */
  data: {

    content:'',
    request: app.globalData.base_url + "/xcx/activity_review"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
    var _this = this;
    //获取API数据.
    wx.request({
      header: {
        "Cookie": 'session=' + app.globalData.cookie,

      },

      url: app.globalData.base_url + "/xcx/activity_review",
      method: "GET",
      success(res) {


        _this.data.content = res.data.content
        console.log(res.data.status)
        console.log(_this.data)

        _this.setData({
          content: res.data.content
        })


      }
    })
    

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


    console.log("six")
    this.onLoad()
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

  }
})