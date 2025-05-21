import { 
    isWellFormatted, 
    isValidIban, 
    extractIbanInfo, 
    getBankName 
} from './ibanUtils';

// Elementos del DOM
const elements = {
    ibanInput: document.getElementById('ibanInput') as HTMLInputElement,
    validateButton: document.getElementById('validateButton')!,
    resultContainer: document.getElementById('resultContainer')!,
    errorMessage: document.getElementById('errorMessage')!,
    bankName: document.getElementById('bankName')!,
    branchCode: document.getElementById('branchCode')!,
    controlDigit: document.getElementById('controlDigit')!,
    accountNumber: document.getElementById('accountNumber')!,
};

// Manejador principal
const handleValidation = () => {
    const rawIban = elements.ibanInput.value.trim();
    
    try {
        // Resetear estado
        elements.errorMessage.classList.add('hidden');
        elements.resultContainer.classList.add('hidden');

        // Validaciones
        if (!rawIban) throw new Error('Por favor introduce un IBAN');
        if (!isWellFormatted(rawIban)) throw new Error('Formato IBAN incorrecto');
        if (!isValidIban(rawIban)) throw new Error('IBAN inválido');

        // Extraer información
        const ibanInfo = extractIbanInfo(rawIban);
        
        // Actualizar UI
        elements.bankName.textContent = getBankName(ibanInfo.bankCode);
        elements.branchCode.textContent = ibanInfo.branchCode;
        elements.controlDigit.textContent = ibanInfo.branchControlDigit;
        elements.accountNumber.textContent = ibanInfo.accountNumber;
        elements.resultContainer.classList.remove('hidden');

    } catch (error) {
        if (error instanceof Error) {
            elements.errorMessage.textContent = error.message;
            elements.errorMessage.classList.remove('hidden');
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    elements.validateButton.addEventListener('click', handleValidation);
    elements.ibanInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleValidation();
    });
});