document.addEventListener('DOMContentLoaded', function () {
    const rollDiceButton = document.getElementById('rollDiceButton');
    const diceResultSpan = document.getElementById('diceResultSpan');
    const characterForm = document.getElementById('characterForm');
    const characterSheet = document.getElementById('characterSheet');
    const characterDetails = document.getElementById('characterDetails');
    const requiredFields = ['name', 'characterClass', 'region', 'faith'];

    const inputFile = document.querySelector("#picture__input");
    const pictureImage = document.querySelector(".picture__image");
    const pictureImageTxt = "Choose an image";
    pictureImage.innerHTML = pictureImageTxt;

    function rollDice() {
        const diceQuantity = parseInt(document.getElementById('diceQuantity').value);
        const diceSides = parseInt(document.getElementById('diceSides').value);
        let totalRoll = 0;
        let individualRolls = [];

        for (let i = 0; i < diceQuantity; i++) {
            const diceRoll = Math.floor(Math.random() * diceSides) + 1;
            individualRolls.push(diceRoll);
            totalRoll += diceRoll;
        }

        diceResultSpan.textContent = `${totalRoll} (${individualRolls.join(', ')})`;
    }

    function displayCharacterSheet(formData) {
        const characterSheetContent = `
            <!-- ... (código anterior) ... -->
        `;

        characterSheet.style.display = 'block';
        characterDetails.innerHTML = characterSheetContent;
    }

    rollDiceButton.addEventListener('click', rollDice);

    characterForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Verificar se todos os campos obrigatórios estão preenchidos
        let formIsValid = true;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (input.value.trim() === '') {
                formIsValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (formIsValid) {
            displayCharacterSheet(new FormData(characterForm));
        } else {
            characterSheet.style.display = 'none';
            characterDetails.innerHTML = '<p class="error-message">Preencha todos os campos obrigatórios.</p>';
        }
    });

    inputFile.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function (e) {
                const readerTarget = e.target;

                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture__img");

                pictureImage.innerHTML = "";
                pictureImage.appendChild(img);
            });

            reader.readAsDataURL(file);
        } else {
            pictureImage.innerHTML = pictureImageTxt;
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const characterForm = document.getElementById('characterForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAxH5o_IV9WZn72FyYUeyM4JbF4ls4cvqw",
        authDomain: "ficha-teste-ad5fa.firebaseapp.com",
        projectId: "ficha-teste-ad5fa",
        storageBucket: "ficha-teste-ad5fa.appspot.com",
        messagingSenderId: "890260354540",
        appId: "1:890260354540:web:7b64a2205de5a347fc3cc9"
      };
  
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    
    // Evento de envio do formulário
    characterForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Obtenha os dados do formulário (substitua pelos seus campos)
        const formData = {
            name: document.getElementById('name').value,
            characterClass: document.getElementById('characterClass').value,
            // ... outros campos da ficha de personagem
        };
        
        // Salvar dados no Firebase
        db.collection('characters').add(formData)
            .then(() => {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
            })
            .catch(error => {
                console.error(error);
                successMessage.style.display = 'none';
                errorMessage.style.display = 'block';
            });
    });
});
