const form = document.getElementById("comment-form");
const names = document.getElementById("names");
const email = document.getElementById("email");
const contentMsg = document.getElementById("contentMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addComment();
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
  const contentMsgValue = contentMsg.value.trim();

  let checkEmail =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (namesValue === "") {
    setError(names, "Names is required!");
    return false;
  } else {
    setSuccess(names);
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
  if (contentMsgValue === "") {
    setError(contentMsg, "Message is required!");
    return false;
  } else {
    setSuccess(contentMsg);
  }
  return true;
};
// Function add Comment
async function addComment() {
  if (validateInputs() == true) {
    const names = document.getElementById("names").value;
    const email = document.getElementById("email").value;
    const contentMsg = document.getElementById("contentMsg").value;

    // Parse the URL to extract the ID parameter
    const urlParams = new URLSearchParams(window.location.search);
    const blogID = urlParams.get("id");

    let formData = new FormData();
    formData.append("name", names);
    formData.append("email", email);
    formData.append("content", contentMsg);

    let response = await fetch(
      `https://my-brand-backend-hi11.onrender.com/mybrand/blogComment/${blogID}/comment/create`,
      {
        method: "POST",
        body: formData,
      }
    );
    let result = await response.json();
    if (response.ok) {
      alert(result.message);
      window.location.reload();
    }
    document.getElementById("comment-form").reset();
  }
}
