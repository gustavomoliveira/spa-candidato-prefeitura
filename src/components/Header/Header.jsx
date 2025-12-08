import styles from './Header.module.css';
import IconButton from '@mui/material/IconButton';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FaSun } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <>
            {menuAberto && (
                <div className={styles.overlay} onClick={() => setMenuAberto(false)}></div>
            )}

            <header className={styles.header}>
                <div className={styles.menu}>
                    <IconButton onClick={() => toggleMenu()} className={styles.menuBurger}>
                        <DensityMediumIcon sx={{ color: 'var(--primary-color)' }} />
                    </IconButton>

                    <ul className={`${styles.menuLista} ${menuAberto ? styles.aberto : ""}`}>
                        <li><a href="#biografia">Biografia</a></li>
                        <li><a href="#proposta">Proposta</a></li>
                        <li><a href="#agenda">Agenda</a></li>
                        <li><a href="#contato">️Contato</a></li>
                    </ul>
                </div>
                <div className={styles.logo}>
                    <FaSun/>
                    <a href="#">Marco Madureira</a>
                </div>

                <Button
                    component="a"
                    href="mailto:contato@marcomadureira.com.br"
                    sx={{
                        p: 2,
                        borderRadius: 7,
                        fontWeight: 'bold',
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--background)',
                    }}
                    variant="contained"
                    endIcon={<ChevronRightIcon/>}
                >
                    Fale Conosco
                </Button>
            </header>
        </>
    );
}