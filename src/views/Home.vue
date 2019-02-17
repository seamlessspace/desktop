<template>
    <div class="home">
        <nav-bar></nav-bar>
        <doc-list type="pdf" :files="$store.state.files.pdf"></doc-list>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import DocList from '../components/DocList.vue';
import { uploadFile } from '../serve/api';

function getSuffix(file) {
    const afterSplit = file.name.split('.');
    return afterSplit[afterSplit.length - 1].toLowerCase();
}

function isValidFile(file) {
    const suffix = getSuffix(file);
    return !(suffix !== 'pdf' && suffix !== 'txt');
}

export default {
    name: 'home',
    components: { DocList, NavBar },
    methods: {},
    created() {
        const { body } = document;
        const preventHandler = e => e.preventDefault();
        const dropHandler = async (event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (!isValidFile(file)) {
                return;
            }
            const res = await uploadFile(file);
            const fileExt = {
                file,
                info: res.data,
            };
            this.$store.commit('addFile', fileExt);
        };
        body.addEventListener('dragover', preventHandler);
        body.addEventListener('dragleave', preventHandler);
        body.addEventListener('dragend', preventHandler);
        body.addEventListener('drop', dropHandler);
    },
};
</script>
