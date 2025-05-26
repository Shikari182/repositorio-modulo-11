import {extractImageLinks} from "./motor";

const htmlInput = document.getElementById('htmlInput');
const extractButton = document.getElementById('extractButton');
const resultsContainer = document.getElementById('results');

if (!(htmlInput instanceof HTMLTextAreaElement)) {
    throw new Error('Elemento htmlInput no encontrado o no es un textarea');
}

if (!(extractButton instanceof HTMLButtonElement)) {
    throw new Error('Elemento extractButton no encontrado o no es un botón');
}

if (!(resultsContainer instanceof HTMLDivElement)) {
    throw new Error('Elemento resultsContainer no encontrado o no es un div');
}

const displayResults = (links: string[]): void => {
    resultsContainer.innerHTML = links.length > 0 
        ? links.map(link => {
            const encodedLink = encodeURI(link);
            return `<a href="${encodedLink}" class="image-link" target="_blank" rel="noopener">${link}</a>`;
        }).join('')
        : '<p class="no-results">No se encontraron enlaces</p>';
};


extractButton.addEventListener('click', () => {
    if (!htmlInput.value.trim()) {
        resultsContainer.innerHTML = '<p class="error">Por favor ingresa HTML válido</p>';
        return;
    }
    
    try {
        const links = extractImageLinks(htmlInput.value); 
        displayResults(links);
    } catch (error) {
        resultsContainer.innerHTML = `<p class="error">Error: ${(error as Error).message}</p>`;
    }
});