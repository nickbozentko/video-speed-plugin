var slider = document.getElementById("myRange");
var output = document.getElementById("speedDiv");

let speed = 2.0;
chrome.storage.local.get(['speed'], function(result) {
    if(result.speed) {
        speed = result.speed;
    }
    output.innerHTML = speed.toFixed(1) + 'x Speed';
    slider.value = speed;
});

slider.oninput = function() {
    speed = parseFloat(this.value);
    chrome.storage.local.set({ speed: speed });
    output.innerHTML = speed.toFixed(1) + 'x Speed';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { // Set the speed variable before calling the actual videoScript
                code: `var speed = ${speed}`
            },
            () => {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    { 
                        file: 'videoScript.js' 
                    }
                )
            }
        );
    });
}