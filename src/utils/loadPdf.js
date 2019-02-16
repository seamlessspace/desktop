import pdfjs from 'pdfjs-dist';

export default async function getPdfPage(params) {
    const loadingTask = pdfjs.getDocument(`file://${params.filePath}`);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(params.pageNumber);
    const viewport = page.getViewport(params.canvasWidth / page.getViewport(1).width);
    const { canvas } = params;
    const ctx = canvas.getContext('2d');
    canvas.height = params.canvasHeight;
    canvas.width = params.canvasWidth;
    const renderContext = {
        canvasContext: ctx,
        viewport,
    };
    await page.render(renderContext).promise;
}
