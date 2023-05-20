import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: `../../docs`,
  themeConfig: {
    name: 'jj-design',
    nav: [],
    sidebar: {
      '/components': [
        {
          title: '基础组件',
          children: [
            {
              title: 'Button 按钮',
              link: '/components/button',
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
          title: '数据展示',
          children: [{ title: 'Tabs', link: '/components/tabs' }],
        },
        {
          title: '其他',
          children: [
            {
              title: 'WaterMark 水印',
              link: '/components/water-mark',
            },
            {
              title: 'Transition 动效',
              link: '/components/transition',
            },
          ],
        },
      ],
    },
  },
});
