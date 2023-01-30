import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamList from './components/teams/TeamsList.vue';
import UserList from './components/users/UsersList.vue';
import TeamMember from './components/teams/TeamMembers.vue';

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams',
    },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamList, footer: UserList },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMember,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      component: UserList,
    },
    {
      path: '/:notFound(.*)',
      redirect: '/',
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});
const app = createApp(App);
routes.beforeEach(function (to, _, next) {
  // if (to.name == "team-members") {
  next();
  // } else {
  //     next({ name: 'team-members', params: { teamId: 't2' } })
  // }
});
app.use(routes);
app.mount('#app');
