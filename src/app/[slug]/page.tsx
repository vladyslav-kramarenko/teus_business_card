import {notFound} from 'next/navigation';
import {Employee} from '../types/Employee';
import styles from './card.module.css';
import Image from 'next/image';
import Head from "next/head";
import DownloadButton from "@/components/DownloadButton/DownloadButton";

async function fetchEmployee(slug: string): Promise<Employee | null> {
    const res = await fetch(`https://cms.teus-group.com/api/employees?filters[url][$eq]=${slug}&populate=*`, {
        next: {revalidate: 60},
    });
    const data = await res.json();
    return data.data.length ? data.data[0] : null;
}

export default async function BusinessCardPage({
                                                   params,
                                               }: {
    params: Promise<{ slug: string }>;
}) {

    const resolvedParams = await params;
    const {slug} = resolvedParams;

    const employee = await fetchEmployee(slug);

    if (!employee) {
        notFound();
    }

    // Null checks for employee properties
    const {
        first_name = '',
        last_name = '',
        title = '',
        phone1 = '',
        phone2 = '',
        email = '',
        website = '',
        meta_img = null,
    } = employee || {};

    return (
        <>
            <Head>
                <title>{first_name && last_name ? `${first_name} ${last_name} - ${title}` : 'Employee'}</title>
                <meta name="description"
                      content={`Business card of ${employee.first_name} ${employee.last_name}, ${employee.title} at ${employee.address}`}/>
                <meta property="og:title" content={`${employee.first_name} ${employee.last_name} - ${employee.title}`}/>
                <meta property="og:description"
                      content={`Business card of ${employee.first_name} ${employee.last_name}, ${employee.title}`}/>
                {meta_img?.url && (
                    <meta property="og:image" content={`https://cms.teus-group.com/${employee.meta_img.url}`}/>
                )}
                <meta property="og:url" content={`https://card.teus-group.com/${employee.url}`}/>
            </Head>
            <div className={styles.pageWrapper}>
                <div className={styles.cardContainer}>
                    <div className={styles.businessCard} id="front">
                        <a href={employee.website} target="_blank" rel="noopener noreferrer">
                            <Image src="/teus_logo.svg" alt="Logo" className={styles.logo} width={55} height={55}/>
                        </a>
                        <div className={styles.name}>
                            {employee.first_name} {employee.last_name}
                        </div>
                        {title && <div className={styles.position}>{title}</div>}
                        <div className={styles.phone}>
                            {phone1 && (
                                <a href={`tel:${phone1}`} className={styles.link}>
                                    {phone1}
                                </a>
                            )}
                            {phone2 && (
                                <a href={`tel:${phone2}`} className={styles.link}>
                                    {phone2}
                                </a>
                            )}
                        </div>

                        <div className={styles.contactInfo}>
                            {email && (
                                <a href={`mailto:${email}`} className={styles.link}>
                                    {email}
                                </a>
                            )}
                            {website && (
                                <a href={website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    {website}
                                </a>
                            )}
                        </div>

                        <div className={styles.qrCode}>
                            <a href="https://multilink.teus-group.com" target="_blank" rel="noopener noreferrer">
                                <Image src="/teus_multilink_qr_white.png" alt="QR Code" width={80} height={80}/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.businessCardBack} id="back">
                        <Image src="/teus_wordmark.svg" alt="Back of the card" className={styles.backImage} width={200}
                               height={200}/>
                    </div>
                    <div className={styles.vcardDownload}>
                        <DownloadButton employee={employee}/>
                    </div>
                </div>
            </div>
        </>
    );
}
