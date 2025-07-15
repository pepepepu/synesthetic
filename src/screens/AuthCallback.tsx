import { useEffect, useRef } from 'react'; // 1. Importe o useRef
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  // 2. Crie uma referência para controlar a execução
  const hasRun = useRef(false);

  useEffect(() => {
    // 3. Verifique se o efeito já foi executado
    if (!hasRun.current) {
      // Marca que o efeito vai ser executado agora
      hasRun.current = true;

      const hash = window.location.hash;
      if (hash) {
        const accessToken = hash
          .substring(1)
          .split('&')
          .find((elem) => elem.startsWith('access_token'))
          ?.split('=')[1];

        if (accessToken) {
          console.log('Token recebido e salvo:', accessToken);
          localStorage.setItem('spotify_access_token', accessToken);
          window.location.hash = ''; // Limpa o token da URL por segurança
          navigate('/dashboard', { replace: true });
        } else {
          // Se não encontrou o token no hash, volta para o login
          navigate('/login', { replace: true });
        }
      } else {
        // Se não há hash na URL, volta para o login
        navigate('/login', { replace: true });
      }
    }
  }, [navigate]);

  return <div>Autenticando...</div>;
};

export default AuthCallback;