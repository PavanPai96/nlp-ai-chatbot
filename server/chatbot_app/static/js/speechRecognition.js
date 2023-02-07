if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();

    // String for the Final Transcript
    let final_transcript = "";

    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = false;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'en-IN';

    // Callback Function for the onStart Event
    speechRecognition.onstart = () => {
        // Show the Status Element
        document.querySelector("#start").classList.add('listening');
        document.querySelector("#message-input").placeholder= 'Please speak to type here...';
    };
    speechRecognition.onerror = () => {
        // Hide the Status Element
        document.querySelector("#start").classList.remove('listening');
    };
    speechRecognition.onend = () => {
        // Hide the Status Element
        document.querySelector("#start").classList.remove('listening');
        document.querySelector("#interim").style.display = "none";
    };

    speechRecognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        let interim_transcript = "";
        document.querySelector("#message-input").placeholder = '';
        document.querySelector("#interim").style.display = "block";
        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }

        // Set the Final transcript and Interim transcript.
        document.querySelector("#message-input").value = final_transcript;
        document.querySelector("#interim").innerHTML = interim_transcript;
        final_transcript = '';
        sendChatMessage();
    };

    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
        // Start the Speech Recognition
        speechRecognition.start();
    };
} else {
    console.log("Speech Recognition Not Available");
}