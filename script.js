let currentTrack = 0;
let tracks = [];
const audioPlayer = document.getElementById("audioPlayer");
const fileInput = document.getElementById("fileInput");
const playlistDiv = document.getElementById("playlist");
const searchInput = document.getElementById("searchInput");

fileInput.addEventListener("change", (e) => {
  tracks = Array.from(e.target.files);
  renderPlaylist(tracks);
  loadTrack(0);
});

function loadTrack(index) {
  currentTrack = index;
  audioPlayer.src = URL.createObjectURL(tracks[index]);
  audioPlayer.load();
}

function renderPlaylist(list) {
  playlistDiv.innerHTML = "";
  list.forEach((track, i) => {
    const item = document.createElement("div");
    item.textContent = track.name;
    item.addEventListener("click", () => {
      loadTrack(i);
      audioPlayer.play();
    });
    playlistDiv.appendChild(item);
  });
}

document.getElementById("playBtn").onclick = () => audioPlayer.play();
document.getElementById("pauseBtn").onclick = () => audioPlayer.pause();
document.getElementById("nextBtn").onclick = () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audioPlayer.play();
};
document.getElementById("volumeControl").oninput = (e) => {
  audioPlayer.volume = e.target.value;
};

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = tracks.filter(track => track.name.toLowerCase().includes(query));
  renderPlaylist(filtered);
});

document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark-mode");
};
