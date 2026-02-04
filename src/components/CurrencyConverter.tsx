import { useState, useEffect } from "react";

const CURRENCIES = ["USD", "EUR", "GBP", "SEK", "NOK", "DKK"];

function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);

  // Hämta växelkurs när fromCurrency eller toCurrency ändras
  // Dependency array [fromCurrency, toCurrency] = effecten körs bara när någon av dessa ändras
  useEffect(() => {
    async function fetchExchangeRate() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch {
        setExchangeRate(null);
      } finally {
        setLoading(false);
      }
    }

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]); // 🔥 Körs bara när valutan ändras

  const converted = exchangeRate != null ? amount * exchangeRate : null;

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center">
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        Växelkurs 
      </h2>
    
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Från</span>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            {CURRENCIES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Till</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            {CURRENCIES.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-slate-700 mb-2">
        Konverterar från <strong>{fromCurrency}</strong> till <strong>{toCurrency}</strong>.
      </p>

      {loading ? (
        <p className="text-slate-500">Laddar kurs...</p>
      ) : exchangeRate != null ? (
        <>
          <p className="text-lg font-semibold text-slate-800 mb-2">
            1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
          </p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-24 px-3 py-2 border border-slate-300 rounded-lg"
            />
            <span className="text-slate-600">{fromCurrency}</span>
            <span className="text-slate-400">=</span>
            <span className="font-semibold text-slate-800">
              {converted?.toFixed(2)} {toCurrency}
            </span>
          </div>
        </>
      ) : (
        <p className="text-red-600">Kunde inte hämta växelkurs.</p>
      )}
    </div>
  );
}

export default CurrencyConverter;
