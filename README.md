# FRWD

A responsive, proportional, nestable, customizable, and mobile-first **F**ramework for **R**esponsive **W**eb **D**esign.

## 1.) Responsive
 - **Flexible grid** defined in percentages
 - **Flexible media** that proportionally scale down when needed
 - **media queries** defined in ems

## 2.) Proportional

Create layouts using any proportion (1/2, 2/3, 1/3, 1/4, etc.) instead of based on a rigid column grid.

## 3.) Nestable

Easily create complex layouts.

## 4.) Customizable

Don't like something? Change it. Define your own proportions, breakpoints, and everything else.

## 5.) Mobile-First

The small screen experience is the baseline, with additional styles added using media queries.


<!--
## Getting Started

The framework is built around a combination of these three elements: `container`, `fields`, and `region`.

1. The `container` class sets the max-width of the page and centers it horizontally. It also sets the left and right margins on small screens.

2. The `fields` class defines horizontal divisions of the page. (The can be thought of as  &ldquo;rows&rdquo;)

3. The `region` class creates vertical divisions of the page with defined sizes for containing content. (They can be thought of as &ldquo;columns&rdquo;)

The basic markup looks like this:

``` html
<div class="container">
    <div class="fields">
        <div class="region size2of3">2/3</div>
        <div class="region size1of3">1/3</div>
    </div>
</div>
```

## Sizes

A variety of sizes are built in. See [Sizes](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-region-sizes.htm).

## Nesting

Nesting can look something like this:

``` html
<div class="container">
    <div class="fields">
        <div class="region size2of3 reset">
                <div class="fields">
                    <div class="region size2of3">2/3</div>
                    <div class="region size1of3">1/3</div>
            </div>
        </div>
        <div class="region size1of3">1/3</div>
    </div>
</div>
```

## Prefix & Suffix

Regions can be offset using this technique. This allows for additional space before, after, and/or between regions. See [Prefix & Suffix](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-region-prefix-suffix.htm).

``` html
<div class="container">
    <div class="fields">
        <div class="region size1of5">1/5</div>
    </div>
    <div class="fields">
        <div class="region size3of5 prefix1of5">3/5</div>
    </div>
</div>
```

## Push & Pull

The visual order of the regions can be different from the source order using this technique. See [Push & Pull](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-region-push-pull.htm).

## Centering

Pretty self-explanatory...

``` html
<div class="container">
    <div class="fields">
        <div class="region size1of7 region-centered">1/7</div>
    </div>
</div>
```

## Blocks

The `blocks` style is used for repeating content holders. They appear in [two-up](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-blocks-two.htm), [three-up](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-blocks-three.htm), [four-up](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-blocks-four.htm), [five-up](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-blocks-five.htm), and [six-up](http://curtisj44.github.com/FRWD/static/reference/styleguide/grid-blocks-six.htm) variations.

``` html
<div class="container">
    <div class="fields">
        <div class="region size1of1">
            <ol class="blocks blocks-four-up">
                <li>...</li>
                <li>...</li>
                <li>...</li>
                ...
            </ol>
        </div>
    </div>
</div>
```

-->