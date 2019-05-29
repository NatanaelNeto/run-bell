# Run, Bell!

![](https://img.shields.io/github/stars/natanaelneto/run-bell.svg) ![](https://img.shields.io/github/forks/natanaelneto/run-bell.svg)
Jogo musical em Javascript produzido por Natanael Neto.
### Olá, Bell!
Como vai, pequeno sino! Viu que nosso mundo está desabando?? Você precisa correr, o mais rápido que pode! Peça ajuda a seu maestro para ele lhe acompanhar através dos campos harmônicos que teremos que enfrentar!
### Versão 0.0.1
 - Apenas alguns testes com o MIDIAcess e alterações nos DOMs.
 - Os primeiros testes foram bastante promissores. Queria uma linguagem fácil e mais acessível para começar a programar. Procurei em alguns sites como [*este*](https://www.smashingmagazine.com/2018/03/web-midi-api/) e [*este*](https://medium.com/swinginc/playing-with-midi-in-javascript-b6999f2913c3) para ver como o .js reconheceria uma entrada MIDI.
 - Pelo que eu pude perceber, apenas Opera e Chrome suportam o `navigator.requestMIDIAcess`. Por hora, é o que temos.
 - No teste, para cada nota tocada, o fundo do site muda para uma cor quase aleatória (usa a nota tocada e a sua velocidade como parâmetros).
### Versão 0.0.2
 - Versão com mais testes de controle de DOMs, alteração em conjunto e em buffers;
### Versão 0.0.3
 - Primeiro teste com canvas;
 - Após a configuração, um quadrado vermelho é inserido na tela;
 - Apertar alguma tecla no controlador MIDI permite fazer o quadrado saltar;
 - Apertar alguma tecla novamente no controlador MIDI permite fazer o quadrado saltar duas vezes;
 - Saltar duas vezes impede de saltar uma terceira vez;
 - Solo adicionado;
 - Reconfigurar o controlador MIDI cancela a animação;
### Versão 0.0.4
 - Plataformas se descolam da direita para a esquerda;
 - Quadrado consegue saltar e ficar nas plataformas;