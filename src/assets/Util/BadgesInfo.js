import closer_badge from '../images/badges/closer_badge.png';
// import closer_badge_thumb from '../img/badges/thumb/closer_badge_thumb.png';
// import creativity_badge from '../img/badges/creativity_badge.png';
// import creativity_badge_thumb from '../img/badges/thumb/creativity_badge_thumb.png';
import culture_badge from '../images/badges/culture_badge.png';
// import culture_badge_thumb from '../img/badges/thumb/culture_badge_thumb.png';
import detail_master_badge from '../images/badges/detail_master_badge.png';
// import detail_master_badge_thumb from '../img/badges/thumb/detail_master_badge_thumb.png';
// import goal_smasher_badge from '../img/badges/goal_smasher_badge.png';
// import goal_smasher_badge_thumb from '../img/badges/thumb/goal_smasher_badge_thumb.png';
// import idea_maker_badge from '../img/badges/idea_maker_badge.png';
// import idea_maker_badge_thumb from '../img/badges/thumb/idea_maker_badge_thumb.png';
// import initiative_badge from '../img/badges/initiative_badge.png';
// import initiative_badge_thumb from '../img/badges/thumb/initiative_badge_thumb.png';
// import innovator_badge from '../img/badges/innovator_badge.png';
// import innovator_badge_thumb from '../img/badges/thumb/innovator_badge_thumb.png';
// import launcher_badge from '../img/badges/launcher_badge.png';
// import launcher_badge_thumb from '../img/badges/thumb/launcher_badge_thumb.png';
// import leadership_badge from '../img/badges/leadership_badge.png';
// import leadership_badge_thumb from '../img/badges/thumb/leadership_badge_thumb.png';
// import lifesaver_badge from '../img/badges/lifesaver_badge.png';
// import lifesaver_badge_thumb from '../img/badges/thumb/lifesaver_badge_thumb.png';
// import motivator_badge from '../img/badges/motivator_badge.png';
// import motivator_badge_thumb from '../img/badges/thumb/motivator_badge_thumb.png';
// import navigator_badge from '../img/badges/navigator_badge.png';
// import navigator_badge_thumb from '../img/badges/thumb/navigator_badge_thumb.png';
// import obstacle_badge from '../img/badges/obstacle_badge.png';
// import obstacle_badge_thumb from '../img/badges/thumb/obstacle_badge_thumb.png';
// import problem_solver_badge from '../img/badges/problem_solver_badge.png';
// import problem_solver_badge_thumb from '../img/badges/thumb/problem_solver_badge_thumb.png';
import teamwork_badge from '../images/badges/teamwork_badge.png';
// import teamwork_badge_thumb from '../img/badges/thumb/teamwork_badge_thumb.png';
// import top_earner_badge from '../img/badges/top_earner_badge.png';
// import top_earner_badge_thumb from '../img/badges/thumb/top_earner_badge_thumb.png';

export const badges = [
  {
    name: 'closer',
    displayName: 'Closer',
  },
  {
    name: 'creativity',
    displayName: 'Creativity',
  },
  {
    name: 'culture',
    displayName: 'Culture Champ',
  },
  {
    name: 'detail_master',
    displayName: 'Detail Master',
  },
  {
    name: 'goal_smasher',
    displayName: 'Goal Smasher',
  },
  {
    name: 'idea_maker',
    displayName: 'Idea Maker',
  },
  {
    name: 'initiative',
    displayName: 'Initiative',
  },
  {
    name: 'innovator',
    displayName: 'Innovator',
  },
  {
    name: 'launcher',
    displayName: 'Launcher',
  },
  {
    name: 'leadership',
    displayName: 'Leadership',
  },
  {
    name: 'life_saver',
    displayName: 'Life Saver',
  },
  {
    name: 'motivator',
    displayName: 'Motivator',
  },
  {
    name: 'navigator',
    displayName: 'Navigator',
  },
  {
    name: 'obstacle_eliminator',
    displayName: 'Obstacle Eliminator',
  },
  {
    name: 'problem_solver',
    displayName: 'Problem Solver',
  },
  {
    name: 'teamwork',
    displayName: 'Teamwork',
  },
  {
    name: 'top_earner',
    displayName: 'Top Earner',
  },
];

export const getBadgeObjectForName = (badgeName) => badges.find(badge => badge.name === badgeName);

export const getImageForBadge = (badge, thumb = false) => {
  switch (badge.name) {
    // case 'closer':
    //   return thumb ? closer_badge_thumb : closer_badge;
    // case 'creativity':
    //   return thumb ? creativity_badge_thumb : creativity_badge;
    // case 'culture':
    //   return thumb ? culture_badge_thumb : culture_badge;
    // case 'detail_master':
    //   return thumb ? detail_master_badge_thumb : detail_master_badge;
    // case 'goal_smasher':
    //   return thumb ? goal_smasher_badge_thumb : goal_smasher_badge;
    // case 'idea_maker':
    //   return thumb ? idea_maker_badge_thumb : idea_maker_badge;
    // case 'initiative':
    //   return thumb ? initiative_badge_thumb : initiative_badge;
    // case 'innovator':
    //   return thumb ? innovator_badge_thumb : innovator_badge;
    // case 'launcher':
    //   return thumb ? launcher_badge_thumb : launcher_badge;
    // case 'leadership':
    //   return thumb ? leadership_badge_thumb : leadership_badge;
    // case 'life_saver':
    //   return thumb ? lifesaver_badge_thumb : lifesaver_badge;
    // case 'motivator':
    //   return thumb ? motivator_badge_thumb : motivator_badge;
    // case 'navigator':
    //   return thumb ? navigator_badge_thumb : navigator_badge;
    // case 'obstacle_eliminator':
    //   return thumb ? obstacle_badge_thumb : obstacle_badge;
    // case 'problem_solver':
    //   return thumb ? problem_solver_badge_thumb : problem_solver_badge;
    // case 'teamwork':
    //   return thumb ? teamwork_badge_thumb : teamwork_badge;
    // case 'top_earner':
    //   return thumb ? top_earner_badge_thumb : top_earner_badge;
    case 'closer':
      return closer_badge;
    case 'culture':
      return culture_badge;
    case 'detail_master':
      return detail_master_badge;
    case 'teamwork':
      return teamwork_badge;
    default:
      return null;
  }
};
