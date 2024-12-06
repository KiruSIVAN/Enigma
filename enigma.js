const messageInput = document.getElementById("message");
const plugboardInput = document.getElementById("plugboard");
const setPlugboardButton = document.getElementById("setPlugboardButton");
const chiffrerButton = document.getElementById("chiffrerButton");
const dechiffrerButton = document.getElementById("dechiffrerButton");
const positionsInput = document.getElementById("positions");
const positionsDiv = document.getElementById("positionsInput");
const resultDisplay = document.getElementById("result");
const positionsDisplay = document.getElementById("positionsDisplay");

const plugboardMessage = document.createElement("p");
plugboardMessage.style.marginTop = "10px";
plugboardInput.insertAdjacentElement("afterend", plugboardMessage);

const rotor1 = [
  4, 10, 12, 5, 11, 6, 3, 16, 21, 25, 13, 19, 14, 22, 24, 7, 23, 20, 18, 15, 0,
  8, 1, 17, 2, 9,
];
const rotor2 = [
  0, 9, 3, 10, 18, 8, 17, 20, 23, 1, 11, 7, 22, 19, 12, 2, 16, 6, 25, 13, 15,
  24, 5, 21, 14, 4,
];
const rotor3 = [
  1, 3, 5, 7, 9, 11, 2, 15, 17, 19, 23, 21, 25, 13, 24, 4, 8, 22, 6, 0, 10, 12,
  20, 18, 16, 14,
];
const reflector = [
  24, 17, 20, 7, 16, 18, 11, 3, 15, 23, 13, 6, 14, 10, 12, 8, 4, 1, 5, 25, 2,
  22, 21, 9, 0, 19,
];

class EnigmaMachine {
  constructor(rotors, reflector, plugboard = {}) {
    this.rotors = rotors;
    this.reflector = reflector;
    this.plugboard = plugboard;
    this.positions = [0, 0, 0];
  }

  setPositions(positions) {
    this.positions = positions;
  }

  rotateRotors() {
    for (let i = 0; i < this.positions.length; i++) {
      this.positions[i] = (this.positions[i] + 1) % 26;
      if (this.positions[i] !== 0) break;
    }
  }

  processCharacter(char) {
    if (!char.match(/[A-Z]/)) return char;

    if (this.plugboard[char]) char = this.plugboard[char];
    let index = char.charCodeAt(0) - "A".charCodeAt(0);

    for (let i = 0; i < this.rotors.length; i++) {
      index = (index + this.positions[i]) % 26;
      index = this.rotors[i][index];
      index = (index - this.positions[i] + 26) % 26;
    }

    index = this.reflector[index];

    for (let i = this.rotors.length - 1; i >= 0; i--) {
      index = (index + this.positions[i]) % 26;
      index = this.rotors[i].indexOf(index);
      index = (index - this.positions[i] + 26) % 26;
    }

    let resultChar = String.fromCharCode(index + "A".charCodeAt(0));
    if (this.plugboard[resultChar]) resultChar = this.plugboard[resultChar];
    this.rotateRotors();
    return resultChar;
  }

  processMessage(message) {
    return message
      .split("")
      .map((char) => this.processCharacter(char))
      .join("");
  }
}

const enigma = new EnigmaMachine([rotor1, rotor2, rotor3], reflector);

messageInput.addEventListener("input", () => {
  messageInput.value = messageInput.value.toUpperCase();
});

plugboardInput.addEventListener("input", () => {
  plugboardInput.value = plugboardInput.value.toUpperCase();
});

let plugboard = {};
setPlugboardButton.addEventListener("click", () => {
  const input = plugboardInput.value.trim();
  if (!/^[A-Z,]*$/i.test(input)) {
    plugboardMessage.textContent =
      "Erreur : Seules les lettres et les virgules sont autorisées.";
    plugboardMessage.style.color = "red";
    plugboard = {};
    return;
  }

  const connections = input.split(",");
  plugboard = {};
  let isValid = true;

  connections.forEach((pair) => {
    const trimmedPair = pair.trim().toUpperCase();
    if (trimmedPair.length === 2 && /^[A-Z]{2}$/.test(trimmedPair)) {
      const [a, b] = trimmedPair;
      if (a === b || plugboard[a] || plugboard[b]) {
        isValid = false;
      } else {
        plugboard[a] = b;
        plugboard[b] = a;
      }
    } else if (trimmedPair) {
      isValid = false;
    }
  });

  if (isValid) {
    plugboardMessage.textContent = "Plugboard configuré avec succès!";
    plugboardMessage.style.color = "green";
    enigma.plugboard = plugboard;
  } else {
    plugboardMessage.textContent =
      "Erreur : Vérifiez les paires (pas de doublons, lettres uniques).";
    plugboardMessage.style.color = "red";
    plugboard = {};
  }
});

chiffrerButton.addEventListener("click", () => {
  positionsDiv.classList.add("hidden");

  const positions = [
    Math.floor(Math.random() * 26),
    Math.floor(Math.random() * 26),
    Math.floor(Math.random() * 26),
  ];

  enigma.setPositions(positions);

  const message = messageInput.value;
  const encryptedMessage = enigma.processMessage(message);
  resultDisplay.textContent = `Chiffré : ${encryptedMessage}`;

  positionsDisplay.textContent = `Positions : ${positions.join(" ")}`;
});

dechiffrerButton.addEventListener("click", () => {
  positionsDiv.classList.remove("hidden");

  const positionsText = positionsInput.value.trim();
  const positions = positionsText.split(" ").map(Number);

  if (
    positions.length !== 3 ||
    positions.some((pos) => isNaN(pos) || pos < 0 || pos > 25)
  ) {
    resultDisplay.textContent =
      "Entrez trois positions valides séparées par des espaces.";
    positionsDisplay.textContent = "";
    return;
  }

  enigma.setPositions(positions);

  positionsDisplay.textContent = `Positions : ${positions.join(" ")}`;

  const message = messageInput.value;
  const decryptedMessage = enigma.processMessage(message);
  resultDisplay.textContent = `Déchiffré : ${decryptedMessage}`;
});
