import { Link, useNavigate } from 'react-router-dom';

// Estilos inline simples para centralizar o conteúdo
const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#191414', // Cor de fundo inspirada no Spotify
  color: 'white',
  fontFamily: 'sans-serif',
};

const linkStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#1DB954', // Verde Spotify
  color: 'white',
  textDecoration: 'none',
  borderRadius: '50px',
  fontWeight: 'bold',
  cursor: 'pointer', // Adicionado para botões e links
};

// Estilo específico para o botão de logout para diferenciá-lo
const logoutButtonStyle: React.CSSProperties = {
  ...linkStyle, // Herda os estilos do link
  backgroundColor: '#f44336', // Cor vermelha para indicar uma ação de saída/destrutiva
  marginTop: '15px',
};


function Dashboard() {
  // 1. Importe o hook useNavigate para poder redirecionar o usuário
  const navigate = useNavigate();

  // ID de uma música de exemplo para o link
  const exampleTrackId = '4cOdK2wGLETOMsVCDgM5tZ'; // Ex: "Blinding Lights" - The Weeknd

  // 2. Crie a função de logout
  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('spotify_access_token');
    // Redireciona o usuário para a página de login
    navigate('/login');
  };

  return (
    <div style={pageStyle}>
      <h1>Olá, Mundo! Esta é a sua Dashboard.</h1>
      <p>Aqui você verá a música que está tocando.</p>

      <Link to={`/visualization/${exampleTrackId}`} style={linkStyle}>
        Visualizar Animação (Exemplo)
      </Link>

      {/* 3. Adicione o botão de logout que chama a função handleLogout */}
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;