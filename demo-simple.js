// demo-simple.js - Démonstration ultra simple
console.log("\n========================================");
console.log("  DÉMONSTRATION : CRÉATION DE LA DB");
console.log("========================================\n");

console.log("📍 Étape 1 : Avant l'import");
console.log("   Le fichier db-avec-logs.js n'est pas encore chargé\n");

console.log("📍 Étape 2 : On fait l'import maintenant...\n");

// 🔥 L'import va déclencher TOUTE l'exécution de db-avec-logs.js
import { getOrCreateSession } from "./db-avec-logs.js";

console.log("📍 Étape 3 : Import terminé !");
console.log("   La base de données existe maintenant\n");

console.log("📍 Étape 4 : Utilisation d'une fonction");
console.log("   Appel de getOrCreateSession('test-abc')...\n");

const session = getOrCreateSession('test-abc');

console.log(`   ✅ Session récupérée : ${session.id}`);
console.log(`   📊 Messages : ${session.messages.length}\n`);

console.log("========================================");
console.log("  CONCLUSION");
console.log("========================================");
console.log("• La DB est créée PENDANT l'import");
console.log("• Les tables sont créées PENDANT l'import");
console.log("• Les fonctions sont utilisées APRÈS l'import");
console.log("========================================\n");
