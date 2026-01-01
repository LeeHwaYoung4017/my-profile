// 데이터 로드 및 화면 렌더링
const ProfileData = {
    load: function() {
        const saved = localStorage.getItem('profileData');
        if (saved) {
            return JSON.parse(saved);
        }
        return this.getDefaultData();
    },

    save: function(data) {
        localStorage.setItem('profileData', JSON.stringify(data));
    },

    getDefaultData: function() {
        return {
            profile: {
                image: '',
                name: '이화영',
                email: 'ghkdud7913@naver.com',
                phone: '010-3360-6699',
                links: {
                    line: '',
                    github: '',
                    discord: '',
                    youtube: '',
                    facebook: '',
                    instagram: ''
                },
                enabled: true
            },
            introduce: {
                content: '새로운 도전에 긍정적인 개발자입니다. 7년 이상의 SI 개발 경험을 바탕으로 다양한 프로젝트에서 백엔드 및 웹 개발을 담당해왔습니다. Spring Framework, 전자정부 프레임워크 기반의 시스템 개발과 유지보수에 전문성을 가지고 있으며, 최근에는 React.js와 Spring Boot를 활용한 프론트-백엔드 통합 개발 경험도 쌓아왔습니다.',
                enabled: true
            },
            skills: [
                {
                    category: 'Languages',
                    items: ['Java', 'JavaScript', 'JSP', 'PHP', 'Python', 'HTML/CSS', 'Lua Script'],
                    enabled: true
                },
                {
                    category: 'Frameworks & Libraries',
                    items: ['Spring', 'Spring Boot', 'Spring Framework', 'React.js', 'React Native', 'Node.js', 'jQuery', 'Thymeleaf', 'MyBatis', 'Chart.js', 'Highcharts.js'],
                    enabled: true
                },
                {
                    category: 'Infrastructure & Databases',
                    items: ['Linux', 'Windows', 'MySQL', 'MariaDB', 'MSSQL', 'Oracle', 'PostgreSQL', 'MongoDB', 'Redis', 'DBMS', 'AWS'],
                    enabled: true
                },
                {
                    category: 'Tools & IDEs',
                    items: ['Git', 'Eclipse', 'IntelliJ IDEA', '전자정부표준프레임워크'],
                    enabled: true
                },
                {
                    category: 'Skills',
                    items: ['SI개발', 'HTTP', '서버관리', '웹개발', '시스템 유지보수', 'SAP RFC (JCO)', 'Redis 대용량 처리'],
                    enabled: true
                }
            ],
            experiences: [
                {
                    startDate: '2025-10-01',
                    endDate: '2025-12-31',
                    isCurrent: false,
                    employmentType: '정규직',
                    period: '2025. 10 ~ 2025. 12',
                    company: '코웨이',
                    duration: '3개월',
                    role: 'Sales팀 과장',
                    description: '* SAP RFC를 이용한 개인정보 고도화 작업\n* 프로젝트 산출물 작성',
                    skills: ['HTTP', 'SI개발', '서버관리', 'SAP RFC', 'JAVA', 'JSP'],
                    enabled: true
                },
                {
                    startDate: '2024-11-01',
                    endDate: '2025-10-31',
                    isCurrent: false,
                    employmentType: '정규직',
                    period: '2024. 11 ~ 2025. 10',
                    company: '티지소프트주식회사',
                    duration: '1년',
                    role: 'SI개발 대리',
                    description: '* 차세대 전력정보시스템 업무개선 개발 및 비계량평가시스템 개발 참여\n* 전자정부 프레임워크 기반 백엔드 로직 설계 및 구현\n* 산출물 문서화 및 테스트 수행',
                    skills: ['SI개발', 'HTTP', '서버관리', '전자정부프레임워크', 'Java', 'MariaDB', 'JavaScript'],
                    enabled: true
                },
                {
                    startDate: '2024-04-01',
                    endDate: '2024-09-30',
                    isCurrent: false,
                    employmentType: '정규직',
                    period: '2024. 04 ~ 2024. 09',
                    company: '주식회사닉스앤블루',
                    duration: '6개월',
                    role: '기술연구소 주임/계장',
                    description: '* 금형 MES 시스템 및 이미지 AI 시스템 개발\n* Spring Boot, React.js 기반의 프론트-백엔드 통합 개발\n* Chart.js를 이용한 데이터 시각화 처리',
                    skills: ['웹개발', 'Spring Boot', 'React.js', 'Chart.js', 'JavaScript', 'PostgreSQL', 'Java'],
                    enabled: true
                },
                {
                    startDate: '2023-10-01',
                    endDate: '2024-04-30',
                    isCurrent: false,
                    employmentType: '정규직',
                    period: '2023. 10 ~ 2024. 04',
                    company: '위캔소프트',
                    duration: '7개월',
                    role: 'SI팀 대리',
                    description: '* 경기신용보증재단 시스템 유지보수 및 신규 개발\n* 보증 관련 웹 화면 및 로직 수정\n* 전문 오류 수정',
                    skills: ['SI개발', 'Java', 'JSP', 'Oracle', 'JavaScript', 'TrustForm', 'Rexpert'],
                    enabled: true
                },
                {
                    startDate: '2021-02-01',
                    endDate: '2023-08-31',
                    isCurrent: false,
                    employmentType: '정규직',
                    period: '2021. 02 ~ 2023. 08',
                    company: '주식회사서광퍼니처',
                    duration: '2년 7개월',
                    role: '온라인팀 사원/팀장',
                    description: '* 자사몰 홈페이지 화면 및 UI 기능 개선\n* Spring 기반 웹 프레임워크 적용 및 유지보수\n* 모바일 웹 환경 최적화 및 브라우저 호환성 개선',
                    skills: ['웹개발', '마케팅', 'Spring', 'JavaScript', 'Oracle', 'Java'],
                    enabled: true
                },
                {
                    startDate: '2020-07-01',
                    endDate: '2020-09-30',
                    isCurrent: false,
                    employmentType: '정규직',
                    period: '2020. 07 ~ 2020. 09',
                    company: '(주)동녘',
                    duration: '3개월',
                    role: '시스템개발팀 사원',
                    description: '* 기상청 취약계층 생활정보 문자 시스템 유지보수\n* 통계 웹 페이지 UI 구현 및 PHP-Java 기반 서버 개발\n* MySQL, MSSQL 기반 데이터 수집-가공-시각화 기능 구현',
                    skills: ['서버관리', 'SI개발', 'Java', 'JSP', 'PHP', 'MySQL', 'MSSQL', 'Spring', 'MyBatis', 'JavaScript'],
                    enabled: true
                },
                {
                    startDate: '2017-08-01',
                    endDate: '2019-09-30',
                    isCurrent: false,
                    employmentType: '정규직',
                    period: '2017. 08 ~ 2019. 09',
                    company: '주식회사파스컴',
                    duration: '2년 2개월',
                    role: '사원',
                    description: '* 음향 관련 웹 시스템 개발 및 유지보수\n* Java, JSP 기반 웹 페이지 개발 및 데이터베이스 연동',
                    skills: ['웹개발', 'Java', 'JSP', 'Oracle', 'JavaScript'],
                    enabled: true
                }
            ],
            projects: [
                {
                    name: '영업정보시스템 고도화 프로젝트',
                    period: '2025. 10 ~ 2025. 12',
                    description: '* SAP RFC를 JCO(Java Connector)를 활용하여 SAP 시스템과 연동 구현\n* 개인정보 처리 프로세스 고도화 및 보안 강화\n* 프로젝트 산출물 작성 및 문서화',
                    skills: ['SAP RFC', 'Java', 'HTTP', 'SI개발', 'JCO'],
                    links: [],
                    enabled: true
                },
                {
                    name: '차세대 전력정보시스템 업무개선 개발',
                    period: '2024. 11 ~ 2025. 06',
                    description: '* 전자정부 표준프레임워크 기반 백엔드 로직 설계 및 구현\n* 비계량평가시스템 개발 참여 및 데이터 처리 로직 구현\n* MyBatis를 활용한 데이터베이스 연동 및 쿼리 최적화',
                    skills: ['전자정부프레임워크', 'Java', 'MariaDB', 'JavaScript', 'MyBatis'],
                    links: [],
                    enabled: true
                },
                {
                    name: '금형분야 카테고리 MES 시스템 개발',
                    period: '2024. 04 ~ 2024. 09',
                    description: '* Spring Boot와 React.js를 활용한 풀스택 웹 애플리케이션 개발\n* RESTful API 설계 및 프론트-백엔드 통합 개발\n* Chart.js를 이용한 실시간 데이터 시각화 및 대시보드 구현',
                    skills: ['Spring Boot', 'React.js', 'Chart.js', 'JavaScript', 'PostgreSQL', 'Java'],
                    links: [],
                    enabled: true
                },
                {
                    name: '보증관련시스템 개발/운영',
                    period: '2023. 10 ~ 2024. 04',
                    description: '* 경기신용보증재단 시스템 유지보수 및 신규 기능 개발\n* 보증 관련 웹 화면 UI/UX 개선 및 비즈니스 로직 구현\n* TrustForm, Rexpert 전문 솔루션 연동 및 오류 수정',
                    skills: ['Java', 'JSP', 'Oracle', 'JavaScript', 'TrustForm', 'Rexpert'],
                    links: [],
                    enabled: true
                },
                {
                    name: '자사몰 모바일 인식 UI 화면 구축',
                    period: '2021. 02 ~ 2023. 08',
                    description: '* 자사몰 홈페이지 화면단 구현 및 UI 기능 개선\n* Spring Framework 기반 웹 애플리케이션 개발 및 유지보수\n* 반응형 웹 디자인 적용 및 모바일 환경 최적화\n* 크로스 브라우저 호환성 개선 및 성능 최적화',
                    skills: ['Spring', 'JavaScript', 'Oracle', 'Java', 'jQuery', 'HTML/CSS'],
                    links: [],
                    enabled: true
                },
                {
                    name: '취약계층 생활정보 문자시스템 구현',
                    period: '2020. 07 ~ 2020. 09',
                    description: '* 기상청 취약계층 생활정보 문자 발송 시스템 유지보수\n* 통계 웹 페이지 UI 구현 및 데이터 시각화\n* PHP-Java 하이브리드 서버 개발 및 MySQL/MSSQL 데이터 수집·가공 기능 구현',
                    skills: ['Java', 'JSP', 'PHP', 'MySQL', 'MSSQL', 'Spring', 'MyBatis', 'JavaScript'],
                    links: [],
                    enabled: true
                }
            ],
            opensources: [],
            educations: [
                {
                    period: '2024. 11 ~ 2026. 02',
                    school: '학점은행제',
                    major: '컴퓨터공학과 재학중',
                    enabled: true
                },
                {
                    period: '2017. 03 ~ 2019. 02',
                    school: '백석예술대학',
                    major: '경영행정과 졸업',
                    enabled: true
                }
            ],
            etcs: [],
            articles: [],
            enabled: {
                introduce: true,
                skill: true,
                experience: true,
                project: true,
                opensource: true,
                education: true,
                etc: true,
                article: true
            },
            sectionOrder: {
                experience: 1,
                project: 2,
                opensource: 3,
                education: 4,
                etc: 5,
                article: 6
            }
        };
    }
};

