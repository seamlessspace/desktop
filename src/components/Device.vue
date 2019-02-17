<template>
    <div class="device" @mouseup="finishSend">
        <div class="device__icon" :style="{background: iconColor}">
            <font-awesome-icon :icon="['fas', 'mobile-alt']" v-if="device.device_type === 0">
            </font-awesome-icon>
            <font-awesome-icon :icon="['fas', 'tablet-alt']" v-else-if="device.device_type === 1">
            </font-awesome-icon>
            <font-awesome-icon :icon="['fas', 'laptop']" v-else></font-awesome-icon>
        </div>
        <div class="device__name" :style="{background: iconColor}">{{device.nickname}}</div>
    </div>
</template>

<script>
import { sendFileToAnotherDevice } from '../serve/api';

export default {
    name: 'Device',
    props: {
        device: Object,
    },
    methods: {
        async finishSend() {
            const { info } = this.$store.state.currentFile;
            await sendFileToAnotherDevice({
                device_id: this.device.device_id,
                info,
            });
        },
    },
    computed: {
        iconColor() {
            return `#${this.device.color.substring(3)}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .device {
        margin-top: 15px;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .device__icon {
        border-radius: 50%;
        width: 75px;
        height: 75px;
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .device__name {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        margin-top: 5px;
        width: 75px;
        height: 20px;
        font-size: 12px;
    }
</style>
