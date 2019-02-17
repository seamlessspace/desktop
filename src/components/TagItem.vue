<template>
    <div class="card" :class="{'card--active': active}" ref="card" @click="selectFile"
         @mousedown="handleDragStart">
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
            isMoving: false,
            width: 0,
            height: 0,
        };
    },
    props: {
        fileExt: Object,
        active: Boolean,
    },
    methods: {
        selectFile() {
            const oldFileExt = this.$store.state.currentFile;
            this.$store.commit('openFile', this.fileExt);
            this.$emit('refresh', oldFileExt);
        },
        handleDragStart(event) {
            this.selectFile();
            this.$emit('startsend');
            this.isMoving = true;
            const style = window.getComputedStyle(this.$refs.card, null);
            this.width = Number(style.width.substring(0, style.width.length - 2));
            this.height = Number(style.height.substring(0, style.height.length - 2));
            this.$refs.card.style.left = `${event.clientX - this.width / 2}px`;
            this.$refs.card.style.top = `${event.clientY - this.height / 2}px`;
            this.$refs.card.style.position = 'fixed';
        },
        handleDragMove(event) {
            if (!this.isMoving) {
                return;
            }
            this.$refs.card.style.left = `${event.clientX - this.width / 2}px`;
            this.$refs.card.style.top = `${event.clientY - this.height / 2}px`;
        },
        handleDragEnd(event) {
            this.$emit('endsend');
            this.isMoving = false;
            this.$refs.card.style.position = 'static';
            this.$refs.card.style.left = '0';
            this.$refs.card.style.top = '0';
            this.width = 0;
            this.height = 0;
        },
    },
    computed: {
        isPdfFile() {
            return getFileType(this.fileExt.file.name) === 'pdf';
        },
    },
    created() {
        const { body } = document;
        body.addEventListener('mousemove', this.handleDragMove);
        body.addEventListener('mouseup', this.handleDragEnd);
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
        max-width: 300px;
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
