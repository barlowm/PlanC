# "Plan C"

## System Configuration
*The workstation used to build/run Plan C requires a basic node.js development environment. Please checkout the readme in my [SystemConfig](https://github.com/barlowm/SystemConfig) repo for basic instructions*

After cloning the application a simple .env file needs to be created
CD into the PlanC root folder and create a .env file containing the following:
```
/**
 *	to switch from Development mode to production, simply set NODE_ENV to "Prod",
 *	then switch NODE_ENV back to "development" to switch back.
 *	PACKAGE="./MyFile.json"
 *	PACKAGE="./pack_json_k.json"
 *	SCHEMA="./VistA_Data_Schema.json"
 **/

NODE_ENV="develop"
// NODE_ENV="production"
SOURCE_ROOT="./src"
BASE_PATH="./build"
APP_FILE="main.js"
PORT=8081
PACKAGE=
SCHEMA=
TEST_PACKAGE=
```

Then from the command prompt the application can be built and run with `gulp`

```
> gulp build
> gulp connect
```

A Web Browser will launch into the Home Page at localhost:8081.

