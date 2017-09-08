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
    today: '2017-09-01',
    isShowMenuList: false,
    showModal: true
  },
  onReady: function () {
    // wx.login({
    //   success: function(res) {
    //     console.log('code =' + res.code)
    //   }
    // })

    // wx.getUserInfo({
    //   success: function(res) {
    //     console.log('encryptedData = ' + res.encryptedData)
    //     console.log('iv = '+ res.iv)
    //   }
    // })
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
    var temp = new Date(date)
    this.setData({
      currentDate: temp,
      nowaday: date
    })

    let today = new Date()
    if (Math.abs(temp.getTime() - today.getTime()) < 12 * 60 * 60 * 1000) {
      this.setData({
        isRightButtonEnable: false
      })
    }
    else {
      this.setData({
        isRightButtonEnable: true
      })
    }
  },
  menuAction: function () {
    console.log('menuAction')
    if (this.data.isShowMenuList) {
      this.setData({
        isShowMenuList: false
      })
    }
    else {
      this.setData({
        isShowMenuList: true
      })
    }
  },

  hidebg: function () {
    console.log('hidebg')
    this.setData({
      isShowMenuList: false
    })
  },
  navigatorTapAction: function() {
    this.setData({
      isShowMenuList: false
    })
  },
  /**
     * 弹窗
     */
  inputDeviceNum: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  getPhoneNumber: function (e) {
    if (e.detail.errMsg.indexOf('ok') != -1) {
      console.log('errMsg = ' + e.detail.errMsg)
      console.log('iv = ' + e.detail.iv)
      console.log('encryptedData = ' + e.detail.encryptedData)
      this.hideModal()
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请允许小程序获取用户手机号么',
      })
    }
  },

  inputChange: function (e) {

  }
})
