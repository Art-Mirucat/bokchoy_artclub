// data.js
// 存放画师和作品数据

const artistsData = [
    // {
    //     id: 1,
    //     name: '蛋糕',
    //     avatar: 'images/artists/artist1_avatar.jpg',
    //     bio: '画师',
    //     businessScope: 'AA | BB | CC',
    //     businesses: [
    //         {
    //             title: '业务1',
    //             priceRange: '￥XX - ￥YY',
    //             description: '——————————',
    //             images: ['images/artists/artist1_work1.jpg', 'images/artists/artist1_work2.jpg', 'images/artists/artist1_work3.jpg'],
    //             tags: ['#标签1', '#标签2', '#标签3']
    //         },
    //         {
    //             title: '业务2',
    //             priceRange: '￥XX - ￥YY',
    //             description: '——————————',
    //             images: ['images/artists/artist1_work2.jpg', 'images/artists/artist1_work3.jpg', 'images/artists/artist1_work1.jpg'],
    //             tags: ['#标签4', '#标签5', '#标签6']
    //         }
    //     ],
    //     social: {
    //         weibo: '#',
    //         instagram: '#'
    //     }
    // },
    // {
    //     id: 2,
    //     name: '小稔',
    //     avatar: 'images/artists/artist2_avatar.jpg',
    //     bio: '画师',
    //     businessScope: 'AA | BB | CC',
    //     businesses: [
    //         {
    //             title: '业务1',
    //             priceRange: '￥XX - ￥YY',
    //             description: '——————————',
    //             images: ['images/artists/artist2_work1.jpg', 'images/artists/artist2_work2.jpg', 'images/artists/artist2_work3.jpg'],
    //             tags: ['#标签7', '#标签8', '#标签9']
    //         }
    //     ],
    //     social: {
    //         weibo: '#'
    //     }
    // },
    // {
    //     id: 3,
    //     name: '萝卜',
    //     avatar: 'images/artists/artist3_avatar.jpg',
    //     bio: '画师',
    //     businessScope: 'AA | BB | CC',
    //     businesses: [
    //         {
    //             title: '业务1',
    //             priceRange: '￥XX - ￥YY',
    //             description: '——————————',
    //             images: ['images/artists/artist3_work1.jpg', 'images/artists/artist3_work2.jpg', 'images/artists/artist3_work3.jpg'],
    //             tags: ['#标签10', '#标签11', '#标签12']
    //         }
    //     ],
    //     social: {
    //         twitter: '#',
    //         behance: '#'
    //     }
    // },
    // {
    //     id: ,
    //     name: '',
    //     avatar: 'images/artists/artist_avatar.jpg',
    //     bio: '',
    //     businessScope: '业务：',
    //     businesses: [
    //         {
    //             title: '',
    //             priceRange: '',
    //             description: '',
    //             images: ['images/artists/artist_work1.jpg', 'images/artists/artist_work2.jpg', 'images/artists/artist_work3.jpg', 'images/artists/artist_work4.jpg'],
    //             tags: ['']
    //         }
    //     ],
    //     social: {
    //         twitter: '#',
    //         behance: '#'
    //     }
    // },
    {
        id: 4,
        name: '支支',
        avatar: 'images/artists/artist4_avatar.jpg',
        bio: '画师',
        businessScope: '业务：绘画',
        businesses: [
            {
                title: '小动物场景涂鸦',
                priceRange: '￥12r - ￥25r',
                description: '单人：12r/p &emsp; &emsp; 双人：25r/p',
                images: ['images/artists/artist4_work1.jpg', 'images/artists/artist4_work2.jpg', 'images/artists/artist4_work3.jpg', 'images/artists/artist4_work4.jpg'],
                tags: ['#绘画', '#Q版', '#场景涂鸦', '#动物']
            },
            {
                title: '小动物表情包',
                priceRange: '￥3r',
                description: '帮拟：+5r&emsp;&emsp;&emsp;&emsp;多约优惠',
                images: ['images/artists/artist4_work5.jpg', 'images/artists/artist4_work6.jpg'],
                tags: ['#绘画', '#Q版', '#动物', '#表情包']
            },
            {
                title: '仿饼干人立绘',
                priceRange: '￥16r',
                description: '',
                images: ['images/artists/artist4_work7.jpg'],
                tags: ['#绘画', '#饼干人', '#立绘']
            },
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id: 16,
        name: '肥喵',
        avatar: 'images/artists/artist16_avatar.jpg',
        bio: '画师',
        businessScope: '业务：绘画',
        businesses: [
            {
                title: 'QQ人组合页',
                priceRange: '￥35r',
                description: '',
                images: ['images/artists/artist16_work1.jpg'],
                tags: ['#绘画', '#Q版', '#组合页']
            }
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id:20,
        name: '咪噜喵',
        avatar: 'images/artists/artist20_avatar.jpg',
        bio: '画师/拆分师/Live2D建模师/游戏网站编程师',
        businessScope: '业务：绘画/拆分/Live2D/游戏/网站',
        businesses: [
            {
                title: '对称QQ头',
                priceRange: '￥8r',
                description: '●复杂设+2-6r',
                images: ['images/artists/artist20_work1.jpg', 'images/artists/artist20_work2.jpg', 'images/artists/artist20_work3.jpg'],
                tags: ['#绘画', '#Q版', '#头像']
            }
            ,
            {
                title: '动图拆分',
                priceRange: '￥30r+ - ￥50r+',
                description: '●粗拆：30r+&emsp;&emsp;&emsp;&emsp;●精拆：50r+\n●价格根据复杂度浮动',
                images: ['images/artists/artist20_work4.jpg'],
                tags: ['#拆分']
            },
            {
                title: 'Live2D动图建模',
                priceRange: '￥28r+ - ￥40r+',
                description: '●仅眨眼+头发飘动（包拆分）：28r | 根据情况添加z轴，默认果冻眼，嘴巴变形+4r\n●整张图片：40r+\n●如无特殊要求动画根据图片来做，包含基本物理效果\n●价格根据复杂度浮动，约包拆分，拆分价可打八折',
                images: ['images/artists/artist20_work5.mp4', 'images/artists/artist20_work6.mp4', 'images/artists/artist20_work7.mp4'],
                tags: ['#Live2D', '#动图']
            },
            // {
            //     title: 'Live2D皮套',
            //     priceRange: '￥260r+ - ￥1200r+',
            //     description: '●',
            //     images: ['images/artists/artist20_work6.jpg'],
            //     tags: ['#Live2D', '#皮套']
            // },
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id:35,
        name: '阿柳',
        avatar: 'images/artists/artist35_avatar.jpg',
        bio: '画师',
        businessScope: '业务：绘画',
        businesses: [
            {
                title: '黑白背景头像',
                priceRange: '￥5r',
                description: '工期：排到后一周&emsp;&emsp;&emsp;&emsp;备注：推荐黑毛白毛约',
                images: ['images/artists/artist35_work1.jpg', 'images/artists/artist35_work2.jpg', 'images/artists/artist35_work3.jpg'],
                tags: ['#绘画', '#Q版', '#头像']
            },
            {
                title: 'Oc梗图',
                priceRange: '￥2r',
                description: '工期：24小时',
                images: ['images/artists/artist35_work4.jpg', 'images/artists/artist35_work5.jpg', 'images/artists/artist35_work6.jpg'],
                tags: ['#绘画', '#Q版', '#头像']
            },
            {
                title: '水印代打',
                priceRange: '￥1r - ￥2r',
                description: '工期：24小时&emsp;&emsp;&emsp;&emsp;自带：1r&emsp;不自带：2r',
                images: ['images/artists/artist35_work7.jpg', 'images/artists/artist35_work8.jpg', 'images/artists/artist35_work9.jpg'],
                tags: ['#水印代打']
            },
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id: 54,
        name: '焗橘猫',
        avatar: 'images/artists/artist54_avatar.jpg',
        bio: '画师',
        businessScope: '业务：绘画',
        businesses: [
            {
                title: '草立',
                priceRange: '￥110r',
                description: '成图完成度参考P1（粉色那张）',
                images: ['images/artists/artist54_work1.jpg', 'images/artists/artist54_work2.jpg', 'images/artists/artist54_work3.jpg'],
                tags: ['#绘画', '#草稿', '#立绘']
            }
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id:73,
        name: '老荷',
        avatar: 'images/artists/artist73_avatar.jpg',
        bio: '',
        businessScope: '业务：绘画',
        businesses: [
            {
                title: '立绘',
                priceRange: '￥120r',
                description: '定制：+20r&emsp;&emsp;&emsp;&emsp;复杂浮动',
                images: ['images/artists/artist73_work1.jpg', 'images/artists/artist73_work2.jpg', 'images/artists/artist73_work3.jpg', 'images/artists/artist73_work4.jpg'],
                tags: ['#绘画', "#正比", '#立绘']
            },
            {
                title: '小动物',
                priceRange: '￥10r',
                description: '',
                images: ['images/artists/artist73_work5.jpg', 'images/artists/artist73_work6.jpg'],
                tags: ['#绘画', "#Q版", '#动物']
            },
            {
                title: '小动物贺图',
                priceRange: '￥20r',
                description: '',
                images: ['images/artists/artist73_work7.jpg', 'images/artists/artist73_work8.jpg', 'images/artists/artist73_work9.jpg'],
                tags: ['#绘画', "Q版", '#动物']
            }
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id:106,
        name: '招财谣',
        avatar: 'images/artists/artist106_avatar.jpg',
        bio: '手作娘',
        businessScope: '业务：手作',
        businesses: [
            {
                title: '大型摆件',
                priceRange: '￥10r - ￥20r',
                description: '满40邮费半包，满50邮费全包，满65可以减5r，满85减8r，满100减10，价格非绝对，不同产品会有不同偏差',
                images: ['images/artists/artist106_work1.jpg', 'images/artists/artist106_work2.jpg', 'images/artists/artist106_work3.jpg', 'images/artists/artist106_work4.jpg', 'images/artists/artist106_work5.jpg', 'images/artists/artist106_work6.jpg', 'images/artists/artist106_work7.jpg'],
                tags: ['#手作', '#动物']
            },
            {
                title: '可定制扭扭棒花',
                priceRange: '￥13r - ￥25r',
                description: '满40邮费半包，满50邮费全包，满65可以减5r，满85减8r，满100减10，价格非绝对，不同产品会有不同偏差',
                images: ['images/artists/artist106_work8.jpg', 'images/artists/artist106_work9.jpg'],
                tags: ['#手作', '#扭扭棒']
            },
            {
                title: '小型摆件/发卡',
                priceRange: '￥4r - ￥8r',
                description: '满40邮费半包，满50邮费全包，满65可以减5r，满85减8r，满100减10，价格非绝对，不同产品会有不同偏差',
                images: ['images/artists/artist106_work10.jpg', 'images/artists/artist106_work11.jpg', 'images/artists/artist106_work12.jpg', 'images/artists/artist106_work13.jpg', 'images/artists/artist106_work14.jpg', 'images/artists/artist106_work15.jpg', 'images/artists/artist106_work16.jpg', 'images/artists/artist106_work17.jpg', 'images/artists/artist106_work18.jpg', 'images/artists/artist106_work19.jpg', 'images/artists/artist106_work20.jpg'],
                tags: ['#手作', '#扭扭棒', '#发卡']
            },
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
    {
        id:109,
        name: '池恩',
        avatar: 'images/artists/artist109_avatar.jpg',
        bio: '手作娘',
        businessScope: '业务：手作',
        businesses: [
            {
                title: 'Q版不织布',
                priceRange: '￥25r+ - ￥65r+',
                description: '●大头：25r+&emsp;&emsp;&emsp;●半身：45r+&emsp;&emsp;&emsp;●全身：65r+\n●加急：x2&emsp;&emsp;&emsp;●工期：1-7天\n●以上均为自带图纸价，未拆分图需+1-6r\n●发货：满68包邮，偏远需补邮确认成品后发货<br></br>●付款方式：定金+尾款(非本人原因导致订单无法进行，定金收取后一概不退，一个制品定金18r)\n●流程：数量+18r定金排单-成品 -付尾款-打包 -寄出结束【成图出来当天，五天内没回复，定制商品（非oc制品）当现货掉落】\n●手工制作无法做到完全一致，默认微瑕，不同光线和场景下存在色差，以收到实物为准。完美主义者请绕道，不接柜子等争议大的作品',
                images: ['images/artists/artist109_work1.jpg'],
                tags: ['#手作', '#Q版手作', '#不织布']
            }
        ],
        social: {
            twitter: '#',
            behance: '#'
        }
    },
];