// 화면 렌더링
function renderProfile() {
    const data = ProfileData.load();

    // 프로필 섹션
    if (data.profile.enabled) {
        document.getElementById('profileSection').classList.remove('hidden');
        const profileImg = document.getElementById('profileImage');
        if (data.profile.image) {
            profileImg.src = data.profile.image;
            profileImg.style.display = 'block';
        } else {
            profileImg.style.display = 'none';
        }
        document.getElementById('profileName').textContent = data.profile.name;
        const emailEl = document.getElementById('profileEmail');
        emailEl.innerHTML = data.profile.email ? `<i class="fas fa-envelope" style="margin-right: 8px; color: #666;"></i>${data.profile.email}` : '';
        
        const phoneEl = document.getElementById('profilePhone');
        if (data.profile.phone) {
            phoneEl.innerHTML = `<i class="fas fa-phone" style="margin-right: 8px; color: #666;"></i>${data.profile.phone}`;
            phoneEl.classList.add('show');
        } else {
            phoneEl.classList.remove('show');
        }

        const linksEl = document.getElementById('profileLinks');
        linksEl.innerHTML = '';
        if (data.profile.links.line) {
            const lineUrl = data.profile.links.line.startsWith('http') ? data.profile.links.line : `https://line.me/ti/p/${data.profile.links.line}`;
            linksEl.innerHTML += `<a href="${lineUrl}" target="_blank"><i class="fab fa-line"></i> Line</a>`;
        }
        if (data.profile.links.github) {
            linksEl.innerHTML += `<a href="${data.profile.links.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>`;
        }
        if (data.profile.links.discord) {
            const discordUrl = data.profile.links.discord.startsWith('http') ? data.profile.links.discord : `https://discord.com/users/${data.profile.links.discord}`;
            linksEl.innerHTML += `<a href="${discordUrl}" target="_blank"><i class="fab fa-discord"></i> Discord</a>`;
        }
        if (data.profile.links.youtube) {
            linksEl.innerHTML += `<a href="${data.profile.links.youtube}" target="_blank"><i class="fab fa-youtube"></i> YouTube</a>`;
        }
        if (data.profile.links.facebook) {
            linksEl.innerHTML += `<a href="${data.profile.links.facebook}" target="_blank"><i class="fab fa-facebook"></i> Facebook</a>`;
        }
        if (data.profile.links.instagram) {
            linksEl.innerHTML += `<a href="${data.profile.links.instagram}" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>`;
        }
    } else {
        document.getElementById('profileSection').classList.add('hidden');
    }

    // INTRODUCE
    if (data.enabled.introduce && data.introduce.enabled) {
        document.getElementById('introduceSection').classList.remove('hidden');
        document.getElementById('introduceContent').innerHTML = data.introduce.content || '';
    } else {
        document.getElementById('introduceSection').classList.add('hidden');
    }

    // SKILL
    if (data.enabled.skill) {
        document.getElementById('skillSection').classList.remove('hidden');
        const skillContent = document.getElementById('skillContent');
        skillContent.innerHTML = '';
        data.skills.forEach(skill => {
            if (skill.enabled) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'skill-category';
                categoryDiv.innerHTML = `
                    <h3>${skill.category}</h3>
                    <div class="skill-items">
                        ${skill.items.map(item => `<span class="skill-item">${item}</span>`).join('')}
                    </div>
                `;
                skillContent.appendChild(categoryDiv);
            }
        });
    } else {
        document.getElementById('skillSection').classList.add('hidden');
    }

    // 섹션 순서 설정 및 재배치
    const sectionOrder = data.sectionOrder || {
        experience: 1,
        project: 2,
        opensource: 3,
        education: 4,
        etc: 5,
        article: 6
    };
    
    // 섹션들을 순서대로 정렬
    const sections = [
        { key: 'experience', id: 'experienceSection', render: renderExperience },
        { key: 'project', id: 'projectSection', render: renderProject },
        { key: 'opensource', id: 'opensourceSection', render: renderOpensource },
        { key: 'education', id: 'educationSection', render: renderEducation },
        { key: 'etc', id: 'etcSection', render: renderEtc },
        { key: 'article', id: 'articleSection', render: renderArticle }
    ];
    
    // 먼저 모든 섹션 렌더링
    sections.forEach(section => {
        section.render(data);
    });
    
    // 순서대로 정렬
    sections.sort((a, b) => (sectionOrder[a.key] || 999) - (sectionOrder[b.key] || 999));
    
    // 컨테이너 참조
    const container = document.querySelector('.container');
    const skillSection = document.getElementById('skillSection');
    
    // 순서대로 재배치
    let insertAfter = skillSection;
    sections.forEach(section => {
        const sectionEl = document.getElementById(section.id);
        if (sectionEl && !sectionEl.classList.contains('hidden')) {
            if (insertAfter.nextSibling !== sectionEl) {
                container.insertBefore(sectionEl, insertAfter.nextSibling);
            }
            insertAfter = sectionEl;
        }
    });
}

