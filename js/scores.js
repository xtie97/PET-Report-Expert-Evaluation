function submitScores() {
    var caseNumber = document.getElementById('case_title').innerText;
    caseNumber = parseInt(caseNumber.replace('Case #', ''));

    var cli_additions;
    if (document.getElementById('cli_additions_3').checked) {
        cli_additions = document.getElementById('cli_additions_3').value;
    } else if (document.getElementById('cli_additions_2').checked) {
        cli_additions = document.getElementById('cli_additions_2').value;
    } else if (document.getElementById('cli_additions_1').checked) {
        cli_additions = document.getElementById('cli_additions_1').value;
    }

    var cli_omissions;
    if (document.getElementById('cli_omissions_3').checked) {
        cli_omissions = document.getElementById('cli_omissions_3').value;
    } else if (document.getElementById('cli_omissions_2').checked) {
        cli_omissions = document.getElementById('cli_omissions_2').value;
    } else if (document.getElementById('cli_omissions_1').checked) {
        cli_omissions = document.getElementById('cli_omissions_1').value;
    }

    var cli_correctness;
    if (document.getElementById('cli_correct_3').checked) {
        cli_correctness = document.getElementById('cli_correct_3').value;
    } else if (document.getElementById('cli_correct_2').checked) {
        cli_correctness = document.getElementById('cli_correct_2').value;
    } else if (document.getElementById('cli_correct_1').checked) {
        cli_correctness = document.getElementById('cli_correct_1').value;
    }

    var cli_readability;
    if (document.getElementById('cli_read_3').checked) {
        cli_readability = document.getElementById('cli_read_3').value;
    } else if (document.getElementById('cli_read_2').checked) {
        cli_readability = document.getElementById('cli_read_2').value;
    } else if (document.getElementById('cli_read_1').checked) {
        cli_readability = document.getElementById('cli_read_1').value;
    }

    var cli_interp; 
    if (document.getElementById('cli_interp_1').checked) {
        cli_interp = document.getElementById('cli_interp_1').value;
    } else if (document.getElementById('cli_interp_2').checked) {
        cli_interp = document.getElementById('cli_interp_2').value;
    } else if (document.getElementById('cli_interp_3').checked) {
        cli_interp = document.getElementById('cli_interp_3').value;
    } 

    var cli_recommendation;
    if (document.getElementById('cli_recommend_1').checked) {
        cli_recommendation = document.getElementById('cli_recommend_1').value;
    } else if (document.getElementById('cli_recommend_2').checked) {
        cli_recommendation = document.getElementById('cli_recommend_2').value;
    } else if (document.getElementById('cli_recommend_3').checked) {
        cli_recommendation = document.getElementById('cli_recommend_3').value;
    }

    var cli_score;
    if (document.getElementById('cli_score_1').checked) {
        cli_score = document.getElementById('cli_score_1').value;
    } else if (document.getElementById('cli_score_2').checked) {
        cli_score = document.getElementById('cli_score_2').value;
    } else if (document.getElementById('cli_score_3').checked) {
        cli_score = document.getElementById('cli_score_3').value;
    } else if (document.getElementById('cli_score_4').checked) {
        cli_score = document.getElementById('cli_score_4').value;
    } else if (document.getElementById('cli_score_5').checked) {
        cli_score = document.getElementById('cli_score_5').value;
    }

    var ai_additions;
    if (document.getElementById('ai_additions_3').checked) {
        ai_additions = document.getElementById('ai_additions_3').value;
    } else if (document.getElementById('ai_additions_2').checked) {
        ai_additions = document.getElementById('ai_additions_2').value;
    } else if (document.getElementById('ai_additions_1').checked) {
        ai_additions = document.getElementById('ai_additions_1').value;
    }

    var ai_omissions;
    if (document.getElementById('ai_omissions_3').checked) {
        ai_omissions = document.getElementById('ai_omissions_3').value;
    } else if (document.getElementById('ai_omissions_2').checked) {
        ai_omissions = document.getElementById('ai_omissions_2').value;
    } else if (document.getElementById('ai_omissions_1').checked) {
        ai_omissions = document.getElementById('ai_omissions_1').value;
    }

    var ai_correctness;
    if (document.getElementById('ai_correct_3').checked) {
        ai_correctness = document.getElementById('ai_correct_3').value;
    } else if (document.getElementById('ai_correct_2').checked) {
        ai_correctness = document.getElementById('ai_correct_2').value;
    } else if (document.getElementById('ai_correct_1').checked) {
        ai_correctness = document.getElementById('ai_correct_1').value;
    }

    var ai_readability;
    if (document.getElementById('ai_read_3').checked) {
        ai_readability = document.getElementById('ai_read_3').value;
    } else if (document.getElementById('ai_read_2').checked) {
        ai_readability = document.getElementById('ai_read_2').value;
    } else if (document.getElementById('ai_read_1').checked) {
        ai_readability = document.getElementById('ai_read_1').value;
    }

    var ai_interp;
    if (document.getElementById('ai_interp_1').checked) {
        ai_interp = document.getElementById('ai_interp_1').value;
    } else if (document.getElementById('ai_interp_2').checked) {
        ai_interp = document.getElementById('ai_interp_2').value;
    } else if (document.getElementById('ai_interp_3').checked) {
        ai_interp = document.getElementById('ai_interp_3').value;
    }

    var ai_recommendation;
    if (document.getElementById('ai_recommend_1').checked) {
        ai_recommendation = document.getElementById('ai_recommend_1').value;
    } else if (document.getElementById('ai_recommend_2').checked) {
        ai_recommendation = document.getElementById('ai_recommend_2').value;
    } else if (document.getElementById('ai_recommend_3').checked) {
        ai_recommendation = document.getElementById('ai_recommend_3').value;
    }

    var ai_score;
    if (document.getElementById('ai_score_1').checked) {
        ai_score = document.getElementById('ai_score_1').value;
    } else if (document.getElementById('ai_score_2').checked) {
        ai_score = document.getElementById('ai_score_2').value;
    } else if (document.getElementById('ai_score_3').checked) {
        ai_score = document.getElementById('ai_score_3').value;
    } else if (document.getElementById('ai_score_4').checked) {
        ai_score = document.getElementById('ai_score_4').value;
    } else if (document.getElementById('ai_score_5').checked) {
        ai_score = document.getElementById('ai_score_5').value;
    }
    
    var scores = {
        caseNumber: caseNumber,
        clinical_impression: {
            additions: cli_additions,
            omissions: cli_omissions,
            correctness: cli_correctness,
            clarity: cli_readability,
            interpretive: cli_interp,
            recommendation: cli_recommendation,
            overall: cli_score
        },
        clinical_comments: document.getElementById('cli_comments').value,  // Added line

        ai_impression: {
            additions: ai_additions,
            omissions: ai_omissions,
            correctness: ai_correctness,
            clarity: ai_readability,
            interpretive: ai_interp,
            recommendation: ai_recommendation,
            overall: ai_score
        },
        ai_comments: document.getElementById('ai_comments').value  // Added line
    };

    // Sanity check - Check if all scores have a value
    for (var key in scores.ai_impression) {
        if (scores.ai_impression[key] === undefined) {
            alert("Not all scores for AI Impression are entered.");
            return;  // Exit the function
        }
    }

    for (var key in scores.clinical_impression) {
        if (scores.clinical_impression[key] === undefined) {
            alert("Not all scores for Clinical Impression are entered.");
            return;  // Exit the function
        }
    }
    
    // Load the scores from localStorage
    var allScores = JSON.parse(localStorage.getItem('scores')) || [];
    // Add the new scores to the array and save it back to localStorage
    allScores.push(scores);
    localStorage.setItem('scores', JSON.stringify(allScores));
    
    // save the scores to a file
    var allScores = JSON.parse(localStorage.getItem('scores')) || [];

    // create a file for the evaluated case only
    var data = JSON.stringify(scores, null, 2);
    var blob = new Blob([data], {type: 'text/plain'});
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.download = 'scores_case_' + caseNumber + '.txt'; 
    link.href = url;
    link.click();

    alert('Scores have been uploaded successfully. Thanks!');
}

function downloadScores() {
    // Load the scores from localStorage
    var allScores = JSON.parse(localStorage.getItem('scores')) || [];

    // Convert the scores array to a JSON string
    var data = JSON.stringify(allScores, null, 2);
    var blob = new Blob([data], {type: 'text/plain'});
    var url = URL.createObjectURL(blob);

    // Create a link element, set the href to the blob URL, and click it to download the file
    var link = document.createElement('a');
    link.download = 'scores.txt';
    link.href = url;
    link.click();
}


function clear_cache() {
    // ask for confirmation
    var confirmation = confirm('Are you sure you want to clear the browser cache (YES if it is your first time to review)?');
    if (!confirmation) {
        return; // Exit the function
    }
    localStorage.clear();
    alert('Cache cleared!');
}


