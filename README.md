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

1. Have the following requirements installed: [node](http://nodejs.org/), [npm](https://www.npmjs.org/), and [bower](http://bower.io/)

2. Clone the repo: ```git clone https://github.com/curtisj44/FRWD.git```

3. Run ```npm install```

4. Run ```bower install```



## Style Guide

FRWD is set up to generate a style guide / pattern library using [kss-node](https://github.com/hughsk/kss-node).

To build the style guide, run ```grunt kss```


<!--

basic setup
	- Yeoman
	- Sass

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