import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Challenges from '../views/Challenges.vue';
import ChallengeView from '../views/Challenge.vue';
import Login from '../views/Login.vue';
import EditChallenge from '../views/admin/EditChallenge.vue';
import Leaderboard from '../views/Leaderboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/challenges',
    name: 'challenges',
    component: Challenges,
  },
  {
    path: '/challenge/:id',
    name: 'challenge',
    component: ChallengeView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/challenge/:id/edit',
    name: 'editChallenge',
    component: EditChallenge,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
