import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'jj-design',
    nav: [],
    sidebar: {
      '/components': [
        {
          title: '用户输入',
          children: [
            {
              title: 'upload 上传',
              link: '/components/upload'
            }
          ]

        }
      ]
    }
  },
});
