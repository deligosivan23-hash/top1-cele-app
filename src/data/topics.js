export const topics = [
  // LEVEL 0
  { id: "mste", name: "MSTE", fullName: "Mathematics, Surveying & Transportation", level: 0, parentId: null, category: "MSTE" },
  { id: "hge",  name: "HGE",  fullName: "Hydraulics & Geotechnical Engineering",  level: 0, parentId: null, category: "HGE"  },
  { id: "sec",  name: "SEC",  fullName: "Structural Engineering & Construction",  level: 0, parentId: null, category: "SEC"  },
  // LEVEL 1 — MSTE
  { id: "mste-math",  name: "Mathematics",               level: 1, parentId: "mste", category: "MSTE" },
  { id: "mste-surv",  name: "Surveying",                 level: 1, parentId: "mste", category: "MSTE" },
  { id: "mste-trans", name: "Transportation Engineering", level: 1, parentId: "mste", category: "MSTE" },
  // LEVEL 1 — HGE
  { id: "hge-hyd", name: "Hydraulics / Fluid Mechanics", level: 1, parentId: "hge", category: "HGE" },
  { id: "hge-geo", name: "Geotechnical Engineering",     level: 1, parentId: "hge", category: "HGE" },
  // LEVEL 1 — SEC
  { id: "sec-str", name: "Structural Engineering",                 level: 1, parentId: "sec", category: "SEC" },
  { id: "sec-con", name: "Construction Engineering & Management",  level: 1, parentId: "sec", category: "SEC" },
  // LEVEL 2 — Mathematics
  { id: "math-alg",  name: "Algebra",                 level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-trig", name: "Trigonometry",            level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-ageo", name: "Analytic Geometry",       level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-diff", name: "Differential Calculus",   level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-int",  name: "Integral Calculus",       level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-de",   name: "Differential Equations",  level: 2, parentId: "mste-math", category: "MSTE" },
  { id: "math-stat", name: "Probability & Statistics", level: 2, parentId: "mste-math", category: "MSTE" },
  // LEVEL 2 — Surveying
  { id: "surv-plane", name: "Plane Surveying",                   level: 2, parentId: "mste-surv", category: "MSTE" },
  { id: "surv-geo",   name: "Geodetic Surveying",                level: 2, parentId: "mste-surv", category: "MSTE" },
  { id: "surv-eng",   name: "Engineering Surveying",             level: 2, parentId: "mste-surv", category: "MSTE" },
  { id: "surv-comp",  name: "Survey Computations & Adjustments", level: 2, parentId: "mste-surv", category: "MSTE" },
  // LEVEL 2 — Transportation
  { id: "trans-hwy",  name: "Highway Engineering",  level: 2, parentId: "mste-trans", category: "MSTE" },
  { id: "trans-traf", name: "Traffic Engineering",  level: 2, parentId: "mste-trans", category: "MSTE" },
  { id: "trans-pave", name: "Pavement Engineering", level: 2, parentId: "mste-trans", category: "MSTE" },
  // LEVEL 2 — Hydraulics
  { id: "hyd-prop",  name: "Fluid Properties",   level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-stat",  name: "Fluid Statics",      level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-dyn",   name: "Fluid Dynamics",     level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-pipe",  name: "Pipe Flow",          level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-open",  name: "Open Channel Flow",  level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-hydro", name: "Hydrology",          level: 2, parentId: "hge-hyd", category: "HGE" },
  { id: "hyd-mach",  name: "Hydraulic Machines", level: 2, parentId: "hge-hyd", category: "HGE" },
  // LEVEL 2 — Geotechnical
  { id: "geo-basic",  name: "Soil Mechanics Basics",  level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-class",  name: "Soil Classification",    level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-comp",   name: "Compaction",              level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-perm",   name: "Permeability & Seepage",  level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-cons",   name: "Consolidation",           level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-shear",  name: "Shear Strength",          level: 2, parentId: "hge-geo", category: "HGE" },
  { id: "geo-found",  name: "Foundation Engineering",  level: 2, parentId: "hge-geo", category: "HGE" },
  // LEVEL 2 — Structural
  { id: "str-anal",   name: "Structural Analysis", level: 2, parentId: "sec-str", category: "SEC" },
  { id: "str-rc",     name: "RC Design",           level: 2, parentId: "sec-str", category: "SEC" },
  { id: "str-steel",  name: "Steel Design",        level: 2, parentId: "sec-str", category: "SEC" },
  { id: "str-timber", name: "Timber Design",       level: 2, parentId: "sec-str", category: "SEC" },
  // LEVEL 2 — Construction
  { id: "con-pm",  name: "Project Management",    level: 2, parentId: "sec-con", category: "SEC" },
  { id: "con-est", name: "Cost Estimation",       level: 2, parentId: "sec-con", category: "SEC" },
  { id: "con-mat", name: "Construction Materials",level: 2, parentId: "sec-con", category: "SEC" },
  // LEVEL 3 — Core Concepts
  // Under math-alg
  { id: "alg-linear",       name: "Linear Equations",        level: 3, parentId: "math-alg",  category: "MSTE" },
  { id: "alg-quadratic",    name: "Quadratic Equations",     level: 3, parentId: "math-alg",  category: "MSTE" },
  { id: "alg-simultaneous", name: "Simultaneous Equations",  level: 3, parentId: "math-alg",  category: "MSTE" },
  { id: "alg-polynomials",  name: "Polynomials",             level: 3, parentId: "math-alg",  category: "MSTE" },
  { id: "alg-exponents",    name: "Exponents & Logarithms",  level: 3, parentId: "math-alg",  category: "MSTE" },
  // Under math-trig
  { id: "trig-identities", name: "Trigonometric Identities", level: 3, parentId: "math-trig", category: "MSTE" },
  { id: "trig-sines",      name: "Law of Sines",             level: 3, parentId: "math-trig", category: "MSTE" },
  { id: "trig-cosines",    name: "Law of Cosines",           level: 3, parentId: "math-trig", category: "MSTE" },
  { id: "trig-circle",     name: "Unit Circle & Graphs",     level: 3, parentId: "math-trig", category: "MSTE" },
  // Under math-ageo
  { id: "ageo-distance", name: "Distance & Angle Formula",  level: 3, parentId: "math-ageo", category: "MSTE" },
  { id: "ageo-midpoint", name: "Midpoint & Division",       level: 3, parentId: "math-ageo", category: "MSTE" },
  { id: "ageo-slope",    name: "Slope & Line Equations",    level: 3, parentId: "math-ageo", category: "MSTE" },
  { id: "ageo-conics",   name: "Conic Sections",            level: 3, parentId: "math-ageo", category: "MSTE" },
  // Under math-diff
  { id: "diff-limits",      name: "Limits & Continuity",  level: 3, parentId: "math-diff", category: "MSTE" },
  { id: "diff-derivatives", name: "Derivatives & Rules",  level: 3, parentId: "math-diff", category: "MSTE" },
  { id: "diff-rules",       name: "Special Diff. Rules",  level: 3, parentId: "math-diff", category: "MSTE" },
  { id: "diff-maxmin",      name: "Maxima & Minima",      level: 3, parentId: "math-diff", category: "MSTE" },
  // Under math-int
  { id: "int-indefinite", name: "Indefinite Integrals",  level: 3, parentId: "math-int", category: "MSTE" },
  { id: "int-definite",   name: "Definite Integrals",    level: 3, parentId: "math-int", category: "MSTE" },
  { id: "int-area",       name: "Area by Integration",   level: 3, parentId: "math-int", category: "MSTE" },
  { id: "int-volume",     name: "Volume by Integration", level: 3, parentId: "math-int", category: "MSTE" },
  // Under math-de
  { id: "de-firstorder", name: "First-Order ODEs",    level: 3, parentId: "math-de", category: "MSTE" },
  { id: "de-separable",  name: "Separable Equations", level: 3, parentId: "math-de", category: "MSTE" },
  { id: "de-linear",     name: "Linear ODEs",         level: 3, parentId: "math-de", category: "MSTE" },
  // Under math-stat
  { id: "stat-prob",        name: "Basic Probability",             level: 3, parentId: "math-stat", category: "MSTE" },
  { id: "stat-conditional", name: "Conditional Probability",       level: 3, parentId: "math-stat", category: "MSTE" },
  { id: "stat-central",     name: "Measures of Central Tendency",  level: 3, parentId: "math-stat", category: "MSTE" },
  { id: "stat-deviation",   name: "Standard Deviation & Variance", level: 3, parentId: "math-stat", category: "MSTE" },
  // Under surv-plane
  { id: "plane-distance", name: "Distance Measurement", level: 3, parentId: "surv-plane", category: "MSTE" },
  { id: "plane-angle",    name: "Angle Measurement",    level: 3, parentId: "surv-plane", category: "MSTE" },
  { id: "plane-traverse", name: "Traverse Surveys",     level: 3, parentId: "surv-plane", category: "MSTE" },
  { id: "plane-leveling", name: "Leveling Operations",  level: 3, parentId: "surv-plane", category: "MSTE" },
  // Under surv-geo
  { id: "geo-coords",    name: "Geographic Coordinates",       level: 3, parentId: "surv-geo", category: "MSTE" },
  { id: "geo-curvature", name: "Earth Curvature & Refraction", level: 3, parentId: "surv-geo", category: "MSTE" },
  { id: "geo-gps",       name: "GPS & GNSS Methods",           level: 3, parentId: "surv-geo", category: "MSTE" },
  // Under surv-eng
  { id: "engsurvey-road",    name: "Route & Road Surveys",  level: 3, parentId: "surv-eng", category: "MSTE" },
  { id: "engsurvey-layout",  name: "Construction Layout",   level: 3, parentId: "surv-eng", category: "MSTE" },
  { id: "engsurvey-volumes", name: "Volume Computations",   level: 3, parentId: "surv-eng", category: "MSTE" },
  // Under surv-comp
  { id: "comp-error",   name: "Error Propagation",            level: 3, parentId: "surv-comp", category: "MSTE" },
  { id: "comp-leastsq", name: "Least Squares Adjustment",     level: 3, parentId: "surv-comp", category: "MSTE" },
  { id: "comp-bearing", name: "Bearing & Azimuth Conversion", level: 3, parentId: "surv-comp", category: "MSTE" },
  // Under trans-hwy
  { id: "hwy-design", name: "Horizontal & Vertical Curves", level: 3, parentId: "trans-hwy", category: "MSTE" },
  { id: "hwy-super",  name: "Superelevation & Widening",    level: 3, parentId: "trans-hwy", category: "MSTE" },
  { id: "hwy-sight",  name: "Sight Distance",               level: 3, parentId: "trans-hwy", category: "MSTE" },
  // Under trans-traf
  { id: "traf-flow",   name: "Traffic Flow Theory",   level: 3, parentId: "trans-traf", category: "MSTE" },
  { id: "traf-los",    name: "Level of Service",      level: 3, parentId: "trans-traf", category: "MSTE" },
  { id: "traf-signal", name: "Signal Timing & Design",level: 3, parentId: "trans-traf", category: "MSTE" },
  // Under trans-pave
  { id: "pave-flex",  name: "Flexible Pavement Design",  level: 3, parentId: "trans-pave", category: "MSTE" },
  { id: "pave-rigid", name: "Rigid Pavement Design",     level: 3, parentId: "trans-pave", category: "MSTE" },
  { id: "pave-load",  name: "Load Equivalency Factors",  level: 3, parentId: "trans-pave", category: "MSTE" },
  // Under hyd-prop
  { id: "prop-density",   name: "Density & Specific Weight", level: 3, parentId: "hyd-prop", category: "HGE" },
  { id: "prop-viscosity", name: "Viscosity",                 level: 3, parentId: "hyd-prop", category: "HGE" },
  { id: "prop-sg",        name: "Specific Gravity",          level: 3, parentId: "hyd-prop", category: "HGE" },
  // Under hyd-stat
  { id: "fstat-pressure",  name: "Hydrostatic Pressure",  level: 3, parentId: "hyd-stat", category: "HGE" },
  { id: "fstat-manometer", name: "Manometry",             level: 3, parentId: "hyd-stat", category: "HGE" },
  { id: "fstat-buoyancy",  name: "Buoyancy & Floatation", level: 3, parentId: "hyd-stat", category: "HGE" },
  // Under hyd-dyn
  { id: "dyn-bernoulli",  name: "Bernoulli's Equation", level: 3, parentId: "hyd-dyn", category: "HGE" },
  { id: "dyn-continuity", name: "Continuity Equation",  level: 3, parentId: "hyd-dyn", category: "HGE" },
  { id: "dyn-energy",     name: "Energy & Momentum",    level: 3, parentId: "hyd-dyn", category: "HGE" },
  // Under hyd-pipe
  { id: "pipe-darcyw",   name: "Darcy-Weisbach Equation", level: 3, parentId: "hyd-pipe", category: "HGE" },
  { id: "pipe-minor",    name: "Minor Head Losses",       level: 3, parentId: "hyd-pipe", category: "HGE" },
  { id: "pipe-networks", name: "Pipe Networks",           level: 3, parentId: "hyd-pipe", category: "HGE" },
  // Under hyd-open
  { id: "open-manning",       name: "Manning's Equation", level: 3, parentId: "hyd-open", category: "HGE" },
  { id: "open-critical",      name: "Critical Flow",      level: 3, parentId: "hyd-open", category: "HGE" },
  { id: "open-hydraulicjump", name: "Hydraulic Jump",     level: 3, parentId: "hyd-open", category: "HGE" },
  // Under hyd-hydro
  { id: "hydro-runoff",     name: "Runoff Estimation",        level: 3, parentId: "hyd-hydro", category: "HGE" },
  { id: "hydro-hydrograph", name: "Hydrograph Analysis",      level: 3, parentId: "hyd-hydro", category: "HGE" },
  { id: "hydro-flood",      name: "Flood Frequency Analysis", level: 3, parentId: "hyd-hydro", category: "HGE" },
  // Under hyd-mach
  { id: "mach-pumps",    name: "Pumps & Pump Selection", level: 3, parentId: "hyd-mach", category: "HGE" },
  { id: "mach-turbines", name: "Turbines",               level: 3, parentId: "hyd-mach", category: "HGE" },
  { id: "mach-affinity", name: "Affinity Laws",          level: 3, parentId: "hyd-mach", category: "HGE" },
  // Under geo-basic
  { id: "soil-index",     name: "Index Properties",            level: 3, parentId: "geo-basic", category: "HGE" },
  { id: "soil-weight",    name: "Weight-Volume Relationships", level: 3, parentId: "geo-basic", category: "HGE" },
  { id: "soil-atterberg", name: "Atterberg Limits",            level: 3, parentId: "geo-basic", category: "HGE" },
  // Under geo-class
  { id: "class-uscs",   name: "USCS Classification",   level: 3, parentId: "geo-class", category: "HGE" },
  { id: "class-aashto", name: "AASHTO Classification", level: 3, parentId: "geo-class", category: "HGE" },
  // Under geo-comp
  { id: "comp-proctor", name: "Proctor Compaction Test",  level: 3, parentId: "geo-comp", category: "HGE" },
  { id: "comp-field",   name: "Field Compaction Control", level: 3, parentId: "geo-comp", category: "HGE" },
  // Under geo-perm
  { id: "perm-darcy",   name: "Darcy's Law",         level: 3, parentId: "geo-perm", category: "HGE" },
  { id: "perm-flownet", name: "Flow Nets & Seepage", level: 3, parentId: "geo-perm", category: "HGE" },
  // Under geo-cons
  { id: "cons-settlement", name: "Settlement Calculation", level: 3, parentId: "geo-cons", category: "HGE" },
  { id: "cons-terzaghi",   name: "Terzaghi's Theory",     level: 3, parentId: "geo-cons", category: "HGE" },
  // Under geo-shear
  { id: "shear-mohr",     name: "Mohr's Circle",          level: 3, parentId: "geo-shear", category: "HGE" },
  { id: "shear-triaxial", name: "Triaxial Test Analysis", level: 3, parentId: "geo-shear", category: "HGE" },
  { id: "shear-direct",   name: "Direct Shear Test",      level: 3, parentId: "geo-shear", category: "HGE" },
  // Under geo-found
  { id: "found-bearing", name: "Bearing Capacity",        level: 3, parentId: "geo-found", category: "HGE" },
  { id: "found-piles",   name: "Pile Foundation Design",  level: 3, parentId: "geo-found", category: "HGE" },
  { id: "found-gw",      name: "Ground Water Effects",    level: 3, parentId: "geo-found", category: "HGE" },
  // Under str-anal
  { id: "anal-statics", name: "Static Equilibrium",      level: 3, parentId: "str-anal", category: "SEC" },
  { id: "anal-trusses", name: "Truss Analysis",          level: 3, parentId: "str-anal", category: "SEC" },
  { id: "anal-beams",   name: "Beam Analysis",           level: 3, parentId: "str-anal", category: "SEC" },
  { id: "anal-frames",  name: "Frame Analysis",          level: 3, parentId: "str-anal", category: "SEC" },
  { id: "anal-smd",     name: "Shear & Moment Diagrams", level: 3, parentId: "str-anal", category: "SEC" },
  // Under str-rc
  { id: "rc-beams",    name: "RC Beam Design",    level: 3, parentId: "str-rc", category: "SEC" },
  { id: "rc-columns",  name: "RC Column Design",  level: 3, parentId: "str-rc", category: "SEC" },
  { id: "rc-slabs",    name: "RC Slab Design",    level: 3, parentId: "str-rc", category: "SEC" },
  { id: "rc-footings", name: "RC Footing Design", level: 3, parentId: "str-rc", category: "SEC" },
  // Under str-steel
  { id: "steel-tension",     name: "Tension Members",     level: 3, parentId: "str-steel", category: "SEC" },
  { id: "steel-compression", name: "Compression Members", level: 3, parentId: "str-steel", category: "SEC" },
  { id: "steel-beams",       name: "Steel Beams",         level: 3, parentId: "str-steel", category: "SEC" },
  { id: "steel-connections", name: "Connections",         level: 3, parentId: "str-steel", category: "SEC" },
  // Under str-timber
  { id: "timber-beams",   name: "Timber Beam Design",   level: 3, parentId: "str-timber", category: "SEC" },
  { id: "timber-columns", name: "Timber Column Design", level: 3, parentId: "str-timber", category: "SEC" },
  // Under con-pm
  { id: "pm-cpm",        name: "Critical Path Method",   level: 3, parentId: "con-pm", category: "SEC" },
  { id: "pm-pert",       name: "PERT Analysis",          level: 3, parentId: "con-pm", category: "SEC" },
  { id: "pm-scheduling", name: "Bar Charts & Scheduling",level: 3, parentId: "con-pm", category: "SEC" },
  // Under con-est
  { id: "est-quantity", name: "Quantity Takeoff",   level: 3, parentId: "con-est", category: "SEC" },
  { id: "est-unit",     name: "Unit Cost Analysis", level: 3, parentId: "con-est", category: "SEC" },
  { id: "est-bidding",  name: "Bidding & Contracts",level: 3, parentId: "con-est", category: "SEC" },
  // Under con-mat
  { id: "mat-concrete", name: "Concrete Technology", level: 3, parentId: "con-mat", category: "SEC" },
  { id: "mat-steel",    name: "Steel Properties",    level: 3, parentId: "con-mat", category: "SEC" },
  { id: "mat-asphalt",  name: "Asphalt & Bitumen",   level: 3, parentId: "con-mat", category: "SEC" },
  // LEVEL 4 — Problem Types
  { id: "diff-maxmin-optim", name: "Optimization Problems", level: 4, parentId: "diff-maxmin", category: "MSTE", difficulty: 3, template: ["Build the objective function","Express in one variable using the constraint","Differentiate and set equal to zero","Apply second derivative test","Check domain boundary values"], traps: ["Wrong objective function setup","Forgetting boundary checks","Unit inconsistency"] },
  { id: "diff-maxmin-rrates", name: "Related Rates", level: 4, parentId: "diff-maxmin", category: "MSTE", difficulty: 4, template: ["Draw a diagram and label all changing quantities","Write a relationship equation linking variables","Differentiate both sides with respect to time","Substitute known rates and values","Solve for the unknown rate"], traps: ["Substituting values BEFORE differentiating","Forgetting chain rule on each term","Confusing dr/dt with dr/dx"] },
  { id: "diff-deriv-chain", name: "Chain Rule Applications", level: 4, parentId: "diff-derivatives", category: "MSTE", difficulty: 3, template: ["Identify outer and inner functions","Differentiate outer function (keep inner intact)","Multiply by derivative of inner function","Simplify the result"], traps: ["Forgetting to differentiate the inner function","Treating composite as a simple product","Sign errors in nested functions"] },
  { id: "diff-deriv-implicit", name: "Implicit Differentiation", level: 4, parentId: "diff-derivatives", category: "MSTE", difficulty: 3, template: ["Differentiate both sides with respect to x","Apply chain rule to all y terms (multiply by dy/dx)","Collect all dy/dx terms on one side","Solve for dy/dx"], traps: ["Missing dy/dx factor on y terms","Differentiating x terms as if they were y"] },
  { id: "int-area-between", name: "Area Between Curves", level: 4, parentId: "int-area", category: "MSTE", difficulty: 3, template: ["Find intersection points by setting f(x)=g(x)","Determine which curve is on top over the interval","Set up ∫[f(x) − g(x)]dx","Evaluate the definite integral"], traps: ["Integrating the wrong function on top","Missing secondary intersection points","Forgetting absolute value when curves cross"] },
  { id: "int-vol-revolution", name: "Solid of Revolution", level: 4, parentId: "int-volume", category: "MSTE", difficulty: 4, template: ["Identify axis of rotation and method (disk/washer/shell)","Disk: V=π∫[f(x)]²dx; Washer: V=π∫([R]²−[r]²)dx","Shell: V=2π∫x·f(x)dx","Identify correct limits","Evaluate the integral"], traps: ["Using disk when washer is needed (hollow solid)","Wrong axis orientation","Squaring the entire integral instead of the function"] },
  { id: "dyn-bern-pv", name: "Pressure-Velocity Problems", level: 4, parentId: "dyn-bernoulli", category: "HGE", difficulty: 2, template: ["Identify two points on the streamline","Write Bernoulli: P1/γ+V1²/2g+z1 = P2/γ+V2²/2g+z2","Apply continuity A1V1=A2V2 if cross-sections change","Substitute and solve"], traps: ["Mixing pressure units (Pa vs kPa vs m-H2O)","Ignoring elevation head","Not applying continuity to find velocity"] },
  { id: "dyn-bern-multi", name: "Multi-Step Bernoulli", level: 4, parentId: "dyn-bernoulli", category: "HGE", difficulty: 3, template: ["Draw the hydraulic grade line","Apply Bernoulli with head losses","Identify energy inputs (pumps) and outputs (turbines)","Use continuity at each junction","Solve system of equations"], traps: ["Forgetting head loss terms","Wrong sign for pump/turbine heads","Applying Bernoulli between non-streamline points"] },
  { id: "pipe-dw-headloss", name: "Head Loss Calculation", level: 4, parentId: "pipe-darcyw", category: "HGE", difficulty: 2, template: ["Write Darcy-Weisbach: hf=f·(L/D)·(V²/2g)","Find friction factor f","Compute velocity V=Q/A","Substitute and solve for hf"], traps: ["Using diameter instead of radius for area","Inconsistent units for diameter","Forgetting f depends on Re and roughness"] },
  { id: "pipe-dw-series", name: "Series Pipe Systems", level: 4, parentId: "pipe-darcyw", category: "HGE", difficulty: 3, template: ["Apply continuity: Q is same throughout series","Total head loss = sum of individual pipe losses","hT=hf1+hf2+...+hfn (plus minor losses)","Substitute Darcy-Weisbach for each pipe","Solve for unknown"], traps: ["Assuming same velocity in pipes of different diameter","Forgetting minor losses","Mixing series (same Q) with parallel (same hf) rules"] },
  { id: "open-mann-app", name: "Manning Equation Applications", level: 4, parentId: "open-manning", category: "HGE", difficulty: 2, template: ["Write Manning: Q=(1/n)·A·R^(2/3)·S^(1/2)","Compute hydraulic radius R=A/P","Substitute all known values","Solve for the unknown"], traps: ["Using diameter for hydraulic radius","Wrong Manning's n value","Not squaring the slope correctly"] },
  { id: "open-mann-normal", name: "Normal Depth", level: 4, parentId: "open-manning", category: "HGE", difficulty: 3, template: ["Set up Manning's equation with depth y unknown","Express A and P in terms of y for the channel shape","Substitute into AR^(2/3)=Qn/S^(1/2)","Solve iteratively for y_n"], traps: ["Wrong cross-section formula for channel shape","Stopping after one iteration","Confusing normal depth with critical depth"] },
  { id: "anal-smd-basic", name: "Shear and Moment Diagrams", level: 4, parentId: "anal-smd", category: "SEC", difficulty: 2, template: ["Solve all support reactions using ΣF=0 and ΣM=0","Cut beam and draw FBDs at representative sections","Write V(x) and M(x) equations in each segment","Apply boundary conditions","Identify max/min shear and moment locations"], traps: ["Incorrect reaction calculations","Sign convention error","Forgetting moment from distributed loads"] },
  { id: "anal-smd-fixed", name: "Fixed Beams", level: 4, parentId: "anal-smd", category: "SEC", difficulty: 4, template: ["Identify degree of indeterminacy","Apply compatibility: slope=0, deflection=0 at fixed ends","Use slope-deflection or moment-area method","Solve system of equations for reactions","Draw final SFD and BMD"], traps: ["Treating fixed end as pin","Forgetting fixed end moment in equilibrium","Wrong sign in compatibility equations"] },
  { id: "anal-smd-continuous", name: "Continuous Beams", level: 4, parentId: "anal-smd", category: "SEC", difficulty: 4, template: ["Identify spans and support types","Apply three-moment equation or moment distribution","Solve for interior support moments","Find reactions in each span","Draw SFD and BMD per span"], traps: ["Wrong loading setup for three-moment equation","Wrong sign in moment distribution","Forgetting carry-over factors"] },
  { id: "rc-beam-singly", name: "Singly Reinforced Beam Design", level: 4, parentId: "rc-beams", category: "SEC", difficulty: 3, template: ["Compute Mu (factored moment)","Assume effective depth d = h − cover − d_bar/2","Compute Rn = Mu/(φ·b·d²), then ρ from formula","Check ρ_min ≤ ρ ≤ ρ_max","Compute As = ρ·b·d, select bar size and spacing"], traps: ["Using gross area instead of effective area","Forgetting φ=0.90 for flexure","Not checking ρ limits"] },
  { id: "rc-beam-doubly", name: "Doubly Reinforced Beam", level: 4, parentId: "rc-beams", category: "SEC", difficulty: 4, template: ["Check if singly reinforced is sufficient","Compute M1 from max singly reinforced capacity","Remaining M2 = Mu − M1 carried by compression steel","Find As2 and As' from M2; check if compression steel yields","Total As = As1 + As2"], traps: ["Not checking if compression steel yields","Forgetting compression steel contribution to M1","Double-counting the compression concrete area"] },
  { id: "rc-beam-tbeam", name: "T-Beam Design", level: 4, parentId: "rc-beams", category: "SEC", difficulty: 4, template: ["Determine effective flange width (ACI code)","Check if neutral axis is in flange","If NA in web: separate flange overhangs from web","Solve for NA depth a and c","Compute Mn=Mu/φ and required As"], traps: ["Using full flange without checking ACI limits","Applying rectangular formula when NA is in web","Forgetting flange vs web area split"] },
  { id: "rc-col-short", name: "Short Column Interaction", level: 4, parentId: "rc-columns", category: "SEC", difficulty: 4, template: ["Check kL/r to confirm short column (<22)","Identify load type: pure compression, eccentric, or combined","For combined: locate point on P-M interaction diagram","Check if design point is inside diagram","Adjust reinforcement if outside"], traps: ["Wrong effective length factor k","Not accounting for minimum eccentricity","Interpolating incorrectly on interaction diagram"] },
  { id: "rc-col-long", name: "Long Column Buckling", level: 4, parentId: "rc-columns", category: "SEC", difficulty: 4, template: ["Compute slenderness ratio kL/r","Determine if second-order effects matter (kL/r > 22)","Apply moment magnification factor δ","Use amplified moment Mc = δ·M2","Re-check interaction diagram with amplified moment"], traps: ["Using L instead of kL","Forgetting EI includes reinforcement","Applying braced frame formula to sway frame"] },
  { id: "found-bc-terzaghi", name: "Ultimate Bearing Capacity", level: 4, parentId: "found-bearing", category: "HGE", difficulty: 3, template: ["Identify soil parameters: c, φ, γ, Df","Select Terzaghi: qu=c·Nc+q·Nq+0.5·γ·B·Nγ","Look up Nc, Nq, Nγ from table for given φ","Apply shape factors for non-strip footings","Compute qu and qa=qu/FS"], traps: ["Using wrong bearing capacity factors","Forgetting surcharge term q=γ·Df","Not applying shape factors for square/circular footings"] },
  { id: "found-bc-fs", name: "Factor of Safety", level: 4, parentId: "found-bearing", category: "HGE", difficulty: 2, template: ["Compute gross ultimate bearing capacity qu","Compute net ultimate: qu_net = qu − γ·Df","Compute net applied pressure: qa_net = Q/A − γ·Df","FS = qu_net / qa_net; typically FS ≥ 3.0"], traps: ["Using gross values when net is required","Dividing by wrong pressure","Confusing load Q with bearing pressure q"] },
  { id: "shear-mohr-circle", name: "Mohr's Circle Analysis", level: 4, parentId: "shear-mohr", category: "HGE", difficulty: 3, template: ["Plot A(σx,τxy) and B(σy,−τxy) on σ-τ plane","Draw diameter AB; center C=((σx+σy)/2, 0)","Radius R=√[((σx−σy)/2)²+τxy²]","Principal stresses: σ1,2 = C ± R","Max shear = R; angle to principal plane = θ (half of 2θ on circle)"], traps: ["Wrong sign convention for shear stress","Confusing angle on circle (2θ) with actual angle (θ)","Not checking which is σ1 vs σ2"] },
  { id: "plane-trav-bowditch", name: "Traverse Adjustment (Bowditch)", level: 4, parentId: "plane-traverse", category: "MSTE", difficulty: 3, template: ["Compute latitudes (L=d·cosα) and departures (D=d·sinα)","Sum to find linear closure error","Bowditch correction: CL_i=(−ΣL)·(l_i/Σl_total)","Apply corrections to get balanced values","Compute coordinates and area"], traps: ["Wrong bearing quadrant for lat/dep signs","Correcting proportional to angle instead of distance","Forgetting allowable tolerance check"] },
  { id: "plane-trav-closure", name: "Closure Error", level: 4, parentId: "plane-traverse", category: "MSTE", difficulty: 2, template: ["Compute ΣL (latitudes) and ΣD (departures)","Linear closure error e=√(ΣL²+ΣD²)","Relative precision: 1/N = e/Σd_total","Compare to allowable precision for survey class"], traps: ["Squaring the sum instead of summing the squares","Using perimeter incorrectly for precision ratio"] },
  { id: "traf-los-calc", name: "Level of Service Calculation", level: 4, parentId: "traf-los", category: "MSTE", difficulty: 3, template: ["Determine PHV and PHF","Convert to PCE: v=V/(PHF·N·fw·fHV)","Calculate v/c ratio","Determine density (freeways) or delay (intersections)","Look up LOS threshold table (A–F)"], traps: ["Forgetting heavy vehicle factor fHV","Not converting to PCE before v/c","Confusing density thresholds for freeway vs intersection LOS"] },
  { id: "steel-bolt-design", name: "Bolt Design", level: 4, parentId: "steel-connections", category: "SEC", difficulty: 3, template: ["Determine load type: shear, tension, or combined","Shear capacity: φRn=φ·Fnv·Ab","Bearing capacity: φRn=φ·2.4·Fu·d·t","Take minimum of shear and bearing","n = Pu / φRn_min"], traps: ["Using nominal area instead of stress area for tension","Wrong φ factor","Not checking bearing failure mode"] },
  { id: "steel-weld-design", name: "Weld Design", level: 4, parentId: "steel-connections", category: "SEC", difficulty: 3, template: ["Determine weld size w; effective throat = 0.707w","φRn = φ·0.6·FEXX·(0.707w)·Lw","Check base metal shear yield and fracture","Design length Lw = Pu/(φRn per unit length)","Check min/max weld size requirements"], traps: ["Using leg size instead of effective throat","Confusing FEXX with base metal strength","Wrong φ factor for weld fracture (0.75)"] },
  { id: "pm-cpm-float", name: "Critical Path & Float", level: 4, parentId: "pm-cpm", category: "SEC", difficulty: 3, template: ["List all activities with durations and dependencies","Draw AON or AOA network","Forward pass: compute ES and EF","Backward pass: compute LS and LF","Total Float = LS − ES; Critical Path = TF=0 activities"], traps: ["Wrong dependency relationships","Forward pass error cascades","Confusing free float with total float"] },
  { id: "soil-index-wvr", name: "Weight-Volume Phase Diagrams", level: 4, parentId: "soil-index", category: "HGE", difficulty: 2, template: ["Draw three-phase diagram (solids, water, air)","Assign Vs=1 or Vt=1 as basis","Compute e=Vv/Vs, n=Vv/Vt, w=Ww/Ws×100%","Compute S=Vw/Vv×100%","Use S=Gs·w/e to cross-check"], traps: ["Mixing up void ratio e and porosity n","Using weight where volume is needed","Forgetting S=Gs·w/e shortcut"] },
  { id: "fstat-pres-hydro", name: "Hydrostatic Force on Surfaces", level: 4, parentId: "fstat-pressure", category: "HGE", difficulty: 3, template: ["Compute F=γ·h̄·A (h̄ = depth to centroid)","Find pressure center: y_p=ȳ+I_G/(ȳ·A)","For inclined surfaces, use slant distance in I_G","Check units: γ in kN/m³, h̄ in m, A in m²"], traps: ["Using bottom depth instead of centroid depth h̄","Forgetting I_G for non-rectangular shapes","Not converting inclined angles properly"] },
];

export const getTopicById    = (id) => topics.find((t) => t.id === id);
export const getChildren     = (parentId) => topics.filter((t) => t.parentId === parentId);
export const getLevel2Topics = () => topics.filter((t) => t.level === 2);
export const getLevel3Topics = () => topics.filter((t) => t.level === 3);
export const getLevel4Topics = () => topics.filter((t) => t.level === 4);
export const getTopicsByLevel = (level) => topics.filter((t) => t.level === level);

export function getBreadcrumb(id) {
  const chain = [];
  let current = getTopicById(id);
  while (current) {
    chain.unshift(current);
    current = current.parentId ? getTopicById(current.parentId) : null;
  }
  return chain;
}
