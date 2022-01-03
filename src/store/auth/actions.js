import { api } from 'boot/axios';
import { Loading } from 'quasar';

export async function getAccount({ commit }) {
  try {
    Loading.show();
    const { data } = await api.get('/account');
    if (data.account) {
      commit('SET_ACCOUNT', data.account);
    }
    Loading.hide();
  } catch (e) {
    Loading.hide();
    console.log(`Failed to recover account: ${e.message}`);
  }
}

export async function registerAccount({ commit }, link) {
  try {
    await api.post('/account', {
      linkedinUrl: link,
    });
  } catch (e) {
    console.log(`Failed to register account: ${e.message}`);
  }
}

export function setAccount({ commit }, payload) {
  commit('SET_ACCOUNT', payload);
}