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
            configCancel = window.requestAnimationFrame(loop);
         },1000);
         maxKey = midiMessage.data[1];
         config--;
         range = 255/(maxKey-minKey);
      }else{
         jumpComma = true;
         if(bell.jump && notDouble){
            doubleJumpComma = true;
         }
      }
      
      /*else{
         body.style.backgroundColor = "rgb(" + Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) + "," +
         Math.random()*((midiMessage.data[1]-minKey)*range) +")";
      }*/
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
   window.cancelAnimationFrame(configCancel);
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

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var jumpComma = false;
var doubleJumpComma = false;
var notDouble = true;
var configCancel;
var plats = [];

bell = {
   height: 32,
   width:32,
   jump:true,
   x:400,
   y:250,
   y_vel:0
}

function Plat(){
   this.height = 20;
   this.width = 350;
   this.x = canvas.width;
   this.y = 360;
   this.draw = function(){
      context.fillStyle = "#0033aa";
      context.fillRect(this.x,this.y,this.width,this.height);
   }
}
plats.push(new Plat());
window.setInterval(function(){
   plats.push(new Plat());
},2500);

loop = function(){
   if(!bell.jump && jumpComma){
      bell.y_vel -=30;
      bell.jump = true;
   }
   if(bell.jump && doubleJumpComma){
      console.log(doubleJumpComma + " " + notDouble);
      bell.y_vel -=30;
      doubleJumpComma = false;
      notDouble = false;
   }

   bell.y_vel +=1.5;
   bell.y += bell.y_vel;
   bell.y_vel *= 0.9;

   if(bell.y > 420-bell.height){
      bell.y = 420-bell.height;
      bell.y_vel = 0;
      bell.jump = false;
      jumpComma = false;
      notDouble = true;
   }
   for(i = 0; i < plats.length; i++){
         
      if(bell.x+bell.width>plats[i].x && bell.x<plats[i].x+plats[i].width && bell.y>plats[i].y-bell.height && bell.y<plats[i].y+plats[i].height){

         bell.y = plats[i].y-bell.height;
         bell.jump = false;
         jumpComma = false;
         doubleJumpComma = false;
         notDouble = true;
      }
   }


   context.fillStyle = "#222222";
   context.fillRect(0,0,canvas.width,canvas.height);
   context.fillStyle = "#333380";
   context.fillRect(0,420,canvas.width,80);
   context.fillStyle = "#ff0000";
   context.beginPath();
   context.rect(bell.x,bell.y,bell.width,bell.height);
   context.fill();
   
   for(i = 0; i < plats.length; i++){
      plats[i].x -=4;
      plats[i].draw();
   }
   configCancel = window.requestAnimationFrame(loop);
}