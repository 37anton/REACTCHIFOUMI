import { Notyf } from "notyf";
import "notyf/notyf.min.css";

// Configuration globale de Notyf
export const notyf = new Notyf({
  duration: 3000, // Durée par défaut (3 secondes)
  position: { x: "right", y: "top" }, // Position en haut à droite
  ripple: true, // Effet d’onde
  dismissible: true, // Permet de fermer la notification en cliquant dessus
  types: [
    {
      type: "success",
      background: "green",
      icon: false, // Désactiver l'icône par défaut
    },
    {
      type: "error",
      background: "red",
      icon: false,
    },
  ],
});
