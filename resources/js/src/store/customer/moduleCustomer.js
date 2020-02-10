
import state from './moduleCustomerState'
import mutations from './moduleCustomerMutations'
import actions from './moduleCustomerActions'
import getters from './moduleCustomerGetters'



export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

