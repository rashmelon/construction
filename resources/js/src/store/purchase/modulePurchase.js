
import state from './modulePurchaseState'
import mutations from './modulePurchaseGetters'
import actions from './modulePurchaseActions'
import getters from './modulePurchaseMutations'



export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

