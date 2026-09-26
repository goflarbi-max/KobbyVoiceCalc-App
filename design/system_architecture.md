# K_Calculator System Architecture - Voice Edition

The application uses a component-based architecture integrated with web APIs for voice processing.

## Components

1. **Voice Input Module**: Uses Web Speech API (`SpeechRecognition`) to capture spoken audio and convert it to text.
2. **NLP Parser**: Takes the text transcript, cleans it, maps word numbers to digits, normalizes operator words ("plus" -> "+"), and converts it into an evaluatable math expression.
3. **Input Handler**: Captures traditional user interactions (clicks, keyboard).
4. **Calculation Engine**: Evaluates mathematical operations securely.
5. **State Manager**: Holds the current state of the calculator.
6. **Voice Output Module**: Uses Web Speech API (`SpeechSynthesis`) to vocalize results or errors.
7. **UI Renderer**: Updates the display and microphone listening status.

## Diagram

```text
+-----------------------+      +-------------------+      +-------------------+
|     Voice Input       | ---> |    NLP Parser     | ---> |                   |
| (SpeechRecognition)   |      | (Text to Math)    |      |                   |
+-----------------------+      +-------------------+      |                   |
                                          |               |                   |
+-----------------------+                 v               |  Calculation      |
|    Input Handler      | ---> +-------------------+ ---> |  Engine & State   |
|  (Mouse/Keyboard)     |      |   State Manager   |      |                   |
+-----------------------+      +-------------------+      |                   |
                                          |               +-------------------+
                                          v                         |
+-----------------------+      +-------------------+                |
|     Voice Output      | <--- |   UI Renderer     | <--------------+
|  (SpeechSynthesis)    |      | (Display/Status)  |
+-----------------------+      +-------------------+
```
