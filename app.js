let turnoMaquina = [];
let turnoJugador = [];
let ronda = 0;

const $botonStart = document.querySelector("#start");
const $estado = document.querySelector("#estado");
const $ronda = document.querySelector("#turn");

$botonStart.addEventListener("click", empezarJuego);
bloquearUsuario();

function empezarJuego() {
  resetear();
  manejarRondas();
  contarRondas();
}
function contarRondas() {
  $ronda.textContent = ronda;
  ronda++;
  return ronda;
}
function resetear() {
  turnoJugador = [];
  turnoMaquina = [];
  ronda = 0;
}

function manejarRondas() {
  // bloquearUsuario()
  actualizarEstado("Turno de la maquina!");
  let cuadroAleatorio = obtenerCuadrosAleatorios();
  turnoMaquina.push(cuadroAleatorio);
  const retrasoTurnoJugador = (turnoMaquina.length + 1) * 1000;

  turnoMaquina.forEach(function ($cuadro, index) {
    const retrasoMaquina = (index + 1) * 1000;
    setTimeout(function () {
      resaltar($cuadro);
    }, retrasoMaquina);
  });

  setTimeout(function () {
    actualizarEstado("Es tu turno!");
    desbloquearUsuario();
  }, retrasoTurnoJugador);
  turnoJugador = [];
  contarRondas();
}
function manejarInputUsuario(e) {
  const cuadros = e.target;
  resaltar(cuadros);
  turnoJugador.push(cuadros);

  const cuadroMaquina = turnoMaquina[turnoJugador.length - 1];

  if (cuadros.id !== cuadroMaquina.id) {
    perder();
    return;
  }
  if (turnoJugador.length === turnoMaquina.length) {
    bloquearUsuario();
    setTimeout(manejarRondas, 1000);
  }
}

function actualizarEstado(estadoJugador, error = false) {
  $estado.textContent = estadoJugador;
  if (error) {
    $estado.classList.add("alert", "alert-danger");
  } else {
    $estado.classList.add("alert", "alert-success");
    $estado.classList.remove("alert-danger");
  }
}

function obtenerCuadrosAleatorios() {
  const $cuadros = document.querySelectorAll(".block");
  const indice = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[indice];
}

function resaltar($cuadro) {
  $cuadro.style.opacity = 1;

  setTimeout(() => {
    $cuadro.style.opacity = 0.5;
  }, 500);
}

function bloquearUsuario() {
  document.querySelectorAll(".block").forEach(function ($cuadro) {
    $cuadro.onclick = function () {};
  });
}

function desbloquearUsuario() {
  document.querySelectorAll(".block").forEach(function ($cuadro) {
    $cuadro.onclick = manejarInputUsuario;
  });
}

function perder() {
  actualizarEstado(
    `UPS perdiste!! apreta en Start para volver a jugar!`,
    (error = true)
  );
  bloquearUsuario();
}
