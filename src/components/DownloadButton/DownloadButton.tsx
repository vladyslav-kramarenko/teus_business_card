"use client";

import styles from './DownloadButton.module.css';
import { Employee } from "@/app/types/Employee";
import Image from "next/image";

type DownloadButtonProps = {
    employee: Employee;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ employee }) => {
    const handleDownload = async () => {
        try {
            const response = await fetch('/api/generate-vcard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employee }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate vCard');
            }

            const vCardString = await response.text();
            const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${employee.first_name.toLowerCase()}_${employee.last_name.toLowerCase()}.vcf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleDownload} className={styles.downloadBtn}>
            <Image src="/download-icon.svg" alt="Download Icon" className={styles.downloadIcon} width={18} height={18} />
            Download
        </button>
    );
};

export default DownloadButton;
