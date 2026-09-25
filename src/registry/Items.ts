import Item from "../models/Item.js";
import ItemStack from "../models/ItemStack.js";
import Ingredients from "./Ingredients.js";

function createItem(name: string, points: number): Item {
    return new Item(name, "item").setPoints(points);
}

export default abstract class Items {
    public static ICE_BREAKER = createItem("ICE-breker", 15).setRecipe([
        new ItemStack(Ingredients.FIREWALL_SHARD, 3),
        Ingredients.ICE_ESSENCE.toStack(),
    ]);

    public static NETRUNNER_DECK = createItem("Netrunner-deck", 10).setRecipe([
        new ItemStack(Ingredients.DATA_FRAGMENT, 2),
        Ingredients.QUANTUM_BIT.toStack(),
    ]);

    public static OVERCLOCK_MODULE = createItem("Overklokmodule", 10).setRecipe(
        [
            new ItemStack(Ingredients.NEON_CORE, 2),
            Ingredients.JUNK_CODE.toStack(),
        ],
    );

    public static VPN_MANTLE = createItem("VPN-mantel", 10).setRecipe([
        new ItemStack(Ingredients.DATA_FRAGMENT, 2),
        Ingredients.BACKDOOR_KEY.toStack(),
    ]);

    public static ROOT_ACCESS_KEY = createItem(
        "Root-toegangssleutel",
        25,
    ).setRecipe([
        new ItemStack(Ingredients.NEON_CORE, 3),
        new ItemStack(Ingredients.QUANTUM_BIT, 2),
    ]);

    public static ADBLOCKER_SHIELD = createItem(
        "Adblocker-schild",
        10,
    ).setRecipe([
        Ingredients.RANSOMWARE_TRACKS.toStack(),
        new ItemStack(Ingredients.FIREWALL_SHARD, 2),
    ]);

    public static QUANTUM_DECODER = createItem(
        "Quantum-ontcijferaar",
        15,
    ).setRecipe([
        new ItemStack(Ingredients.QUANTUM_BIT, 3),
        Ingredients.ICE_ESSENCE.toStack(),
    ]);
}
