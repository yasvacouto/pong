//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 15;
let raio = diametroBolinha / 2;

//velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

//variáveis da raquete
let xRaquete = 2;
let yRaquete = 160;
let larguraRaquete = 10;
let alturaRaquete = 80;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 160;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let trilha;
let ponto;
let raquetada;

function preload() {
 
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
//verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();

}

function mostraBolinha() {
  
   circle(xBolinha, yBolinha, diametroBolinha);
}

function movimentaBolinha() {
  
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao() {
  
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;    
  }
}

function mostraRaquete(x, y) {

  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete() {

  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 8;
  }
  
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 8;
  }
}

function verificaColisaoRaquete() {

  if (xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < 
      yRaquete + alturaRaquete && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  
   colidiu = collideRectCircle(x, y, larguraRaquete,alturaRaquete,xBolinha,yBolinha,raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 73.5;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(165, 9, 40, 20);
  fill(255);  
  text(meusPontos, 185, 26);
  fill(color(255, 140, 0));
  rect(380, 9, 40, 20);
  fill(255);
  text(pontosDoOponente, 400, 26);
}

function marcaPonto() {
  
  if (xBolinha <= 6.5) {
    ponto.play();
    pontosDoOponente += 1; 
  }
  
  if (xBolinha >= 593.5) {
    ponto.play();
    meusPontos += 1; 
  }
}
