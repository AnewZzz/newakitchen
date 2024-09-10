const USER_ROLES = {
  ADMIN: 'Admin',
  RECEPTIONIST: 'Receptionist',
  COOK: 'Cook',
  COUNTER: 'Counter',
};

const FOOD_CATEGORIES = {
  VEG: 'veg',
  NON_VEG: 'non-veg',
  SOFT_DRINKS: 'soft-drinks',
  HARD_DRINKS: 'hard-drinks',
};
const RECEPIENT_TYPE = Object.freeze({
  TABLE: 'table',
  LOYAL_CUSTORMER: 'loyal_customer',
});

const ENUMS = {
  user_roles: Object.values(USER_ROLES),
  food_categories: Object.values(FOOD_CATEGORIES),
  recepient_type: Object.values(RECEPIENT_TYPE),
};

module.exports = {
  USER_ROLES,
  FOOD_CATEGORIES,
  ENUMS,
};
