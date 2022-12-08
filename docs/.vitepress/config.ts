import { defineConfig, UserConfig } from 'vitepress'

const head: UserConfig['head'] = [
  ['link', { rel: 'icon', href: `/logo.png` }],
]

const config = defineConfig({
  markdown: {
    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%',
    },
  },

  lang: 'ko',
  title: 'Meteor.js 한글',
  description: '풀스택 node.js 프레임워크 Meteor.js로 비교할 수 없는 빠르게 훌륭한 앱 구축하기',
  head,
  // serviceWorker: true,

  lastUpdated: false,

  themeConfig: {
    logo: '/logo.png',

    editLink: {
      pattern: 'https://github.com/Meteor-Korea/Meteor-Korean-Documents/edit/main/docs/:path',
      text: '이 페이지 편집 제안하기'
    },

    lastUpdatedText: '마지막 수정일',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Meteor-Korea/Meteor-Korean-Documents' },
      { icon: 'slack', link: 'https://join.slack.com/t/meteor-community/shared_invite/enQtODA0NTU2Nzk5MTA3LWY5NGMxMWRjZDgzYWMyMTEyYTQ3MTcwZmU2YjM5MTY3MjJkZjQ0NWRjOGZlYmIxZjFlYTA5Mjg4OTk3ODRiOTc' }
    ],

    // carbonAds: {
    //   carbon: 'CEBICK3I',
    //   custom: 'CEBICK3M',
    //   placement: 'routervuejsorg',
    // },

    // algolia: {
    //   appId: 'BTNTW3I1XP',
    //   apiKey: '771d10c8c5cc48f7922f15048b4d931c',
    //   indexName: 'next_router_vuejs',
    //   // searchParameters: {
    //   //   facetFilters: ['tags:guide,api,migration'],
    //   // },
    // },

    nav: [
      {
        text: '공식 사이트',
        items: [
          {
            text: 'Meteor',
            link: 'https://www.meteor.com/',
          },
          {
            text: 'Blaze',
            link: 'https://www.blazejs.org/',
          },
          {
            text: 'Router',
            link: 'https://github.com/veliovgroup/flow-router',
          },
        ],
      },
      {
        text: '스타일 가이드',
        items: [
          {
            text: '스타일 가이드란?',
            link: '/styles/introduction.md',
          },
          {
            text: 'HTML 가이드',
            link: '/styles/html.md',
          },
          {
            text: 'Blaze 가이드',
            link: '/styles/blaze-spacebars.md',
          },
          {
            text: 'CSS 가이드',
            link: '/styles/css.md',
          },
          {
            text: 'JavaScript 가이드',
            link: '/styles/js.md',
          },
        ],
      },
      {
        text: '가이드',
        items: [
          {
            text: 'Meteor',
            link: '/meteor/guide/summary/introduction.md',
          },
          {
            text: 'Blaze',
            link: '/blaze/guide/summary/introduction.md',
          },
          // {
          //   text: 'Router',
          //   link: '/router/guide/summary/introduction.md',
          // },
        ]
      },
      {
        text: 'API',
        items: [
          {
            text: 'Meteor',
            link: '/meteor/api/core.md',
          },
          {
            text: 'Blaze',
            link: '/blaze/api/template-declarations.md',
          },
          {
            text: 'Router',
            link: '/router/api/core-methods.md',
          },
        ]
      },
      {
        text: '변경사항',
        items: [
          {
            text: 'Meteor',
            link: 'https://docs.meteor.com/changelog',
          },
          {
            text: 'Blaze',
            link: 'https://www.blazejs.org/changelog',
          },
          {
            text: 'Flow Router Extra',
            link: 'https://github.com/veliovgroup/flow-router/releases',
          },
        ]
      },
    ],

    sidebar: {
      '/meteor/guide/': [
        {
          text: 'Meteor 가이드',
          items: [
            {
              text: '시작하기',
              link: '/meteor/guide/summary/introduction.md',
            },
            {
              text: '프로젝트 구조',
              link: '/meteor/guide/summary/structure.md',
            },
          ],
        },
      ],
      '/blaze/guide/': [
        {
          text: 'Blaze',
          items: [
            {
              text: '소개',
              link: '/blaze/guide/summary/introduction.md',
            },
          ],
        },
        {
          text: 'Blaze 튜토리얼',
          items: [
            {
              text: '1. 템플릿 시작하기',
              link: '/blaze/guide/summary/spacebars-templates.md',
            },
            {
              text: '2. 헬퍼 사용하기',
              link: '/blaze/guide/summary/helpers.md',
            },
            {
              text: '3. 이벤트 사용하기',
              link: '/blaze/guide/summary/events.md',
            },
            {
              text: '4. 템플릿에 데이터 전달하기',
              link: '/blaze/guide/summary/blockArguments.md',
            },
            {
              text: '5. 상태 관리와 전역 헬퍼',
              link: '/blaze/guide/summary/state-globalHelpers.md',
            },
            {
              text: '6. 조건문',
              link: '/blaze/guide/summary/if-unless.md',
            },
            {
              text: '7. 반복문',
              link: '/blaze/guide/summary/each.md',
            },
          ],
        },
      ],

      '/meteor/api/': [
        {
          text: 'Meteor 기본 API',
          items: [
            {
              text: '코어',
              link: '/meteor/api/core.md'
            },
            {
              text: '서버 커넥션',
              link: '/meteor/api/server-connections.md'
            },
          ]
        },
      ],
      '/blaze/api/': [
        {
          text: 'Template API',
          items: [
            {
              text: '선언',
              link: '/blaze/api/template-declarations.md'
            },
            {
              text: '인스턴스',
              link: '/blaze/api/template-instances.md'
            },
            {
              text: '공통',
              link: '/blaze/api/template-common.md'
            },
            {
              text: '기타',
              link: '/blaze/api/template-etc.md'
            },
          ]
        },
        {
          text: 'Blaze API',
          items: [
            {
              text: '기본',
              link: '/blaze/api/spacebars-common.md'
            },
          ]
        },
        {
          text: 'Spacebars API',
          items: []
        }
      ],
      '/router/api/': [
        {
          text: 'API',
          items: [
            {
              text: '코어 메서드',
              link: '/router/api/core-methods.md'
            },
            {
              text: '훅(hooks)',
              link: '/router/api/hooks.md'
            },
            {
              text: '헬퍼',
              link: '/router/api/helpers.md'
            },
          ]
        },
      ],
    },

    footer: {
      message: 'Translated by niceplugin@gmail.com',
      copyright: 'MIT Licensed | Copyright © 2022-present niceplugin@gmail.com'
    },
  },
})

export default config
