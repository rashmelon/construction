
import state from './moduleApartmentState'
import mutations from './moduleApartmentMutations'
import actions from './moduleApartmentActions'
import getters from './moduleApartmentGetters'



export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

