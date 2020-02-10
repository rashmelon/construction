
import state from './moduleProjectState'
import mutations from './moduleProjectMutations'
import actions from './moduleProjectActions'
import getters from './moduleProjectGetters'



export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

