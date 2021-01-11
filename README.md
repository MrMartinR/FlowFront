[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg)](https://gitmoji.dev)

  <h1 align="center">Flow FrontEnd</h1>


<!-- ABOUT THE PROJECT -->

## About The Project

This project implements an investment management application to track investments, personal finance, budget, retirements, Financial Independence Retire Early movement FIRE, all stuff related to Personal Finance. Here is a link to the [backend API](https://github.com/FlowFintech/FlowBack)

### Background information

When a business or an individual is in need of a loan, they reach out to loan originator. In most case, the loan originator does not have the money to give to this client. So, what the loan originator does is to float the loan and allow investors to fund it. The floating or display of a loan that need funding is done on a platform. Sometimes, the loan originator have their own platform.
Now, the investor does not just invest in one platform but in multiple platforms and at times with different loan originator on the same platform (now referred to as a market place as it has more that one loan originator). These bring us to our application, `Flow`, an investment management application.

Using Flow, an investor is able to take the information `after` investing in a platform and add it to our application for easier management. In the past, the investor would have numerous excel files that stored this data which is messy, not easily accessible and does not have that good user experience with tools such as sort, classify by, just ready available to them; so Flow.


## Technologies used

TypeScript

React

Redux

Material UI

## Usage/Getting started

The default branch of this project is the `release` branch. However, ensure to clone the master branch of the project and all other `features` branches can branch out of the `master`. Suffice to say in a case you want to open a PR, it should be opened to merge into the `master branch`.

Clone the reposistory

```Shell
your@pc:~$ git clone https://github.com/FlowFintech/FlowFront -b master
```

```Shell
your@pc:~$ cd FlowFront
```

Install all dependencies

```Shell
yarn install
```

While the [backend](https://github.com/FlowFintech/FlowBack) server is alrealdy running, start the server

```Shell
yarn start
```

## Contributing

Depending on whether your implementing a feature or fixing a bug, we'll like to have a naming convention to how these branches are being named:

Please stick to the naming format `feature/branch-name` or `bug/bugname-fixed` for a feature and bug fixes branch respectively. Your feature/bug branch should be requested to merge into the `master` branch and upon approval and merging of the PR, the feature/bug  branch should be deleted.


## Style Guides (Read)

#### [SASS](docs/StyleGuide-React.md)

#### [React/TypeScript](docs/StyleGuide-React-TypeScript.md)

#### [Redux](https://redux.js.org/style-guide/style-guide)


## Libraries

#### [Material-UI](https://material-ui.com)
* Material-UI is the most popular React UI component library, has a lot of prebuilt React components, which can help you create React apps in no time.
Unlike Ant Design, Material-UI offers built-in methods to style components. makeStyles() is useful, especially when your code starts to get big; it helps you find the element to style more quickly and makes the code more readable. The downside is that readability may degrade as a component grows. But overall, Material-UI is a strong, highly customizable library.

####  [Dart JS • SASS](https://sass-lang.com/documentation) (CSS Preprocessor | Syntax SCSS)

#### [React](https://reactjs.org/docs/getting-started.html)

#### [Redux API Reference](https://redux.js.org/api/api-reference) (Application State Manager)

#### [React-Redux API Reference](https://react-redux.js.org/api/connect)

#### [TypeScript](https://www.typescriptlang.org/docs) (Transpiler | JavaScript Superset | Code Analysis)
**Use TypeScript in STRICT MODE**
* [Conventions](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md)
* [TypeScript with React](https://www.typescriptlang.org/play?jsx=2&esModuleInterop=true&q=390#example/typescript-with-react)
* [React Typescript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)
* [Course TypeScript React](https://egghead.io/courses/use-typescript-to-develop-react-applications)
* [React Components Patterns with TypeScript](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)

#### [ESLint](https://eslint.org) (Linter)

#### [Prettier](https://prettier.io) (Code Formater)

#### [React Router DOM](https://reactrouter.com/web/guides/quick-start) (Router)

#### [React Hook Form](https://react-hook-form.com) (Forms)

#### [Yup](https://github.com/jquense/yup) (Validator) 
* Yup it is a declarative validation schema that provides chainable functions with pretty staggering capabilities.

#### [perfect-scrollbar](https://github.com/mdbootstrap/perfect-scrollbar) (ScrolBar) (ToDo)
* [comparison](https://www.npmtrends.com/better-scroll-vs-effector-vs-iscroll-vs-perfect-scrollbar-vs-react-scroll-vs-react-custom-scrollbars)


## Utilities

#### React Developer Tools [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
(You must allow access to file URLs on Extension Settings)

#### [VisualStudio Code](https://code.visualstudio.com)
Shared settings.json file configuration on .vscode root folder
"Note: Workspace settings are useful for sharing project specific settings across a team."

### [Dependencies](https://github.com/FlowFintech/FlowFront/blob/readme-documentation-updates/DEPENDENCIES.md)