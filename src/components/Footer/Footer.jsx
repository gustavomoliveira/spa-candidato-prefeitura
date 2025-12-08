import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    const redesSociais = [
        {
            id: 1,
            nome: 'Facebook',
            url: 'https://facebook.com',
            icone: <FaFacebook />
        },
        {
            id: 2,
            nome: 'Instagram',
            url: 'https://instagram.com',
            icone: <FaInstagram />
        },
        {
            id: 3,
            nome: 'Twitter',
            url: 'https://twitter.com',
            icone: <FaTwitter />
        },
        {
            id: 4,
            nome: 'YouTube',
            url: 'https://youtube.com',
            icone: <FaYoutube />
        }
    ];

    return (
        <footer className={styles.footer} id="contato">
            <div className={styles.conteudo}>
                <div className={styles.secao}>
                    <h3>Redes Sociais</h3>
                    <div className={styles.redesSociais}>
                        {redesSociais.map((rede) => (
                            <a
                                key={rede.id}
                                href={rede.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.iconeRede}
                                aria-label={rede.nome}
                            >
                        {rede.icone}
                            </a>
                            ))}
                    </div>
                </div>

                {/* Seção de Contato */}
                <div className={styles.secao}>
                    <h3>Contato</h3>
                    <div className={styles.contato}>
                        <p>
                            <FaEnvelope className={styles.iconeContato} />
                            <a href="mailto:contato@marcomadureira.com.br">
                                contato@marcomadureira.com.br
                            </a>
                        </p>
                        <p>
                            <FaPhone className={styles.iconeContato} />
                            <a href="tel:+552133334444">
                                (21) 3333-4444
                            </a>
                        </p>
                        <p>
                            <FaMapMarkerAlt className={styles.iconeContato} />
                            <span>Rua da Campanha, 123 - Madureira, Rio de Janeiro - RJ</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className={styles.copyright}>
                <p>© 2025 Marco Madureira - Todos os direitos reservados</p>
            </div>
        </footer>
    );
}