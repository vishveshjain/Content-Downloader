// Function to download a file
function download(url, filename) {
  chrome.runtime.sendMessage({ url: url, filename: filename });
}

// Function to download text content
function downloadTextContent() {
  let textContent = document.documentElement.outerText; // Get all text content including HTML structure
  const filename = 'text_content.txt';
  chrome.runtime.sendMessage({ textContent: textContent, filename: filename });
}

// Function to download CSS content
function downloadCSSContent() {
  let cssContent = '';
  // External stylesheets
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((stylesheet, index) => {
    const url = stylesheet.href;
    const filename = `stylesheet_${index}.css`;
    download(url, filename);
  });
  // Inline styles
  const styleTags = document.querySelectorAll('style');
  styleTags.forEach((styleTag, index) => {
    cssContent += styleTag.innerText + '\n';
  });
  if (cssContent) {
    const filename = 'inline_styles.css';
    chrome.runtime.sendMessage({ cssContent: cssContent, filename: filename });
  }
}

// Function to download all images
function downloadAllImages() {
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    const url = img.src;
    const filename = `image_${index}.jpg`;
    download(url, filename);
  });
}

// Function to download all audio
function downloadAllAudio() {
  const audios = document.querySelectorAll('audio');
  audios.forEach((audio, index) => {
    if (audio.src) {
      const url = audio.src;
      const filename = `audio_${index}.mp3`;
      download(url, filename);
    } else {
      const sources = audio.querySelectorAll('source');
      sources.forEach((source, sourceIndex) => {
        const url = source.src;
        const filename = `audio_${index}_${sourceIndex}.mp3`;
        download(url, filename);
      });
    }
  });
}

// Function to download all videos
function downloadAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach((video, index) => {
    if (video.src) {
      const url = video.src;
      const filename = `video_${index}.mp4`;
      download(url, filename);
    } else {
      const sources = video.querySelectorAll('source');
      sources.forEach((source, sourceIndex) => {
        const url = source.src;
        const filename = `video_${index}_${sourceIndex}.mp4`;
        download(url, filename);
      });
    }
  });
}

// Execute download functions
downloadTextContent();
downloadCSSContent();
downloadAllImages();
downloadAllAudio();
downloadAllVideos();
