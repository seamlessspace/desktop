<template>
    <div class="home">
        <nav-bar></nav-bar>
        <doc-list type="pdf" :files="$store.state.files.pdf"></doc-list>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import DocList from '../components/DocList.vue';

function getSuffix(fileName) {
    const afterSplit = fileName.split('.');
    return afterSplit[afterSplit.length - 1].toLowerCase();
}

export default {
    name: 'home',
    components: { DocList, NavBar },
    methods: {},
    created() {
        const { body } = document;
        const preventHandler = e => e.preventDefault();
        const dropHandler = (event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            file.fileType = getSuffix(file.name);
            this.$store.commit('addFile', file);
        };
        body.addEventListener('dragover', preventHandler);
        body.addEventListener('dragleave', preventHandler);
        body.addEventListener('dragend', preventHandler);
        body.addEventListener('drop', dropHandler);
    },
};
</script>
