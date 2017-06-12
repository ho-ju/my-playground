# [![Web Starter Kit](http://webjho.com/images/logo.png)](http://webjho.com/)

# Overview
My inspiration for this project was recycling.  After watching several recent shows on consumption and wastage, I was just about to hand this device over to a friend when I thought of another way to 'recycle' it.  After all those hours spent fighting over Mario Kart, I thought the Wii could be 'recycled' for one more time!

# Install

**tl;dr**: Download and run `$ npm install --global gulp && npm install` in that directory to get started.

## Prerequisites

### [Node.js](https://nodejs.org)

Bring up a terminal and type `node --version`.
Node should respond with a version at or above 0.10.x.
If you require Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 3.9.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

### Local dependencies

Next, install the local dependencies Web Starter Kit requires:

```sh
$ npm install
```

That's it!  Project is now ready to roll!


# Commands

### Watch For Changes & Automatically Refresh Across Devices

```sh
$ gulp serve
```

### Build & Optimize

```sh
$ gulp
```

### Serve the Fully Built & Optimized Site

```sh
$ gulp serve:dist
```

### Performance Insights

```sh
$ gulp pagespeed
```

# Origial Photos
* [Photo 1](http://webjho.com/playground/wii/source-photos/wii-original.jpg)
* [Photo 2](http://webjho.com/playground/wii/source-photos/wii-edited.jpgg)

# Next Steps
* Would have liked to have added a proper designed console status window on page
* Would have liked to have added animated front panel: open / close state
* Would have liked to have added disc as a draggable object to load into Wii console, which loads video or gif below
* Would have liked to have added some more animation, perhaps some 3d dragging
* Write some tests

# Demo
[http://webjho.com/playground/wii/](http://webjho.com/playground/wii/)

# Notes
* Time taken: Approx 3.5hrs
* Excluded some browser prefixes, targeted modern browsers
* Valid HTML, CSS and Javascript