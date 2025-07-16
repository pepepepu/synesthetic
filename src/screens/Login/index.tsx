import "./Login.scss"; // Se você tiver um arquivo de estilo
import { MorphingText } from "../../components/MorphText";
import { BubbleBackground } from "../../components/BubbleBackground";

const Login = () => {
  // Acessando as variáveis de ambiente de forma segura
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const AUTH_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;

  // O tipo de resposta 'token' usa o fluxo "Implicit Grant" do Spotify
  const RESPONSE_TYPE = "token";

  const texts = ["synesthetic"];

  const SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-read-playback-state",
    "streaming",
    "user-modify-playback-state",
  ];

  // Montando a URL de login de forma segura
  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(
    SCOPES.join(" ")
  )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

  return (
    <BubbleBackground className="login-page-wrapper" interactive={true}>
      <div className="login-container">
        <MorphingText texts={texts} />
        {/* <a href={loginUrl} className="login-button">
          Entrar com Spotify
        </a> */}
      </div>
    </BubbleBackground>
  );
};

export default Login;
