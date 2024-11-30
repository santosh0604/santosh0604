console.log("hello java script");
let currentsong = new Audio();

function secondsToMinutesSeconds(seconds) {
    // Handle NaN or invalid input gracefully
    if (isNaN(seconds) || seconds === Infinity) return "00:00";

    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    let formattedMinutes = minutes.toString().padStart(2, "0");
    let formattedSeconds = secs.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
    let response = await fetch("http://127.0.0.1:5501/project/project_one/songs/");
    let htmlText = await response.text();
    console.log(htmlText);

    // Parse the response HTML and extract song links
    let div = document.createElement("div");
    div.innerHTML = htmlText;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let link of as) {
        if (link.href.endsWith(".mp3")) {
            songs.push(link.href.split("/songs/")[1]); // Extract song names
        }
    }

    return songs;
}

const playmusic = (track) => {
    // Set the audio source and start playing
    currentsong.src = "/songs/" + track;
    currentsong.play();

    // Update UI
    play.src = "svg/pause.svg"; // Update play/pause button
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20", " "); // Display song name
};

async function main() {
    let songs = await getsongs();

    // Populate playlist
    let songul = document.querySelector(".songlist ul");
    for (const song of songs) {
        songul.innerHTML += `
            <li>
                <img class="invert" src="svg/playmusic.svg" alt="music">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>Santosh</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="svg/play.svg" alt="play">
                </div>
            </li>`;
    }

    // Add click events for playlist items
    document.querySelectorAll(".songlist li").forEach((e) => {
        e.addEventListener("click", () => {
            let songName = e.querySelector(".info div").innerHTML.trim();
            console.log("Playing:", songName);
            playmusic(songName);
        });
    });

    // Add play/pause toggle event listener
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "svg/pause.svg";
        } else {
            currentsong.pause();
            play.src = "svg/play.svg";
        }
    });



    // Update the song timer during playback
    currentsong.addEventListener("timeupdate", () => {
        let currentTime = secondsToMinutesSeconds(currentsong.currentTime);
        let duration = secondsToMinutesSeconds(currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${currentTime} / ${duration}`;
    });

    // Reset timer and button when song ends
    currentsong.addEventListener("ended", () => {
        play.src = "svg/play.svg"; // Reset play button
        document.querySelector(".songtime").innerHTML = "00:00 / 00:00"; // Reset time display
    });
    //  currentsong.addEventListener("timeupdate", ()=>{
    //     console.log(currentsong.currentTime,currentsong.duration);
    //     document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(
    //         currentsong.currentTime)} /${secondsToMinutesSeconds(currentsong.duration)}`
    //    document.querySelector(".circle").style.left=(currentsong.currentTime/
    //     currentsong.duration)*100 +"%";
    // })
    


    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    } )
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%"
    } )
   previous.addEventListener("click",()=>{
    console.log("previous")
    console.log(currentsong)
    let index=son.indexof(currentsong.src.split("/").slice(-1) [0])
    if((index-1) > 0){
        playmusic(son[index-1])
    }
   })
   next.addEventListener("click",()=>{
    console.log("next")
    console.log(currentsong)
    let index=son.indexof(currentsong.src.split("/").slice(-1)[0])
    if((index+1)>length){
        playmusic(son[index+1])
    }
   })
   document.querySelector(".range").getElementsByTagName('input')[0].addEventListener("change",(e)=>{
    console.log(e,e.target,e.target.value)
    currentsong.volume=parseInt(e.target.value)/100
   })
   document.querySelector(".volume >img").addEventListener("click" ,e=>{
    console.log(e.target)
    console.log("changing" ,e.target.src)
    if(e.target.src.includes("svg/volume.svg")){
        e.target.src=e.target.src.replace("svg/volume.svg", "svg/mute.svg")
        currentsong.volume=0
    }
    else{
        currentsong.volume=.10
        e.target.src=e.target.src.replace( "svg/mute.svg", "svg/volume.svg")
    }
   })
}

main();
