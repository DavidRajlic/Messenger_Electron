const settingsBtn = document.getElementById('settings-btn');
const themeLink = document.getElementById('theme-style');


settingsBtn.addEventListener('click', () => {
  window.api.openSettingsWindow();
});


window.api.onThemeChange((theme) => {
  const href = theme === 'dark' ? 'styles/dark.css' : 'styles/light.css';
  themeLink.setAttribute('href', href);
  localStorage.setItem('theme', theme);
});


const saved = localStorage.getItem('theme') || 'light';
window.api.onThemeChange((theme) => {}); 
window.api.setTheme(saved); 


document.getElementById('loadBtn').addEventListener('click', async () => {
  const data = await window.electronAPI.openJsonFile();
  if (data) showContact(JSON.parse(data));
});

window.electronAPI.onLoadContactFile((path) => {
  fetch(`file://${path}`)
    .then(res => res.json())
    .then(showContact)
    .catch(err => console.error('Napaka pri nalaganju:', err));
});

function showContact(contact) {
  document.getElementById('firstName').textContent = contact.firstName;
  document.getElementById('lastName').textContent = contact.lastName;
  document.getElementById('email').textContent = contact.email;
  document.getElementById('phone').textContent = contact.phone;
  document.getElementById('country').textContent = contact.country;
   if (contact.image) {
    console.log(contact.image)
    image.src = `images/${contact.image}`;
  } else {
    contactImage.src = ''; 
  }
}

