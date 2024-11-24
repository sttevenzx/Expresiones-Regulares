// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    // Funciones de validación y búsqueda
    const validationUtils = {
        // Validar email
        isValidEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailRegex.test(email);
        },

        // Buscar todos los emails en un texto
        findEmails(text) {
            const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
            return text.match(emailRegex) || [];
        },

        // Buscar números de teléfono (varios formatos)
        findPhoneNumbers(text) {
            const phoneRegex = /(?:\+34|0034|34)?[-\s]?(?:6\d{8}|[89]\d{8}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/g;
            return text.match(phoneRegex) || [];
        },

        // Validar contraseña fuerte
        isStrongPassword(password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        },

        // Eliminar caracteres especiales
        removeSpecialChars(text) {
            return text.replace(/[^a-zA-Z0-9\s]/g, '');
        },

        // Extraer texto entre comillas
        extractQuotedText(text) {
            const quotedRegex = /"([^"]*)"/g;
            const matches = [];
            let match;
            
            while ((match = quotedRegex.exec(text)) !== null) {
                matches.push(match[1]);
            }
            return matches;
        },

        // Validar DNI español
        isValidDNI(dni) {
            const dniRegex = /^[0-9]{8}[A-Z]$/;
            return dniRegex.test(dni);
        },

        // Limpiar espacios múltiples
        cleanExtraSpaces(text) {
            return text.replace(/\s+/g, ' ').trim();
        }
    };

    // Ejemplo de uso en un formulario
    const form = document.getElementById('validationForm');
    const resultContainer = document.getElementById('resultContainer');

    function displayResults(results, type) {
        resultContainer.innerHTML = '';
        const resultDiv = document.createElement('div');
        resultDiv.className = 'ui message';

        if (Array.isArray(results) && results.length > 0) {
            const list = document.createElement('ul');
            results.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                list.appendChild(li);
            });
            resultDiv.appendChild(list);
            resultDiv.className = 'ui positive message';
        } else if (typeof results === 'boolean') {
            resultDiv.textContent = `Validación ${type}: ${results ? 'Válido' : 'No válido'}`;
            resultDiv.className = results ? 'ui positive message' : 'ui negative message';
        } else {
            resultDiv.textContent = 'No se encontraron resultados';
            resultDiv.className = 'ui warning message';
        }

        resultContainer.appendChild(resultDiv);
    }

    // Ejemplo de procesamiento de texto
    function processText(text, operation) {
        let result;
        switch (operation) {
            case 'email':
                result = validationUtils.findEmails(text);
                break;
            case 'phone':
                result = validationUtils.findPhoneNumbers(text);
                break;
            case 'quotes':
                result = validationUtils.extractQuotedText(text);
                break;
            case 'clean':
                result = validationUtils.removeSpecialChars(text);
                displayResults([result], 'texto limpio');
                return;
            default:
                result = [];
        }
        displayResults(result, operation);
    }

    // Manejador de eventos para el formulario
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = document.getElementById('textInput').value;
            const operation = document.getElementById('operationType').value;
            processText(text, operation);
        });
    }
});