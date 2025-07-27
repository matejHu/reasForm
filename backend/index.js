require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

// Připojení k MongoDB (nahraď URI vlastní)
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)

// Schéma pro lead
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



// Validace helpery


// POST /lead endpoint
app.post('/lead', async (req, res) => {
  const { estateType, fullname, phone, email, region, district } = req.body;

  console.log('Přijatá data:', req.body);

  if (!estateType || !fullname || !phone || !email || !region || !district) {
    return res.status(400).json({ error: 'Všechna pole jsou povinná.' });
  }

  try {
    const lead = new Lead({ estateType, fullname, phone, email, region, district });
    await lead.save();
    res.status(201).json({ message: 'Lead uložen.' });
  } catch (err) {
    res.status(500).json({ error: 'Chyba serveru.' });
  }
});

// Spuštění serveru
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API běží na http://localhost:${PORT}`);
});