import axios from 'axios';
import fs from 'fs';
import BASE_URL from './config';

const URL_ADDRESSES = {
    DEVICES: '/devices',
    DEVICE: '/device',
    FILE: '/file',
};

async function readTxt(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

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

async function getFileWithId(id) {
    const res = await axios.get(`${BASE_URL}${URL_ADDRESSES.FILE}?file_id=${id}`);
    return res;
}

async function sendFileToAnotherDevice(params) {
    console.log(params);
    const res = await axios({
        url: `${BASE_URL}${URL_ADDRESSES.DEVICE}`,
        method: 'POST',
        data: {
            device_id: params.device_id,
            file_id: params.info.file_id,
            file_state: {
                cursor: params.info.file_state,
            },
        },
    });
    return res;
}

export {
    readTxt,
    getAllDevices,
    uploadFile,
    sendFileToAnotherDevice,
    getFileWithId,
};
