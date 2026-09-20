# XOR neural Net 

> Un petit réseau interactif qui apprend la fonction logique XOR, et qui montre dans la même interface, pourquoi un perceptron simple échoue là où un perceptron Multicouche (MLP) réussit.
>
> Ce projet permet de basculer entre les deux modèles et voir concrètement cette différence.

### Apperçu
## 🎨 Aperçu Visuel de l'Interface
Voici un aperçu de la frontière de décision et de la courbe de loss en action :

![Graphiques XOR Dashboard](./assets/graph-preview.png)

## Stack technique 
- React
-  JavaScript pour les modèles (forward pass + backpropagation from scratch, sans librairie ML)
-  SVG natif pour le graphique de loss (zéro dépendance)

## Pour l'installation 
```bash
git clone
cd xor-neural-network 
npm install 
```

## Entraînement des modèles 
Les poids sont pré-entrainés une seule fois et sauvegardés en JSON (pas de ré-entrainement à chaque utilisation): 
```bash 
node train.js 
``` 
## Pour lancer l'app 
```bash 
npm run dev 
``` 
## Ce que tu découvriras 
 
- Pourquoi XOR n'est pas linéairement séparable, et le rôle de la couche cachée 
- Comment faire une backpropagation from scratch (chain rule, gradient descent) sans librairie

Enjoy :-) 