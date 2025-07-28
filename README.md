# 🏠 REAS Formulář pro sběr leadů

Jednoduchá fullstack aplikace pro sběr kontaktů na zájemce o prodej nemovitostí. Aplikace obsahuje:
- 🖼️ Frontend (React)
- 🌐 Backend (Express.js + MongoDB)
- 📦 Nasazení pomocí Dockeru (lokálně) nebo Vercel + Railway (online)

---

## 🌍 Online verze

- 🧾 **Frontend (Vercel):**  
  https://reas-form-puce.vercel.app

- ⚙️ **Backend (Railway):**  
  https://reasform.up.railway.app

---

## 🐳 Lokální spuštění přes Docker

### 🔧 Požadavky:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) (součástí novějších Docker verzí)

### 🛠️ Postup:

1. Naklonuj repozitář:

```bash
git clone https://github.com/matejHu/reas-form.git
cd reas-form
Vytvoř .env soubor pro backend:

env
# ./backend/.env
MONGODB_URI=mongodb+srv://<uzivatel>:<heslo>@cluster.mongodb.net/nabidky
PORT=4000
Spusť Docker:


docker compose up --build
Otevři prohlížeč:

http://localhost:4000
Frontend i backend poběží v jednom kontejneru. API je dostupné na /lead.

Jak upravit a redeploynout
Pokud změníš .env nebo kód:
🔃 Na Railway:
Přejdi do projektu na https://railway.app

Klikni na Deploy → Redeploy – aby se aplikace znovu sestavila a použila nové proměnné

📤 Na GitHub:
Jakákoli změna v repozitáři spustí nové nasazení na:

Vercel (frontend)

Railway (backend, pokud je propojeno)

✅ Validace
Frontend:

Ověření českého telefonního čísla (9 číslic)

Validní email ve tvaru neco@nekde.tld

Backend:

Povinná pole a jednoduchá kontrola vstupů

🧪 Testování
Formulář testuješ jednoduše odesláním dat přes frontend. Data se ukládají do MongoDB (přes Atlas nebo lokální instance).

📂 Struktura projektu
pgsql
Zkopírovat
Upravit
.
├── backend/
│   ├── index.js
│   └── .env
├── frontend/
│   ├── public/
│   └── src/
├── docker-compose.yml
└── Dockerfile
📌 Poznámky
.env soubor není verzován (ignorován .gitignore)

V produkci se používají proměnné prostředí nastavené přímo na Vercel a Railway