import Inventory from "../models/Inventory.js";
import ItemStack from "../models/ItemStack.js";

function renderStackList(
    elementId: string,
    stacks: ItemStack[],
    highlightIndex?: number,
) {
    const list = document.getElementById(elementId);
    if (!list) return;

    list.innerHTML = "";

    stacks.forEach((stack, index) => {
        const li = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = stack.item.name;

        const count = document.createElement("span");
        count.textContent = ` (x${stack.count})`;

        li.append(name, count);

        if (index === highlightIndex) {
            li.style.color = "red";
        }

        list.append(li);
    });
}

export function renderInventory(
    inventory: Inventory,
    glitchHighlightIndex?: number,
) {
    renderStackList(
        "ingredientInventory",
        inventory.ingredients,
        glitchHighlightIndex,
    );
    renderStackList("craftedInventory", inventory.items);
}
