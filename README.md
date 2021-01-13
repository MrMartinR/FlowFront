[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg)](https://gitmoji.dev)

<br>

<img src="./docs/frontend.svg">

<br>

## Table of Contents

  - [About The Project](#about-the-project)
  - [Getting Started](#getting-started)
  - [Contributing](#contributing)
  - [Technologies](#technologies)
  - [Other Tools](#other-tools)


<br>
<br>

# About The Project

This project implements a finance management application to track investments, personal finance, budget, retirements, Financial Independence Retire Early movement FIRE, all stuff related to Personal Finance. 

## Background Information

When a business or an individual is in need of a loan, they reach out to loan originator. In most case, the loan originator does not have the money to give to this client. So, what the loan originator does is to float the loan and allow investors to fund it. The floating or display of a loan that need funding is done on a platform. Sometimes, the loan originator have their own platform.
Now, the investor does not just invest in one platform but in multiple platforms and at times with different loan originator on the same platform (now referred to as a market place as it has more that one loan originator). These bring us to our application, `Flow`, an investment management application.

Using Flow, an investor is able to take the information `after` investing in a platform and add it to our application for easier management. In the past, the investor would have numerous excel files that stored this data which is messy, not easily accessible and does not have that good user experience with tools such as sort, classify by, just ready available to them; so Flow.


<br>


# Getting Started


## Package Manager 
[<img src="./docs/yarn.svg" width="60px" title="Yarn">](https://yarnpkg.com)
 Use [Yarn](https://yarnpkg.com) as a packager manager application. 

macOS via [Homebrew](http://brew.sh/)
```shell
brew install yarn
```

Debian/Ubuntu

```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
```
```shell
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

<br>

## Cloning the Repo

The default branch of this project is the `dev` branch. In a case you want to open a PR, it should be opened to merge into the `dev branch`.

```Shell
your@pc:~$ git clone https://github.com/FlowFintech/FlowFront -b dev
```

```Shell
your@pc:~$ cd FlowFront
```

Install all dependencies

```Shell
yarn install
```

While the [Backend](https://github.com/FlowFintech/FlowBack) server is alrealdy running, start the server for the frontend.

```Shell
yarn start
```
<br>

## <img src="./docs/github.svg" width="30px" title="TypeScript"> [GitHub Desktop](https://desktop.github.com)
Alternatively, you can use GitHub Desktop for Windows and macOS for deal with the repos.

<br>

>The Backend is built on Ruby on Rails, you need to have the server running, refer to the [BackEnd Documentation on GitHub](https://github.com/FlowFintech/FlowBack) to set the backend environment.

<br>

# Contributing

Depending on whether your implementing a **feature**, doing a  **chore**,  fixing **bugs** or a **hotfix**, you must use the following branches naming convention: {type/short-description}
*Example*
```shell
git checkout -b bug/fixing-layout
git checkout -b feature/adding-loan-details
git checkout -b chore/correct-typo
git checkout -b hotfix/refactor-jbuilder
```


>Your feature/bug branch should be requested to merge into the `dev` branch and upon approval and merging of the PR, the branch should be deleted.

<br>

### **Important**: Do not install any dependency, if you feel you miss some library, create a discussion thread in #frontend channel in Slack


<br>

# Technologies

## <img src="./docs/typescript.svg" width="30px" title="TypeScript"> [TypeScript](https://www.typescriptlang.org)
We use TypeScript as a default format using the extension `tsx`. 
#####  Transpiler | JavaScript Superset | Code Analysis

 * 📄 [Documentation](https://www.typescriptlang.org/docs)
 * 🚦 [StyleGuide](docs/StyleGuide-React-TypeScript.md)
 * 🎓 Resources
    >[Conventions](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md)

     >[TypeScript with React](https://www.typescriptlang.org/play?jsx=2&esModuleInterop=true&q=390#example/typescript-with-react)
     
     >[React Typescript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)

     >[Course TypeScript React](https://egghead.io/courses/use-typescript-to-develop-react-applications)

     >[React Components Patterns with TypeScript](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)


<br>

## <img src="./docs/react.svg" width="30px" title="React"> [React](https://reactjs.org/docs/getting-started.html)

 * 📄 [Documentation](https://reactjs.org/docs/getting-started.html)
 * 🚦 [StyleGuide](docs/StyleGuide-React-TypeScript.md)
 * 🎓 Resources
    >[React Router DOM](https://reactrouter.com/web/guides/quick-start) (Router)

   > [React Hook Form](https://react-hook-form.com) (Forms)

   >[Learn React For Beginners 2020 / 2021](https://www.youtube.com/watch?v=OH4msPNM2CI&list=PLQg6GaokU5CyvExiaMgXP_BS5WWNBfZJN)


<br>

## <img src="./docs/redux.svg" width="30px" title="Redux"> [Redux](https://redux.js.org/api/api-reference)
##### Application State Manager

 * 📄 [Documentation](https://redux.js.org/api/api-reference)
 * 🚦 [StyleGuide](https://redux.js.org/style-guide/style-guide)
 * 🎓 Resources
    >[React-Redux](https://react-redux.js.org/api/connect)


<br>

## <img src="./docs/sass.svg" width="30px" title="Dart JS SASS"> [Dart JS • SASS](https://sass-lang.com)
##### CSS Preprocessor | Syntax SCSS
 * 📄 [Documentation](https://sass-lang.com/documentation)
 * 🚦 [StyleGuide](docs/StyleGuide-React.md)

<br>

## <img src="./docs/material-ui.svg" width="30px" title="Material-UI"> [Material-UI](https://material-ui.com)
##### Material-UI is the most popular React UI component library, has a lot of prebuilt React components, which can help you create React apps in no time.

 * 📄 [Documentation](https://material-ui.com)
  * 🎓 Resources
    >[Material UI](https://www.youtube.com/playlist?list=PLQg6GaokU5CwiVmsZ0d_9Zsg_DnIP_xwr)


<br>

### For a full list of Libraries used in Flow refer to [this document](https://github.com/FlowFintech/FlowFront/blob/docs/Dependencies.md)

<br>

```
If you find some content, docs, videos, etc. that can be interesting, feel free to add the links to this document.
```

<br>

## Other Tools

> [Trello](https://trello.com/b/CLQSqEKd/flow)
This is a Kanban board we use to assign and track the development task.

> [Slack](https://slack.com/)
Were we disscuss and chat about the project.

> [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
Extension for chrome to see the component structure, very useful for debugin React. (You must allow access to file URLs on Extension Settings)

> [Postman](https://www.postman.com)
Postman is a collaboration platform for API development. You can find the [postman collection file here](./docs/Flow_API_v1.postman_collection.json)


> [VisualStudio Code](https://code.visualstudio.com)
Shared settings.json file configuration on .vscode root folder
"Note: Workspace settings are useful for sharing project specific settings across a team."

* > [Prettier ](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) Code formatter using prettier

* > [Material-UI Snippets](https://marketplace.visualstudio.com/items?itemName=vscodeshift.material-ui-snippets) Code snippets for Material-UI

* > [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets) Dead simple React snippets you will



<br>



