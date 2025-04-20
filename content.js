function sendGeminiPrompt(content, promptType) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: "GEMINI_OPTIMIZE",
          payload: { content, promptType },
        },
        (response) => {
          resolve(response);
        }
      );
    });
}

 function addButton() {
    const suggestionBar = document.querySelector('div[role="presentation"] div.flex.gap-2.overflow-x-auto');
    const searchBar = document.querySelector("#prompt-textarea");

    if (suggestionBar) {
        if (!document.getElementById('my-extension-btn')) {
            const button = document.createElement('button');
            button.id = 'my-extension-btn';
            button.innerText = 'Optimize Prompt ✨';
            button.className = 'px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 whitespace-nowrap';
            button.style.marginLeft = '8px';
  
            button.onclick = (event) => {
                event.preventDefault();
                event.stopPropagation();

                const popup = document.createElement('div');
                popup.id = 'my-extension-popup';
                popup.style.position = 'absolute';
                popup.style.top = '50%';
                popup.style.left = '50%';
                popup.style.transform = 'translate(-50%, -50%)';
                popup.style.backgroundColor = 'white';
                popup.style.padding = '20px';
                popup.style.borderRadius = '8px';
                popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                popup.style.zIndex = '9999';
                
                const select = document.createElement('select');
                select.id = 'my-extension-select';
                select.style.width = '100%';
                select.style.marginBottom = '10px';
                select.style.padding = '8px';
                select.style.borderRadius = '4px';
                select.style.border = '1px solid #ccc';
                select.style.boxSizing = 'border-box';
                select.style.fontSize = '16px';
                select.style.fontFamily = 'Arial, sans-serif';
                select.style.backgroundColor = '#f9f9f9';
                select.style.color = '#333';
                select.style.outline = 'none';
                select.style.cursor = 'pointer';
                select.innerHTML = `
                  <option value="Professional">Professional</option>
                  <option value="Funny">Funny</option>
                  <option value="Educative">Educative</option>
                `;
                popup.appendChild(select);

                const generateButton = document.createElement('button');
                generateButton.innerText = 'Generate';
                generateButton.style.width = '100%';
                generateButton.style.padding = '10px';
                generateButton.style.borderRadius = '4px';
                generateButton.style.border = 'none';
                generateButton.style.backgroundColor = '#4CAF50';
                generateButton.style.color = 'white';
                generateButton.style.fontSize = '16px';
                generateButton.style.cursor = 'pointer';
                generateButton.style.marginTop = '10px';
                generateButton.style.transition = 'background-color 0.3s ease';
                generateButton.onmouseover = () => {
                    generateButton.style.backgroundColor = '#45a049';
                };
                generateButton.onmouseout = () => {
                    generateButton.style.backgroundColor = '#4CAF50';
                };

                generateButton.onclick = async () => {
                    const selectedValue = select.value;
                    const promptValue = searchBar.innerText.trim();

                    if (promptValue === '') {
                        alert('Please enter a prompt before optimizing.');
                    } else {
                        const response = await sendGeminiPrompt(promptValue, selectedValue);
                        const val = response.data.candidates[0].content.parts[0].text;
                        searchBar.innerText = val;
                        searchBar.dispatchEvent(new Event("input", { bubbles: true }));
                    }

                    popup.remove();
                };

                popup.appendChild(generateButton);
                document.body.appendChild(popup);
                window.onkeydown = (event) => {
                    if (event.key === 'Escape') {
                        popup.remove();
                    }
                };
            };

            suggestionBar.appendChild(button);
        }
    }
}

setInterval(() => {
    addButton();
}, 1000);
