import pdfjs from 'pdfjs-dist';

async function getPdfPagePromises(filePath) {
    const loadingTask = pdfjs.getDocument(`file://${filePath}`);
    const pdf = await loadingTask.promise;
    const promises = [];
    for (let i = 1; i <= pdf._pdfInfo.numPages; i += 1) {
        promises.push(pdf.getPage(i));
    }
    return promises;
}

async function getPdfPage(params) {
    const loadingTask = pdfjs.getDocument(`file://${params.filePath}`);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(params.pageNumber || 1);
    const ratio = params.canvasWidth / page.getViewport(1).width;
    const viewport = page.getViewport(ratio);
    const { canvas } = params;
    const ctx = canvas.getContext('2d');
    canvas.width = params.canvasWidth;
    canvas.height = params.canvasHeight || viewport.height;
    const renderContext = {
        canvasContext: ctx,
        viewport,
    };
    await page.render(renderContext).promise;
}

async function loadPdfToCanvas(canvas, width, pagePromise) {
    const page = await pagePromise;
    const ratio = width / page.getViewport(1).width;
    const viewport = page.getViewport(ratio);
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = viewport.height;
    const renderContext = {
        canvasContext: ctx,
        viewport,
    };
    await page.render(renderContext).promise;
}

export {
    getPdfPage,
    getPdfPagePromises,
    loadPdfToCanvas,
};
