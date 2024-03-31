// Display Current Date
const CurrentDate = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});
document.querySelector("#currentDate").innerHTML = CurrentDate;

// Check if the user is logged in
var isLoggedIn = localStorage.getItem("token");
if (!isLoggedIn) {
  window.location.href = "../pages/signin.html";
}

// active Links for Dashboard
const activePage = window.location.pathname;
const sideLinks = document
  .querySelectorAll(".tab-container a")
  .forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add("active");
    }
  });

// NavBar for Dashboard
const clickedBtn = document.querySelector(".logo_container");
const tabContainer = document.querySelector(".tab-container");
clickedBtn.onclick = function () {
  tabContainer.classList.toggle("open");
};

// Logout function
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "../pages/signin.html";
};
