<template>
    <div>
        <nav class="nav">
            <font-awesome-icon :icon="['fas', 'chevron-left']" class="nav__back"
                               @click="$router.push('/')">
            </font-awesome-icon>
            <h1 class="nav__title">Learn Space</h1>
        </nav>
        <canvas ref="doc"></canvas>
    </div>
</template>

<script>
import createSocket from '../serve/socket';
import { getAllDevices, uploadFile } from '../serve/api';

export default {
    name: 'Document',
    data() {
        return {
            socket: null,
            devices: null,
        };
    },
    created() {
        // this.socket = createSocket();
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
