import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import Newslist from './components/news/Newslist.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import Photoinfo from './components/photos/Photoinfo.vue'
import Goodslist from './components/goods/goodslist.vue'
import Goodsinfo from './components/goods/goodsinfo.vue'
import Goodsdesc from './components/goods/goodsdesc.vue'
import Goodscomment from './components/goods/goodscomment.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
      { path: '/', redirect: '/home' },
      { path: '/home', component: HomeContainer },
      { path: '/member', component: MemberContainer },
      { path: '/shopcar', component: ShopcarContainer },
      { path: '/search', component: SearchContainer },
      { path: '/home/newslist', component: Newslist },
      { path: '/home/newsinfo/:id', component: Newsinfo },
      { path: '/home/photolist', component: PhotoList },
      { path: '/home/photoinfo/:id', component: Photoinfo },
      { path: '/home/goodslist', component: Goodslist },
      { path: '/home/goodsinfo/:id', component: Goodsinfo,name:'goodsinfo' },
      { path: '/home/goodsdesc/:id', component: Goodsdesc,name:'goodsdesc' },
      { path: '/home/goodscomment/:id', component: Goodscomment,name:'goodscomment' },

  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
});

// 把路由对象暴露出去
export default router