export const unauthorizedUserState = {
  isAwaiting: true,
  isAuthed: false,
  accessToken: undefined,
  refreshToken: undefined,
  user: {
    email: '',
    name: ''
  },
  errorText: ''
};

export const authorizedUserState = {
  isAwaiting: false,
  isAuthed: true,
  accessToken: 'Access Token',
  refreshToken: 'Refresh Token',
  user: {
    email: 'mail@kek.com',
    name: 'Shrek'
  },
  errorText: ''
};

export const orderState = {
  bun: null,
  ingredients: [],
  orders: [],
  isMakingOrder: false,
  currentOrder: null
};

export const ingredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const feedState = {
  isLoading: true,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  success: false
};
