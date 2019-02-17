<template>
    <section class="doc" v-if="files.length > 0">
        <h2 class="doc__title">{{type}}</h2>
        <div class="doc__list">
            <doc-item v-for="(fileExt, index) in files" :fileExt="fileExt" :key="index">
            </doc-item>
        </div>
    </section>
</template>

<script>
import DocItem from './DocItem.vue';

export default {
    name: 'DocList',
    components: { DocItem },
    props: {
        type: String,
        files: Array,
    },
};
</script>

<style lang="scss" scoped>
    .doc {
        padding: 0 20px;
        margin-top: 20px;
    }

    .doc__title {
        color: #646464;
        font-size: 16px;
    }

    .doc__list {
        display: flex;
        margin-top: 10px;
    }
</style>
