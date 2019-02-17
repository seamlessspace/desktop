import Vue from 'vue';
import Vuex from 'vuex';

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
        updateFileState(state, fileState) {
            state.currentFile.info.file_state = fileState;
        },
        cleanFile(state) {
            state.currentFile = null;
        },
    },
    actions: {

    },
});
