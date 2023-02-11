let inputs = [];

/**
 * Initial setup initializes all input values
 */
function setup() {
  let form = document.forms.myForm;
  inputs = [
    form.firstname,
    form.lastname,
    form.username,
    form.gender,
    form.date,
    form.email,
    form.password,
    form.confirm,
    form.reason,
    form.terms,
  ];
}

/**
 * A function to be called after submition.
 * Checks all values of each input and labels those
 * that doesn't have a valid input
 */
function validate() {
  let validators = [];
  inputs.forEach((i) => {
    let invalid = isInvalid(i, i.getAttribute("data-type"));

    validators.push(invalid);

    if (invalid) {
      i.classList.add("red");
    } else {
      i.classList.remove("red");
    }
  });

  let valid = true;
  for (value of validators) {
    if (value) {
      valid = false;
    }
  }
  if (valid) {
    let p = document.createElement("p");
    p.classList.add("success");
    p.innerText = "Successfully Registered!";
    document.forms.myForm.remove();
    document.getElementById("root").appendChild(p);
  }
}

/**
 * A function to be called for fast validation
 * This helps assist the user in finding out if input is valid
 */
function validateSingle(e) {
  let validators = [];
  let invalid = isInvalid(e, e.getAttribute("data-type"));

  validators.push(invalid);

  if (invalid) {
    e.classList.add("red");
  } else {
    e.classList.remove("red");
  }
}

/**
 * A function that tests if value of an element is invalid
 * depending on the data attribute of the element
 * different set of tests may be performed
 */
function isInvalid(e, attr) {
  const target = e.value;
  const genderSet = ["Male", "Female", "NB"];

  switch (attr) {
    case "name":
      return (
        simpleCheck(target) ||
        !isLengthCorrect(target, 1, 50) ||
        hasNumbers(target) ||
        hasSpecialChars(target)
      );
    case "username":
      return (
        simpleCheck(target) ||
        hasSpace(target) ||
        !isLengthCorrect(target, 3, 15) ||
        hasSpecialChars(target)
      );
    case "gender":
      return simpleCheck(target) || !hasValuesOf(target, genderSet);
    case "date":
      return isEmpty(target) || !isAgeLimited(target, 13); // TODO
    case "email":
      return simpleCheck(target) || isValidEmail(target);
    case "password":
      return (
        simpleCheck(target) ||
        !hasLargeSmallLetters(target) ||
        !isLengthCorrect(target, 8, 40) ||
        !hasNumbers(target) ||
        !hasSpecialChars(target)
      );
    case "confirm":
      return (
        isEmpty(target) ||
        !isSameWith(target, document.forms.myForm.password.value)
      );
    case "forced":
      return !e.checked;
    case "content":
      return !isLengthCorrect(target, 0, 9999);
    default:
      return "error";
  }
}

function resetForm() {
  inputs.forEach((i) => {
    let attrib = i.getAttribute("data-type");

    if (
      [
        "name",
        "username",
        "date",
        "email",
        "password",
        "confirm",
        "content",
      ].indexOf(attrib) !== -1
    ) {
      i.value = "";
    } else if (attrib === "forced") {
      i.checked = false;
    } else if (attrib === "gender") {
      i.value = "Male";
    } else {
      console.log("error");
    }
  });
}

function simpleCheck(target) {
  return isEmpty(target) || hasSurroundingSpace(target);
}

/**
 * Validators start here
 */

function isEmpty(input) {
  return input == null || input.length == 0;
}

function isSameWith(input, inputB) {
  return input === inputB;
}

function hasSurroundingSpace(input) {
  return input.startsWith(" ") || input.endsWith(" ");
}

function hasSpace(input) {
  const space = /\s/g;
  return space.test(input);
}

function isLengthCorrect(input, minimum, maximum) {
  return input.length >= (minimum ?? 1) && input.length <= (maximum ?? 8);
}

function hasNumbers(input) {
  const numbers = /\d/;
  return numbers.test(input);
}

function hasSpecialChars(input) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(input);
}

function hasLargeSmallLetters(input) {
  const regex = /(?=.*[A-Z])(?=.*[a-z]).+$/;
  return regex.test(input);
}

function hasValuesOf(input, array) {
  return array.includes(input);
}

function isValidEmail(input) {
  const validator =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

  return validator.test(input);
}

function isAgeLimited(input, ageRequirement) {
  let today = new Date();
  let birthDate = new Date(input);

  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= ageRequirement;
}

/**
 * Validators end here
 */

// Stop form from resetting page
document.getElementById("form").addEventListener("submit", (form) => {
  form.preventDefault();
});

const backgrounds = [
  "https://wallpaperaccess.com/full/5927911.gif",
  "https://64.media.tumblr.com/4c989428ba947bc4966e07e76d36bd28/118ec01107834a73-07/s1280x1920/fdb109b146e112c17776b4198d1fa61396b951e0.gif",
  "https://i.pinimg.com/originals/4e/f6/08/4ef608e95677dc3dab15a00df8148277.gif",
  "https://i.kym-cdn.com/photos/images/newsfeed/001/345/250/f36.gif",
  "https://i.kym-cdn.com/photos/images/original/001/169/604/9fb.gif",
  "https://static.wixstatic.com/media/7ea660_8ee4fd9007994f1cac6156d029f83d69~mv2.gif/v1/fit/w_356,h_200,q_90/7ea660_8ee4fd9007994f1cac6156d029f83d69~mv2.gif",
];

document.body.style.background = `url(${
  backgrounds[Math.floor(Math.random() * backgrounds.length)]
})`;
document.body.style.backgroundSize = "cover";
