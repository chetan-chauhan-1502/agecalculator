import { useState } from "react";
import "./App.css";

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  const handleDatePicker = (e) => {
    const val = e.target.value;
    setDateValue(val);
    if (!val) return;
    const [y, m, d] = val.split("-");
    setYear(y);
    setMonth(String(parseInt(m)));
    setDay(String(parseInt(d)));
    setError("");
  };

  const handleManualInput = (field, value) => {
    if (field === "day") setDay(value);
    if (field === "month") setMonth(value);
    if (field === "year") setYear(value);

    const d = field === "day" ? value : day;
    const m = field === "month" ? value : month;
    const y = field === "year" ? value : year;

    if (d && m && y.length === 4) {
      const iso = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      const parsed = new Date(iso);
      if (!isNaN(parsed) && parsed <= today) {
        setDateValue(iso);
      }
    }
    setError("");
  };

  const calculateAge = () => {
    setError("");

    if (!day || !month || !year) {
      setError("Please enter your complete birth date.");
      return;
    }

    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      birthDate.getFullYear() !== Number(year) ||
      birthDate.getMonth() !== Number(month) - 1 ||
      birthDate.getDate() !== Number(day)
    ) {
      setError("Please enter a valid date.");
      return;
    }

    if (birthDate > today) {
      setError("Birth date cannot be in the future.");
      return;
    }

    const diff = today - birthDate;
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      ).getDate();
      days += previousMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({
      years,
      months,
      days,
      hours: totalHours % 24,
      minutes: totalMinutes % 60,
      seconds: totalSeconds % 60,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Age Calculator</h1>
        <p className="subtitle">
          Find your exact age in years, months, and days.
        </p>

        {/* Date Picker — best experience on mobile */}
        <div className="date-picker-wrap">
          <label className="picker-label">Pick from calendar</label>
          <input
            type="date"
            className="date-picker"
            placeholder="dd-mm-yyyy"
            value={dateValue}
            max={maxDate}
            onChange={handleDatePicker}
          />
        </div>

        <div className="divider">
          <span>or enter manually</span>
        </div>

        {/* Manual number inputs */}
        <div className="date-inputs">
          <div className="input-group">
            <label>Day</label>
            <input
              type="number"
              placeholder="DD"
              value={day}
              onChange={(e) => handleManualInput("day", e.target.value)}
              min="1"
              max="31"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div className="input-group">
            <label>Month</label>
            <input
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => handleManualInput("month", e.target.value)}
              min="1"
              max="12"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div className="input-group">
            <label>Year</label>
            <input
              type="number"
              placeholder="YYYY"
              value={year}
              onChange={(e) => handleManualInput("year", e.target.value)}
              min="1900"
              max={today.getFullYear()}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        {error && <div className="error-msg">{error}</div>}

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
