# Flow Sass Style Guide

*Based on [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)*

## Table of Contents

1. [Terminology](#terminology)
    - [Rule Declaration](#rule-declaration)
    - [Selectors](#selectors)
    - [Properties](#properties)
1. [CSS](#css)
    - [Naming](#naming)
    - [Formatting](#formatting)
    - [Comments](#comments)
    - [OOCSS and BEM](#oocss-and-bem)
    - [ID Selectors](#id-selectors)
    - [JavaScript hooks](#javascript-hooks)
    - [Border](#border)
1. [Sass](#sass)
    - [Syntax](#syntax)
    - [Ordering](#ordering-of-property-declarations)
    - [Variables](#variables)
    - [Mixins](#mixins)
    - [Extend directive](#extend-directive)
    - [Nested selectors](#nested-selectors)


## Terminology

### Rule declaration

A “rule declaration” is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Selectors

In a rule declaration, “selectors” are the bits that determine which elements in the DOM tree will be styled by the defined properties. Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Properties

Finally, properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

**[⬆ back to top](#table-of-contents)**

## CSS

### Naming
* Use the extension scss.
* Use the same name of the component in camelCase notation.
* For partials use the underscore at the beginning of the name

#### Partials
The _ (underscore) means that is a partial for scss.
**dart-sass** is the only library which implements the @use rule, which is strongly recommended over @import.
Do not use @import.

The stylesheet its going to be imported (@use) to a main stylesheet i.e. styles.scss.

The advantage on using partials is that you can use many files to organize your code and everything will be compiled on a single file.
You can create partial Sass files that contain little snippets of CSS that you can include in other Sass files. 
This is a great way to modularize your CSS and help keep things easier to maintain. 

### Formatting

* Use soft tabs (2 spaces) for indentation.
* Do not use ID selectors.
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace `{` in rule declarations.
* In properties, put a space after, but not before, the `:` character.
* Put closing braces `}` of rule declarations on a new line.
* Put blank lines between rule declarations.

**Bad**

```css
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```

**Good**

```css
.Avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```

### Comments

* Prefer line comments (`//` in Sass-land) to block comments.
* Prefer comments on their own line. Avoid end-of-line comments.
* Write detailed comments for code that isn't self-documenting:
  - Uses of z-index
  - Compatibility or browser-specific hacks

### OOCSS and BEM

We encourage some combination of OOCSS and BEM for these reasons:

  * It helps create clear, strict relationships between CSS and HTML
  * It helps us create reusable, composable components
  * It allows for less nesting and lower specificity
  * It helps in building scalable stylesheets

**OOCSS**, or “Object Oriented CSS”, is an approach for writing CSS that encourages you to think about your stylesheets as a collection of “objects”: reusable, repeatable snippets that can be used independently throughout a website.

  * Nicole Sullivan's [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine's [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

#### BEM
**BEM**, or “Block-Element-Modifier”, is a _naming convention_ for classes in HTML and CSS. Can serve as a solid set of guidelines for implementing OOCSS.

  * Blocks: Use PascalCase for blocks. *Btn*
  * Child Items/Elements: Append two underscores and the name of the element in lowercase to the name of the block. *Btn__phone*
  * Modifiers: Append two hyppens and the name of themodifier in lowercase to the name of the block. *Btn--orange*

**Example**

```jsx
// BusinessCard.jsx
function BusinessCard() {
  return (
      <a className="Btn Btn--big Btn--orange" href="https://app.flowfin.tech">
        <span className="Btn__phone">555-555557</span>
        <span className="Btn__text">Subscribe</span>
      </a>
  );
}
```

```css
/* BusinessCard.css */

/* Block component that represents the higher-level component*/
.Btn { }

/* Element that represents a descendant of `.Btn` that helps compose the block as a whole.*/ 
.Btn__phone {}

/* Modifier that changes the style of the block, it represents a different state or variation on the `.Btn` block. */
.Btn--orange {} 
.Btn--big {}
```

#### Sass and BEM
Nesting as a way of scoping styles, you can still author in a nested format, but get CSS that isn’t nested, with *@at-root:*

```sass
.Block {
  @at-root #{&}__element {
  }
  @at-root #{&}--modifier {
  }
}
```

Returns you:
```css
.Block {
}
.Block__element {
}
.Block--modifier {
}
```

### ID selectors
Do Not use ID selectors.

### JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript. Conflating the two often leads to, at a minimum, time wasted during refactoring when a developer must cross-reference each class they are changing, and at its worst, developers being afraid to make changes for fear of breaking functionality.

We recommend creating JavaScript-specific classes to bind to, prefixed with `.js-`:

```html
<button className="Btn Btn-primary js-request-to-book">Request to Book</button>
```

### Border

Use `0` instead of `none` to specify that a style has no border.

**Bad**

```css
.Foo {
  border: none;
}
```

**Good**

```css
.Foo {
  border: 0;
}
```
**[⬆ back to top](#table-of-contents)**

## Sass

### Syntax

* Use the `.scss` syntax, never the original `.sass` syntax
* Order your regular CSS and `@include` declarations logically (see below)

### Ordering of property declarations

1. Property declarations

    List all standard property declarations, anything that isn't an `@include` or a nested selector.

    ```scss
    .Btn--green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include` declarations

    Grouping `@include`s at the end makes it easier to read the entire selector.

    ```scss
    .Btn--green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. Nested selectors

    Nested selectors, _if necessary_, go last, and nothing goes after them. Add whitespace between your rule declarations and nested selectors, as well as between adjacent nested selectors. Apply the same guidelines as above to your nested selectors.

    ```scss
    .Btn {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);

      .Icon {
        margin-right: 10px;
      }
    }
    ```

### Variables
Variables declared at the top level of a stylesheet are global. This means that they can be accessed anywhere in their module after they’ve been declared. But that’s not true for all variables. Those declared in blocks {curly braces} are usually local and start with underscore, and can only be accessed within the block they were declared.
 * Global Variables: Use lower-dash-cased variable names (e.g. `$my-global-variable`).
 * Private/Local Variables: Use the prefix underscore before the lower-dash-cased name. (e.g. `$_my-local-variable`)

### Mixins

Mixins should be used to DRY up your code, add clarity, or abstract complexity--in much the same way as well-named functions. Mixins that accept no arguments can be useful for this, but note that if you are not compressing your payload (e.g. gzip), this may contribute to unnecessary code duplication in the resulting styles.

### Extend directive

`@extend` should be avoided because it has unintuitive and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later (e.g. if they are in other files and the order the files are loaded shifts). Gzipping should handle most of the savings you would have gained by using `@extend`, and you can DRY up your stylesheets nicely with mixins.

### Nested selectors

**Do not nest selectors more than three levels deep!**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

When selectors become this long, you're likely writing CSS that is:

* Strongly coupled to the HTML (fragile) *—OR—*
* Overly specific (powerful) *—OR—*
* Not reusable


Again: **never nest ID selectors!**

**[⬆ back to top](#table-of-contents)**
