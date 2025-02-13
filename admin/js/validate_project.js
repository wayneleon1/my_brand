const form = document.getElementById("project-form");
const projectName = document.getElementById("projectName");
const category = document.getElementById("category");
const githubLink = document.getElementById("githubLink");
const hostedLink = document.getElementById("hostedLink");
const photo = document.getElementById("photo");
const description = document.getElementById("description");
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
  const projectNameValue = projectName.value.trim();
  const categoryValue = category.value.trim();
  const githubLinkValue = githubLink.value.trim();
  const hostedLinkValue = hostedLink.value.trim();
  const photoValue = photo.value.trim();
  const descriptionValue = description.value.trim();

  if (projectNameValue === "") {
    setError(projectName, "project Name is required!");
    return false;
  } else {
    setSuccess(projectName);
  }
  if (categoryValue === "") {
    setError(category, "category  is required!");
    return false;
  } else {
    setSuccess(category);
  }
  if (githubLinkValue === "") {
    setError(githubLink, "github Link  is required!");
    return false;
  } else {
    setSuccess(githubLink);
  }

  if (hostedLinkValue === "") {
    setError(hostedLink, "Hosted Link  is required!");
    return false;
  } else {
    setSuccess(hostedLink);
  }
  if (photoValue === "") {
    setError(photo, "Photo  is required!");
    return false;
  } else {
    setSuccess(photo);
  }
  if (descriptionValue === "") {
    setError(description, "Description  is required!");
    return false;
  } else {
    setSuccess(description);
  }
  return true;
};

const apiKey = localStorage.getItem("token");
async function addData() {
  if (validateInputs() == true) {
    const projectName = document.getElementById("projectName").value;
    const category = document.getElementById("category").value;
    const githubLink = document.getElementById("githubLink").value;
    const hostedLink = document.getElementById("hostedLink").value;
    const photo = document.getElementById("photo").files[0];
    const description = document.getElementById("description").value;
    submitbtn.innerHTML = "Adding...";

    let formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("category", category);
    formData.append("githubLink", githubLink);
    formData.append("hostedLink", hostedLink);
    formData.append("image", photo);
    formData.append("description", description);

    try {
      let response = await fetch(
        "https://my-brand-backend-hi11.onrender.com/mybrand/project",
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
      window.location.href = "./portfolio.html";
      document.getElementById("project-form").reset();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
}
