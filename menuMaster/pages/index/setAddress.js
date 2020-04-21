// pages/index/setAddress.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择收货地址'
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
    this.setData({
      address: app.globalData.address
    })
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
  relocate: function() { 
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        // wx.openLocation({
        //   latitude,
        //   longitude,
        //   scale: 18
        // })  // 打开内置地图
        const locationString = res.latitude +','+ res.longitude
        wx.request({
          url: "https://apis.map.qq.com/ws/geocoder/v1/?",
          data:{
            "key" : "K4HBZ-JIFK4-NP2UU-DR4GS-ZS7VQ-ZIFLE",
            "location" : locationString
          },
          success: (res)=>{
            const address = res.data.result.address
            app.globalData.address = address;
            wx.navigateBack()
          }
        })
      }
    })
  }
})