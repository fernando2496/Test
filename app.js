const { useState, useEffect } = React;

const TYPE_COLORS = {
  "Cross-sector": { bg: "#E8F0FE", text: "#1A3A6B", border: "#93B4EC", dot: "#4A7FD4" },
};

const SECTORS = ["All", "ET/AIS", "Commercial Excellence", "Operations"];

const PRODUCTS = [
  { id: 11, name: "AI Transformation Orchestration", initiativeType: "Cross-sector", capability: "ET/AIS", team: "TBD", targetClients: "TBD", description: "Clients need a clear approach to orchestrating AI transformation at scale — but today there is no dedicated AMS offering that spans strategy through execution. This product defines how to sequence, govern, and deliver AI transformation across the enterprise.", sageTriggers: ["Client planning an enterprise-wide AI transformation","AI strategy needs to translate into execution roadmap","Governance or operating model for AI rollout being designed"], experts: "TBD", sector: "Cross-sector", vectorComponent: "TBD", sageMaterials: [], capabilitySolutions: [] },
  { id: 3, name: "Digital Thread & Data Fabric", initiativeType: "Cross-sector", capability: "ET/AIS", team: "Mike Coxon, Matthew Leybold, Phil Schefter", targetClients: "Boeing, Ford, GE Aerospace", description: "AMS Digital Thread & Data Fabric product defining architecture, design decisions, and value-measurement for cross-lifecycle AI and decision intelligence.|||Definitions and roles of Digital Thread vs. Data Fabric underpinning AI at scale|||Key decisions & failure modes: use-case/value portfolio, in vs. out of core systems, centralized vs. federated ontology, operating model & sourcing|||A&D Co data-fabric strategy case with benchmark architectures and vendor patterns|||AMS-specific AI/Digital Thread/Data Fabric framework linking architecture to functional transformations", sageTriggers: ["A client is (re)designing PLM/MES/MOM/ERP/data architecture to be AI-ready","Work focuses on cross-lifecycle threads (design-to-service, supplier-to-repair, engineering-to-manufacturing)","Teams are debating data-fabric, ontology, or vendor strategy"], experts: "Mike Coxon, Matthew Leybold", sector: "Cross-sector", vectorComponent: "Fully tech focused", sageMaterials: [{ label: "AMS Data and AI Architecture Modernization – 80% Proposal", url: "https://iris.bain.com/content-viewer/RXHU9N", category: "Selling Support" },{ label: "AMS Data and AI Architecture Modernization - Executive 101", url: "https://iris.bain.com/content-viewer/WMOFX3", category: "Selling Support" },{ label: "AMS Data and AI Architecture Modernization - Playbook", url: "https://iris.bain.com/content-viewer/96UK7J", category: "Selling Support" },{ label: "AMS Data and AI Architecture Modernization – 1st Meeting Materials", url: "https://iris.bain.com/content-viewer/ASVWVN", category: "Selling Support" },{ label: "A&D Co – AI, Data Fabric & Digital Thread Architecture and Vendor Strategy", url: "https://iris.bain.com/content-viewer/e08b4389-db46-4c82-a095-1c6fe8eaef8a", category: "Case Examples" }], capabilitySolutions: ["AI Platform Architecture"] },
  { id: 4, name: "Process Modernization", initiativeType: "Cross-sector", capability: "ET/AIS", team: "Melchior Bryant, Florian Müller, Andrew Mintz", targetClients: "A&D (AMER), Machinery/auto suppliers (EMEA)", description: "Tech-enabled Process Modernization playbook for AMS redesigning processes and embedding automation/AI to transform operations and SG&A.|||Pathway and entry points: client pain points, value-at-stake examples|||Case library across ops and back office (GenAI RfQ, digital manufacturing, airline customer support, finance & G&A modernization)|||4-phase methodology: current-state mapping → value mapping → AI/automation design → pilots & scale-up|||Guidance on tools/partners (process mining, BPM, Palantir, Celonis, Ashling) and workflow integration", sageTriggers: ["Targeting cycle-time, cost, or quality improvement in processes (S&OP, RfQ, CS, finance, HR)","The storyline is don't just layer AI on broken processes but full redesign","A client asks where to start with AI in operations or SG&A and needs process examples"], experts: "Melchior Bryant, Stephen Creasy, Christian Dewitz, Guido Vetter", sector: "Cross-sector", vectorComponent: "Embedded AI use cases in broader process re-design", sageMaterials: [{ label: "Unlocking the Full Potential of AI-Enabled Process Transformation Selling Support", url: "https://iris.bain.com/content-viewer/S6HICS", category: "Selling Support" }], capabilitySolutions: [] },
  { id: 2, name: "AI in Commercial Excellence", initiativeType: "Cross-sector", capability: "CE", team: "Dave Burns, Emily Kasavana, Kumar", targetClients: "Ball, Leviton, Machinery Co", description: "POV and toolkit for achieving real outcomes from AI in Commercial Excellence vs. pilots that don't scale.|||'Hard truths' on why AI in GTM fails and fixing data, workflows, and RevTech stack|||CE-specific AI use-case library covering pricing, lead scoring, churn, sales co-pilots, service/chatbots, and post-purchase CX|||Meeting-1 storyline, hook email, and client conversation archetypes|||Links to CE case-study pack, demos, and CE VendorMap GPT", sageTriggers: ["Seeking topline/GTM levers (growth, pricing, churn, sales productivity)","A client is investing in CE tech/AI but not seeing ROI","A team needs AI-in-CE use cases and case studies for proposals or meetings"], experts: "Dave Burns, Alex Benjamin, Sanjin Bicanic", sector: "Cross-sector", vectorComponent: "Fully tech focused", sageMaterials: [{ label: "AI in Commercial Excellence - Meeting 1", url: "https://iris.bain.com/content-viewer/Y332FM", category: "Selling Support" }], capabilitySolutions: [] },
  { id: 12, name: "AI-Enabled Planning + Diagnostic Options", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "TBD", description: "Clients need AI-enabled planning and diagnostic capabilities to improve decision-making across operations — but today there is no dedicated AMS offering in this space. This product will define the approach and use cases for AI-assisted planning and operational diagnostics.", sageTriggers: ["Client needs AI-enabled planning or scheduling capabilities","Operational diagnostics or performance visibility in scope","AI use cases in S&OP, capacity planning, or ops diagnostics being discussed"], experts: "TBD", sector: "Cross-sector", vectorComponent: "TBD", sageMaterials: [], capabilitySolutions: [] },
  { id: 8, name: "Design-to-X (D2X)", initiativeType: "Cross-sector", capability: "Ops", team: "Phillip Roberts", targetClients: "Schneider, TBD", description: "Clients need product redesign for cost, value, and sustainability — but today's offering lacks the next level of depth, sector tailoring, and internal teardown capabilities. This product builds out generative design capability and teardown software to deliver more rigorous, sector-specific design-to-cost and design-to-value work.", sageTriggers: ["Product cost-out or value engineering on the agenda","Sustainability-driven product redesign","Generative design or teardown framing in scope"], experts: "Phillip Roberts", sector: "Cross-sector", vectorComponent: "Generative design capability, teardown software", sageMaterials: [], capabilitySolutions: [] },
  { id: 5, name: "Engineering Efficiency", initiativeType: "Cross-sector", capability: "Ops", team: "Blaine Pellicore, Bill Radzevich, Jess Port", targetClients: "Babcock, Boeing, Emerson, GE Aerospace, GE Vernova", description: "Clients need new ways to reduce cost, increase productivity, and address talent shortages in engineering — but today's solutions are not sufficiently digital or AI-forward, and partnerships are underdeveloped. This product builds more AI-forward solutions and partnerships (including AWS on R&D architecture) to deliver measurable engineering efficiency gains.", sageTriggers: ["Client facing engineering cost pressure or talent shortages","R&D architecture or AI use cases in engineering being discussed","ER&D Full Potential framing in a proposal"], experts: "Blaine Pellicore, Bill Radzevich", sector: "Cross-sector", vectorComponent: "AWS partnership on R&D architecture; AI use cases", sageMaterials: [], capabilitySolutions: [] },
  { id: 1, name: "Industrial Strategy", initiativeType: "Cross-sector", capability: "Ops", team: "Jim Wininger, Andy Capanyola", targetClients: "GE Aerospace, GE Vernova, Toro", description: "End-to-end Industrial Strategy framework linking enterprise/BU strategy, macro scenarios, and competitive position to supply-chain and operations decisions.|||Elevating supply chain from cost center to growth/resilience lever|||4-level framework: enterprise strategy → SC choices → execution pillars → enabling tech/AI|||Value-at-stake sizing, success/failure examples, and first-mover benefits|||Engagement approach with modules and workplans", sageTriggers: ["Reframing Ops/supply chain as part of enterprise or BU strategy","A proposal needs exec-level narrative on SC as growth/resilience lever","A client is making major footprint/network/capex or AI-in-ops choices"], experts: "Andy Capanyola, Shafik Wazzan", sector: "Cross-sector", vectorComponent: "Clear view on AI and digital as enablers", sageMaterials: [{ label: "Operations in AMS – Industrial Strategy POV", url: "https://iris.bain.com/content-viewer/1OXG7F", category: "POVs" }], capabilitySolutions: ["Operations Reinvention","Supply Chain","Manufacturing Excellence","Procurement","Engineering & R&D"] },
  { id: 10, name: "Integrated Services Growth Accelerator", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "JCI", description: "Clients need to expand services margins by pulling all levers and bringing in technology and AI — but today's strategy materials and case studies are not sufficiently refined or up to date. This product builds a current, tech-enabled services growth accelerator with a clear AI angle.", sageTriggers: ["Client seeking to expand or grow a services business","Services margin or profitability improvement in scope","Tech/AI angle on aftermarket or services strategy"], experts: "TBD", sector: "Cross-sector", vectorComponent: "Tech/AI angle", sageMaterials: [], capabilitySolutions: [] },
  { id: 13, name: "Plant Flow and OEE Improvements", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "TBD", description: "Clients need to improve plant flow and overall equipment effectiveness (OEE) — but today there is no dedicated AMS product addressing this opportunity at scale. This product will define the methodology and tools for delivering measurable OEE and throughput improvements.", sageTriggers: ["Client seeking plant productivity or throughput improvements","OEE or operational efficiency transformation in scope","Manufacturing footprint or capacity optimisation being discussed"], experts: "TBD", sector: "Cross-sector", vectorComponent: "TBD", sageMaterials: [], capabilitySolutions: [] },
  { id: 9, name: "Procurement of the Future / AI-Enabled Procurement", initiativeType: "Cross-sector", capability: "Ops", team: "Thomas Lagner, Dominik Foucar", targetClients: "Auto OEMs and T1 suppliers, Bosch", description: "Clients need a holistic perspective on the procurement org of the future (2030–35) and accelerated value delivery in direct material spend — but today there is no future-back perspective on procurement operating model, tools, and talent, nor deployment-ready AI solutions. This product addresses both: the CPO strategic agenda and AI-enabled savings identification.", sageTriggers: ["Client seeking procurement savings via AI or agentic AI discussions","Future-back procurement operating model framing","Direct material spend optimization or sourcing transformation"], experts: "Thomas Lagner, Dominik Foucar", sector: "Cross-sector", vectorComponent: "AI solutions for savings lever definition; agentic AI", sageMaterials: [], capabilitySolutions: [] },
  { id: 7, name: "Program Performance Improvement 2.0", initiativeType: "Cross-sector", capability: "Ops", team: "Jim Harris, Blaine Pellicore, Kat Kajzer-Hughes, Jess Port", targetClients: "Babcock, Lockheed, major A&D clients", description: "Clients need cross-functional support for troubled programs, but today digital tools (e.g. scheduling) are missing and selling materials need updating. This product codifies insights from Lockheed and Babcock cases into the next generation of commercial materials and explores digital tooling for large program oversight.", sageTriggers: ["Client managing troubled or at-risk programs in A&D","Cross-functional program recovery with scheduling complexity","Digital tools for large program oversight discussed"], experts: "Jim Harris, Blaine Pellicore", sector: "Cross-sector", vectorComponent: "Digital tools", sageMaterials: [], capabilitySolutions: [] },
  { id: 14, name: "Robotics and Physical Automation", initiativeType: "Cross-sector", capability: "Ops", team: "TBD", targetClients: "TBD", description: "Clients need a clear strategy for deploying robotics and physical automation to reduce cost and address labour shortages — but today there is no cross-sector AMS product defining where and how to invest. This product will provide the framework for robotics and physical automation strategy and deployment.", sageTriggers: ["Client exploring robotics or physical automation investment","Labour cost reduction or talent shortage driving automation discussion","Manufacturing or warehouse automation strategy in scope"], experts: "TBD", sector: "Cross-sector", vectorComponent: "TBD", sageMaterials: [], capabilitySolutions: [] },
  { id: 6, name: "SC Planning / Network (Palantir)", initiativeType: "Cross-sector", capability: "Ops", team: "John Plaisted, TBD", targetClients: "Mars, Parts Town", description: "Clients need better decision-making in planning and scheduling, but today Bain lacks digital credibility and delivery that spans beyond point solutions. This product defines 1-2 AMS use cases at the intersection of client demand and Palantir capabilities, with potential for a pre-configured Palantir offering.", sageTriggers: ["Client needs digital credibility in supply-chain planning or scheduling","Palantir use case discussions on a case","S&OP or network planning transformation in scope"], experts: "John Plaisted", sector: "Cross-sector", vectorComponent: "Potential for Palantir pre-configured offering", sageMaterials: [], capabilitySolutions: [] },
];

