import React from "react";

export default function MultiSelectCheckbox({ options, selected, setSelected, label }) {
  function handleChange(e) {
    const value = e.target.value;
    if (e.target.checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter(v => v !== value));
    }
  }
  return (
    <div style={{ marginLeft: 10, minWidth: 220, background: '#f8f9fa', borderRadius: 6, padding: '8px 12px', border: '1px solid #7cb0ff', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>}
      {options.map(option => (
        <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#333', cursor: 'pointer' }}>
          <input
            type="checkbox"
            value={option}
            checked={selected.includes(option)}
            onChange={handleChange}
            style={{ accentColor: '#7cb0ff', width: 16, height: 16 }}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
