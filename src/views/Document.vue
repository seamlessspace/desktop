<template>
    <div>
        <h1>My PDF document</h1>
        <canvas ref="doc"></canvas>
    </div>
</template>

<script>
import pdfUrl from '../serve/api';
import getPdfPage from '../utils/loadPdf';

export default {
    name: 'Document',
    mounted() {
        getPdfPage({
            url: 'file:///Users/billyzou/Desktop/learnspace.pdf',
            pageNumber: 1,
            scale: 1.5,
            canvas: this.$refs.doc,
        });
    },
};
</script>

<style scoped>

</style>
