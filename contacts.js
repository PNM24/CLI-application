const fs = require('fs').promises;
const path = require('path');

// Calea către fișierul contacts.json
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Funcția pentru a lista toate contactele
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);  // Returnează contactele după ce sunt citite
    return contacts;
  } catch (error) {
    console.error('Eroare la citirea contactelor:', error);
    return [];  // În caz de eroare, returnează un array gol
  }
}

// Funcția pentru a obține un contact după ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();  // Obține toate contactele
    const contact = contacts.find(contact => contact.id === contactId);  // Găsește contactul după ID
    return contact || null;  // Returnează contactul sau null dacă nu e găsit
  } catch (error) {
    console.error(`Eroare la găsirea contactului cu ID-ul ${contactId}:`, error);
  }
}

// Funcția pentru a elimina un contact după ID
async function removeContact(contactId) {
  try {
    let contacts = await listContacts();  // Obține toate contactele
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);  // Elimină contactul
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));  // Salvează lista actualizată
    console.log(`Contactul cu ID-ul ${contactId} a fost eliminat.`);
  } catch (error) {
    console.error(`Eroare la eliminarea contactului cu ID-ul ${contactId}:`, error);
  }
}

// Funcția pentru a adăuga un nou contact
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();  // Obține toate contactele
    const newContact = {
      id: String(contacts.length + 1),  // Generează un ID simplu
      name,
      email,
      phone
    };
    contacts.push(newContact);  // Adaugă noul contact în listă
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));  // Salvează lista actualizată
    console.log(`Contactul ${name} a fost adăugat.`);
  } catch (error) {
    console.error('Eroare la adăugarea contactului:', error);
  }
}

// Exportarea funcțiilor
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
