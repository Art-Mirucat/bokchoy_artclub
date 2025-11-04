// data.js
// 存放画师和作品数据

const artistsData = [
    {
        id: 1,
        name: '蛋糕',
        avatar: 'images/artists/artist1_avatar.jpg',
        bio: '画师',
        businessScope: 'AA | BB | CC',
        businesses: [
            {
                title: '业务1',
                priceRange: '￥XX - ￥YY',
                description: '——————————',
                images: ['images/artists/artist1_work1.jpg', 'images/artists/artist1_work2.jpg', 'images/artists/artist1_work3.jpg'],
                tags: ['#标签1', '#标签2', '#标签3']
            },
            {
                title: '业务2',
                priceRange: '￥XX - ￥YY',
                description: '——————————',
                images: ['images/artists/artist1_work2.jpg', 'images/artists/artist1_work3.jpg', 'images/artists/artist1_work1.jpg'],
                tags: ['#标签4', '#标签5', '#标签6']
            }
        ],
        social: {
            weibo: '#',
            instagram: '#'
        }
    },
    {
        id: 2,
        name: '小稔',
        avatar: 'images/artists/artist2_avatar.jpg',
        bio: '画师',
        businessScope: 'AA | BB | CC',
        businesses: [
            {
                title: '业务1',
                priceRange: '￥XX - ￥YY',
                description: '——————————',
                images: ['images/artists/artist2_work1.jpg', 'images/artists/artist2_work2.jpg', 'images/artists/artist2_work3.jpg'],
                tags: ['#标签7', '#标签8', '#标签9']
            }
        ],
        social: {
            weibo: '#'
        }
    },
    {
        id: 3,
        name: '萝卜',
        avatar: 'images/artists/artist3_avatar.jpg',
        bio: '画师',
        businessScope: 'AA | BB | CC',
        businesses: [
            {
                title: '业务1',
                priceRange: '￥XX - ￥YY',
                description: '——————————',
                images: ['images/artists/artist3_work1.jpg', 'images/artists/artist3_work2.jpg', 'images/artists/artist3_work3.jpg'],
                tags: ['#标签10', '#标签11', '#标签12']
            }
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id: 4,
        name: '支支',
        avatar: 'images/artists/artist4_avatar.jpg',
        bio: '画师',
        businessScope: '业务：绘画 | BB | CC',
        businesses: [
            {
                title: '小动物场景涂鸦',
                priceRange: '￥12 - ￥25',
                description: '单人：12r/p &emsp; &emsp; 双人：25r/p',
                images: ['images/artists/artist4_work1.jpg', 'images/artists/artist4_work2.jpg', 'images/artists/artist4_work3.jpg', 'images/artists/artist4_work4.jpg'],
                tags: ['#小动物', '#场景涂鸦', '#Q版']
            }
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    }
];