(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === "enterPictureInPicture") {
      // Wait for metadata to be loaded
      const video = document.querySelector("video");
      console.log(video);

      if (document.pictureInPictureElement) {
        // Exit Picture-in-Picture if already in that mode
        document.exitPictureInPicture().catch(error => {
          console.log("Error while exiting Picture-in-Picture:", error);
        });
      } else {
        // Request Picture-in-Picture
        video.requestPictureInPicture().catch(error => {
          console.log("Error while entering Picture-in-Picture:", error);
        });

        // Set up media session action handlers
        navigator.mediaSession.setActionHandler('nexttrack', () => {
         
         //skip for next 10 sec
          video.currentTime += 10;
          // Implement your desired functionality here
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
          
          //move back for 10 sec
          console.log('Previous track button clicked');
          video.currentTime -= 10;
          // Implement your desired functionality here
        });
      }
    }

    const response = "done";
    sendResponse(response);
    return true;
  });
})();

