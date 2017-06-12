# [![Web Starter Kit](http://webjho.com/images/logo.png)]

## Overview


# Install

**tl;dr**: [Download WSK](https://github.com/google/web-starter-kit/releases/latest) and run `$ npm install --global gulp && npm install` in that directory to get started.

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

That's it!  Project is ready to roll!


## Commands

## Watch For Changes & Automatically Refresh Across Devices

```sh
$ gulp serve
```

## Build & Optimize

```sh
$ gulp
```

## Serve the Fully Built & Optimized Site

```sh
$ gulp serve:dist
```

## Performance Insights

```sh
$ gulp pagespeed
```