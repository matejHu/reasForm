# 🏠 REAS Formulář pro sběr leadů

Jednoduchá fullstack aplikace pro sběr kontaktů na zájemce o prodej nemovitostí.

## 💡 Obsah projektu

- 🖼️ **Frontend:** React (Vite)
- 🌐 **Backend:** Express.js + MongoDB (Mongoose)
- 🐳 **Docker:** Lokální vývoj v jednom kontejneru
- ☁️ **Deployment:** Vercel (frontend), Railway (backend)

---

## 🌍 Online verze

- 🧾 **Frontend (Vercel):**\
  [https://reas-form-puce.vercel.app](https://reas-form-puce.vercel.app)

- ⚙️ **Backend (Railway):**\
  [https://reasform.up.railway.app](https://reasform.up.railway.app)

---

## 🐳 Lokální spuštění přes Docker

### 🔧 Požadavky

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (včetně Docker Compose)
- Git

### 📅 Postup krok za krokem

1. **Naklonuj repozitář:**

```bash
git clone https://github.com/matejHu/reas-form.git
cd reas-form
```

2. **Vytvoř **``** pro backend (v **``** složce):**

```env
# backend/.env
MONGODB_URI=mongodb+srv://<u017eivatel>:<heslo>@<cluster>.mongodb.net/nabidky
PORT=4000
```

3. **Vytvoř **``** i pro frontend (v **``** složce):**

```env
# frontend/.env
REACT_APP_API_URL=http://localhost:4000
```

4. **Spusť Docker:**

```bash
docker compose up --build
```

5. **Otevři v prohlížeči:**

[http://localhost:4000](http://localhost:4000)\
Frontend i backend poběží v jednom kontejneru.

> Formulář posílá data na `POST /lead`, která se ukládají do MongoDB.

---

## 🔄 Redeploy & změny v produkci

### 🛠 Railway (backend):

- Pokud změníš `.env` nebo backend kód:
  - Přejdi na [Railway.app](https://railway.app)
  - Vyber projekt → klikni **Deploy → Redeploy**

### 🚀 GitHub změny:

- **Push na main branch** → automatický redeploy:
  - Frontend na Vercel
  - Backend na Railway (pokud propojeno s GitHub)

---

## ✅ Validace

### Frontend:

- 📧 Validace e-mailu (formát `někdo@něco.tld`)
- 📱 Validace českého telefonního čísla (9 číslic)

### Backend:

- ✅ Kontrola povinných polí
- 🧱 Minimální ochrana proti nevalidním vstupům

---

## 📁 Struktura projektu

```
.
├── backend/
│   ├── index.js
│   ├── .env            ← Backend config (lokálně)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env            ← Frontend config (lokálně)
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 📌 Poznámky

- `.env` soubory nejsou verzované (`.gitignore`)
- V produkci se proměnné nastavují přímo ve Vercelu a Railway
- Docker image spouští **multistage build**, který:
  - postaví React frontend (`npm run build`)
  - zkopíruje ho do Express backendu (`public`)
  - vše běží na portu `4000`

---

## 🧪 Testování

- Spusť formulář
- Vyplň validní data
- Odešli
- Data se uloží do MongoDB (např. MongoDB Atlas)

---

## ✍️ Autor

Matej Hudym\
GitHub: [@matejHu](https://github.com/matejHu)

