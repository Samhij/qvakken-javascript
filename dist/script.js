import Item from "./models/Item.js";
import Inventory from "./models/Inventory.js";
import "./constants/items.js";
import ItemStack from "./models/ItemStack.js";
import { LLM, TOKEN } from "./constants/ingredients.js";
const INVENTORY = new Inventory([], []);
function seedInventory() {
    INVENTORY.addItem(new ItemStack(TOKEN, 5));
    INVENTORY.addItem(new ItemStack(LLM, 5));
}
function renderIngredientInventory() {
    const list = document.getElementById("ingredientInventory");
    if (!list)
        return;
    list.innerHTML = "";
    for (const stack of INVENTORY.ingredients) {
        const li = document.createElement("li");
        const name = document.createElement("span");
        name.textContent = stack.item.name;
        const count = document.createElement("span");
        count.textContent = ` (x${stack.count})`;
        li.append(name, count);
        list.append(li);
    }
}
// Give random ingredient to player when button is clicked
document
    .getElementById("collectIngredient")
    ?.addEventListener("click", function () {
    const ingredient = Item.getRandomIngredient();
    INVENTORY.addItem(ingredient.toStack());
    console.log(INVENTORY);
    renderIngredientInventory();
});
seedInventory();
renderIngredientInventory();
