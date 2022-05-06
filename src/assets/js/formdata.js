
const getFormData = () => {
  const form = document.getElementById("form");
  return new FormData(form);
};

const toJson = function (event) {
  const formData = getFormData();
  // event.preventDefault();
  let object = {};
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });

  let data = window.localStorage.getItem('form') || "{}";
  data = Object.assign({}, JSON.parse(data), object);
  let json = JSON.stringify(data);

  window.localStorage.setItem('form', json);
};

window.onload = function () {
  const submit = document.getElementById("next");
  if (submit)
    submit.addEventListener("click", toJson);

  let data = window.localStorage.getItem('form') || "{}";
  data = JSON.parse(data);

  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  if (fname) fname.innerHTML = data["first-name"] || '';
  if (lname) lname.innerHTML = data["last-name"] || '';
};
