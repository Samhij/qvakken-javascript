import CraftingRecipe from "../models/CraftingRecipe.js";
import ItemStack from "../models/ItemStack.js";
import Item from "../models/Item.js";
import Ingredients from "./Ingredients.js";

export default class Items {
    public static ANTI_AI_STAFF = new Item(
        2,
        "Anti-AI-toverstaf",
        "anti-ai-toverstaf.png",
        "item"
    ).setRecipe(
        new CraftingRecipe([new ItemStack(Ingredients.TOKEN, 3), new ItemStack(Ingredients.LLM, 1)], 2)
    );
}
