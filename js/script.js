const url = '../data/pdf.pdf';
let pdfDoc = null,
pageNum = 1,
pageIsRendering = false,
pageNumIsPending = null;

const scale = 1.5,
canvas = document.querySelector('#pdf-render'),
ctx = canvas.getContext('2d');

// Render the page
const renderPage = num => {
pageIsRendering = true;

// Get page
pdfDoc.getPage(num).then(page => {
  // Set scale
  const viewport = page.getViewport({ scale });
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderCtx = {
    canvasContext: ctx,
    viewport
  };

  page.render(renderCtx).promise.then(() => {
    pageIsRendering = false;

    if (pageNumIsPending !== null) {
      renderPage(pageNumIsPending);
      pageNumIsPending = null;
    }
  });

  // Output current page
  document.querySelector('#page-num').textContent = num;
});
};
//     document.querySelector('#page-num').textContent = num;
        
//     });

// };
const queRenderingPage = num => {
  if(pageIsRendering){
    pageNumIsPending = num;
  }
  else{
    renderPage(num);
  }
  
}
 
const showPrevPage = () =>{
  if(pageNum <= 1){
    return;
  }
  pageNum--;
  queRenderingPage(pageNum);
}
const showNextPage = () =>{
  if(pageNum >= pdfDoc.numPages){
    return;
  }
  pageNum++;
  queRenderingPage(pageNum);
}



pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    // document.querySelector('#page-count').textContent = pdfDoc.numPages;
    document.querySelector("#page-count").textContent = pdfDoc.numPages;

    renderPage(pageNum)

 });
//  .catch(error => {
//    const div = document.createElement('div');
//    div.className = 'error';
//    div.appendChild(document.createTextNode(err.message));
//    document.querySelector("body").insertBefore(div,canvas);
//    document.querySelector('.top-bar').style.display = 'none';
//  });
 document.querySelector("#prev-page").addEventListener("click",showPrevPage);
 document.querySelector("#next-page").addEventListener("click",showNextPage);