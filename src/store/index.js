import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './auth';

export default store((/* { ssrContext } */) => {
  const Store = createStore({
    modules: {
        auth
    },

    plugins: [createPersistedState()],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: import.meta.env.DEBUGGING,
  });

  return Store;
});