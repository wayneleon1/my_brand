const form = document.getElementById("contact-form");
const names = document.getElementById("names");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addData();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInputs = () => {
  const namesValue = names.value.trim();
  const emailValue = email.value.trim();
  const subjectValue = subject.value.trim();
  const messageValue = message.value.trim();
  let checkEmail =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (namesValue === "") {
    setError(names, "Names is required!");
    return false;
  } else {
    setSuccess(names);
  }
  if (emailValue === "") {
    setError(email, "Email is required!");
  } else if (!emailValue.match(checkEmail)) {
    setError(email, "Provide a valid Email address!");
    return false;
  } else {
    setSuccess(email);
  }

  if (subjectValue === "") {
    setError(subject, "Subject is required!");
    return false;
  } else {
    setSuccess(subject);
  }

  if (messageValue === "") {
    setError(message, "Message is required!");
    return false;
  } else {
    setSuccess(message);
  }
  return true;
};

async function addData() {
  if (validateInputs() == true) {
    const names = document.getElementById("names").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    let formData = new FormData();
    formData.append("names", names);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    let response = await fetch(
      "https://my-brand-backend-hi11.onrender.com/mybrand/queries",
      {
        method: "POST",
        body: formData,
      }
    );
    let result = await response.json();
    alert(result.message);
    if (response.ok) {
      document.getElementById("contact-form").reset();
    }
  }
}
