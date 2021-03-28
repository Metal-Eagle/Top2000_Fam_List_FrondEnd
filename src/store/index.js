import {
    createStore
} from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

//import VuexPersistence
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default createStore({
    state,
    actions,
    mutations,
    getters,
    plugins: [vuexLocal.plugin]
})