import axios from 'axios';
import { useEffect, useState } from 'react';

// --- Interfaces Mínimas ---
interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
}
interface CurrentlyPlaying {
  item: SpotifyTrack | null;
}

const AcousticBrainzDebug = ({ token }: { token: string }) => {
  // Estados
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [mbid, setMbid] = useState<string | null>(null); // Guardar o ID do MusicBrainz
  const [acousticData, setAcousticData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Aguardando música do Spotify...');

  const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
  const MUSICBRAINZ_API_URL = 'https://musicbrainz.org/ws/2';
  const ACOUSTICBRAINZ_API_URL = 'https://acousticbrainz.org/api/v1';

  // --- EFEITO 1: Busca a música no Spotify (igual antes) ---
  useEffect(() => {
    if (!token) return;

    const fetchSpotifyTrack = async () => {
      try {
        const { data } = await axios.get<CurrentlyPlaying>(`${SPOTIFY_API_URL}/me/player`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.item?.id !== currentTrack?.id) {
          setCurrentTrack(data.item);
          // Limpa os dados antigos quando a música muda
          setMbid(null);
          setAcousticData(null);
          setError(null);
        }
      } catch (err: any) {
        setError(`ERRO SPOTIFY: ${err.message}`);
      }
    };

    const interval = setInterval(fetchSpotifyTrack, 3000);
    return () => clearInterval(interval);
  }, [token, currentTrack?.id]);

  // --- EFEITO 2: Busca no MusicBrainz e depois no AcousticBrainz ---
  useEffect(() => {
    if (!currentTrack) {
      setStatus('Aguardando música do Spotify...');
      return;
    }

    const getAnalysis = async () => {
      try {
        // --- PASSO A: Buscar o MBID ---
        setStatus(`Buscando MusicBrainz ID para "${currentTrack.name}"...`);
        setError(null);

        const trackName = encodeURIComponent(currentTrack.name);
        const artistName = encodeURIComponent(currentTrack.artists[0].name);
        const query = `recording:${trackName} AND artist:${artistName}`;

        const mbResponse = await axios.get(`${MUSICBRAINZ_API_URL}/recording/?query=${query}&fmt=json`);

        if (mbResponse.data.recordings && mbResponse.data.recordings.length > 0) {
          const foundMbid = mbResponse.data.recordings[0].id;
          setMbid(foundMbid);
          setStatus(`MBID encontrado: ${foundMbid}. Buscando no AcousticBrainz...`);

          // --- PASSO B: Usar o MBID para buscar no AcousticBrainz ---
          // Usamos o endpoint 'high-level' que é mais parecido com o antigo 'audio-features'
          const abResponse = await axios.get(`${ACOUSTICBRAINZ_API_URL}/${foundMbid}/high-level`);
          setAcousticData(abResponse.data);
          setStatus('Análise do AcousticBrainz recebida com sucesso! ✅');

        } else {
          throw new Error("Música não encontrada no MusicBrainz.");
        }

      } catch (err: any) {
        setError(`ERRO FINAL: ${err.message}`);
        setAcousticData(null);
      }
    };

    getAnalysis();
  }, [currentTrack]); // Roda sempre que a música do Spotify mudar

  // --- Renderização ---
  return (
    <div style={{ fontFamily: 'monospace', color: 'white', padding: '20px' }}>
      <h1>Depuração: Spotify ➔ MusicBrainz ➔ AcousticBrainz</h1>

      {error && (
        <div style={{ padding: '15px', backgroundColor: '#5c1f1f', border: '2px solid red', margin: '20px 0' }}>
          <h2>Ocorreu um erro:</h2>
          <p>{error}</p>
        </div>
      )}
      <p><strong>Status Atual:</strong> {status}</p>

      {/* Caixa do Passo 1 */}
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '20px 0' }}>
        <h3>PASSO 1: Música do Spotify</h3>
        <pre style={{ backgroundColor: '#333', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify(currentTrack, null, 2) || 'null'}
        </pre>
      </div>

      {/* Caixa do Passo 2 e 3 */}
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h3>PASSO 2 & 3: Resultado do AcousticBrainz (via MBID: {mbid || 'N/A'})</h3>
        <pre style={{ backgroundColor: '#333', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify(acousticData, null, 2) || 'null'}
        </pre>
      </div>
    </div>
  );
};

export default AcousticBrainzDebug;