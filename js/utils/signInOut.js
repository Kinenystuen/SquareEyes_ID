export async function signInOutButton() {
  const signinButtonOne = document.getElementById("sign_in");
  const signupButtonTwo = document.getElementById("sign_up");
  const SectionOne = document.getElementById("section_signin");
  const SectionTwo = document.getElementById("section_signup");
  //SectionTwo.style.display = "none";

  signinButtonOne.addEventListener("click", function () {
    SectionOne.style.display = "block";
    SectionTwo.style.display = "none";
  });

  signupButtonTwo.addEventListener("click", function () {
    SectionOne.style.display = "none";
    SectionTwo.style.display = "block";
  });

  function goto_your_profile() {
    window.location.href = "/your_profile.html";
  }
}

signInOutButton();
