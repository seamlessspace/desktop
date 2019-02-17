import fs from 'fs';
import http from 'http';

export default function (fileUrl, fileName) {
    return new Promise((resolve, reject) => {
        http.get(fileUrl, (res) => {
            let data = '';
            res.setEncoding('binary');
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const filePath = `/Users/billyzou/Desktop/downloads/${fileName}`;
                fs.writeFile(filePath, data, 'binary', (err) => {
                    if (err) {
                        console.log(err);
                        reject();
                    } else {
                        resolve(filePath);
                    }
                });
            });
            res.on('error', (err) => {
                console.log(err);
                reject();
            });
        });
    });
}
