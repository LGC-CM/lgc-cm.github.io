// ========== 页面加载初始化 ==========
window.onload = function() {
    renderSubjects();
};

// ========== 渲染首页科目卡片 ==========
function renderSubjects() {
    const grid = document.querySelector(".subject-grid");
    const subjects = ["语文", "数学", "英语", "道法", "历史", "生物", "地理"];
    let html = "";
    subjects.forEach(name => {
        html += `<div class="subject-card" onclick="openSubject('${name}')">
            <h3>${name}</h3>
        </div>`;
    });
    grid.innerHTML = html;
}

// ========== 打开科目详情页（全部敬请期待） ==========
function openSubject(name) {
    document.getElementById('pageHome').style.display = 'none';
    document.getElementById('pageSubject').style.display = 'block';
    document.getElementById('subjectTitle').textContent = name + '专项';

    let html = "";
    html += '<div class="detail-card" onclick="showModal(\'教材原书\', \'敬请期待\')">';
    html += '<div class="detail-icon">📖</div><h3>教材原书</h3></div>';

    html += '<div class="detail-card" onclick="showModal(\'重难点解析\', \'敬请期待\')">';
    html += '<div class="detail-icon">🎯</div><h3>重难点解析</h3></div>';

    html += '<div class="detail-card" onclick="showModal(\'学霸笔记\', \'敬请期待\')">';
    html += '<div class="detail-icon">📝</div><h3>学霸笔记</h3></div>';

    document.getElementById("detailBox").innerHTML = html;
}

// ========== 返回首页 ==========
function backHome() {
    document.getElementById('pageHome').style.display = 'block';
    document.getElementById('pageSubject').style.display = 'none';
}

// ========== 弹窗功能 ==========
function showModal(title, content) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalContent").innerText = content;
    document.getElementById("modal").style.display = "flex";
}

// 关闭弹窗
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
