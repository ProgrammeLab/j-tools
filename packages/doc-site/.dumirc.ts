import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'jj-design',
    nav: [],
    sidebar: {
      '/components': [
        {
          title: '数据展示',
          children: [
            {
              title: 'VirtualList 虚拟列表',
              link: '/components/virtual-list',
            },
          ],
        },
        {
          title: '用户输入',
          children: [
            {
              title: 'Upload 上传',
              link: '/components/upload',
            },
          ],
        },
        {
          title: '其他',
          children: [
            {
              title: 'WaterMark 水印',
              link: '/components/water-mark',
            },
          ],
        },
      ],
    },
  },
});
