[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg)](https://gitmoji.dev)

# Flow Front End
---

# Style Guides (Read)

### [SASS](docs/StyleGuide-React.md)

### [React](docs/StyleGuide-React.md)

### [Redux](https://redux.js.org/style-guide/style-guide)


# Libraries

### [Material-UI](https://material-ui.com)
* Material-UI is the most popular React UI component library, has a lot of prebuilt React components, which can help you create React apps in no time.
Unlike Ant Design, Material-UI offers built-in methods to style components. makeStyles() is useful, especially when your code starts to get big; it helps you find the element to style more quickly and makes the code more readable. The downside is that readability may degrade as a component grows. But overall, Material-UI is a strong, highly customizable library.

### [Dart JS • SASS](https://sass-lang.com/documentation) (CSS Preprocessor | Syntax SCSS)

### [React](https://reactjs.org/docs/getting-started.html)

### [Redux API Reference](https://redux.js.org/api/api-reference) (Application State Manager)

### [React-Redux API Reference](https://react-redux.js.org/api/connect)

### [TypeScript](https://www.typescriptlang.org/docs) (Transpiler | JavaScript Superset | Code Analysis)
**Use TypeScript in STRICT MODE**
* [Conventions](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md)
* [TypeScript with React](https://www.typescriptlang.org/play?jsx=2&esModuleInterop=true&q=390#example/typescript-with-react)
* [React Typescript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)
* [Course TypeScript React](https://egghead.io/courses/use-typescript-to-develop-react-applications)
* [React Components Patterns with TypeScript](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)

### [ESLint](https://eslint.org) (Linter)

### [Prettier](https://prettier.io) (Code Formater)

### [React Router DOM](https://reactrouter.com/web/guides/quick-start) (Router)

### [React Hook Form](https://react-hook-form.com) (Forms)

### [Yup](https://github.com/jquense/yup) (Validator) 
* Yup it is a declarative validation schema that provides chainable functions with pretty staggering capabilities.

### [perfect-scrollbar](https://github.com/mdbootstrap/perfect-scrollbar) (ScrolBar) (ToDo)
* [comparison](https://www.npmtrends.com/better-scroll-vs-effector-vs-iscroll-vs-perfect-scrollbar-vs-react-scroll-vs-react-custom-scrollbars)


# Utilities

### React Developer Tools [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
(You must allow access to file URLs on Extension Settings)

### [VisualStudio Code](https://code.visualstudio.com)
Shared settings.json file configuration on .vscode root folder
"Note: Workspace settings are useful for sharing project specific settings across a team."

# Dependencies
Tip: To see a dependency tree visit [Anvaka](https://npm.anvaka.com)


## Production
* [@formatjs/intl-relativetimeformat](https://github.com/formatjs/formatjs) The monorepo home to all of the FormatJS related libraries, most notably react-intl.
* [@manaflair/redux-batch](https://github.com/manaflair/redux-batch) Enhance your Redux store to support batched actions
* [@material-ui](https://github.com/mui-org/material-ui) React components for faster and simpler web development. Build your own design system, or start with Material Design.
  * [@material-ui/core]
   * [@material-ui/icons]
   * [@material-ui/lab]
   * [@material-ui/pickers]
   * [@material-ui/styles]
   * [@material-ui/x-grid](https://github.com/mui-org/material-ui-x) The Material-UI eXtension with advanced components for a richer eXperience.
   * [@material-ui/x-license](https://github.com/mui-org/material-ui-x/tree/master/packages/x-license) Dependency of @material-ui/x-grid
* [@reduxjs/toolkit](https://github.com/reduxjs/redux-toolkit) The official, opinionated, batteries-included toolset for efficient Redux development
* [@tanem/svg-injector](https://github.com/tanem/svg-injector) Fast, caching, dynamic inline SVG DOM injection library.
* [axios](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js
* [clipboard-copy](https://github.com/feross/clipboard-copy) Lightweight copy to clipboard for the web
* [clsx](https://github.com/lukeed/clsx) A tiny utility for constructing className strings conditionally.
* [css-box-model](https://github.com/alexreardon/css-box-model#readme) Get accurate and well named css box model information about an Element
* [date-fns]()
* [eslint-config-react-app]()
* [esm]() The world’s most advanced ECMAScript module loader. This fast, production ready, zero dependency loader is all you need to support ECMAScript modules in Node 6+.
* [formik]()
* [lodash]()
* [material-ui-popup-state]()
* [object-path]()
* [perfect-scrollbar]()
* [prop-types]()
* [query-string]()
* [raf-schd]()
* [react]()
* [react-beautiful-dnd]()
* [react-bootstrap]()
* [react-bootstrap-table-next]()
* [react-bootstrap-table2-paginator]()
* [react-datepicker]()
* [react-dom]()
* [react-draggable]()
* [react-inlinesvg]()
* [react-intl]() This library is one of the most popular solutions for i18n in React and it’s now part of Formatjs. Offered by Yahoo is bundled with common locale data like dates, currencies, numbers, and support for over  150+ languages. It builds upon the concepts of the ECMAScript’s ECMAScript’s Internationalization API namespace.
* [react-is]()
* [react-portal]()
* [react-redux]()
* [react-router]()
* [react-router-dom]()
* [react-scripts]()
* [react-select]()
* [react-virtualized]()
* [redux]()
* [redux-persist]()
* [redux-saga]()
* [sass]()
* [serve-static]()
* [use-memo-one]()
* [yup]()

Dependencies extra added for Kaban-Trello
info Direct dependencies
└─ react-trello@2.2.9
info All dependencies
├─ @emotion/is-prop-valid@0.8.8
├─ autosize@4.0.2
├─ camelize@1.0.0
├─ css-color-keywords@1.0.0
├─ css-to-react-native@3.0.0
├─ deep-diff@0.3.8
├─ immutability-helper@2.9.1
├─ just-curry-it@3.1.0
├─ react-popopo@2.1.9
├─ react-trello@2.2.9
├─ reduce-reducers@0.4.3
├─ redux-actions@2.6.5
├─ redux-logger@3.0.6
├─ shallowequal@1.1.0
├─ to-camel-case@1.0.0
├─ to-no-case@1.0.2
├─ to-space-case@1.0.0
└─ trello-smooth-dnd@1.0.0
└─ styled-components@5.2.1

## Development

* [@types/jest]()
* [@types/node]()
* [@types/object-path]()
* [@types/react]()
* [@types/react-beautiful-dnd]()
* [@types/react-dom]()
* [@types/react-is]()
* [@types/react-redux]()
* [@types/react-router-dom]()
* [@typescript-eslint/eslint-plugin]()
* [@typescript-eslint/parser]()
* [babel-eslint]()
* [eslint]()
* [eslint-config-airbnb]()
* [eslint-plugin-flowtype]()
* [eslint-plugin-import]()
* [eslint-plugin-jsx-a11y]()
* [eslint-plugin-react]()
* [eslint-plugin-react-hooks]()
* [typescript]()
* [webpack-cli]()
* [webpack-messages]()
