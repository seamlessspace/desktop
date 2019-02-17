<template>
    <div class="card" :class="{'card--active': active}">
        <header class="header">
            <img class="header__icon" src="../assets/image/icon/pdf.png" v-if="isPdfFile" />
            <img class="header__icon" src="../assets/image/icon/txt.png" v-else />
            <p class="header__title" :class="{'header__title--active': active}">{{file.name}}</p>
        </header>
        <div class="card__canvas-wrapper">
            <canvas class="card__canvas" ref="canvas" v-if="isPdfFile"></canvas>
            <p class="card__txt" v-else></p>
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
        file: File,
        active: Boolean,
    },
    computed: {
        isPdfFile() {
            return getFileType(this.file.name) === 'pdf';
        },
    },
    async mounted() {
        const isPdfFile = getFileType(this.file.name) === 'pdf';
        if (isPdfFile) {
            const style = window.getComputedStyle(this.$refs.canvas, null);
            await getPdfPage({
                filePath: this.file.path,
                canvas: this.$refs.canvas,
                canvasWidth: parseInt(style.width, 10),
                canvasHeight: parseInt(style.height, 10),
            });
        } else {
            this.txtContent = await readTxt(this.file.path);
        }
    },
};
</script>

<style lang="scss" scoped>
    .card {
        background-color: #f0f0f0;
        margin-top: 10px;
        padding: 8px;
        border-radius: 5px;
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
        word-break: break-all;
        font-family: 'Consolas', monospace;
    }
</style>
