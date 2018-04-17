# [![Web Starter Kit](http://webjho.com/images/logo.png)](http://webjho.com/)

# Overview
A simple search and sorting filter built with Angular V.1.6, Web Starter Kit, Google Material and a sample JSON file

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

Next, install the local dependencies the project requires:

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

# Next Steps
* TODO: Add animations on filters
* TODO: Add auto-complete functionality
* TODO: Fix issue with auto complete disappearing on clearing field
* TODO: Perhaps create proper API Service instead of static JSON file
* TODO: Investigate CDN resources, slight issue with FOC on hard refresh
* TODO: Write unit tests

# Demo
[http://webjho.com/playground/gjs/](http://webjho.com/playground/gjs/)

# Notes
* Time taken: Approx 4.5hrs
* Excluded some browser prefixes, targeted modern browsers
* Valid HTML, CSS and Javascript
* Mobile friendly / Responsive