import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        files: {
            pdf: [],
            txt: [],
        },
    },
    mutations: {
        addFile(state, file) {
            if (state.files[file.fileType]) {
                state.files[file.fileType].push(file);
            }
        },
    },
    actions: {

    },
});
