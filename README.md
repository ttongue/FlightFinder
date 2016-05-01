# FlightFinder - Alexa Hackathon Demo


#### This is a demo heavily modified from the 'Space Geek' tutorial found at 
https://github.com/amzn/alexa-skills-kit-js/tree/master/samples/spaceGeek and uses the AlexaSkill.js library used in that example.

This demo demonstrates how to handle multiple slots using built-in data types such as AMAZON.Date and AMAZON.US_CITY. This demo also shows how to track multiple values across a session. 

To launch this skill, say "ask Flight Finder find flights going to ____________" and fill in a US City. For example, say "ask Flight Finder find flights going to San Francisco". Alexa will prompt for a date of departure, and you can use answers like "June 25, 2016", or "Monday", or be more verbose and say "I want to leave on Monday". Alexa will repeat your selection of destination and departure date and then ask for a return date which can be answered in a similar manner.

## Comments

The index.js file needs to have the APP_ID variable defined with the application id supplied in the JSON post to the lamba function. 

## To Do:

Quite a bit, including adding code to convert cities to preferred airport code (ie: convert the destination choice 'San Francisco' to 'SFO'), and then go get prices for the travel dates. It was only a 4 hour hack after all. 




