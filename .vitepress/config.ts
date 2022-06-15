import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav = [
  {
    text: '문서',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: '가이드', link: '/guide/introduction' },
      { text: '튜토리얼', link: '/tutorial/' },
      { text: '예제', link: '/examples/' },
      { text: '시작하기', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      {
        text: 'Vue 2 문서',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Vue 2에서 마이그레이션',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: '온라인 연습장',
    link: 'https://sfc.vuejs.org'
  },
  {
    text: '생태계',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: '핵심 라이브러리',
        items: [
          { text: 'Vue 라우터', link: 'https://router.vuejs.org/' },
          { text: '피니아 (상태 관리)', link: 'https://pinia.vuejs.org/' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Sponsor', link: 'https://vuejs.org/sponsor/' },
          { text: 'Partners', link: 'https://vuejs.org/partners/' },
          { text: 'Themes', link: 'https://vuejs.org/ecosystem/themes' },
          { text: 'Jobs', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'T-Shirt Shop', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: '비디오 코스',
        items: [
          {
            text: 'Vue Mastery',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'Help',
        items: [
          {
            text: 'Discord Chat',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub Discussions',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV Community', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: '뉴스',
        items: [
          { text: 'Blog', link: 'https://blog.vuejs.org/' },
          { text: 'Twitter', link: 'https://twitter.com/vuejs' },
          { text: 'Newsletter', link: 'https://news.vuejs.org/' },
          { text: 'Events', link: 'https://events.vuejs.org/' }
        ]
      }
    ]
  },
  {
    text: 'About',
    activeMatch: `^/about/`,
    items: [
      { text: 'FAQ', link: '/about/faq' },
      { text: 'Team', link: 'https://vuejs.org/about/team' },
      { text: 'Releases', link: 'https://vuejs.org/about/releases' },
      {
        text: 'Community Guide',
        link: 'https://vuejs.org/about/community-guide'
      },
      { text: 'Code of Conduct', link: 'https://vuejs.org/about/coc' },
      {
        text: 'The Documentary',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
]

export const sidebar = {
  '/guide/': [
    {
      text: '시작하기',
      items: [
        { text: '소개', link: '/guide/introduction' },
        {
          text: '빠른 시작',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: '핵심 사항',
      items: [
        {
          text: '앱 생성',
          link: '/guide/essentials/application'
        },
        {
          text: '템플릿 문법',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: '반응형 기초',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: '계산된 속성',
          link: '/guide/essentials/computed'
        },
        {
          text: '클래스와 스타일 바인딩',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: '조건부 렌더링',
          link: '/guide/essentials/conditional'
        },
        { text: '리스트 렌더링', link: '/guide/essentials/list' },
        {
          text: '이벤트 핸들링',
          link: '/guide/essentials/event-handling'
        },
        { text: 'Form 입력 바인딩', link: '/guide/essentials/forms' },
        {
          text: '수명주기 훅',
          link: '/guide/essentials/lifecycle'
        },
        { text: '감시자', link: '/guide/essentials/watchers' },
        { text: '템플릿 참조', link: '/guide/essentials/template-refs' },
        {
          text: '컴포넌트 기초',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: '컴포넌트 심화',
      items: [
        {
          text: '등록',
          link: '/guide/components/registration'
        },
        { text: 'Props', link: '/guide/components/props' },
        { text: '이벤트', link: '/guide/components/events' },
        {
          text: '폴스루 속성',
          link: '/guide/components/attrs'
        },
        { text: '슬롯', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: '비동기 컴포넌트',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: '재사용성',
      items: [
        {
          text: '구성화',
          link: '/guide/reusability/composables'
        },
        {
          text: '커스텀 지시문',
          link: '/guide/reusability/custom-directives'
        },
        { text: '플러그인', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: '빌트인 컴포넌트',
      items: [
        { text: 'Transition', link: '/guide/built-ins/transition' },
        {
          text: 'TransitionGroup',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'KeepAlive', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: '확장하기',
      items: [
        { text: '싱글 파일 컴포넌트 (SFC)', link: '/guide/scaling-up/sfc' },
        { text: '툴', link: '/guide/scaling-up/tooling' },
        { text: '라우팅', link: '/guide/scaling-up/routing' },
        {
          text: '상태 관리',
          link: '/guide/scaling-up/state-management'
        },
        { text: '테스트', link: '/guide/scaling-up/testing' },
        {
          text: '서버 사이드 렌더링 (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: '모범 사례',
      items: [
        {
          text: '프로덕션 배포',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: '성능',
          link: '/guide/best-practices/performance'
        },
        {
          text: '접근성',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'Security',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'Overview', link: '/guide/typescript/overview' },
        {
          text: 'TS with Composition API',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'TS with Options API',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'Extra Topics',
      items: [
        {
          text: 'Ways of Using Vue',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'Composition API FAQ',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'Reactivity in Depth',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'Rendering Mechanism',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Render Functions & JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue and Web Components',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Animation Techniques',
          link: '/guide/extras/animation'
        },
        {
          text: 'Reactivity Transform',
          link: '/guide/extras/reactivity-transform'
        }
        // {
        //   text: 'Building a Library for Vue',
        //   link: '/guide/extras/building-a-library'
        // },
        // { text: 'Custom Renderers', link: '/guide/extras/custom-renderer' },
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/extras/vue-for-react-devs'
        // }
      ]
    }
  ],
  '/api/': [
    {
      text: 'Global API',
      items: [
        { text: 'Application', link: '/api/application' },
        {
          text: 'General',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Reactivity: Core',
          link: '/api/reactivity-core'
        },
        {
          text: 'Reactivity: Utilities',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reactivity: Advanced',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Lifecycle Hooks',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Dependency Injection',
          link: '/api/composition-api-dependency-injection'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Options: State', link: '/api/options-state' },
        { text: 'Options: Rendering', link: '/api/options-rendering' },
        {
          text: 'Options: Lifecycle',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Options: Composition',
          link: '/api/options-composition'
        },
        { text: 'Options: Misc', link: '/api/options-misc' },
        {
          text: 'Component Instance',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/api/built-in-directives' },
        { text: 'Components', link: '/api/built-in-components' },
        {
          text: 'Special Elements',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Special Attributes',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Single File Component',
      items: [
        { text: 'Syntax Specification', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS Features', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'Advanced APIs',
      items: [
        { text: 'Render Function', link: '/api/render-function' },
        { text: 'Server-Side Rendering', link: '/api/ssr' },
        { text: 'TypeScript Utility Types', link: '/api/utility-types' },
        { text: 'Custom Renderer', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Basic',
      items: [
        {
          text: 'Hello World',
          link: '/examples/#hello-world'
        },
        {
          text: 'Handling User Input',
          link: '/examples/#handling-input'
        },
        {
          text: 'Attribute Bindings',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Conditionals and Loops',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Form Bindings',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Simple Component',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Practical',
      items: [
        {
          text: 'Markdown Editor',
          link: '/examples/#markdown'
        },
        {
          text: 'Fetching Data',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Grid with Sort and Filter',
          link: '/examples/#grid'
        },
        {
          text: 'Tree View',
          link: '/examples/#tree'
        },
        {
          text: 'SVG Graph',
          link: '/examples/#svg'
        },
        {
          text: 'Modal with Transitions',
          link: '/examples/#modal'
        },
        {
          text: 'List with Transitions',
          link: '/examples/#list-transition'
        },
        {
          text: 'TodoMVC',
          link: '/examples/#todomvc'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs',
      items: [
        {
          text: 'Counter',
          link: '/examples/#counter'
        },
        {
          text: 'Temperature Converter',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Flight Booker',
          link: '/examples/#flight-booker'
        },
        {
          text: 'Timer',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'Circle Drawer',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'Cells',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'Style Guide',
      items: [
        {
          text: 'Overview',
          link: '/style-guide/'
        },
        {
          text: 'A - Essential',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B - Strongly Recommended',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C - Recommended',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D - Use with Caution',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],
  scrollOffset: 'header',

  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://sponsors.vuejs.org'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      { icon: 'languages', link: '/translations/' },
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    // editLink: {
    //   repo: 'niceplugin/vue3-docs-ko',
    //   text: 'GitHub에서 이 페이지 편집'
    // },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
