<template>
    <div>
        <nav class="nav">
            <font-awesome-icon :icon="['fas', 'chevron-left']" class="nav__back"
                               @click="returnHome">
            </font-awesome-icon>
            <h1 class="nav__title">Learn Space</h1>
        </nav>
    </div>
</template>

<script>
import createSocket from '../serve/socket';
import { getAllDevices, sendFileToAnotherDevice } from '../serve/api';

export default {
    name: 'Document',
    data() {
        return {
            socket: null,
            devices: null,
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
</style>
