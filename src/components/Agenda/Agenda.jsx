import styles from './Agenda.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Agenda() {
    const eventos = [
        {
            id: 1,
            titulo: "Debate sobre Educação Pública",
            data: "2025-12-15",
            horario: "19:00",
            local: "Centro Cultural de Madureira",
            descricao: "Discussão sobre melhorias na educação municipal e valorização dos professores"
        },
        {
            id: 2,
            titulo: "Caminhada na Zona Norte",
            data: "2025-12-18",
            horario: "16:00",
            local: "Praça de Madureira",
            descricao: "Encontro com moradores para ouvir demandas e apresentar propostas"
        },
        {
            id: 3,
            titulo: "Reunião com Comerciantes",
            data: "2025-12-20",
            horario: "10:00",
            local: "Associação Comercial",
            descricao: "Diálogo sobre geração de empregos e incentivos ao comércio local"
        },
        {
            id: 4,
            titulo: "Encontro sobre Saúde",
            data: "2025-12-22",
            horario: "18:30",
            local: "Clínica da Família do Engenho",
            descricao: "Debate sobre ampliação de atendimento e redução de filas"
        },
        {
            id: 5,
            titulo: "Ação Social na Comunidade",
            data: "2025-12-27",
            horario: "09:00",
            local: "Quadra do Bairro Novo",
            descricao: "Distribuição de materiais escolares e atendimento à população"
        },
        {
            id: 6,
            titulo: "Debate sobre Mobilidade Urbana",
            data: "2025-12-29",
            horario: "20:00",
            local: "Auditório da UERJ",
            descricao: "Apresentação de propostas para transporte público e ciclovias"
        }
    ];

    const formatarData = (dataISO) => {
        const [ano, mes, dia] = dataISO.split('-');
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        return `${dia} ${meses[parseInt(mes) - 1]}`;
    };

    return (
        <section className={styles.agenda} id="agenda">
            <h2>Próximos Eventos</h2>

            <div className={styles.eventosContainer}>
                {eventos.map((evento) => (
                    <Card
                        key={evento.id}
                        className={styles.eventoCard}
                        sx={{
                            backgroundColor: 'var(--background)',
                            borderColor: 'var(--primary-color)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        variant="outlined"
                    >
                        <div className={styles.cardHeader}>
                            <Typography variant="body1" className={styles.dataHorario}>
                                {formatarData(evento.data)} - {evento.horario}
                            </Typography>
                        </div>

                        <CardContent className={styles.cardContent}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'var(--secondary-color)',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                {evento.titulo}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'var(--primary-color)',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}
                            >
                                📍 {evento.local}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'var(--primary-color)',
                                    lineHeight: 1.5
                                }}
                            >
                                {evento.descricao}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}