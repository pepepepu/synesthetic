import { Link, useParams } from 'react-router-dom';

// Reutilizando os mesmos estilos para consistência
const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#121212',
  color: 'white',
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const linkStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#1DB954',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '50px',
  fontWeight: 'bold',
};

const codeStyle: React.CSSProperties = {
  backgroundColor: '#282828',
  padding: '5px 10px',
  borderRadius: '5px',
  fontFamily: 'monospace',
}

function Visualization() {
  // O hook useParams captura os parâmetros dinâmicos da URL.
  // O nome 'trackId' deve ser o mesmo que você definiu na rota ('/visualization/:trackId').
  const { trackId } = useParams();

  return (
    <div style={pageStyle}>
      <h1>Página de Visualização das Animações</h1>
      <p>A animação para a música com o ID abaixo aparecerá aqui.</p>
      <p>
        Track ID recebido: <code style={codeStyle}>{trackId}</code>
      </p>
      <Link to="/dashboard" style={linkStyle}>
        Voltar para o Dashboard
      </Link>
    </div>
  );
}

export default Visualization;