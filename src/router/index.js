import {
    createWebHistory,
    createRouter
} from "vue-router";
// import all sections
import homePage from "@/views/homePage.vue";
import dashboardList from "@/views/dashboardList.vue";
import dashboardTopList from "@/views/dashboardTopList.vue";
import dashboardTopSongsThisYear from "@/views/dashboardTopSongsThisYear.vue";
import addFamily from "@/views/addFamily.vue";
import PageNotFound from '@/views/PageNotFound.vue'

import {
    getSongByIdAndSetInStore
} from "@/service/getData"

const routes = [{
    path: "/",
    name: "Home",
    showInNav: false,
    component: homePage,
    meta: {
        title: `Home Page - ${process.env.VUE_APP_TITLE}`,
        description: "Home",
    }
}, {
    path: "/dashboard/:id",
    name: "Dashboard",
    showInNav: true,
    component: dashboardList,
    meta: {
        title: `Dashboard - ${process.env.VUE_APP_TITLE}`,
        description: "Show all songs",
    }
},
{
    path: "/dashboardTop/:id",
    name: "Top songs",
    showInNav: true,
    component: dashboardTopList,
    meta: {
        title: `Dashboard top songs - ${process.env.VUE_APP_TITLE}`,
        description: "Show top songs with more than 2 votes",
    }
},
{
    path: "/dashboardTopSongsThisYear/:id",
    name: `Top Songs of This Year`,
    showInNav: true,
    component: dashboardTopSongsThisYear,
    meta: {
        title: `Dashboard top songs - ${process.env.VUE_APP_TITLE}`,
        description: "Show the top songs of this year",
    }
},
{
    path: "/addFamily",
    name: "AddFamily",
    showInNav: false,
    component: addFamily,
    meta: {
        title: `Add - ${process.env.VUE_APP_TITLE}`,
        description: "Add a new list",
    }
},
{
    path: "/:pathMatch(.*)*",
    name: "404 not found",
    showInNav: false,
    component: PageNotFound,
    meta: {
        title: `404 not found - ${process.env.VUE_APP_TITLE}`,
        description: "404 not found",
    }
}
];

const router = createRouter({
    history: createWebHistory(),
    routes,

});

router.beforeEach((to, from, next) => {
    next()
    if (to.params.id) {
        getSongByIdAndSetInStore(to.params.id)
    }
})



router.afterEach((to) => {
    document.title = to.meta.title || process.env.VUE_APP_TITLE;
});


export default router;