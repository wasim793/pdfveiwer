const url = '../pdf.pdf';
let pdfDoc = null,
pageNum = 1,
pageIsRendering = false,
pageNumIsPending = null;

const scale = 1.5,
canvas = document.querySelector('#pdf-render'),
ctx = canvas.getContext('2d');
const renderPge = num => {

};
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    document.querySelector('#page-count').textContent = pdfDoc.numPages;
});