import { useState } from "react";
import "./App.css";
import { buttonStyle } from "./utils/Button";

function App() {
  const [values, setValues] = useState({
    fornavn: "",
    etternavn: "",
    epost: "",
    passord: "",
    gjentaPassord: "",
    godTatt: false,
  });
  const [errors, setErrors] = useState({
    fornavn: {
      isValid: true,
      message: "",
    },
    etternavn: {
      isValid: true,
      message: "",
    },
    epost: {
      isValid: true,
      message: "",
    },
    passord: {
      isValid: true,
      message: "",
    },
    gjentaPassord: {
      isValid: true,
      message: "",
    },
    godTatt: {
      isValid: true,
      message: "",
    },
  });

  const handleTextfields = (name) => (e) => {
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    const isValid = validation();
    console.log("Validering: " + isValid);
    if (!isValid) {
      return;
    }

    console.log(values);
    try {
      let response = await fetch("/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: values,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const validation = () => {
    let feil = { ...errors };
    let isValid = true;

    // Sjekker om en teksfelt er tom
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "string") {
        if (value.trim() === "") {
          feil[key].isValid = false;
          feil[key].message = "Tekstfelt kan ikke være tom";
          isValid = false;
        } else {
          feil[key].isValid = true;
          feil[key].message = "";
        }
      }
    }

    // Sjekk om databehandlingsavtalen er godtatt
    if (values.godTatt === false) {
      feil.godTatt.isValid = false;
      feil.godTatt.message = "Du må godta databehandlingsavtalen";
      isValid = false;
    } else {
      feil.godTatt.isValid = true;
      feil.godTatt.message = "";
    }

    if (values.gjentaPassord && values.passord) {
      //Sjekk at passordene er like
      if (values.gjentaPassord.trim() !== values.passord.trim()) {
        feil.gjentaPassord.isValid = false;
        feil.gjentaPassord.message = "Passordene må være like";
        isValid = false;
      }
    }
    setErrors(feil);
    return isValid;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="info">
          <h2 style={{ color: "#fff" }}>Informasjon</h2>
          <p style={{ color: "#fff" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button style={buttonStyle(false)}>Jeg har konto</button>
        </div>
        <div className="signup">
          <h2 style={{ color: "blue" }}>Opprett bruker</h2>
          <div>
            <div>
              <div>
                <span>Fornavn</span>
                <input
                  type="text"
                  value={values.fornavn}
                  onChange={handleTextfields("fornavn")}
                ></input>
                <div style={{ color: "red" }}>
                  {!errors.fornavn.isValid ? errors.fornavn.message : ""}
                </div>
              </div>
              <div>
                <span>Etternavn</span>
                <input
                  type="text"
                  value={values.etternavn}
                  onChange={handleTextfields("etternavn")}
                ></input>
                <div style={{ color: "red" }}>
                  {!errors.etternavn.isValid ? errors.etternavn.message : ""}
                </div>
              </div>
            </div>
            <span>E-postadresse</span>
            <input
              type="text"
              value={values.epost}
              onChange={handleTextfields("epost")}
            ></input>
            <div style={{ color: "red" }}>
              {!errors.epost.isValid ? errors.epost.message : ""}
            </div>
            <div>
              <div>
                <span>Passord</span>
                <input
                  data-testid="passord"
                  type="text"
                  value={values.passord}
                  onChange={handleTextfields("passord")}
                ></input>
                <div style={{ color: "red" }}>
                  {!errors.passord.isValid ? errors.passord.message : ""}
                </div>
              </div>
              <div>
                <span>Gjenta passord</span>
                <input
                  data-testid="gjentaPassord"
                  type="text"
                  value={values.gjentaPassord}
                  onChange={handleTextfields("gjentaPassord")}
                ></input>
                <div data-testid="feilGjentaPassord" style={{ color: "red" }}>
                  {!errors.gjentaPassord.isValid
                    ? errors.gjentaPassord.message
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              value={values.godTatt}
              onChange={() =>
                setValues({ ...values, godTatt: !values.godTatt })
              }
            />
            <span>
              Jeg godtar <span className="link">Databehandlingsavtalen</span>
            </span>
            <div style={{ color: "red" }}>
              {!errors.godTatt.isValid ? errors.godTatt.message : ""}
            </div>
          </div>
          <button
            data-testid="submit"
            style={buttonStyle(true)}
            onClick={handleSubmit}
          >
            Registrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