const SECTOR_CARDS = [
  { id: "s1", name: "Aerospace & Defense", products: [
    { id: "s1p1", name: "Defense: Compute Power", type: "Edgy Sector POV", description: "Provocative POV on the role of compute power in defense — designed as a commercial hook for senior A&D client conversations.", sageTriggers: ["Pitching to A&D or defense client leadership","Client grappling with technology modernisation in defense","Need a bold conversation starter for A&D BD"], experts: "", targetClients: "", sageMaterials: [] },
    { id: "s1p2", name: "Airlines / A&D: Iran POV", type: "Edgy Sector POV", description: "Timely POV on the implications of Iran-related developments for Airlines and A&D clients.", sageTriggers: ["A&D or airline client affected by geopolitical developments","Need a differentiated POV on sector disruption","BD conversation requiring current geopolitical context"], experts: "", targetClients: "A&D, Airlines", sageMaterials: [] },
  ]},
  { id: "s2", name: "Airlines", products: [
    { id: "s2p1", name: "Airline Demand / Planning Model", type: "Sector-Specific Initiative", description: "Clients need better demand forecasting and network planning — but today Bain lacks a proprietary analytical model to anchor these conversations.", sageTriggers: ["Airline client with demand forecasting or network planning challenge","Revenue management or capacity planning transformation in scope","Commercial aero client needing demand context"], experts: "", targetClients: "Airlines", sageMaterials: [] },
    { id: "s2p2", name: "Airlines / A&D: Iran POV", type: "Edgy Sector POV", description: "Timely POV on the implications of Iran-related developments for Airlines and A&D clients.", sageTriggers: ["Airline or A&D client affected by geopolitical developments","Need a differentiated POV on sector disruption","BD conversation requiring current geopolitical context"], experts: "", targetClients: "Airlines, A&D", sageMaterials: [] },
  ]},
  { id: "s3", name: "Automotive & Mobility", products: [
    { id: "s3p1", name: "B2C Artemis (Auto)", type: "Sector-Specific Initiative", description: "Sector-specific initiative targeting B2C automotive clients.", sageTriggers: ["Auto OEM or dealer with B2C transformation agenda","Consumer behaviour or EV adoption challenge","D2C or digital channel strategy in Auto"], experts: "", targetClients: "Auto OEMs, dealers", sageMaterials: [] },
    { id: "s3p2", name: "Auto: 10 Hard Truths", type: "Edgy Sector POV", description: "Provocative industry POV on the hard truths facing the automotive sector.", sageTriggers: ["Pitching to auto OEM or T1 supplier leadership","Need a bold conversation starter for Auto BD","Client grappling with sector disruption or strategic uncertainty"], experts: "", targetClients: "Auto OEMs, T1 suppliers", sageMaterials: [] },
    { id: "s3p3", name: "Auto R&D Benchmark", type: "Sector-Specific Initiative", description: "Benchmark of R&D efficiency and effectiveness across auto OEMs.", sageTriggers: ["Client benchmarking their R&D spend or efficiency","ER&D transformation proposal for Auto","Engineering productivity or innovation ROI on the agenda"], experts: "", targetClients: "Auto OEMs", sageMaterials: [] },
    { id: "s3p4", name: "Auto Customer Survey", type: "Sector-Specific Initiative", description: "Proprietary consumer survey tracking auto buying behaviour, EV intent, and digital/dealer experience.", sageTriggers: ["Client discussion on EV adoption or consumer behaviour","Auto CE or marketing transformation","Dealer or D2C channel strategy in scope"], experts: "", targetClients: "Auto OEMs, dealers", sageMaterials: [] },
  ]},
  { id: "s4", name: "B2B Services", products: [] },
  { id: "s5", name: "Building Products", products: [
    { id: "s5p1", name: "BP: Provocations", type: "Edgy Sector POV", description: "A set of provocative POVs designed to challenge Building Products sector clients.", sageTriggers: ["Need a bold conversation starter for BP BD","Client grappling with sector disruption or margin pressure","Pitching to BP leadership"], experts: "", targetClients: "Building Products clients", sageMaterials: [] },
  ]},
  { id: "s6", name: "Construction & Real Estate", products: [] },
  { id: "s7", name: "Logistics & Transport", products: [] },
  { id: "s8", name: "Machinery", products: [
    { id: "s8p1", name: "Industrial Automation Strategy", type: "Sector-Specific Initiative", description: "Market and strategy materials on industrial automation & robotics for machinery OEMs.", sageTriggers: ["A machinery/equipment OEM is exploring robotics or automation adjacencies","A proposal is about automation/robotics market entry, portfolio, or roadmap","A team needs fact base & expert references on robotics for growth or M&A theses"], experts: "Michael Schertler, Scott Duncan, Adrien Bron, Neil Malik, Mike Coxon", targetClients: "Machinery OEMs", sageMaterials: [{ label: "Future of Industrial Automation", url: "https://iris.bain.com/content-viewer/4AH3CH", category: "POVs" }] },
    { id: "s8p2", name: "Machinery: Provocations", type: "Edgy Sector POV", description: "A set of provocative POVs designed to challenge Machinery sector clients.", sageTriggers: ["Need a bold conversation starter for Machinery BD","Client grappling with sector disruption or strategic uncertainty","Pitching to Machinery OEM leadership"], experts: "", targetClients: "Machinery OEMs", sageMaterials: [] },
  ]},
  { id: "s9", name: "Metals", products: [] },
  { id: "s10", name: "Paper & Packaging", products: [] },
];

