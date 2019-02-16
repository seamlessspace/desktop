<template>
    <div class="card">
        <div class="card__thumbnail">
            <canvas ref="doc"></canvas>
        </div>
        <div class="info">
            <div class="info__title">{{file.name}}</div>
            <div class="info__support">
                <img src="../assets/image/icon/pdf.png" class="info__icon" />
                <p class="info__modified">Modified 2 days ago</p>
                <font-awesome-icon :icon="['fas', 'ellipsis-v']" class="info__ellipsis">
                </font-awesome-icon>
            </div>
        </div>
    </div>
</template>

<script>
import getPdfPage from '../utils/loadPdf';

export default {
    name: 'DocItem',
    props: {
        file: File,
    },
    mounted() {
        getPdfPage({
            filePath: this.file.path,
            pageNumber: 1,
            canvas: this.$refs.doc,
            canvasWidth: 250,
            canvasHeight: 250,
        });
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
    }

    .card__thumbnail {
        width: $card-width;
        height: $card-width;
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
