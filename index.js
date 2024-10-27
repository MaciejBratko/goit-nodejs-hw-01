const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

async function testContactsOperations() {
  try {
    // Test listContacts
    console.log("\nListing all contacts:");
    const allContacts = await contacts.listContacts();
    console.log(allContacts);

    // Test addContact
    console.log("\nAdding new contact:");
    const newContact = await contacts.addContact(
      "Mango",
      "mango@gmail.com",
      "322-22-22"
    );
    console.log(newContact);

    // Test getContactById
    console.log("\nGetting contact by id:");
    const contact = await contacts.getContactById(newContact.id);
    console.log(contact);

    // Test removeContact
    console.log("\nRemoving contact:");
    const removedContact = await contacts.removeContact(newContact.id);
    console.log(removedContact);

    // Verify removal
    console.log("\nFinal list of contacts:");
    const finalContacts = await contacts.listContacts();
    console.log(finalContacts);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

      case "get":
        const contact = await contacts.getContactById(String(id));
        if (contact) {
          console.log(contact);
        } else {
          console.log(`Contact with id ${id} not found`);
        }
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(String(id));
        if (removedContact) {
          console.log(`Contact removed successfully:`);
          console.log(removedContact);
        } else {
          console.log(`Contact with id ${id} not found`);
        }
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("\x1B[31m Error:", error.message);
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);

// testContactsOperations();
