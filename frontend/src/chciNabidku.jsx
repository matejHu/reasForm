import React, { useState } from 'react';
import krajeOkresy from './krajeOkresy'; // předpokládám, že to máš jako JSON nebo objekt
import MapaKraju from "./components/MapaKraju"; // cesta se přizpůsobí tvému umístění

const ChciNabidku = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    kraj: '',
    okres: '',
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!formData.type || !formData.kraj || !formData.okres) {
      setErrors({ step1: 'Vyplňte prosím všechna pole.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Zadejte jméno';
    if (!formData.phone) newErrors.phone = 'Zadejte telefon';
    if (!formData.email) newErrors.email = 'Zadejte email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const payload = {
      estateType: formData.type,
      region: formData.kraj,
      district: formData.okres,
      fullname: formData.name,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const res = await fetch('http://localhost:4000/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Chyba při odeslání.');
      }
    } catch (err) {
      console.error(err);
      alert('Chyba při odeslání.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-green-600">Děkujeme!</h2>
          <p className="text-gray-700 mt-2">Vaše údaje jsme uložili. Brzy se vám ozveme.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md font-inter">
        <h1 className="text-2xl font-bold text-[#1F2C3D] mb-2">Chci nabídku</h1>
        <p className="text-sm text-gray-500 mb-6">Vyplňte informace o nemovitosti a kontakt</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Typ nemovitosti</option>
                <option value="byt">Byt</option>
                <option value="dum">Dům</option>
                <option value="pozemek">Pozemek</option>
              </select>
              <MapaKraju
                selectedRegion={formData.kraj}
                setSelectedRegion={(kraj) =>
                  setFormData({ ...formData, kraj, okres: "" })
                }
              />
              {formData.kraj && (
                <select name="okres" value={formData.okres} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 bg-gray-50">
                  <option value="">
                    {formData.kraj === "Hlavní město Praha" ? "Vyberte městskou část" : "Vyberte okres"}
                  </option>
                  {krajeOkresy[formData.kraj].map((okres) => (
                    <option key={okres} value={okres}>{okres}</option>
                  ))}
                </select>
              )}
              {errors.step1 && <p className="text-red-500 text-sm">{errors.step1}</p>}
              <button type="button" onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition">Pokračovat</button>
            </>
          )}

          {step === 2 && (
            <>
              <input type="text" name="name" placeholder="Celé jméno" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 bg-gray-50" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              <input type="tel" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 bg-gray-50" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 bg-gray-50" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-800">Zpět</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition">Odeslat</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChciNabidku;