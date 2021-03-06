# boilerplate-reactionic-meteor

A simple app to make getting started on reactionic-meteor apps easier.  Think something like [BASE](https://github.com/themeteorchef/base) from the meteorchef.

I have spent some time building an app, and thought it would be nice to share some of things I have learned through a boilerplate that could be useful to others getting started with hybrid mobile app development.

Also, I do this in a hope to get more people using this technology stack.  And contributing.  That way it becomes more mature, and all of our projects are better for it.

## Installation

Clone this repository to your local machine.  Then run:

```
npm install
meteor run
```

## Goals

* Provide a good starting place to write hybrid mobile apps.
* A good place to start for newbies to the whole technology stack.  There was a lot of stuff that I need to learn and something like this would have made the ramp up time a lot faster.
* Try to abibe as much as possible to the official [Meteor Guide](http://guide.meteor.com/)
* Provide a good example of data flow. [A really good idea](http://guide.meteor.com/react.html#using-createContainer).
  * The example to look at is `WelcomeContainer` and `Welcome` components in the source.
  * The point is to show that your UI components should have no notion on where information is coming from.  Information should just be passed in as properties and then reacted to.
  * `WelcomeContainer` accomplishes this by pulling the necessary user object from Meteor and the pass it on to `Welcome`.
* Provide a good project base for meteor hybrid development apps.  This is by no means the only way to do things.  There are so many technologies you can use to accomplish hybrid mobile development.  This is one way.  Hope it helps

## The Stack

The technology stack I'm proposing to use...

* [Meteor](https://www.meteor.com/) >= 1.3.0
  * With all its awesome reactive data at the core
  * 1.3 added incredible support for using any NPM module
  * 1.3 also added an incredbile best practices [guide](http://guide.meteor.com/)
* [React](https://facebook.github.io/react/index.html) >= 15.0.0
  * The best way to create awesome reactive UI
* [React-Router](https://github.com/reactjs/react-router) >= 2.4.0
  * Works well with React (but not required by react, FYI)
  * Required for used with React-Ionic
* [React-Ionic](http://reactionic.github.io/) >= 1.1.0
  * A wonderful wrapper of [Ionic CSS](http://ionicframework.com/docs/components/) into reusable React components
  * Accomplishes things angular accomplishes for fully Ionic apps using other packages from around the web.
    * [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html) for nice CSS style transitions
    * [Snap.js](https://github.com/jakiestfu/Snap.js/)
    * And more..


## Notes

### Fixtures

Just so you all know, I have added an initial user of test/test so you can quickly hop in to main part of the app.  Be sure to remove that from `fixtures.js` if you use this as your boilerplate.

### Running on mobile

This boilerplate is ready to be run with `meteor run ios` and `android` given that you have performed the necessary [prerequisites](http://guide.meteor.com/mobile.html#installing-prerequisites).

This is also ready to be 'Add to homescreen'.  This is something that is useful for developmet as it allows you to get a full screen app experience quickly without having to run a simulator or push the code to a device.  Obviously there are some losses and imperfections that you wouldn't get when running the app via cordova natively (ios 9 doesn't show splash screen etc.).  But it will get you a pretty close representation.

### Icons and Splashes

I have included a nice utility to quickly be able to change and create all the necessary different resolution icons and splash PNGs.  Make sure you have [imagemagick](http://www.imagemagick.org/script/index.php) installed via `brew` or `apt-get`.  And then you can run `./update-resources` and it will quickly resize and crop the images in `/resources` to the appropriately places in `/public`.  `/resources/splash.png` should be 2208x2208 pixels and `/resources/icon.png` should be 1024x1024 pixels.

Thanks to [meteor-assets](https://github.com/lpender/meteor-assets) for how to do this.

### Security

I have already removed `insecure` and `autopublsh` to try and encourage developers to start thinking with methods and publicatins/subscriptions earlier.  It has been long [discussed and concluded](http://guide.meteor.com/security.html#allow-deny) that this is the best way to go.  But for initial protyping feel free to add them back in.  However, I would still encourage you to use `ReactMeteorData.createContainer` rather than making database queries in your components.

Also, this boilerplate provides a good example for limiting method calls to the server.  The idea was taken from from  [todos-react](https://github.com/meteor/todos/tree/react).

### Linting

`eslint` is all setup and configured with this project using airbnb's style guide and linting for React and meteor.  Just setup you editor to live analyze the files.  You can also run eslint from the command line to ananlyze your whole project.

> To run eslint from the command line you will probably need to npm install -g certain packages that you don't have installed yet. Like `eslint-plugin-import` and `eslint-import-resolver-meteor`.

### ValidatedPublication

I really like [mdg:ValidatedMethod](https://github.com/meteor/validated-method).  And I think there should be something like it for publications.  I have created just that.  It is pretty much a copy of validated method but it works.  I would love to add some more usefulness to this in the future (like turn it in to a package, make it have some usefulness like I documented [here](https://github.com/meteor/validated-method/issues/51))

### File Structure

The file structure is trying to abide by the Meteor guide with everything is in `/imports` except for a few files.  The following is a short description of each file and what it is accomplishing.

```
├── client
│   ├── main.html # necessary for meteor.  change page header info here.
│   └── main.js # necessary for meteor.  provides entry point in to /imports
├── imports
│   ├── api
│   │   ├── clicks # collection, publication and methods used for tracking clicks
│   │   │   ├── clicks.js
│   │   │   ├── methods.js
│   │   │   └── publications.js
│   │   └── users
│   │       ├── publications.js # a publication of only the logged in user
│   │       ├── server
│   │       │   └── account-setup.js # setup how accounts get created.  need to add fields user object.
│   │       └── users.js # schema for users and other need to have user initialization
│   ├── lib # place to put helpr-ish functionality
│   │   ├── ValidatedPublication.js # my attempt at doing what mdg:validated-method does for methods
│   │   └── getPlatform.js # nice helper method to get the current platform, and also be able to fake it out during dev
│   ├── startup
│   │   ├── client
│   │   │   ├── index.js # do necessary imports and render the routes
│   │   │   └── routes.jsx # routing information
│   │   └── server
│   │       ├── fixtures.js # place to add dummy data.
│   │       ├── index.js # import the other files in this directory
│   │       └── register-api.js # prepare the collections, publications, and methods
│   └── ui
│       ├── components
│       │   ├── AbsoluteMiddle.jsx # nice helper component
│       │   ├── Content.jsx # wrapper component for parenting main content pages.  Provides automatic loading spinner if needed and correctly sets up IonContent
│       │   ├── LoadingDiv.jsx # Loading spinner to wrap things with that might need time to load.
│       │   ├── NavMenuButton.jsx # nav bar button to open side menu
│       │   └── SideMenu.jsx # side menu
│       ├── containers # pass necessary data down to layouts or pages
│       │   ├── AppContainer.jsx
│       │   ├── AuthContainer.jsx
│       │   ├── ClickMeContainer.jsx
│       │   ├── MainContainer.jsx
│       │   └── WelcomeContainer.jsx
│       ├── layouts
│       │   ├── App.jsx # provides app wide niceties (connection lost overlay, popupError on this.context)
│       │   ├── Auth.jsx # layout wrapper for login and signup pages
│       │   ├── Body.jsx # layout for everything.  This is the top level route.  This is important to set up IonBody correctly as it is the brain to all of React-Ionic.
│       │   └── Main.jsx # layout for all pages while logged in.  Provides side meu and nav bar etc.
│       ├── pages
│       │   ├── ClickMe.jsx # click me interactive page
│       │   ├── HelloWorld.jsx # just shows the text
│       │   ├── Login.jsx # login page
│       │   ├── NotFound.jsx # obligatory 404 page
│       │   ├── Signup.jsx # signup page
│       │   └── Welcome.jsx # Welcome page.  Shows current user information
│       └── stylesheets
│           ├── app.scss # some good css for the app, imports necessary css from React-Ionic
│           └── index.js # add more lines here for other stylesheet imports.  Sass, Less, doesn't matter as long as you have the correct meteor packages installed
├── mobile-config.js # configuring the cordova build
├── package.json # every project needs iti
├── public
│   ├── favicon.png # use png and call it out explicitly in the main.html file so you can easily version the favicon
│   ├── fonts # directoy of fonts necessary for Ionic icons
│   ├── icons # all of the different resolution icons go here for web apps and native apps.
│   ├── manifest.json # the required android file for being able to 'add app to home screen'
│   └── splashes # all of the different resolution splashes go here for web apps and native apps.
├── resources
│   ├── icon.png # the full size icon that gets resized
│   └── splash.png # the full size splash that will get resized
├── server
│   └── main.js # necessary for meteor. just imports /imports/startup/server
└── update-resources # script to update all of the icons and splashes
```

## TODOs

* This could semi-easily be turned in to a complete todo list example like Meteor's [todos-react](https://github.com/meteor/todos/tree/react)
* add good testing examples.  See [themeteorchef](https://themeteorchef.com/snippets/acceptance-testing-basics-with-chimp/)
* Have a nice clean `useraccounts:unstyled` modeled in this app.
  * check out [studiointeract's](https://github.com/studiointeract/accounts-ionic) library and see if that can be added in here.
  * Have a facebook login.
  * Reset password abilities etc.
* I have an idea about a navigation stack component that will work in tandum with IonNavBar providing automatic analysis of when to show the back button over the root level menu button.

## Contribute

Feel free to contribute.  Make comments.  Offer pull requests.  Help me figure out the best starting block for the most people.

## Credits

* @johnslemmer
* To the open-source community before me!
* [Mark Pors](https://github.com/pors/) for putting together React-Ionic.
