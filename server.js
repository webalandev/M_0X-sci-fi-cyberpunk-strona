import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/quote', (req, res) => {
    const { name, email, details } = req.body;
    
    if (!name || !email || !details) {
        return res.status(400).json({ error: 'BŁĄD: BRAK WYMAGANYCH DANYCH. UZUPEŁNIJ FORMULARZ.' });
    }

    console.log('[SYS.BACKEND] NOWE ZAPYTANIE OFERTOWE OTRZYMANE:');
    console.log(`- KLIENT/FIRMA: ${name}`);
    console.log(`- EMAIL: ${email}`);
    console.log(`- SPECYFIKACJA:\n${details}`);

    const trackingId = `0X-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    // W rzeczywistości tu by się wysyłał e-mail ale to tylko szkic
    
    return res.status(200).json({ 
        message: 'ZAPYTANIE WPROWADZONE DO SYSTEMU. TRWA ANALIZA TECHNOLOGICZNA.', 
        trackingId: trackingId 
    });
});

app.listen(PORT, () => {
    console.log(`[SYS.ONLINE] Serwer MANUFAKTURA 0X nasłuchuje na http://localhost:${PORT}`);
});

