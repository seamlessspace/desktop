import axios from 'axios';
import fs from 'fs';
import BASE_URL from './config';

const URL_ADDRESSES = {
    DEVICES: '/devices',
    DEVICE: '/device',
    FILE: '/file',
};

async function getAllDevices() {
    const res = await axios.get(`${BASE_URL}${URL_ADDRESSES.DEVICES}`);
    return res;
}

async function uploadFile(file) {
    const fd = new FormData();
    fd.append('pdf', file);
    const res = await axios.post(`${BASE_URL}${URL_ADDRESSES.FILE}`, fd, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res;
}

async function sendFileToAnotherDevice(params) {
    const res = await axios({
        url: `${BASE_URL}${URL_ADDRESSES.DEVICE}`,
        method: 'POST',
        data: {
            device_id: params.device_id,
            file_id: params.info.file_id,
            file_state: params.info.file_state,
        },
    });
    return res;
}

export {
    getAllDevices,
    uploadFile,
    sendFileToAnotherDevice,
};
