// 편집 화면 로직
let editData = null;

// 데이터 로드
function loadEditData() {
    const saved = localStorage.getItem('profileData');
    if (saved) {
        editData = JSON.parse(saved);
    } else {
        editData = ProfileData.getDefaultData();
    }
    renderEditForm();
}

// 편집 폼 렌더링
function renderEditForm() {
    // 프로필 정보
    document.getElementById('editProfileImage').value = editData.profile.image || '';
    document.getElementById('editProfileName').value = editData.profile.name || '';
    document.getElementById('editProfileEmail').value = editData.profile.email || '';
    document.getElementById('editProfilePhone').value = editData.profile.phone || '';
    document.getElementById('editProfileLine').value = editData.profile.links.line || '';
    document.getElementById('editProfileGithub').value = editData.profile.links.github || '';
    document.getElementById('editProfileDiscord').value = editData.profile.links.discord || '';
    document.getElementById('editProfileYoutube').value = editData.profile.links.youtube || '';
    document.getElementById('editProfileFacebook').value = editData.profile.links.facebook || '';
    document.getElementById('editProfileInstagram').value = editData.profile.links.instagram || '';
    document.getElementById('editProfileEnabled').checked = editData.profile.enabled !== false;

    // INTRODUCE
    const introduceEditor = document.getElementById('editIntroduce');
    if (introduceEditor) {
        introduceEditor.innerHTML = editData.introduce.content || '';
    }
    document.getElementById('editIntroduceEnabled').checked = editData.enabled.introduce !== false;

    // 섹션 순서 설정
    const sectionOrder = editData.sectionOrder || {
        experience: 1,
        project: 2,
        opensource: 3,
        education: 4,
        etc: 5,
        article: 6
    };
    document.getElementById('sectionOrderExperience').value = sectionOrder.experience || 1;
    document.getElementById('sectionOrderProject').value = sectionOrder.project || 2;
    document.getElementById('sectionOrderOpensource').value = sectionOrder.opensource || 3;
    document.getElementById('sectionOrderEducation').value = sectionOrder.education || 4;
    document.getElementById('sectionOrderEtc').value = sectionOrder.etc || 5;
    document.getElementById('sectionOrderArticle').value = sectionOrder.article || 6;

    // SKILL
    renderSkillEdit();

    // EXPERIENCE
    renderExperienceEdit();

    // PROJECT
    renderProjectEdit();

    // OPEN SOURCE
    renderOpensourceEdit();

    // EDUCATION
    renderEducationEdit();

    // ETC
    renderEtcEdit();

    // ARTICLE
    renderArticleEdit();
}

// SKILL 편집 렌더링
function renderSkillEdit() {
    const container = document.getElementById('skillEditContainer');
    container.innerHTML = '';
    
    editData.skills.forEach((skill, index) => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-category-edit';
        skillDiv.innerHTML = `
            <div class="skill-category-edit-header">
                <input type="text" class="skill-category-name" value="${skill.category}" data-index="${index}">
                <button type="button" class="delete-btn" onclick="deleteSkillCategory(${index})">삭제</button>
            </div>
            <div class="form-group">
                <label>활성화:</label>
                <input type="checkbox" class="skill-enabled" ${skill.enabled !== false ? 'checked' : ''} data-index="${index}">
            </div>
            <div class="skill-items-edit" id="skillItems${index}">
                ${skill.items.map((item, itemIndex) => `
                    <span class="skill-tag">
                        ${item}
                        <span class="skill-tag-remove" onclick="removeSkillItem(${index}, ${itemIndex})">×</span>
                    </span>
                `).join('')}
            </div>
            <div class="skill-input-container">
                <input type="text" class="new-skill-input" placeholder="새 스킬 추가" data-index="${index}">
                <button type="button" class="add-skill-btn" onclick="addSkillItem(${index})">추가</button>
            </div>
        `;
        container.appendChild(skillDiv);
    });
}

// EXPERIENCE 편집 렌더링
function renderExperienceEdit() {
    const container = document.getElementById('experienceEditContainer');
    container.innerHTML = '';
    
    editData.experiences.forEach((exp, index) => {
        const expDiv = createExperienceEditItem(exp, index);
        container.appendChild(expDiv);
    });
}

