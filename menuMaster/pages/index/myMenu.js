// pages/index/myMenu.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedMenu:null,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.changeSelectedMenu()
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
    this.changeSelectedMenu()
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

  changeSelectedMenu: function () {
      this.setData({
        selectedMenu: app.globalData.selectedMenu || []
      })
      this.computeTotal()
  },
  changeMenu: function(event) {
    const method = event.currentTarget.dataset.method;
    const _id = event.currentTarget.dataset.id;
    let { selectedMenu, currentList} = this.data;
    let _idx = null; // 在选择列表的下标
    const len = selectedMenu.filter((item, index) => {
      if(item._id === _id) _idx = index;
      return item._id === _id
    }) || []
    if(method === 'add'){
      if(len.length){
        len[0].num += 1;
      }else{
        len[0].num = 1;
        selectedMenu.push(...len);
      }
      // _item.num =  _item.num ? _item.num : 1;
    }else if(method === 'reduce'){
      if(len.length){
        if(len[0].num <= 1){
          selectedMenu.splice(_idx, 1)
        }else{
          len[0].num -= 1;
        }
      }
    }
    
    this.setData({
      selectedMenu,
    },()=>{
      app.globalData.selectedMenu = this.data.selectedMenu;
      this.computeTotal()
    })    
  },
  computeTotal: function() {
    const { selectedMenu } = this.data;
    console.log(selectedMenu)
    let total = 0 ;
    selectedMenu.map( (item, index)=>{
      console.log(item.price)
      console.log(item.num)
      console.log(item.price * item.num)
      total += (item.price * item.num)
    })
    console.log(total)
    this.setData({
      total
    })
  }
})