![Simple translation project screenshot](/public/img/translationProject.png)

# Simple translation project (work in progress)

This app uses A-Frame, Google Poly, and Google Translate for translations.

## How to use

Click on different objects in the scene and you'll get a translation pop up in the upper left corner.

*Pssst! Look around!* I promise you'll find something surprising!

## Startup

1. Clone the repository and run `npm install` in the cloned repository root
2. Create an `.env` file in your project root
3. Copy and paste the below code into the new `.env` file:
	```
	PORT=3001
	GOOGLE_API_KEY=YourGeneratedGoogleTranslateAPIKey
	PROJECT_ID=YourGeneratedProjectIDFromGoogleTranslateAPI
	```
4. Generate an Google Cloud API key and enable Google Translate service for it: [Using API Keys](https://cloud.google.com/docs/authentication/api-keys)
5. Replace `YourGeneratedGoogleTranslateAPIKey` and `YourGeneratedProjectIDFromGoogleTranslateAPI` with your generated Google Cloud API keys in your `.env` file
5. Run `npm start` to start up the server
6. Open your browser to `http://localhost:3001/` or the port number specified in the `.env` file
7. Use your mouse to drag and move around the scene and click on different objects, if the translations pop up in the upper left side of the screen you're all set!

## Planned Expansions

- Added voice that reads translations
- Latin transliteration translation for Chinese (pinyin) and Japanese characters
- VR mode has translation word pop ups
- Toggle sentences with context vs one word object vocabulary
