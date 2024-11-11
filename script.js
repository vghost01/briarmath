const $themeToggle = $('#theme-toggle');
const $langToggle = $('#lang-toggle');

// Define language translations
const translations = {
    en: {
        themeLight: 'Color theme: Light',
        themeDark: 'Color theme: Dark',
        language: 'Language: EN',
        addEquation: 'Σ Add formula',
        langText: '',
        import: 'Import:',
        export: 'Export',
        renderError: 'Error in LaTeX code',
        print: 'Print',
        equationHelp: 'Under the "Add formula" button you will find common notations used in mathematics, physics and chemistry. In addition, special characters can be used to write the formula.',
        latexHelp: 'Formulas can be built by clicking the menu entries and/or typing LaTeX.',
        imageHelp: 'In the editor\'s text field, you can write text and formulas, add images, and import .txt and .html files.',
        paste: 'Paste image from clipboard',
        writeEquation: 'Write formula',
        inEquation: 'Inside formula',
        division: 'Fraction',
        multiply: 'Multiplication sign',
        exponent: 'Exponent',
        closeEquation: 'Close formula',
        nextRowEquation: 'Add formula to the next row',
        undoEquation: 'Undo formula',
        redoEquation: 'Redo formula',
        title: 'BriarMath math editor'
    },
    fi: {
        themeLight: 'Väriteema: Vaalea',
        themeDark: 'Väriteema: Tumma',
        language: 'Kieli: FI',
        addEquation: 'Σ Lisää kaava',
        langText: 'finnish',
        import: 'Tuo:',
        export: 'Vie',
        renderError: 'Virhe LaTeX-koodissa',
        print: 'Tulosta',
        equationHelp: '"Lisää kaava" -napin alta löydät yleisimpiä matematiikassa, fysiikassa ja kemiassa käytettäviä merkintöjä. Lisäksi erikoismerkkejä voi käyttää kaavan kirjoittamiseen.',
        latexHelp: 'Kaavoja voi rakentaa klikkaamalla valikon merkintöjä ja/tai kirjoittamalla LaTeXia.',
        imageHelp: 'Editorin tekstikenttään voi kirjoittaa tekstiä ja kaavoja, lisätä kuvia, sekä tuoda .txt ja .html-tiedostoja.',
        paste: 'Liitä kuva leikepöydältä',
        writeEquation: 'Kirjoita kaava',
        inEquation: 'Kaavassa',
        division: 'Jakoviiva',
        multiply: 'Kertomerkki',
        exponent: 'Eksponentti',
        closeEquation: 'Sulje kaava',
        nextRowEquation: 'Lisää kaava seuraavalle riville',
        undoEquation: 'Palauta kaava',
        redoEquation: 'Tee kaava uudelleen',
        title: 'BriarMath matikkaeditori'
    }
};

// Initialize theme and language
const currentTheme = localStorage.getItem('theme') || '';
const currentLang = localStorage.getItem('language') || 'en';

// Set the initial theme
if (currentTheme) {
    $('body').addClass(currentTheme);
    updateThemeButtonText(currentLang, currentTheme);
}

if (currentLang) {
    $('body').addClass(translations[currentLang].langText);
    updateLanguageButtonText(currentLang);
}

// Toggle theme on button click
$themeToggle.on('click', function() {
    const newTheme = $('body').hasClass('dark-mode') ? '' : 'dark-mode';
    $('body').toggleClass('dark-mode', newTheme === 'dark-mode');
    localStorage.setItem('theme', newTheme);
    updateThemeButtonText(localStorage.getItem('language') || '', newTheme);
});

// Set the initial language and apply translations
applyTranslations(currentLang);
updateThemeButtonText(currentLang, currentTheme);
updateLanguageButtonText(currentLang);

// Toggle language on button click
$langToggle.on('click', function() {
    const newLang = $('body').hasClass('finnish') ? 'en' : 'fi';
    $('body').toggleClass('finnish', newLang === 'fi');
    localStorage.setItem('language', newLang);
    applyTranslations(newLang);
    updateLanguageButtonText(newLang);
    updateThemeButtonText(newLang, localStorage.getItem('theme') || '');
});

// Apply translations based on language
function applyTranslations(language) {
    $('[data-translate]').each(function() {
        const key = $(this).data('translate');
        $(this).text(translations[language][key]);
    });
}

// Update the theme toggle button text based on theme and language
function updateThemeButtonText(language, theme) {
    const themeText = theme === 'dark-mode' ? translations[language].themeDark : translations[language].themeLight;
    $themeToggle.text(themeText);
}

// Update the language toggle button text
function updateLanguageButtonText(language) {
    $langToggle.text(translations[language].language);
}

$(document).ready(function() {
    $('.rich-text-editor-help-button').hide();
    // Add the data-translate attribute to the button manually
    $(".rich-text-editor-new-equation.rich-text-editor-button.rich-text-editor-button-action")
        .attr("data-translate", "addEquation");
    $(".render-error").attr("data-translate", "renderError");
    // Apply translations after setting the data-translate attribute
    applyTranslations(currentLang);
});

// ***
// Prevent reload
// ***

let hasTyped = false;

// Detect typing on answer1
$("#answer1").on("input", function() {
    hasTyped = true;
});

// Warn the user if they try to leave or refresh the page after typing
$(window).on("beforeunload", function(event) {
    if (hasTyped) {
        event.preventDefault(); // Required for most browsers
        event.returnValue = ''; // Required for Chrome to show alert
    }
});

// ***
// Print input
// ***

$('#export').click(e => {
    e.preventDefault(); // Prevent the default link behavior

    // Get the HTML content of the `.answer` element and encode it
    const content = $('.answer').html();

    // Open a new window
    const newWindow = window.open('', '_blank', `width=${screen.width},height=${screen.height}`);

    // Write the HTML content into the new window, wrapped in a basic HTML structure
    newWindow.document.write(`
        <html>
        <head><title>Math content</title></head>
        <body>${content}</body>
        </html>
    `);

    // Close the document to finish loading the content
    newWindow.document.close();
});

