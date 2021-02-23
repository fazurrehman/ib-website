# Icebox v1.1

This is new workflow I set-up for icebox frontend, now I added twig templating engine in whole project to work more faster and dynamic accross the whole project.
Now we don't have build folder anymore! Twig file directly executing in **DIST FOLDER** with everything included image, fonts, css, js & more... and we still have old workflow into branch [icebox 1.0v](https://github.com/fazurrehman/icebox/tree/icebox-v1.0)

## Installation

Use the package manager npm

```bash
npm install
```

## Bootstrap Custom

(node_modules/bootstrap/scss/bootstrap.scss)
```scss
@import 'functions';
@import 'variables';
@import 'mixins';
@import 'root';
@import 'reboot';
@import 'type';
@import 'images';
@import 'code';
@import 'grid';
@import 'tables';
@import 'forms';
@import 'buttons';
@import 'transitions';
@import 'dropdown';
// @import "button-group";
// @import "input-group";
// @import "custom-forms";
@import 'nav';
@import 'navbar';
@import 'card';
@import 'breadcrumb';
@import 'pagination';
// @import "badge";
// @import "jumbotron";
// @import "alert";
@import 'progress';
@import 'media';
// @import "list-group";
@import 'close';
@import 'toasts';
@import 'modal';
@import 'popover';
// @import "carousel";
// @import "spinners";

@import 'utilities';
@import 'alert';
@import 'print';
```

```bash
backup — folder have bootstrap scss,
after npm bootstrap replace variables sass file in node_modules
```

If you have any question ask me on slack or email: me@faizur.com
