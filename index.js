const { Command } = require('commander');
const contacts = require('./contacts');
const program = new Command();

// Configurarea opțiunilor de linie de comandă cu Commander
program
  .option('-a, --action <type>', 'choose action')  // Alegerea acțiunii
  .option('-i, --id <type>', 'user id')  // ID-ul contactului
  .option('-n, --name <type>', 'user name')  // Numele contactului
  .option('-e, --email <type>', 'user email')  // Email-ul contactului
  .option('-p, --phone <type>', 'user phone');  // Telefonul contactului

program.parse(process.argv);  // Parsează argumentele din linia de comandă

const argv = program.opts();  // Preia opțiunile configurate

// Funcția pentru a invoca acțiunile
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();  // Obține toate contactele
      console.table(contactsList);  // Afișează contactele sub formă de tabel
      break;

    case 'get':
      const contact = await contacts.getContactById(id);  // Obține un contact după ID
      console.log(contact);  // Afișează contactul
      break;

    case 'add':
      await contacts.addContact(name, email, phone);  // Adaugă un nou contact
      break;

    case 'remove':
      await contacts.removeContact(id);  // Elimină un contact după ID
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');  // Avertizează dacă acțiunea nu este recunoscută
  }
}

// Invocă acțiunea pe baza opțiunilor date
invokeAction(argv);
