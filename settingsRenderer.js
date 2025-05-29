document.getElementById('light-mode-btn').addEventListener('click', () => {
  window.api.setTheme('light');
 window.close(); 
});

document.getElementById('dark-mode-btn').addEventListener('click', () => {
  window.api.setTheme('dark');
 window.close(); 
});
