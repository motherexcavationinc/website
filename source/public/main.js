const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

if (menuButton && navigation) {
  menuButton.hidden = false;
  document.documentElement.classList.add('js');
  const closeMenu = () => menuButton.setAttribute('aria-expanded', 'false');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
  });
  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (
      event.target instanceof Node &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    )
      closeMenu();
  });
  matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}
