document.addEventListener('DOMContentLoaded', () => {

    const videoFile = document.getElementById('videoFile');

    const videoLink = document.getElementById('videoLink');

    const loadLinkBtn = document.getElementById('loadLinkBtn');

    const videoPlayer = document.getElementById('videoPlayer');

    const statusMessage = document.getElementById('statusMessage');

    // Handle video file upload

    videoFile.addEventListener('change', (event) => {

        const file = event.target.files[0];

        if (file) {

            // A file path created from a Blob is local and safe to use.

            const videoURL = URL.createObjectURL(file);

            videoPlayer.src = videoURL;

            statusMessage.textContent = `Playing file: ${file.name}`;

            videoPlayer.play();

        } else {

            statusMessage.textContent = 'No file selected.';

        }

    });

    // Handle video link loading

    loadLinkBtn.addEventListener('click', () => {

        const url = videoLink.value.trim();

        if (url) {

            // Check if the URL is from YouTube or a similar service that is not directly streamable.

            if (url.includes('youtube.com') || url.includes('youtu.be')) {

                statusMessage.textContent = 'YouTube videos cannot be loaded directly. You must use an embed code or a direct video file link (e.g., .mp4).';

                videoPlayer.src = '';

                return;

            }

            

            // Set the video source to the provided URL.

            videoPlayer.src = url;

            statusMessage.textContent = `Attempting to load video from URL...`;

            videoPlayer.play(); // Attempt to play immediately

        } else {

            statusMessage.textContent = 'Please enter a valid video link.';

        }

    });

    // Add event listeners for video player events to give better feedback.

    videoPlayer.addEventListener('loadeddata', () => {

        statusMessage.textContent = 'Video loaded successfully!';

    });

    videoPlayer.addEventListener('play', () => {

        statusMessage.textContent = 'Playing video...';

    });

    // Handle the 'error' event to provide clear user feedback.

    videoPlayer.addEventListener('error', () => {

        let errorMsg = 'Error: Could not load the video.';

        if (videoPlayer.networkState === videoPlayer.NETWORK_NO_SOURCE) {

            errorMsg += ' The URL is empty or invalid.';

        } else if (videoPlayer.error && videoPlayer.error.code === videoPlayer.error.MEDIA_ERR_NETWORK) {

            errorMsg += ' A network error occurred while trying to download the video.';

        } else if (videoPlayer.error && videoPlayer.error.code === videoPlayer.error.MEDIA_ERR_DECODE) {

            errorMsg += ' The video format is not supported by your browser.';

        } else if (videoPlayer.error && videoPlayer.error.code === videoPlayer.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {

            errorMsg += ' The video link is from an unsupported source (e.g., a YouTube page).';

        }

        statusMessage.textContent = errorMsg;

    });

});