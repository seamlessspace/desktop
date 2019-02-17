<template>
    <canvas class="view" ref="canvas"></canvas>
</template>

<script>
import { loadPdfToCanvas } from '../utils/loadPdf';

export default {
    name: 'PreviewPage',
    props: {
        width: Number,
        pagePromise: Promise,
    },
    async mounted() {
        await loadPdfToCanvas(this.$refs.canvas, this.width, this.pagePromise);
    },
};
</script>

<style lang="scss" scoped>
    .view {
        margin: 20px 0;
    }
</style>
