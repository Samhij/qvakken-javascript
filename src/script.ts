import { renderCraftingRecipes } from "./lib/craftingUI.js";
import { renderInventory } from "./lib/inventoryUI.js";
import { getNormalizedMousePos } from "./lib/mouse.js";
import Inventory from "./models/Inventory.js";
import Item from "./models/Item.js";
import "./registry/Items.js";

declare function confetti(options?: Record<string, unknown>): void;

const inventory = new Inventory([], []);

let glitchTimeLeft = 10;
let glitchTargetIndex = -1;
let showGlitchTarget = false;

function getRandomGlitchIndex(): number {
    return inventory.ingredients.length > 0
        ? Math.floor(Math.random() * inventory.ingredients.length)
        : -1;
}

function renderAll() {
    renderInventory(
        inventory,
        showGlitchTarget ? glitchTargetIndex : undefined,
    );
    renderCraftingRecipes(inventory);

    const pointsSpan = document.getElementById("points") as HTMLSpanElement;
    pointsSpan.textContent = inventory.getTotalPoints().toString();
}

function setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
        let timeLeft = 60;
        const countdownElement = document.getElementById("countdown");

        if (countdownElement) {
            countdownElement.textContent = timeLeft.toString();
        }

        const timerInterval = setInterval(() => {
            timeLeft--;

            if (countdownElement) {
                countdownElement.textContent = timeLeft.toString();
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);

                const button = document.getElementById(
                    "collectIngredient",
                ) as HTMLButtonElement;

                button.disabled = true;
                button.style.cursor = "not-allowed";
                button.style.backgroundColor = "gray";

                const craftingContainer =
                    document.getElementById("craftingContainer");
                if (craftingContainer) {
                    craftingContainer.style.pointerEvents = "none";
                    craftingContainer.style.opacity = "0.5";
                }
            }
        }, 1000);
    });

    document.addEventListener("click", () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: getNormalizedMousePos(),
        });
    });

    document
        .getElementById("collectIngredient")
        ?.addEventListener("click", () => {
            const ingredient = Item.getRandomIngredient();
            inventory.addOrUpdateStack(ingredient.toStack());

            renderInventory(inventory);
            renderCraftingRecipes(inventory);
        });

    document.getElementById("test")?.addEventListener("click", () => {
        console.log("receipe clicked");
    });

    const glitchCountdownElement = document.getElementById("glitchCountdown");

    if (glitchCountdownElement) {
        glitchCountdownElement.textContent = glitchTimeLeft.toString();
    }

    setInterval(() => {
        glitchTimeLeft--;

        if (glitchTimeLeft <= 0) {
            // The glitch fires: remove the doomed ingredient and start a new cycle
            if (glitchTargetIndex >= 0) {
                inventory.ingredients.splice(glitchTargetIndex, 1);
            }
            showGlitchTarget = false;
            glitchTimeLeft = 10;
        } else if (glitchTimeLeft === 5) {
            // Warn the player which ingredient is about to disappear
            glitchTargetIndex = getRandomGlitchIndex();
            showGlitchTarget = true;
        }

        renderAll();

        if (glitchCountdownElement) {
            glitchCountdownElement.textContent = glitchTimeLeft.toString();
        }
    }, 1000);
}

setupEventListeners();
renderAll();
