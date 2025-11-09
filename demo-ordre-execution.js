// demo-ordre-execution.js - Démonstration de l'ordre d'exécution

console.log("\n🎬 === DÉMONSTRATION : ORDRE D'EXÉCUTION ===\n");

console.log("1️⃣  Script démarre (vous venez de taper 'node demo-ordre-execution.js')");
console.log("    └─ Node.js lit le fichier de haut en bas\n");

console.log("2️⃣  On va maintenant importer db.js...");
console.log("    └─ Attention : TOUT le code au niveau racine de db.js va s'exécuter !\n");

console.log("⏳  Import en cours...\n");

// 🔥 ICI : Tout le code de db.js s'exécute MAINTENANT
import { getOrCreateSession, getAllSessions } from "./db.js";

console.log("\n3️⃣  Import terminé !");
console.log("    └─ La base de données est maintenant créée (ou ouverte si elle existait)\n");

console.log("4️⃣  Vérifions les sessions existantes...");
const sessions = getAllSessions();
console.log(`    └─ Nombre de sessions : ${sessions.length}\n`);

if (sessions.length > 0) {
  console.log("📋 Sessions trouvées :");
  sessions.forEach(s => {
    console.log(`   - ${s.id} : ${s.messages} message(s)`);
  });
} else {
  console.log("📭 Aucune session trouvée (base vide)");
}

console.log("\n5️⃣  Créons une session de démonstration...");
const demoSession = getOrCreateSession("demo-xyz");
console.log(`    └─ Session '${demoSession.id}' récupérée/créée`);
console.log(`    └─ Messages dans cette session : ${demoSession.messages.length}\n`);

console.log("✅ Démonstration terminée !\n");
console.log("💡 Points clés à retenir :");
console.log("   • La base est créée/ouverte lors de l'IMPORT de db.js");
console.log("   • Les tables sont créées lors de l'IMPORT (si elles n'existent pas)");
console.log("   • C'est AVANT toute utilisation des fonctions");
console.log("   • C'est pour ça que la persistance fonctionne dès le premier démarrage\n");
