// src/utils/generateVCard.ts
import vCardsJS from 'vcards-js';

export function generateVCard(employee) {
    // Create a new vCard
    const vCard = vCardsJS();

    // Set vCard properties
    vCard.firstName = employee.first_name;
    vCard.lastName = employee.last_name;
    vCard.organization = 'TEUS Group';
    vCard.title = employee.title;
    vCard.workPhone = employee.phone1;
    vCard.cellPhone = employee.phone2;
    vCard.email = employee.email;
    vCard.url = employee.website;
    // vCard.note = `Generated for ${employee.first_name} ${employee.last_name}`;

    // Return the vCard as a string
    return vCard.getFormattedString();
}