function createExperienceEditItem(exp, index) {
    const startDate = exp.startDate || '';
    const endDate = exp.endDate || '';
    const isCurrent = exp.isCurrent || false;
    const employmentType = exp.employmentType || '정규직';
    const div = document.createElement('div');
    div.className = 'edit-item';
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <div class="edit-item-header">
            <span class="edit-item-title">${exp.company || '새 경력'}</span>
            <div style="display: flex; gap: 5px;">
                <button type="button" class="move-btn" onclick="moveExperience(${index}, 'up')" title="위로" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                <button type="button" class="move-btn" onclick="moveExperience(${index}, 'down')" title="아래로" ${index === editData.experiences.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                <button type="button" class="delete-btn" onclick="deleteExperience(${index})">삭제</button>
            </div>
        </div>
        <div class="form-group">
            <label>활성화:</label>
            <input type="checkbox" class="item-enabled" ${exp.enabled !== false ? 'checked' : ''} data-index="${index}" data-type="experience">
        </div>
        <div class="form-group">
            <label>입사일:</label>
            <input type="date" class="experience-start-date" value="${startDate}" data-index="${index}" onchange="calculateDuration(${index})">
        </div>
        <div class="form-group">
            <label>퇴사일:</label>
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="date" class="experience-end-date" value="${endDate}" data-index="${index}" onchange="calculateDuration(${index})" ${isCurrent ? 'disabled' : ''} style="flex: 1;">
                <label style="display: flex; align-items: center; gap: 5px; white-space: nowrap;">
                    <input type="checkbox" class="experience-is-current" ${isCurrent ? 'checked' : ''} data-index="${index}" onchange="toggleCurrentEmployment(${index})">
                    재직중
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>재직 기간 (자동 계산):</label>
            <input type="text" class="experience-duration" value="${exp.duration || ''}" data-index="${index}" readonly style="background-color: #f0f0f0;">
        </div>
        <div class="form-group">
            <label>고용형태:</label>
            <select class="experience-employment-type" data-index="${index}">
                <option value="정규직" ${employmentType === '정규직' ? 'selected' : ''}>정규직</option>
                <option value="계약직" ${employmentType === '계약직' ? 'selected' : ''}>계약직</option>
                <option value="프리랜서" ${employmentType === '프리랜서' ? 'selected' : ''}>프리랜서</option>
                <option value="기타" ${employmentType === '기타' ? 'selected' : ''}>기타</option>
            </select>
        </div>
        <div class="form-group">
            <label>회사명:</label>
            <input type="text" class="experience-company" value="${exp.company || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>역할:</label>
            <input type="text" class="experience-role" value="${exp.role || ''}" data-index="${index}" placeholder="예: 백엔드 개발자">
        </div>
        <div class="form-group">
            <label>설명:</label>
            <textarea class="experience-description-textarea experience-description" data-index="${index}" rows="6">${exp.description || ''}</textarea>
        </div>
        <div class="form-group">
            <label>스킬 키워드 (쉼표로 구분):</label>
            <input type="text" class="experience-skills" value="${(exp.skills || []).join(', ')}" data-index="${index}" placeholder="예: Kotlin, Java, Spring Boot">
        </div>
    `;
    return div;
}

// PROJECT 편집 렌더링
function renderProjectEdit() {
    const container = document.getElementById('projectEditContainer');
    container.innerHTML = '';
    
    editData.projects.forEach((proj, index) => {
        const projDiv = createProjectEditItem(proj, index);
        container.appendChild(projDiv);
    });
}

function createProjectEditItem(proj, index) {
    const div = document.createElement('div');
    div.className = 'edit-item';
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <div class="edit-item-header">
            <span class="edit-item-title">${proj.name || '새 프로젝트'}</span>
            <div style="display: flex; gap: 5px;">
                <button type="button" class="move-btn" onclick="moveProject(${index}, 'up')" title="위로" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                <button type="button" class="move-btn" onclick="moveProject(${index}, 'down')" title="아래로" ${index === editData.projects.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                <button type="button" class="delete-btn" onclick="deleteProject(${index})">삭제</button>
            </div>
        </div>
        <div class="form-group">
            <label>활성화:</label>
            <input type="checkbox" class="item-enabled" ${proj.enabled !== false ? 'checked' : ''} data-index="${index}" data-type="project">
        </div>
        <div class="form-group">
            <label>프로젝트명:</label>
            <input type="text" class="project-name" value="${proj.name || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>고객사 (선택사항):</label>
            <input type="text" class="project-client" value="${proj.client || ''}" data-index="${index}" placeholder="예: 코웨이, 티지소프트">
        </div>
        <div class="form-group">
            <label>기간:</label>
            <input type="text" class="project-period" value="${proj.period || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>설명:</label>
            <textarea class="project-description" data-index="${index}" rows="6">${proj.description || ''}</textarea>
        </div>
        <div class="form-group">
            <label>기술 스택 (쉼표로 구분):</label>
            <input type="text" class="project-skills" value="${(proj.skills || []).join(', ')}" data-index="${index}" placeholder="예: Spring Boot, React.js, MySQL">
        </div>
        <div class="form-group">
            <label>링크:</label>
            <div class="project-links-edit" id="projectLinks${index}">
                ${(proj.links || []).map((link, linkIndex) => `
                    <div class="link-item">
                        <input type="text" class="link-label" value="${link.label || ''}" placeholder="링크 라벨" data-index="${index}" data-link-index="${linkIndex}">
                        <input type="url" class="link-url" value="${link.url || ''}" placeholder="URL" data-index="${index}" data-link-index="${linkIndex}">
                        <button type="button" class="delete-btn" onclick="removeProjectLink(${index}, ${linkIndex})">삭제</button>
                    </div>
                `).join('')}
            </div>
            <button type="button" class="add-link-btn" onclick="addProjectLink(${index})">+ 링크 추가</button>
        </div>
    `;
    return div;
}

// OPEN SOURCE 편집 렌더링
function renderOpensourceEdit() {
    const container = document.getElementById('opensourceEditContainer');
    container.innerHTML = '';
    
    editData.opensources.forEach((os, index) => {
        const osDiv = createOpensourceEditItem(os, index);
        container.appendChild(osDiv);
    });
}

function createOpensourceEditItem(os, index) {
    const div = document.createElement('div');
    div.className = 'edit-item';
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <div class="edit-item-header">
            <span class="edit-item-title">${os.name || '새 오픈소스'}</span>
            <div style="display: flex; gap: 5px;">
                <button type="button" class="move-btn" onclick="moveOpensource(${index}, 'up')" title="위로" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                <button type="button" class="move-btn" onclick="moveOpensource(${index}, 'down')" title="아래로" ${index === editData.opensources.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                <button type="button" class="delete-btn" onclick="deleteOpensource(${index})">삭제</button>
            </div>
        </div>
        <div class="form-group">
            <label>활성화:</label>
            <input type="checkbox" class="item-enabled" ${os.enabled !== false ? 'checked' : ''} data-index="${index}" data-type="opensource">
        </div>
        <div class="form-group">
            <label>이름:</label>
            <input type="text" class="opensource-name" value="${os.name || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>설명:</label>
            <textarea class="opensource-description" data-index="${index}" rows="6">${os.description || ''}</textarea>
        </div>
        <div class="form-group">
            <label>링크:</label>
            <div class="opensource-links-edit" id="opensourceLinks${index}">
                ${(os.links || []).map((link, linkIndex) => `
                    <div class="link-item">
                        <input type="text" class="link-label" value="${link.label || ''}" placeholder="링크 라벨" data-index="${index}" data-link-index="${linkIndex}">
                        <input type="url" class="link-url" value="${link.url || ''}" placeholder="URL" data-index="${index}" data-link-index="${linkIndex}">
                        <button type="button" class="delete-btn" onclick="removeOpensourceLink(${index}, ${linkIndex})">삭제</button>
                    </div>
                `).join('')}
            </div>
            <button type="button" class="add-link-btn" onclick="addOpensourceLink(${index})">+ 링크 추가</button>
        </div>
    `;
    return div;
}

// EDUCATION 편집 렌더링
function renderEducationEdit() {
    const container = document.getElementById('educationEditContainer');
    container.innerHTML = '';
    
    editData.educations.forEach((edu, index) => {
        const eduDiv = createEducationEditItem(edu, index);
        container.appendChild(eduDiv);
    });
}

function createEducationEditItem(edu, index) {
    const div = document.createElement('div');
    div.className = 'edit-item';
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <div class="edit-item-header">
            <span class="edit-item-title">${edu.school || '새 학력'}</span>
            <div style="display: flex; gap: 5px;">
                <button type="button" class="move-btn" onclick="moveEducation(${index}, 'up')" title="위로" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                <button type="button" class="move-btn" onclick="moveEducation(${index}, 'down')" title="아래로" ${index === editData.educations.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                <button type="button" class="delete-btn" onclick="deleteEducation(${index})">삭제</button>
            </div>
        </div>
        <div class="form-group">
            <label>활성화:</label>
            <input type="checkbox" class="item-enabled" ${edu.enabled !== false ? 'checked' : ''} data-index="${index}" data-type="education">
        </div>
        <div class="form-group">
            <label>기간:</label>
            <input type="text" class="education-period" value="${edu.period || ''}" data-index="${index}" placeholder="예: 2010. 03 ~ 2016. 08">
        </div>
        <div class="form-group">
            <label>학교명:</label>
            <input type="text" class="education-school" value="${edu.school || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>전공:</label>
            <input type="text" class="education-major" value="${edu.major || ''}" data-index="${index}" placeholder="예: 컴퓨터공학 / 정보시스템공학 복수 전공 학사 졸업">
        </div>
    `;
    return div;
}

// ETC 편집 렌더링
function renderEtcEdit() {
    const container = document.getElementById('etcEditContainer');
    container.innerHTML = '';
    
    editData.etcs.forEach((etc, index) => {
        const etcDiv = createEtcEditItem(etc, index);
        container.appendChild(etcDiv);
    });
}

function createEtcEditItem(etc, index) {
    const div = document.createElement('div');
    div.className = 'edit-item';
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <div class="edit-item-header">
            <span class="edit-item-title">${etc.title || '새 항목'}</span>
            <div style="display: flex; gap: 5px;">
                <button type="button" class="move-btn" onclick="moveEtc(${index}, 'up')" title="위로" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                <button type="button" class="move-btn" onclick="moveEtc(${index}, 'down')" title="아래로" ${index === editData.etcs.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                <button type="button" class="delete-btn" onclick="deleteEtc(${index})">삭제</button>
            </div>
        </div>
        <div class="form-group">
            <label>활성화:</label>
            <input type="checkbox" class="item-enabled" ${etc.enabled !== false ? 'checked' : ''} data-index="${index}" data-type="etc">
        </div>
        <div class="form-group">
            <label>기간:</label>
            <input type="text" class="etc-period" value="${etc.period || ''}" data-index="${index}" placeholder="예: 2025. 09 ~ 2025. 12">
        </div>
        <div class="form-group">
            <label>제목:</label>
            <input type="text" class="etc-title" value="${etc.title || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>역할:</label>
            <input type="text" class="etc-role" value="${etc.role || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>설명:</label>
            <textarea class="etc-description" data-index="${index}" rows="4">${etc.description || ''}</textarea>
        </div>
    `;
    return div;
}

// ARTICLE 편집 렌더링
function renderArticleEdit() {
    const container = document.getElementById('articleEditContainer');
    container.innerHTML = '';
    
    editData.articles.forEach((article, index) => {
        const articleDiv = createArticleEditItem(article, index);
        container.appendChild(articleDiv);
    });
}

function createArticleEditItem(article, index) {
    const div = document.createElement('div');
    div.className = 'edit-item';
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <div class="edit-item-header">
            <span class="edit-item-title">${article.title || '새 아티클'}</span>
            <div style="display: flex; gap: 5px;">
                <button type="button" class="move-btn" onclick="moveArticle(${index}, 'up')" title="위로" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                <button type="button" class="move-btn" onclick="moveArticle(${index}, 'down')" title="아래로" ${index === editData.articles.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                <button type="button" class="delete-btn" onclick="deleteArticle(${index})">삭제</button>
            </div>
        </div>
        <div class="form-group">
            <label>활성화:</label>
            <input type="checkbox" class="item-enabled" ${article.enabled !== false ? 'checked' : ''} data-index="${index}" data-type="article">
        </div>
        <div class="form-group">
            <label>제목:</label>
            <input type="text" class="article-title" value="${article.title || ''}" data-index="${index}">
        </div>
        <div class="form-group">
            <label>URL:</label>
            <input type="url" class="article-url" value="${article.url || ''}" data-index="${index}">
        </div>
    `;
    return div;
}

// SKILL 관련 함수들
function addSkillCategory() {
    editData.skills.push({
        category: 'New Category',
        items: [],
        enabled: true
    });
    renderSkillEdit();
}

function deleteSkillCategory(index) {
    editData.skills.splice(index, 1);
    renderSkillEdit();
}

function addSkillItem(categoryIndex) {
    const input = document.querySelector(`.new-skill-input[data-index="${categoryIndex}"]`);
    const value = input.value.trim();
    if (value) {
        editData.skills[categoryIndex].items.push(value);
        input.value = '';
        renderSkillEdit();
    }
}

function removeSkillItem(categoryIndex, itemIndex) {
    editData.skills[categoryIndex].items.splice(itemIndex, 1);
    renderSkillEdit();
}

// EXPERIENCE 관련 함수들
function addExperience() {
    editData.experiences.push({
        startDate: '',
        endDate: '',
        isCurrent: false,
        employmentType: '정규직',
        period: '',
        company: '',
        duration: '',
        role: '',
        description: '',
        skills: [],
        enabled: true
    });
    renderExperienceEdit();
}

function calculateDuration(index) {
    const startDateInput = document.querySelector(`.experience-start-date[data-index="${index}"]`);
    const endDateInput = document.querySelector(`.experience-end-date[data-index="${index}"]`);
    const isCurrentCheckbox = document.querySelector(`.experience-is-current[data-index="${index}"]`);
    const durationInput = document.querySelector(`.experience-duration[data-index="${index}"]`);
    
    const startDate = startDateInput.value;
    const isCurrent = isCurrentCheckbox.checked;
    const endDate = isCurrent ? new Date().toISOString().split('T')[0] : endDateInput.value;
    
    if (!startDate || !endDate) {
        durationInput.value = '';
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
        durationInput.value = '날짜 오류';
        return;
    }
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // 일자도 고려
    if (end.getDate() < start.getDate()) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
    }
    
    let durationText = '';
    if (years > 0) {
        durationText += `${years}년 `;
    }
    if (months > 0) {
        durationText += `${months}개월`;
    }
    if (years === 0 && months === 0) {
        const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        durationText = `${days}일`;
    }
    
    durationInput.value = durationText.trim();
    
    // period 필드도 업데이트
    const periodInput = document.querySelector(`.experience-period[data-index="${index}"]`);
    if (periodInput) {
        const startFormatted = formatDateForDisplay(startDate);
        const endFormatted = isCurrent ? '현재' : formatDateForDisplay(endDate);
        periodInput.value = `${startFormatted} ~ ${endFormatted}`;
    }
}

function formatDateForDisplay(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}. ${month}`;
}

function toggleCurrentEmployment(index) {
    const checkbox = document.querySelector(`.experience-is-current[data-index="${index}"]`);
    const endDateInput = document.querySelector(`.experience-end-date[data-index="${index}"]`);
    
    if (checkbox.checked) {
        endDateInput.disabled = true;
        endDateInput.value = '';
    } else {
        endDateInput.disabled = false;
    }
    calculateDuration(index);
}

function moveExperience(index, direction) {
    if (direction === 'up' && index > 0) {
        [editData.experiences[index - 1], editData.experiences[index]] = [editData.experiences[index], editData.experiences[index - 1]];
        renderExperienceEdit();
    } else if (direction === 'down' && index < editData.experiences.length - 1) {
        [editData.experiences[index], editData.experiences[index + 1]] = [editData.experiences[index + 1], editData.experiences[index]];
        renderExperienceEdit();
    }
}

function deleteExperience(index) {
    editData.experiences.splice(index, 1);
    renderExperienceEdit();
}

// PROJECT 관련 함수들
function addProject() {
    editData.projects.push({
        name: '',
        period: '',
        description: '',
        skills: [],
        links: [],
        enabled: true
    });
    renderProjectEdit();
}

function moveProject(index, direction) {
    if (direction === 'up' && index > 0) {
        [editData.projects[index - 1], editData.projects[index]] = [editData.projects[index], editData.projects[index - 1]];
        renderProjectEdit();
    } else if (direction === 'down' && index < editData.projects.length - 1) {
        [editData.projects[index], editData.projects[index + 1]] = [editData.projects[index + 1], editData.projects[index]];
        renderProjectEdit();
    }
}

function deleteProject(index) {
    editData.projects.splice(index, 1);
    renderProjectEdit();
}

function addProjectLink(projectIndex) {
    if (!editData.projects[projectIndex].links) {
        editData.projects[projectIndex].links = [];
    }
    editData.projects[projectIndex].links.push({ label: '', url: '' });
    renderProjectEdit();
}

function removeProjectLink(projectIndex, linkIndex) {
    editData.projects[projectIndex].links.splice(linkIndex, 1);
    renderProjectEdit();
}

// OPEN SOURCE 관련 함수들
function addOpensource() {
    editData.opensources.push({
        name: '',
        description: '',
        links: [],
        enabled: true
    });
    renderOpensourceEdit();
}

function moveOpensource(index, direction) {
    if (direction === 'up' && index > 0) {
        [editData.opensources[index - 1], editData.opensources[index]] = [editData.opensources[index], editData.opensources[index - 1]];
        renderOpensourceEdit();
    } else if (direction === 'down' && index < editData.opensources.length - 1) {
        [editData.opensources[index], editData.opensources[index + 1]] = [editData.opensources[index + 1], editData.opensources[index]];
        renderOpensourceEdit();
    }
}

function deleteOpensource(index) {
    editData.opensources.splice(index, 1);
    renderOpensourceEdit();
}

function addOpensourceLink(osIndex) {
    if (!editData.opensources[osIndex].links) {
        editData.opensources[osIndex].links = [];
    }
    editData.opensources[osIndex].links.push({ label: '', url: '' });
    renderOpensourceEdit();
}

function removeOpensourceLink(osIndex, linkIndex) {
    editData.opensources[osIndex].links.splice(linkIndex, 1);
    renderOpensourceEdit();
}

// EDUCATION 관련 함수들
function addEducation() {
    editData.educations.push({
        period: '',
        school: '',
        major: '',
        enabled: true
    });
    renderEducationEdit();
}

function moveEducation(index, direction) {
    if (direction === 'up' && index > 0) {
        [editData.educations[index - 1], editData.educations[index]] = [editData.educations[index], editData.educations[index - 1]];
        renderEducationEdit();
    } else if (direction === 'down' && index < editData.educations.length - 1) {
        [editData.educations[index], editData.educations[index + 1]] = [editData.educations[index + 1], editData.educations[index]];
        renderEducationEdit();
    }
}

function deleteEducation(index) {
    editData.educations.splice(index, 1);
    renderEducationEdit();
}

// ETC 관련 함수들
function addEtc() {
    editData.etcs.push({
        period: '',
        title: '',
        role: '',
        description: '',
        enabled: true
    });
    renderEtcEdit();
}

function moveEtc(index, direction) {
    if (direction === 'up' && index > 0) {
        [editData.etcs[index - 1], editData.etcs[index]] = [editData.etcs[index], editData.etcs[index - 1]];
        renderEtcEdit();
    } else if (direction === 'down' && index < editData.etcs.length - 1) {
        [editData.etcs[index], editData.etcs[index + 1]] = [editData.etcs[index + 1], editData.etcs[index]];
        renderEtcEdit();
    }
}

function deleteEtc(index) {
    editData.etcs.splice(index, 1);
    renderEtcEdit();
}

// ARTICLE 관련 함수들
function addArticle() {
    editData.articles.push({
        title: '',
        url: '',
        enabled: true
    });
    renderArticleEdit();
}

function moveArticle(index, direction) {
    if (direction === 'up' && index > 0) {
        [editData.articles[index - 1], editData.articles[index]] = [editData.articles[index], editData.articles[index - 1]];
        renderArticleEdit();
    } else if (direction === 'down' && index < editData.articles.length - 1) {
        [editData.articles[index], editData.articles[index + 1]] = [editData.articles[index + 1], editData.articles[index]];
        renderArticleEdit();
    }
}

function deleteArticle(index) {
    editData.articles.splice(index, 1);
    renderArticleEdit();
}

// 저장 함수
function saveData() {
    // 프로필 정보
    const profileImageValue = document.getElementById('editProfileImage').value;
    if (profileImageValue) {
        editData.profile.image = profileImageValue;
        editData.profile.imageCropSize = currentCropSize;
    }
    editData.profile.name = document.getElementById('editProfileName').value;
    editData.profile.email = document.getElementById('editProfileEmail').value;
    editData.profile.phone = document.getElementById('editProfilePhone').value;
    editData.profile.links.line = document.getElementById('editProfileLine').value;
    editData.profile.links.github = document.getElementById('editProfileGithub').value;
    editData.profile.links.discord = document.getElementById('editProfileDiscord').value;
    editData.profile.links.youtube = document.getElementById('editProfileYoutube').value;
    editData.profile.links.facebook = document.getElementById('editProfileFacebook').value;
    editData.profile.links.instagram = document.getElementById('editProfileInstagram').value;
    editData.profile.enabled = document.getElementById('editProfileEnabled').checked;

    // INTRODUCE
    const introduceEditor = document.getElementById('editIntroduce');
    editData.introduce.content = introduceEditor ? introduceEditor.innerHTML : '';
    editData.enabled.introduce = document.getElementById('editIntroduceEnabled').checked;

    // SKILL
    document.querySelectorAll('.skill-category-name').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.skills[index].category = input.value;
    });
    document.querySelectorAll('.skill-enabled').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.skills[index].enabled = checkbox.checked;
    });

    // EXPERIENCE
    document.querySelectorAll('.experience-start-date').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.experiences[index].startDate = input.value;
    });
    document.querySelectorAll('.experience-end-date').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.experiences[index].endDate = input.value;
    });
    document.querySelectorAll('.experience-is-current').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.experiences[index].isCurrent = checkbox.checked;
    });
    document.querySelectorAll('.experience-employment-type').forEach(select => {
        const index = parseInt(select.dataset.index);
        editData.experiences[index].employmentType = select.value;
    });
    document.querySelectorAll('.experience-period').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.experiences[index].period = input.value;
    });
    document.querySelectorAll('.experience-company').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.experiences[index].company = input.value;
    });
    document.querySelectorAll('.experience-duration').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.experiences[index].duration = input.value;
    });
    document.querySelectorAll('.experience-role').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.experiences[index].role = input.value;
    });
    document.querySelectorAll('.experience-description').forEach(textarea => {
        const index = parseInt(textarea.dataset.index);
        editData.experiences[index].description = textarea.value;
    });
    document.querySelectorAll('.experience-skills').forEach(input => {
        const index = parseInt(input.dataset.index);
        const skillsStr = input.value;
        editData.experiences[index].skills = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(s => s) : [];
    });
    document.querySelectorAll('.item-enabled[data-type="experience"]').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.experiences[index].enabled = checkbox.checked;
    });

    // PROJECT
    document.querySelectorAll('.project-name').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.projects[index].name = input.value;
    });
    document.querySelectorAll('.project-client').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.projects[index].client = input.value;
    });
    document.querySelectorAll('.project-period').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.projects[index].period = input.value;
    });
    document.querySelectorAll('.project-description').forEach(textarea => {
        const index = parseInt(textarea.dataset.index);
        editData.projects[index].description = textarea.value;
    });
    document.querySelectorAll('.project-skills').forEach(input => {
        const index = parseInt(input.dataset.index);
        const skillsStr = input.value;
        editData.projects[index].skills = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(s => s) : [];
    });
    document.querySelectorAll('.project-links-edit .link-item').forEach(linkItem => {
        const projectIndex = parseInt(linkItem.querySelector('.link-label').dataset.index);
        const linkIndex = parseInt(linkItem.querySelector('.link-label').dataset.linkIndex);
        const label = linkItem.querySelector('.link-label').value;
        const url = linkItem.querySelector('.link-url').value;
        if (!editData.projects[projectIndex].links) {
            editData.projects[projectIndex].links = [];
        }
        if (editData.projects[projectIndex].links[linkIndex]) {
            editData.projects[projectIndex].links[linkIndex] = { label, url };
        }
    });
    document.querySelectorAll('.item-enabled[data-type="project"]').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.projects[index].enabled = checkbox.checked;
    });

    // OPEN SOURCE
    document.querySelectorAll('.opensource-name').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.opensources[index].name = input.value;
    });
    document.querySelectorAll('.opensource-description').forEach(textarea => {
        const index = parseInt(textarea.dataset.index);
        editData.opensources[index].description = textarea.value;
    });
    document.querySelectorAll('.opensource-links-edit .link-item').forEach(linkItem => {
        const osIndex = parseInt(linkItem.querySelector('.link-label').dataset.index);
        const linkIndex = parseInt(linkItem.querySelector('.link-label').dataset.linkIndex);
        const label = linkItem.querySelector('.link-label').value;
        const url = linkItem.querySelector('.link-url').value;
        if (!editData.opensources[osIndex].links) {
            editData.opensources[osIndex].links = [];
        }
        if (editData.opensources[osIndex].links[linkIndex]) {
            editData.opensources[osIndex].links[linkIndex] = { label, url };
        }
    });
    document.querySelectorAll('.item-enabled[data-type="opensource"]').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.opensources[index].enabled = checkbox.checked;
    });

    // EDUCATION
    document.querySelectorAll('.education-period').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.educations[index].period = input.value;
    });
    document.querySelectorAll('.education-school').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.educations[index].school = input.value;
    });
    document.querySelectorAll('.education-major').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.educations[index].major = input.value;
    });
    document.querySelectorAll('.item-enabled[data-type="education"]').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.educations[index].enabled = checkbox.checked;
    });

    // ETC
    document.querySelectorAll('.etc-period').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.etcs[index].period = input.value;
    });
    document.querySelectorAll('.etc-title').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.etcs[index].title = input.value;
    });
    document.querySelectorAll('.etc-role').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.etcs[index].role = input.value;
    });
    document.querySelectorAll('.etc-description').forEach(textarea => {
        const index = parseInt(textarea.dataset.index);
        editData.etcs[index].description = textarea.value;
    });
    document.querySelectorAll('.item-enabled[data-type="etc"]').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.etcs[index].enabled = checkbox.checked;
    });

    // ARTICLE
    document.querySelectorAll('.article-title').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.articles[index].title = input.value;
    });
    document.querySelectorAll('.article-url').forEach(input => {
        const index = parseInt(input.dataset.index);
        editData.articles[index].url = input.value;
    });
    document.querySelectorAll('.item-enabled[data-type="article"]').forEach(checkbox => {
        const index = parseInt(checkbox.dataset.index);
        editData.articles[index].enabled = checkbox.checked;
    });

    // 섹션 활성화 상태
    editData.enabled.skill = document.getElementById('editSkillEnabled').checked;
    editData.enabled.experience = document.getElementById('editExperienceEnabled').checked;
    editData.enabled.project = document.getElementById('editProjectEnabled').checked;
    editData.enabled.opensource = document.getElementById('editOpensourceEnabled').checked;
    editData.enabled.education = document.getElementById('editEducationEnabled').checked;
    editData.enabled.etc = document.getElementById('editEtcEnabled').checked;
    editData.enabled.article = document.getElementById('editArticleEnabled').checked;

    // 섹션 순서 설정
    editData.sectionOrder = {
        experience: parseInt(document.getElementById('sectionOrderExperience').value) || 1,
        project: parseInt(document.getElementById('sectionOrderProject').value) || 2,
        opensource: parseInt(document.getElementById('sectionOrderOpensource').value) || 3,
        education: parseInt(document.getElementById('sectionOrderEducation').value) || 4,
        etc: parseInt(document.getElementById('sectionOrderEtc').value) || 5,
        article: parseInt(document.getElementById('sectionOrderArticle').value) || 6
    };

    // 저장
    ProfileData.save(editData);
    alert('저장되었습니다!');
    window.location.href = 'index.html';
}

// 이벤트 리스너
document.getElementById('saveBtn').addEventListener('click', saveData);
document.getElementById('cancelBtn').addEventListener('click', function() {
    if (confirm('편집을 취소하시겠습니까?')) {
        window.location.href = 'index.html';
    }
});

// SKILL 카테고리 추가 버튼
document.getElementById('addSkillBtn').addEventListener('click', addSkillCategory);

// EXPERIENCE 추가 버튼
document.getElementById('addExperienceBtn').addEventListener('click', addExperience);

// PROJECT 추가 버튼
document.getElementById('addProjectBtn').addEventListener('click', addProject);

// OPEN SOURCE 추가 버튼
document.getElementById('addOpensourceBtn').addEventListener('click', addOpensource);

// EDUCATION 추가 버튼
document.getElementById('addEducationBtn').addEventListener('click', addEducation);

// ETC 추가 버튼
document.getElementById('addEtcBtn').addEventListener('click', addEtc);

// ARTICLE 추가 버튼
document.getElementById('addArticleBtn').addEventListener('click', addArticle);

// SKILL 입력 엔터 키 처리
document.addEventListener('keypress', function(e) {
    if (e.target.classList.contains('new-skill-input') && e.key === 'Enter') {
        const index = parseInt(e.target.dataset.index);
        addSkillItem(index);
    }
});

// 이미지 파일 업로드 및 크롭 처리 (이미 위에 정의됨)

// 이미지 파일 업로드 및 크롭 처리
let currentCropImage = null;
let currentCropSize = 150;
let cropOverlayPosition = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };

document.addEventListener('DOMContentLoaded', function() {
    loadEditData();
    
    // 이미지 파일 업로드 이벤트 리스너
    const imageFileInput = document.getElementById('editProfileImageFile');
    if (imageFileInput) {
        imageFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentCropImage = event.target.result;
                    showImageCropPreview(currentCropImage);
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function showImageCropPreview(imageSrc) {
    const container = document.getElementById('imageCropContainer');
    const previewImg = document.getElementById('cropPreviewImage');
    const overlay = document.getElementById('cropOverlay');
    const slider = document.getElementById('cropSizeSlider');
    
    if (!container || !previewImg || !overlay || !slider) return;
    
    container.style.display = 'block';
    previewImg.src = imageSrc;
    
    // 초기 위치 리셋
    cropOverlayPosition = { x: 0, y: 0 };
    
    previewImg.onload = function() {
        updateCropOverlay();
        setupCropDrag();
    };
    
    slider.oninput = function() {
        currentCropSize = parseInt(this.value);
        const sizeValue = document.getElementById('cropSizeValue');
        if (sizeValue) {
            sizeValue.textContent = currentCropSize + 'px';
        }
        updateCropOverlay();
    };
}

function setupCropDrag() {
    const overlay = document.getElementById('cropOverlay');
    const previewWrapper = document.querySelector('.crop-preview-wrapper');
    
    if (!overlay || !previewWrapper) return;
    
    // 마우스 다운 이벤트
    overlay.addEventListener('mousedown', function(e) {
        isDragging = true;
        const rect = previewWrapper.getBoundingClientRect();
        dragStart.x = e.clientX - rect.left - cropOverlayPosition.x;
        dragStart.y = e.clientY - rect.top - cropOverlayPosition.y;
        e.preventDefault();
    });
    
    // 마우스 이동 이벤트
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const previewImg = document.getElementById('cropPreviewImage');
        const previewWrapper = document.querySelector('.crop-preview-wrapper');
        
        if (!previewImg || !previewWrapper) return;
        
        const rect = previewWrapper.getBoundingClientRect();
        const imgWidth = previewImg.offsetWidth || previewImg.naturalWidth;
        const imgHeight = previewImg.offsetHeight || previewImg.naturalHeight;
        const size = currentCropSize;
        
        // 새로운 위치 계산
        let newX = e.clientX - rect.left - dragStart.x;
        let newY = e.clientY - rect.top - dragStart.y;
        
        // 경계 체크
        newX = Math.max(0, Math.min(newX, imgWidth - size));
        newY = Math.max(0, Math.min(newY, imgHeight - size));
        
        cropOverlayPosition.x = newX;
        cropOverlayPosition.y = newY;
        
        updateCropOverlay();
    });
    
    // 마우스 업 이벤트
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // 터치 이벤트 지원
    overlay.addEventListener('touchstart', function(e) {
        isDragging = true;
        const rect = previewWrapper.getBoundingClientRect();
        const touch = e.touches[0];
        dragStart.x = touch.clientX - rect.left - cropOverlayPosition.x;
        dragStart.y = touch.clientY - rect.top - cropOverlayPosition.y;
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const previewImg = document.getElementById('cropPreviewImage');
        const previewWrapper = document.querySelector('.crop-preview-wrapper');
        
        if (!previewImg || !previewWrapper) return;
        
        const rect = previewWrapper.getBoundingClientRect();
        const touch = e.touches[0];
        const imgWidth = previewImg.offsetWidth || previewImg.naturalWidth;
        const imgHeight = previewImg.offsetHeight || previewImg.naturalHeight;
        const size = currentCropSize;
        
        let newX = touch.clientX - rect.left - dragStart.x;
        let newY = touch.clientY - rect.top - dragStart.y;
        
        newX = Math.max(0, Math.min(newX, imgWidth - size));
        newY = Math.max(0, Math.min(newY, imgHeight - size));
        
        cropOverlayPosition.x = newX;
        cropOverlayPosition.y = newY;
        
        updateCropOverlay();
        e.preventDefault();
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
}

function updateCropOverlay() {
    const previewImg = document.getElementById('cropPreviewImage');
    const overlay = document.getElementById('cropOverlay');
    
    if (!previewImg || !overlay || !previewImg.complete) return;
    
    // 이미지가 로드될 때까지 대기
    if (previewImg.naturalWidth === 0) {
        setTimeout(updateCropOverlay, 100);
        return;
    }
    
    const imgWidth = previewImg.offsetWidth || previewImg.naturalWidth;
    const imgHeight = previewImg.offsetHeight || previewImg.naturalHeight;
    const size = currentCropSize;
    
    // 초기 위치 설정 (중앙)
    if (cropOverlayPosition.x === 0 && cropOverlayPosition.y === 0) {
        cropOverlayPosition.x = (imgWidth - size) / 2;
        cropOverlayPosition.y = (imgHeight - size) / 2;
    }
    
    // 경계 체크
    cropOverlayPosition.x = Math.max(0, Math.min(cropOverlayPosition.x, imgWidth - size));
    cropOverlayPosition.y = Math.max(0, Math.min(cropOverlayPosition.y, imgHeight - size));
    
    overlay.style.width = size + 'px';
    overlay.style.height = size + 'px';
    overlay.style.left = cropOverlayPosition.x + 'px';
    overlay.style.top = cropOverlayPosition.y + 'px';
}

function applyImageCrop() {
    if (!currentCropImage) return;
    
    const previewImg = document.getElementById('cropPreviewImage');
    const overlay = document.getElementById('cropOverlay');
    
    if (!previewImg || !overlay) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = currentCropSize;
    
    canvas.width = size;
    canvas.height = size;
    
    const img = new Image();
    img.onload = function() {
        const imgWidth = previewImg.offsetWidth || previewImg.naturalWidth;
        const imgHeight = previewImg.offsetHeight || previewImg.naturalHeight;
        const overlayLeft = overlay.offsetLeft;
        const overlayTop = overlay.offsetTop;
        
        const scaleX = img.width / imgWidth;
        const scaleY = img.height / imgHeight;
        
        const sx = overlayLeft * scaleX;
        const sy = overlayTop * scaleY;
        const sWidth = size * scaleX;
        const sHeight = size * scaleY;
        
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);
        
        const croppedImage = canvas.toDataURL('image/png');
        document.getElementById('editProfileImage').value = croppedImage;
        
        // 미리보기 업데이트
        const container = document.getElementById('imageCropContainer');
        if (container) {
            container.style.display = 'none';
        }
        
        alert('이미지가 크롭되어 적용되었습니다.');
    };
    img.src = currentCropImage;
}

// 리치 텍스트 편집 함수들
function formatText(command, value) {
    document.execCommand(command, false, value);
    const editor = document.getElementById('editIntroduce');
    if (editor) {
        editor.focus();
    }
}

function insertSpecialText(type) {
    const editor = document.getElementById('editIntroduce');
    if (!editor) return;
    
    editor.focus();
    
    if (type === 'date') {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const daysSince = Math.floor((today - new Date('2025-01-01')) / (1000 * 60 * 60 * 24));
        const dateText = `Latest Updated ${year}. ${month}. ${day} (D+${daysSince})`;
        document.execCommand('insertText', false, dateText);
    } else if (type === 'signature') {
        const signature = document.createElement('div');
        signature.style.cssText = 'text-align: right; font-family: cursive; margin-top: 20px;';
        signature.textContent = 'Lee HwaYoung';
        document.execCommand('insertHTML', false, signature.outerHTML);
    }
}

