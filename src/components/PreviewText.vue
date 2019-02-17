<template>
    <textarea class="txt" v-model="textValue"></textarea>
</template>

<script>
import { readTxt } from '../serve/api';

export default {
    name: 'PreviewText',
    data() {
        return {
            textValue: '',
        };
    },
    props: {
        fileExt: Object,
    },
    async created() {
        this.textValue = await readTxt(this.fileExt.file.path);
    },
};
</script>

<style lang="scss" scoped>
    .txt {
        margin: 30px 0;
        width: calc(100% - 40px);
        height: calc(100% - 60px);
        border: none;
        resize: none;
        outline: none;
        font-size: 20px;
        font-family: 'Consolas', monospace;
    }
</style>
