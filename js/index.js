const hamburger = document.querySelector('[data-hamburger-icon]');
const closeIcone = document.querySelector('[data-close-icon]');
const primaryNav = document.querySelector('[data-primary-nav]');
const scrollers = document.querySelectorAll('.scroller');
const form = document.getElementById('learn-more-form');
const updatesInput = document.getElementById('updatesInput');
let input_ready_to_send = false;
document.addEventListener('DOMContentLoaded', () => {
  // NAVIGATION BAR TOGGLER
  hamburger.addEventListener('click', (e) => {
    // open nav bar
    e.target.style.display = 'none';
    closeIcone.style.display = 'block';
    primaryNav.classList.add('active');
  });

  closeIcone.addEventListener('click', (e) => {
    // close the navbar
    e.target.style.display = 'none';
    hamburger.style.display = 'block';
    primaryNav.classList.remove('active');
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    //   check if reduced motion is activated in the browser if so, don't apply the scrolling animation.
    addAnimation();
  }

  updatesInput.addEventListener('keyup', (e) => {
    //   listen for email validation on typing
    const senderEmail = e.target.value;
    input_ready_to_send = validateEmail(senderEmail);
  });

  form.addEventListener('submit', (e) => {
    // if the email field is ready do submit
    e.preventDefault();
    if (input_ready_to_send) {
      // submit the form
    }
  });
});

// TESTIMONIALS SCROLLING ANIMATION
function addAnimation() {
  // Dublicat the horizontal scrolling items so the animation restart won't be noticable.
  scrollers.forEach((scroller) => {
    scroller.setAttribute('data-animated', true);
    const scrollerInner = scroller.querySelector('.scroller__inner');
    const inner_scroller_content = Array.from(scrollerInner.children);

    inner_scroller_content.forEach((item) => {
      const dublicatedItem = item.cloneNode(true);
      dublicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(dublicatedItem);
    });
  });
}

// CONTACT SECTION
const isValidEmail = (email) => {
  // regualr expression to check if the email is valide format
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const setError = (element, message) => {
  // if not valide email set the error message
  const inputGroup = element.parentElement;
  const errorDisplay = inputGroup.querySelector('#error-message');
  errorDisplay.innerText = message;

  errorDisplay.classList.add('errorMessage');
};

const setSuccess = (element) => {
  // valid email ? remove the error message
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector('#error-message');
  errorDisplay.innerText = '';
  element.classList.remove('errorMessage');
};

function validateEmail(senderEmail) {
  // return true if the input is valid and set success, otherwise return false and set error message
  let isInputReady = false;
  if (senderEmail === '') {
    setError(updatesInput, 'Email is required');
    return isInputReady;
  } else if (!isValidEmail(senderEmail)) {
    setError(updatesInput, 'Please insert a valid email');
    return isInputReady;
  } else {
    setSuccess(updatesInput);
    isInputReady = true;
    return isInputReady;
  }
}
