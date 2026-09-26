# K_Calculator System Design - Voice Edition

## Purpose
K_Calculator is a web-based calculator application that can be controlled via standard buttons, keyboard, or voice commands.

## Functional Requirements
- **Standard Math**: Addition, Subtraction, Multiplication, Division (handles division by zero), Percentage.
- **State Controls**: Clear (C), Delete (DEL).
- **Voice Input (Hear)**: 
  - Listen to commands like "hello", "add 1 plus 2", "what is 5 times 6", "subtract 10 from 20", "clear", "delete".
  - Understand number words (one, two, etc.) and map them to digits.
- **Voice Output (Speak)**:
  - Speak results (e.g. "The answer is 3").
  - Speak errors (e.g. "Cannot divide by zero", "Sorry, I didn't get that").
  - Greet back when user says hello.

## Non-Functional Requirements
- **Performance**: Fast and responsive.
- **Responsiveness**: Adapts to different screen sizes.
- **Browser Support**: Works in Chrome utilizing the Web Speech API.

## Technology Stack
- **Structure**: HTML5
- **Styling**: CSS3 (Vanilla, no external frameworks)
- **Logic**: JavaScript (Vanilla ES6+, no external frameworks)
