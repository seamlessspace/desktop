import pdfjs from 'pdfjs-dist';

export default async function getPdfPage(params) {
    const loadingTask = pdfjs.getDocument(params.url);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(params.pageNumber);
    const viewport = page.getViewport(params.scale || 1);
    const { canvas } = params;
    const ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
        canvasContext: ctx,
        viewport,
    };
    await page.render(renderContext).promise;
}
