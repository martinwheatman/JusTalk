window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var recognition = new SpeechRecognition();
        recognition.start();
        recognition.continuous = false;
        recognition.onresult = function(event) {
            if (event.results[0].isFinal) {
                window.speechSynthesis.speak(
                    new SpeechSynthesisUtterance(
                        interp( event.results[0][0].transcript )
                )   );
    }	}   }
);


