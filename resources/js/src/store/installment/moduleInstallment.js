
import state from './moduleInstallmentState'
import mutations from './moduleInstallmentMutations'
import actions from './moduleInstallmentActions'
import getters from './moduleInstallmentGetters'



export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

