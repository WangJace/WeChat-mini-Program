// scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: ""
  },

  confirm: function() {

  },

  scanCode: function() {
    wx.scanCode({
      success: function (res) {
        that.setData({
          result: res.result
        })
      },
      fail: function (res) {
        
      }
    })
  }
})