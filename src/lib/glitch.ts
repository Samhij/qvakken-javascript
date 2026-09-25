import Inventory from "../models/Inventory.js";

export function removeRandomItem(inventory: Inventory) {
    if (inventory.ingredients.length === 0) return;

    const index = Math.floor(Math.random() * inventory.ingredients.length);
    inventory.ingredients.splice(index, 1)[0];
}
