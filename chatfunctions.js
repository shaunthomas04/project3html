async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const userMessage = inputField.value;
    const chatHistory = document.getElementById('chatHistory');

    if (userMessage) {
        // Append user's message to chat history
        const userDiv = document.createElement('div');
        userDiv.classList.add('input');

        const userImage = document.createElement('img');
        userImage.src = 'images/profile-user.png';
        userImage.width = 70;
        userImage.height = 70;
        userImage.style.margin = '0 0 0 10px';

        userDiv.appendChild(userImage);
        const textNode = document.createTextNode(` : ${userMessage}`);
        userDiv.appendChild(textNode);
        chatHistory.appendChild(userDiv);

        userDiv.scrollIntoView({ behavior: "smooth", block: "end" });
        
        //Append loading message an image to chat history
        const loadingDiv = document.createElement('div');
        const loadingImage = document.createElement('img');
        loadingDiv.classList.add('input');

        loadingImage.src = 'images/thinking.jpg';
        loadingImage.width = 70;
        loadingImage.height = 70;
        loadingImage.style.borderRadius = '50%';
        loadingImage.style.margin = '0 0 0 10px';
        loadingDiv.appendChild(loadingImage);

        const textNodeLoading = document.createTextNode(` : `);
        loadingDiv.appendChild(textNodeLoading);

        const loadingIndicator = document.createElement('img');
        loadingIndicator.src = 'images/loadinggif.gif';
        loadingIndicator.width = 45;
        loadingIndicator.height = 45;
        loadingIndicator.style.borderRadius = '50%';
        loadingIndicator.style.margin = '0 0 0 10px';
        loadingDiv.appendChild(loadingIndicator);

        chatHistory.appendChild(loadingDiv);
        
        loadingDiv.scrollIntoView({ behavior: "smooth", block: "end" });


        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        //remove loading image and content
        loadingDiv.style.display = 'none';

        const data = await response.json();
        // Append bot's response to chat history
        const botDiv = document.createElement('div');
        const botImage = document.createElement('img');
        botImage.src = 'images/gordonFace.jpg';
        botImage.width = 70;
        botImage.height = 70;
        botImage.style.borderRadius = '50%';
        botImage.style.margin = '0 0 0 10px';

        botDiv.appendChild(botImage);
        const botTextNode = document.createTextNode(` : ${data.message}`);
        botDiv.appendChild(botTextNode);
        botDiv.classList.add('input');
        chatHistory.appendChild(botDiv);

        inputField.value = ''; 

    }
}


function clearMessages(){
    const chatHistory = document.getElementById('chatHistory');
    chatHistory.innerHTML = '';
}
