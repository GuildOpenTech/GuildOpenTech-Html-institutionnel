// URL de l'App Script
// https://script.google.com/macros/s/AKfycbxDQdNgcABYVN7gt3SapHvsBTyKDOoUpH26nTRwxH_G5xeQdrxd4wMPf7cWEacUDGtd/exec

const formTest = document.getElementById("my-form-2");

formTest.addEventListener("submit", function (event) {
  event.preventDefault();
  const url =
    "https://script.google.com/macros/s/AKfycbxDQdNgcABYVN7gt3SapHvsBTyKDOoUpH26nTRwxH_G5xeQdrxd4wMPf7cWEacUDGtd/exec";
  const formData = new FormData(formTest);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Succès:", data);
      alert("Données envoyées avec succès!");
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert("Erreur lors de l'envoi des données.");
    });
});
