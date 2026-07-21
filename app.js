const { useState, useEffect } = React;

const TYPE_COLORS = {
  "Cross-sector": { bg: "#E8F0FE", text: "#1A3A6B", border: "#93B4EC", dot: "#4A7FD4" },
};

const SECTORS = ["All", "ET/AIS", "Commercial Excellence", "Operations"];

const PRODUCTS = [
  { id: 11, name: "AI Transformation Orchestration", initiativeType: "Cross-sector", capability: "ET/AIS", team: "TBD", targetClients: "TBD", description: "Clients need a clear approach to orchest[...]
  { id: 3, name: "Digital Thread & Data Fabric", initiativeType: "Cross-sector", capability: "ET/AIS", team: "Mike Coxon, Matthew Leybold, Phil Schefter", targetClients: "Boeing, Ford, GE Aerospac[...]
  { id: 4, name: "Process Modernization", initiativeType: "Cross-sector", capability: "ET/AIS", team: "Melchior Bryant, Florian Müller, Andrew Mintz", targetClients: "A&D (AMER), Machinery/auto s[...]
  { id: 2, name: "AI in Commercial Excellence", initiativeType: "Cross-sector", capability: "CE", team: "Dave Burns, Emily Kasavana, Kumar", targetClients: "Ball, Leviton, Machinery Co", descripti[...]
  { id: 12, name: "AI-Enabled Planning + Diagnostic Options", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "TBD", description: "Clients need AI-enabled planning a[...]
  { id: 8, name: "Design-to-X (D2X)", initiativeType: "Cross-sector", capability: "Ops", team: "Phillip Roberts", targetClients: "Schneider, TBD", description: "Clients need product redesign for c[...]
  { id: 5, name: "Engineering Efficiency", initiativeType: "Cross-sector", capability: "Ops", team: "Blaine Pellicore, Bill Radzevich, Jess Port", targetClients: "Babcock, Boeing, Emerson, GE Aero[...]
  { id: 1, name: "Industrial Strategy", initiativeType: "Cross-sector", capability: "Ops", team: "Jim Wininger, Andy Capanyola", targetClients: "GE Aerospace, GE Vernova, Toro", description: "End-[...]
  { id: 10, name: "Integrated Services Growth Accelerator", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "JCI", description: "Clients need to expand services marg[...]
  { id: 13, name: "Plant Flow and OEE Improvements", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "TBD", description: "Clients need to improve plant flow and over[...]
  { id: 9, name: "Procurement of the Future / AI-Enabled Procurement", initiativeType: "Cross-sector", capability: "Ops", team: "Thomas Lagner, Dominik Foucar", targetClients: "Auto OEMs and T1 su[...]
  { id: 7, name: "Program Performance Improvement 2.0", initiativeType: "Cross-sector", capability: "Ops", team: "Jim Harris, Blaine Pellicore, Kat Kajzer-Hughes, Jess Port", targetClients: "Babco[...]
  { id: 14, name: "Robotics and Physical Automation", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "TBD", description: "Clients need a clear strategy for deployin[...]
  { id: 6, name: "SC Planning / Network (Palantir)", initiativeType: "Cross-sector", capability: "Ops", team: "John Plaisted, TBD", targetClients: "Mars, Parts Town", description: "Clients need be[...]
];

const SECTOR_CARDS = [
  { id: "s1", name: "Aerospace & Defense", products: [
    { id: "s1p1", name: "Defense: Compute Power", type: "Edgy Sector POV", description: "Provocative POV on the role of compute power in defense — designed as a commercial hook for senior A&D cl[...]
    { id: "s1p2", name: "Airlines / A&D: Iran POV", type: "Edgy Sector POV", description: "Timely POV on the implications of Iran-related developments for Airlines and A&D clients.", sageTriggers:[...]
  ]},
  { id: "s2", name: "Airlines", products: [
    { id: "s2p1", name: "Airline Demand / Planning Model", type: "Sector-Specific Initiative", description: "Clients need better demand forecasting and network planning — but today Bain lacks a [...]
    { id: "s2p2", name: "Airlines / A&D: Iran POV", type: "Edgy Sector POV", description: "Timely POV on the implications of Iran-related developments for Airlines and A&D clients.", sageTriggers:[...]
  ]},
  { id: "s3", name: "Automotive & Mobility", products: [
    { id: "s3p1", name: "B2C Artemis (Auto)", type: "Sector-Specific Initiative", description: "Sector-specific initiative targeting B2C automotive clients.", sageTriggers: ["Auto OEM or dealer wi[...]
    { id: "s3p2", name: "Auto: 10 Hard Truths", type: "Edgy Sector POV", description: "Provocative industry POV on the hard truths facing the automotive sector.", sageTriggers: ["Pitching to auto [...]
    { id: "s3p3", name: "Auto R&D Benchmark", type: "Sector-Specific Initiative", description: "Benchmark of R&D efficiency and effectiveness across auto OEMs.", sageTriggers: ["Client benchmarkin[...]
    { id: "s3p4", name: "Auto Customer Survey", type: "Sector-Specific Initiative", description: "Proprietary consumer survey tracking auto buying behaviour, EV intent, and digital/dealer experien[...]
  ]},
  { id: "s4", name: "B2B Services", products: [] },
  { id: "s5", name: "Building Products", products: [
    { id: "s5p1", name: "BP: Provocations", type: "Edgy Sector POV", description: "A set of provocative POVs designed to challenge Building Products sector clients.", sageTriggers: ["Need a bold c[...]
  ]},
  { id: "s6", name: "Construction & Real Estate", products: [] },
  { id: "s7", name: "Logistics & Transport", products: [] },
  { id: "s8", name: "Machinery", products: [
    { id: "s8p1", name: "Industrial Automation Strategy", type: "Sector-Specific Initiative", description: "Market and strategy materials on industrial automation & robotics for machinery OEMs.", [...]
    { id: "s8p2", name: "Machinery: Provocations", type: "Edgy Sector POV", description: "A set of provocative POVs designed to challenge Machinery sector clients.", sageTriggers: ["Need a bold co[...]
  ]},
  { id: "s9", name: "Metals", products: [] },
  { id: "s10", name: "Paper & Packaging", products: [] },
];

const OPPORTUNITY_TYPES = ["Proposal hook","Active case","Client conversation","Research request","Sector push","BD lead"];

// ========== BACKEND API CALLS ==========
const API_BASE_URL = 'http://localhost:3001/api';

async function fetchFromBackend() {
  try {
    const res = await fetch(`${API_BASE_URL}/data`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return { data: json.data, sha: json.sha };
  } catch (e) {
    console.error('Fetch error:', e);
    return null;
  }
}

async function saveToBackend(data, sha) {
  try {
    const res = await fetch(`${API_BASE_URL}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, sha })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.sha;
  } catch (e) {
    console.error('Save error:', e);
    return null;
  }
}

// Isolated NoteForm - manages own state so typing never causes parent re-render
function NoteForm({ onSubmit }) {
  const [author, setAuthor] = React.useState("");
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState(() => {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
  });
  const canSubmit = author.trim() && text.trim();
  return React.createElement("div", { style:{padding:"0 12px 10px"}, onClick: e => e.stopPropagation() },
    React.createElement("input", { placeholder:"Your name", value:author, onChange:e=>setAuthor(e.target.value), onClick:e=>e.stopPropagation(), style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px so[...]
    React.createElement("input", { type:"date", value:date, onChange:e=>setDate(e.target.value), onClick:e=>e.stopPropagation(), style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px so[...]
    React.createElement("textarea", { placeholder:"Note on CD support, case application, pattern seen, or gap to flag…", value:text, onChange:e=>setText(e.target.value), onClick:e=>e.stopPropaga[...]
    React.createElement("div", { style:{display:"flex",justifyContent:"flex-end"} },
      React.createElement("button", { onClick:e=>{e.stopPropagation();if(!canSubmit)return;onSubmit({author:author.trim(),text:text.trim(),date});setAuthor("");setText("");}, disabled:!canSubmit, [...]
    )
  );
}

// Isolated NoteForm for sector products
function SectorNoteForm({ onSubmit }) {
  const [author, setAuthor] = React.useState("");
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState(() => {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
  });
  const canSubmit = author.trim() && text.trim();
  return React.createElement("div", { style:{background:"#F5F2EE",borderRadius:6,padding:"9px 10px",border:"1px solid #EDE8E0"} },
    React.createElement("div",{style:{fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#3D3730",fontFamily:"Calibri, sans-serif",marginBottom:7}}, "Add a note"[...]
    React.createElement("input", {placeholder:"Your name",value:author,onChange:e=>setAuthor(e.target.value),style:{width:"100%",padding:"5px 8px",borderRadius:4,border:"1px solid #D8D0C4",fontSiz[...]
    React.createElement("input", {type:"date",value:date,onChange:e=>setDate(e.target.value),onClick:e=>e.stopPropagation(),style:{width:"100%",padding:"5px 8px",borderRadius:4,border:"1px solid #[...]
    React.createElement("textarea", {placeholder:"Note on CD support, case application, pattern seen, or gap to flag…",value:text,onChange:e=>setText(e.target.value),rows:2,style:{width:"100%",p[...]
    React.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},
      React.createElement("button",{onClick:e=>{e.stopPropagation();if(!canSubmit)return;onSubmit({author:author.trim(),text:text.trim(),date});setAuthor("");setText("");},disabled:!canSubmit,styl[...]
    )
  );
}

function App({ sharedEntries, setSharedEntries, sharedExtraMaterials, setSharedExtraMaterials, sharedKmNotes, setSharedKmNotes, sharedCardEdits, setSharedCardEdits }) {
  const [_entries, _setEntries] = useState({});
  const [_extraMaterials, _setExtraMaterials] = useState({});
  const entries = sharedEntries !== undefined ? sharedEntries : _entries;
  const setEntries = sharedEntries !== undefined ? setSharedEntries : _setEntries;
  const extraMaterials = sharedExtraMaterials !== undefined ? sharedExtraMaterials : _extraMaterials;
  const setExtraMaterials = sharedExtraMaterials !== undefined ? setSharedExtraMaterials : _setExtraMaterials;
  const [materialForm, setMaterialForm] = useState({});
  const [_kmNotes, _setKmNotes] = useState({});
  const [kmNoteForm, setKmNoteForm] = useState({});
  const kmNotes = sharedKmNotes !== undefined ? sharedKmNotes : _kmNotes;
  const setKmNotes = sharedKmNotes !== undefined ? setSharedKmNotes : _setKmNotes;
  const [filterSector, setFilterSector] = useState("All");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [expandedSector, setExpandedSector] = useState(null);
  const [expandedSectorProduct, setExpandedSectorProduct] = useState(null);
  const [kmNotesOpen, setKmNotesOpen] = useState({});
  const [irisOpen, setIrisOpen] = useState({});
  const [productDetailsOpen, setProductDetailsOpen] = useState({});
  const [suggestOpen, setSuggestOpen] = useState({});
  const [descriptionOpen, setDescriptionOpen] = useState({});
  const [addNoteOpen, setAddNoteOpen] = useState({});
  const [editTriggersOpen, setEditTriggersOpen] = useState({});
  const [editDescriptionOpen, setEditDescriptionOpen] = useState({});
  const [editCardOpen, setEditCardOpen] = useState({});
  const [addLinkOpen, setAddLinkOpen] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({ client: "", caseCode: "", opportunityType: "", notes: "", partner: "", date: today() });
  const [searchTerm, setSearchTerm] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const [dragItem, setDragItem] = useState(null);
  const [dragOverCat, setDragOverCat] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [_cardEdits, _setCardEdits] = useState({});
  const cardEdits = sharedCardEdits !== undefined ? sharedCardEdits : _cardEdits;
  const setCardEdits = sharedCardEdits !== undefined ? setSharedCardEdits : _setCardEdits;
  const [sharedBanner, setSharedBanner] = useState(true);

  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  useEffect(() => {
    const load = () => {
      try { const v = localStorage.getItem("ams-entries"); if (v) setEntries(JSON.parse(v)); } catch {}
      try { const v = localStorage.getItem("ams-extraMaterials"); if (v) setExtraMaterials(JSON.parse(v)); } catch {}
      try { const v = localStorage.getItem("ams-kmNotes"); if (v) setKmNotes(JSON.parse(v)); } catch {}
      try { const v = localStorage.getItem("ams-cardEdits"); if (v) setCardEdits(JSON.parse(v)); } catch {}
      setStorageReady(true);
    };
    load();
  }, []);

  // Storage handled by AppWrapper GitHub sync

  const getField = (product, field) => {
    if (cardEdits[product.id] && cardEdits[product.id][field] !== undefined) return cardEdits[product.id][field];
    if (field === "amsExpert") return "";
    return product[field];
  };

  const updateField = (productId, field, value) => {
    setCardEdits(prev => ({ ...prev, [productId]: { ...(prev[productId] || {}), [field]: value } }));
  };

  const filtered = PRODUCTS.filter(p => {
    const matchSector = filterSector === "All" ||
      (filterSector === "Commercial Excellence" && p.capability === "CE") ||
      (filterSector === "Operations" && p.capability === "Ops") ||
      p.capability === filterSector;
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSector && matchSearch;
  });

  const openModal = (product, e) => {
    e.stopPropagation();
    setActiveModal(product);
    setFormData({ client: "", caseCode: "", opportunityType: "", notes: "", partner: "", date: today() });
  };

  const saveEntry = () => {
    if (!formData.client || !formData.opportunityType) return;
    const updated = { ...entries };
    if (!updated[activeModal.id]) updated[activeModal.id] = [];
    updated[activeModal.id] = [{ ...formData, id: Date.now() }, ...updated[activeModal.id]];
    setEntries(updated);
    setActiveModal(null);
  };

  const deleteEntry = (productId, entryId) => {
    const updated = { ...entries };
    updated[productId] = (updated[productId] || []).filter(e => e.id !== entryId);
    setEntries(updated);
  };

  const tc = TYPE_COLORS["Cross-sector"];

  // ── RENDER ──────────────────────────────────────────────────────────
  return React.createElement("div", { style: { fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#F7F5F1", color: "#1A1A1A" } },
    React.createElement("div", { style: { background: "#1C2B3A", color: "#fff", padding: "28px 40px 22px" } },
      React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 26, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A9AB5", marginBottom: 7, fontFamily: "Calibri, sans-serif" } }, "AMS[...]
            React.createElement("h1", { style: { margin: 0, fontSize: 26, fontWeight: 700, fontFamily: "Calibri, sans-serif" } }, "AMS Product Board Opportunity Tracker")
          )
        )
      )
    )
  );
}

function AppWrapper() {
  const [syncing, setSyncing] = React.useState(false);
  const [lastSync, setLastSync] = React.useState(null);
  const [syncError, setSyncError] = React.useState(null);
  const [sha, setSha] = React.useState(null);
  const shaRef = React.useRef(null);
  const [entries, setEntries] = React.useState({});
  const [extraMaterials, setExtraMaterials] = React.useState({});
  const [kmNotes, setKmNotes] = React.useState({});
  const [cardEdits, setCardEdits] = React.useState({});
  const [dataLoaded, setDataLoaded] = React.useState(false);

  const entriesRef = React.useRef({});
  const extraMaterialsRef = React.useRef({});
  const kmNotesRef = React.useRef({});
  const cardEditsRef = React.useRef({});
  React.useEffect(() => { entriesRef.current = entries; }, [entries]);
  React.useEffect(() => { extraMaterialsRef.current = extraMaterials; }, [extraMaterials]);
  React.useEffect(() => { kmNotesRef.current = kmNotes; }, [kmNotes]);
  React.useEffect(() => { cardEditsRef.current = cardEdits; }, [cardEdits]);

  const isSavingRef = React.useRef(false);

  const loadFromBackend = React.useCallback(async () => {
    if (isSavingRef.current) return;
    setSyncing(true);
    setSyncError(null);
    const result = await fetchFromBackend();
    setSyncing(false);
    if (result) {
      const d = result.data;
      if (d.entries) setEntries(d.entries);
      if (d.extraMaterials) setExtraMaterials(d.extraMaterials);
      if (d.kmNotes) setKmNotes(d.kmNotes);
      if (d.cardEdits) setCardEdits(d.cardEdits);
      shaRef.current = result.sha;
      setSha(result.sha);
      setLastSync(new Date());
    } else {
      setSyncError('Could not connect to backend. Is the server running on http://localhost:3001?');
    }
    setDataLoaded(true);
  }, []);

  React.useEffect(() => { loadFromBackend(); }, []);
  React.useEffect(() => {
    const interval = setInterval(loadFromBackend, 30000);
    return () => clearInterval(interval);
  }, [loadFromBackend]);

  const pendingRef = React.useRef(null);
  const saveToBackendDebounced = React.useCallback(async (type, value) => {
    if (pendingRef.current) clearTimeout(pendingRef.current);
    pendingRef.current = setTimeout(async () => {
      isSavingRef.current = true;
      setSyncing(true);
      setSyncError(null);
      const snap = {
        entries: entriesRef.current,
        extraMaterials: extraMaterialsRef.current,
        kmNotes: kmNotesRef.current,
        cardEdits: cardEditsRef.current
      };
      snap[type] = value;
      const newSha = await saveToBackend(snap, shaRef.current);
      setSyncing(false);
      isSavingRef.current = false;
      if (newSha) {
        shaRef.current = newSha;
        setSha(newSha);
        setLastSync(new Date());
      } else {
        setSyncError('Failed to save — check that the backend is running');
      }
    }, 800);
  }, []);

  if (!dataLoaded) return React.createElement("div", { style: { minHeight: "100vh", background: "#1C2B3A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Calibri, sans-serif", color: "#fff" } }, "Loading...");

  return React.createElement("div", null,
    syncError && React.createElement("div", { style: { background: "#ffebee", color: "#c62828", padding: "12px 20px", textAlign: "center", fontSize: 13 } }, syncError),
    React.createElement(App, {
      sharedEntries: entries,
      setSharedEntries: v => { setEntries(v); setTimeout(() => saveToBackendDebounced("entries", v), 0); },
      sharedExtraMaterials: extraMaterials,
      setSharedExtraMaterials: v => { setExtraMaterials(v); setTimeout(() => saveToBackendDebounced("extraMaterials", v), 0); },
      sharedKmNotes: kmNotes,
      setSharedKmNotes: v => { setKmNotes(v); setTimeout(() => saveToBackendDebounced("kmNotes", v), 0); },
      sharedCardEdits: cardEdits,
      setSharedCardEdits: v => { setCardEdits(v); setTimeout(() => saveToBackendDebounced("cardEdits", v), 0); },
    })
  );
}

ReactDOM.render(React.createElement(AppWrapper), document.getElementById("root"));
