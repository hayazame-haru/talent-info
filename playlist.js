const playBtn = document.getElementById('play-btn');
const playText = document.getElementById('play-text');
const select = document.getElementById('song-select');
const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const playGif = document.getElementById('play-gif'); // 🎵 note gif

const MAX_VOLUME = 0.2;

const songs = [
  { name: 'Golden (Tagalog Version) · HUNTR/X · Felicity Kyle Napuli · Venisse Siy · Maronne Cruz · KPop Demon Hunters Cast', file: 'https://cdn.jsdelivr.net/gh/hayazame-haru/talent-info/assets/music/Golden (Tagalog Version).mp3' },
  { name: 'BTS - Mic drop (FULL EDITION)', file: 'https://cdn.jsdelivr.net/gh/hayazame-haru/talent-info/assets/music/MIC Drop (Steve Aoki Remix) (Full Length Edition).mp3' },
  { name: 'NSR - VS SAYU (JP)', file: 'https://cdn.jsdelivr.net/gh/hayazame-haru/talent-info/assets/music/vs SAYU jp.mp3' },
  { name: 'Sabaton - To Hell and Back', file: 'https://cdn.jsdelivr.net/gh/hayazame-haru/talent-info/assets/music/Sabaton - To Hell and Back.mp3' },
  { name: '2NE1 + BingBang - Lollipop', file: 'https://cdn.jsdelivr.net/gh/hayazame-haru/talent-info/assets/music/Lollipop (Bigbang).mp3' },
  { name: 'i-dle (아이들) - Nxde', file: 'https://cdn.jsdelivr.net/gh/hayazame-haru/talent-info/assets/music/Nxde.mp3' }
];

songs.forEach((song,index)=>{
  const option = document.createElement('option');
  option.value = index;
  option.textContent = song.name;
  select.appendChild(option);
});

let current = 0;
audio.src = songs[current].file;
title.innerText = songs[current].name;
select.value = current;

function loadSong(index, autoplay=true){
  fadeOut(audio, ()=>{
    audio.src = songs[index].file;
    title.innerText = songs[index].name;
    audio.load();
    if(autoplay) fadeIn(audio);
    playText.innerText = autoplay ? 'Pause' : 'Play';
  });
  select.value = index;
}

function fadeIn(audioEl){
  audioEl.volume = 0;
  audioEl.play();
  playGif.classList.add("bounce"); 
  let vol = 0;
  const fade = setInterval(()=>{
    vol += 0.02;
    if(vol >= MAX_VOLUME){ vol = MAX_VOLUME; clearInterval(fade); }
    audioEl.volume = vol;
    playText.innerText = 'Pause';
  },50);
}

function fadeOut(audioEl, callback){
  let vol = audioEl.volume;
  const fade = setInterval(()=>{
    vol -= 0.02;
    if(vol <= 0){ 
      vol = 0; 
      clearInterval(fade); 
      audioEl.pause(); 
      playText.innerText = 'Play'; 
      playGif.classList.remove("bounce"); 
      if(callback) callback(); 
    }
    audioEl.volume = Math.max(0,vol);
  },50);
}

select.addEventListener('change', ()=>{
  current = parseInt(select.value);
  loadSong(current,true);
});

playBtn.addEventListener('click', ()=>{
  if(audio.paused) fadeIn(audio);
  else fadeOut(audio);
});

audio.addEventListener('ended', ()=>{
  current = (current + 1) % songs.length;
  loadSong(current, true);
});
