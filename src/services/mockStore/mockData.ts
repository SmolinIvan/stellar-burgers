export const userState = {
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

export const ingredientBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

export const ingredientMain = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

export const ingredientSauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

export const someIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0
  }
];

export const successGetOrders = {
  success: true,
  orders: [
    {
      _id: '6858691d943eac001cc3b643',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:35:41.632Z',
      updatedAt: '2025-06-22T20:35:42.468Z',
      number: 82329
    },
    {
      _id: '685868b5943eac001cc3b640',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:33:57.765Z',
      updatedAt: '2025-06-22T20:33:58.495Z',
      number: 82328
    },
    {
      _id: '6858684f943eac001cc3b63e',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:32:15.468Z',
      updatedAt: '2025-06-22T20:32:16.325Z',
      number: 82327
    },
    {
      _id: '6858680b943eac001cc3b63b',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:31:07.313Z',
      updatedAt: '2025-06-22T20:31:08.337Z',
      number: 82326
    },
    {
      _id: '685867a1943eac001cc3b636',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:29:21.160Z',
      updatedAt: '2025-06-22T20:29:21.985Z',
      number: 82325
    },
    {
      _id: '6858659e943eac001cc3b629',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:20:46.629Z',
      updatedAt: '2025-06-22T20:20:47.362Z',
      number: 82324
    },
    {
      _id: '68586540943eac001cc3b626',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный spicy био-марсианский бургер',
      createdAt: '2025-06-22T20:19:12.003Z',
      updatedAt: '2025-06-22T20:19:12.734Z',
      number: 82323
    },
    {
      _id: '685864ec943eac001cc3b624',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:17:48.248Z',
      updatedAt: '2025-06-22T20:17:48.970Z',
      number: 82322
    },
    {
      _id: '685864ba943eac001cc3b623',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:16:58.771Z',
      updatedAt: '2025-06-22T20:16:59.494Z',
      number: 82321
    },
    {
      _id: '68586469943eac001cc3b622',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:15:37.738Z',
      updatedAt: '2025-06-22T20:15:38.549Z',
      number: 82320
    },
    {
      _id: '68586406943eac001cc3b620',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:13:58.652Z',
      updatedAt: '2025-06-22T20:13:59.464Z',
      number: 82319
    },
    {
      _id: '6858626e943eac001cc3b61b',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:07:10.920Z',
      updatedAt: '2025-06-22T20:07:11.745Z',
      number: 82318
    },
    {
      _id: '6858619b943eac001cc3b615',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T20:03:39.843Z',
      updatedAt: '2025-06-22T20:03:40.650Z',
      number: 82317
    },
    {
      _id: '685860f9943eac001cc3b612',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942'
      ],
      status: 'done',
      name: 'Краторный spicy люминесцентный метеоритный бургер',
      createdAt: '2025-06-22T20:00:57.699Z',
      updatedAt: '2025-06-22T20:00:58.473Z',
      number: 82316
    },
    {
      _id: '685860ea943eac001cc3b611',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный метеоритный бургер',
      createdAt: '2025-06-22T20:00:42.712Z',
      updatedAt: '2025-06-22T20:00:43.494Z',
      number: 82315
    },
    {
      _id: '685860e7943eac001cc3b610',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный метеоритный бургер',
      createdAt: '2025-06-22T20:00:39.184Z',
      updatedAt: '2025-06-22T20:00:39.927Z',
      number: 82314
    },
    {
      _id: '68585abe943eac001cc3b603',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-06-22T19:34:22.589Z',
      updatedAt: '2025-06-22T19:34:23.355Z',
      number: 82313
    },
    {
      _id: '68585a47943eac001cc3b600',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2025-06-22T19:32:23.315Z',
      updatedAt: '2025-06-22T19:32:24.052Z',
      number: 82312
    },
    {
      _id: '685858e8943eac001cc3b5fa',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T19:26:32.726Z',
      updatedAt: '2025-06-22T19:26:33.543Z',
      number: 82311
    },
    {
      _id: '685853aa943eac001cc3b5e5',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-06-22T19:04:10.859Z',
      updatedAt: '2025-06-22T19:04:11.647Z',
      number: 82310
    },
    {
      _id: '68584e94943eac001cc3b5d1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2025-06-22T18:42:28.918Z',
      updatedAt: '2025-06-22T18:42:29.762Z',
      number: 82309
    },
    {
      _id: '685849f7943eac001cc3b5bb',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T18:22:47.701Z',
      updatedAt: '2025-06-22T18:22:48.486Z',
      number: 82308
    },
    {
      _id: '685846f9943eac001cc3b5b4',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2025-06-22T18:10:01.047Z',
      updatedAt: '2025-06-22T18:10:01.802Z',
      number: 82307
    },
    {
      _id: '68584551943eac001cc3b5ad',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T18:02:57.128Z',
      updatedAt: '2025-06-22T18:02:58.719Z',
      number: 82306
    },
    {
      _id: '68583e4e943eac001cc3b5a2',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Space краторный бессмертный минеральный био-марсианский бургер',
      createdAt: '2025-06-22T17:33:02.411Z',
      updatedAt: '2025-06-22T17:33:03.158Z',
      number: 82305
    },
    {
      _id: '68583d7d943eac001cc3b5a0',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2025-06-22T17:29:33.519Z',
      updatedAt: '2025-06-22T17:29:34.297Z',
      number: 82304
    },
    {
      _id: '6858394d943eac001cc3b595',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2025-06-22T17:11:41.969Z',
      updatedAt: '2025-06-22T17:11:42.762Z',
      number: 82303
    },
    {
      _id: '68583738943eac001cc3b58a',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T17:02:48.661Z',
      updatedAt: '2025-06-22T17:02:49.428Z',
      number: 82302
    },
    {
      _id: '68583567943eac001cc3b583',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T16:55:03.998Z',
      updatedAt: '2025-06-22T16:55:04.800Z',
      number: 82301
    },
    {
      _id: '6858342e943eac001cc3b577',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-06-22T16:49:50.604Z',
      updatedAt: '2025-06-22T16:49:51.354Z',
      number: 82300
    },
    {
      _id: '685833d5943eac001cc3b572',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T16:48:21.720Z',
      updatedAt: '2025-06-22T16:48:22.599Z',
      number: 82299
    },
    {
      _id: '685833aa943eac001cc3b571',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2025-06-22T16:47:38.520Z',
      updatedAt: '2025-06-22T16:47:39.274Z',
      number: 82298
    },
    {
      _id: '68582e8b943eac001cc3b55f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бессмертный бургер',
      createdAt: '2025-06-22T16:25:47.160Z',
      updatedAt: '2025-06-22T16:25:47.921Z',
      number: 82297
    },
    {
      _id: '685826a7943eac001cc3b545',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-06-22T15:52:07.269Z',
      updatedAt: '2025-06-22T15:52:08.055Z',
      number: 82296
    },
    {
      _id: '68582609943eac001cc3b543',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский экзо-плантаго spicy метеоритный бургер',
      createdAt: '2025-06-22T15:49:29.034Z',
      updatedAt: '2025-06-22T15:49:30.075Z',
      number: 82295
    },
    {
      _id: '68582599943eac001cc3b541',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-06-22T15:47:37.618Z',
      updatedAt: '2025-06-22T15:47:38.529Z',
      number: 82294
    },
    {
      _id: '6858232e943eac001cc3b4e8',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный spicy био-марсианский бургер',
      createdAt: '2025-06-22T15:37:18.936Z',
      updatedAt: '2025-06-22T15:37:19.778Z',
      number: 82293
    },
    {
      _id: '685821b4943eac001cc3b4e0',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский люминесцентный метеоритный бургер',
      createdAt: '2025-06-22T15:31:00.780Z',
      updatedAt: '2025-06-22T15:31:01.622Z',
      number: 82292
    },
    {
      _id: '68582101943eac001cc3b4d9',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-06-22T15:28:01.340Z',
      updatedAt: '2025-06-22T15:28:02.155Z',
      number: 82291
    },
    {
      _id: '685820f4943eac001cc3b4d8',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный spicy люминесцентный бургер',
      createdAt: '2025-06-22T15:27:48.676Z',
      updatedAt: '2025-06-22T15:27:49.349Z',
      number: 82290
    },
    {
      _id: '68581e32943eac001cc3b4cc',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2025-06-22T15:16:02.060Z',
      updatedAt: '2025-06-22T15:16:02.832Z',
      number: 82289
    },
    {
      _id: '68581c85943eac001cc3b4c2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2025-06-22T15:08:53.503Z',
      updatedAt: '2025-06-22T15:08:54.177Z',
      number: 82288
    },
    {
      _id: '6858151a943eac001cc3b4ae',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный space био-марсианский экзо-плантаго spicy люминесцентный бургер',
      createdAt: '2025-06-22T14:37:14.090Z',
      updatedAt: '2025-06-22T14:37:14.927Z',
      number: 82287
    },
    {
      _id: '68581380943eac001cc3b4a0',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный space астероидный фалленианский альфа-сахаридный люминесцентный бургер',
      createdAt: '2025-06-22T14:30:24.616Z',
      updatedAt: '2025-06-22T14:30:25.479Z',
      number: 82286
    },
    {
      _id: '68581155943eac001cc3b498',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2025-06-22T14:21:09.393Z',
      updatedAt: '2025-06-22T14:21:10.182Z',
      number: 82285
    },
    {
      _id: '6858104d943eac001cc3b492',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский бургер',
      createdAt: '2025-06-22T14:16:45.226Z',
      updatedAt: '2025-06-22T14:16:47.352Z',
      number: 82284
    },
    {
      _id: '68580f95943eac001cc3b48b',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Минеральный флюоресцентный spicy люминесцентный бургер',
      createdAt: '2025-06-22T14:13:41.582Z',
      updatedAt: '2025-06-22T14:13:42.344Z',
      number: 82283
    },
    {
      _id: '68580ab5943eac001cc3b47a',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-06-22T13:52:53.585Z',
      updatedAt: '2025-06-22T13:52:54.365Z',
      number: 82282
    },
    {
      _id: '68580957943eac001cc3b472',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный фалленианский бургер',
      createdAt: '2025-06-22T13:47:03.751Z',
      updatedAt: '2025-06-22T13:47:04.488Z',
      number: 82281
    },
    {
      _id: '68580769943eac001cc3b468',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-06-22T13:38:49.927Z',
      updatedAt: '2025-06-22T13:41:44.823Z',
      number: 82280
    }
  ],
  total: 81955,
  totalToday: 112
};
