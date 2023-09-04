function highlightSelection(color) {
    // Initialize variables
    var text = "";
    var selectedElement = null;

    // Check if the window supports getSelection (most modern browsers)
    if (window.getSelection) {
        // Get the current selection
        var selection = window.getSelection();
        // Check if anything is selected
        if (selection.rangeCount > 0) {
            // Get the first selected range
            var range = selection.getRangeAt(0);
            // Extract the text of the selection
            text = range.toString();
            // Get the parent HTML element of the selected text
            selectedElement = range.commonAncestorContainer;
        }
    // Check if the document supports selection (IE)
    } else if (document.selection && document.selection.type != "Control") {
        // Get the current selection
        var selection = document.selection.createRange();
        // Extract the text of the selection
        text = selection.text;
        // Get the parent HTML element of the selected text
        selectedElement = selection.parentElement();
    }
    
    // If no text was selected or the selectedElement could not be found, stop the function
    if (text === "" || selectedElement === null) {
        return;
    }
    
    // Define the sections to highlight in
    var sections = ['findings', 'indications', 'clinical_impression', 'ai_impression'];

    // For each section
    sections.forEach(function(section) {
        // Get the HTML element of the section
        var sectionElement = document.getElementById(section);
        // If the selected text is part of the current section
        if (sectionElement.contains(selectedElement)) {
            // Get the current content of the section
            var sectionText = sectionElement.innerHTML;
            // Create the highlighted version of the selected text
            var highlightedText = '<span class="highlight-' + color + '">' + text + '</span>';
            // Replace the selected text with the highlighted version in the section content
            var newText = sectionText.replace(text, highlightedText);
            // Update the section content
            sectionElement.innerHTML = newText;
        }
    });
}


function removeHighlights() {
    var sections = ['findings', 'indications', 'clinical_impression', 'ai_impression'];
    sections.forEach(function(section) {
        var sectionElement = document.getElementById(section);
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);

        // Ensure the range is within the current section
        if (!sectionElement.contains(range.startContainer) || !sectionElement.contains(range.endContainer)) {
            return;  // Skip to the next section
        }
  
        var treeWalker = document.createTreeWalker(
            sectionElement, 
            NodeFilter.SHOW_TEXT, 
            { acceptNode: function(node) { 
                // only accept nodes that have at least one character of non-whitespace text
                return /\S/.test(node.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; 
            } }
        );
    
        treeWalker.currentNode = range.startContainer;
        while (treeWalker.currentNode !== range.endContainer) {
            var node = treeWalker.currentNode;
            if (node.parentNode.className.includes('highlight-')) {
                var highlightedText = node.parentNode;
                var textNode = document.createTextNode(node.data);
                highlightedText.replaceWith(textNode);
                treeWalker.currentNode = textNode;
            }
            treeWalker.nextNode();
        }
    });
}
