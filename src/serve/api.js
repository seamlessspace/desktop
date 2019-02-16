import axios from 'axios';
import BASE_URL from './config';

// const pdfUrl = `${BASE_URL}/files/A.pdf`;
const pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';

export default async function () {
    const res = await axios.get(pdfUrl);
    console.log(res);
}
