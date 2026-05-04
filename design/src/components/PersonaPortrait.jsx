/* global React */

function PersonaPortrait({ emoji, role, selected }) {
  return (
    <div className="pc-portrait">
      <span aria-hidden>{emoji}</span>
    </div>
  );
}

window.PersonaPortrait = PersonaPortrait;
