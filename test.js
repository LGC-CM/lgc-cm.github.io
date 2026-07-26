// ========== 测评全局变量 ==========
var currentIndex = 0;
var userAnswers = new Array(questions.length).fill(-1);

// ========== 渲染当前题目 ==========
function renderQuestion() {
    var q = questions[currentIndex];
    var box = document.getElementById('questionBox');
    
    var html = '<span class="question-module">' + q.module + '</span>';
    html += '<p class="question-text">' + (currentIndex + 1) + '. ' + q.q + '</p>';
    
    for (var i = 0; i < q.options.length; i++) {
        var selected = userAnswers[currentIndex] === i ? 'selected' : '';
        html += '<div class="option-item ' + selected + '" onclick="selectOption(' + i + ')">';
        html += String.fromCharCode(65 + i) + '、' + q.options[i];
        html += '</div>';
    }
    
    box.innerHTML = html;
    
    // 更新进度
    var percent = ((currentIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressText').textContent = '第 ' + (currentIndex + 1) + ' / ' + questions.length + ' 题';
    
    // 按钮状态
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').textContent = currentIndex === questions.length - 1 ? '查看结果' : '下一题';
}

// ========== 选中选项 ==========
function selectOption(idx) {
    userAnswers[currentIndex] = idx;
    renderQuestion();
}

// ========== 上一题 ==========
function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
}

// ========== 下一题 / 提交 ==========
function nextQuestion() {
    if (userAnswers[currentIndex] === -1) {
        alert('请先选择一个选项哦~');
        return;
    }
    
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        showResult();
    }
}

// ========== 计算分数并显示结果 ==========
function showResult() {
    // 计算原始总分
    var rawScore = 0;
    var lowSelfDiscipline = false;
    var lowConnect = false;
    
    for (var i = 0; i < questions.length; i++) {
        var ansIdx = userAnswers[i];
        rawScore += questions[i].scores[ansIdx];
        
        // 检测自律标签低分（小于1分）
        if (questions[i].tag === '自律' && questions[i].scores[ansIdx] < 1) {
            lowSelfDiscipline = true;
        }
        // 检测衔接标签低分（小于1.5分）
        if (questions[i].tag === '衔接' && questions[i].scores[ansIdx] < 1.5) {
            lowConnect = true;
        }
    }
    
    // 换算百分制（原始满分52分）
    var percentScore = Math.round((rawScore / 52) * 100);
    
    // 匹配等级
    var level = null;
    for (var j = 0; j < levelTemplates.length; j++) {
        if (percentScore >= levelTemplates[j].min && percentScore <= levelTemplates[j].max) {
            level = levelTemplates[j];
            break;
        }
    }
    
    // 渲染结果
    var html = '';
    html += '<div class="result-score">' + percentScore + '分</div>';
    html += '<div class="result-level">' + level.name + '</div>';
    
    html += '<div class="result-section">';
    html += '<h4>📊 学情特征</h4>';
    html += '<p>' + level.feature + '</p>';
    html += '</div>';
    
    html += '<div class="result-section">';
    html += '<h4>📋 专属学习计划</h4>';
    html += '<ul>';
    for (var k = 0; k < level.tasks.length; k++) {
        html += '<li>' + level.tasks[k] + '</li>';
    }
    html += '</ul>';
    html += '</div>';
    
    // 个性化微调
    if (lowSelfDiscipline || lowConnect) {
        html += '<div class="result-tip">';
        html += '<p><strong>💡 个性化微调建议：</strong></p>';
        if (lowSelfDiscipline) {
            html += '<p>• 自律微调：增加作息约束，减少娱乐时间，每日增加15分钟专注力训练</p>';
        }
        if (lowConnect) {
            html += '<p>• 衔接微调：建议提前了解初中新科目，增加入门认知学习内容</p>';
        }
        html += '</div>';
    }
    
    document.getElementById('resultCard').innerHTML = html;
    
    // 切换页面
    document.getElementById('pageTest').style.display = 'none';
    document.getElementById('pageResult').style.display = 'block';
}

// ========== 重新测评 ==========
function restartTest() {
    currentIndex = 0;
    userAnswers = new Array(questions.length).fill(-1);
    document.getElementById('pageResult').style.display = 'none';
    document.getElementById('pageTest').style.display = 'block';
    renderQuestion();
}

// ========== 进入测评 ==========
function goTest() {
    document.getElementById('pageHome').style.display = 'none';
    document.getElementById('pageTest').style.display = 'block';
    currentIndex = 0;
    userAnswers = new Array(questions.length).fill(-1);
    renderQuestion();
}
