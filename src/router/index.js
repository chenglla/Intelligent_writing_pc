import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import homePage from '@/pages/homePage'
// import loginPage from '@/components/loginPage'
import compositionContent from '@/pages/compositionContent'
import myFavoritePage from '@/pages/myFavoritePage'
import compositionDetails from '@/pages/compositionDetails'
import commentDetail from '@/pages/commentDetail'

Vue.use(Router)

const more = () =>
    import ('@/home/more')

export default new Router({
    routes: [
        // {
        //   path: '/',
        //   name: 'HelloWorld',
        //   component: HelloWorld
        // }
        {
            path: '/',
            name: 'homePage',
            component: homePage
        },
        {
            path: '/compositionContent',
            name: 'compositionContent',
            component: compositionContent
        },
        {
            path: '/myfavorite',
            name: 'myFavoritePage',
            component: myFavoritePage
        },
        {
            path: '/compositiondetails',
            name: 'compositionDetails',
            component: compositionDetails
        },
        {
            path: '/commentDetail',
            name: 'commentDetail',
            component: commentDetail
        },
        {
            path: '/more',
            name: 'more',
            component: more
        }
        // {
        //   path: '/',
        //   name: 'loginPage',
        //   component: loginPage
        // }
    ]
})