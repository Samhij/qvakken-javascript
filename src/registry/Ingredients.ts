import Item from "../models/Item.js";

function createIngredient(name: string): Item {
    return new Item(name, "ingredient");
}

export default abstract class Ingredients {
    public static DATA_FRAGMENT = createIngredient("Datafragment");
    public static NEON_CORE = createIngredient("Neonkern");
    public static FIREWALL_SHARD = createIngredient("Firewall-scherf");
    public static QUANTUM_BIT = createIngredient("Kwantumbit");
    public static JUNK_CODE = createIngredient("Schrootcode");
    public static RANSOMWARE_TRACKS = createIngredient("Ransomware-spoor");
    public static ICE_ESSENCE = createIngredient("Ijs-essentie");
    public static BACKDOOR_KEY = createIngredient("Backdoor-sleutel");
}
