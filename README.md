# Some notes

## JavaScript

### ES6
At the Sentinel, I typically write ES6 JavaScript as CommonJS modules, then bundle it with Webpack or Browserify. I saw this wasn't part of the Grunt build, and compilation into ES5 can add page weight, so I elected not to do it. If you all would like to see examples of code I've written in ES6, let me know.

### Handlebars
To handle the dynamic updating of the dollar amounts, I elected to use Handlebars. There are a few reasons:
+ It has built in escaping to help prevent XSS.
+ The template is dynamic by default; if more/fewer dollar amounts were added, the template wouldn't need to change.
+ Handlebars templates can be pre-compiled, meaning the small runtime version of the library is all that is needed in production.

The template, located at **/src/templates/amounts.handlebars**, will need to be compiled before viewing the page. I put in an NPM script for this: `npm run compile`

### My output
You can see the dollar amounts logged to the console.


## Aesthetics

### Breakpoints
As recommended by the style guide, I used [sass-mq](https://github.com/sass-mq/sass-mq) to handle media queries. I used the tablet and desktop breakpoints recommended in that repository, which you can see in **/src/scss/modules/_mq.scss**.

The style guide also recommends breakpoints for font sizes, which I've placed in **/src/scss/modules/_typography.scss**.

### Fonts
I see there is a dedicated font directory inside **/app/assets/fonts**, but the style guide recommends using [WebFontLoader](https://github.com/typekit/webfontloader). So I went that route.

### Flexbox
I love me some flexbox, but I didn't use it because it lacks support in IE 9. If you all would like to see examples of CSS I've written with flexbox, let me know.


## Usability and semantics

### Radio buttons
The mockup called for radio buttons, so I went that route (I trust your designers). That said, I typically prefer using toggle buttons instead of radio buttons or checkboxes because they're easier to use on mobile. Semantic UI has a good [implementation](http://semantic-ui.com/modules/checkbox.html#toggle) of them.

### Aside element
I noticed **index.html** originally had an `<aside>` element in it. I assume this was meant to contain the "support us" text, but I elected to edit the markup a bit. Per the spec, the `<main>` element "consists of content that is directly related to, or expands upon the central topic of a document or the central functionality of an application." In my opinion, the text accompanying the form is a crucial part of this page and also unique to it. Therefore, I thought it should go inside the `<main>` element and therefore not in an `<aside>` outside of it.


## Grunt

### PostCSS
I added a postcss task to the Grunt build. It does the following things:

#### In development
+ Autoprefixes the CSS

#### In production
+ Autoprefixes the CSS
+ Provides a pixel fallback for the REM unit
+ Minifies the stylesheet

### Concatenation
I added a line to the concat task so that it concatenates all vendor scripts. That's reflected in **index.html**.
