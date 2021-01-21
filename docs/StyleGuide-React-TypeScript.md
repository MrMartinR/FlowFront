
# React TypeScript Style Guide

## Table of Contents

  1. [Basic Rules](#basic-rules)
  1. [Class vs `React.createClass` vs stateless](#class-vs-reactcreateclass-vs-stateless)
  1. [Div vs Fragment](#div-vs-fragment)
  1. [Mixins](#mixins)
  1. [Naming](#naming)
  1. [`type` vs `interface`](#type-vs-interface)
  1. [`null` vs. `undefined`](#null-vs-undefined)
  1. [Declaration](#declaration)
  1. [Alignment](#alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Semicolons](#semicolons)
  1. [Annotate Arrays as `Type[]`](#array)
  1. [Props](#props)
  1. [Refs](#refs)
  1. [Parentheses](#parentheses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Ordering](#ordering)
  1. [`isMounted`](#ismounted)

## Basic Rules

  - Only include one React component per file.
    - However, multiple [Stateless, or Pure, Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) are allowed per file. 
  - Always use TSX syntax.
  - Do not use `React.createElement` unless you’re initializing the app from a file that is not TSX.
  - [`react/forbid-prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md) will allow `arrays` and `objects` only if it is explicitly noted what `array` and `object` contains, using `arrayOf`, `objectOf`, or `shape`.


## Class vs `React.createClass` vs stateless

  - If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass`. 

    ```tsx
    // bad
    const Listing = React.createClass({
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    });

    // good
    class Listing extends React.Component {
      // ...
      render() {
        return <div>{this.state.hello}</div>;
      }
    }
    ```

    And if you don’t have state or refs, prefer normal functions (not arrow functions) over classes:

    ```tsx
    // bad
    class Listing extends React.Component {
      render() {
        return <div>{this.props.hello}</div>;
      }
    }

    // bad (relying on function name inference is discouraged)
    const Listing = ({ hello }) => (
      <div>{hello}</div>
    );

    // good
    function Listing({ hello }) {
      return <div>{hello}</div>;
    }
    ```
    
## Div vs Fragment
  - Use [Fragments](https://reactjs.org/docs/fragments.html) instead of Div

## Mixins

  - [Do not use mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).


## Naming

  - **Directories**: 
    - Normal Directoires: Use `kebab-case`. 
    - Component Directories: Use `CamelCase`.
  - **Extensions**: Use `.tsx` extension for React components and files with JSX content, and `ts` for pure TypeScipt files.
  - **Filenames**: 
    - Use PascalCase for Components. E.g., `LoanDetails.tsx`.
    - Use camelCase for ts functions. E.g. `myControl.ts`, `utils.ts`
    > We will use camelCase for acronyms that are more than 2 characters, UPPERCASE for the rest

    ```
    // bad
    HTMLTag

    // good
    htmlTag

    // good
    sourceIO

    // bad
    ActionsCRUD

    // good
    actionsCrud

    ```

  - **Reference Naming**: Use PascalCase for React components and camelCase for their instances.


    ```tsx
    // bad
    import loanDetails from './LoanDetails'

    // good
    import LoanDetails from './LoanDetails'

    // bad
    const LoanItem = <LoanDetails />

    // good
    const loanItem = <LoanDetails />
    ```

  - **Component Naming**: Use the filename as the component name. For example, `LoanDetails.tsx` should have a reference name of `LoanDetails`. However, for root components of a directory, use `index.tsx` as the filename and use the directory name as the component name:

    ```tsx
    // bad
    import Footer from './Footer/Footer'

    // bad
    import Footer from './Footer/index'

    // good
    import Footer from './Footer'
    ```

  - **Higher-order Component Naming**: Use a composite of the higher-order component’s name and the passed-in component’s name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.

    ```tsx
    // bad
    export default function withFoo(WrappedComponent) {
      return function WithFoo(props) {
        return <WrappedComponent {...props} foo />;
      }
    }

    // good
    export default function withFoo(WrappedComponent) {
      function WithFoo(props) {
        return <WrappedComponent {...props} foo />;
      }

      const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

      WithFoo.displayName = `withFoo(${wrappedComponentName})`;
      return WithFoo;
    }
    ```

  - **Props Naming**: Avoid using DOM component prop names for different purposes.

    ```tsx
    // bad
    <MyComponent style="fancy" />

    // bad
    <MyComponent className="fancy" />

    // good
    <MyComponent variant="fancy" />
    ```

  - **Variable and Function**: Use `camelCase` for variable and function names

    **Bad**
    ```tsx
    var FooVar;
    function BarFunc() { }
    ```
    **Good**
    ```tsx
    var fooVar;
    function barFunc() { }
    ```

- **Class**
    - Use `PascalCase` for class names.

    **Bad**
    ```tsx
    class foo { }
    ```
    **Good**
    ```tsx
    class Foo { }
    ```
    - Use `camelCase` of class members and methods

    *Bad*
    ```ts
    class Foo {
        Bar: number;
        Baz() { }
    }
    ```
    *Good*
    ```ts
    class Foo {
        bar: number;
        baz() { }
    }
    ```

- **Interface**
(* Use `interface` ONLY when you want `extends` or `implements`)
  * Use `PascalCase` for name.

  * Use `camelCase` for members.

  * Don't prefix with `I`

  *Bad*
  ```tsx
  interface IFoo {
  }
  ```
  *Good*
  ```tsx
  interface Foo {
  }
  ```

- **Type**

  * Use `PascalCase` for name.

  * Use `camelCase` for members.


- **Namespace**: Use `PascalCase` for names

    *Bad*
    ```ts
    namespace foo {
    }
    ```
    *Good*
    ```ts
    namespace Foo {
    }
    ```

- **Enum**

    * Use `PascalCase` for enum names

    *Bad*
    ```ts
    enum color {
    }
    ```
    *Good*
    ```ts
    enum Color {
    }
    ```

    * Use `PascalCase` for enum member

    *Bad*
    ```tsx
    enum Color {
        red
    }
    ```
    *Good*
    ```tsx
    enum Color {
        Red
    }
    ```


## Type vs. Interface
<!-- Remove spaces in the brackets?? -->
* Use `type` AS DEFAULT option and when you *might* need a union or intersection:

```
type Foo = number | { someProperty: number }
```
* Use `interface` ONLY when you want `extends` or `implements` e.g.

```
interface Foo {
  foo: string;
}
interface FooBar extends Foo {
  bar: string;
}
class X implements FooBar {
  foo: string;
  bar: string;
}
```



## Null vs. Undefined

* Prefer not to use either for explicit unavailability

    *Bad*
    ```tsx
    let foo = { x: 123, y: undefined }
    ```
    *Good*
    ```tsx
    let foo: { x: number, y?: number } = { x:123 }
    ```

* Use `undefined` in general (do consider returning an object like `{valid:boolean, value?:Foo}` instead)

    **Bad**
    ```tsx
    return null
    ```
    **Good**
    ```tsx
    return undefined
    ```

* Use `null` where it's a part of the API or conventional

    *Bad*
    ```tsx
    cb(undefined)
    ```
    *Good*
    ```tsx
    cb(null)
    ```


* Use *truthy* check for **objects** being `null` or `undefined`
    *Bad*
    ```tsx
    if (error === null)
    ```
    *Good*
    ```tsx
    if (error)
    ```

* Use `== null` / `!= null` (not `===` / `!==`) to check for `null` / `undefined` on primitives as it works for both `null`/`undefined` but not other falsy values (like `''`, `0`, `false`) e.g.

    *Bad*
    ```tsx
    if (error !== null) // does not rule out undefined
    ```
    *Good*
    ```tsx
    if (error != null) // rules out both null and undefined
    ```


## Declaration

  - Do not use `displayName` for naming components. Instead, name the component by reference.

    ```tsx
    // bad
    export default React.createClass({
      displayName: 'LoanDetails',
      // stuff goes here
    });

    // good
    export default class LoanDetails extends React.Component {
    }
    ```

## Alignment

  - Follow these alignment styles for TSX syntax. 

    ```tsx
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />

    // if props fit in one line then keep it on the same line
    <Foo bar="bar" />

    // children get indented normally
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    >
      <Quux />
    </Foo>

    // bad
    {showButton &&
      <Button />
    }

    // bad
    {
      showButton &&
        <Button />
    }

    // good
    {showButton && (
      <Button />
    )}

    // good
    {showButton && <Button />}

    // good
    {someReallyLongConditional
      && anotherLongConditional
      && (
        <Foo
          superLongParam="bar"
          anotherSuperLongParam="baz"
        />
      )
    }

    // good
    {someConditional ? (
      <Foo />
    ) : (
      <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
      />
    )}
    ```

## Quotes

* Prefer single quotes (`'`) unless escaping.
* When you can't use double quotes, try using back ticks (\`).


## Spacing

  - Always include a single space in your self-closing tag.

    ```tsx
    // bad
    <Foo/>

    // very bad
    <Foo                 />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```

  - Do not pad TSX curly braces with spaces.

    ```tsx
    // bad
    <Foo bar={ baz } />

    // good
    <Foo bar={baz} />
    ```
  
  - Indentation: Use `2` spaces (AKA soft tabs). Not tabs.


## Semicolons

* Do Not Use semicolons to end lines.

## Array

* Annotate arrays as `foos: Foo[]` instead of `foos: Array<Foo>`.


## Props

  - Always use camelCase for prop names, or PascalCase if the prop value is a React component.

    ```tsx
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
      Component={SomeComponent}
    />
    ```

  - Omit the value of the prop when it is explicitly `true`.

    ```tsx
    // bad
    <Foo
      hidden={true}
    />

    // good
    <Foo
      hidden
    />

    // good
    <Foo hidden />
    ```

  - Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`.

    ```tsx
    // bad
    <img src="hello.jpg" />

    // good
    <img src="hello.jpg" alt="Me waving hello" />

    // good
    <img src="hello.jpg" alt="" />

    // good
    <img src="hello.jpg" role="presentation" />
    ```

  - Do not use words like "image", "photo", or "picture" in `<img>` `alt` props.

    ```tsx
    // bad
    <img src="hello.jpg" alt="Picture of me waving hello" />

    // good
    <img src="hello.jpg" alt="Me waving hello" />
    ```

  - Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/#usage_intro).

    ```tsx
    // bad - not an ARIA role
    <div role="datepicker" />

    // bad - abstract ARIA role
    <div role="range" />

    // good
    <div role="button" />
    ```

  - Do not use `accessKey` on elements. 

      ```tsx
      // bad
      <div accessKey="h" />

      // good
      <div />
      ```

  - Avoid using an array index as `key` prop, prefer a stable ID. 
We don’t recommend using indexes for keys if the order of items may change.

      ```tsx
      // bad
      {todos.map((todo, index) =>
        <Todo
          {...todo}
          key={index}
        />
      )}

      // good
      {todos.map(todo => (
        <Todo
          {...todo}
          key={todo.id}
        />
      ))}
      ```

  - Always define explicit defaultProps for all non-required props.

      ```tsx
      // bad
      function SFC({ foo, bar, children }) {
        return <div>{foo}{bar}{children}</div>;
      }
      SFC.propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
      };

      // good
      function SFC({ foo, bar, children }) {
        return <div>{foo}{bar}{children}</div>;
      }
      SFC.propTypes = {
        foo: PropTypes.number.isRequired,
        bar: PropTypes.string,
        children: PropTypes.node,
      };
      SFC.defaultProps = {
        bar: '',
        children: null,
      };
      ```

  - Use spread props sparingly.

      Exceptions:

    - HOCs that proxy down props and hoist propTypes

      ```tsx
      function HOC(WrappedComponent) {
        return class Proxy extends React.Component {
          Proxy.propTypes = {
            text: PropTypes.string,
            isLoading: PropTypes.bool
          };

          render() {
            return <WrappedComponent {...this.props} />
          }
        }
      }
      ```

    - Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct.

      ```tsx
      export default function Foo {
        const props = {
          text: '',
          isPublished: false
        }

        return (<div {...props} />);
      }
      ```

      Notes for use:
      Filter out unnecessary props when possible. Also, use [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

      ```tsx
      // bad
      render() {
        const { irrelevantProp, ...relevantProps } = this.props;
        return <WrappedComponent {...this.props} />
      }

      // good
      render() {
        const { irrelevantProp, ...relevantProps } = this.props;
        return <WrappedComponent {...relevantProps} />
      }
      ```

## Refs

  - Always use ref callbacks.

    ```tsx
    // bad
    <Foo
      ref="myRef"
    />

    // good
    <Foo
      ref={(ref) => { this.myRef = ref; }}
    />
    ```

## Parentheses

  - Wrap JSX tags in parentheses when they span more than one line.

    ```tsx
    // bad
    render() {
      return <MyComponent variant="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent variant="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

## Tags

  - Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

    ```tsx
    // bad
    <Foo variant="stuff"></Foo>

    // good
    <Foo variant="stuff" />
    ```

  - If your component has multiline properties, close its tag on a new line.

    ```tsx
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```

## Methods

  - Use arrow functions to close over local variables. It is handy when you need to pass additional data to an event handler. Although, make sure they [do not massively hurt performance](https://www.bignerdranch.com/blog/choosing-the-best-approach-for-react-event-handlers/), in particular when passed to custom components that might be PureComponents, because they will trigger a possibly needless rerender every time.

    ```tsx
    function ItemList(props) {
      return (
        <ul>
          {props.items.map((item, index) => (
            <Item
              key={item.key}
              onClick={(event) => { doSomethingWith(event, item.name, index); }}
            />
          ))}
        </ul>
      );
    }
    ```

  - Bind event handlers for the render method in the constructor. 

    ```tsx
    // bad
    class extends React.Component {
      onClickDiv() {
        // do stuff
      }

      render() {
        return <div onClick={this.onClickDiv.bind(this)} />;
      }
    }

    // very bad
    class extends React.Component {
      onClickDiv = () => {
        // do stuff
      }

      render() {
        return <div onClick={this.onClickDiv} />
      }
    }

    // good
    class extends React.Component {
      constructor(props) {
        super(props);

        this.onClickDiv = this.onClickDiv.bind(this);
      }

      onClickDiv() {
        // do stuff
      }

      render() {
        return <div onClick={this.onClickDiv} />;
      }
    }
    ```

  - Do not use underscore prefix for internal methods of a React component.

    ```tsx
    // bad
    React.createClass({
      _onClickSubmit() {
        // do stuff
      },

      // other stuff
    });

    // good
    class extends React.Component {
      onClickSubmit() {
        // do stuff
      }

      // other stuff
    }
    ```

  - Be sure to return a value in your `render` methods. 

    ```tsx
    // bad
    render() {
      (<div />);
    }

    // good
    render() {
      return (<div />);
    }
    ```

## Ordering

  - Ordering for `class extends React.Component`:

    1. optional `static` methods
    1. `constructor`
    1. `getChildContext`
    1. `componentWillMount`
    1. `componentDidMount`
    1. `componentWillReceiveProps`
    1. `shouldComponentUpdate`
    1. `componentWillUpdate`
    1. `componentDidUpdate`
    1. `componentWillUnmount`
    1. *event handlers starting with 'handle'* like `handleSubmit()` or `handleChangeDescription()`
    1. *event handlers starting with 'on'* like `onClickSubmit()` or `onChangeDescription()`
    1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
    1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
    1. `render`

  - How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

    ```tsx
    import React from 'react'
    import PropTypes from 'prop-types'

    const propTypes = {
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string,
    };

    const defaultProps = {
      text: 'Hello World',
    };

    class Link extends React.Component {
      static methodsAreOk() {
        return true;
      }

      render() {
        return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
      }
    }

    Link.propTypes = propTypes;
    Link.defaultProps = defaultProps;

    export default Link;
    ```

  - Ordering for `React.createClass`:

    1. `displayName`
    1. `propTypes`
    1. `contextTypes`
    1. `childContextTypes`
    1. `mixins`
    1. `statics`
    1. `defaultProps`
    1. `getDefaultProps`
    1. `getInitialState`
    1. `getChildContext`
    1. `componentWillMount`
    1. `componentDidMount`
    1. `componentWillReceiveProps`
    1. `shouldComponentUpdate`
    1. `componentWillUpdate`
    1. `componentDidUpdate`
    1. `componentWillUnmount`
    1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
    1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
    1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
    1. `render`

## `isMounted`

  - Do not use `isMounted`.



**[⬆ back to top](#table-of-contents)**
