/**
 * The Settings Modul reads the settings out of settings.json and provides 
 * this information to the other modules
 */

/*
 * 2011 Peter 'Pita' Martischka (Primary Technology Ltd)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var os = require("os");
var url = require('url')
var npm = require("npm/lib/npm.js");
var vm = require('vm');
var log4js = require("log4js");

/* Root path of the installation */
exports.root = path.normalize(path.join(npm.dir, ".."));

/**
 * The app title, visible e.g. in the browser window
 */
exports.title = "Etherpad Lite";

/**
 * The app favicon fully specified url, visible e.g. in the browser window
 */
exports.favicon = "favicon.ico";
exports.faviconPad = "../" + exports.favicon;
exports.faviconTimeslider = "../../" + exports.favicon;

/**
 * The IP ep-lite should listen to
 */
exports.ip = "0.0.0.0";
  
/**
 * The Port ep-lite should listen to
 */
exports.port = process.env.PORT; 

/**
 * The SSL signed server key and the Certificate Authority's own certificate
 * default case: ep-lite does *not* use SSL. A signed server key is not required in this case.
 */
exports.ssl = false;

/**
 * socket.io transport methods
 **/
exports.socketTransportProtocols = ['xhr-polling', 'jsonp-polling', 'htmlfile'];

/*
 * The Type of the database
 */
exports.dbType = "mysql";
/**
 * This setting is passed with dbType to ueberDB to set up the database
 */
exports.dbSettings = {
                      "user"    : url.parse(process.env.CLEARDB_DATABASE_URL).auth.split(':')[0], 
                      "password": url.parse(process.env.CLEARDB_DATABASE_URL).auth.split(':')[1], 
                      "host"    : url.parse(process.env.CLEARDB_DATABASE_URL).hostname, 
                      "database": url.parse(process.env.CLEARDB_DATABASE_URL).pathname.replace(/^\//, '')
                     };

/**
 * The default Text of a new pad
 */
exports.defaultPadText = "Welcome to your collaborative note pad : )";

/**
 * A flag that requires any user to have a valid session (via the api) before accessing a pad
 */
exports.requireSession = false;

/**
 * A flag that prevents users from creating new pads
 */
exports.editOnly = false;

/**
 * Max age that responses will have (affects caching layer).
 */
exports.maxAge = 1000*60*60*6; // 6 hours

/**
 * A flag that shows if minification is enabled or not
 */
exports.minify = false;

/**
 * The path of the abiword executable
 */
exports.abiword = null;

/**
 * The log level of log4js
 */
exports.loglevel = "INFO";

exports.stickychat = true;

/*
* log4js appender configuration
*/
exports.logconfig = { appenders: [{ type: "console" }]};

/* This setting is used if you need authentication and/or
 * authorization. Note: /admin always requires authentication, and
 * either authorization by a module, or a user with is_admin set */
exports.requireAuthentication = false;
exports.requireAuthorization = false;
exports.users = {};

//checks if abiword is avaiable
exports.abiwordAvailable = function()
{
  if(exports.abiword != null)
  {
    return os.type().indexOf("Windows") != -1 ? "withoutPDF" : "yes";
  }
  else
  {
    return "no";
  }
}

exports.pollingDuration = 10;
exports.secretindex = null;


