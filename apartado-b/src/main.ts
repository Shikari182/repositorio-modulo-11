
const htmlInput = document.getElementById('htmlInput') as HTMLTextAreaElement;
const extractButton = document.getElementById('extractButton') as HTMLButtonElement;
const resultsContainer = document.getElementById('results') as HTMLDivElement;


const imgRegex = /<img\s+?(?:[^>]*?\s+?)?src\s*?=\s*?(["'])(.*?)\1/gi;

const extractImageLinks = (html: string): string[] => {
    const matches = Array.from(html.matchAll(imgRegex));
    return matches.map(match => match[2]).filter(Boolean);
};


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