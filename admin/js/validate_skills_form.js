const form = document.getElementById("skills_form");
const Language = document.getElementById("Language");
const type = document.getElementById("type");
const photo = document.getElementById("photo");

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
  const LanguageValue = Language.value.trim();
  const typeValue = type.value.trim();
  const photoValue = photo.value.trim();

  if (LanguageValue === "") {
    setError(Language, "Language is required!");
    return false;
  } else {
    setSuccess(Language);
  }

  if (typeValue === "") {
    setError(type, "Language type is required!");
    return false;
  } else {
    setSuccess(type);
  }
  if (photoValue === "") {
    setError(photo, "Photo  is required!");
    return false;
  } else {
    setSuccess(photo);
  }
  return true;
};
const apiKey = localStorage.getItem("token");

async function addData() {
  if (validateInputs() == true) {
    const Language = document.getElementById("Language").value;
    const type = document.getElementById("type").value;
    const photo = document.getElementById("photo").files[0];

    let formData = new FormData();
    formData.append("name", Language);
    formData.append("type", type);
    formData.append("image", photo);

    try {
      let response = await fetch(
        "https://my-brand-backend-hi11.onrender.com/mybrand/skills",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage = await response.json();
        alert(errorMessage.message);
      }

      let result = await response.json();
      alert(result.message);
      window.location.href = "./skills.html";
      document.getElementById("skills_form").reset();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
}
