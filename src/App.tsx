import React, { useEffect, useState } from 'react';
import './App.css';
import dice from './icons/icon-dice.svg';
interface AdviceSlip {
  id: number;
  advice: string;
}

const url = 'https://api.adviceslip.com/advice';

const App: React.FC = () => {
  const [advice, setAdvice] = useState<AdviceSlip | null>(null);

  const handleAdvice = () => {
    fetchAdvice();
  };
  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const { slip } = data;
      setAdvice(slip);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };

  return (
    <div className='advice-wrapper'>
      {advice && (
        <div className='advice-id-container'>
          <div className='advice-container'>
            <h6 className='advice-id-heading'>ADVICE #{advice.id}</h6>
            <div className='advice-text'>
              <p> “{advice.advice}”</p>
            </div>
          </div>

          <div className='divider-wrapper'></div>
          <button className='btn' type='button' onClick={handleAdvice}>
            <img src={dice} alt={dice} />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
