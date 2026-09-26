const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');
const micBtn = document.getElementById('mic-btn');
const statusEl = document.getElementById('status');
const transcriptEl = document.getElementById('transcript');

let currentInput = '';
let currentOperator = null;
let previousInput = '';
let displayReset = false;

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
}

function updateDisplay() {
    resultEl.innerText = currentInput || '0';
    if (previousInput && currentOperator) {
        historyEl.innerText = `${previousInput} ${currentOperator}`;
    } else {
        historyEl.innerText = '';
    }
}

function appendNumber(num) {
    if (displayReset) {
        currentInput = '';
        displayReset = false;
    }
    if (num === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    currentOperator = op;
    previousInput = currentInput;
    displayReset = true;
    updateDisplay();
}

function calculate() {
    if (currentOperator === null || previousInput === '' || currentInput === '') return;
    
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);
    let result = 0;

    switch (currentOperator) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/':
            if (curr === 0) {
                resultEl.innerText = "Cannot divide by zero";
                speak("Cannot divide by zero");
                currentInput = '';
                previousInput = '';
                currentOperator = null;
                return;
            }
            result = prev / curr;
            break;
        case '%': result = prev % curr; break;
        default: return;
    }

    currentInput = result.toString();
    currentOperator = null;
    previousInput = '';
    displayReset = true;
    updateDisplay();
    speak(`The result is ${currentInput}`);
}

function clear() {
    currentInput = '';
    previousInput = '';
    currentOperator = null;
    updateDisplay();
}

function del() {
    if (displayReset) return;
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.getAttribute('data-value'));
        } else if (button.classList.contains('operator')) {
            chooseOperator(button.getAttribute('data-value'));
        } else if (button.classList.contains('action')) {
            const action = button.getAttribute('data-action');
            if (action === 'clear') clear();
            if (action === 'delete') del();
            if (action === 'equal') calculate();
        }
    });
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    micBtn.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onstart = function() {
        micBtn.classList.add('listening');
        statusEl.innerText = "Listening...";
        statusEl.style.color = "#00e5ff";
        transcriptEl.innerText = "";
    };

    recognition.onspeechend = function() {
        recognition.stop();
        micBtn.classList.remove('listening');
        statusEl.innerText = "Processing...";
    };

    recognition.onerror = function(event) {
        micBtn.classList.remove('listening');
        statusEl.innerText = "Error: " + event.error;
        statusEl.style.color = "#ff3366";
    };

    recognition.onresult = function(event) {
        micBtn.classList.remove('listening');
        const speechResult = event.results[0][0].transcript.toLowerCase();
        transcriptEl.innerText = `You said: "${speechResult}"`;
        statusEl.innerText = "Click mic to speak";
        statusEl.style.color = "#ff3366";
        
        processSpeech(speechResult);
    };
} else {
    micBtn.style.display = 'none';
    statusEl.innerText = "Voice recognition not supported";
}

const wordsToNumbers = {
    'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
    'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
    'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
    'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17,
    'eighteen': 18, 'nineteen': 19, 'twenty': 20,
    'thirty': 30, 'forty': 40, 'fifty': 50,
    'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90,
    'hundred': 100
};

function processSpeech(speech) {
    let text = speech;
    text = text.replace(/plus|add/g, '+');
    text = text.replace(/minus|subtract/g, '-');
    text = text.replace(/times|multiplied by|multiply by|multiply/g, '*');
    text = text.replace(/divided by|divide by|over|divide/g, '/');
    text = text.replace(/equals|is|equal/g, '=');

    Object.keys(wordsToNumbers).forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        text = text.replace(regex, wordsToNumbers[word]);
    });

    const tokens = text.match(/(\d+\.?\d*)|[+\-*/=]|clear|delete/g);
    
    if (!tokens) {
        speakError();
        return;
    }

    try {
        clear();
        for (let token of tokens) {
            if (['+', '-', '*', '/'].includes(token)) {
                chooseOperator(token);
            } else if (token === 'clear') {
                clear();
            } else if (token === '=') {
                calculate();
            } else {
                for (let char of token) {
                    appendNumber(char);
                }
            }
        }
        if (tokens.length >= 3) {
            calculate();
        }
    } catch (e) {
        speakError();
    }
}

function speakError() {
    resultEl.innerText = "Error";
    speak("Sorry, I couldn't understand that calculation. Please try again.");
}
