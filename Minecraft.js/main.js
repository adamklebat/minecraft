
// IMPORT البيانات الأساسية

import { INITIAL_MAP, Block_TYPES } from './constants.js';
//  الخريطة الأصلية للعبة (2D array)
//  أسماء أنواع البلاطات (مثل grass, dirt, stone blocks


// STATE (حالة اللعبة)

let worldData = [];      // نسخة الخريطة التي نلعب عليها (تتغير أثناء اللعب)
let inventory = [];      // مخزون اللاعب
let currentTool = null;  // الأداة المختارة (axe, pickaxe, shovel)
let currentBlock = null; // البلاطة المختارة لو اللاعب يريد وضعها في العالم


// DOM (عناصر HTML)

const grid = document.getElementById("game-grid");           // المكان الذي نرسم فيه العالم
const inventoryList = document.getElementById("inventory-list"); // عرض المخزون


// INIT GAME (تهيئة اللعبة)

function initGame() {
    // "اصنع نسخة جديدة من كل صف في الخريطة، عشان نقدر نلعب عليها بدون تغيير الخريطة الأصلية."
    worldData = INITIAL_MAP.map(row => [...row]);

    // إعادة تعيين المخزون والأداة والبلاطة المحددة
    inventory = [];
    currentTool = null; 
    currentBlock = null;    

    renderWorld();     // "اعرض العالم الجديد على الشاشة."
    renderInventory(); // "اعرض المخزون الجديد على الشاشة."
}


// WORLD (رسم العالم)

function renderWorld() {
    grid.innerHTML = ""; // إزالة أي بلاطات قديمة قبل الرسم

    // المرور على كل صف وعمود في الخريطة
    for (let r = 0; r < worldData.length; r++) {
        for (let c = 0; c < worldData[r].length; c++) {

            const tile = document.createElement("div"); // إنشاء عنصر بلاطة جديد
            const type = TILE_TYPES[worldData[r][c]];   // معرفة نوع البلاطة

            tile.className = "tile " + type;  // إضافة CSS class للبلاطة
            tile.dataset.row = r;             // حفظ رقم الصف
            tile.dataset.col = c;             // حفظ رقم العمود

            tile.onclick = handleTileClick;   // عند الضغط على البلاطة، نفذ handleTileClick

            grid.appendChild(tile);           // أضف البلاطة للشاشة
        }
    }
}


// CLICK  (التعامل مع الضغط على البلاطة)

function handleTileClick(e) {
    const r = e.target.dataset.row;  // الصف
    const c = e.target.dataset.col;  // العمود
    const type = TILE_TYPES[worldData[r][c]]; // نوع البلاطة

    
    console.log("tile clicked:", type);

    
    //  Mining (إذا اللاعب يحمل أداة)
    if (currentTool) {
        //  قواعد كسر البلاطات حسب الأداة
        if (
            (currentTool === "axe" && type === "wood-block") ||
            (currentTool === "pickaxe" && type === "stone-block") ||
            (currentTool === "shovel" && (type === "dirt-block" || type === "grass-block"))
        ) {
            inventory.push(type);       // أضف البلاطة للمخزون
            worldData[r][c] = 0;        // استبدل البلاطة بـ sky (فراغ)

            renderWorld();              // أعد رسم العالم
            renderInventory();          // أعد رسم المخزون
        }
    }

    // 📦 Placing (إذا اللاعب يحمل بلاطة لوضعها)
    else if (currentBlock && type === "sky") {
        const index = TILE_TYPES.indexOf(currentBlock); // رقم البلاطة
        worldData[r][c] = index;                        // ضع البلاطة في العالم

        const i = inventory.indexOf(currentBlock);     // حذف البلاطة من المخزون
        inventory.splice(i, 1);

        currentBlock = null;                            // إعادة تعيين البلاطة المحددة

        renderWorld();       // أعد رسم العالم
        renderInventory();   // أعد رسم المخزون
    }
}

// INVENTORY (رسم المخزون)

function renderInventory() {
    inventoryList.innerHTML = ""; // مسح المخزون القديم

    inventory.forEach(item => {
        const slot = document.createElement("div");
        slot.className = "inventory-slot";

        // إبراز البلاطة المختارة إذا كانت هذه هي
        if (currentBlock === item) {
            slot.classList.add("selected-slot");
        }

        slot.innerHTML = `<div class="inv-icon ${item}"></div>`; // عرض البلاطة

        // عند الضغط على البلاطة، اللاعب يحملها ويترك الأداة
        slot.onclick = () => {
            currentTool = null;
            currentBlock = item;
            renderInventory(); // تحديث المخزون لإظهار البلاطة المختارة
        };

        inventoryList.appendChild(slot); // إضافة البلاطة للمخزون على الشاشة
    });
}


// TOOLS (الأدوات)

["axe", "pickaxe", "shovel"].forEach(tool => {
    document.getElementById(tool + "-tool").onclick = () => {
        currentTool = tool;   // اختر الأداة
        currentBlock = null;  // أزل أي بلاطة كانت محمولة
    };
});

// BUTTONS (أزرار اللعبة)

document.getElementById("play-button").onclick = () => {
    // إخفاء صفحة الترحيب
    document.getElementById("welcome-screen").style.display = "none";
    // إظهار صفحة اللعبة
    document.getElementById("game-screen").style.display = "flex";
    initGame(); // بدء اللعبة
};

document.getElementById("reset-btn").onclick = () => {
    initGame(); // إعادة اللعبة من البداية
};
