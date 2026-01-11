const sendBtn = document.getElementById('send-btn')
const inputArea = document.getElementById('input')
const flagContainer = document.getElementById('flag-container')
const flags = document.querySelectorAll('.flag')
const chatContainer = document.getElementById('chat-container')

let language = 'french'
flags.forEach( flag => {

    flag.addEventListener('click', () => {

        flags.forEach( f => {
            f.classList.remove('selected')
        })

        flag.classList.add('selected')

        const languageCode = flag.dataset.lang


        if( languageCode === 'fr') {
            language = 'french'
            addMessageToChat('OK, now i will translate what you type into french', 'bot')
        } else if ( languageCode === 'sp') {
            language = 'spanish'
            addMessageToChat('OK, now i will translate what you type into spanish', 'bot')
        } else {
            language = 'japanese'
            addMessageToChat('OK, now i will translate what you type into japanese', 'bot')
        }

    })

})


sendBtn.addEventListener('click', async () => {

    const input = inputArea.value.trim()

    if(!input) {
        alert('Please enter some text first!')
        return
    }

    inputArea.value = ''
    addMessageToChat(input, 'user');

    try {

        const response = await fetch('http://localhost:3000/translate', {method: 'POST', headers: {
                                                                                 'Content-Type': 'application/json'
                                                                              },
                                                                            body: JSON.stringify({
                                                                                language: language,
                                                                                text: input
                                                                            })})
                                                                    
        const data = await response.json()

        if (data.TranslatedText) {
            addMessageToChat(data.TranslatedText, 'bot');
        } else {
            addMessageToChat("Error: Could not translate.", 'bot');
        }

    } catch (err) {
        console.log(`Couldn't contact the server `, err)
        addMessageToChat("Server seems to be offline.", 'bot');
    }
})

function addMessageToChat(text, sender) {
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat', sender);
    
    const textElement = document.createElement('h1');
    textElement.textContent = text;
    
    messageDiv.appendChild(textElement);
    chatContainer.appendChild(messageDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}


