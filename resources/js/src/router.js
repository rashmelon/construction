
import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store';
import axios from "./http/axios/index.js"

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
                {
                  path: '/dashboard',
                  name: 'home',
                  beforeEnter: guard,
                  component: () => import('./views/Home.vue'),
                  meta: {
                      breadcrumb: [
                          { title: 'Home', url: '/dashboard', i18n: 'Home', active: true },
                      ],
                      pageTitle: 'Home',
                      pageTitle_i18n: 'Home'
                  }
                },
                {
                    path: '/dashboard/user',
                    name: 'user',
                    component: () => import('./views/user/browse.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'User', active: true, i18n: 'User' },
                        ],
                        pageTitle: 'User',
                        pageTitle_i18n: 'User',
                        permission: 'browse-user'
                    }
                },
                {
                    path: '/dashboard/user/create',
                    name: 'add-user',
                    component: () => import('./views/user/create.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'User', url: '/dashboard/user', i18n: 'User' },
                            { title: 'Add User', active: true, i18n: 'AddUser' },
                        ],
                        pageTitle: 'Add User',
                        pageTitle_i18n: 'AddUser',
                        permission: 'create-user'
                    }
                },
                {
                    path: '/dashboard/user/:id',
                    name: 'view-user',
                    component: () => import('./views/user/view.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'User', url: '/dashboard/user', i18n: 'User' },
                            { title: 'Profile', active: true, i18n: 'userProfile' },
                        ],
                        pageTitle: 'View User',
                        pageTitle_i18n: 'viewUser',
                        permission: 'view-user'
                    }
                },
                {
                    path: '/dashboard/user/:id/edit',
                    name: 'edit-user',
                    component: () => import('./views/user/edit.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'User', url: '/dashboard/user', i18n: 'User' },
                            { title: 'Edit User', active: true, i18n: 'editUser' },
                        ],
                        pageTitle: 'Edit User',
                        pageTitle_i18n: 'editUser',
                        permission: 'edit-user'
                    }
                },
                {
                    path: '/dashboard/project',
                    name: 'project',
                    component: () => import('./views/project/browse.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Project', active: true, i18n: 'Project' },
                        ],
                        pageTitle: 'Project',
                        pageTitle_i18n: 'Project',
                        permission: 'browse-project'
                    }
                },
                {
                    path: '/dashboard/project/create',
                    name: 'add-project',
                    component: () => import('./views/project/create.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Project', url: '/dashboard/project', i18n: 'Project' },
                            { title: 'Add Project', active: true, i18n: 'AddProject' },
                        ],
                        pageTitle: 'Add Project',
                        pageTitle_i18n: 'AddProject',
                        permission: 'create-project'
                    }
                },
                {
                    path: '/dashboard/project/:id',
                    name: 'view-project',
                    component: () => import('./views/project/view.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Project', url: '/dashboard/project', i18n: 'Project' },
                            { title: 'View Project', url: '/dashboard/project/:id', active: true, i18n: 'ViewProject' },
                        ],
                        pageTitle: 'View Project',
                        pageTitle_i18n: 'viewProject',
                        permission: 'view-project'
                    }
                },
                {
                    path: '/dashboard/project/:id/edit',
                    name: 'edit-project',
                    component: () => import('./views/project/edit.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Project', url: '/dashboard/project', i18n: 'Project' },
                            { title: 'Edit Project', active: true, i18n: 'editProject' },
                        ],
                        pageTitle: 'Edit Project',
                        pageTitle_i18n: 'editProject',
                        permission: 'edit-project'
                    }
                },
                {
                    path: '/dashboard/apartment',
                    name: 'apartment',
                    component: () => import('./views/apartment/browse.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Apartment', active: true, i18n: 'Apartment' },
                        ],
                        pageTitle: 'Apartment',
                        pageTitle_i18n: 'Apartment',
                        permission: 'browse-apartment'
                    }
                },
                {
                    path: '/dashboard/apartment/create',
                    name: 'add-apartment',
                    component: () => import('./views/apartment/create.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Apartment', url: '/dashboard/apartment', i18n: 'Apartment' },
                            { title: 'Add Apartment', active: true, i18n: 'AddApartment' },
                        ],
                        pageTitle: 'Add Apartment',
                        pageTitle_i18n: 'AddApartment',
                        permission: 'create-apartment'
                    }
                },
                {
                    path: '/dashboard/apartment/:id',
                    name: 'view-apartment',
                    component: () => import('./views/apartment/view.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Apartment', url: '/dashboard/apartment', i18n: 'Apartment' },
                            { title: 'View Apartment', url: '/dashboard/apartment/:id', active: true, i18n: 'ViewApartment' },
                        ],
                        pageTitle: 'View Apartment',
                        pageTitle_i18n: 'viewApartment',
                        permission: 'view-apartment'
                    }
                },
                {
                    path: '/dashboard/apartment/:id/edit',
                    name: 'edit-apartment',
                    component: () => import('./views/apartment/edit.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Apartment', url: '/dashboard/apartment', i18n: 'Apartment' },
                            { title: 'Edit Apartment', active: true, i18n: 'editApartment' },
                        ],
                        pageTitle: 'Edit Apartment',
                        pageTitle_i18n: 'editApartment',
                        permission: 'edit-apartment'
                    }
                },
                {
                    path: '/dashboard/customer',
                    name: 'customer',
                    component: () => import('./views/customer/browse.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Customer', active: true, i18n: 'Customer' },
                        ],
                        pageTitle: 'Customer',
                        pageTitle_i18n: 'Customer',
                        permission: 'browse-customer'
                    }
                },
                {
                    path: '/dashboard/customer/create',
                    name: 'add-customer',
                    component: () => import('./views/customer/create.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Customer', url: '/dashboard/customer', i18n: 'Customer' },
                            { title: 'Add Customer', active: true, i18n: 'AddCustomer' },
                        ],
                        pageTitle: 'Add Customer',
                        pageTitle_i18n: 'AddCustomer',
                        permission: 'create-customer'
                    }
                },
                {
                    path: '/dashboard/customer/:id',
                    name: 'view-customer',
                    component: () => import('./views/customer/view.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Customer', url: '/dashboard/customer', i18n: 'Customer' },
                            { title: 'View Customer', url: '/dashboard/customer/:id', active: true, i18n: 'ViewCustomer' },
                        ],
                        pageTitle: 'View Customer',
                        pageTitle_i18n: 'viewCustomer',
                        permission: 'view-customer'
                    }
                },
                {
                    path: '/dashboard/customer/:id/edit',
                    name: 'edit-customer',
                    component: () => import('./views/customer/edit.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Customer', url: '/dashboard/customer', i18n: 'Customer' },
                            { title: 'Edit Customer', active: true, i18n: 'editCustomer' },
                        ],
                        pageTitle: 'Edit Customer',
                        pageTitle_i18n: 'editCustomer',
                        permission: 'edit-customer'
                    }
                },
                {
                    path: '/dashboard/lead',
                    name: 'lead',
                    component: () => import('./views/lead/browse.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Lead', active: true, i18n: 'Lead' },
                        ],
                        pageTitle: 'Lead',
                        pageTitle_i18n: 'Lead',
                        permission: 'browse-follow-up'
                    }
                },
                {
                    path: '/dashboard/lead/create',
                    name: 'add-lead',
                    component: () => import('./views/lead/create.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Lead', url: '/dashboard/lead', i18n: 'Lead' },
                            { title: 'Add Lead', active: true, i18n: 'AddLead' },
                        ],
                        pageTitle: 'Add Lead',
                        pageTitle_i18n: 'AddLead',
                        permission: 'create-follow-up'
                    }
                },
                {
                    path: '/dashboard/lead/:id',
                    name: 'view-lead',
                    component: () => import('./views/lead/view.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Lead', url: '/dashboard/lead', i18n: 'Lead' },
                            { title: 'Lead', url: '/dashboard/lead/:id', active: true, i18n: 'Lead' },
                        ],
                        pageTitle: 'View Lead',
                        pageTitle_i18n: 'viewLead',
                        permission: 'view-follow-up'
                    }
                },
                {
                    path: '/dashboard/lead/:id/edit',
                    name: 'edit-lead',
                    component: () => import('./views/lead/edit.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Lead', url: '/dashboard/lead', i18n: 'Lead' },
                            { title: 'Edit Lead', active: true, i18n: 'editLead' },
                        ],
                        pageTitle: 'Edit Lead',
                        pageTitle_i18n: 'editLead',
                        permission: 'edit-follow-up'
                    }
                },
                {
                    path: '/dashboard/purchase',
                    name: 'purchase',
                    component: () => import('./views/purchase/browse.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Purchase', active: true, i18n: 'Purchase' },
                        ],
                        pageTitle: 'Purchase',
                        pageTitle_i18n: 'Purchase',
                        permission: 'browse-purchase'
                    }
                },
                {
                    path: '/dashboard/purchase/create',
                    name: 'add-purchase',
                    component: () => import('./views/purchase/create.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Purchase', url: '/dashboard/purchase', i18n: 'Purchase' },
                            { title: 'Add Purchase', active: true, i18n: 'AddPurchase' },
                        ],
                        pageTitle: 'Add Purchase',
                        pageTitle_i18n: 'AddPurchase',
                        permission: 'create-purchase'
                    }
                },
                {
                    path: '/dashboard/purchase/:id',
                    name: 'view-purchase',
                    component: () => import('./views/purchase/view.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Purchase', url: '/dashboard/purchase', i18n: 'Purchase' },
                            { title: 'View Purchase', active: true, i18n: 'viewPurchase' },
                        ],
                        pageTitle: 'View Purchase',
                        pageTitle_i18n: 'viewPurchase',
                        permission: 'view-purchase'
                    }
                },
                {
                    path: '/dashboard/purchase/:id/edit',
                    name: 'edit-purchase',
                    component: () => import('./views/purchase/edit.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Purchase', url: '/dashboard/purchase', i18n: 'Purchase' },
                            { title: 'Edit Purchase', active: true, i18n: 'editPurchase' },
                        ],
                        pageTitle: 'Edit Purchase',
                        pageTitle_i18n: 'editPurchase',
                        permission: 'edit-purchase'
                    }
                },
                {
                    path: '/dashboard/installment',
                    name: 'installment',
                    component: () => import('./views/installment/browse.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard', i18n: 'Home' },
                            { title: 'Installment', active: true, i18n: 'Installment' },
                        ],
                        pageTitle: 'Installment',
                        pageTitle_i18n: 'Installment',
                    }
                },
                {
                    path: '/dashboard/settings/role',
                    name: 'role',
                    component: () => import('./views/settings/Role/Roles.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard'},
                            { title: 'Settings'},
                            { title: 'Roles', active: true}
                        ],
                        pageTitle: "Roles",
                        permission: 'view-role'
                    }
                },
                {
                    path: '/dashboard/settings/role/create',
                    name: 'create-role',
                    component: () => import('./views/settings/Role/Create.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard'},
                            { title: 'Settings'},
                            { title: 'Roles', url: '/dashboard/settings/role'},
                            { title: 'Create Role', active: true}
                        ],
                        pageTitle: "Create Role",
                        permission: 'create-role'
                    }
                },
                {
                    path: '/dashboard/settings/role/:id',
                    name: 'view-role',
                    component: () => import('./views/settings/Role/View.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard'},
                            { title: 'Settings'},
                            { title: 'Roles', url: '/dashboard/settings/role'},
                            { title: 'Role Information', active: true}
                        ],
                        pageTitle: "Role Information",
                        permission: 'view-role'
                    }
                },
                {
                    path: '/dashboard/settings/role/edit/:id',
                    name: 'edit-role',
                    component: () => import('./views/settings/Role/Edit.vue'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard'},
                            { title: 'Settings'},
                            { title: 'Roles', url: '/dashboard/settings/role'},
                            { title: 'Edit Role', active: true}
                        ],
                        pageTitle: "Edit Role",
                        permission: 'edit-role'
                    }
                },
                {
                    path: '/dashboard/profile',
                    name: 'profile',
                    component: () => import('./views/profile/profile'),
                    beforeEnter: guard,
                    meta: {
                        breadcrumb: [
                            { title: 'Home', url: '/dashboard'},
                            { title: 'Profile', active: true}
                        ],
                        pageTitle: "Profile"
                    }
                },

            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
                {
                    path: '/dashboard/login',
                    name: 'pageLogin',
                    component: () => import('./views/pages/Login.vue')
                },
                {
                    path: '/dashboard/error-403',
                    name: 'pageError403',
                    component: () => import('./views/pages/NotAuthorized.vue')
                },
                {
                    path: '/dashboard/error-404',
                    name: 'pageError404',
                    component: () => import('./views/pages/Error404.vue')
                },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
});

function can(permission) {
    let hasPermission = false;
    store.state.auth.AppActiveUser.roles[0].permissions.forEach((userPermission) => {
        if(userPermission.name === permission){
            hasPermission = true;
        }
    });
    return hasPermission;
}

function guard(to, from, next) {
    if (store.state.auth.accessToken && store.state.auth.AppActiveUser) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.auth.accessToken.accessToken}`;
        if (new Date(Date.now()) < new Date(store.state.auth.accessToken.token.expires_at)){
            to.meta.permission===undefined||can(to.meta.permission)?next():next('/dashboard/error-403');
        } else {
            next('/dashboard/login');
        }
    } else {
        next('/dashboard/login');
    }
}

export default router
