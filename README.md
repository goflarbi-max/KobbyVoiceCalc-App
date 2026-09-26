# Kobby Voice Calculator

## Project Description
Kobby Voice Calculator is a modern, responsive web-based calculator that supports both traditional manual input and advanced voice commands. Users can speak naturally to perform mathematical operations, and the application will transcribe, parse, calculate, and speak the result back to them using text-to-speech functionality.

## Features
1. **Manual Input**: Fully functional on-screen buttons (0-9, 00, +, -, *, /, ., C, DEL, =).
2. **Voice Recognition**: Allows hands-free operation using the Web Speech API (e.g., "2 plus 2").
3. **Speech Synthesis**: The calculator speaks the results out loud, enhancing accessibility.
4. **Natural Language Processing**: Parses worded numbers (e.g., "twenty divided by five") into mathematical expressions.
5. **Error Handling**: Gracefully handles division by zero with friendly visual and spoken error messages.
6. **Responsive Design**: Beautiful, glassmorphism UI that automatically adapts to mobile, tablet, and desktop screens.

## How to Use It
- **Manual Mode**: Click or tap the standard buttons on the interface to enter numbers and operators. Press `=` to calculate, `C` to clear, and `DEL` to delete the last digit.
- **Voice Mode**: 
  1. Click the microphone (🎤) button.
  2. Wait for it to pulse and say "Listening...".
  3. Speak a mathematical expression clearly (e.g., "10 minus 5" or "six times four").
  4. The calculator will automatically process your voice, perform the calculation, display the result, and read it back to you.

## Technologies Used
- HTML5
- CSS3 (Flexbox, Grid, Glassmorphism, Animations)
- JavaScript (ES6+)
- Web Speech API (SpeechRecognition & SpeechSynthesis)

## Challenges
**Parsing voice words to numbers**: The Speech API sometimes returns words like "twenty" or "two" instead of numeric digits ("20", "2"). Also, people use different phrasing like "divided by" or "over".
*Solution*: I created a custom `processSpeech()` mapping dictionary and regex replacements to translate natural language words and synonyms into standard mathematical operators and numeric digits before evaluation.

## What You Learned
I learned how to interact with the browser's native `SpeechRecognition` API, manage its event lifecycle (`onstart`, `onspeechend`, `onresult`), and use `SpeechSynthesis` to give the app a responsive personality. I also learned strategies for handling the unpredictable nature of voice transcription.

## Future Improvements
1. **Calculation History Log**: A slide-out panel that saves a list of past calculations.
2. **Scientific Functions**: Adding advanced operations like square root, power, and trigonometric functions to the voice parser.

## Live Demo Link
[View Live on Vercel](https://kobbyvoicecalc-app.vercel.app/)

## GitHub Link
https://github.com/goflarbi-max/KobbyVoiceCalc-App
