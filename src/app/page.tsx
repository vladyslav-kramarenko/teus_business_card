"use client";

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Employee} from "@/app/types/Employee";
import styles from './page.module.css';

function HomePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://cms.teus-group.com/api/employees?populate=*');

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                setEmployees(data.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
                console.error("Failed to fetch employees:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
            <div className={styles.pageWrapper}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Our Team</h1>
                </header>
                <div className={styles.employeesContainer}>
                    <ul className={styles.employeesList}>
                        {employees.map((employee) => (
                            <li key={employee.id} className={styles.employeeItem}>
                                <Link href={`/${employee.url}`} className={styles.employeeLink} target={'_blank'}>
                                    <div className={styles.employeeName}>
                                        {employee.first_name} {employee.last_name}
                                    </div>
                                    <div className={styles.employeeTitle}>{employee.title}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
}

export default HomePage;
