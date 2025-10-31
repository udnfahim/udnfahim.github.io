const toggleBtn = document.getElementById('theme-toggle');

// Define multiple dark themes
const themes = [
  {
    name: 'dark',
    '--text-color': '#f5f7fa',
    '--link-color': '#4f8cff',
    '--background-color': '#0a0e17',
    '--box-bg': '#121826',
    '--box-border': '#2a2f3d',
  },
  {
    name: 'purple',
    '--text-color': '#e6e6fa',
    '--link-color': '#d291ff',
    '--background-color': '#1c0f3b',
    '--box-bg': '#2a1a50',
    '--box-border': '#452b7f',
  },
  {
    name: 'blue',
    '--text-color': '#e0f7ff',
    '--link-color': '#5ac8ff',
    '--background-color': '#0a1c2f',
    '--box-bg': '#11293f',
    '--box-border': '#23456b',
  },
  {
    name: 'gray',
    '--text-color': '#e6e6e6',
    '--link-color': '#a0a4b0',
    '--background-color': '#1f1f1f',
    '--box-bg': '#2a2a2a',
    '--box-border': '#3a3a3a',
  }
];

let currentIndex = parseInt(localStorage.getItem('themeIndex')) || 0;
applyTheme(currentIndex);

// Cycle themes on click
toggleBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % themes.length;
  applyTheme(currentIndex);
  localStorage.setItem('themeIndex', currentIndex);
});

// Apply theme function
function applyTheme(index) {
  const vars = themes[index];
  for (let key in vars) {
    document.documentElement.style.setProperty(key, vars[key]);
  }
}
