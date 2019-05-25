var divReturn = document.getElementById("divReturn");
var body = document.getElementById("body");
var inputs,outputs;
var minKey, maxKey, range;
var config = 2;

if (navigator.requestMIDIAccess) {
   divReturn.innerHTML = "Seu navegador suporta esse jogo!";
} else {
   divReturn.innerHTML = "Infelizmente seu navegador não suporta esse jogo...";   
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
   inputs = midiAccess.inputs;
   outputs = midiAccess.outputs;
   for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = getMIDIMessage;
  }
}

function getMIDIMessage(midiMessage) {
   if(midiMessage.data[0] === 144){
      if(config === 2){
         minKey = midiMessage.data[1];
         config--;
      }else if(config === 1){
         maxKey = midiMessage.data[1];
         config--;
         range = 255/(maxKey-minKey);
      }
      else{
         body.style.backgroundColor = "rgb(" + Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) +")";
      }
      /*else if(midiMessage.data[2] <=100){
         body.style.backgroundColor = "rgb(" + (midiMessage.data[0]) + "," +
         ((midiMessage.data[1]-minKey)*range) + "," +
         Math.floor(Math.random()*midiMessage.data[2]*2.55) +")";
      }else{
         body.style.backgroundColor = "rgb(" + (midiMessage.data[0]) + "," +
         ((midiMessage.data[1]-minKey)*range) + "," +
         Math.floor(Math.random()*midiMessage.data[2]*2) +")";
      }*/
      console.log(midiMessage.data[1]);
   }

}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}