 import React from "react";

function Templates({ onClose, onUseTemplate }) {
  const templates = [
    {
      id: 1,
      icon: "🚗",
      title: "Vehicle Accident",
      description:
        "Quickly report a vehicle accident with incident and damage details."
    },
    {
      id: 2,
      icon: "💥",
      title: "Vehicle Damage",
      description:
        "Report vehicle damage caused by collision or other incidents."
    },
    {
      id: 3,
      icon: "🛡️",
      title: "Insurance Claim",
      description:
        "Start a complete insurance claim using the standard claim form."
    }
  ];

  return (
    <div className="templates-page">

      <div className="templates-header">

        <div>
          <h2>Claim Templates</h2>

          <p>
            Choose a template to quickly start your
            insurance claim.
          </p>
        </div>

        <button
          type="button"
          className="templates-close-button"
          onClick={onClose}
        >
          ✕
        </button>

      </div>

      <div className="templates-grid">

        {templates.map((template) => (
          <div
            className="template-card"
            key={template.id}
          >

            <div className="template-icon">
              {template.icon}
            </div>

            <h3>
              {template.title}
            </h3>

            <p>
              {template.description}
            </p>

            <button
              type="button"
              className="template-use-button"
              onClick={() => onUseTemplate(template)}
            >
              Use Template →
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Templates;