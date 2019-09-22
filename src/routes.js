import VueRouter from 'vue-router'
import Home from './pages/Home'
import Car from './pages/Car'
import ErrorCmp from './pages/Error'
import CarFull from './pages/CarFull'

//lazy-loading pages
const Cars = resolve => {
  require.ensure(['./pages/Cars.vue'], () => {
    resolve(
      require('./pages/Cars.vue')
    )
  })
}

export default new VueRouter ({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/cars',
      component: Cars,
      name: 'cars'
    },
    {
      path: '/none',
      redirect: {
        name: 'cars'
      }
    },
    {
      path: '/car/:id',
      component: Car,
      children: [
        {
          path: 'full',
          component: CarFull,
          name: 'CarFull',
          beforeEnter(to, from, next) {
            console.log('ff')
            if(true) {
              next(true)
            }
            else {
              next(false)
            }
          }
      }
      ]
    },
    {
      path: '*',
      component: ErrorCmp
    }
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPositon) {
    if(savedPositon) {
      return savedPositon
    }

    if(to.hash) {
      return { selector: to.hash}
    }

    return {
      x: 0,
      y: 100
    }
  }
})
