var cases;

// Load the list of cases from the JSON file
fetch('js/cases.json')
    .then(response => response.json())
    .then(data => {
        cases = data;
        // Add an option for each case to the select element
        var selectElement = document.getElementById('case_select');
        for (var i = 0; i < cases.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.textContent = 'Case #' + cases[i].caseNumber;
            selectElement.appendChild(option);
        }
    });

var currentCaseIndex = 0;
//var currentCase = localStorage.getItem('currentCase');
//    if (currentCase !== null) {
//        currentCaseIndex = currentCase;
//    }
// Function to load a case when the user selects it
function loadCase() {
    var caseIndex = document.getElementById('case_select').value;
    var caseData = cases[caseIndex];
    //var caseData = cases[currentCaseIndex];

    document.getElementById('case_title').innerText = 'Case #' + caseData.caseNumber;
    document.getElementById('indications').innerHTML = caseData.indications.map(paragraph => `<p>${paragraph}</p>`).join('');
    document.getElementById('clinical_impression').innerHTML = caseData.clinical_impression.map(paragraph => `<p>${paragraph}</p>`).join('');
    document.getElementById('ai_impression').innerHTML = caseData.ai_impression.map(paragraph => `<p>${paragraph}</p>`).join('');
    document.getElementById('findings').innerHTML = caseData.findings.map(paragraph => `<p>${paragraph}</p>`).join('');

    // Show the case div and hide the case select div
    document.getElementById('case').style.display = 'block';
    document.getElementById('case_select_div').style.display = 'none';

    currentCaseIndex = caseIndex
    localStorage.setItem('currentCase', currentCaseIndex);
    loadScores();
}


// Variable to keep track of the current case index

// Function to load the next case
function loadNextCase() {
    // Check if there's a next case
    if (currentCaseIndex < cases.length - 1) {
        var confirmation = confirm('Go to the next case?');
        if (!confirmation) {
            return; // Exit the function
        }
        currentCaseIndex++;
        loadPreNextCase();
        window.scrollTo(0, 0);
        checkUnscoredCases_next();
        // This line clears all selections
        clearSelections();
        localStorage.setItem('currentCase', currentCaseIndex);
    }
    loadScores();
}

// Function to load the previous case
function loadPreviousCase() {
    // Check if there's a previous case
    if (currentCaseIndex > 0) {
        var confirmation = confirm('Go to the previous case?');
        if (!confirmation) {
            return; // Exit the function
        }
        currentCaseIndex--;
        loadPreNextCase();
        window.scrollTo(0, 0);
        checkUnscoredCases_previous();
        clearSelections();
        localStorage.setItem('currentCase', currentCaseIndex);
    }
    loadScores();
}

function clearSelections() {
    var radioButtons = document.getElementsByTagName('input');
    for(var i = 0; i < radioButtons.length; i++) {
        if(radioButtons[i].type === 'radio') {
            radioButtons[i].checked = false;
        }
    }
    // Clear textarea for comments as well
    document.getElementById('cli_comments').value = '';
    document.getElementById('ai_comments').value = '';   
}

// Function to load previous/next case 
function loadPreNextCase() {
    var caseData = cases[currentCaseIndex];

    document.getElementById('case_title').innerText = 'Case #' + caseData.caseNumber;
    document.getElementById('indications').innerHTML = caseData.indications.map(paragraph => `<p>${paragraph}</p>`).join('');
    document.getElementById('clinical_impression').innerHTML = caseData.clinical_impression.map(paragraph => `<p>${paragraph}</p>`).join('');
    document.getElementById('ai_impression').innerHTML = caseData.ai_impression.map(paragraph => `<p>${paragraph}</p>`).join('');
    document.getElementById('findings').innerHTML = caseData.findings.map(paragraph => `<p>${paragraph}</p>`).join('');

    // Show the case div and hide the case select div
    document.getElementById('case').style.display = 'block';
    document.getElementById('case_select_div').style.display = 'none';
    //loadScores();
}

// Total number of cases
var totalCases = 5;

