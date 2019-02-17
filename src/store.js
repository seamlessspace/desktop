import Vue from 'vue';
import Vuex from 'vuex';
import { uploadFile } from './serve/api';

Vue.use(Vuex);

function getSuffix(file) {
    const afterSplit = file.name.split('.');
    return afterSplit[afterSplit.length - 1].toLowerCase();
}

export default new Vuex.Store({
    state: {
        files: {
            pdf: [],
            txt: [],
        },
        currentFile: null,
    },
    mutations: {
        addFile(state, fileExt) {
            const fileType = getSuffix(fileExt.file);
            state.files[fileType].push(fileExt);
        },
        openFile(state, fileExt) {
            state.currentFile = fileExt;
        },
    },
    actions: {

    },
});
