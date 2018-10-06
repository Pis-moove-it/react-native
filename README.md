## Welcome to Reciclando app

To run the project you need run the following commands:

1. react-native run-android

Then open another console on the directory project and run:

2. npm start

## Deploy

1. To make a deploy you need to create a .env file on Android directory with dotenv and then add the credentials for fabric:

`require 'dotenv/load'`  
`CRASHLYTICS_API_TOKEN=`  
`CRASHLYTICS_BUILD_SECRET=`

2. Then run the command:

cd android && bundle exec fastlane beta

## Folder sturcture

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `actions`: This folder contains all actions that can be dispatched to redux.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder that contains all your application components.
    - `Common`: Folder to store any common component that you use through your app (such as a generic button, textfields, etc).
    - `MyComponent`: Each component should be stored inside it's own folder, and inside it a file for its code and a separate one for the styles. Then, the `index.js` is only used to export the final component that will be used on the app.
      - `MyComponent.js`
      - `styles.js`
      - `index.js`
  - `helpers`: Folder to store any kind of helper that you have.
  - `reducers`: This folder should have all your reducers, and expose the combined result using its `index.js`
  - `selectors`: Folder to store your selectors for each reducer.
  - `controllers`: Folder to store all your network and storage logic (you should have one controller per resource).
  - `App.js`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.
