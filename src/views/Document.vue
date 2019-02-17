<template>
    <div>
        <nav class="nav">
            <font-awesome-icon :icon="['fas', 'chevron-left']" class="nav__back"
                               @click="returnHome">
            </font-awesome-icon>
            <h1 class="nav__title">Learn Space</h1>
        </nav>
        <main class="main">
            <aside class="list">
                <p class="list__counter">
                    Opened Tags ({{$store.state.files.pdf.length + $store.state.files.txt.length}})
                </p>
                <tag-item v-for="(pdfFileExt, pdfIndex) in $store.state.files.pdf"
                          :file-ext="pdfFileExt" :active="pdfFileExt === $store.state.currentFile"
                          :key="pdfIndex" @refresh="handleRefresh">
                </tag-item>
                <tag-item v-for="(txtFileExt, txtIndex) in $store.state.files.txt"
                          :file-ext="txtFileExt" :active="txtFileExt === $store.state.currentFile"
                          :key="txtIndex + $store.state.files.pdf.length"></tag-item>
            </aside>
            <div class="preview" ref="preview" v-if="isPdfFile($store.state.currentFile.file)">
                <preview-page v-for="(promise, index) in pdfPromises" :width="previewWidth"
                              :page-promise="promise" :key="index"></preview-page>
            </div>
            <div class="preview" v-else>
                <preview-text :fileExt="$store.state.currentFile"></preview-text>
            </div>
        </main>
    </div>
</template>

<script>
import createSocket from '../serve/socket';
import { getAllDevices, sendFileToAnotherDevice } from '../serve/api';
import { getPdfPagePromises } from '../utils/loadPdf';
import TagItem from '../components/TagItem.vue';
import PreviewPage from '../components/PreviewPage.vue';
import PreviewText from '../components/PreviewText.vue';

function isPdf(file) {
    return file.name.substring(file.name.length - 3).toLowerCase() === 'pdf';
}

export default {
    name: 'Document',
    components: { PreviewText, PreviewPage, TagItem },
    data() {
        return {
            socket: null,
            devices: null,
            previewWidth: 0,
            pdfPromises: [],
        };
    },
    methods: {
        isPdfFile(file) {
            return file.name.substring(file.name.length - 3).toLowerCase() === 'pdf';
        },
        returnHome() {
            this.$router.push('/');
            this.$store.commit('cleanFile');
        },
        handleRefresh(fileExt) {
            if (fileExt !== this.$store.state.currentFile) {
                this.pdfPromises = [];
            }
            this.$nextTick(() => {
                this.loadPdfPreview();
            });
        },
        async loadPdfPreview() {
            const { file } = this.$store.state.currentFile;
            const { width } = window.getComputedStyle(this.$refs.preview, null);
            this.previewWidth = Number(width.substring(0, width.length - 2)) - 60;
            this.pdfPromises = await getPdfPagePromises(file.path);
        },
        async sendFile(device) {
            await sendFileToAnotherDevice({
                info: this.$store.state.currentFile.info,
                device_id: device.device_id,
            });
        },
    },
    async created() {
        const getDevicesRes = await getAllDevices();
        this.devices = getDevicesRes.data;
        this.socket = createSocket();
        this.socket.on('newfile', (res) => {
            console.log(res);
        });
        this.socket.on('pushDevice', (pushedDevice) => {
            this.devices.push(pushedDevice);
        });
        this.socket.on('popDevice', (popedDevice) => {
            this.devices = this.devices.filter(item => item.device_id !== popedDevice.device_id);
        });
    },
    async mounted() {
        const { file } = this.$store.state.currentFile;
        if (isPdf(file)) {
            await this.loadPdfPreview();
        }
    },
};
</script>

<style lang="scss" scoped>
    .nav {
        position: sticky;
        height: 60px;
        background-color: #e6e6e6;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }

    .nav__back {
        color: #535353;
        font-size: 20px;
    }

    .nav__title {
        color: #676767;
        font-size: 20px;
        margin-left: 15px;
        font-weight: normal;
    }

    .main {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
    }

    .preview {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    }

    .list {
        min-width: 200px;
        width: 20%;
        height: 100%;
        background-color: #9b9b9b;
        padding: 10px;
        overflow-y: scroll;
    }

    .list::-webkit-scrollbar {
        display: none;
    }

    .list__counter {
        font-size: 14px;
        font-weight: bold;
        color: #484848;
    }

    .preview {
        width: 80%;
        min-width: 800px;
        background-color: black;
        padding: 0 10px;
    }
</style>
