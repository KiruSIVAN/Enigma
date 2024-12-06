# Machine Enigma

Ce projet est une simulation de la Machine Enigma, permettant de chiffrer et déchiffrer des messages via une interface utilisateur simple.

---

## _Fonctionnalités_

1. _Chiffrement des messages_ :

   - Saisir un message à chiffrer.
   - Configurer les connexions du plugboard pour échanger des lettres si besoin.
   - Cliquer sur _Chiffrer_ pour obtenir le message chiffré et les positions des rotors utilisées.

2. _Déchiffrement des messages_ :

   - Cliquer sur _Déchiffrer_ pour saisir les positions des rotors qui sont fournies lors du chiffrement.
   - Entrer le message chiffré et récupérez le message original.

3. _Plugboard_ :
   - Configurer les connexions entre paires de lettres : par exemple, AB, CD, EF.

---

### Processus de chiffrement

1. Chaque lettre passe par les étapes suivantes :

   - Substitution via le plugboard si existe.
   - Transformation par les trois rotors dans un sens.
   - Transformation via le réflecteur.
   - Retour dans les trois rotors dans le sens inverse.
   - Substitution finale via le plugboard.

### Processus de déchiffrement

Le processus de déchiffrement est identique, mais nécessite les _mêmes positions initiales des rotors_ que celles utilisées lors du chiffrement pour pouvoir retrouver l'excat mot chiffré.

---

## Comment exécuter sur VSCode

### _Sur Windows_

1. Téléchargez le projet et ouvrez le dossier contenant les fichiers.
2. Exécutez la commande suivante dans le terminal :
   ```bash
   start index.html
   ```

### _Sur Mac_

1. Téléchargez le projet et ouvrez le dossier contenant les fichiers.
2. Exécutez la commande suivante dans le terminal :
   ```bash
   open index.html
   ```
