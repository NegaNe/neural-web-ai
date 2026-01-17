document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('submitChat').addEventListener('click', getAIResponse);
});

async function getAIResponse() {
    const question = document.getElementById('question').value;
    const resultDiv = document.getElementById('result');

    if (!question) return alert("Cannot be empty");

    resultDiv.innerText = "Responding...";

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            resultDiv.innerText = data.choices[0].message.content;
        } else {
            resultDiv.innerText = "No answer received";
        }

    } catch (error) {
        console.error(error);
        resultDiv.innerText = "Error connecting to server";
    }
}