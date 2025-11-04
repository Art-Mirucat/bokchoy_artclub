// main.js
// 主要的交互逻辑
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
        renderArtists();
        setupTagFilters();
    } else if (document.body.classList.contains('artist-detail-page')) {
        renderArtistDetail();
    }
});

// 收集所有独特的标签（画师列表页专用，完整保留）
function getAllTags() {
    const allTags = new Set();
    artistsData.forEach(artist => {
        artist.businesses.forEach(business => {
            business.tags.forEach(tag => allTags.add(tag.replace('#', '')));
        });
    });
    return [...allTags];
}

// 渲染画师列表（修复后确保预览卡片正常显示）
function renderArtists(filterTags = []) {
    const artistList = document.getElementById('artist-list');
    if (!artistList) return;

    const filteredArtists = artistsData.filter(artist => {
        if (filterTags.length === 0) return true;
        // 检查画师的任一业务是否包含所有筛选标签
        return artist.businesses.some(business => 
            filterTags.every(filterTag => 
                business.tags.map(tag => tag.replace('#', '')).includes(filterTag)
            )
        );
    });

    artistList.innerHTML = filteredArtists.map(artist => `
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
}

// 设置标签筛选功能（画师列表页专用，完整保留）
function setupTagFilters() {
    const tagsContainer = document.querySelector('.tag-filters');
    if (!tagsContainer) return;

    const allTags = getAllTags();
    tagsContainer.innerHTML = allTags.map(tag => `<button class="tag-filter-btn">${tag}</button>`).join('');

    const tagButtons = tagsContainer.querySelectorAll('.tag-filter-btn');
    let activeTags = [];

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const tag = button.textContent;
            
            if (activeTags.includes(tag)) {
                activeTags = activeTags.filter(t => t !== tag);
            } else {
                activeTags.push(tag);
            }
            
            renderArtists(activeTags);
        });
    });
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
                                    <img src="${img}" alt="${business.title} example" class="gallery-image">
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
                for (let i = 0; i < imagesPerView && i < totalImages; i++) {
                    const imageIndex = (startIndex + i) % totalImages;
                    if (imageContainers[imageIndex]) {
                        imageContainers[imageIndex].classList.add('active');
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
                showImages(currentStartIndex);
            });

            rightArrow.addEventListener('click', () => {
                currentStartIndex = (currentStartIndex + imagesPerView) % totalImages;
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