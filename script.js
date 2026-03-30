document.addEventListener('DOMContentLoaded', () => {
    const pictureInput = document.getElementById('picture__input');
    const pictureImage = document.querySelector('.picture__image');
    const diceResult = document.getElementById('diceResult');
    const characterForm = document.getElementById('characterForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // 1. Carregar imagem do personagem
    pictureInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.classList.add('picture__img'); // Adiciona a classe do seu CSS
                pictureImage.innerHTML = '';
                pictureImage.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. Rolar dados (utilizando o botão já existente no HTML)
    const diceButton = document.getElementById('btnRollDice');
    if (diceButton) {
        diceButton.addEventListener('click', () => {
            const result = Math.floor(Math.random() * 20) + 1;
            diceResult.textContent = `Resultado: ${result}`;
        });
    }

    // 3. Salvar ficha
    characterForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        const formData = new FormData(characterForm);
        
        try {
            // Lembre-se de trocar essa URL pela API real do seu back-end depois
            const response = await fetch('https://seu-servidor-api.com/save', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erro na comunicação com o servidor');
            }

            const result = await response.json();
            if (result.success) {
                successMessage.textContent = 'Ficha salva com sucesso!';
                successMessage.style.display = 'block';
            } else {
                throw new Error(result.message || 'Erro no servidor');
            }
        } catch (error) {
            errorMessage.textContent = error.message || 'Erro ao salvar a ficha. Por favor, tente novamente.';
            errorMessage.style.display = 'block';
        }
    });
});