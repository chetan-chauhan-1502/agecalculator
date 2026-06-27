import { useState } from "react";
import "./App.css";

const App = () => {
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - birthDate;

    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInMonths = ageInDays / 30.436875; // Average days in a month
    const ageInYears = ageInMonths / 12;

    setAge({
      years: Math.floor(ageInYears),
      months: Math.floor(ageInMonths % 12),
      days: Math.floor(ageInDays % 30.436875),
      hours: Math.floor(ageInHours % 24),
      seconds: Math.floor(ageInSeconds % 60),
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Age Calculator</h1>

        <p className="subtitle">
          Find your exact age in years, months, and days.
        </p>

        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <button onClick={calculateAge}>Calculate Age</button>

        {age && (
          <div className="results">
            <div className="box">
              <h2>{age.years}</h2>
              <span>Years</span>
            </div>

            <div className="box">
              <h2>{age.months}</h2>
              <span>Months</span>
            </div>

            <div className="box">
              <h2>{age.days}</h2>
              <span>Days</span>
            </div>

            <div className="box">
              <h2>{age.hours}</h2>
              <span>Hours</span>
            </div>

            <div className="box">
              <h2>{age.minutes}</h2>
              <span>Minutes</span>
            </div>

            <div className="box">
              <h2>{age.seconds}</h2>
              <span>Seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
