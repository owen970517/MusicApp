const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex =0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');
    if(carouselImageIndex >= carousel.length -1) {
        carouselImageIndex =0;
    } else {
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active');
}
//3초마다 실행 
setInterval(() => {
    changeCarousel();
},3000);

const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount =1;
musicPlayerSection.addEventListener('click' , () => {
    // 뮤직플레이어 섹션 쪽을 더블클릭하면 
    if(clickCount>=2) {
        musicPlayerSection.classList.add('active');
        clickCount=1;
        return;
    }
    clickCount++;
    setTimeout(()=> {
        clickCount =1;
    },250)
})

const backBtn = document.querySelector('.music-player-section .back-btn');

backBtn.addEventListener('click' , () => {
    musicPlayerSection.classList.remove('active');
})

const playlist = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click' , ()=> {
    playlist.classList.add('active');
})

const backMusic = document.querySelector('.playlist .back-btn');

backMusic.addEventListener('click' , () => {
    playlist.classList.remove('active');
})

let currentMusic = 0
//audio 
const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

const forwardBtn = document.querySelector('.fa-forward');
const backwardBtn = document.querySelector('.fa-backward');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

playBtn.addEventListener('click' , () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

pauseBtn.addEventListener('click' , () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

const setMusic = (i) => {
    seekBar.value =0;
    let song = songs[i];
    currentMusic= i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;
    
    //0.3초 후에 딱 한번만 실행하는 setTimeout() 메소드 
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    },300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item=>item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(7);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10) {
        min = `0` + min;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10 ) {
        sec=`0` + sec;
    }
    return `${min} : ${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max))
        //재 실행 버튼을 눌러뒀을 경우 현재 뮤직 재실행 
        if(repeatBtn.className.includes('active')) {
            setMusic(currentMusic);
            playBtn.click();
            // 재실행 버튼을 누르지않았다면 다음 뮤직 실행 
        }else {
            forwardBtn.click();
        }
},500)

seekBar.addEventListener('change' , ()=> {
    music.currentTime = seekBar.value;
})

forwardBtn.addEventListener('click' , () => {
    if(currentMusic >= songs.length-1) {
        currentMusic =0;
    } else {
        currentMusic ++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

backwardBtn.addEventListener('click' ,()=> {
    if(currentMusic <= 0) {
        currentMusic = songs.length -1;
    }
    else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})
// 재실행 버튼을 누르면 액티브 클래스가 추가되면서 색상이 바뀜 
repeatBtn.addEventListener('click' , ()=> {
    repeatBtn.classList.toggle('active');
})

volumeBtn.addEventListener('click' ,()=> {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');

})
volumeSlider.addEventListener('input' , ()=> {
    music.volume = volumeSlider.value;
})

queue.forEach((item , i) => {
    item.addEventListener('click' ,()=> {
        setMusic(i);
        playBtn.click();
    })
})