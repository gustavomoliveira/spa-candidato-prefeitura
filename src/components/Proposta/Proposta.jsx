import styles from './Proposta.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SecurityIcon from '@mui/icons-material/Security';
import ParkIcon from '@mui/icons-material/Park';
import WorkIcon from '@mui/icons-material/Work';

export default function Proposta() {
    const propostas = [
        {
            id: 1,
            titulo: "Educação de Qualidade",
            descricao: "Implementar programa de reforço escolar em todas as escolas municipais, valorizar professores com melhores salários e criar centros de tecnologia educacional nas comunidades.",
            icone: <SchoolIcon />
        },
        {
            id: 2,
            titulo: "Saúde Acessível",
            descricao: "Ampliar o horário de funcionamento das clínicas da família, reduzir filas de espera com agendamento digital e garantir medicamentos básicos em todas as unidades de saúde.",
            icone: <LocalHospitalIcon />
        },
        {
            id: 3,
            titulo: "Mobilidade Urbana",
            descricao: "Criar corredores exclusivos de ônibus, expandir ciclovias conectando bairros e integrar sistemas de transporte com tarifa única para facilitar deslocamentos.",
            icone: <DirectionsBusIcon />
        },
        {
            id: 4,
            titulo: "Segurança e Prevenção",
            descricao: "Investir em iluminação pública, criar programa de capacitação profissional para jovens em situação de risco e fortalecer policiamento comunitário nos bairros.",
            icone: <SecurityIcon />
        },
        {
            id: 5,
            titulo: "Meio Ambiente Sustentável",
            descricao: "Implementar coleta seletiva em todos os bairros, criar parques urbanos nas áreas densas e desenvolver programa de arborização com espécies nativas para melhorar qualidade do ar.",
            icone: <ParkIcon />
        },
        {
            id: 6,
            titulo: "Geração de Emprego e Renda",
            descricao: "Criar polo de empreendedorismo local, oferecer cursos profissionalizantes gratuitos e estabelecer parcerias com empresas para programa de primeiro emprego para jovens.",
            icone: <WorkIcon />
        }
    ];

    const outrasPropostas = [
        "Criar programa de regularização fundiária para famílias de baixa renda",
        "Implementar Wi-Fi gratuito em praças e espaços públicos",
        "Desenvolver aplicativo municipal para denúncias e solicitações de serviços",
        "Ampliar programa de castração gratuita de animais domésticos",
        "Revitalizar centros culturais e oferecer oficinas artísticas gratuitas",
        "Estabelecer hortas comunitárias em áreas ociosas da cidade"
    ];

    return (
        <section className={styles.cards} id="proposta">
            <h2>Nossas Propostas</h2>

            {propostas.map((proposta) => (
                <Card
                    key={proposta.id}
                    variant="outlined"
                    sx={{
                        backgroundColor: 'var(--background)',
                        borderWidth: '2px',
                        color: 'var(--primary-color)',
                        borderColor: 'var(--primary-color)',
                    }}
                >
                    <CardContent>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconeContainer}>
                                {proposta.icone}
                            </div>
                            <Typography variant="h5" sx={{color: 'var(--secondary-color)', fontWeight: 'bold'}}>
                                {proposta.titulo}
                            </Typography>
                        </div>
                        <Typography variant="body1">
                            {proposta.descricao}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            <h3 className={styles.subtitulo}>E muito mais...</h3>

            <ul className={styles.listaSimples}>
                {outrasPropostas.map((proposta, index) => (
                    <li key={index}>{proposta}</li>
                ))}
            </ul>
        </section>
    );
}