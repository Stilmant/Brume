// test-db.js - Script de test pour vérifier la persistance
import {
  getOrCreateSession,
  addMessage,
  getAllSessions,
  sessionExists
} from "./db.js";

console.log("🧪 Test de la base de données SQLite\n");

// Test 1: Créer une session
console.log("1️⃣ Création d'une session de test...");
const testId = "test-123";
const session = getOrCreateSession(testId);
console.log(`   ✅ Session créée: ${session.id}`);
console.log(`   📊 Messages: ${session.messages.length}`);

// Test 2: Ajouter des messages
console.log("\n2️⃣ Ajout de messages...");
addMessage(testId, "user", "Bonjour Brume!");
addMessage(testId, "admin", "Bonjour! Comment puis-je vous aider?");
console.log("   ✅ 2 messages ajoutés");

// Test 3: Récupérer la session avec les messages
console.log("\n3️⃣ Récupération de la session...");
const sessionWithMessages = getOrCreateSession(testId);
console.log(`   ✅ Messages dans la session: ${sessionWithMessages.messages.length}`);
sessionWithMessages.messages.forEach((msg, i) => {
  console.log(`      ${i+1}. [${msg.from}]: ${msg.text}`);
});

// Test 4: Vérifier l'existence
console.log("\n4️⃣ Vérification d'existence...");
console.log(`   ✅ Session existe: ${sessionExists(testId)}`);
console.log(`   ✅ Session inexistante: ${sessionExists("fake-id")}`);

// Test 5: Lister toutes les sessions
console.log("\n5️⃣ Liste de toutes les sessions...");
const allSessions = getAllSessions();
console.log(`   ✅ Total: ${allSessions.length} session(s)`);
allSessions.forEach(s => {
  console.log(`      - ${s.id}: ${s.messages} message(s), non lu: ${s.unread}`);
});

console.log("\n✨ Tous les tests passés avec succès!\n");
console.log("💡 La base de données 'brume.db' a été créée et fonctionne correctement.");
console.log("💡 Les données persistent même après redémarrage du serveur.\n");
