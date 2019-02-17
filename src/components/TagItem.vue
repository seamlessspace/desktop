<template>
    <div class="card" :class="{'card--active': active}" @click="selectFile">
        <header class="header">
            <img class="header__icon" src="../assets/image/icon/pdf.png" v-if="isPdfFile" />
            <img class="header__icon" src="../assets/image/icon/txt.png" v-else />
            <p class="header__title" :class="{'header__title--active': active}">
                {{fileExt.file.name}}
            </p>
        </header>
        <div class="card__canvas-wrapper">
            <canvas class="card__canvas" ref="canvas" v-if="isPdfFile"></canvas>
            <p class="card__txt" v-else>{{txtContent}}</p>
        </div>
    </div>
</template>

<script>
import { getPdfPage } from '../utils/loadPdf';
import { readTxt } from '../serve/api';

function getFileType(fileName) {
    return fileName.substring(fileName.length - 3).toLowerCase();
}

export default {
    name: 'TagItem',
    data() {
        return {
            txtContent: '',
        };
    },
    props: {
        fileExt: Object,
        active: Boolean,
    },
    methods: {
        selectFile() {
            this.$store.commit('openFile', this.fileExt);
            this.$emit('refresh');
        },
    },
    computed: {
        isPdfFile() {
            return getFileType(this.fileExt.file.name) === 'pdf';
        },
    },
    async mounted() {
        const isPdfFile = getFileType(this.fileExt.file.name) === 'pdf';
        if (isPdfFile) {
            const style = window.getComputedStyle(this.$refs.canvas, null);
            await getPdfPage({
                filePath: this.fileExt.file.path,
                canvas: this.$refs.canvas,
                canvasWidth: parseInt(style.width, 10),
                canvasHeight: parseInt(style.height, 10),
            });
        } else {
            this.txtContent = await readTxt(this.fileExt.file.path);
        }
    },
};
</script>

<style lang="scss" scoped>
    .card {
        background-color: #f0f0f0;
        max-height: 200px;
        margin-top: 10px;
        padding: 8px;
        border-radius: 5px;
        overflow: hidden;
    }

    .card--active {
        background-color: #52afff;
    }

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .header__icon {
        width: 20px;
        height: 20px;
    }

    .header__title {
        margin-left: 5px;
        color: #747474;
        font-size: 14px;
    }

    .header__title--active {
        color: white;
    }

    .card__canvas-wrapper {
        width: 100%;
    }

    .card__canvas {
        width: inherit;
        height: inherit;
    }

    .card__txt {
        max-height: 150px;
        background-color: white;
        word-break: break-all;
        font-family: 'Consolas', monospace;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
