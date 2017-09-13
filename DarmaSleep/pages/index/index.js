//index.js
//获取应用实例
// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');
var app = getApp()
var interval
var varName
var ctx = wx.createCanvasContext('canvasArcCir')
var currentDate = new Date()

Page({
  data: {
    nowaday: "",
    isRightButtonEnable: false,
    isShowMenuList: false,
    showModal: false,
    today: '',
    score: 60,
    describe: '睡得不错'
  },
  onReady: function () {
    var date = new Date()
    this.setData ({
      today: date
    })
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
    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle')
    cxt_arc.setLineWidth(4)
    cxt_arc.setStrokeStyle('#E7EBEB')
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath()
    cxt_arc.arc(75, 75, 60, 0, 2 * Math.PI, false)
    cxt_arc.stroke()
    cxt_arc.draw()

    this.drawCircle()
  },
  drawCircle: function () {
    console.log('drawCircle')
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = this.data.score * 2 * Math.PI / 100 + 1.5 * Math.PI;
    ctx.setFillStyle('white');
    ctx.clearRect(0, 0, 200, 200)
    ctx.draw()
    var x = 75, y = 75, radius = 60
    ctx.setLineWidth(4)
    const grd = ctx.createLinearGradient(140, 0, 140, 140)
    grd.addColorStop(0, '#42C1A7')
    grd.addColorStop(1, '#F6CD69')
    ctx.setStrokeStyle(grd)
    ctx.setLineCap('round')
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, endAngle, false)
    ctx.stroke()
    ctx.draw()
  },
  onLoad: function () {
    console.log('onLoad')
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    var dateStr = util.formatDate(currentDate)
    console.log(dateStr)
    this.setData({
      // 调用函数时，传入new Date()参数，返回值是日期和时间
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
    currentDate.setDate(currentDate.getDate() - 1)
    this.setData({
      nowaday: util.formatDate(currentDate)
    })
  },
  right: function () {
    if (this.data.isRightButtonEnable) {
      // 修改日期
      currentDate.setDate(currentDate.getDate() + 1)
      if (Math.abs(currentDate.getTime() - new Date().getTime()) < 12 * 60 * 60 * 1000) {
        this.setData({
          isRightButtonEnable: false
        })
      }
      this.setData({
        nowaday: util.formatDate(currentDate)
      })
    }
  },
  dateChange: function (e) {
    var date = e.detail.value
    console.log(date)
    currentDate = new Date(date)
    this.setData({
      nowaday: date
    })
    if (Math.abs(currentDate.getTime() - new Date().getTime()) < 12 * 60 * 60 * 1000) {
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
  navigatorTapAction: function () {
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
