const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');




weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = null
  fetch(`http://localhost:3000/weather?address=${e.target.location.value}`)
    .then(res => res.json())
    .then(data => {
      if (data.err) {
        messageOne.textContent = data.err
      } else {
        messageOne.textContent = data.forecast
        messageTwo.textContent = data.location
      }
    });
});
