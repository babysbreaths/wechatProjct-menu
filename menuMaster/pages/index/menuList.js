// pages/index/menuList.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuTabList: [],  // 类别列表
    tabDetailList:[],  //所有菜单
    selectedMenu:[],  // 选择的菜品
    currentTab:"",
    currentList:[], //当前选择的列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectedMenu: app.globalData.selectedMenu || [],
      menuTabList:[
        {
          id:"01",
          value:'类别一',  //显示
          name:"tab1"  // 筛选
        },
        {
          id:"02",
          value:'类别二',
          name:"tab2"
        },
        {
          id:"03",
          value:'类别三',
          name:"tab3"
        },
        {
          id:"04",
          value:'类别四',
          name:"tab4"
        },
        {
          id:"05",
          value:'类别五',
          name:"tab5"
        },
        {
          id:"06",
          value:'类别六',
          name:"tab6"
        }
      ],
      tabDetailList:[
        {
          name:'菜品1',
          imageUrl:'',
          price:'60',
          _id:'001',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'热销',
          category:'tab1'
        },
        {
          name:'菜品2',
          imageUrl:'',
          price:'60',
          _id:'002',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'店长推荐',
          category:'tab2'
        },
        {
          name:'菜品3',
          imageUrl:'',
          price:'60',
          _id:'003',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'热销',
          category:'tab1'
        },
        {
          name:'菜品4',
          imageUrl:'',
          price:'60',
          _id:'004',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'热销',
          category:'tab1'
        },
        {
          name:'菜品5',
          imageUrl:'',
          price:'60',
          _id:'005',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'活动',
          category:'tab2'
        },
        {
          name:'菜品6',
          imageUrl:'',
          price:'60',
          _id:'006',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'',
          category:'tab1'
        },
        {
          name:'菜品7',
          imageUrl:'',
          price:'60',
          _id:'007',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'',
          category:'tab1'
        },
        {
          name:'菜品8',
          imageUrl:'',
          price:'60',
          _id:'008',
          monthlySale:'1080',
          praise:'30',
          allEvaluation:'100',
          weight:'800',
          sign:'',
          category:'tab2'
        }
      ]
    },()=>{
      this.setData({
        currentTab:this.data.menuTabList.length && this.data.menuTabList[0].name || "",
        currentList: this.data.tabDetailList.filter(item => item.category === this.data.menuTabList[0].name)
      })
      
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {

  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _list = app.globalData.selectedMenu || [];
    let { currentList } = this.data;
    if(!_list.length){
      currentList.map(i => { delete i.num})
    }else{
      currentList.forEach((val, idx)=>{
        let _item = _list.filter(item => item._id = val.id);
        if(_item.length){
          val.num = _item.num
        }
      })
    }
      this.setData({
        selectedMenu: _list,
        currentList
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  //onHide: function () {

  //},

  /**
   * 生命周期函数--监听页面卸载
   */
  //onUnload: function () {

  //},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  //onPullDownRefresh: function () {

  //},

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
  tabSlider: function(event) {
    const _name = event.currentTarget.dataset.name;
    const _list = this.data.tabDetailList.filter(item => item.category === _name)
    this.setData({
      currentTab: _name,
      currentList: _list
    })
  },
  changeMenu: function(event) {
    const method = event.currentTarget.dataset.method;
    const _id = event.currentTarget.dataset.id;
    let { selectedMenu, currentList} = this.data;
    let _idx = null; // 在选择列表的下标
    let _index = null; // 在显示列表的下表
    const len = selectedMenu.filter((item, index) => {
      if(item._id === _id) _idx = index;
      return item._id === _id
    }) || []
    const _item = currentList.filter((item, index) => { 
      if(item._id === _id) _index = index
      return item._id === _id
    });
    if(method === 'add'){
      if(len.length){
        len[0].num += 1;
      }else{
        _item[0].num = 1;
        selectedMenu.push(..._item);
      }
      _item.num =  _item.num ? _item.num : 1;
    }else if(method === 'reduce'){
      if(len.length){
        if(len[0].num <= 1){
          selectedMenu.splice(_idx, 1)
          delete _item[0].num
          currentList.splice(_index, 1, _item[0])
        }else{
          len[0].num -= 1;
        }
      }
    }
    
    this.setData({
      selectedMenu,
      currentList
    },()=>{
      app.globalData.selectedMenu = this.data.selectedMenu;
    })    
  }
})