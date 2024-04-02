const form = document.getElementById("blog-form");
const blogTitle = document.getElementById("blogTitle");
const category = document.getElementById("category");
const blogContent = document.getElementById("blogContent");
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
  const blogTitleValue = blogTitle.value.trim();
  const categoryValue = category.value.trim();
  const blogContentValue = blogContent.value.trim();
  const photoValue = photo.value.trim();

  if (blogTitleValue === "") {
    setError(blogTitle, "blog Title Name is required!");
    return false;
  } else {
    setSuccess(blogTitle);
  }
  if (categoryValue === "") {
    setError(category, "category  is required!");
    return false;
  } else {
    setSuccess(category);
  }

  if (blogContentValue === "") {
    setError(blogContent, "blog Content  is required!");
    return false;
  } else {
    setSuccess(blogContent);
  }
  if (photoValue === "") {
    setError(photo, "Photo  is required!");
    return false;
  } else {
    setSuccess(photo);
  }
  return true;
};
// Function add data
const apiKey = localStorage.getItem("token");

async function addData() {
  if (validateInputs() == true) {
    const blogTitle = document.getElementById("blogTitle").value;
    const category = document.getElementById("category").value;
    const blogContent = document.getElementById("blogContent").value;
    const photo = document.getElementById("photo").files[0];

    let formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("category", category);
    formData.append("blogContent", blogContent);
    formData.append("image", photo);

    try {
      let response = await fetch(
        "https://my-brand-backend-hi11.onrender.com/mybrand/blog",
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
      window.location.href = "./blogs.html";
      document.getElementById("blog-form").reset();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
}
