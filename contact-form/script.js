const scriptURL = 'https://script.google.com/macros/s/AKfycbxymXjS-4ytS168H4j39YG_daJxz1SiWKG_AZmbWi9U2wa14Py2uAJ20zNxnLKRmjK1/exec';

const form = document.forms['sheet-form'];
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('msg');
const popup = document.getElementById('popup');

form.addEventListener('submit', e => {
  e.preventDefault();

  btn.disabled = true;
  btn.innerHTML = "Saving...";
  msg.innerHTML = "";

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Thank you! Your details are saved.";
        msg.style.color = "green";

        // Show animated popup
        popup.classList.add("show");

        // Hide popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove("show");
        }, 3000);

        form.reset();
        btn.disabled = false;
        btn.innerHTML = "Submit Details";
    })
    .catch(error => {
        msg.innerHTML = "Error! Please try again.";
        msg.style.color = "red";
        console.error("Error!", error.message);

        // Show error popup
        popup.querySelector("p").innerText = "Error submitting details!";
        popup.style.backgroundColor = "#dc2626";
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
            popup.style.backgroundColor = "#2563eb"; // reset color
            popup.querySelector("p").innerText = "Details submitted successfully!";
        }, 3000);

        btn.disabled = false;
        btn.innerHTML = "Submit Details";
    });
});
