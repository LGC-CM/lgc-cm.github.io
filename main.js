// ========== PDF.JS 全局配置 ==========
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';
let globalPdfDoc = null;
let globalCurrentPage = 1;
let globalScale = 1.4;

// ========== 页面加载完成初始化 ==========
window.onload = function() {
    renderSubjects();
};

// ========== 渲染科目卡片 ==========
function renderSubjects() {
    var grid = document.getElementById('subjectGrid');
    var html = '';
    
    for (var i = 0; i < subjects.length; i++) {
        html += '<div class="subject-card" onclick="openSubject(\'' + subjects[i].name + '\')">';
        html += '<img src="' + subjects[i].img + '" alt="' + subjects[i].name + '">';
        html += '<h4>' + subjects[i].name + '</h4>';
        html += '</div>';
    }
    
    grid.innerHTML = html;
}

// ========== 通用弹窗 ==========
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').textContent = content;
    document.getElementById('modalExtra').innerHTML = '';
    document.getElementById('modalMask').style.display = 'flex';
}

// ========== 题库弹窗 ==========
function showBookModal() {
    document.getElementById('modalTitle').textContent = '题库';
    document.getElementById('modalContent').textContent = '选择科目进入练习';
    
    var extra = '<div class="modal-books">';
    for (var i = 0; i < subjects.length; i++) {
        extra += '<div class="modal-book-item" onclick="showModal(\'' + subjects[i].name + '\', \'敬请期待\')">';
        extra += '<img src="' + subjects[i].img + '">';
        extra += '<span>' + subjects[i].name + '</span>';
        extra += '</div>';
    }
    extra += '</div>';
    
    document.getElementById('modalExtra').innerHTML = extra;
    document.getElementById('modalMask').style.display = 'flex';
}

// ========== 关闭弹窗 ==========
function closeModal(e) {
    if (e && e.target !== document.getElementById('modalMask') && e.type === 'click') return;
    document.getElementById('modalMask').style.display = 'none';
}

// ========== 返回首页 ==========
function goHome() {
    document.getElementById('pageTest').style.display = 'none';
    document.getElementById('pageResult').style.display = 'none';
    document.getElementById('pageSubject').style.display = 'none';
    document.getElementById('pageHome').style.display = 'block';
}

// ========== 打开科目详情 ==========
function openSubject(name) {
    document.getElementById('pageHome').style.display = 'none';
    document.getElementById('subjectTitle').textContent = name + '专项';

    const linkMap = {
        "语文": {book: "yw-book.pdf"},
        "数学": {book: "sx-book.pdf"},
        "英语": {book: "yy-book.pdf"},
        "道德与法治": {book: "ddyfz-book.pdf"},
        "历史": {book: "ls-book.pdf"},
        "生物": {book: "sw-book.pdf"},
        "地理": {book: "dl-book.pdf"}
    };

    const info = linkMap[name];
    var html = "";

    // 点击调用PDF内嵌预览
    html += '<div class="detail-card" onclick="openPdfPreview(\'' + info.book + '\',\'' + name + '教材原书\')">';
    html += '<div class="detail-icon">📖</div><h3>教材原书</h3></div>';

    html += '<div class="detail-card" onclick="showModal(\'重难点解析\', \'敬请期待\')">';
    html += '<div class="detail-icon">🎯</div><h3>重难点解析</h3></div>';

    html += '<div class="detail-card" onclick="showModal(\'学霸笔记\', \'敬请期待\')">';
    html += '<div class="detail-icon">📝</div><h3>学霸笔记</h3></div>';

    document.getElementById("detailContent").innerHTML = html;
    document.getElementById('pageSubject').style.display = 'block';
}

// ===================== PDF预览相关函数 =====================
function openPdfPreview(pdfUrl, title) {
    document.getElementById("pdfTitle").textContent = title;
    document.getElementById("pdfMask").style.display = "flex";
    globalPdfDoc = null;
    globalCurrentPage = 1;

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(function(pdf) {
        globalPdfDoc = pdf;
        renderPdfPage(globalCurrentPage);
    }).catch(err=>{
        showModal("预览失败","文件加载异常，可尝试下载PDF本地打开");
        console.error(err);
    });
}

function renderPdfPage(pageNum) {
    if(!globalPdfDoc) return;
    globalPdfDoc.getPage(pageNum).then(function(page) {
        const canvas = document.getElementById("pdfCanvas");
        const ctx = canvas.getContext("2d");
        const viewport = page.getViewport({scale: globalScale});
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const renderCtx = {canvasContext: ctx, viewport: viewport};
        page.render(renderCtx);
        document.getElementById("pdfPageInfo").textContent = `${pageNum} / ${globalPdfDoc.numPages}`;
    });
}

function prevPdfPage(){
    if(!globalPdfDoc || globalCurrentPage <=1) return;
    globalCurrentPage--;
    renderPdfPage(globalCurrentPage);
}
function nextPdfPage(){
    if(!globalPdfDoc || globalCurrentPage >= globalPdfDoc.numPages) return;
    globalCurrentPage++;
    renderPdfPage(globalCurrentPage);
}
function closePdfPreview(){
    document.getElementById("pdfMask").style.display = "none";
    globalPdfDoc = null;
}
