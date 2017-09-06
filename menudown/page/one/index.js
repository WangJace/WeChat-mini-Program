var cityData = require('../../utils/city.js');

// page/one/index.js
Page({
  data:{
    content: [],
    nv: [],
    nzopen:false,
    nzshow:false,
    isfull:false,
    select1: '',
    select2:'',
    shownavindex:''
  },
  onLoad: function(){
    this.setData({
      nv:['衣服','裤子','内衣','服饰','衣服','裤子','内衣','服饰','衣服','裤子','内衣','服饰']
    })
  },
  list: function(e){
    if(this.data.nzopen){
      this.setData({
        nzopen:false,
        nzshow:false,
        isfull:false,
        shownavindex: 0
      })
    }else{
      this.setData({
        content:this.data.nv,
        nzopen:true,
        nzshow:false,
        isfull:true,
        shownavindex:e.currentTarget.dataset.nav
      })
    }
  },
  hidebg: function(e){

    this.setData({
      qyopen:false,
      nzopen:false,
      pxopen:false,
      nzshow:true,
      pxshow:true,
      qyshow:true,
      isfull:false,
      shownavindex: 0
    })
  }
})