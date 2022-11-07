import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user-store'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EditHome from "../views/account/EditHome.vue";

const routes = [
    {
        path: "/home",
        name: "Home",
        component: HomeView
    },
                
    {
        path: "/login",
        beforeEnter: (to, from, next) => {
            useUserStore().id ? next('/home/1') : next()
        },
        name: "loginView",
        component: LoginView
    },
{
                path: '/home/:id',
                name: 'EditHome',
                component: EditHome
            },
    //     component: AccountView,
    //     children: [
    //         {
    //             path: 'profile/:id',
    //             name: 'ProfileSection',
    //             component: ProfileSection
    //         },

    //     ]
    // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
