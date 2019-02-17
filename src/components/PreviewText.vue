<template>
    <textarea class="txt" v-model="textValue" ref="text" @keyup="findCursor" @click="findCursor"></textarea>
</template>

<script>
import { readTxt } from '../serve/api';

export default {
    name: 'PreviewText',
    data() {
        return {
            textValue: '',
            cursorPos: -1,
        };
    },
    methods: {
        findCursor() {
            this.$emit('updatecursor', this.$refs.text.selectionStart);
        },
    },
    props: {
        fileExt: Object,
    },
    async created() {
        this.textValue = await readTxt(this.fileExt.file.path);
    },
    mounted() {
        setTimeout(() => {
            if (this.fileExt.info.file_state) {
                const pos = this.fileExt.info.file_state.cursor;
                this.$refs.text.focus();
                this.$refs.text.setSelectionRange(pos, pos);
            }
        }, 10);
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
