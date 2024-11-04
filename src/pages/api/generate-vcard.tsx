import { NextApiRequest, NextApiResponse } from 'next';
import { generateVCard } from '@/app/utils/generateVCard';
import { Employee } from '@/app/types/Employee';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { employee } = req.body;

    if (!employee) {
        return res.status(400).json({ error: 'Employee data is required' });
    }

    try {
        // Generate the vCard string
        const vCardString = generateVCard(employee as Employee);

        // Set headers to prompt a download
        res.setHeader('Content-Disposition', 'attachment; filename=contact.vcf');
        res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
        res.status(200).send(vCardString);
    } catch (error) {
        console.error('Error generating vCard:', error);
        res.status(500).json({ error: 'Failed to generate vCard' });
    }
}
