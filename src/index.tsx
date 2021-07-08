import React, { useState } from "react";
import ReactDOM from "react-dom";

interface Props4BoilingVerdict {
  celsius: number;
}

interface Props4TemperatureInput {
  temperature: string;
  scale: string;
  onTemperatureChange: (temperature: string) => void;
}

interface ScaleNameKeyObject {
  [scale: string]: string;
}

const scaleNames: ScaleNameKeyObject = {
  c: "Celsius",
  f: "Fahrenheit",
};

function toCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature: string, convert: (input: number) => number) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const BoilingVerdict = (props: Props4BoilingVerdict) => {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
};

const TemperatureInput = (props: Props4TemperatureInput) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onTemperatureChange(e.target.value);
  };
  const temperature = props.temperature;
  const scale: string = props.scale;

  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  );
};

const Calculator = () => {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  const handleCelsiusChange = (temperature: string) => {
    setScale("c");
    setTemperature(temperature);
  };
  const handleFahrenheitChange = (temperature: string) => {
    setScale("f");
    setTemperature(temperature);
  };

  const celsius =
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature;

  const fahrenheit =
    scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
};

ReactDOM.render(<Calculator />, document.getElementById("root"));
