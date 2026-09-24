import Inventory from "../models/Inventory.js";
import ItemStack from "../models/ItemStack.js";

function renderStackList(elementId: string, stacks: ItemStack[]) {
    const list = document.getElementById(elementId);
    if (!list) return;

    list.innerHTML = "";

    for (const stack of stacks) {
        const li = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = stack.item.name;

        const count = document.createElement("span");
        count.textContent = ` (x${stack.count})`;

        li.append(name, count);
        list.append(li);
    }
}

export function renderInventory(inventory: Inventory) {
    renderStackList("ingredientInventory", inventory.ingredients);
    renderStackList("craftedInventory", inventory.items);
}
