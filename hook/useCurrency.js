// import { useEffect, useState } from 'react';

// const currencyMap = {
//   US: { symbol: '$', code: 'USD' },
//   IN: { symbol: '₹', code: 'INR' },
//   EU: { symbol: '€', code: 'EUR' },
//   GB: { symbol: '£', code: 'GBP' },
//   JP: { symbol: '¥', code: 'JPY' },
//   // add more if needed
// };

// export default function useCurrency() {
//   const [currency, setCurrency] = useState({ symbol: '$', code: 'USD' });

//   useEffect(() => {
//     async function fetchLocation() {
//       try {
//         const res = await fetch('https://ipapi.co/json/');
//         const data = await res.json();
//         const country = data.country;

//         if (currencyMap[country]) {
//           setCurrency(currencyMap[country]);
//         }
//       } catch (err) {
//         console.error('Geo API error:', err);
//       }
//     }

//     fetchLocation();
//   }, []);

//   return currency;
// }





import { useEffect, useState } from 'react';

const currencyMap = {
  US: { symbol: '$', code: 'USD' },
  IN: { symbol: '₹', code: 'INR' },
  EU: { symbol: '€', code: 'EUR' },
  GB: { symbol: '£', code: 'GBP' },
  JP: { symbol: '¥', code: 'JPY' },
  // add more if needed
};

export default function useCurrency() {
  const [currency, setCurrency] = useState({ symbol: '$', code: 'USD' });

  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await res.json();
        const country = data.country_code; // GeoJS returns `country_code`

        if (currencyMap[country]) {
          setCurrency(currencyMap[country]);
        }
      } catch (err) {
        console.error('GeoJS API error:', err);
      }
    }

    fetchLocation();
  }, []);

  return currency;
}






// import { useEffect, useState } from 'react';

// const currencyMap = {
//   US: { symbol: '$', code: 'USD' },
//   IN: { symbol: '₹', code: 'INR' },
//   EU: { symbol: '€', code: 'EUR' },
//   GB: { symbol: '£', code: 'GBP' },
//   JP: { symbol: '¥', code: 'JPY' },
//   // add more if needed
// };

// export default function useCurrency(baseCurrency = 'INR') {
//   const [currency, setCurrency] = useState({ symbol: '$', code: 'USD' });
//   const [rate, setRate] = useState(1); // conversion rate from baseCurrency → detected currency
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCurrencyData() {
//       try {
//         // 1. Detect user location
//         const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
//         const data = await res.json();
//         const country = data.country_code;

//         let detectedCurrency = currencyMap[country] || currencyMap['US'];
//         setCurrency(detectedCurrency);

//         // 2. Fetch conversion rate from baseCurrency to detected currency
//         if (detectedCurrency.code !== baseCurrency) {
//           const rateRes = await fetch(
//             `https://api.exchangerate.host/convert?from=${baseCurrency}&to=${detectedCurrency.code}`
//           );
//           const rateData = await rateRes.json();
//           setRate(rateData.result || 1);
//         }
//       } catch (err) {
//         console.error('Currency detection/conversion error:', err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCurrencyData();
//   }, [baseCurrency]);

//   // Function to convert any amount
//   const convert = (amount) => (amount * rate).toFixed(2);

//   return { currency, convert, loading };
// }
