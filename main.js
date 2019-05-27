var divReturn = document.getElementById("divReturn");
var divConfig = document.getElementById("divConfig");
var btnConfig = document.getElementById("btnConfig");
var body = document.getElementById("body");
var inputs,outputs;
var minKey, maxKey, range;
var config = 2;

//Triades
var triadeInsert = 1;
var triadeArray = [0,0,0];
var triadeArrayBuffer = [0,0,0];
var triadeArrayBufferCount = 3;

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
   //console.log(config);
   if(midiMessage.data[0] === 144){
      if(config === 2){
         divConfig.innerHTML = "<div>Configuração do seu controlador MIDI<p>Aperte a nota mais aguda do seu controlador</p></div>"
         minKey = midiMessage.data[1];
         config--;
      }else if(config === 1){
         divConfig.innerHTML = "<div>Configuração do seu controlador MIDI<p>Controlador MIDI configurado!</p></div>"
         window.setTimeout(function(){
            divConfig.style.display = "none";
         },1000);
         maxKey = midiMessage.data[1];
         config--;
         range = 255/(maxKey-minKey);
      }else{
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
      //console.log(midiMessage.data[1]);
   }

}

function onMIDIFailure() {
    console.log('Não foi possível detectar seu dispositivo MIDI');
}

function restartConfig(){
   config = 2;
   divConfig.style.display = "flex";
   divConfig.innerHTML = "<div>Configuração do seu controlador MIDI <p>Aperte a nota mais grave do seu controlador</p></div>";
}

/*function bufferingArray(array, bufferArray, bufferCount, note){
   bufferCount--;
   bufferArray[bufferArray.length-bufferCount-1] = note;
   if(bufferCount === 0){
      bufferCount = array.length;
      array = bufferArray.sort();
      return true;
   }
   return false;
}

function ensinarTriade(midiMessage){
   if(triadeInsert === 1){
      var divId = "triade" + triadeInsert;
      var divTarget = document.getElementById(divId);
      divTarget.style.backgroundColor = "rgb(" + Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) +")";
      triadeInsert = 2;
   }else if(triadeInsert === 2){
      var divId = "triade" + triadeInsert;
      var divTarget = document.getElementById(divId);
      divTarget.style.backgroundColor = "rgb(" + Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) +")";
      triadeInsert = 3;
   }else{
      var divId = "triade" + triadeInsert;
      var divTarget = document.getElementById(divId);
      divTarget.style.backgroundColor = "rgb(" + Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) +")";
      triadeInsert = 1;
   }
}*/