# consLogger

## Setup

```
npm install consLogger
```

## Usage

```js
import { consLogger } from "consLogger";
//or
const { consLogger } = require("consLogger");

const logger = new consLogger({ time: true, date: true });
logger.console.log("Hello Log");
logger.console.error("Hello Error");
logger.console.warn("Hello Warn");
logger.console.createCustom("myCustom", "[Customm]", "#dff573");
logger.console.myCustom("Hello Custom");
```

<img src="https://lh3.googleusercontent.com/u/1/drive-viewer/AK7aPaBmp-5iJ8wtdal_GQikW9xhFA7ndrZy4PJcBoFJ8JZZAYg-zzgBiuu3O7CA-8whNmLC_4PVbpjlySV2l0FSnND875Bqig=w1280-h866"/>

## Customize

```js
const logger = new consLogger({
  time: true,
  date: true,
  logText: {
    headerText: "[MyLogHeader]>>",
    headerTextColor: "#85d966",
    textColor: "#96f573",
  },
  errorText: {
    headerText: "[MyErrorHeader]>>",
    headerTextColor: "#eb443b",
    textColor: "#d96c66",
  },
  warnText: {
    headerText: "[MyWarnHeader]>>",
    headerTextColor: "#edde39",
    textColor: "#f5e967",
  },
});
logger.console.log("Hello Log");
logger.console.error("Hello Error");
logger.console.warn("Hello Warn");
```

<img src="https://lh3.googleusercontent.com/u/1/drive-viewer/AK7aPaBK3j2cCxS1R0l_JnYfAa1210eKjtZbiKOEuwOXspbw0MwNetcKpjGM_8aCwR6sR59be43PWF9CYQ4XDT9V4TVMG-qa=w1280-h578"/>

## Log the Console

```js
const logger = new consLogger({ path: "/logs", dailyLog: true });
// If dailyLog is off, it always saves the console to only one file.
logger.console.log("Hello log file!");
console.log("Normal Log");
```

#### Folder View

<img src="https://lh3.googleusercontent.com/u/1/drive-viewer/AK7aPaDMc4irIQRZJ544ZcaS673o7gYBMjR0kWf6Xts1sH89ieOlYJI4Lp-ah1bfEIXF9HctJ5azJC39xiOROwjm3DU2vDzyew=w1280-h866"/>

#### Console View

<img src="https://lh3.googleusercontent.com/u/1/drive-viewer/AK7aPaDLq5L4EXbamVVpiA0yQOzybuuSFeZ0QkdBq1wzn-TIr6bhh7RY0LogAvu6KKanjd95qZyiFsRNHnPBuzG7c0nGEWp5pw=w1280-h578"/>

#### Log File View

<img src="https://lh3.googleusercontent.com/u/1/drive-viewer/AK7aPaBDEWNF_-nsEdOT_9QaMSPgzrgeGON131fMB691I-WHl10lccz7k3fhR89k5Cb2ctOZ20A3pWo0vTmFIixygq0r2an3CA=w1280-h578"/>

</br>
</br>

<a href="https://github.com/SeneSatka/consLogger" style="color:gray">**Github** consLogger</a>
