const form = document.getElementById("project-form");
const projectName = document.getElementById("projectName");
const category = document.getElementById("category");
const githubLink = document.getElementById("githubLink");
const hostedLink = document.getElementById("hostedLink");
const photo = document.getElementById("photo");
const description = document.getElementById("description");

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
  // if (photoValue === "") {
  //   setError(photo, "Photo  is required!");
  //   return false;
  // } else {
  //   setSuccess(hostedLink);
  // }
  if (descriptionValue === "") {
    setError(description, "Description  is required!");
    return false;
  } else {
    setSuccess(description);
  }
  return true;
};

// function to show data
function showData() {
  let projectList;
  if (localStorage.getItem("projectList") == null) {
    projectList = [];
  } else {
    projectList = JSON.parse(localStorage.getItem("projectList"));
  }

  let html;
  projectList.forEach((element, index) => {
    html += "<tr >";
    html += "<td>" + element.projectName + "</td>";
    html += "<td>" + element.category + "</td>";
    html += "<td>" + element.photo + "</td>";
    html += "<td>" + element.githubLink + "</td>";
    html += "<td>" + element.hostedLink + "</td>";
    html += "<td>" + element.author + "</td>";
    html += "<td>" + element.datePublished + "</td>";
    html += "<td>" + element.author + "</td>";
    html +=
      `<td><buttton oncliclk="deleteData(` +
      index +
      `)"><i class="fa-regular fa-pen-to-square"></i></button> </td>`;
    html +=
      `<td><buttton oncliclk="updateData(` +
      index +
      `)"><i class="fa-solid fa-trash"></i></button> </td>`;
    html += "</tr>";
    document.querySelector("#crudTable tbody").innerHTML = html;
  });
}

// Loads all data
document.onload = showData();

function addData() {
  if (validateInputs() == true) {
    const projectName = document.getElementById("projectName").value;
    const category = document.getElementById("category").value;
    const githubLink = document.getElementById("githubLink").value;
    const hostedLink = document.getElementById("hostedLink").value;
    const photo = document.getElementById("photo").value;
    const description = document.getElementById("description").value;

    let projectList;
    if (localStorage.getItem("projectList") == null) {
      projectList = [];
    } else {
      projectList = JSON.parse(localStorage.getItem("projectList"));
    }

    projectList.push({
      projectName: projectName,
      category: category,
      githubLink: githubLink,
      hostedLink: hostedLink,
      photo: photo,
      description: description,
    });
    localStorage.setItem("projectList", JSON.stringify(projectList));
    showData();
    document.getElementById("projectName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("githubLink").value = "";
    document.getElementById("hostedLink").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("description").value = "";
  }
}
