import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h2>Forma AI</h2>
        <span>AI-Powered Dynamic Forms</span>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Describe your situation</h1>
          <p>
            Tell us what happened in your own words. Forma AI will understand
            your response and help complete the form.
          </p>

          <textarea
            placeholder="Example: I had an accident yesterday with my Honda car and the windshield was damaged..."
          />

          <button>Generate Form</button>
        </section>

        <section className="form-preview">
          <h2>Generated Form</h2>
          <p>
            Your AI-generated form will appear here after you describe your
            situation.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;