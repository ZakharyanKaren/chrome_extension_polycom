chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "contactsReceived") {
        const searchResultsTable = document.querySelector(".searchResultsTable");
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                const addedElements = Array.from(mutation.addedNodes)
                    .filter(node => node.nodeType === Node.ELEMENT_NODE)
                    .flatMap(node => Array.from(node.getElementsByClassName('contact')));

                addedElements.forEach(el => {
                    el.addEventListener('click', event => {
                        event.stopPropagation();
                        event.preventDefault();
                    });

                    if (!el.querySelector('button') && !el.querySelector('a')) {
                        const button = document.createElement("button");
                        button.onclick = e => {
                            const contactValue = e.target.innerText.trim();
                            let phoneNumber = contactValue.replace(/\D/g, '');
                            console.log('this is phone number ' + contactValue);
                            chrome.runtime.sendMessage({ phoneNumber });
                        }
                        while (el.firstChild) {
                            button.appendChild(el.firstChild);
                        }
                        el.appendChild(button);
                    }
                });
            });
        });
        observer.observe(searchResultsTable, { childList: true, subtree: true });
    }
});