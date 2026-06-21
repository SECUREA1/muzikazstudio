const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-navigation');

menuButton?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('.newsletter form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const input = form instanceof HTMLFormElement ? form.querySelector('input[type="email"]') : null;
  const email = input instanceof HTMLInputElement ? input.value.trim() : '';

  alert(`Welcome to the crew${email ? `, ${email}` : ''}!`);

  if (input instanceof HTMLInputElement) {
    input.value = '';
  }
});
