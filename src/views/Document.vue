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
                <tag-item v-for="(fileExt, index) in $store.state.files.pdf" :file="fileExt.file"
                          :active="fileExt === $store.state.currentFile" :key="index">
                </tag-item>
            </aside>
            <div class="preview" ref="preview">
                <preview-page v-for="(promise, index) in pdfPromises" :width="previewWidth"
                              :page-promise="promise" :key="index"></preview-page>
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

export default {
    name: 'Document',
    components: { PreviewPage, TagItem },
    data() {
        return {
            socket: null,
            devices: null,
            previewWidth: 0,
            pdfPromises: [],
        };
    },
    methods: {
        returnHome() {
            this.$router.push('/');
            this.$store.commit('cleanFile');
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
        this.socket.on('updateDevicesList', (devices) => {
            this.devices = devices;
        });
    },
    async mounted() {
        const filePath = this.$store.state.currentFile.file.path;
        const { width } = window.getComputedStyle(this.$refs.preview, null);
        this.previewWidth = Number(width.substring(0, width.length - 2)) - 60;
        this.pdfPromises = await getPdfPagePromises(filePath);
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
