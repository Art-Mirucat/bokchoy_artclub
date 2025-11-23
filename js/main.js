// main.js
// 主要的交互逻辑

let currentPage = 1; // 当前页码
const artistsPerPage = 4; // 每页显示的画师数量

// 渲染画师列表（修复后确保预览卡片正常显示）
function renderArtists(page = 1, filterTags = []) {
    const artistList = document.getElementById('artist-list');
    if (!artistList) return;

    currentPage = page; // 更新当前页码
    // 保持筛选状态用于分页切换
    currentFilterTags = filterTags;

    const filteredArtists = artistsData.filter(artist => {
        if (filterTags.length === 0) return true;
        // 检查画师的任一业务是否包含所有筛选标签
        return artist.businesses.some(business => 
            filterTags.every(filterTag => 
                business.tags.map(tag => tag.replace('#', '')).includes(filterTag)
            )
        );
    });

    // 计算当前页面的画师
    const startIndex = (currentPage - 1) * artistsPerPage;
    const endIndex = startIndex + artistsPerPage;
    const artistsToDisplay = filteredArtists.slice(startIndex, endIndex);

    artistList.innerHTML = artistsToDisplay.map(artist => `
        <div class="artist-card">
            <img src="${artist.avatar}" alt="${artist.name}" class="artist-avatar">
            <div class="artist-card-content">
                <h3>${artist.name}</h3>
                <p class="artist-id">编号: ${artist.id}</p>
                <p class="artist-bio">${artist.bio}</p>
                <div class="artist-works-preview">
                    ${artist.businesses.slice(0, 3).map(biz => `<img src="${biz.images[0]}" alt="${biz.title} 预览" class="work-preview-thumb">`).join('')}
                </div>
                <a href="artist-detail.html?id=${artist.id}" class="view-detail-btn">查看详情</a>
            </div>
        </div>
    `).join('');

    renderPagination(filteredArtists.length); // 渲染分頁控制項
}

// 渲染分頁控制項
function renderPagination(totalArtists) {
    const totalPages = Math.ceil(totalArtists / artistsPerPage);
    const pageNumbersContainer = document.getElementById('page-numbers');
    const pageDropdown = document.getElementById('page-dropdown');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    if (!pageNumbersContainer || !pageDropdown || !prevPageBtn || !nextPageBtn) return;

    pageNumbersContainer.innerHTML = '';
    pageDropdown.innerHTML = '';

    // 只顯示當前頁碼
    const currentPageSpan = document.createElement('span');
    currentPageSpan.textContent = currentPage;
    currentPageSpan.classList.add('page-number');
    currentPageSpan.classList.add('active');
    pageNumbersContainer.appendChild(currentPageSpan);

    // 生成下拉选单选项
    for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `第 ${i} 页`;
        if (i === currentPage) {
            option.selected = true;
        }
        pageDropdown.appendChild(option);
    }

    // 更新上一页/下一页按钮状态
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;

    // 绑定下拉选单事件（使用 currentFilterTags 保持筛选一致）
    pageDropdown.addEventListener('change', (e) => {
        renderArtists(parseInt(e.target.value), currentFilterTags);
    });

    // 绑定上一页/下一页事件
    prevPageBtn.onclick = () => {
        if (currentPage > 1) {
            renderArtists(currentPage - 1, currentFilterTags);
        }
    };

    nextPageBtn.onclick = () => {
        if (currentPage < totalPages) {
            renderArtists(currentPage + 1, currentFilterTags);
        }
    };
}

// 初始化分頁功能
function setupPagination() {
    // 初始渲染时会调用 renderPagination，所以这里不需要额外调用
}

