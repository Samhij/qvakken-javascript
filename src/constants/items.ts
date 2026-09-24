import CraftingRecipe from "../models/CraftingRecipe.js";
import ItemStack from "../models/ItemStack.js";
import Item from "../models/Item.js";
import { TOKEN, LLM } from "./ingredients.js";

export const ANTI_AI_STAFF = new Item(
    0,
    "Anti-AI-toverstaf",
    "anti-ai-toverstaf.png",
    "item",
).setRecipe(
    new CraftingRecipe([new ItemStack(TOKEN, 3), new ItemStack(LLM, 1)], 0),
);
