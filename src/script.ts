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
        showGlitchTarget ? glitchTargetIndex : undefined
    );
    renderCraftingRecipes(
        inventory,
        showGlitchTarget ? glitchTargetIndex : undefined
    );

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
                clearInterval(glitchInterval);

                const button = document.getElementById(
                    "collectIngredient"
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

                const modal = document.getElementById("gameOverModal") as HTMLDialogElement;
                const finalPoints = document.getElementById("finalPoints");
                if (finalPoints) {
                    finalPoints.textContent = inventory.getTotalPoints().toString();
                }
                modal?.showModal();
            }
        }, 1000);
    });

    document
        .getElementById("collectIngredient")
        ?.addEventListener("click", () => {
            const ingredient = Item.getRandomIngredient();
            inventory.addOrUpdateStack(ingredient.toStack());

            confetti({
                particleCount: 100,
                spread: 70,
                origin: getNormalizedMousePos()
            });

            renderAll();
        });

    document.getElementById("submitScore")?.addEventListener("click", async () => {
        const nameInput = document.getElementById("playerName") as HTMLInputElement;
        const name = nameInput.value.trim();
        const score = inventory.getTotalPoints();

        if (!name) {
            nameInput.focus();
            return;
        }

        const button = document.getElementById("submitScore") as HTMLButtonElement;
        button.disabled = true;

        try {
            const response = await fetch("https://api.hijmanssam.dev/qvakken-javascript/leaderboard",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, score })
                });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const leaderboardRes = await fetch("https://api.hijmanssam.dev/qvakken-javascript/leaderboard");
            if (!leaderboardRes.ok) {
                throw new Error(`HTTP ${leaderboardRes.status}`);
            }

            const entries = (await leaderboardRes.json()) as {
                name: string;
                score: number;
            }[];

            const tbody = document.querySelector("#leaderboardTable tbody");
            if (tbody) {
                tbody.innerHTML = "";
                for (const [i, entry] of entries.slice(0, 10).entries()) {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${i + 1}</td><td>${entry.name}</td><td>${entry.score}</td>`;
                    tbody.append(row);
                }
            }

            document.getElementById("submitView")!.hidden = true;
            document.getElementById("leaderboardView")!.hidden = false;
        } catch (err) {
            console.error("Failed to submit score:", err);
            button.disabled = false;
        }
    });

    const glitchCountdownElement = document.getElementById("glitchCountdown");

    if (glitchCountdownElement) {
        glitchCountdownElement.textContent = glitchTimeLeft.toString();
    }

    const glitchInterval = setInterval(() => {
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
