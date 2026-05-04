/* global React, ReactDOM, Shell, StepRegion, StepPersona, StepReport, AboutProject */
const { useState, useMemo } = React;

function readDebugState(data) {
  const params = new URLSearchParams(window.location.search);
  const region = params.get("region");
  const persona = params.get("persona");
  const step = Number(params.get("step")) || 1;
  const about = params.get("about") === "1";

  const validRegion = data.REGIONS.find(r => r.id === region)?.id || null;
  const regionObj = validRegion ? data.REGIONS.find(r => r.id === validRegion) : null;
  const personas = regionObj
    ? (data.PERSONAS[validRegion] && data.PERSONAS[validRegion].length
        ? data.PERSONAS[validRegion]
        : data.buildGenericPersonas(regionObj))
    : [];
  const validPersona = personas.find(p => p.id === persona)?.id || null;

  const safeStep = validRegion
    ? validPersona
      ? Math.min(Math.max(step, 1), 3)
      : Math.min(Math.max(step, 1), 2)
    : 1;

  return {
    step: safeStep,
    regionId: validRegion,
    personaId: validPersona,
    showAbout: about,
  };
}

function App() {
  const data = window.__APP_DATA__;
  const debugState = useMemo(() => readDebugState(data), [data]);
  const [step, setStep] = useState(debugState.step);
  const [regionId, setRegionId] = useState(debugState.regionId);
  const [personaId, setPersonaId] = useState(debugState.personaId);
  const [showAbout, setShowAbout] = useState(debugState.showAbout);

  const region = data.REGIONS.find(r => r.id === regionId);
  const personas = useMemo(() => {
    if (!regionId) return [];
    const regionObj = data.REGIONS.find(r => r.id === regionId);
    const list = data.PERSONAS[regionId];
    if (list && list.length) return list;
    return regionObj ? data.buildGenericPersonas(regionObj) : (data.PERSONAS.__generic || data.PERSONAS.mapo);
  }, [regionId]);
  const persona = personas.find(p => p.id === personaId);

  const report = useMemo(() => {
    if (!region || !persona) return null;
    const r = data.REPORTS[region.id];
    if (r && r[persona.id]) return r[persona.id];
    return data.buildGenericReport(region, persona);
  }, [region, persona]);

  function handleSelectRegion(id) {
    setRegionId(id);
    if (personaId) setPersonaId(null);
  }
  function jumpStep(n) { setStep(n); }
  function openAbout() { setShowAbout(true); }
  function closeAbout() { setShowAbout(false); }

  return (
    <Shell step={step} region={region} persona={persona} onJumpStep={jumpStep}>
      {showAbout && (
        <AboutProject onClose={closeAbout} />
      )}

      {!showAbout && step === 1 && (
        <StepRegion
          regions={data.REGIONS}
          shapes={data.SEOUL_SHAPES}
          selectedRegion={regionId}
          onSelect={handleSelectRegion}
          onNext={() => setStep(2)}
        />
      )}
      {!showAbout && step === 2 && region && (
        <StepPersona
          region={region}
          personas={personas}
          selectedPersona={personaId}
          onSelect={setPersonaId}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
      {!showAbout && step === 3 && region && persona && report && (
        <StepReport
          region={region}
          persona={persona}
          report={report}
          onBack={() => setStep(2)}
          onRestart={() => { setStep(1); setRegionId(null); setPersonaId(null); }}
          onOpenAbout={openAbout}
        />
      )}
    </Shell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