// 渲染画师详情页（仅修改此页逻辑，不影响其他页面）
function renderArtistDetail() {
    const artistId = new URLSearchParams(window.location.search).get('id');
    const artist = artistsData.find(a => a.id == artistId);

    if (artist) {
        const profileContainer = document.getElementById('artist-profile');
        const businessesContainer = document.getElementById('artist-businesses');

        // 渲染画师基本信息
        const profileHtml = `
            <img src="${artist.avatar}" alt="${artist.name}" class="artist-profile-avatar">
            <div class="artist-profile-info">
                <h2>${artist.name}</h2>
                <p class="artist-id">编号: ${artist.id}</p>
                <p class="artist-scope">${artist.businessScope}</p>
            </div>
        `;
        profileContainer.innerHTML = profileHtml;

        // 渲染画师业务模块
        let businessesHtml = '';
        artist.businesses.forEach((business, businessIndex) => {
            businessesHtml += `
                <div class="business-module">
                    <div class="business-title-row">
                        <h3>${business.title}</h3>
                        <span class="business-price">${business.priceRange}</span>
                    </div>
                    <p class="business-description">${business.description}</p>
                    <div class="business-gallery" data-business-index="${businessIndex}">
                        <div class="gallery-images-wrapper">
                            ${business.images.map((img, index) => `
                                <div class="gallery-image-container ${index < 2 ? 'active' : ''}" data-index="${index}">
                                    <img src="${img}" alt="${business.title} 预览" class="gallery-image">
                                </div>
                            `).join('')}
                        </div>
                        <button class="gallery-arrow left-arrow" style="display: ${business.images.length <= 2 ? 'none' : 'block'};">&lt;</button>
                        <button class="gallery-arrow right-arrow" style="display: ${business.images.length <= 2 ? 'none' : 'block'};">&gt;</button>
                    </div>
                    <div class="business-tags">
                        ${business.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        });
        businessesContainer.innerHTML = businessesHtml;

        // 画廊功能 - 循环回廊效果
        document.querySelectorAll('.business-gallery').forEach(gallery => {
            const imagesWrapper = gallery.querySelector('.gallery-images-wrapper');
            const imageContainers = Array.from(imagesWrapper.querySelectorAll('.gallery-image-container'));
            const leftArrow = gallery.querySelector('.left-arrow');
            const rightArrow = gallery.querySelector('.right-arrow');
            const businessIndex = gallery.dataset.businessIndex;
            const business = artist.businesses[businessIndex];
            
            let currentStartIndex = 0;
            const imagesPerView = 2;
            const totalImages = business.images.length;

            const showImages = (startIndex) => {
                // 隐藏所有图片容器
                imageContainers.forEach(container => {
                    container.classList.remove('active');
                });
                
                // 显示当前应该显示的图片
                for (let i = 0; i < imagesPerView; i++) {
                    const imageIndex = startIndex + i;
                    if (imageIndex < totalImages) {
                        if (imageContainers[imageIndex]) {
                            imageContainers[imageIndex].classList.add('active');
                        }
                    }
                }
                
                // 更新箭头显示状态
                if (totalImages <= imagesPerView) {
                    leftArrow.style.display = 'none';
                    rightArrow.style.display = 'none';
                } else {
                    leftArrow.style.display = 'block';
                    rightArrow.style.display = 'block';
                }
            };

            leftArrow.addEventListener('click', () => {
                currentStartIndex = (currentStartIndex - imagesPerView + totalImages) % totalImages;
                // 确保 currentStartIndex 总是从页面的开头开始
                if (currentStartIndex % imagesPerView !== 0) {
                    currentStartIndex = Math.floor(currentStartIndex / imagesPerView) * imagesPerView;
                }
                showImages(currentStartIndex);
            });

            rightArrow.addEventListener('click', () => {
                if (currentStartIndex + imagesPerView < totalImages) {
                    currentStartIndex += imagesPerView;
                } else {
                    currentStartIndex = 0; // 回到第一页
                }
                showImages(currentStartIndex);
            });

            // 点击图片查看原图 - 使用Lightbox
            imageContainers.forEach((container, index) => {
                container.addEventListener('click', () => {
                    const actualImageIndex = (currentStartIndex + index) % totalImages;
                    openLightbox(business.images[actualImageIndex]);
                });
            });

            showImages(currentStartIndex); // 初始化显示
        });

        // Lightbox 功能
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.id = 'lightbox-overlay';
        lightboxOverlay.innerHTML = `
            <div id="lightbox-content">
                <span id="lightbox-close">&times;</span>
                <img id="lightbox-image" src="" alt="Full size image">
            </div>
        `;
        document.body.appendChild(lightboxOverlay);

        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxClose = document.getElementById('lightbox-close');

        function openLightbox(imageSrc) {
            lightboxImage.src = imageSrc;
            lightboxOverlay.style.display = 'flex';
        }

        lightboxClose.addEventListener('click', () => {
            lightboxOverlay.style.display = 'none';
        });

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                lightboxOverlay.style.display = 'none';
            }
        });

    } else {
        document.querySelector('main .container').innerHTML = '<p>未找到画师信息。</p>';
    }
}

// 筛选用的当前标签集合（供分页保持筛选一致）
let currentFilterTags = [];

// 筛选配置：仅显示大业务标签，绘画业务下展开两个子分类
const filterConfig = {
    businessTags: ["绘画", "美工", "拆分", "Live2D", "作曲", "手作", "占卜", "3D建模", "代码编程", "水印代打", "配音"],
    // 业务 -> 子分类(data-category)
    subMap: {
        "绘画": ["art-style", "imitate-style", "painting"],
        "手作": ["material", "handmade"],
        // 其他业务如需子分类，后续可在此扩展
    },
    // 子分类 -> 标签列表
    subCategoryTags: {
        "art-style": ["赛璐璐", "伪厚涂", "厚涂", "草稿", "正比", "Q版"],
        "imitate-style": ["饼干人"],
        "painting": ["头像", "胸像", "立绘", "组合页", "插画", "服设", '表情包', '场景涂鸦', '动物'],
        "material": ["不织布", "扭扭棒"],
        "handmade": ["正比手作", "Q版手作", "动物", "发卡", "挂件"],
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 汉堡菜单功能（完整保留，不影响其他页面）
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // 根据页面加载不同的功能（确保画师列表页和详情页逻辑分离）
    if (document.body.classList.contains('artist-list-page')) {
        // 初始化筛选系统（绑定漏斗按钮事件、渲染标签、子分类初始隐藏）
        initFilterSystem();
        renderArtists();
        setupPagination(); // 初始化分頁功能
    } else if (document.body.classList.contains('artist-detail-page')) {
        renderArtistDetail();
    }

    // 联系页面：初始化二维码图片弹窗（存在微信二维码容器则启用）
    if (document.querySelector('.wechat-qr-codes')) {
        initContactQRModal();
    }
});

// 初始化筛选系统（只显示大业务标签；子分类初始隐藏）
function initFilterSystem() {
    const filterToggleButton = document.getElementById('filter-toggle-button');
    const filterPanel = document.getElementById('filter-panel');
    const selectedTagsContainer = document.getElementById('selected-tags-container');

    // 漏斗按钮展开/收起面板
    if (filterToggleButton && filterPanel) {
        filterToggleButton.addEventListener('click', () => {
            filterPanel.classList.toggle('hidden');
        });
    }

    // 渲染业务标签
    const businessContainer = document.querySelector('.tags-container[data-category="business"]');
    if (businessContainer) {
        businessContainer.innerHTML = filterConfig.businessTags
            .map(tag => `<button class="filter-tag" data-tag="${tag}" data-kind="business">${tag}</button>`)
            .join('');
    }

    // 渲染子分类标签，并确保父块初始隐藏
    Object.entries(filterConfig.subCategoryTags).forEach(([dataCategory, tags]) => {
        const container = document.querySelector(`.tags-container[data-category="${dataCategory}"]`);
        if (!container) return;
        container.innerHTML = tags
            .map(tag => `<button class="filter-tag" data-tag="${tag}" data-kind="sub" data-category="${dataCategory}">${tag}</button>`)
            .join('');
        const parent = container.closest('.filter-category');
        if (parent) parent.classList.add('hidden'); // 初始隐藏
    });

    // 面板内标签点击（业务与子标签统一处理）
    if (filterPanel) {
        filterPanel.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-tag');
            if (!btn) return;
            const tag = btn.dataset.tag;
            toggleTagSelection(tag);
        });
    }

    // 横栏已选标签点击：取消选择
    if (selectedTagsContainer) {
        selectedTagsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.selected-tag');
            if (!btn) return;
            const tag = btn.dataset.tag;
            toggleTagSelection(tag);
        });
    }

    // 初始状态：子分类全部隐藏
    updateSubCategoryVisibility();
    updateSelectedTagsDisplay();
    updateFilterTagStates();
}

// 根据已选业务标签显示/隐藏子分类模块
function updateSubCategoryVisibility() {
    const selectedBusiness = currentFilterTags.filter(tag => filterConfig.businessTags.includes(tag));
    const enabledCategories = new Set();

    selectedBusiness.forEach(biz => {
        const cats = filterConfig.subMap[biz] || [];
        cats.forEach(c => enabledCategories.add(c));
    });

    // 遍历子分类容器，按需显示/隐藏
    Object.keys(filterConfig.subCategoryTags).forEach(dataCategory => {
        const container = document.querySelector(`.tags-container[data-category="${dataCategory}"]`);
        const parent = container ? container.closest('.filter-category') : null;
        if (!parent) return;

        if (enabledCategories.has(dataCategory)) {
            parent.classList.remove('hidden');
        } else {
            parent.classList.add('hidden');
            // 同步移除该子分类下的已选标签
            const subTags = filterConfig.subCategoryTags[dataCategory] || [];
            currentFilterTags = currentFilterTags.filter(t => !subTags.includes(t));
        }
    });
}

// 切换标签选中状态（面板按钮或横栏按钮）
function toggleTagSelection(tag) {
    const idx = currentFilterTags.indexOf(tag);
    if (idx >= 0) {
        currentFilterTags.splice(idx, 1); // 取消选择
    } else {
        currentFilterTags.push(tag); // 选择
    }

    updateSubCategoryVisibility();
    updateSelectedTagsDisplay();
    updateFilterTagStates();

    // 应用筛选并回到第一页
    renderArtists(1, currentFilterTags);
}

// 更新横栏中的已选标签显示
function updateSelectedTagsDisplay() {
    const selectedTagsContainer = document.getElementById('selected-tags-container');
    if (!selectedTagsContainer) return;
    selectedTagsContainer.innerHTML = currentFilterTags
        .map(tag => `<button class="selected-tag" data-tag="${tag}">${tag} <i class="fas fa-times"></i></button>`)
        .join('');
}

// 更新面板内按钮的 active 状态
function updateFilterTagStates() {
    document.querySelectorAll('.filter-tag').forEach(btn => {
        const tag = btn.dataset.tag;
        if (currentFilterTags.includes(tag)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function ensureSubcategoriesHidden() {
    const panel = document.getElementById('filter-panel');
    if (!panel) return;
    document.querySelectorAll('#filter-panel .tags-container').forEach(container => {
        const dc = container.getAttribute('data-category');
        if (dc && dc !== 'business') {
            const parent = container.closest('.filter-category');
            if (parent) parent.classList.add('hidden');
        }
    });
}

// 联系页二维码图片弹窗
function initContactQRModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.getElementById('modal-close');

    if (!modal || !modalImg || !closeBtn) return;

    // 点击二维码的链接时打开弹窗显示大图
    document.querySelectorAll('.wechat-qr-codes a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const imgUrl = anchor.getAttribute('href');
            modalImg.src = imgUrl;
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    // 关闭按钮
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
    });

    // 点击遮罩关闭（仅点击遮罩区域时）
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            modalImg.src = '';
        }
    });

    // Esc 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            modalImg.src = '';
        }
    });
}
