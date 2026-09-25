import Inventory from "../models/Inventory.js";
import Item from "../models/Item.js";
import { renderInventory } from "./inventoryUI.js";

function craft(
    inventory: Inventory,
    item: Item,
    glitchHighlightIndex?: number,
) {
    item.recipe?.craft(inventory);
    renderInventory(inventory, glitchHighlightIndex);
    renderCraftingRecipes(inventory, glitchHighlightIndex);

    const pointsSpan = document.getElementById("points") as HTMLSpanElement;
    pointsSpan.textContent = inventory.getTotalPoints().toString();
}

export function renderCraftingRecipes(
    inventory: Inventory,
    glitchHighlightIndex?: number,
) {
    const table = document.getElementById(
        "craftingTable",
    ) as HTMLTableElement | null;
    if (!table) return;

    table.innerHTML = "";

    // Header row
    const header = table.insertRow();
    const thRecept = document.createElement("th");
    thRecept.textContent = "Recept";

    const thResultaat = document.createElement("th");
    thResultaat.textContent = "Resultaat";

    const thPunten = document.createElement("th");
    thPunten.textContent = "Punten";

    header.append(thRecept, thResultaat, thPunten);

    // One row per craftable item, sorted by points ascending
    const craftableItems = Item.registry
        .filter(
            (item): item is Item & { recipe: NonNullable<Item["recipe"]> } =>
                item.recipe !== undefined,
        )
        .sort((a, b) => (a.points ?? 0) - (b.points ?? 0));

    for (const item of craftableItems) {
        const tr = table.insertRow();
        const recipeCell = tr.insertCell();
        recipeCell.textContent = item.recipe.inputs
            .map((stack) => `${stack.item.name} (x${stack.count})`)
            .join(" + ");

        const resultCell = tr.insertCell();
        resultCell.textContent = item.name;

        const pointsCell = tr.insertCell();
        pointsCell.textContent = item.points?.toString() ?? "";

        if (item.recipe.canCraft(inventory)) {
            tr.addEventListener("click", () =>
                craft(inventory, item, glitchHighlightIndex),
            );
            tr.style.color = "white";
        } else {
            tr.style.cursor = "not-allowed";
            tr.style.color = "gray";
        }
    }
}