// Function to check if all cases are scored
function checkUnscoredCases_previous() {
    
    // Load the scores from localStorage
    var allScores = JSON.parse(localStorage.getItem('scores')) || [];
    // Get the case numbers from the scores
    var scoredCases = allScores.map(score => score.caseNumber);
    // Remove duplicates
    scoredCases = [...new Set(scoredCases)];

    // Calculate the number of unscored cases
    var unscoredCases = totalCases - scoredCases.length;

    // Display the number of unscored cases
    //alert('You have ' + unscoredCases + ' unscored cases. Go to the previous case.');
}

function checkUnscoredCases_next() {
    // Load the scores from localStorage
    var allScores = JSON.parse(localStorage.getItem('scores')) || [];
    // Get the case numbers from the scores
    var scoredCases = allScores.map(score => score.caseNumber);
    // Remove duplicates
    scoredCases = [...new Set(scoredCases)];

    // Calculate the number of unscored cases
    var unscoredCases = totalCases - scoredCases.length;
    
    // Display the number of unscored cases
    //alert('You have ' + unscoredCases + ' unscored cases. Go to the next case.');
}

// Function to load scores from local storage
function loadScores() {
    // Retrieve case number
    var caseNumber = parseInt(document.getElementById('case_title').innerText.replace('Case #', ''));

    // Retrieve scores from local storage
    const allScores = JSON.parse(localStorage.getItem('scores')) || [];
  
    // Find the latest version of scores for the specified case number
    const caseScores = allScores
        .filter(score => score.caseNumber === caseNumber)
        .sort((a, b) => a.timestamp - b.timestamp)
        .pop();

    if (caseScores) {
        const clinicalImpressionScores = caseScores.clinical_impression;
        // Load the scores from local storage
        document.querySelector(`input[name="cli_additions"][value="${clinicalImpressionScores.additions}"]`).checked = true;
        document.querySelector(`input[name="cli_omissions"][value="${clinicalImpressionScores.omissions}"]`).checked = true;
        document.querySelector(`input[name="cli_correctness"][value="${clinicalImpressionScores.correctness}"]`).checked = true;
        document.querySelector(`input[name="cli_readability"][value="${clinicalImpressionScores.clarity}"]`).checked = true;
        document.querySelector(`input[name="cli_interp"][value="${clinicalImpressionScores.interpretive}"]`).checked = true;
        document.querySelector(`input[name="cli_recommend"][value="${clinicalImpressionScores.recommendation}"]`).checked = true;
        document.querySelector(`input[name="cli_score"][value="${clinicalImpressionScores.overall}"]`).checked = true;
        document.getElementById('cli_comments').value = caseScores.clinical_comments || '';

        const aiImpressionScores = caseScores.ai_impression;
        document.querySelector(`input[name="ai_additions"][value="${aiImpressionScores.additions}"]`).checked = true;
        document.querySelector(`input[name="ai_omissions"][value="${aiImpressionScores.omissions}"]`).checked = true;
        document.querySelector(`input[name="ai_correctness"][value="${aiImpressionScores.correctness}"]`).checked = true;
        document.querySelector(`input[name="ai_readability"][value="${aiImpressionScores.clarity}"]`).checked = true;
        document.querySelector(`input[name="ai_interp"][value="${aiImpressionScores.interpretive}"]`).checked = true;
        document.querySelector(`input[name="ai_recommend"][value="${aiImpressionScores.recommendation}"]`).checked = true;
        document.querySelector(`input[name="ai_score"][value="${aiImpressionScores.overall}"]`).checked = true;
        document.getElementById('ai_comments').value = caseScores.ai_comments || '';
    }    
    else {
        // Clear all selections
        document.querySelector(`input[name="cli_additions"][value="${3}"]`).checked = true;
        document.querySelector(`input[name="cli_omissions"][value="${3}"]`).checked = true;
        document.querySelector(`input[name="cli_correctness"][value="${3}"]`).checked = true;
        document.querySelector(`input[name="cli_readability"][value="${3}"]`).checked = true;
        document.querySelector(`input[name="cli_interp"][value="${3}"]`).checked = true;
        document.querySelector(`input[name="cli_recommend"][value="${3}"]`).checked = true;
        document.querySelector(`input[name="cli_score"][value="${5}"]`).checked = true;
    }
}
