# Native Initalization
1. Need to create a React Native Application
2. Install the Babylon NPM ```npm i @babylonjs/react-native```, ```npm i @babylonjs/react-native-iosandroid-0-69``` and ```npm i react-native-geolocation-service```
3. Need to import the EngineView from babylonjs/react-native 
Example:
```import {EngineView, useEngine} from '@babylonjs/react-native';```
4. In App.js component need to add the EngineView 
Example:
```<EngineView/>```
5. Need to implement useEffect for initialize the engine.
Example:
```
const engine = useEngine();
useEffect(() => {
	if (engine) { 
		if(engine){
		 	(need to initialize the library here)
		} 
	}, [engine]);
```

	
# Viewer Library Initalization (For React Native)
1. Need to import ViewerLibrary package into the React Native App, for now clone the repo and add it into your project and import from there.
Example:
```import {IViewer} from '../../viewer-library';```
2. You need to initialize IViewer inside the useEffect.
Example:

 ```
useEffect(() => {
	if (engine) { 
		if(engine) {
		  new IViewer({
				apikey: 'PRK9ptMjb9mHMsI', // API Key 
				secretkey: 'cU6vi5sWrVng4wxOJmu18ZcclI2oHK', // APP Secret Key
				courseID: '9HNmDDOqAmRO', // Course ID
				holeNumber: 1, // Hole Number
				platform: Platform.OS, // Platform 
				engine: engine, // Engine
				hostOrigin: 'https://api-connect.igolf.com/', // optional If the below data is provided then it mandatory and API will be called from the package
				assets: 'https://viewer-library-ui.dedicateddevelopers.us', // It's mandatory as all the textures/images are hosted here
				data: {
					course: gpsVectorDetails, // vectorGPSObject - Use CourseGPSVectorDetails Request Response contains vectorGPSObject. 
					heights: elevationDetails, //  CourseElevationDataDetails => response.jsonFullUrl => elevation result.
					CourseScorecardDetails: scoreCardDetails, // Use CourseScorecardDetails Request Response contains menScorecardList and wmnScorecardList. Extract parHole as
					teebox: selectedTeeBoxDetails, // Selected TeeBox
				},
		  }, (callback) => {
		  		 // We have a bugs in BabylonNative Library to prevent this bugs we need to use the below things and it's mandatory
					 
		  		callback.on("spritePrevent", (e) => { new SpriteManager('bugsHandling', null, 0, 0, t.scene); 

		  		// SpriteManager need to be imported from babylonjs/core' 
		  		Example: import {SpriteManager} from '@babylonjs/core';
		  		})
		  		
				(User interaction can be handle from here)
				Example: 
				1. setLoader:
				callback.on("load", (e) => { (loader will be shown from here) })
				2. hideLoader:
				callback.on("ready", (e) => {

				(loader will be hidden)

				// To enable GPS
				   1. Need to request the user to enable the location if enabled
				   callback.main.viewer.locationInit(Geolocation, boolean(location allowed or denied);
				   // Import Geolocation: import Geolocation from 'react-native-geolocation-service';
				}
				3. getCurrentHole:
				callback.on("HoleChange", (e) => { (currentHole = e.currentHole) }
		  })
		} 
	}, [engine]);

```
	
	
# Viewer Library Initalization (For Web)

```
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="description" content="IGolf viewer library">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>viewer-library</title>
  <style>
    html, body{
      height: 100%;
    }
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  </style>
</head>
<script src="https://viewer-library-ui.dedicateddevelopers.us/viewer.js" ></script>

<body>
  <div id="viewer"></div>
  <script>


    let viewer = new IGolf.IViewer({
      platform : "web",
      element: 'viewer', apikey: 'fWBvf_X4zrBpcdc',
      secretkey:'-LX1JsjX-LBiLPu0E1yKjUKGiUgXlO',
      courseID: '9HNmDDOqAmRO',
      style: "d",
      subStyle: "v1",
      size: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }, (callback) => {
    	(User interaction can be handle from here)
				Example: 
				1. setLoader:
				callback.on("load", (e) => { (loader will be shown from here) })
				2. hideLoader:
				callback.on("ready", (e) => { 
				(loader will be hidden)
				// To enable GPS
				   1. Need to request the user to enable the location if enabled
				   callback.main.viewer.locationInit(Geolocation, boolean(location allowed or denied);
				   // Import Geolocation: import Geolocation from 'react-native-geolocation-service';
				}
				3. getCurrentHole:
				callback.on("HoleChange", (e) => { (currentHole = e.currentHole) }
    });
  </script>
</body>

</html>
```