let mediaRecorder;
let chunks=[];

const recordBtn=document.getElementById("recordBtn");
const stopBtn=document.getElementById("stopBtn");
const playback=document.getElementById("playback");
const status=document.getElementById("status");

recordBtn.onclick=async()=>{

const stream=await navigator.mediaDevices.getUserMedia({audio:true});

mediaRecorder=new MediaRecorder(stream);

mediaRecorder.start();

status.innerHTML="Recording...";

recordBtn.disabled=true;
stopBtn.disabled=false;

mediaRecorder.ondataavailable=(e)=>{
chunks.push(e.data);
};

mediaRecorder.onstop=()=>{

const blob=new Blob(chunks,{type:"audio/webm"});

chunks=[];

const audioURL=URL.createObjectURL(blob);

playback.src=audioURL;

status.innerHTML="Recording Saved";

simulateAI();

};

};

stopBtn.onclick=()=>{

mediaRecorder.stop();

recordBtn.disabled=false;
stopBtn.disabled=true;

};

function simulateAI(){

document.getElementById("transcript").value=
`Speaker 1:
Welcome everyone to today's meeting.

Speaker 2:
We discussed project milestones and deadlines.

Speaker 1:
Next meeting is scheduled for Friday.`;

document.getElementById("summary").value=
`Key Points

• Project milestones reviewed.

• Deadline confirmed.

• Next meeting Friday.

Action Items

• Submit weekly report.

• Update project timeline.`;

}

document.getElementById("searchBtn").onclick=()=>{

let word=document.getElementById("search").value;

let transcript=document.getElementById("transcript").value;

if(transcript.toLowerCase().includes(word.toLowerCase())){

alert("Keyword Found");

}else{

alert("Keyword Not Found");

}

};