<template>
    <div class="card" @click="viewDocument">
        <div class="card__thumbnail">
            <canvas ref="doc" v-if="isPdf"></canvas>
            <p class="card__txt-preview" ref="text" v-else>{{txtContent}}</p>
        </div>
        <div class="info">
            <div class="info__title">{{fileExt.file.name}}</div>
            <div class="info__support">
                <img src="../assets/image/icon/pdf.png" class="info__icon" v-if="isPdf" />
                <img src="../assets/image/icon/txt.png" class="info__icon" v-else />
                <p class="info__modified">Modified 2 days ago</p>
                <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="info__ellipsis">
                </font-awesome-icon>
            </div>
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
    name: 'DocItem',
    data() {
        return {
            txtContent: '',
        };
    },
    props: {
        fileExt: Object,
    },
    methods: {
        viewDocument() {
            this.$store.commit('openFile', this.fileExt);
            this.$router.push('/document');
        },
    },
    computed: {
        isPdf() {
            const fileName = this.fileExt.file.name;
            return getFileType(fileName) === 'pdf';
        },
    },
    async mounted() {
        const { file } = this.fileExt;
        const type = getFileType(file.name);
        if (type === 'pdf') {
            await getPdfPage({
                filePath: file.path,
                canvas: this.$refs.doc,
                canvasWidth: 250,
                canvasHeight: 250,
            });
        } else if (type === 'txt') {
            this.txtContent = await readTxt(file.path);
        }
    },
};
</script>

<style lang="scss" scoped>
    $card-width: 250px;
    $card-height: 320px;

    .card {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: $card-width;
        height: $card-height;
        border: 1px solid #707070;
        border-radius: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 20px;
    }

    .card__thumbnail {
        width: $card-width;
        height: $card-width;
    }

    .card__txt-preview {
        padding: 5px;
        word-break: break-all;
        font-family: 'Consolas', monospace;
    }

    .info {
        position: relative;
        box-sizing: border-box;
        width: $card-width;
        height: $card-height - $card-width;
        padding: 10px;
        font-size: 16px;
    }

    .info__title {
        color: #5d5d5d;
        font-weight: bold;
    }

    .info__support {
        margin-top: 5px;
        display: flex;
        align-items: center;
    }

    .info__icon {
        width: 24px;
        height: 24px;
    }

    .info__modified {
        margin: 0 0 0 5px;
        color: #747474;
    }

    .info__ellipsis {
        font-size: 24px;
        color: #646464;
        position: absolute;
        top: 22px;
        right: 20px;
    }
</style>
