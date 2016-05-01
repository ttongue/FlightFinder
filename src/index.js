/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample is loosely based on the 'Space Geek' example provided by Amazon, though all of the original functionality has been gutted from the file.
 */

/**
 * App ID for the skill -- REPLACE WITH YOUR OWN APP ID
 */
var APP_ID = ""; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var selectedDestination = '';
var selectedEmbarkDate='';
var selectedDisembarkDate='';


/**
 * FlightFinder is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var FlightFinder = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
FlightFinder.prototype = Object.create(AlexaSkill.prototype);
FlightFinder.prototype.constructor = FlightFinder;

FlightFinder.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("FlightFinder onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

FlightFinder.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("FlightFinder onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
FlightFinder.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("FlightFinder onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

FlightFinder.prototype.intentHandlers = {
 
    "DestinationIntent": function (intent, session, response) {
        selectedDestination=intent.slots.Destination.value;
        session.attributes.selectedDestination=selectedDestination;
        handleDestinationRequest(response);
    },

    "EmbarkIntent": function (intent, session, response) {
        selectedDestination=session.attributes.selectedDestination;
        if (session.attributes.selectedEmbarkDate != null) {
            selectedEmbarkDate=session.attributes.selectedEmbarkDate;
            if (intent.slots.DisembarkDate == '') {
                selectedDisembarkDate=intent.slots.DisembarkDate.value;
            } else {
                selectedDisembarkDate=intent.slots.EmbarkDate.value;
            }
            handleDisembarkRequest(response);
        } else {
            selectedEmbarkDate=intent.slots.EmbarkDate.value;
            session.attributes.selectedDestination=selectedDestination;
            session.attributes.selectedEmbarkDate=selectedEmbarkDate;
            handleEmbarkRequest(response);
        }
    },


    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Flight Finder find flights going to _________, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};


function handleDestinationRequest(response) {
    var speechOutput = "<speak>I understand that you want to go to "+selectedDestination+". Please tell me when you want to go.</speak>";
    var outputSpeechJSON = { 
        "speech": speechOutput,
        "type": "SSML"
    };
    response.askWithCard( outputSpeechJSON, "Flight Finder",speechOutput);
}

function handleEmbarkRequest(response) {
    var speechOutput = "<speak>I understand that you want to go to "+selectedDestination+" on "+selectedEmbarkDate+". Please tell me when you want to return.</speak>";
    var outputSpeechJSON = { 
        "speech": speechOutput,
        "type": "SSML"
    };
    response.askWithCard( outputSpeechJSON, "Flight Finder",speechOutput);
}

function handleDisembarkRequest(response) {
    var speechOutput = "<speak>I understand that you want to go to "+selectedDestination+" on "+selectedEmbarkDate+" and return on "+selectedDisembarkDate+". ";

    speechOutput=speechOutput+" </speak>";
    var outputSpeechJSON = { 
        "speech": speechOutput,
        "type": "SSML"
    };
    response.tellWithCard( outputSpeechJSON, "Flight Finder",speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the FlightFinder skill.
    var flightFinder = new FlightFinder();
    flightFinder.execute(event, context);
};

