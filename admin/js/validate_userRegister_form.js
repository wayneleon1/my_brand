const form = document.getElementById("Register");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const photo = document.getElementById("photo");
const role = document.getElementById("role");
const submitbtn = document.getElementById("submitbtn");

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
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const passwordValue = password.value.trim();
  const emailValue = email.value.trim();
  const photoValue = photo.value.trim();
  const roleValue = role.value.trim();
  let checkEmail =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (firstNameValue === "") {
    setError(firstName, "First Name is required!");
    return false;
  } else {
    setSuccess(firstName);
  }
  if (lastNameValue === "") {
    setError(lastName, "Last Name is required!");
    return false;
  } else {
    setSuccess(lastName);
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
  if (emailValue === "") {
    setError(email, "email is required!");
    return false;
  } else if (!emailValue.match(checkEmail)) {
    setError(email, "Provide a valid Email address!");
    return false;
  } else {
    setSuccess(email);
  }
  if (photoValue === "") {
    setError(photo, "Photo  is required!");
  } else {
    setSuccess(photo);
  }
  if (roleValue === "") {
    setError(role, "role is required!");
    return false;
  } else {
    setSuccess(role);
  }
  return true;
};

const apiKey = localStorage.getItem("token");
async function addData() {
  if (validateInputs() == true) {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const photo = document.getElementById("photo").files[0];
    const role = document.getElementById("role").value;
    submitbtn.innerHTML = "Adding...";

    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("image", photo);
    formData.append("role", role);

    try {
      let response = await fetch(
        "https://my-brand-backend-hi11.onrender.com/mybrand/user",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      submitbtn.innerHTML = "Add";

      if (!response.ok) {
        let errorMessage = await response.json();
        alert(errorMessage.message);
      }

      let result = await response.json();
      alert(result.message);
      window.location.href = "./users.html";
      document.getElementById("Register").reset();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
}
