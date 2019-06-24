// pages/activity1/activity1.js

//全局变量!
const app = getApp()

var dateTimePicker = require('time.js');

Page({

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    // console.log(app.globalData.cookie);
    var _this = this;
    console.log(_this.data);
    var d1 = this.data.dateTime;
    var d2 = this.data.dateTime1;
    wx.request({
      url: app.globalData.base_url+"/xcx/activity", //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        topic: e.detail.value.topic,
        name: e.detail.value.name,
        startDate: d1[0]+2000+"-"+(d1[1]+1)+"-"+d1[2]+" "+d1[3]+":"+d1[4], 
        endDate: d2[0] + 2000 + "-" + (d2[1] + 1) + "-" + d2[2] + " " + d2[3] + ":" + d2[4]
      },
      header: {
        'content-type': 'application/json', // 默认值
        "cookie": "session=" + app.globalData.cookie //设置了之后才有登陆状态啊~
      },
      success(res) {
        console.log(res.data)
        console.log(res.data.status)
        console.log(this.data)


      }
    })
    
  //然后提交到后台

  //然后成功之后就跳到首页

  },

  startDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  endDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

    startDate:"←点击设置开始时间(郁我阿笨)",
    endDate:"←点击设置结束时间(收皮时间)",
    topic:"",
    name:"",
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

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

  },

  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  }




})