function renderExperience(data) {
    if (data.enabled.experience) {
        document.getElementById('experienceSection').classList.remove('hidden');
        
        // 총 경력 계산
        const totalDuration = calculateTotalExperience(data.experiences);
        const experienceTitle = document.querySelector('#experienceSection h2');
        if (experienceTitle && totalDuration) {
            experienceTitle.innerHTML = `EXPERIENCE <span style="font-size: 16px; color: #666; font-weight: normal;">총 ${totalDuration}</span>`;
        }
        
        const expContent = document.getElementById('experienceContent');
        expContent.innerHTML = '';
        data.experiences.forEach(exp => {
            if (exp.enabled) {
                const expDiv = document.createElement('div');
                expDiv.className = 'experience-item';
                const startDate = exp.startDate ? formatDateForDisplay(exp.startDate) : '';
                const endDate = exp.isCurrent ? '현재' : (exp.endDate ? formatDateForDisplay(exp.endDate) : '');
                const period = exp.period || (startDate && endDate ? `${startDate} ~ ${endDate}` : '');
                
                expDiv.innerHTML = `
                    <div class="experience-header">
                        <div class="experience-period">${period}</div>
                        <div class="experience-company">${exp.company}</div>
                        <div class="experience-duration">${exp.duration || ''} ${exp.employmentType ? `(${exp.employmentType})` : ''}</div>
                        <div class="experience-role">${exp.role || ''}</div>
                    </div>
                    <div class="experience-description">${formatDescription(exp.description)}</div>
                    ${exp.skills && exp.skills.length > 0 ? `
                        <div class="experience-skills">
                            <strong>Skill Keywords:</strong>
                            <div class="skill-items">
                                ${exp.skills.map(s => `<span class="skill-item">${s}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                `;
                expContent.appendChild(expDiv);
            }
        });
    } else {
        document.getElementById('experienceSection').classList.add('hidden');
    }
}

function renderProject(data) {
    if (data.enabled.project) {
        document.getElementById('projectSection').classList.remove('hidden');
        const projContent = document.getElementById('projectContent');
        projContent.innerHTML = '';
        data.projects.forEach(proj => {
            if (proj.enabled) {
                const projDiv = document.createElement('div');
                projDiv.className = 'project-item';
                projDiv.innerHTML = `
                    <div class="project-header">
                        <div class="project-name">${proj.name}</div>
                        ${proj.client ? `<div class="project-client">고객사: ${proj.client}</div>` : ''}
                        <div class="project-period">${proj.period || ''}</div>
                    </div>
                    <div class="project-description">${formatDescription(proj.description)}</div>
                    ${proj.skills && proj.skills.length > 0 ? `
                        <div class="project-skills">
                            <strong>기술 스택:</strong>
                            <div class="skill-items">
                                ${proj.skills.map(s => `<span class="skill-item">${s}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${proj.links && proj.links.length > 0 ? `
                        <div class="project-links">
                            ${proj.links.map(link => `<a href="${link.url}" target="_blank">${link.label || link.url}</a>`).join('')}
                        </div>
                    ` : ''}
                `;
                projContent.appendChild(projDiv);
            }
        });
    } else {
        document.getElementById('projectSection').classList.add('hidden');
    }
}

function renderOpensource(data) {
    if (data.enabled.opensource) {
        document.getElementById('opensourceSection').classList.remove('hidden');
        const osContent = document.getElementById('opensourceContent');
        osContent.innerHTML = '';
        data.opensources.forEach(os => {
            if (os.enabled) {
                const osDiv = document.createElement('div');
                osDiv.className = 'opensource-item';
                osDiv.innerHTML = `
                    <div class="opensource-name">${os.name}</div>
                    <div class="opensource-description">${formatDescription(os.description)}</div>
                    ${os.links && os.links.length > 0 ? `
                        <div class="opensource-links">
                            ${os.links.map(link => `<a href="${link.url}" target="_blank">${link.label || link.url}</a>`).join('')}
                        </div>
                    ` : ''}
                `;
                osContent.appendChild(osDiv);
            }
        });
    } else {
        document.getElementById('opensourceSection').classList.add('hidden');
    }
}

function renderEducation(data) {
    if (data.enabled.education) {
        document.getElementById('educationSection').classList.remove('hidden');
        const eduContent = document.getElementById('educationContent');
        eduContent.innerHTML = '';
        data.educations.forEach(edu => {
            if (edu.enabled) {
                const eduDiv = document.createElement('div');
                eduDiv.className = 'education-item';
                eduDiv.innerHTML = `
                    <div class="education-period">${edu.period}</div>
                    <div class="education-school">${edu.school}</div>
                    <div class="education-major">${edu.major || ''}</div>
                `;
                eduContent.appendChild(eduDiv);
            }
        });
    } else {
        document.getElementById('educationSection').classList.add('hidden');
    }
}

function renderEtc(data) {
    if (data.enabled.etc) {
        document.getElementById('etcSection').classList.remove('hidden');
        const etcContent = document.getElementById('etcContent');
        etcContent.innerHTML = '';
        data.etcs.forEach(etc => {
            if (etc.enabled) {
                const etcDiv = document.createElement('div');
                etcDiv.className = 'etc-item';
                etcDiv.innerHTML = `
                    <div class="etc-period">${etc.period}</div>
                    <div class="etc-title">${etc.title}</div>
                    ${etc.role ? `<div class="etc-role">${etc.role}</div>` : ''}
                    ${etc.description ? `<div class="etc-description">${formatDescription(etc.description)}</div>` : ''}
                `;
                etcContent.appendChild(etcDiv);
            }
        });
    } else {
        document.getElementById('etcSection').classList.add('hidden');
    }
}

function renderArticle(data) {
    if (data.enabled.article) {
        document.getElementById('articleSection').classList.remove('hidden');
        const articleContent = document.getElementById('articleContent');
        articleContent.innerHTML = '';
        const ul = document.createElement('ul');
        ul.className = 'article-list';
        data.articles.forEach(article => {
            if (article.enabled) {
                const li = document.createElement('li');
                li.className = 'article-item';
                li.innerHTML = `<a href="${article.url || '#'}" target="_blank">${article.title}</a>`;
                ul.appendChild(li);
            }
        });
        articleContent.appendChild(ul);
    } else {
        document.getElementById('articleSection').classList.add('hidden');
    }
}

function formatDateForDisplay(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}. ${month}`;
}

function calculateTotalExperience(experiences) {
    if (!experiences || experiences.length === 0) return '';
    
    // duration 필드가 있으면 우선 사용 (잡코리아 방식)
    let totalMonths = 0;
    let hasDuration = false;
    
    experiences.forEach(exp => {
        if (!exp.enabled) return;
        
        // duration 필드가 있으면 파싱해서 사용
        if (exp.duration) {
            hasDuration = true;
            const durationStr = exp.duration.trim();
            
            // "X년 Y개월", "X년", "Y개월" 형식 파싱
            const yearMatch = durationStr.match(/(\d+)년/);
            const monthMatch = durationStr.match(/(\d+)개월/);
            
            if (yearMatch) {
                totalMonths += parseInt(yearMatch[1]) * 12;
            }
            if (monthMatch) {
                totalMonths += parseInt(monthMatch[1]);
            }
        }
    });
    
    // duration 필드가 없으면 날짜로 계산
    if (!hasDuration) {
        const today = new Date();
        
        experiences.forEach(exp => {
            if (!exp.enabled) return;
            
            const startDate = exp.startDate ? new Date(exp.startDate) : null;
            const endDate = exp.isCurrent ? today : (exp.endDate ? new Date(exp.endDate) : null);
            
            if (!startDate || !endDate) return;
            
            // 년/월 단위로 계산 (일자는 무시)
            let years = endDate.getFullYear() - startDate.getFullYear();
            let months = endDate.getMonth() - startDate.getMonth();
            
            if (months < 0) {
                years--;
                months += 12;
            }
            
            totalMonths += years * 12 + months;
        });
    }
    
    if (totalMonths === 0) return '';
    
    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    let result = '';
    if (totalYears > 0) {
        result += `${totalYears}년 `;
    }
    if (remainingMonths > 0) {
        result += `${remainingMonths}개월`;
    }
    
    return result.trim();
}

function formatDescription(text) {
    if (!text) return '';
    // HTML 이스케이프
    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };
    
    const lines = text.split('\n');
    let inList = false;
    let result = '';
    
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            if (!inList) {
                result += '<ul>';
                inList = true;
            }
            result += `<li>${escapeHtml(trimmed.substring(2))}</li>`;
        } else {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            if (line) {
                result += `<p>${escapeHtml(line)}</p>`;
            } else {
                result += '<br>';
            }
        }
    });
    
    if (inList) {
        result += '</ul>';
    }
    
    return result || escapeHtml(text);
}

// 기본 데이터로 리셋
function resetToDefault() {
    const message = '저장된 모든 데이터가 삭제되고 기본 데이터로 초기화됩니다.\n\n개인정보(이름, 이메일, 전화번호 등)도 모두 초기값으로 되돌아갑니다.\n\n정말로 계속하시겠습니까?';
    if (confirm(message)) {
        localStorage.removeItem('profileData');
        alert('기본 데이터로 리셋되었습니다.');
        location.reload();
    }
}

// 편집 버튼 클릭
const editBtn = document.getElementById('editBtn');
if (editBtn) {
    editBtn.addEventListener('click', function() {
        window.location.href = 'edit.html';
    });
}

// 최상단 이동 버튼
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// PDF 다운로드 함수
function downloadPDF() {
    // html2pdf 라이브러리 사용
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = function() {
        // 버튼들 숨기기
        const headerActions = document.getElementById('headerActions');
        const scrollBtn = document.getElementById('scrollToTopBtn');
        const originalHeaderDisplay = headerActions ? headerActions.style.display : '';
        const originalScrollDisplay = scrollBtn ? scrollBtn.style.display : '';
        
        if (headerActions) headerActions.style.display = 'none';
        if (scrollBtn) scrollBtn.style.display = 'none';
        
        const element = document.querySelector('.container');
        const opt = {
            margin: [10, 10, 10, 10],
            filename: '이력서.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                logging: false,
                letterRendering: true
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before',
                after: '.page-break-after',
                avoid: ['.section', '.experience-item', '.project-item', '.education-item', '.etc-item']
            }
        };
        
        html2pdf().set(opt).from(element).save().then(() => {
            // 복원
            if (headerActions) headerActions.style.display = originalHeaderDisplay;
            if (scrollBtn) scrollBtn.style.display = originalScrollDisplay;
        }).catch(() => {
            // 에러 시에도 복원
            if (headerActions) headerActions.style.display = originalHeaderDisplay;
            if (scrollBtn) scrollBtn.style.display = originalScrollDisplay;
        });
    };
    document.head.appendChild(script);
}

// 페이지 로드 시 렌더링
document.addEventListener('DOMContentLoaded', function() {
    renderProfile();
    initScrollToTop();
});

