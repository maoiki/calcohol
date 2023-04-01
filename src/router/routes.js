
const routes = [
  
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '',
        name: 'login',
        component: () => import('pages/Login.vue') },
      { path: 'register',
        name: 'register',
        component: () => import('pages/Register.vue') },
      { path: 'email-confirmation',
        name: 'email-confirmation',
        component: () => import('pages/EmailConfirmation.vue') },
      // { path: 'me',
      //   name: 'me',
      //   component: () => import('pages/Me.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me',
        name: 'me',
        component: () => import('pages/Me.vue') },
      // { path: '', component: () => import('pages/IndexPage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
