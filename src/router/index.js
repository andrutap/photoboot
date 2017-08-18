import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import Home2 from '@/pages/Home'
import TakePic from '@/pages/TakePic'
import PhotoEdit from '@/components/TakePic/PhotoEdit'
import TakePicMenu from '@/components/TakePic/menu'
import Upload from '@/pages/UploadPic'
import UploadMenu from '@/components/UploadPic/Menu'

Vue.use(Router)

export default new Router({
  base: 'https://demos.mingadigital.com/display/hm/ld3/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Welcome',
      component: Home2
    },
    {
      path: '/new/photo',
      component: TakePic,
      children: [
        {
          path: '',
          component:TakePicMenu
        },
        {
          path: 'edit',
          component: PhotoEdit
        }
      ]
    },
    {
      path: '/upload',
      component: Upload,
      children: [
        {
          path: '',
          component: UploadMenu
        },
        {
          path: 'edit',
          component: PhotoEdit
        }
      ]
    }
  ]
})
