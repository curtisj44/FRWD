# FRWD

A responsive, proportional, nestable, customizable, and mobile-first approach for responsive web design.

1. __Responsive__:
 - _Flexible grid_ defined in percentages
 - _Flexible media_ that proportionally scale down when needed
 - _Media queries_ defined in ems

2. __Proportional__: create layouts using proportions (1/2, 2/3, 1/4, etc.), not predefined non-semantic classes or a rigid column grid.

3. __Nestable__ -  Easily create complex layouts.

4. __Customizable__ - Don't like something? Change it. Define your own proportions, breakpoints, and everything else.

5. __Mobile-first__ - The small screen experience is the baseline, with additional styles added using media queries.


## Getting Started

1. Have the following requirements installed: [Node](http://nodejs.org/), [NPM](https://www.npmjs.org/), [Bower](http://bower.io/), and the [Grunt CLI](http://gruntjs.com/getting-started#installing-the-cli)

2. Clone the repo: ```git clone https://github.com/curtisj44/FRWD.git```

3. Run ```npm install```

4. Run ```bower install```

5. Run ```grunt serve```


## Tasks

- ```grunt``` or ```grunt serve``` runs the development site using the “app” folder
- ```grunt serve:dist``` runs the production-ready site using the “dist” folder
- ```grunt build``` builds the production-ready site into the “dist” folder


## Style Guide

FRWD is set up to generate a style guide / pattern library using [kss-node](https://github.com/hughsk/kss-node).


<!--

Media Query maintenance
	CSS
	JS

Sass mixins

JS API

Debug

Browser Support

Features
	- mobile-first
	- fixed width layout for non-mq supporting IEs
	- em-based mqs
	- support for hi-DPI
	- no lame .visible-phone classes

-->