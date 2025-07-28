require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

const allowedOrigins = [
  'https://reas-form-puce.vercel.app',
  'http://localhost:4000',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Základní root route pro test
app.get('/', (req, res) => res.send('API is running'));

// Připojení k MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Připojeno k MongoDB'))
  .catch((err) => console.error('Chyba při připojování k MongoDB:', err));

// Definice schématu a modelu
const leadSchema = new mongoose.Schema({
  estateType: { type: String, required: true },
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  region: { type: String, required: true },
  district: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.model('Lead', leadSchema);

// API endpoint pro odesílání formuláře
app.post('/lead', async (req, res) => {
  const { estateType, fullname, phone, email, region, district } = req.body;

  // Validace vstupních dat
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^(\+420)?\s?\d{3}\s?\d{3}\s?\d{3}$/.test(phone);

  if (!estateType || !fullname || !phone || !email || !region || !district) {
    return res.status(400).json({ error: 'Všechna pole jsou povinná.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Neplatný formát e-mailu.' });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({ error: 'Neplatný formát českého telefonního čísla.' });
  }

  try {
    const lead = new Lead({ estateType, fullname, phone, email, region, district });
    await lead.save();
    res.status(201).json({ message: 'Lead uložen.' });
  } catch (err) {
    res.status(500).json({ error: 'Chyba serveru.' });
  }
});

// Serve React statické soubory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback pro React Router v režimu SPA (pro Express v5!)
app.use(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Spuštění serveru
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API běží na http://localhost:${PORT}`);
});
