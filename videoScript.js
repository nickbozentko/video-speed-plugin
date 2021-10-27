// GLOBAL "speed" comes from the chrome "executeScript"
(function() {
    let videos = document.getElementsByTagName('video');

    if(videos.length > 0) {
        videos[0].playbackRate = speed;
    }
})();
