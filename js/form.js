const iconFieldMdp = document.getElementById("iconFieldMdp");
const iconFieldMdp2 = document.getElementById("iconFieldMdp2");
const iconFieldDiscord = document.getElementById("iconFieldDiscord");
const formTest2 = document.getElementById("my-form-2");
const formTest = document.getElementById("my-form");
const fieldMdp = document.getElementById("fieldMdp");
const fieldMdp2 = document.getElementById("fieldMdp2");
const fieldDiscord = document.getElementById("fieldDiscord");
const inputMdp = document.getElementById("password");
const inputMdp2 = document.getElementById("password2");
const inputDiscord = document.getElementById("nicknameDiscord");
const inputRepeatPassword = document.getElementById("repeatPassword");
const inputRepeatPassword2 = document.getElementById("repeatPassword2");
const divMessageSend = document.getElementById("formValid");
const btnMessage = document.getElementById("btnData");
const spinner = document.getElementById("spinner");
const messageTextIsSend = document.getElementById("messageTextIsSend")

btnMessage.addEventListener("click", function () {
  divMessageSend.classList.remove("messageSendData");
  divMessageSend.classList.add("sendData");
});

const windowInformation = document.createElement("div");
windowInformation.classList.add("windowInfo");
const contentWindow = document.createTextNode(
  "Min. 12 caractères avec lettres minuscules, majuscules, chiffres et un caractère spécial"
);
windowInformation.appendChild(contentWindow);

iconFieldMdp.addEventListener("mouseenter", function () {
  fieldMdp.appendChild(windowInformation);
});

iconFieldMdp.addEventListener("mouseleave", function () {
  fieldMdp.removeChild(windowInformation);
});

iconFieldMdp2.addEventListener("mouseenter", function () {
  fieldMdp2.appendChild(windowInformation);
});

iconFieldMdp2.addEventListener("mouseleave", function () {
  fieldMdp2.removeChild(windowInformation);
});

const windowInformationDiscord = document.createElement("div");
windowInformationDiscord.classList.add("windowInfo");
const contentWindowDiscord = document.createTextNode(
  "Max. 60 caractères"
);
windowInformationDiscord.appendChild(contentWindowDiscord);

iconFieldDiscord.addEventListener("mouseenter", function () {
  fieldDiscord.appendChild(windowInformationDiscord);
});

iconFieldDiscord.addEventListener("mouseleave", function () {
  fieldDiscord.removeChild(windowInformationDiscord);
});

function validateMDP(mdp) {
  var Reg = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/
  );
  return Reg.test(mdp);
}

function updateValue(e) {
  const targetSelector = e.target.getAttribute("data-target");
  const errorField = document.querySelector(targetSelector);
  // const isValidMdp = e.target.value;
  const fieldValue = e.target.value;

  if (e.target.name === "password") {
    if (!validateMDP(fieldValue)) {
      errorField.classList.add("errorMdp");
      errorField.innerHTML = "Mot de passe invalide !";
    } else {
      errorField.classList.remove("errorMdp");
      errorField.innerHTML = "";
    }
  }
  // if (!validateMDP(isValidMdp)) {
  //   errorField.classList.add("errorMdp");
  //   errorField.innerHTML = "Mot de passe invalide !";
  // } else {
    //   errorField.classList.remove("errorMdp");
    //   errorField.innerHTML = "";
    // }
    
    if (e.target.name === "nicknameDiscord") {
      if (fieldValue.length > 60) {
        errorField.classList.add("errorMdp");
        console.log("🚀 ~ updateValue ~ errorField:", errorField)
      errorField.innerHTML = "Le champ ne doit pas dépasser 60 caractères !";
    } else {
      errorField.classList.remove("errorMdp");
      errorField.innerHTML = "";
    }
  }
}

function handleRepeatMdp(e) {
  const mdp = inputMdp.value;
  const mdp2 = inputMdp2.value;
  const mdpRepeat = e.target.value;

  const targetSelector = e.target.getAttribute("data-target");
  const errorField = document.querySelector(targetSelector);

  if (mdp !== mdpRepeat && mdp2 !== mdpRepeat) {
    errorField.classList.add("errorMdp");
    errorField.innerHTML = "Les mots de passe ne correspondent pas !";
  } else {
    errorField.classList.remove("errorMdp");
    errorField.innerHTML = "";
  }
}

inputRepeatPassword.addEventListener("change", handleRepeatMdp);
inputRepeatPassword2.addEventListener("change", handleRepeatMdp);

function clearMessage(e) {
  const targetSelector = e.target.getAttribute("data-target");
  const test = document.querySelector(targetSelector);
  
  test.classList.remove("errorMdp");
  test.innerHTML = "";
}

inputMdp.addEventListener("change", updateValue);
inputMdp2.addEventListener("change", updateValue);
inputDiscord.addEventListener("change", updateValue);

inputMdp.addEventListener("input", clearMessage);
inputMdp2.addEventListener("input", clearMessage);

inputRepeatPassword.addEventListener("input", clearMessage);
inputRepeatPassword2.addEventListener("input", clearMessage);

formTest.addEventListener("submit", function (event) {
  event.preventDefault();
  const url = "https://script.google.com/macros/s/AKfycbzCFh3kGYeuqCgkK-ZmThSBxFMFglYeMZxiB46YO3mXbM3EyW32Sh_K9p4wpXrbnGmh/exec";
  const formData = new FormData(formTest);
  
  // Afficher le spinner
  spinner.classList.remove("hiddenSpin");
  spinner.classList.add("spin");
  
  // Envoi des données
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

      spinner.classList.remove("spin");
      spinner.classList.add("hiddenSpin");

      divMessageSend.classList.remove("sendData");
      divMessageSend.classList.add("messageSendData");
      messageTextIsSend.textContent = "Vos informations ont bien été envoyées ! Merci";
      divMessageSend.appendChild(messageTextIsSend);
    })
    .catch((error) => {
      console.error("Erreur:", error);

      spinner.classList.remove("spin");
      spinner.classList.add("hiddenSpin");

      divMessageSend.classList.remove("sendData");
      divMessageSend.classList.add("messageSendData");
      messageTextIsSend.textContent = "Une erreur est survenue ! Si le problème persiste, contactez-nous : contact@guildopentech.org";
      divMessageSend.appendChild(messageTextIsSend);
    });
});

formTest2.addEventListener("submit", function (event) {
  event.preventDefault();
  const url = "https://script.google.com/macros/s/AKfycbzCFh3kGYeuqCgkK-ZmThSBxFMFglYeMZxiB46YO3mXbM3EyW32Sh_K9p4wpXrbnGmh/exec";
  const formData = new FormData(formTest2);
  
  spinner.classList.remove("hiddenSpin");
  spinner.classList.add("spin");
  
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
      spinner.classList.remove("spin");
      spinner.classList.add("hiddenSpin");

      formTest2.reset()
      divMessageSend.classList.remove("sendData");
      divMessageSend.classList.add("messageSendData");
      messageTextIsSend.textContent = "Vos informations ont bien été envoyées ! Merci";
      divMessageSend.appendChild(messageTextIsSend);
    })
    .catch((error) => {
      console.error("Erreur:", error);

      spinner.classList.remove("spin");
      spinner.classList.add("hiddenSpin");

      divMessageSend.innerHTML = "";

      divMessageSend.classList.remove("sendData");
      divMessageSend.classList.add("messageSendData");
      messageTextIsSend.textContent = "Une erreur est survenue ! Si le problème persiste, contactez-nous : contact@guildopentech.org";
      divMessageSend.appendChild(messageTextIsSend);
    });
});
