/**
 * Point d'enregistrement unique des mini-jeux disponibles dans l'app.
 * Un futur patch qui ajoute un mini-jeu se résume à une ligne ici.
 */
import "../../games/quiz";
import "../../games/redflag";

export { getGames, getGame, registerGame } from "./registry";
