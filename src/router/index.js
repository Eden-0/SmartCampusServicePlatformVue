import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeBody from "@/views/Home/HomeBody";
import LoginIndex from "@/views/Login/LoginIndex";
import ShowInfoView from "@/views/ShowInfoView";
import NoticeAndNews from "@/views/NoticeAndNews";
import NoticeList from "@/components/notice/NoticeList";
import NewsList from "@/components/notice/NewsList";
import RetakeView from "@/views/Retake/RetakeView";
import RetakeChoiceView from "@/views/Retake/RetakeChoiceView";
import ReTestView from "@/views/Retake/ReTestView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeBody,
    children: [
      {
        path: '/showinfo',
        name: 'showinfo',
        component: ShowInfoView
      },
      {
        path: '/noticeandnews',
        name: 'noticeandnews',
        component: NoticeAndNews
      },
      {
        path:'/noticelist',
        name:'noticelist',
        component: NoticeList
      },
      {
        path:'/newslist',
        name:'newslist',
        component: NewsList
      },
    ]

  },
   {
     path: '/',
     name: 'login',
     component: LoginIndex
   },
  {
    path: '/home/retake',
    name: 'retake',
    component: RetakeView
  },
  {
    path: '/home/retakechoice',
    name: 'retakechoice',
    component: RetakeChoiceView
  },
  {
    path: '/home/retest',
    name: 'retest',
    component: ReTestView
  },
]

const router = new VueRouter({
  routes
})

export default router
