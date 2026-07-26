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

// ========== 题库弹窗（显示七科封面） ==========
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
    document.getElementById('pageSubject').style.display = 'block';
}
