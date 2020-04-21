//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    wnyList: [
      {
        dp_class:'swiper-1',
        dp_name:'木屋烧烤', 
        dp_address:'双榆树店',
        dp_des:'曾经看过该品牌的商家'
      },
      {
        dp_class:'swiper-2',
        dp_name:'粉婆婆土豆粉', 
        dp_address:'知春路店',
        dp_des:'曾经看过该品牌的商家'
      },
      {
        dp_class:'swiper-3',
        dp_name:'西少爷肉夹馍', 
        dp_address:'苏州街店',
        dp_des:'肉夹馍 品味优选'
      },
      {
        dp_class:'swiper-4',
        dp_name:'木屋烧烤', 
        dp_address:'双榆树',
        dp_des:'曾经看过该品牌的商家'
      },
      {
        dp_class:'swiper-5',
        dp_name:'木屋烧烤', 
        dp_address:'双榆树',
        dp_des:'曾经看过该品牌的商家'
      },
      {
        dp_class:'swiper-6',
        dp_name:'木屋烧烤', 
        dp_address:'双榆树',
        dp_des:'曾经看过该品牌的商家'
      }
    ],
    vertical: false,
    dotActiveColor: "#ffffff",
    signatureList: [
      {
        name:'菜品1',
        imageUrl:'',
        price:'60',
        _id:'001'
      },
      {
        name:'菜品2',
        imageUrl:'',
        price:'60',
        _id:'002'
      },
      {
        name:'菜品3',
        imageUrl:'',
        price:'60',
        _id:'003'
      },
      {
        name:'菜品4',
        imageUrl:'',
        price:'60',
        _id:'004'
      }
    ],
    address:'',
    homeList:[
      {
        id:'1',
        label:'美食',
        class:'ms'
      },
      {
        id:'2',
        label:'超市遍历',
        class:'csbl'
      },
      {
        id:'3',
        label:'蔬菜水果',
        class:'scsg'
      },
      {
        id:'4',
        label:'快食简餐',
        class:'ksjc'
      },
      {
        id:'5',
        label:'下午茶',
        class:'xwc'
      },
      {
        id:'6',
        label:'津贴联盟',
        class:'jtlm'
      },
      {
        id:'7',
        label:'奶茶果汁',
        class:'ncgz'
      },
      {
        id:'8',
        label:'汉堡披萨',
        class:'hbps'
      },
      {
        id:'9',
        label:'能量西餐',
        class:'nlxc'
      },
      {
        id:'10',
        label:'跑腿代购',
        class:'ptdg'
      }
    ],
    homeSwiperList:[
      {
        hs_class:'swiper-1',
        hs_id:"1",
        hs_title:'一级标题1',
        hs_subTitle:'二级标题'
      },
      {
        hs_class:'swiper-2',
        hs_id:"2",
        hs_title:'一级标题2',
        hs_subTitle:'二级标题'
      },
      {
        hs_class:'swiper-3',
        hs_id:"3",
        hs_title:'一级标题3',
        hs_subTitle:'二级标题'
      },
      {
        hs_class:'swiper-4',
        hs_id:"4",
        hs_title:'一级标题4',
        hs_subTitle:'二级标题'
      },
      {
        hs_class:'swiper-5',
        hs_id:"5",
        hs_title:'一级标题5',
        hs_subTitle:'二级标题'
      },
      {
        hs_class:'swiper-6',
        hs_id:"6",
        hs_title:'一级标题6',
        hs_subTitle:'二级标题'
      }
    ],
    swiperCurrent: 0,
    businessList:[],
    fjsjOption:["综合排序","距离最近","评分最高","起送价最低","配送价最低","人均高到低","人均低到高"]
    
  },  
  
  onLoad: function () {
    this.setData({
      address: app.globalData.address
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // 获取店铺列表
    wx.request({
      url: 'https://www.fastmock.site/mock/912898c76d13b5a873e918b118e55b26/v1/business/list',
      success: (res)=>{
        this.setData({
          businessList: res.data.data.list
        })
      }
    })
  },
  onShow: function () {
    this.setData({
      address: app.globalData.address
    })
  },
  
  tapMenu: function(event){
    wx.getSetting({
      complete: (res) => {
        if(res.authSetting['scope.userLocation']){
          let id = event.currentTarget.dataset.id;
          wx.navigateTo({
            url: '/pages/index/menuList?id='+id ,
          })
        }else{
           wx.getLocation({
              success (res) {
                console.log(res)
              }
            })
            wx.openSetting({
              complete: (res) => {
              },
            })
        }
      },
    })
  },
  getLocation: function() {
    console.log("点击跳转")
    wx.navigateTo({
      url: '/pages/index/setAddress'
    })
  },
  swiperChange: function(event) {
    let current =event.detail.current;
    this.setData({
      swiperCurrent: current,
    })
  }
})
