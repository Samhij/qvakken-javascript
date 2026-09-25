import Inventory from "../models/Inventory.js";
import Item from "../models/Item.js";
import { renderInventory } from "./inventoryUI.js";

function craft(inventory: Inventory, item: Item) {
    item.recipe?.craft(inventory);

    renderInventory(inventory);
    renderCraftingRecipes(inventory);
}

export function renderCraftingRecipes(inventory: Inventory) {
    const table = document.getElementById(
        "craftingTable"
    ) as HTMLTableElement | null;
    if (!table) return;

    table.innerHTML = "";

    // Header row
    const header = table.insertRow();
    const thRecept = document.createElement("th");
    thRecept.textContent = "Recept";

    const thResultaat = document.createElement("th");
    thResultaat.textContent = "Resultaat";

    header.append(thRecept, thResultaat);

    // One row per craftable item
    for (const item of Item.registry) {
        if (!item.recipe) continue;

        const tr = table.insertRow();
        const recipeCell = tr.insertCell();
        recipeCell.textContent = item.recipe.inputs
            .map((stack) => `${stack.item.name} (x${stack.count})`)
            .join(" + ");

        const resultCell = tr.insertCell();
        resultCell.textContent = item.name;

        if (item.recipe.canCraft(inventory)) {
            tr.addEventListener("click", () => craft(inventory, item));
            tr.style.color = "white";
        } else {
            tr.style.cursor = "not-allowed";
            tr.style.color = "gray";
        }
    }
}
