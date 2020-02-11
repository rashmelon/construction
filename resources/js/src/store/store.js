
import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

import moduleAuth from './auth/moduleAuth';
import moduleUser from './user/moduleUser';
import moduleProject from './project/moduleProject';
import moduleCustomer from './customer/moduleCustomer';
import moduleFollowUp from './follow-up/moduleFollowUp';
import modulePurchase from './purchase/modulePurchase';
import moduleInstallment from './installment/moduleInstallment';
import moduleRolesAndPermissions from './roles-and-permissions/moduleRolesAndPermissions';
import moduleApartment from "./apartment/moduleApartment";


const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        auth: moduleAuth,
        user: moduleUser,
        project: moduleProject,
        apartment: moduleApartment,
        customer: moduleCustomer,
        followUp: moduleFollowUp,
        purchase: modulePurchase,
        installment: moduleInstallment,
        rolesAndPermissions: moduleRolesAndPermissions,
    },
    plugins: [vuexLocal.plugin],
    strict: process.env.NODE_ENV !== 'production'
})
