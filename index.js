const programmingLanguages = [
  "JavaScript",
  "Plain Text",
  "Bash",
  "C",
  "C++",
  "C#",
  "CSS",
  "Diff",
  "Go",
  "GraphQL",
  "Java",
  "JSON",
  "Kotlin",
  "Less",
  "Lua",
  "Makefile",
  "Markdown",
  "Objective-C",
  "PHP",
  "Python REPL",
  "Python",
  "R",
  "Ruby",
  "Rust",
  "SCSS",
  "Shell",
  "SQL",
  "Swift",
  "TypeScript",
  "WebAssembly",
  "XML",
  "YAML"
];

const theme = {
  breeze: 'rgb(207, 47, 152), rgb(106, 61, 236)',
  candy: 'rgb(165, 142, 251), rgb(233, 191, 248)',
  crimson: 'rgb(255, 99, 99), rgb(115, 52, 52)',
  dusk: 'rgb(255, 121, 198), rgb(255, 179, 71)',
  falcon: 'rgb(189, 227, 236), rgb(54, 54, 84)',
  meadow: 'rgb(89, 212, 153), rgb(160, 135, 45)',
  midnight: 'rgb(76, 200, 200), rgb(32, 32, 51)',
  raindrop: 'rgb(142, 199, 251), rgb(28, 85, 170)',
  sunset: 'rgb(255, 207, 115), rgb(255, 122, 47)'
};

const codeElement = document.querySelector('.CODE_BOX');
const select = document.querySelector('.custom-select');
const selectedOption = select.querySelector('.selected-option');
const optionsContainer = select.querySelector('.options');

const optionsThemeContainer = document.querySelector('.options-container');
const options = document.querySelector('.custom-theme');
const selectedTheme = document.querySelector('.selected-theme');
const main = document.querySelector('main');

let storeBackroundColor = `linear-gradient(140deg, ${theme.breeze})`;

// Function to create theme options
const createThemeOption = (key, value) => {
  const wrap = optionsThemeContainer.appendChild(document.createElement('div'));
  const themeBlock = wrap.appendChild(document.createElement('span'));
  const theme = wrap.appendChild(document.createElement('div'));
  wrap.className = 'theme';
  theme.textContent = key;
  themeBlock.className = 'theme-color-block';
  themeBlock.style.background = `linear-gradient(140deg, ${value})`;
};

// Populate theme options
for (const [key, value] of Object.entries(theme)) {
  createThemeOption(key, value);
}

// Event listener to toggle theme options
selectedTheme.addEventListener('click', () => {
  console.log('hello');
  optionsThemeContainer.style.display = optionsThemeContainer.style.display === 'flex' ? 'none' : 'flex';
});

// Event listener for theme options
document.querySelectorAll('.theme').forEach(option => {
  option.addEventListener('click', () => {
    if (selectedTheme.childNodes[1]) {
      selectedTheme.removeChild(selectedTheme.childNodes[1]);
    }
    selectedTheme.appendChild(document.createTextNode(option.textContent));
    selectedTheme.querySelector('span').style.background = `linear-gradient(140deg, ${theme[option.textContent.toLowerCase()]})`;
    main.style.background = `linear-gradient(140deg, ${theme[option.textContent.toLowerCase()]})`;
    storeBackroundColor = `linear-gradient(140deg, ${theme[option.textContent.toLowerCase()]})`;
    optionsThemeContainer.style.display = 'none';
    download();
  });
});


// Function to create language options
const createLanguageOption = (language) => {
  const option = document.createElement('div');
  option.className = 'option list-item';
  option.textContent = language;
  optionsContainer.appendChild(option);
};

// Set the initial selected option to 'JavaScript'
selectedOption.textContent = 'JavaScript';

// Populate language options
programmingLanguages.forEach(createLanguageOption);

// Event listener for language options
select.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', () => {
    selectedOption.textContent = option.textContent;
    optionsContainer.style.display = 'none';
    updateCode(option.textContent.toLowerCase() === 'plain text' ? 'txt' : option.textContent.toLowerCase());
    download();
  });
});

// Event listener to toggle language options
selectedOption.addEventListener('click', () => {
  optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
  download();
});

// Highlight the initial content of the code element
let currentLanguage = 'javascript';
updateCode(currentLanguage);

// Function to update code highlighting
function updateCode(language) {
  delete codeElement.dataset.highlighted;
  codeElement.className = 'CODE_BOX hljs';
  if (language !== '') {
    codeElement.classList.add(`language-${language}`);
    currentLanguage = language;
    hljs.highlightElement(codeElement);
  }
  download();
}

// Add the event listener for the input event
codeElement.addEventListener('input', () => {
  updateCode(currentLanguage);
});
// Add the event listener for the paste event
codeElement.addEventListener('paste', (event) => {
  // Wait for the next event loop iteration to ensure the pasted text is available
  console.log(event);
  setTimeout(() => {
    updateCode(currentLanguage);
  }, 0);
});

// Event listeners for resizing

let startX;
let startWidth;

const resize = (e) => {
  const width = startWidth + (e.pageX - startX);
  main.style.width = `${width}px`;
  download();
};

const stopResize = () => {
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);
};

resizeHandle.addEventListener('mousedown', e => {
  startX = e.pageX;
  startWidth = main.offsetWidth;
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
  download();
});

// Event listener for background transparency
// Select the checkbox and the main element
const backgroundCheckbox = document.querySelector('.--background');
const darkMode = document.querySelector('.--dark-mode');
const card = document.querySelector('.card');

// Add event listener to the background transparency checkbox
let i = 0;
backgroundCheckbox.addEventListener('click', () => {
  if(i === 0) {
    main.style.background = 'transparent';
    download();
    i = 1;
    console.log(i);
  } else {
    main.style.background = storeBackroundColor;
    download();
    i = 0;
    console.log(i, storeBackroundColor);
  }
});

// Add event listener to the dark mode checkbox
let d = 0;
darkMode.addEventListener('click', () => {
  if(d === 0) {
    card.style.background = '#ffffffc9';
    card.querySelector('code').style.color = 'rgb(55 89 57)';
    card.querySelector('input').style.color = 'rgba(58, 58, 58, 0.972)';
    download();
    d = 1;
  } else {
    card.style.background = 'rgba(0, 0, 0, .75)';
    card.querySelector('code').style.color = '#6ea971';
    card.querySelector('input').style.color = 'rgba(173, 173, 173, 0.972)';
    download();
    d = 0;
  }
})

// Event listener for changing the padding
const padding = document.querySelectorAll('.padding label');
padding.forEach(pad => {
  pad.addEventListener('click', () => {
    console.log(pad.textContent);
    main.style.padding = `${pad.textContent}px`;s
    download();
  });
})