export const topics = [
  // LEVEL 0
  { id: "mste", name: "MSTE", fullName: "Mathematics, Surveying & Transportation", level: 0, parentId: null, category: "MSTE" },
  { id: "hge", name: "HGE", fullName: "Hydraulics & Geotechnical Engineering", level: 0, parentId: null, category: "HGE" },
  { id: "sec", name: "SEC", fullName: "Structural Engineering & Construction", level: 0, parentId: null, category: "SEC" },

  // LEVEL 1 — MSTE
  { id: "mste-math", name: "Mathematics", level: 1, parentId: "mste", category: "MSTE" },
  { id: "mste-surv", name: "Surveying", level: 1, parentId: "mste", category: "MSTE" },
  { id: "mste-trans", name: "Transportation Engineering", level: 1, parentId: "mste", category: "MSTE" },

  // LEVEL 1 — HGE
  { id: "hge-hyd", name: "Hydraulics / Fluid Mechanics", level: 1, parentId: "hge", category: "HGE" },
  { id: "hge-geo", name: "Geotechnical Engineering", level: 1, parentId: "hge", category: "HGE" },

  // LEVEL 1 — SEC
  { id: "sec-str", name: "Structural Engineering", level: 1, parentId: "sec", category: "SEC" },
  { id: "sec-con", name: "Construction Engineering & Management", level: 1, parentId: "sec", category: "SEC" },

  // LEVEL 2 — Mathematics
  { id: "math-alg", name: "Algebra", level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-trig", name: "Trigonometry", level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-ageo", name: "Analytic Geometry", level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-diff", name: "Differential Calculus", level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-int", name: "Integral Calculus", level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-de", name: "Differential Equations", level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-stat", name: "Probability & Statistics", level: 2, parentId: "mste-math", category: "MSTE" },

  // LEVEL 2 — Surveying
  { id: "surv-plane", name: "Plane Surveying", level: 2, parentId: "mste-surv", category: "MSTE" },
  { id: "surv-geo", name: "Geodetic Surveying", level: 2, parentId: "mste-surv", category: "MSTE" },
  { id: "surv-eng", name: "Engineering Surveying", level: 2, parentId: "mste-surv", category: "MSTE" },
  { id: "surv-comp", name: "Survey Computations & Adjustments", level: 2, parentId: "mste-surv", category: "MSTE" },

  // LEVEL 2 — Transportation
  { id: "trans-hwy", name: "Highway Engineering", level: 2, parentId: "mste-trans", category: "MSTE" },
  { id: "trans-traf", name: "Traffic Engineering", level: 2, parentId: "mste-trans", category: "MSTE" },
  { id: "trans-pave", name: "Pavement Engineering", level: 2, parentId: "mste-trans", category: "MSTE" },

  // LEVEL 2 — Hydraulics
  { id: "hyd-prop", name: "Fluid Properties", level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-stat", name: "Fluid Statics", level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-dyn", name: "Fluid Dynamics", level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-pipe", name: "Pipe Flow", level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-open", name: "Open Channel Flow", level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-hydro", name: "Hydrology", level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-mach", name: "Hydraulic Machines", level: 2, parentId: "hge-hyd", category: "HGE" },

  // LEVEL 2 — Geotechnical
  { id: "geo-basic", name: "Soil Mechanics Basics", level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-class", name: "Soil Classification", level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-comp", name: "Compaction", level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-perm", name: "Permeability & Seepage", level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-cons", name: "Consolidation", level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-shear", name: "Shear Strength", level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-found", name: "Foundation Engineering", level: 2, parentId: "hge-geo", category: "HGE" },

  // LEVEL 2 — Structural
  { id: "str-anal", name: "Structural Analysis", level: 2, parentId: "sec-str", category: "SEC" },
  { id: "str-rc", name: "RC Design", level: 2, parentId: "sec-str", category: "SEC" },
  { id: "str-steel", name: "Steel Design", level: 2, parentId: "sec-str", category: "SEC" },
  { id: "str-timber", name: "Timber Design", level: 2, parentId: "sec-str", category: "SEC" },

  // LEVEL 2 — Construction
  { id: "con-pm", name: "Project Management", level: 2, parentId: "sec-con", category: "SEC" },
  { id: "con-est", name: "Cost Estimation", level: 2, parentId: "sec-con", category: "SEC" },
  { id: "con-mat", name: "Construction Materials", level: 2, parentId: "sec-con", category: "SEC" },
];

export const getTopicById = (id) => topics.find((t) => t.id === id);
export const getChildren = (parentId) => topics.filter((t) => t.parentId === parentId);
export const getLevel2Topics = () => topics.filter((t) => t.level === 2);
