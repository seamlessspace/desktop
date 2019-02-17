import axios from 'axios';
import fs from 'fs';
import BASE_URL from './config';

const URL_ADDRESSES = {
    DEVICES: '/devices',
    FILE: '/file',
};

async function getAllDevices(params) {
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

export {
    getAllDevices,
    uploadFile,
};
