//index.js
//获取应用实例
// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    nowaday: "",
    isRightButtonEnable: false,
    currentDate: '2017-09-01',
    today: '2017-09-01'
  },
  onLoad: function () {
    console.log('onLoad')
    var date = new Date()
    this.data.currentDate = date
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    var dateStr = util.formatDate(date)
    console.log(dateStr)
    this.setData({
      // 调用函数时，传入new Date()参数，返回值是日期和时间
      currentDate: date,
      today: date,
      nowaday: dateStr
    })
  },
  left: function () {
    var flag = this.data.isRightButtonEnable
    if (!flag) {
      flag = !flag
      this.setData({
        isRightButtonEnable: true
      })
    }
    // 修改日期
    var date = this.data.currentDate;
    date.setDate(date.getDate() - 1)
    this.setData({
      currentDate: date,
      nowaday: util.formatDate(this.data.currentDate)
    })
  },
  right: function () {
    if (this.data.isRightButtonEnable) {
      var date = this.data.currentDate;
      console.log(date.getTime())
      date.setDate(date.getDate() + 1)
      console.log(date.getTime())
      let today = new Date()
      console.log(today.getTime())
      if (Math.abs(date.getTime() - today.getTime()) < 12 * 60 * 60 * 1000) {
        this.setData({
          isRightButtonEnable: false
        })
      }
      this.setData({
        currentDate: date,
        nowaday: util.formatDate(this.data.currentDate)
      })
    }
  },
  dateChange: function (e) {
    var date = e.detail.value
    console.log(date)
    this.setData({
      currentDate: date,
      nowaday: date
    })
  }
})
