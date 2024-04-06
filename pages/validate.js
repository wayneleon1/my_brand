const form = document.getElementById("Login_form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userAuthentication();
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
// validate function
const validateInputs = () => {
  let checkEmail =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "") {
    setError(email, "Email is required!");
    return false;
  } else if (!emailValue.match(checkEmail)) {
    setError(email, "Provide a valid Email address!");
    return false;
  } else {
    setSuccess(email);
  }
  if (passwordValue === "") {
    setError(password, "Password is required!");
    return false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at 8 characters.");
    return false;
  } else {
    setSuccess(password);
  }
  return true;
};

// Login Function
const userAuthentication = async () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (validateInputs() == true) {
    loginBtn.innerHTML = "Loading...";
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    let response = await fetch(
      "https://my-brand-backend-hi11.onrender.com/mybrand/user/login",
      {
        method: "POST",
        body: formData,
      }
    );
    let result = await response.json();
    alert(result.message);
    loginBtn.innerHTML = "Login";
    if (response.ok) {
      localStorage.setItem("token", result.accessToken);
      window.location.href = "../admin/dashboard.html";
    }
    document.getElementById("Login_form").reset();
  }
};