const OPPORTUNITY_TYPES = ["Proposal hook","Active case","Client conversation","Research request","Sector push","BD lead"];


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
    React.createElement("input", { placeholder:"Your name", value:author, onChange:e=>setAuthor(e.target.value), onClick:e=>e.stopPropagation(), style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px solid #D8D0C4",fontSize:12,fontFamily:"Calibri, sans-serif",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:7} }),
    React.createElement("input", { type:"date", value:date, onChange:e=>setDate(e.target.value), onClick:e=>e.stopPropagation(), style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px solid #D8D0C4",fontSize:12,fontFamily:"Calibri, sans-serif",color:"#5C5448",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:7,cursor:"pointer"} }),
    React.createElement("textarea", { placeholder:"Note on CD support, case application, pattern seen, or gap to flag…", value:text, onChange:e=>setText(e.target.value), onClick:e=>e.stopPropagation(), rows:2, style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px solid #D8D0C4",fontSize:12,fontFamily:"Calibri, sans-serif",background:"#fff",resize:"vertical",boxSizing:"border-box",outline:"none",lineHeight:1.5,marginBottom:7} }),
    React.createElement("div", { style:{display:"flex",justifyContent:"flex-end"} },
      React.createElement("button", { onClick:e=>{e.stopPropagation();if(!canSubmit)return;onSubmit({author:author.trim(),text:text.trim(),date});setAuthor("");setText("");}, disabled:!canSubmit, style:{padding:"5px 14px",borderRadius:5,border:"none",fontSize:12,fontFamily:"Calibri, sans-serif",fontWeight:700,cursor:canSubmit?"pointer":"default",background:canSubmit?"#1C2B3A":"#C0B0A0",color:"#fff"} }, "Add Note")
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
    React.createElement("div", {style:{fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#3D3730",fontFamily:"Calibri, sans-serif",marginBottom:7}}, "Add a note"),
    React.createElement("input", {placeholder:"Your name",value:author,onChange:e=>setAuthor(e.target.value),style:{width:"100%",padding:"5px 8px",borderRadius:4,border:"1px solid #D8D0C4",fontSize:11.5,fontFamily:"Calibri, sans-serif",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:6}}),
    React.createElement("input", {type:"date",value:date,onChange:e=>setDate(e.target.value),onClick:e=>e.stopPropagation(),style:{width:"100%",padding:"5px 8px",borderRadius:4,border:"1px solid #D8D0C4",fontSize:11.5,fontFamily:"Calibri, sans-serif",color:"#5C5448",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:6,cursor:"pointer"}}),
    React.createElement("textarea", {placeholder:"Note on CD support, case application, pattern seen, or gap to flag…",value:text,onChange:e=>setText(e.target.value),rows:2,style:{width:"100%",padding:"5px 8px",borderRadius:4,border:"1px solid #D8D0C4",fontSize:11.5,fontFamily:"Calibri, sans-serif",background:"#fff",resize:"vertical",boxSizing:"border-box",outline:"none",lineHeight:1.5,marginBottom:6}}),
    React.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},
      React.createElement("button",{onClick:e=>{e.stopPropagation();if(!canSubmit)return;onSubmit({author:author.trim(),text:text.trim(),date});setAuthor("");setText("");},disabled:!canSubmit,style:{padding:"4px 12px",borderRadius:4,border:"none",fontSize:11.5,fontFamily:"Calibri, sans-serif",fontWeight:700,cursor:canSubmit?"pointer":"default",background:canSubmit?"#1C2B3A":"#C0B0A0",color:"#fff"}},"Add Note")
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

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return React.createElement("div", { style: { fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#F7F5F1", color: "#1A1A1A" } },



    React.createElement("div", { style: { background: "#1C2B3A", color: "#fff", padding: "28px 40px 22px" } },
      React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto" } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 26, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A9AB5", marginBottom: 7, fontFamily: "Calibri, sans-serif" } }, "AMS Practice · Knowledge Management"),
            React.createElement("h1", { style: { margin: 0, fontSize: 26, fontWeight: 700, fontFamily: "Calibri, sans-serif" } }, "AMS Product Board Opportunity Tracker")
          ),
          React.createElement("div", { style: { display: "flex", gap: 28 } },
            [{ val: PRODUCTS.length, label: "Products" }, { val: Object.values(kmNotes).flat().length, label: "Knowledge Activities" }].map(({ val, label }) =>
              React.createElement("div", { key: label, style: { textAlign: "center" } },
                React.createElement("div", { style: { fontSize: 30, fontWeight: 700, color: "#6BBFFF", lineHeight: 1 } }, val),
                React.createElement("div", { style: { fontSize: 10.5, color: "#7A9AB5", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Calibri, sans-serif", marginTop: 4 } }, label)
              )
            )
          )
        )
      )
    ),

    React.createElement("div", { style: { background: "#243447", padding: "14px 40px" } },
      React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" } },
        React.createElement("input", { placeholder: "Search products…", value: searchTerm, onChange: e => setSearchTerm(e.target.value), style: { padding: "7px 13px", borderRadius: 6, border: "1px solid #3D5166", background: "#1C2B3A", color: "#fff", fontSize: 13, fontFamily: "Calibri, sans-serif", width: 190, outline: "none" } }),
        ...SECTORS.map(s => {
          const active = filterSector === s;
          const fc = { "All": { active: { bg: "#C4A882", border: "#C4A882", text: "#3D2E1A" }, inactive: { border: "#3D5166", text: "#A8BFCF" } }, "ET/AIS": { active: { bg: "#D9ABC6", border: "#D9ABC6", text: "#4A1A3A" }, inactive: { border: "#3D5166", text: "#A8BFCF" } }, "Commercial Excellence": { active: { bg: "#BBCABA", border: "#BBCABA", text: "#2A3D29" }, inactive: { border: "#3D5166", text: "#A8BFCF" } }, "Operations": { active: { bg: "#A3BCD3", border: "#A3BCD3", text: "#1A3550" }, inactive: { border: "#3D5166", text: "#A8BFCF" } } }[s];
          return React.createElement("button", { key: s, onClick: () => setFilterSector(s), style: { padding: "6px 14px", borderRadius: 20, border: "1px solid", fontSize: 12, cursor: "pointer", fontFamily: "Calibri, sans-serif", background: active ? fc.active.bg : "transparent", borderColor: active ? fc.active.border : fc.inactive.border, color: active ? fc.active.text : fc.inactive.text, fontWeight: active ? 700 : 400 } }, s);
        }),
        React.createElement("div", { style: { width: 1, height: 20, background: "#3D5166" } }),
        React.createElement("button", { onClick: () => document.getElementById("sector-section")?.scrollIntoView({ behavior: "smooth" }), style: { padding: "6px 14px", borderRadius: 20, border: "1px solid #A0674A", fontSize: 12, cursor: "pointer", fontFamily: "Calibri, sans-serif", background: "transparent", color: "#A0674A", fontWeight: 600 } }, "↓ Sector POVs")
      )
    ),

    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "28px 40px 48px" } },

      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28 } },
        React.createElement("div", { style: { flex: 1, height: 2, background: "#4A7FD4", borderRadius: 1 } }),
        React.createElement("div", { style: { textAlign: "center" } },
          React.createElement("div", { style: { fontSize: 18, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1C2B3A", fontFamily: "Calibri, sans-serif", fontWeight: 700, marginBottom: 4 } }, "AMS Cross-Sector Products"),
          React.createElement("h2", { style: { margin: 0, fontSize: 15, fontWeight: 700, color: "#4A7FD4", fontFamily: "Calibri, sans-serif" } }, "Product Innovation Tracker")
        ),
        React.createElement("div", { style: { flex: 1, height: 2, background: "#4A7FD4", borderRadius: 1 } })
      ),

      ...["ET/AIS", "Commercial Excellence", "Operations"].map(capGroup => {
        const groupProducts = filtered.filter(p => capGroup === "Commercial Excellence" ? p.capability === "CE" : capGroup === "Operations" ? p.capability === "Ops" : p.capability === capGroup);
        if (!groupProducts.length) return null;
        const cs = { "ET/AIS": { bg: "#D9ABC6", text: "#4A1A3A" }, "Commercial Excellence": { bg: "#BBCABA", text: "#2A3D29" }, "Operations": { bg: "#A3BCD3", text: "#1A3550" } }[capGroup];
        return React.createElement("div", { key: capGroup, style: { marginBottom: 36 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
            React.createElement("span", { style: { fontSize: 16, fontWeight: 700, padding: "3px 12px", borderRadius: 12, background: cs.bg, color: cs.text, fontFamily: "Calibri, sans-serif" } }, capGroup),
            React.createElement("div", { style: { height: 1, flex: 1, background: "#E0D8CF" } }),
            React.createElement("span", { style: { fontSize: 12, color: "#8A7F72", fontFamily: "Calibri, sans-serif" } }, `${groupProducts.length} product${groupProducts.length !== 1 ? "s" : ""}`)
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 } },
            ...groupProducts.map(product => {
              const isExpanded = expandedProduct === product.id;
              const productEntries = entries[product.id] || [];
              const capTagStyles = { "Ops": { bg: "#A3BCD3", text: "#1A3550", border: "#7A9DB8" }, "CE": { bg: "#BBCABA", text: "#2A3D29", border: "#8FA98E" }, "ET/AIS": { bg: "#D9ABC6", text: "#4A1A3A", border: "#C07FA8" } };

              const Section = ({ label, openKey, openState, setOpenState, children }) =>
                React.createElement("div", { style: { background: "#fff", borderTop: "1px solid #C8C0B8" }, onClick: e => e.stopPropagation() },
                  React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px", cursor: "pointer" }, onClick: e => { e.stopPropagation(); setOpenState(prev => ({ ...prev, [openKey]: !prev[openKey] })); } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#1C2B3A", fontFamily: "Calibri, sans-serif" } }, label),
                    React.createElement("span", { style: { fontSize: 14, color: "#A09890" } }, openState[openKey] ? "▲" : "▼")
                  ),
                  openState[openKey] && React.createElement("div", { style: { padding: "0 18px 12px" } }, children)
                );

              return React.createElement("div", { key: product.id, style: { background: "#fff", borderRadius: 10, border: `1px solid ${isExpanded ? tc.border : "#E5DDD4"}`, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", cursor: "pointer" }, onClick: () => setExpandedProduct(isExpanded ? null : product.id) },
                React.createElement("div", { style: { height: 3, background: product.capability === "CE" ? "#BBCABA" : product.capability === "ET/AIS" ? "#D9ABC6" : "#A3BCD3" } }),
                React.createElement("div", { style: { padding: "16px 18px 12px" } },
                  React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 9 } },
                    ...product.capability.split(" / ").map(cap => { const s = capTagStyles[cap.trim()] || { bg: tc.bg, text: tc.text, border: tc.border }; return React.createElement("span", { key: cap, style: { fontSize: 10.5, padding: "2px 8px", borderRadius: 10, background: s.bg, color: s.text, border: `1px solid ${s.border}`, fontFamily: "Calibri, sans-serif", fontWeight: 600 } }, cap.trim()); })
                  ),
                  React.createElement("h3", { style: { margin: 0, fontSize: 17, fontWeight: 700, color: "#1C2B3A", lineHeight: 1.3, fontFamily: "Calibri, sans-serif" } }, product.name)
                ),

                // Description
                React.createElement(Section, { label: "Description", openKey: product.id, openState: descriptionOpen, setOpenState: setDescriptionOpen },
                  (() => { const desc = getField(product, "description") || ""; const parts = desc.split("|||"); return parts.length > 1 ? React.createElement("div", null, React.createElement("p", { style: { margin: "0 0 8px", fontSize: 12.5, color: "#5C5448", lineHeight: 1.55, fontFamily: "Calibri, sans-serif" } }, parts[0]), ...parts.slice(1).map((b,i) => React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 4 } }, React.createElement("span", { style: { color: tc.dot, fontSize: 13, flexShrink: 0 } }, "›"), React.createElement("span", { style: { fontSize: 12, color: "#5C5448", fontFamily: "Calibri, sans-serif", lineHeight: 1.55 } }, b)))) : React.createElement("p", { style: { margin: "0 0 8px", fontSize: 12.5, color: "#5C5448", lineHeight: 1.55, fontFamily: "Calibri, sans-serif" } }, desc); })(),
                  React.createElement("div", { onClick: e => e.stopPropagation(), style: { marginTop: 8 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }, onClick: e => { e.stopPropagation(); setEditDescriptionOpen(prev => ({ ...prev, [product.id]: !prev[product.id] })); setCardEdits(prev => ({ ...prev, [product.id]: { ...(prev[product.id]||{}), descriptionDraft: getField(product,"description") } })); } },
                      React.createElement("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A09890", fontFamily: "Calibri, sans-serif" } }, "Edit"),
                      React.createElement("span", { style: { fontSize: 12, color: "#A09890" } }, editDescriptionOpen[product.id] ? "▲" : "▼")
                    ),
                    editDescriptionOpen[product.id] && React.createElement("div", null,
                      React.createElement("textarea", { value: (cardEdits[product.id]||{}).descriptionDraft !== undefined ? (cardEdits[product.id]||{}).descriptionDraft : getField(product,"description"), onChange: e => setCardEdits(prev => ({ ...prev, [product.id]: { ...(prev[product.id]||{}), descriptionDraft: e.target.value } })), onClick: e => e.stopPropagation(), rows: 4, style: { width: "100%", marginTop: 6, padding: "6px 8px", borderRadius: 5, border: "1px solid #93B4EC", fontSize: 12.5, fontFamily: "Calibri, sans-serif", color: "#5C5448", background: "#FAFAF8", resize: "vertical", boxSizing: "border-box", outline: "none", lineHeight: 1.55 } }),
                      React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 7 } },
                        React.createElement("button", { onClick: e => { e.stopPropagation(); setEditDescriptionOpen(prev => ({ ...prev, [product.id]: false })); }, style: { padding: "4px 12px", borderRadius: 5, border: "1px solid #D8D0C4", background: "#fff", fontSize: 12, fontFamily: "Calibri, sans-serif", color: "#5C5448", cursor: "pointer" } }, "Cancel"),
                        React.createElement("button", { onClick: e => { e.stopPropagation(); const d = (cardEdits[product.id]||{}).descriptionDraft; if (d !== undefined) updateField(product.id,"description",d); setEditDescriptionOpen(prev => ({ ...prev, [product.id]: false })); }, style: { padding: "4px 12px", borderRadius: 5, border: "none", background: "#1C2B3A", fontSize: 12, fontFamily: "Calibri, sans-serif", color: "#fff", fontWeight: 700, cursor: "pointer" } }, "Save")
                      )
                    )
                  )
                ),

                // Suggest When
                React.createElement(Section, { label: "Suggest When", openKey: product.id, openState: suggestOpen, setOpenState: setSuggestOpen },
                  ...(getField(product,"sageTriggers")||product.sageTriggers).map((t,i) => React.createElement("div", { key: i, style: { display: "flex", gap: 7, marginBottom: 4 } }, React.createElement("span", { style: { color: tc.dot, fontSize: 13, flexShrink: 0 } }, "›"), React.createElement("span", { style: { fontSize: 12, color: "#4A453F", fontFamily: "Calibri, sans-serif", lineHeight: 1.4 } }, t))),
                  React.createElement("div", { onClick: e => e.stopPropagation(), style: { marginTop: 8 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }, onClick: e => { e.stopPropagation(); setEditTriggersOpen(prev => ({ ...prev, [product.id]: !prev[product.id] })); setCardEdits(prev => ({ ...prev, [product.id]: { ...(prev[product.id]||{}), suggestDraft: product.sageTriggers.join("\n") } })); } },
                      React.createElement("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A09890", fontFamily: "Calibri, sans-serif" } }, "Edit"),
                      React.createElement("span", { style: { fontSize: 12, color: "#A09890" } }, editTriggersOpen[product.id] ? "▲" : "▼")
                    ),
                    editTriggersOpen[product.id] && React.createElement("div", null,
                      React.createElement("textarea", { value: (cardEdits[product.id]||{}).suggestDraft !== undefined ? (cardEdits[product.id]||{}).suggestDraft : product.sageTriggers.join("\n"), onChange: e => setCardEdits(prev => ({ ...prev, [product.id]: { ...(prev[product.id]||{}), suggestDraft: e.target.value } })), onClick: e => e.stopPropagation(), rows: 3, placeholder: "One entry per line…", style: { width: "100%", marginTop: 6, padding: "6px 8px", borderRadius: 5, border: "1px solid #93B4EC", fontSize: 12, fontFamily: "Calibri, sans-serif", color: "#4A453F", background: "#FAFAF8", resize: "vertical", boxSizing: "border-box", outline: "none" } }),
                      React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 7 } },
                        React.createElement("button", { onClick: e => { e.stopPropagation(); setEditTriggersOpen(prev => ({ ...prev, [product.id]: false })); }, style: { padding: "4px 12px", borderRadius: 5, border: "1px solid #D8D0C4", background: "#fff", fontSize: 12, fontFamily: "Calibri, sans-serif", color: "#5C5448", cursor: "pointer" } }, "Cancel"),
                        React.createElement("button", { onClick: e => { e.stopPropagation(); const d = (cardEdits[product.id]||{}).suggestDraft; if (d !== undefined) { updateField(product.id,"sageTriggers",d.split("\n").filter(l=>l.trim())); } setEditTriggersOpen(prev => ({ ...prev, [product.id]: false })); }, style: { padding: "4px 12px", borderRadius: 5, border: "none", background: "#1C2B3A", fontSize: 12, fontFamily: "Calibri, sans-serif", color: "#fff", fontWeight: 700, cursor: "pointer" } }, "Save")
                      )
                    )
                  )
                ),

                // Product Details
                React.createElement(Section, { label: "Product Details", openKey: product.id, openState: productDetailsOpen, setOpenState: setProductDetailsOpen },
                  ...[{ label: "Product Expert(s)", value: [...new Set([product.team, product.experts].join(", ").split(", ").map(s=>s.trim()).filter(Boolean))].join(", ")||"—" }, { label: "AMS Expert(s)", value: getField(product,"amsExpert")||"—" }, { label: "Target Clients", value: getField(product,"targetClients")||"—" }, { label: "Vector / Tech Component", value: product.vectorComponent }].map(({ label, value }, i) =>
                    React.createElement("div", { key: label, style: { borderTop: i===0?"none":"1px solid #E8E2DA", padding: "8px 0" } },
                      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#1C2B3A", fontFamily: "Calibri, sans-serif", marginBottom: 2 } }, label),
                      React.createElement("div", { style: { fontSize: 12, color: "#3D3730", fontFamily: "Calibri, sans-serif" } }, value)
                    )
                  ),
                  React.createElement("div", { style: { borderTop: "1px solid #E8E2DA", padding: "8px 0" } },
                    React.createElement("div", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#1C2B3A", fontFamily: "Calibri, sans-serif", marginBottom: 6 } }, "Capability Tags"),
                    [...(product.capabilitySolutions||[]), ...((cardEdits[product.id]||{}).extraTags||[])].length > 0
                      ? React.createElement("div", { style: { fontSize: 12, color: "#3D3730", fontFamily: "Calibri, sans-serif" } }, [...(product.capabilitySolutions||[]), ...((cardEdits[product.id]||{}).extraTags||[])].sort().join(", "))
                      : React.createElement("div", { style: { fontSize: 12, color: "#B0A898", fontFamily: "Calibri, sans-serif", fontStyle: "italic" } }, "No tags yet")
                  ),
                  React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: "1px solid #E8E2DA" }, onClick: e => e.stopPropagation() },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }, onClick: e => { e.stopPropagation(); setEditCardOpen(prev => ({ ...prev, [product.id]: !prev[product.id] })); } },
                      React.createElement("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A09890", fontFamily: "Calibri, sans-serif" } }, "Edit Product Details"),
                      React.createElement("span", { style: { fontSize: 12, color: "#A09890" } }, editCardOpen[product.id] ? "▲" : "▼")
                    ),
                    editCardOpen[product.id] && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginTop: 8 } },
                      ...[{ label: "Product Expert(s)", field: "team" }, { label: "AMS Expert(s)", field: "amsExpert" }, { label: "Target Clients", field: "targetClients" }].map(({ label, field }) =>
                        React.createElement("div", { key: field },
                          React.createElement("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A7F72", fontFamily: "Calibri, sans-serif", marginBottom: 3 } }, label),
                          React.createElement("input", { value: getField(product,field), onChange: e => updateField(product.id,field,e.target.value), onClick: e => e.stopPropagation(), style: { width: "100%", padding: "5px 8px", borderRadius: 5, border: "1px solid #D8D0C4", fontSize: 12, fontFamily: "Calibri, sans-serif", color: "#3D3730", background: "#FAFAF8", outline: "none", boxSizing: "border-box" } })
                        )
                      ),
                      React.createElement("div", { style: { display: "flex", gap: 7 } },
                        React.createElement("input", { placeholder: "Add capability tags (comma-separated)…", value: (cardEdits[product.id]||{}).tagInput||"", onChange: e => setCardEdits(prev => ({ ...prev, [product.id]: { ...(prev[product.id]||{}), tagInput: e.target.value } })), onKeyDown: e => { if (e.key==="Enter") { e.stopPropagation(); const vals=((cardEdits[product.id]||{}).tagInput||"").split(",").map(t=>t.trim()).filter(Boolean); if (!vals.length) return; setCardEdits(prev => ({ ...prev, [product.id]: { ...(prev[product.id]||{}), extraTags: [...((prev[product.id]||{}).extraTags||[]),...vals], tagInput:"" } })); } }, onClick: e => e.stopPropagation(), style: { flex: 1, padding: "5px 9px", borderRadius: 5, border: "1px solid #D8D0C4", fontSize: 12, fontFamily: "Calibri, sans-serif", background: "#FAFAF8", outline: "none" } }),
                        React.createElement("button", { onClick: e => { e.stopPropagation(); const vals=((cardEdits[product.id]||{}).tagInput||"").split(",").map(t=>t.trim()).filter(Boolean); if (!vals.length) return; setCardEdits(prev => ({ ...prev, [product.id]: { ...(prev[product.id]||{}), extraTags: [...((prev[product.id]||{}).extraTags||[]),...vals], tagInput:"" } })); }, style: { padding: "5px 12px", borderRadius: 5, border: "none", background: "#1C2B3A", color: "#fff", fontSize: 12, fontFamily: "Calibri, sans-serif", fontWeight: 700, cursor: "pointer" } }, "Add")
                      ),
                      React.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } },
                        React.createElement("button", { onClick: e => { e.stopPropagation(); setEditCardOpen(prev => ({ ...prev, [product.id]: false })); }, style: { padding: "4px 12px", borderRadius: 5, border: "none", background: "#1C2B3A", fontSize: 12, fontFamily: "Calibri, sans-serif", color: "#fff", fontWeight: 700, cursor: "pointer" } }, "Done")
                      )
                    )
                  )
                ),

                // IRIS Materials
                React.createElement(Section, { label: "IRIS Materials", openKey: product.id, openState: irisOpen, setOpenState: setIrisOpen },
                  (() => {
                    const seeded = (product.sageMaterials||[]).map((m,i) => ({ ...m, _id:`seed-${product.id}-${i}`, isSeed:true }));
                    const extras = (extraMaterials[product.id]||[]).map(m => ({ ...m, _id:String(m.id), isExtra:true }));
                    const movedSeedIds = new Set(extras.filter(x=>x.movedFromSeed).map(x=>x.movedFromSeed));
                    const categories = ["POVs","Selling Support","Case Examples","Other IP"];
                    const hasAny = seeded.length > 0 || extras.length > 0;
                    const handleDrop = (e,cat) => { e.preventDefault(); e.stopPropagation(); if (!dragItem||dragItem.productId!==product.id){setDragOverCat(null);return;} if (dragItem.isSeed){const sl=seeded.find(s=>s._id===dragItem.linkId);if(!sl){setDragItem(null);setDragOverCat(null);return;} setExtraMaterials(prev=>{const arr=(prev[product.id]||[]).filter(x=>x.movedFromSeed!==dragItem.linkId);return{...prev,[product.id]:[...arr,{id:Date.now(),label:sl.label,url:sl.url,category:cat,isExtra:true,movedFromSeed:dragItem.linkId}]};}); }else{setExtraMaterials(prev=>({...prev,[product.id]:(prev[product.id]||[]).map(x=>String(x.id)===dragItem.linkId?{...x,category:cat}:x)}));} setDragItem(null);setDragOverCat(null); };
                    return React.createElement("div", null,
                      hasAny ? React.createElement("div", { style:{marginBottom:10} },
                        ...categories.map(cat => {
                          const catLinks = [...seeded.filter(m=>!movedSeedIds.has(m._id)&&(m.category||"POVs")===cat), ...extras.filter(m=>m.movedFromSeed&&m.category===cat), ...extras.filter(m=>!m.movedFromSeed&&(m.category||"POVs")===cat)];
                          const isOver = dragOverCat&&dragOverCat.productId===product.id&&dragOverCat.cat===cat;
                          return React.createElement("div", { key:cat, style:{marginBottom:10}, onDragOver:e=>{e.preventDefault();setDragOverCat({productId:product.id,cat});}, onDragLeave:e=>{if(!e.currentTarget.contains(e.relatedTarget))setDragOverCat(null);}, onDrop:e=>handleDrop(e,cat) },
                            React.createElement("div", { style:{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#5C5448",fontFamily:"Calibri, sans-serif",marginBottom:5} }, cat),
                            React.createElement("div", { style:{minHeight:34,borderRadius:6,border:isOver?"2px dashed #4A7FD4":"2px dashed transparent",background:isOver?"#EEF4FC":"transparent",padding:isOver?"3px":"0"} },
                              catLinks.length > 0
                                ? React.createElement("div", { style:{display:"flex",flexDirection:"column",gap:5} },
                                    ...catLinks.map(m => React.createElement("div", { key:m._id, draggable:true, onDragStart:e=>{e.stopPropagation();setDragItem({productId:product.id,linkId:m._id,isSeed:!!m.isSeed});}, onDragEnd:()=>{setDragItem(null);setDragOverCat(null);}, style:{display:"flex",alignItems:"center",gap:7,padding:"6px 10px",borderRadius:6,background:"#EEF4FC",border:"1px solid #C5D9F0",cursor:"grab",opacity:(dragItem&&dragItem.linkId===m._id)?0.35:1} },
                                      React.createElement("span", { style:{fontSize:12,color:"#B0A898",flexShrink:0,userSelect:"none"} }, "⠿"),
                                      React.createElement("a", { href:m.url, target:"_blank", rel:"noopener noreferrer", onClick:e=>e.stopPropagation(), style:{display:"flex",alignItems:"center",gap:5,fontSize:12.5,color:"#1A5BA6",fontFamily:"Calibri, sans-serif",textDecoration:"none",flex:1} }, "↗ ", m.label),
                                      (m.isExtra||m.movedFromSeed) && React.createElement("button", { onClick:e=>{e.stopPropagation();setExtraMaterials(prev=>({...prev,[product.id]:(prev[product.id]||[]).filter(x=>x.id!==m.id)}));}, style:{background:"none",border:"none",color:"#C0B0A0",cursor:"pointer",fontSize:15,lineHeight:1,padding:0} }, "×")
                                    ))
                                  )
                                : React.createElement("div", { style:{fontSize:11.5,color:isOver?"#4A7FD4":"#C0B0A0",fontFamily:"Calibri, sans-serif",fontStyle:"italic",paddingLeft:2,paddingTop:6} }, isOver?"↓ Drop here":"None added yet")
                            )
                          );
                        })
                      ) : React.createElement("div", { style:{fontSize:12,color:"#B0A898",fontFamily:"Calibri, sans-serif",fontStyle:"italic",marginBottom:10} }, "No materials linked yet"),
                      React.createElement("div", { style:{background:"#F5F2EE",borderRadius:7,overflow:"hidden"} },
                        React.createElement("div", { style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",cursor:"pointer"}, onClick:e=>{e.stopPropagation();setAddLinkOpen(prev=>({...prev,[product.id]:!prev[product.id]}));} },
                          React.createElement("span", { style:{fontSize:13,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#1C2B3A",fontFamily:"Calibri, sans-serif"} }, "+ Add a link"),
                          React.createElement("span", { style:{fontSize:14,color:"#A09890"} }, addLinkOpen[product.id]?"▲":"▼")
                        ),
                        addLinkOpen[product.id] && React.createElement("div", { style:{padding:"0 12px 10px"} },
                          React.createElement("input", { placeholder:"Paste IRIS link e.g. [Title](https://iris.bain.com/…)", value:(materialForm[product.id]||{}).raw||"", onChange:e=>setMaterialForm(prev=>({...prev,[product.id]:{...(prev[product.id]||{}),raw:e.target.value}})), style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px solid #D8D0C4",fontSize:12,fontFamily:"Calibri, sans-serif",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:7} }),
                          React.createElement("select", { value:(materialForm[product.id]||{}).category||"POVs", onChange:e=>setMaterialForm(prev=>({...prev,[product.id]:{...(prev[product.id]||{}),category:e.target.value}})), style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px solid #D8D0C4",fontSize:12,fontFamily:"Calibri, sans-serif",background:"#fff",outline:"none",cursor:"pointer"} },
                            ...["POVs","Selling Support","Case Examples","Other IP"].map(opt=>React.createElement("option",{key:opt,value:opt},opt))
                          ),
                          React.createElement("div", { style:{display:"flex",justifyContent:"flex-end",marginTop:7} },
                            React.createElement("button", { onClick:e=>{e.stopPropagation();const form=materialForm[product.id]||{};const raw=(form.raw||"").trim();if(!raw)return;const md=raw.match(/\[(.+)\]\((https?:\/\/[^)]+)\)/);const ul=raw.match(/(https?:\/\/\S+)/);const label=md?md[1].trim():(ul?ul[1]:raw);const url=md?md[2].trim():(ul?ul[1]:raw);if(!url)return;setExtraMaterials(prev=>({...prev,[product.id]:[...(prev[product.id]||[]),{id:Date.now(),label,url,category:form.category||"POVs",isExtra:true}]}));setMaterialForm(prev=>({...prev,[product.id]:{raw:"",category:form.category||"POVs"}}));setAddLinkOpen(prev=>({...prev,[product.id]:false}));}, disabled:!((materialForm[product.id]||{}).raw||"").trim(), style:{padding:"5px 14px",borderRadius:5,border:"none",fontSize:12,fontFamily:"Calibri, sans-serif",fontWeight:700,cursor:"pointer",background:!((materialForm[product.id]||{}).raw||"").trim()?"#C0B0A0":"#1C2B3A",color:"#fff"} }, "Add Link")
                          )
                        )
                      )
                    );
                  })()
                ),

                // Knowledge Activities
                React.createElement(Section, { label: "Knowledge Activities", openKey: product.id, openState: kmNotesOpen, setOpenState: setKmNotesOpen },
                  React.createElement("div", { style:{fontSize:11,color:"#A09890",fontFamily:"Calibri, sans-serif",marginBottom:10} }, "Each KM team member can add their own note · newest first"),
                  (kmNotes[product.id]||[]).length > 0 && React.createElement("div", { style:{display:"flex",flexDirection:"column",gap:8,marginBottom:12} },
                    ...(kmNotes[product.id]||[]).map(note => {
                      const isEditing = editingNote&&editingNote.productId===product.id&&editingNote.noteId===note.id;
                      return React.createElement("div", { key:note.id, style:{background:"#FAFAF7",border:`1px solid ${isEditing?"#93B4EC":"#EDE8E0"}`,borderRadius:7,padding:"9px 11px"} },
                        React.createElement("div", { style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6} },
                          React.createElement("div", { style:{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0} },
                            React.createElement("div", { style:{width:28,height:28,borderRadius:"50%",background:"#1C2B3A",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,fontFamily:"Calibri, sans-serif",flexShrink:0} }, (isEditing?editingNote.author:note.author).split(" ").map(w=>w[0]).filter(Boolean).slice(0,2).join("").toUpperCase()||"?"),
                            React.createElement("div", null,
                              isEditing?React.createElement("input",{value:editingNote.author,onChange:e=>setEditingNote(p=>({...p,author:e.target.value})),onClick:e=>e.stopPropagation(),style:{width:"100%",padding:"3px 7px",borderRadius:4,border:"1px solid #93B4EC",fontSize:12.5,fontFamily:"Calibri, sans-serif",fontWeight:700,color:"#1C2B3A",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:4}}):React.createElement("div",{style:{fontSize:12.5,fontWeight:700,color:"#1C2B3A",fontFamily:"Calibri, sans-serif"}},note.author),
                              isEditing?React.createElement("input",{type:"date",value:editingNote.date,onChange:e=>setEditingNote(p=>({...p,date:e.target.value})),onClick:e=>e.stopPropagation(),style:{padding:"2px 7px",borderRadius:4,border:"1px solid #93B4EC",fontSize:11,fontFamily:"Calibri, sans-serif",background:"#fff",outline:"none"}}):React.createElement("div",{style:{fontSize:10.5,color:"#8A7F72",fontFamily:"Calibri, sans-serif"}},new Date(note.date+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}))
                            )
                          ),
                          React.createElement("div", { style:{display:"flex",gap:8,alignItems:"center",flexShrink:0,marginLeft:8} },
                            isEditing
                              ? React.createElement(React.Fragment,null,React.createElement("button",{onClick:e=>{e.stopPropagation();setKmNotes(prev=>({...prev,[product.id]:prev[product.id].map(n=>n.id===note.id?{...n,author:editingNote.author,date:editingNote.date,text:editingNote.text}:n)}));setEditingNote(null);},style:{background:"#1C2B3A",border:"none",color:"#fff",cursor:"pointer",fontSize:11,fontFamily:"Calibri, sans-serif",fontWeight:700,padding:"3px 10px",borderRadius:4}},"Save"),React.createElement("button",{onClick:e=>{e.stopPropagation();setEditingNote(null);},style:{background:"none",border:"none",color:"#A09890",cursor:"pointer",fontSize:11,fontFamily:"Calibri, sans-serif",padding:0}},"Cancel"))
                              : React.createElement("button",{onClick:e=>{e.stopPropagation();setEditingNote({productId:product.id,noteId:note.id,author:note.author,date:note.date,text:note.text});},style:{background:"none",border:"none",color:"#A09890",cursor:"pointer",fontSize:11,fontFamily:"Calibri, sans-serif",padding:0}},"Edit"),
                            React.createElement("button",{onClick:e=>{e.stopPropagation();setKmNotes(prev=>({...prev,[product.id]:prev[product.id].filter(n=>n.id!==note.id)}));},style:{background:"none",border:"none",color:"#C0B0A0",cursor:"pointer",fontSize:15,lineHeight:1,padding:0}},"×")
                          )
                        ),
                        isEditing?React.createElement("textarea",{value:editingNote.text,onChange:e=>setEditingNote(p=>({...p,text:e.target.value})),onClick:e=>e.stopPropagation(),autoFocus:true,rows:3,style:{width:"100%",padding:"6px 9px",borderRadius:5,border:"1px solid #93B4EC",fontSize:12.5,fontFamily:"Calibri, sans-serif",color:"#3D3730",background:"#fff",resize:"vertical",boxSizing:"border-box",outline:"none",lineHeight:1.5}}):React.createElement("p",{onClick:e=>{e.stopPropagation();setEditingNote({productId:product.id,noteId:note.id,author:note.author,date:note.date,text:note.text});},style:{margin:0,fontSize:12.5,color:"#3D3730",fontFamily:"Calibri, sans-serif",lineHeight:1.5,cursor:"text"},title:"Click to edit"},note.text)
                      );
                    })
                  ),
                  React.createElement("div", { style:{background:"#F5F2EE",borderRadius:7,border:"1px solid #EDE8E0",overflow:"hidden"} },
                    React.createElement("div", { style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",cursor:"pointer"}, onClick:e=>{e.stopPropagation();setAddNoteOpen(prev=>({...prev,[product.id]:!prev[product.id]}));} },
                      React.createElement("div", { style:{fontSize:13,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"#1C2B3A",fontFamily:"Calibri, sans-serif"} }, "+ Add a note"),
                      React.createElement("span", { style:{fontSize:16,color:"#A09890"} }, addNoteOpen[product.id]?"▲":"▼")
                    ),
                    addNoteOpen[product.id] && React.createElement(NoteForm, { onSubmit: ({author,text,date}) => { setKmNotes(prev=>({...prev,[product.id]:[{id:Date.now(),author,text,date},...(prev[product.id]||[])]})); setAddNoteOpen(prev=>({...prev,[product.id]:false})); } })
                  )
                ),

                // Footer
                React.createElement("div", { style:{padding:"9px 18px",borderTop:"1px solid #C8C0B8",display:"flex",alignItems:"center",gap:12} },
                  (kmNotes[product.id]||[]).length>0?React.createElement("div",{style:{display:"flex",alignItems:"center",gap:5}},React.createElement("div",{style:{width:7,height:7,borderRadius:"50%",background:"#1C2B3A"}}),React.createElement("span",{style:{fontSize:12,color:"#1C2B3A",fontFamily:"Calibri, sans-serif",fontWeight:600}},`${(kmNotes[product.id]||[]).length} KM note${(kmNotes[product.id]||[]).length!==1?"s":""}`)):React.createElement("span",{style:{fontSize:12,color:"#B0A898",fontFamily:"Calibri, sans-serif",fontStyle:"italic"}},"No KM notes yet"),
                  ((product.sageMaterials||[]).length+(extraMaterials[product.id]||[]).length)>0&&React.createElement("div",{style:{display:"flex",alignItems:"center",gap:5}},React.createElement("div",{style:{width:7,height:7,borderRadius:"50%",background:"#1A5BA6"}}),React.createElement("span",{style:{fontSize:12,color:"#1A5BA6",fontFamily:"Calibri, sans-serif",fontWeight:600}},`${(product.sageMaterials||[]).length+(extraMaterials[product.id]||[]).length} IRIS link${((product.sageMaterials||[]).length+(extraMaterials[product.id]||[]).length)!==1?"s":""}`))
                )
              );
            })
          )
        );
      }).filter(Boolean),

      // Sector section
      filterSector==="All" && React.createElement("div", { id:"sector-section", style:{marginTop:36} },
        React.createElement("div", { style:{display:"flex",alignItems:"center",gap:16,marginBottom:20} },
          React.createElement("div", { style:{flex:1,height:2,background:"#A0674A",borderRadius:1} }),
          React.createElement("div", { style:{textAlign:"center"} },
            React.createElement("div", { style:{fontSize:18,letterSpacing:"0.15em",textTransform:"uppercase",color:"#1C2B3A",fontFamily:"Calibri, sans-serif",fontWeight:700,marginBottom:4} }, "AMS Industry Sectors"),
            React.createElement("h2", { style:{margin:0,fontSize:15,fontWeight:700,color:"#A0674A",fontFamily:"Calibri, sans-serif"} }, "Sector-Specific Initiatives & POVs")
          ),
          React.createElement("div", { style:{flex:1,height:2,background:"#A0674A",borderRadius:1} })
        ),
        React.createElement("div", { style:{display:"flex",flexDirection:"column",gap:12} },
          ...SECTOR_CARDS.map(sector => {
            const isSectorOpen = expandedSector===sector.id;
            const totalNotes = (sector.products||[]).reduce((s,p)=>s+(kmNotes[p.id]||[]).length,0);
            return React.createElement("div", { key:sector.id, style:{background:"#fff",borderRadius:12,border:"1px solid #E5DDD4",overflow:"hidden",boxShadow:"0 1px 6px rgba(0,0,0,0.05)"} },
              React.createElement("div", { style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",cursor:"pointer",background:"#A0674A"}, onClick:()=>setExpandedSector(isSectorOpen?null:sector.id) },
                React.createElement("div", { style:{display:"flex",alignItems:"center",gap:12} },
                  React.createElement("span", { style:{fontSize:15,fontWeight:700,color:"#fff",fontFamily:"Calibri, sans-serif"} }, sector.name),
                  (sector.products||[]).length>0&&React.createElement("span",{style:{fontSize:11,padding:"2px 10px",borderRadius:10,background:"rgba(255,255,255,0.2)",color:"#EDF2F5",fontFamily:"Calibri, sans-serif"}},`${(sector.products||[]).length} product${(sector.products||[]).length!==1?"s":""}`),
                  totalNotes>0&&React.createElement("span",{style:{fontSize:11,padding:"2px 10px",borderRadius:10,background:"rgba(255,255,255,0.15)",color:"#EDF2F5",fontFamily:"Calibri, sans-serif"}},`${totalNotes} KM note${totalNotes!==1?"s":""}`)
                ),
                React.createElement("span", { style:{fontSize:16,color:"#EDF2F5"} }, isSectorOpen?"▲":"▼")
              ),
              isSectorOpen&&React.createElement("div", { style:{padding:"16px 20px",background:"#F7F5F1",display:"flex",flexDirection:"column",gap:10} },
                (sector.products||[]).length===0&&React.createElement("div",{style:{fontSize:13,color:"#A09890",fontFamily:"Calibri, sans-serif",fontStyle:"italic",padding:"12px 0"}},"No products added yet for this sector."),
                ...[...(sector.products||[])].sort((a,b)=>({"Sector-Specific Initiative":0,"Edgy Sector POV":1}[a.type]??1)-({"Sector-Specific Initiative":0,"Edgy Sector POV":1}[b.type]??1)).map(sp => {
                  const spKey=`${sector.id}-${sp.id}`;
                  const isSpExpanded=expandedSectorProduct===spKey;
                  const spNotes=kmNotes[sp.id]||[];
                  const stc={"Sector-Specific Initiative":{bg:"#FFF3E0",text:"#7B3E00",border:"#FFB74D",dot:"#F57C00"},"Edgy Sector POV":{bg:"#F3E5F5",text:"#4A148C",border:"#CE93D8",dot:"#9C27B0"}}[sp.type]||{bg:"#F3E5F5",text:"#4A148C",border:"#CE93D8",dot:"#9C27B0"};
                  return React.createElement("div", { key:sp.id, style:{background:"#fff",borderRadius:8,border:`1px solid ${isSpExpanded?stc.border:"#E5DDD4"}`,overflow:"hidden",cursor:"pointer"}, onClick:()=>setExpandedSectorProduct(isSpExpanded?null:spKey) },
                    React.createElement("div", { style:{height:3,background:stc.dot} }),
                    React.createElement("div", { style:{padding:"12px 16px 10px"} },
                      React.createElement("div", { style:{marginBottom:7} }, React.createElement("span",{style:{fontSize:10.5,padding:"2px 8px",borderRadius:10,background:stc.bg,color:stc.text,border:`1px solid ${stc.border}`,fontFamily:"Calibri, sans-serif",fontWeight:600}},sp.type)),
                      React.createElement("h4", { style:{margin:"0 0 5px",fontSize:14,fontWeight:700,color:"#1C2B3A",lineHeight:1.3,fontFamily:"Calibri, sans-serif"} }, sp.name),
                      React.createElement("p", { style:{margin:0,fontSize:12,color:"#5C5448",lineHeight:1.5,fontFamily:"Calibri, sans-serif"} }, sp.description)
                    ),
                    React.createElement("div", { style:{padding:"8px 16px",background:"#fff",borderTop:"1px solid #C8C0B8"} },
                      React.createElement("div", { style:{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#3D3730",fontFamily:"Calibri, sans-serif",marginBottom:5} }, "Suggest When"),
                      ...sp.sageTriggers.slice(0,isSpExpanded?undefined:1).map((t,i)=>React.createElement("div",{key:i,style:{display:"flex",gap:6,marginBottom:3}},React.createElement("span",{style:{color:stc.dot,fontSize:12,flexShrink:0}},"›"),React.createElement("span",{style:{fontSize:11.5,color:"#4A453F",fontFamily:"Calibri, sans-serif",lineHeight:1.4}},t))),
                      !isSpExpanded&&sp.sageTriggers.length>1&&React.createElement("span",{style:{fontSize:11,color:"#9A8F82",fontFamily:"Calibri, sans-serif"}},`+${sp.sageTriggers.length-1} more…`)
                    ),
                    isSpExpanded&&React.createElement("div", { style:{padding:"10px 16px",background:"#fff",borderTop:"1px solid #C8C0B8"}, onClick:e=>e.stopPropagation() },
                      React.createElement("div", { style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10} },
                        ...[{label:"Product Expert(s)",field:"experts"},{label:"AMS Expert(s)",field:"amsExpert"}].map(({label,field})=>React.createElement("div",{key:field},React.createElement("div",{style:{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#3D3730",fontFamily:"Calibri, sans-serif",marginBottom:3}},label),React.createElement("input",{value:getField(sp,field),onChange:e=>updateField(sp.id,field,e.target.value),placeholder:field==="amsExpert"?"To be filled by KM team":sp.experts||"",style:{width:"100%",padding:"4px 7px",borderRadius:4,border:"1px solid #D8D0C4",fontSize:11.5,fontFamily:"Calibri, sans-serif",color:"#3D3730",background:"#fff",outline:"none",boxSizing:"border-box"}}))),
                        React.createElement("div",{style:{gridColumn:"1 / -1"}},React.createElement("div",{style:{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#3D3730",fontFamily:"Calibri, sans-serif",marginBottom:3}},"Target Clients"),React.createElement("input",{value:getField(sp,"targetClients"),onChange:e=>updateField(sp.id,"targetClients",e.target.value),style:{width:"100%",padding:"4px 7px",borderRadius:4,border:"1px solid #D8D0C4",fontSize:11.5,fontFamily:"Calibri, sans-serif",color:"#3D3730",background:"#fff",outline:"none",boxSizing:"border-box"}}))
                      ),
                      spNotes.length>0&&React.createElement("div",{style:{marginBottom:10}},React.createElement("div",{style:{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#3D3730",fontFamily:"Calibri, sans-serif",marginBottom:7}},"Knowledge Activities"),React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:6}},
                        ...spNotes.map(note=>React.createElement("div",{key:note.id,style:{background:"#FAFAF7",border:"1px solid #EDE8E0",borderRadius:6,padding:"8px 10px"}},
                          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4}},React.createElement("div",null,React.createElement("span",{style:{fontSize:12,fontWeight:700,color:"#1C2B3A",fontFamily:"Calibri, sans-serif"}},note.author),React.createElement("span",{style:{fontSize:10.5,color:"#8A7F72",fontFamily:"Calibri, sans-serif",marginLeft:8}},new Date(note.date+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}))),React.createElement("button",{onClick:e=>{e.stopPropagation();setKmNotes(prev=>({...prev,[sp.id]:prev[sp.id].filter(n=>n.id!==note.id)}));},style:{background:"none",border:"none",color:"#C0B0A0",cursor:"pointer",fontSize:14,lineHeight:1,padding:0}},"×")),
                          React.createElement("p",{style:{margin:0,fontSize:12,color:"#3D3730",fontFamily:"Calibri, sans-serif",lineHeight:1.5}},note.text)
                        ))
                      )),
                      React.createElement(SectorNoteForm, { onSubmit: ({author,text,date}) => { setKmNotes(prev=>({...prev,[sp.id]:[{id:Date.now(),author,text,date},...(prev[sp.id]||[])]})); } })
                    ),
                    React.createElement("div",{style:{padding:"7px 16px",borderTop:"1px solid #C8C0B8",display:"flex",alignItems:"center",gap:8}},
                      spNotes.length>0?React.createElement(React.Fragment,null,React.createElement("div",{style:{width:6,height:6,borderRadius:"50%",background:"#1C2B3A"}}),React.createElement("span",{style:{fontSize:11.5,color:"#1C2B3A",fontFamily:"Calibri, sans-serif",fontWeight:600}},`${spNotes.length} KM note${spNotes.length!==1?"s":""}`)):React.createElement("span",{style:{fontSize:11.5,color:"#B0A898",fontFamily:"Calibri, sans-serif",fontStyle:"italic"}},"No KM notes yet")
                    )
                  );
                })
              )
            );
          })
        )
      )
    ),

    activeModal&&React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20},onClick:()=>setActiveModal(null)},
      React.createElement("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:460,padding:28,boxShadow:"0 16px 50px rgba(0,0,0,0.2)"},onClick:e=>e.stopPropagation()},
        React.createElement("div",{style:{marginBottom:18}},React.createElement("div",{style:{fontSize:10.5,letterSpacing:"0.15em",textTransform:"uppercase",color:"#8A7F72",fontFamily:"Calibri, sans-serif",marginBottom:3}},"Log Opportunity · Cross-sector Initiative"),React.createElement("h2",{style:{margin:0,fontSize:19,fontWeight:700,color:"#1C2B3A"}},activeModal.name)),
        ...[{label:"Client / Company *",key:"client",placeholder:"e.g. GE Aerospace, Boeing, Schneider…"},{label:"Responsible Partner",key:"partner",placeholder:"e.g. Jim Wininger"},{label:"Case Code",key:"caseCode",placeholder:"e.g. 12345-678"}].map(({label,key,placeholder})=>React.createElement("div",{key,style:{marginBottom:12}},React.createElement("label",{style:{display:"block",fontSize:11,fontWeight:700,color:"#5C5448",fontFamily:"Calibri, sans-serif",marginBottom:4,letterSpacing:"0.05em",textTransform:"uppercase"}},label),React.createElement("input",{value:formData[key],onChange:e=>setFormData({...formData,[key]:e.target.value}),placeholder,style:{width:"100%",padding:"8px 11px",borderRadius:6,border:"1px solid #D8D0C4",fontSize:13,fontFamily:"Calibri, sans-serif",outline:"none",boxSizing:"border-box",background:"#FAFAF8"}}))),
        React.createElement("div",{style:{marginBottom:12}},React.createElement("label",{style:{display:"block",fontSize:11,fontWeight:700,color:"#5C5448",fontFamily:"Calibri, sans-serif",marginBottom:4,letterSpacing:"0.05em",textTransform:"uppercase"}},"Opportunity Type *"),React.createElement("select",{value:formData.opportunityType,onChange:e=>setFormData({...formData,opportunityType:e.target.value}),style:{width:"100%",padding:"8px 11px",borderRadius:6,border:"1px solid #D8D0C4",fontSize:13,fontFamily:"Calibri, sans-serif",outline:"none",background:"#FAFAF8",cursor:"pointer"}},React.createElement("option",{value:""},"Select type…"),...OPPORTUNITY_TYPES.map(t=>React.createElement("option",{key:t,value:t},t)))),
        React.createElement("div",{style:{marginBottom:12}},React.createElement("label",{style:{display:"block",fontSize:11,fontWeight:700,color:"#5C5448",fontFamily:"Calibri, sans-serif",marginBottom:4,letterSpacing:"0.05em",textTransform:"uppercase"}},"Date"),React.createElement("input",{type:"date",value:formData.date,onChange:e=>setFormData({...formData,date:e.target.value}),style:{width:"100%",padding:"8px 11px",borderRadius:6,border:"1px solid #D8D0C4",fontSize:13,fontFamily:"Calibri, sans-serif",outline:"none",background:"#FAFAF8",boxSizing:"border-box"}})),
        React.createElement("div",{style:{marginBottom:18}},React.createElement("label",{style:{display:"block",fontSize:11,fontWeight:700,color:"#5C5448",fontFamily:"Calibri, sans-serif",marginBottom:4,letterSpacing:"0.05em",textTransform:"uppercase"}},"Notes / Context"),React.createElement("textarea",{value:formData.notes,onChange:e=>setFormData({...formData,notes:e.target.value}),placeholder:"What's the opportunity? Any context for the product team…",rows:3,style:{width:"100%",padding:"8px 11px",borderRadius:6,border:"1px solid #D8D0C4",fontSize:13,fontFamily:"Calibri, sans-serif",outline:"none",background:"#FAFAF8",resize:"vertical",boxSizing:"border-box"}})),
        React.createElement("div",{style:{display:"flex",gap:9,justifyContent:"flex-end"}},React.createElement("button",{onClick:()=>setActiveModal(null),style:{padding:"9px 18px",borderRadius:6,border:"1px solid #D8D0C4",background:"#fff",fontSize:13,cursor:"pointer",fontFamily:"Calibri, sans-serif",color:"#5C5448"}},"Cancel"),React.createElement("button",{onClick:saveEntry,disabled:!formData.client||!formData.opportunityType,style:{padding:"9px 20px",borderRadius:6,border:"none",background:(!formData.client||!formData.opportunityType)?"#C0B0A0":"#1C2B3A",color:"#fff",fontSize:13,cursor:(!formData.client||!formData.opportunityType)?"default":"pointer",fontFamily:"Calibri, sans-serif",fontWeight:700}},"Save Opportunity"))
      )
    )
  );
}


// ── GITHUB SYNC ────────────────────────────────────────────────────────────
async function githubGet(token, owner, repo) {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/ams_data.json`;
    const res = await fetch(url, {
      headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" }
    });
    if (!res.ok) return null;
    const json = await res.json();
    const content = decodeURIComponent(escape(atob(json.content.replace(/\n/g, ""))));
    return { data: JSON.parse(content), sha: json.sha };
  } catch(e) { console.error("githubGet error:", e); return null; }
}

async function githubSave(token, owner, repo, data, sha) {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/ams_data.json`;
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
    const body = { message: "AMS Dashboard update", content, branch: "main" };
    if (sha) body.sha = sha;
    const res = await fetch(url, {
      method: "PUT",
      headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) { console.error("Save failed:", await res.text()); return null; }
    const json = await res.json();
    return json.content?.sha || null;
  } catch(e) { console.error("githubSave error:", e); return null; }
}

function AppWrapper() {
  // ================================================================
  const GH_TOKEN = "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";
  const GH_OWNER = "bain";
  const GH_REPO  = "ams-product-board";
  // ================================================================

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

  const loadFromGitHub = React.useCallback(async () => {
    setSyncing(true); setSyncError(null);
    const result = await githubGet(GH_TOKEN, GH_OWNER, GH_REPO);
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
    }
    setDataLoaded(true);
  }, []);

  React.useEffect(() => { loadFromGitHub(); }, []);
  React.useEffect(() => {
    const interval = setInterval(loadFromGitHub, 30000);
    return () => clearInterval(interval);
  }, []);

  const pendingRef = React.useRef(null);
  const saveToGitHub = React.useCallback(async (type, value) => {
    // Debounce: clear any pending save and wait 800ms before saving
    if (pendingRef.current) clearTimeout(pendingRef.current);
    pendingRef.current = setTimeout(async () => {
      setSyncing(true); setSyncError(null);
      let snap = { entries, extraMaterials, kmNotes, cardEdits };
      snap[type] = value;
      const newSha = await githubSave(GH_TOKEN, GH_OWNER, GH_REPO, snap, shaRef.current);
      setSyncing(false);
      if (newSha) { shaRef.current = newSha; setSha(newSha); setLastSync(new Date()); }
      else setSyncError("Sync failed — check the token in the HTML file");
    }, 800);
  }, [entries, extraMaterials, kmNotes, cardEdits]);


  if (!dataLoaded) return React.createElement("div", { style: { minHeight: "100vh", background: "#1C2B3A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Calibri, sans-serif", color: "#fff", fontSize: 16 } }, "Loading AMS dashboard…");

  return React.createElement("div", null,

    React.createElement(App, {
      sharedEntries: entries, setSharedEntries: v => { setEntries(v); setTimeout(() => saveToGitHub("entries", v), 0); },
      sharedExtraMaterials: extraMaterials, setSharedExtraMaterials: v => { setExtraMaterials(v); setTimeout(() => saveToGitHub("extraMaterials", v), 0); },
      sharedKmNotes: kmNotes, setSharedKmNotes: v => { setKmNotes(v); setTimeout(() => saveToGitHub("kmNotes", v), 0); },
      sharedCardEdits: cardEdits, setSharedCardEdits: v => { setCardEdits(v); setTimeout(() => saveToGitHub("cardEdits", v), 0); },
    })
  );
}

ReactDOM.render(React.createElement(AppWrapper), document.getElementById("root"));
