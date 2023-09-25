import ability from '@/utils/ability'

export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/dashboard/profile/Profile.vue')
      },
      {
        path: 'profile-settings',
        name: 'ProfileSettings',
        component: () => import('@/views/dashboard/profile/ProfileSettings.vue')
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/dashboard/users/users.vue'),
        beforeEnter() {
          if (ability.cannot('user_view')) {
            return { name: 'Unauthorized' }
          }
        }
      },
      {
        path: 'role-permissions',
        name: 'RolePermissions',
        component: () => import('@/views/dashboard/role-permissions/RolePermissions.vue')
      },
      {
        path: 'print-manager/print-setup',
        name: 'PrintSetup',
        component: () => import('@/views/dashboard/print-manager/PrintSetup.vue')
      },
      {
        path: 'print-manager/bulk-printing',
        name: 'BulkPrinting',
        component: () => import('@/views/dashboard/print-manager/BulkPrinting.vue')
      },
      {
        path: 'print-manager/barcode',
        name: 'Barcode',
        component: () => import('@/views/dashboard/print-manager/Barcode.vue')
      },
      {
        path: 'products/create-product',
        name: 'CreateProduct',
        component: () => import('@/views/dashboard/products/CreateProduct.vue')
      },
      {
        path: 'products/product-list',
        name: 'ProductList',
        component: () => import('@/views/dashboard/products/ProductList.vue')
      },
      {
        path: 'settings/appearance',
        name: 'Appearance',
        component: () => import('@/views/dashboard/settings/Appearance.vue')
      },
      {
        path: 'settings/companies',
        name: 'Companies',
        component: () => import('@/views/dashboard/settings/Companies.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue')
  },
  // Unauthorized
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/Unauthorized.vue')
  },
  // Timeout
  {
    path: '/timeout',
    name: 'Timeout',
    component: () => import('@/views/Timeout.vue')
  },
  // Invalid Route
  {
    path: '/:invalidRoute(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]
