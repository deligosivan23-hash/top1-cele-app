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
  { id: "alg-linear",       name: "Linear Equations",        level: 3, parentId: "math-alg",  category: "MSTE" ,
    problemTypes: [
      {
        id: "alg-linear-rate",
        name: "Work & Rate Problems",
        boardFrequency: "high",
        template: ["Assign variable (rate = jobs/unit time)", "Set combined rate = 1/T", "Solve for T"],
        traps: ["Adding times instead of adding rates", "Forgetting to take reciprocal for combined time"],
      },
      {
        id: "alg-linear-mixture",
        name: "Mixture & Alloy Problems",
        boardFrequency: "high",
        template: ["Set up two equations: total amount + component amount", "Substitute and solve", "Verify both conditions"],
        traps: ["Mixing percentage (decimal) with whole number", "Setting up x + y = total incorrectly"],
      },
      {
        id: "alg-linear-distance",
        name: "Distance\u2013Rate\u2013Time Problems",
        boardFrequency: "high",
        template: ["d = rt for each leg", "Set up equation (same distance, same time, or sum)", "Solve and verify units"],
        traps: ["Using arithmetic mean of speeds instead of harmonic mean for equal distances", "Forgetting return trip changes effective rate"],
      },
    ]
  },
  { id: "alg-quadratic",    name: "Quadratic Equations",     level: 3, parentId: "math-alg",  category: "MSTE" ,
    problemTypes: [
      {
        id: "alg-quad-factor",
        name: "Factoring & Root Finding",
        boardFrequency: "high",
        template: ["Rearrange to ax\u00b2+bx+c=0", "Factor or apply quadratic formula", "Check discriminant; discard non-physical roots"],
        traps: ["Accepting negative roots for physical quantities (length, time)", "Sign error in quadratic formula (\u2212b\u00b1...)"],
      },
      {
        id: "alg-quad-vieta",
        name: "Vieta's Formulas (Sum & Product of Roots)",
        boardFrequency: "medium",
        template: ["Sum of roots = \u2212b/a", "Product of roots = c/a", "Build equation from known roots"],
        traps: ["Using +b/a for sum (wrong sign)", "Confusing which root relationship is sum vs product"],
      },
      {
        id: "alg-quad-applied",
        name: "Area & Geometry Word Problems",
        boardFrequency: "high",
        template: ["Express dimensions in one variable", "Write area/perimeter equation", "Solve quadratic; reject negative solution"],
        traps: ["Forgetting to check if solution is physically valid", "Setting up wrong relationship between dimensions"],
      },
    ]
  },
  { id: "alg-simultaneous", name: "Simultaneous Equations",  level: 3, parentId: "math-alg",  category: "MSTE" ,
    problemTypes: [
      {
        id: "alg-sim-subst",
        name: "Substitution Method",
        boardFrequency: "high",
        template: ["Isolate one variable in simpler equation", "Substitute into second equation", "Solve; back-substitute to find other variable"],
        traps: ["Substituting into the same equation already used", "Arithmetic sign error during substitution"],
      },
      {
        id: "alg-sim-elim",
        name: "Elimination Method (3 Unknowns)",
        boardFrequency: "high",
        template: ["Pair equations to eliminate one variable", "Reduce to 2\u00d72 system", "Solve and back-substitute"],
        traps: ["Not multiplying all terms by the same factor before subtracting", "Losing track of which variable was eliminated"],
      },
      {
        id: "alg-sim-applied",
        name: "Digit & Age Problems",
        boardFrequency: "medium",
        template: ["Assign variables to unknowns", "Write constraint equations", "Solve system; verify against original conditions"],
        traps: ["Setting up digit reversal wrong (10u+t vs 10t+u)", "Confusing current age with future/past age"],
      },
    ]
  },
  { id: "alg-polynomials",  name: "Polynomials",             level: 3, parentId: "math-alg",  category: "MSTE" ,
    problemTypes: [
      {
        id: "alg-poly-rem",
        name: "Remainder & Factor Theorem",
        boardFrequency: "high",
        template: ["Identify divisor (x\u2212r); r is the test value", "Evaluate P(r) for remainder", "If P(r)=0, then (x\u2212r) is a factor"],
        traps: ["Using r instead of \u2212r for (x+r)", "Evaluating at wrong value: (x\u22122) \u2192 use r=+2 not \u22122"],
      },
      {
        id: "alg-poly-synth",
        name: "Synthetic Division",
        boardFrequency: "high",
        template: ["Write coefficients in order (include 0 for missing terms)", "Bring down first coefficient", "Multiply, add down each column", "Read quotient from result row"],
        traps: ["Forgetting to include a 0-coefficient for missing degree terms", "Wrong sign for synthetic root value"],
      },
      {
        id: "alg-poly-factor",
        name: "Special Factoring Patterns",
        boardFrequency: "medium",
        template: ["Recognize pattern: difference of squares, sum/difference of cubes", "Apply correct formula", "Verify by expansion if unsure"],
        traps: ["Using sum-of-cubes formula for difference-of-cubes and vice versa", "Incomplete factoring: stopping at (x\u00b2\u22124) instead of (x\u22122)(x+2)"],
      },
    ]
  },
  { id: "alg-exponents",    name: "Exponents & Logarithms",  level: 3, parentId: "math-alg",  category: "MSTE" ,
    problemTypes: [
      {
        id: "alg-exp-laws",
        name: "Laws of Exponents & Simplification",
        boardFrequency: "high",
        template: ["Convert all bases to the same base if possible", "Apply product/quotient/power rules", "Simplify result"],
        traps: ["Multiplying exponents when bases are the same (should add)", "Raising power to power: multiply exponents, not add"],
      },
      {
        id: "alg-log-solve",
        name: "Solving Logarithmic Equations",
        boardFrequency: "high",
        template: ["Combine logs using properties (product/quotient/power)", "Convert to exponential form", "Solve; check domain (argument must be positive)"],
        traps: ["Accepting extraneous solutions that make argument negative", "Applying log properties in wrong order"],
      },
      {
        id: "alg-exp-growth",
        name: "Exponential Growth & Decay",
        boardFrequency: "high",
        template: ["Write N = N\u2080\u00b7e^(kt) or N = N\u2080\u00b7b^(t/T)", "Use given condition to find k or T", "Solve for unknown (t or N)"],
        traps: ["Using linear model instead of exponential", "Forgetting to convert percentage rate to decimal"],
      },
    ]
  },
  // Under math-trig
  { id: "trig-identities", name: "Trigonometric Identities", level: 3, parentId: "math-trig", category: "MSTE" ,
    problemTypes: [
      {
        id: "trig-id-pyth",
        name: "Pythagorean Identity Applications",
        boardFrequency: "high",
        template: ["Identify which identity applies (sin\u00b2+cos\u00b2=1, 1+tan\u00b2=sec\u00b2, 1+cot\u00b2=csc\u00b2)", "Substitute to simplify or find missing value", "Determine quadrant for sign"],
        traps: ["Using wrong Pythagorean identity variant", "Ignoring quadrant when finding sin/cos from each other"],
      },
      {
        id: "trig-id-double",
        name: "Double & Half Angle Formulas",
        boardFrequency: "high",
        template: ["Write double-angle formula: sin2A=2sinAcosA, cos2A=cos\u00b2A\u2212sin\u00b2A", "Substitute known values", "Simplify using Pythagorean identities if needed"],
        traps: ["Using cos 2A = 2cos\u00b2A without verifying which form is needed", "Half-angle: forgetting \u00b1 depends on quadrant"],
      },
      {
        id: "trig-id-addsubt",
        name: "Sum & Difference of Angles",
        boardFrequency: "high",
        template: ["Express angle as sum of standard angles (e.g., 75\u00b0=45\u00b0+30\u00b0)", "Apply sin(A\u00b1B) or cos(A\u00b1B) formula", "Substitute exact values and simplify"],
        traps: ["Using wrong sign in formula: sin(A\u2212B)=sinAcosB\u2212cosAsinB", "Mixing up sine and cosine addition formulas"],
      },
    ]
  },
  { id: "trig-sines",      name: "Law of Sines",             level: 3, parentId: "math-trig", category: "MSTE" ,
    problemTypes: [
      {
        id: "trig-sin-basic",
        name: "Finding Unknown Sides/Angles",
        boardFrequency: "high",
        template: ["Identify known angle-opposite-side pairs", "Set up a/sinA = b/sinB", "Cross-multiply and solve"],
        traps: ["Using wrong side as opposite", "Inverting the ratio: sinA/a instead of a/sinA"],
      },
      {
        id: "trig-sin-ambig",
        name: "Ambiguous Case (SSA)",
        boardFrequency: "medium",
        template: ["Compute h = b\u00b7sinA", "Compare a to h and to b", "Determine number of triangles; solve each if two exist"],
        traps: ["Not checking the ambiguous case; accepting only one solution when two exist", "Confusing the conditions for 0, 1, or 2 triangles"],
      },
      {
        id: "trig-sin-area",
        name: "Area Using Sine",
        boardFrequency: "high",
        template: ["Identify two sides and included angle", "Area = \u00bdab\u00b7sinC", "Verify angle is between the two given sides"],
        traps: ["Using non-included angle", "Forgetting the \u00bd factor"],
      },
    ]
  },
  { id: "trig-cosines",    name: "Law of Cosines",           level: 3, parentId: "math-trig", category: "MSTE" ,
    problemTypes: [
      {
        id: "trig-cos-side",
        name: "Finding Unknown Side (SAS)",
        boardFrequency: "high",
        template: ["Identify two sides and included angle", "Apply c\u00b2=a\u00b2+b\u00b2\u22122ab\u00b7cosC", "Take square root; always positive"],
        traps: ["Using Pythagorean theorem (forgetting the \u22122ab\u00b7cosC term)", "Using wrong angle as included angle"],
      },
      {
        id: "trig-cos-angle",
        name: "Finding Unknown Angle (SSS)",
        boardFrequency: "high",
        template: ["Find angle opposite to longest side first", "cosC=(a\u00b2+b\u00b2\u2212c\u00b2)/(2ab)", "Use arccos; check for obtuse result"],
        traps: ["Using the ellipse formula c\u00b2=a\u00b2+b\u00b2 (Pythagorean)", "Getting a negative cosine and not recognizing it means obtuse angle"],
      },
      {
        id: "trig-heron",
        name: "Heron's Formula for Area",
        boardFrequency: "medium",
        template: ["Compute s=(a+b+c)/2", "Area=\u221a(s(s\u2212a)(s\u2212b)(s\u2212c))", "Confirm positive result under radical"],
        traps: ["Using perimeter instead of semi-perimeter s", "Arithmetic error in computing s\u2212a, s\u2212b, s\u2212c"],
      },
    ]
  },
  { id: "trig-circle",     name: "Unit Circle & Graphs",     level: 3, parentId: "math-trig", category: "MSTE" ,
    problemTypes: [
      {
        id: "trig-circ-period",
        name: "Period, Amplitude & Phase Shift",
        boardFrequency: "high",
        template: ["Identify A, B, C, D in y=A\u00b7sin(Bx+C)+D", "Period=2\u03c0/|B|, Amplitude=|A|, Phase=\u2212C/B", "Sketch or evaluate at key points"],
        traps: ["Forgetting to divide C by B for phase shift (using C directly)", "Reporting negative amplitude instead of |A|"],
      },
      {
        id: "trig-circ-ref",
        name: "Reference Angle & Quadrant Values",
        boardFrequency: "high",
        template: ["Find reference angle (acute angle to nearest x-axis)", "Determine quadrant from sign conditions (ASTC rule)", "Apply sign to trig value"],
        traps: ["ASTC rule error: All Students Take Calculus (I: all +, II: sin+, III: tan+, IV: cos+)", "Using supplement instead of reference angle"],
      },
      {
        id: "trig-circ-solve",
        name: "Solving Trig Equations in [0\u00b0,360\u00b0)",
        boardFrequency: "high",
        template: ["Isolate the trig function", "Find reference angle using inverse trig", "Apply quadrant rules to find all solutions in range"],
        traps: ["Missing the second solution (e.g., only finding QI solution for sine)", "Not restricting solutions to [0\u00b0,360\u00b0)"],
      },
    ]
  },
  // Under math-ageo
  { id: "ageo-distance", name: "Distance & Angle Formula",  level: 3, parentId: "math-ageo", category: "MSTE" ,
    problemTypes: [
      {
        id: "ageo-dist-pts",
        name: "Distance Between Two Points",
        boardFrequency: "high",
        template: ["d=\u221a((x\u2082\u2212x\u2081)\u00b2+(y\u2082\u2212y\u2081)\u00b2)", "Square the differences first, then add", "Take positive square root"],
        traps: ["Adding differences without squaring", "Negative result from subtraction order (doesn't matter after squaring)"],
      },
      {
        id: "ageo-dist-ptline",
        name: "Distance from Point to Line",
        boardFrequency: "high",
        template: ["Write line as Ax+By+C=0", "d=|Ax\u2080+By\u2080+C|/\u221a(A\u00b2+B\u00b2)", "Always take absolute value in numerator"],
        traps: ["Forgetting absolute value (getting negative distance)", "Not having the line in standard form first"],
      },
      {
        id: "ageo-dist-parallel",
        name: "Distance Between Parallel Lines",
        boardFrequency: "medium",
        template: ["Confirm equal slopes (parallel)", "d=|C\u2081\u2212C\u2082|/\u221a(A\u00b2+B\u00b2)", "Verify both lines have same A,B coefficients"],
        traps: ["Using |C\u2081+C\u2082| instead of |C\u2081\u2212C\u2082|", "Lines not in the same form before applying formula"],
      },
    ]
  },
  { id: "ageo-midpoint", name: "Midpoint & Division",       level: 3, parentId: "math-ageo", category: "MSTE" ,
    problemTypes: [
      {
        id: "ageo-mid-formula",
        name: "Midpoint Formula",
        boardFrequency: "high",
        template: ["M=((x\u2081+x\u2082)/2,(y\u2081+y\u2082)/2)", "Average x-coordinates, then y-coordinates", "Finding endpoint from midpoint: B=2M\u2212A"],
        traps: ["Subtracting instead of averaging coordinates", "Finding midpoint of wrong segment"],
      },
      {
        id: "ageo-mid-centroid",
        name: "Centroid of Triangle",
        boardFrequency: "high",
        template: ["G=((x\u2081+x\u2082+x\u2083)/3,(y\u2081+y\u2082+y\u2083)/3)", "Average all three x-coordinates and all three y-coordinates", "Centroid divides each median in 2:1 ratio from vertex"],
        traps: ["Using midpoint formula (2 points) instead of centroid (3 points)", "Incorrect division by 2 instead of 3"],
      },
      {
        id: "ageo-mid-section",
        name: "Internal & External Division",
        boardFrequency: "medium",
        template: ["Internal: P=((mx\u2082+nx\u2081)/(m+n),(my\u2082+ny\u2081)/(m+n))", "External: P=((mx\u2082\u2212nx\u2081)/(m\u2212n),(my\u2082\u2212ny\u2081)/(m\u2212n))", "Identify ratio direction (from which point)"],
        traps: ["Applying internal formula for external division", "Reversing m and n in the formula"],
      },
    ]
  },
  { id: "ageo-slope",    name: "Slope & Line Equations",    level: 3, parentId: "math-ageo", category: "MSTE" ,
    problemTypes: [
      {
        id: "ageo-slope-line",
        name: "Equation of a Line",
        boardFrequency: "high",
        template: ["Find slope m=(y\u2082\u2212y\u2081)/(x\u2082\u2212x\u2081)", "Use point-slope: y\u2212y\u2081=m(x\u2212x\u2081)", "Convert to standard form Ax+By+C=0 if needed"],
        traps: ["Inverting slope: using \u0394x/\u0394y instead of \u0394y/\u0394x", "Sign error in point-slope form expansion"],
      },
      {
        id: "ageo-slope-parallel-perp",
        name: "Parallel & Perpendicular Lines",
        boardFrequency: "high",
        template: ["Parallel: same slope m\u2082=m\u2081", "Perpendicular: negative reciprocal m\u2082=\u22121/m\u2081", "Write equation through given point with new slope"],
        traps: ["Using just the negative (\u2212m) instead of negative reciprocal (\u22121/m) for perpendicular", "Forgetting to pass through the required point"],
      },
      {
        id: "ageo-slope-intercepts",
        name: "Intercept & Area Problems",
        boardFrequency: "medium",
        template: ["Find x-intercept: set y=0", "Find y-intercept: set x=0", "Area of triangle with axes = \u00bd|x-int||y-int|"],
        traps: ["Forgetting \u00bd for triangle area", "Using wrong intercept (solving for y-int when x-int is needed)"],
      },
    ]
  },
  { id: "ageo-conics",   name: "Conic Sections",            level: 3, parentId: "math-ageo", category: "MSTE" ,
    problemTypes: [
      {
        id: "ageo-con-circle",
        name: "Circle: Standard & General Form",
        boardFrequency: "high",
        template: ["Complete the square for x and y separately", "Add constants to both sides", "Read center (h,k) and r from (x\u2212h)\u00b2+(y\u2212k)\u00b2=r\u00b2"],
        traps: ["Adding completing-the-square constants to only one side", "Computing r\u00b2=value and forgetting to take \u221a for r"],
      },
      {
        id: "ageo-con-parabola",
        name: "Parabola: Vertex, Focus & Directrix",
        boardFrequency: "high",
        template: ["Identify standard form: y\u00b2=4px (horizontal) or x\u00b2=4py (vertical)", "Find p (focus distance from vertex)", "Focus=(p,0) for horizontal; directrix x=\u2212p"],
        traps: ["Confusing horizontal (y\u00b2) and vertical (x\u00b2) parabolas", "Using 4p=coefficient without dividing by 4 to get p"],
      },
      {
        id: "ageo-con-ellipse-hyp",
        name: "Ellipse & Hyperbola Properties",
        boardFrequency: "high",
        template: ["Ellipse: c\u00b2=a\u00b2\u2212b\u00b2 (a>b); e=c/a<1", "Hyperbola: c\u00b2=a\u00b2+b\u00b2; e=c/a>1", "Latus rectum=2b\u00b2/a for both"],
        traps: ["Using c\u00b2=a\u00b2+b\u00b2 (hyperbola formula) for an ellipse", "Reporting e=b/a instead of c/a"],
      },
    ]
  },
  // Under math-diff
  { id: "diff-limits",      name: "Limits & Continuity",  level: 3, parentId: "math-diff", category: "MSTE" ,
    problemTypes: [
      {
        id: "diff-lim-factor",
        name: "Limits by Factoring (0/0 Form)",
        boardFrequency: "high",
        template: ["Identify 0/0 indeterminate form after substitution", "Factor numerator/denominator", "Cancel common factor; substitute limit value"],
        traps: ["Concluding limit is undefined without factoring first", "Cancelling incorrectly across addition/subtraction"],
      },
      {
        id: "diff-lim-lhopital",
        name: "L'H\u00f4pital's Rule",
        boardFrequency: "high",
        template: ["Confirm indeterminate form (0/0 or \u221e/\u221e)", "Differentiate numerator and denominator separately", "Re-evaluate limit; repeat if still indeterminate"],
        traps: ["Applying quotient rule instead of differentiating separately", "Forgetting to recheck indeterminate form after first application"],
      },
      {
        id: "diff-lim-infinity",
        name: "Limits at Infinity",
        boardFrequency: "high",
        template: ["Divide numerator and denominator by highest power of x", "Terms with 1/x\u207f \u2192 0 as x\u2192\u221e", "Leading coefficient ratio gives limit for equal degrees"],
        traps: ["Concluding limit is \u221e for rational functions when degrees are equal", "Not dividing by the highest degree before evaluating"],
      },
    ]
  },
  { id: "diff-derivatives", name: "Derivatives & Rules",  level: 3, parentId: "math-diff", category: "MSTE" ,
    problemTypes: [
      {
        id: "diff-der-power",
        name: "Power, Product & Quotient Rules",
        boardFrequency: "high",
        template: ["Power: d/dx[x\u207f]=nx\u207f\u207b\u00b9", "Product: (uv)'=u'v+uv'", "Quotient: (u/v)'=(u'v\u2212uv')/v\u00b2"],
        traps: ["Using quotient rule with numerator and denominator swapped: u'v/v\u00b2 instead of (u'v\u2212uv')/v\u00b2", "Forgetting to reduce exponent by 1 in power rule"],
      },
      {
        id: "diff-der-chain",
        name: "Chain Rule",
        boardFrequency: "high",
        template: ["Identify outer function f and inner function g", "dy/dx=f'(g(x))\u00b7g'(x)", "Work from outside in"],
        traps: ["Forgetting to multiply by the derivative of the inner function", "Applying chain rule to sums (it applies to compositions, not sums)"],
      },
      {
        id: "diff-der-kinematics",
        name: "Rates of Change in Engineering",
        boardFrequency: "high",
        template: ["Identify position, velocity, acceleration relationships", "v=ds/dt, a=dv/dt=d\u00b2s/dt\u00b2", "Evaluate derivative at given time/position"],
        traps: ["Finding the maximum of position when asked for max velocity (need v=0)", "Evaluating position function instead of velocity function"],
      },
    ]
  },
  { id: "diff-rules",       name: "Special Diff. Rules",  level: 3, parentId: "math-diff", category: "MSTE" ,
    problemTypes: [
      {
        id: "diff-rul-implicit",
        name: "Implicit Differentiation",
        boardFrequency: "high",
        template: ["Differentiate both sides w.r.t. x", "Apply chain rule to y terms: d/dx[y]=dy/dx", "Collect dy/dx terms; solve algebraically"],
        traps: ["Not applying chain rule to y: writing dy/dx[y\u00b2]=2y instead of 2y\u00b7dy/dx", "Forgetting the right-hand side when differentiating a constant (equals 0)"],
      },
      {
        id: "diff-rul-related",
        name: "Related Rates",
        boardFrequency: "high",
        template: ["Draw and label diagram with variables", "Write equation relating the variables", "Differentiate both sides w.r.t. time t", "Substitute known rates and values; solve for unknown rate"],
        traps: ["Substituting values before differentiating (premature substitution)", "Using derivative of constant values (given as fixed at that instant)"],
      },
      {
        id: "diff-rul-log",
        name: "Logarithmic Differentiation",
        boardFrequency: "medium",
        template: ["Take ln of both sides", "Differentiate implicitly", "Solve for dy/dx; substitute original y back"],
        traps: ["Applying power rule to variable-exponent functions (x\u02e3, etc.)", "Forgetting to multiply by y at the end"],
      },
    ]
  },
  { id: "diff-maxmin",      name: "Maxima & Minima",      level: 3, parentId: "math-diff", category: "MSTE" ,
    problemTypes: [
      {
        id: "diff-max-optim",
        name: "Optimization Problems",
        boardFrequency: "high",
        template: ["Build the objective function", "Express in one variable using constraint", "Set derivative = 0; solve", "Second derivative test to confirm max/min"],
        traps: ["Setting up the wrong objective function", "Not checking endpoints of domain", "Forgetting second derivative test (could be inflection point)"],
      },
      {
        id: "diff-max-raterelated",
        name: "Maximum/Minimum Applied Problems",
        boardFrequency: "high",
        template: ["Identify what to maximize/minimize (area, cost, time)", "Write constraint and objective", "Substitute constraint into objective; differentiate", "Verify physical feasibility of solution"],
        traps: ["Maximizing instead of minimizing (or vice versa)", "Using perimeter formula when area is requested"],
      },
      {
        id: "diff-max-critical",
        name: "Critical Points & Curve Sketching",
        boardFrequency: "medium",
        template: ["Find f'(x)=0 and where f'(x) is undefined", "Apply first or second derivative test", "Identify local max, local min, inflection points"],
        traps: ["Reporting inflection points as extrema", "Not testing both sides of critical point for first derivative test"],
      },
    ]
  },
  // Under math-int
  { id: "int-indefinite", name: "Indefinite Integrals",  level: 3, parentId: "math-int", category: "MSTE" ,
    problemTypes: [
      {
        id: "int-indef-basic",
        name: "Power Rule & Standard Forms",
        boardFrequency: "high",
        template: ["\u222bx\u207fdx=x\u207f\u207a\u00b9/(n+1)+C (n\u2260\u22121)", "\u222be\u02e3dx=e\u02e3+C; \u222bsin x dx=\u2212cos x+C", "Always add +C"],
        traps: ["Forgetting +C for indefinite integrals", "Using \u222bx\u207fdx=x\u207f\u207a\u00b9\u00b7n instead of x\u207f\u207a\u00b9/(n+1)"],
      },
      {
        id: "int-indef-usubst",
        name: "u-Substitution",
        boardFrequency: "high",
        template: ["Identify inner function u and its derivative du in the integrand", "Substitute; rewrite entirely in terms of u", "Integrate; back-substitute to original variable"],
        traps: ["Forgetting to substitute dx in terms of du", "Missing a constant factor when forming du"],
      },
      {
        id: "int-indef-byparts",
        name: "Integration by Parts",
        boardFrequency: "high",
        template: ["Choose u and dv using LIATE order (Log, Inverse trig, Algebraic, Trig, Exp)", "Apply \u222bu dv = uv \u2212 \u222bv du", "Repeat if needed; watch for cyclic cases"],
        traps: ["Choosing u and dv in wrong order (making integral more complex)", "Forgetting to differentiate u and integrate dv correctly"],
      },
    ]
  },
  { id: "int-definite",   name: "Definite Integrals",    level: 3, parentId: "math-int", category: "MSTE" ,
    problemTypes: [
      {
        id: "int-def-ftc",
        name: "Fundamental Theorem of Calculus",
        boardFrequency: "high",
        template: ["Find antiderivative F(x)", "Evaluate F(b)\u2212F(a)", "Include all terms; watch signs at lower limit"],
        traps: ["Only evaluating at upper limit; forgetting to subtract F(a)", "Sign error when evaluating at negative lower limit"],
      },
      {
        id: "int-def-engineering",
        name: "Engineering Applications (Work, Force)",
        boardFrequency: "high",
        template: ["Identify the variable force/pressure function", "Set up integral with correct limits", "Evaluate; include correct units"],
        traps: ["Using average force \u00d7 distance instead of integrating (only valid for linear functions)", "Wrong limits: using total length instead of displacement from reference"],
      },
      {
        id: "int-def-trig",
        name: "Definite Integrals of Trig Functions",
        boardFrequency: "medium",
        template: ["Apply antiderivative rules (\u222bsin=\u2212cos, \u222bcos=sin)", "Evaluate at limits using exact values", "Use identities to simplify if needed"],
        traps: ["Wrong sign: \u222bsin x dx = \u2212cos x, not +cos x", "Evaluating in degrees instead of radians"],
      },
    ]
  },
  { id: "int-area",       name: "Area by Integration",   level: 3, parentId: "math-int", category: "MSTE" ,
    problemTypes: [
      {
        id: "int-area-bounded",
        name: "Area Between Curves",
        boardFrequency: "high",
        template: ["Find intersection points (set f=g, solve for x)", "\u222b[f(x)\u2212g(x)]dx where f\u2265g on interval", "Split integral if curves cross within interval"],
        traps: ["Integrating with wrong function on top (getting negative area)", "Missing one intersection point as a limit"],
      },
      {
        id: "int-area-xaxis",
        name: "Area Under a Curve (x-axis reference)",
        boardFrequency: "high",
        template: ["Find x-intercepts (set y=0)", "Integrate |f(x)|dx (take absolute value for areas below x-axis)", "Split at x-intercepts if curve crosses x-axis"],
        traps: ["Integrating across a sign change and getting cancellation (net area \u2260 total area)", "Forgetting to split when function is negative in part of interval"],
      },
      {
        id: "int-area-symmetry",
        name: "Using Symmetry to Simplify",
        boardFrequency: "medium",
        template: ["Check if function/region is symmetric about y-axis or x-axis", "For even functions: A=2\u222b\u2080\u1d43 f(x)dx", "Saves computation; but verify symmetry first"],
        traps: ["Assuming symmetry without verification", "Using symmetry factor 2 when the function is odd (integral is zero)"],
      },
    ]
  },
  { id: "int-volume",     name: "Volume by Integration", level: 3, parentId: "math-int", category: "MSTE" ,
    problemTypes: [
      {
        id: "int-vol-disk",
        name: "Disk Method (revolution about x-axis)",
        boardFrequency: "high",
        template: ["V=\u03c0\u222b[f(x)]\u00b2dx from a to b", "Square the function (radius of disk)", "Ensure function is \u22650 on interval"],
        traps: ["Forgetting to square the radius", "Using washer formula (\u03c0\u222b(R\u00b2\u2212r\u00b2)) when there is no hole"],
      },
      {
        id: "int-vol-washer",
        name: "Washer Method",
        boardFrequency: "high",
        template: ["V=\u03c0\u222b[R(x)\u00b2\u2212r(x)\u00b2]dx", "R=outer radius (farther from axis), r=inner radius", "Find intersection points for limits"],
        traps: ["Subtracting radii then squaring: \u03c0\u222b(R\u2212r)\u00b2 instead of \u03c0\u222b(R\u00b2\u2212r\u00b2)", "Assigning inner/outer radius backwards"],
      },
      {
        id: "int-vol-shell",
        name: "Shell Method (revolution about y-axis)",
        boardFrequency: "high",
        template: ["V=2\u03c0\u222bx\u00b7f(x)dx from a to b", "Shell: circumference \u00d7 height \u00d7 thickness", "Use when disk/washer requires solving for x in terms of y"],
        traps: ["Forgetting the 2\u03c0 factor", "Using x\u00b7f(x) when revolving about x-axis (shell is for y-axis)"],
      },
    ]
  },
  // Under math-de
  { id: "de-firstorder", name: "First-Order ODEs",    level: 3, parentId: "math-de", category: "MSTE" ,
    problemTypes: [
      {
        id: "de-first-growth",
        name: "Exponential Growth & Decay Models",
        boardFrequency: "high",
        template: ["Write dN/dt=kN", "Solution: N=N\u2080e^(kt)", "Use given condition to find k; solve for unknown"],
        traps: ["Using linear model (N=N\u2080+kt) instead of exponential", "Forgetting to apply initial condition to find C"],
      },
      {
        id: "de-first-cooling",
        name: "Newton's Law of Cooling",
        boardFrequency: "high",
        template: ["dT/dt=k(T\u2212T_ambient)", "Solution: T=T_ambient+(T\u2080\u2212T_ambient)e^(kt)", "Find k from first given temperature; then solve for unknown time/temp"],
        traps: ["Forgetting to subtract ambient temperature (working with T directly instead of T\u2212T_ambient)", "Using T\u2080 as ambient temperature"],
      },
      {
        id: "de-first-linear-de",
        name: "Integrating Factor Method",
        boardFrequency: "medium",
        template: ["Write as dy/dx+P(x)y=Q(x)", "\u03bc=e^(\u222bP dx)", "Multiply through by \u03bc; integrate d(\u03bcy)/dx=\u03bcQ"],
        traps: ["Forgetting to multiply Q by \u03bc (right side)", "Incorrect integration of P(x) to find \u03bc"],
      },
    ]
  },
  { id: "de-separable",  name: "Separable Equations", level: 3, parentId: "math-de", category: "MSTE" ,
    problemTypes: [
      {
        id: "de-sep-basic",
        name: "Separation of Variables",
        boardFrequency: "high",
        template: ["Rearrange so all y terms with dy, all x terms with dx", "Integrate both sides", "Apply initial condition to find C"],
        traps: ["Separating incorrectly: moving y to wrong side", "Forgetting +C before applying IC (leads to wrong C value)"],
      },
      {
        id: "de-sep-exact",
        name: "Exact Equations",
        boardFrequency: "medium",
        template: ["Check: \u2202M/\u2202y = \u2202N/\u2202x", "Integrate M w.r.t. x; call result F(x,y)+g(y)", "Differentiate F w.r.t. y; set equal to N; solve for g'(y)", "Integrate g'(y) to get g(y); write F=C"],
        traps: ["Checking exactness incorrectly (comparing wrong partials)", "Forgetting to add g(y) when integrating M w.r.t. x"],
      },
      {
        id: "de-sep-mixing",
        name: "Mixing & Tank Problems",
        boardFrequency: "high",
        template: ["Rate in = (concentration in)\u00d7(flow rate in)", "Rate out = (Q/V)\u00d7(flow rate out)", "dQ/dt = rate in \u2212 rate out; solve separable/linear ODE"],
        traps: ["Using total concentration instead of Q/V for rate out", "Forgetting the initial condition (Q at t=0)"],
      },
    ]
  },
  { id: "de-linear",     name: "Linear ODEs",         level: 3, parentId: "math-de", category: "MSTE" ,
    problemTypes: [
      {
        id: "de-lin-second",
        name: "Second-Order Linear ODE (Constant Coefficients)",
        boardFrequency: "high",
        template: ["Write characteristic equation ar\u00b2+br+c=0", "Real distinct roots \u2192 C\u2081e^(r\u2081x)+C\u2082e^(r\u2082x)", "Repeated root \u2192 (C\u2081+C\u2082x)e^(rx)", "Complex roots \u03b1\u00b1\u03b2i \u2192 e^(\u03b1x)(C\u2081cos\u03b2x+C\u2082sin\u03b2x)"],
        traps: ["Using negative roots when equation has positive coefficients", "Confusing complex root solution with real exponential form"],
      },
      {
        id: "de-lin-ivp",
        name: "Initial Value Problems",
        boardFrequency: "high",
        template: ["Solve general equation to get y(t) with C\u2081,C\u2082", "Apply y(0)=a to get first equation", "Apply y'(0)=b to get second equation", "Solve system for C\u2081 and C\u2082"],
        traps: ["Applying IC before differentiating for y'(0)", "Arithmetic error solving 2\u00d72 system for constants"],
      },
      {
        id: "de-lin-vibration",
        name: "Spring-Mass & Vibration Problems",
        boardFrequency: "medium",
        template: ["Write my''+cy'+ky=F(t)", "Find natural frequency \u03c9\u2099=\u221a(k/m)", "Solve characteristic equation; identify damping type", "Apply physical initial conditions"],
        traps: ["Confusing underdamped/overdamped/critically damped conditions", "Using mass in kg without converting to consistent units"],
      },
    ]
  },
  // Under math-stat
  { id: "stat-prob",        name: "Basic Probability",             level: 3, parentId: "math-stat", category: "MSTE" ,
    problemTypes: [
      {
        id: "stat-prob-counting",
        name: "Counting Principles (P & C)",
        boardFrequency: "high",
        template: ["Permutation nPr=n!/(n\u2212r)! (order matters)", "Combination nCr=n!/(r!(n\u2212r)!) (order doesn't matter)", "Identify whether order matters"],
        traps: ["Using permutation when order doesn't matter (or vice versa)", "Using nCr formula with wrong values of n and r"],
      },
      {
        id: "stat-prob-addition",
        name: "Addition Rule",
        boardFrequency: "high",
        template: ["P(A\u222aB)=P(A)+P(B)\u2212P(A\u2229B)", "For mutually exclusive: P(A\u2229B)=0", "Always check if events can overlap"],
        traps: ["Adding probabilities without subtracting intersection (double counting)", "Assuming events are mutually exclusive without verification"],
      },
      {
        id: "stat-prob-complement",
        name: "Complement Rule",
        boardFrequency: "high",
        template: ["P(A')=1\u2212P(A)", "Use when 'at least one' or 'none' is involved", "P(at least one)=1\u2212P(none)"],
        traps: ["Directly computing 'at least one' (tedious) instead of using complement", "Confusing P(A) with P(A')"],
      },
    ]
  },
  { id: "stat-conditional", name: "Conditional Probability",       level: 3, parentId: "math-stat", category: "MSTE" ,
    problemTypes: [
      {
        id: "stat-cond-basic",
        name: "Conditional Probability",
        boardFrequency: "high",
        template: ["P(A|B)=P(A\u2229B)/P(B)", "Identify what is conditioned on (the 'given' event)", "For independent events: P(A|B)=P(A)"],
        traps: ["Confusing P(A|B) with P(B|A) (not commutative)", "Dividing by P(A) instead of P(B) in the denominator"],
      },
      {
        id: "stat-cond-bayes",
        name: "Bayes' Theorem",
        boardFrequency: "high",
        template: ["P(H|E)=P(E|H)P(H)/P(E)", "Compute P(E) using total probability: \u03a3P(E|H\u1d62)P(H\u1d62)", "Identify all mutually exclusive hypotheses"],
        traps: ["Base rate neglect: ignoring P(H) and just using P(E|H)", "Not computing the full denominator P(E)"],
      },
      {
        id: "stat-cond-independence",
        name: "Independent & Mutually Exclusive Events",
        boardFrequency: "high",
        template: ["Independent: P(A\u2229B)=P(A)\u00b7P(B)", "Mutually exclusive: P(A\u2229B)=0", "Verify independence before multiplying"],
        traps: ["Confusing independence with mutual exclusivity (they are different concepts)", "Multiplying probabilities without checking independence"],
      },
    ]
  },
  { id: "stat-central",     name: "Measures of Central Tendency",  level: 3, parentId: "math-stat", category: "MSTE" ,
    problemTypes: [
      {
        id: "stat-cen-mean",
        name: "Mean, Median & Mode Calculations",
        boardFrequency: "high",
        template: ["Mean: sum/n", "Median: middle value (odd n) or average of middle two (even n)", "Mode: most frequent value"],
        traps: ["Not sorting data before finding median", "Reporting mean when mode is asked (or vice versa)"],
      },
      {
        id: "stat-cen-weighted",
        name: "Weighted Mean",
        boardFrequency: "medium",
        template: ["x\u0304_w = \u03a3(w\u1d62x\u1d62)/\u03a3w\u1d62", "Weights represent frequency or importance", "Check: denominator = total weight, not count"],
        traps: ["Dividing by number of categories instead of total weight", "Treating all weights as equal when they differ"],
      },
      {
        id: "stat-cen-grouped",
        name: "Mean & Median for Grouped Data",
        boardFrequency: "medium",
        template: ["Use class midpoints for grouped mean: x\u0304=\u03a3fx/\u03a3f", "Median class: cumulative frequency reaches n/2", "Apply interpolation formula for median"],
        traps: ["Using class boundaries instead of class midpoints for mean", "Using n/2 rounded incorrectly for even sample sizes"],
      },
    ]
  },
  { id: "stat-deviation",   name: "Standard Deviation & Variance", level: 3, parentId: "math-stat", category: "MSTE" ,
    problemTypes: [
      {
        id: "stat-dev-calc",
        name: "Computing Variance & Standard Deviation",
        boardFrequency: "high",
        template: ["Compute mean first", "Deviations: (x\u1d62\u2212x\u0304)", "Sample: s\u00b2=\u03a3(x\u1d62\u2212x\u0304)\u00b2/(n\u22121); Population: \u03c3\u00b2=\u03a3(x\u1d62\u2212x\u0304)\u00b2/n", "s=\u221a(s\u00b2)"],
        traps: ["Dividing by n for sample variance (should be n\u22121)", "Squaring the sum of deviations instead of sum of squared deviations"],
      },
      {
        id: "stat-dev-zscore",
        name: "Z-Scores & Normal Distribution",
        boardFrequency: "high",
        template: ["z=(x\u2212\u03bc)/\u03c3", "Look up z-table for probability", "For 'between' problems: P(a<X<b)=P(z\u2082)\u2212P(z\u2081)"],
        traps: ["Using z=(\u03bc\u2212x)/\u03c3 (wrong sign)", "Reading the wrong tail from the z-table"],
      },
      {
        id: "stat-dev-empirical",
        name: "Empirical Rule & Outliers",
        boardFrequency: "medium",
        template: ["68% within \u03bc\u00b1\u03c3; 95% within \u03bc\u00b12\u03c3; 99.7% within \u03bc\u00b13\u03c3", "Outlier: typically >3\u03c3 from mean", "CV=s/x\u0304\u00d7100% for relative variability"],
        traps: ["Applying 68% to \u00b12\u03c3 (should be 95%)", "Confusing range with standard deviation"],
      },
    ]
  },
  // Under surv-plane
  { id: "plane-distance", name: "Distance Measurement", level: 3, parentId: "surv-plane", category: "MSTE" ,
    problemTypes: [
      {
        id: "plane-dist-tape",
        name: "Taping & Measurement Corrections",
        boardFrequency: "high",
        template: ["Apply corrections: temperature, pull, sag, slope, alignment", "Correction for temp: C_T=(T\u2212T_s)\u00d7\u03b1\u00d7L", "True length = measured length + all corrections (signed)"],
        traps: ["Wrong sign for correction (too long vs too short tape)", "Forgetting to convert temperature difference to correct units"],
      },
      {
        id: "plane-dist-edm",
        name: "EDM & Stadia Measurements",
        boardFrequency: "medium",
        template: ["Stadia horizontal distance: D=Ks\u00b7cos\u00b2\u03b8+C\u00b7cos\u03b8", "Vertical distance: V=\u00bdKs\u00b7sin2\u03b8", "Apply corrections for inclined sights"],
        traps: ["Using K=100, C=0 for most modern instruments without confirming", "Forgetting cos\u00b2 for horizontal distance in inclined stadia"],
      },
    ]
  },
  { id: "plane-angle",    name: "Angle Measurement",    level: 3, parentId: "surv-plane", category: "MSTE" ,
    problemTypes: [
      {
        id: "plane-ang-transit",
        name: "Traverse Angle Measurement",
        boardFrequency: "high",
        template: ["Interior angles sum: (n\u22122)\u00d7180\u00b0", "Exterior angles sum: n\u00d7360\u00b0", "Angular closure error = measured sum \u2212 theoretical sum"],
        traps: ["Using n\u00d7180\u00b0 for interior angle sum (missing the \u22122)", "Distributing closure error with wrong sign"],
      },
      {
        id: "plane-ang-bearing",
        name: "Bearing & Azimuth Conversions",
        boardFrequency: "high",
        template: ["Azimuth: measured clockwise from North (0\u00b0\u2013360\u00b0)", "Bearing: N/S angle E or W (0\u00b0\u201390\u00b0 max)", "S 35\u00b0 E \u2192 azimuth = 180\u00b0\u221235\u00b0 = 145\u00b0"],
        traps: ["Adding instead of subtracting for SE/NW quadrant conversions", "Back-bearing: add or subtract 180\u00b0 from forward azimuth"],
      },
    ]
  },
  { id: "plane-traverse", name: "Traverse Surveys",     level: 3, parentId: "surv-plane", category: "MSTE" ,
    problemTypes: [
      {
        id: "plane-trav-latdep",
        name: "Latitude & Departure Calculations",
        boardFrequency: "high",
        template: ["Latitude = L\u00b7cos(bearing angle from N/S)", "Departure = L\u00b7sin(bearing angle from N/S)", "N/E = positive; S/W = negative"],
        traps: ["Using sin for latitude and cos for departure (swapped)", "Wrong sign based on quadrant"],
      },
      {
        id: "plane-trav-bowditch",
        name: "Bowditch (Compass) Rule Adjustment",
        boardFrequency: "high",
        template: ["Correction per leg = \u2212(leg length/perimeter)\u00d7total error", "Apply to both latitude and departure", "Adjusted values = computed + correction"],
        traps: ["Not negating the correction (correction opposes the error)", "Using area instead of perimeter in denominator"],
      },
      {
        id: "plane-trav-area",
        name: "Area by DMD/DPD Method",
        boardFrequency: "high",
        template: ["DMD for first course = departure", "DMD for subsequent: previous DMD + previous dep + current dep", "Twice area = \u03a3(Latitude \u00d7 DMD); divide by 2"],
        traps: ["Forgetting to divide by 2 at the end", "Sign error in DMD computation for westward departures"],
      },
    ]
  },
  { id: "plane-leveling", name: "Leveling Operations",  level: 3, parentId: "surv-plane", category: "MSTE" ,
    problemTypes: [
      {
        id: "plane-lev-differential",
        name: "Differential Leveling",
        boardFrequency: "high",
        template: ["HI = elevation of instrument = BM elev + BS", "Elevation of point = HI \u2212 FS", "Check: \u03a3BS \u2212 \u03a3FS = ending BM \u2212 starting BM"],
        traps: ["Subtracting backsight instead of adding (HI = elev \u2212 BS)", "Confusing foresight (FS) and backsight (BS) signs"],
      },
      {
        id: "plane-lev-profile",
        name: "Profile Leveling & Grade",
        boardFrequency: "medium",
        template: ["Compute elevations along a route", "Grade = (elevation change / horizontal distance)\u00d7100%", "Cut/fill = proposed grade elevation \u2212 existing elevation"],
        traps: ["Using slope distance instead of horizontal distance for grade", "Positive grade = uphill in direction of chainage"],
      },
    ]
  },
  // Under surv-geo
  { id: "geo-coords",    name: "Geographic Coordinates",       level: 3, parentId: "surv-geo", category: "MSTE" ,
    problemTypes: [
      {
        id: "geo-coord-latlong",
        name: "Geographic Coordinate Computations",
        boardFrequency: "medium",
        template: ["Convert DMS to decimal degrees: DD=D+M/60+S/3600", "Arc length on sphere: d=R\u00b7\u03b8 (\u03b8 in radians)", "1 nautical mile = 1 minute of latitude"],
        traps: ["Using degrees directly instead of radians in arc length formula", "Confusing longitude difference with latitude difference for N-S distances"],
      },
      {
        id: "geo-coord-projection",
        name: "Map Projections & Grid Systems",
        boardFrequency: "low",
        template: ["Identify projection type (UTM, PCS)", "Apply grid-to-ground corrections (scale factor)", "PRS 92 for Philippines: Transverse Mercator"],
        traps: ["Using grid distance as ground distance without applying scale factor", "Mixing up northing/easting in coordinates"],
      },
    ]
  },
  { id: "geo-curvature", name: "Earth Curvature & Refraction", level: 3, parentId: "surv-geo", category: "MSTE" ,
    problemTypes: [
      {
        id: "geo-curv-correction",
        name: "Curvature & Refraction Correction",
        boardFrequency: "high",
        template: ["Curvature: C = 0.0785K\u00b2 (K in km)", "Refraction: r = 0.0112K\u00b2", "Combined: C\u2212r = 0.0673K\u00b2 (meter units)", "Apply as correction to leveling"],
        traps: ["Forgetting refraction partially offsets curvature", "Using K in meters instead of kilometers in the formula"],
      },
    ]
  },
  { id: "geo-gps",       name: "GPS & GNSS Methods",           level: 3, parentId: "surv-geo", category: "MSTE" ,
    problemTypes: [
      {
        id: "geo-gps-basic",
        name: "GPS Positioning Principles",
        boardFrequency: "low",
        template: ["Minimum 4 satellites for 3D position fix", "Pseudorange = speed of light \u00d7 travel time", "PDOP affects accuracy: lower = better"],
        traps: ["Confusing absolute positioning with differential GPS accuracy", "Assuming GPS gives ellipsoidal height = orthometric height (need geoid model)"],
      },
    ]
  },
  // Under surv-eng
  { id: "engsurvey-road",    name: "Route & Road Surveys",  level: 3, parentId: "surv-eng", category: "MSTE" ,
    problemTypes: [
      {
        id: "engsurvey-road-curve",
        name: "Road Route Survey Calculations",
        boardFrequency: "high",
        template: ["Compute PI (point of intersection) stationing", "Compute T, L, E, M for simple curve", "Determine BC and EC chainage: BC=PI\u2212T, EC=BC+L"],
        traps: ["Confusing T (tangent length from BC to PI) with L (arc length)", "Not adding/subtracting T correctly to get BC/EC stationing"],
      },
      {
        id: "engsurvey-road-earthwork",
        name: "Earthwork Volumes (Prismoidal)",
        boardFrequency: "high",
        template: ["Average-end-area: V=(L/2)(A\u2081+A\u2082)", "Prismoidal formula: V=(L/6)(A\u2081+4A\u2098+A\u2082)", "Prismoidal correction always reduces volume"],
        traps: ["Using average end area for prismoidal problems (overestimates)", "Computing A\u2098 using average dimensions, not area of middle section"],
      },
    ]
  },
  { id: "engsurvey-layout",  name: "Construction Layout",   level: 3, parentId: "surv-eng", category: "MSTE" ,
    problemTypes: [
      {
        id: "engsurvey-lay-stake",
        name: "Construction Stakeout",
        boardFrequency: "medium",
        template: ["Convert design coordinates to field angles and distances", "Use total station: set up over known point, backsight, turn angle, measure distance", "Verify with independent check point"],
        traps: ["Using grid coordinates without applying scale and rotation corrections", "Checking only one dimension (horizontal vs vertical)"],
      },
    ]
  },
  { id: "engsurvey-volumes", name: "Volume Computations",   level: 3, parentId: "surv-eng", category: "MSTE" ,
    problemTypes: [
      {
        id: "engsurvey-vol-masshaul",
        name: "Mass Haul Diagram",
        boardFrequency: "medium",
        template: ["Compute cumulative earthwork volumes (cut positive, fill negative)", "Plot cumulative volume vs chainage", "Free-haul limit determines borrow vs waste"],
        traps: ["Not applying shrinkage factor to fill volumes", "Reading mass haul ordinate at wrong station"],
      },
      {
        id: "engsurvey-vol-crosssec",
        name: "Cross-Section Area Computation",
        boardFrequency: "high",
        template: ["Plot ground points and proposed grade points", "Use coordinate method for irregular sections", "Level section: A=wd+(d\u00b2/2)\u00d7side slope factor"],
        traps: ["Using width alone without side slope correction for sloped terrain", "Wrong coordinate order in the shoelace formula"],
      },
    ]
  },
  // Under surv-comp
  { id: "comp-error",   name: "Error Propagation",            level: 3, parentId: "surv-comp", category: "MSTE" ,
    problemTypes: [
      {
        id: "comp-err-propagation",
        name: "Error Propagation",
        boardFrequency: "high",
        template: ["Sum of measurements: \u03c3_total=\u221a(\u03a3\u03c3\u1d62\u00b2)", "Product: \u03c3_Z/Z=\u221a((\u03c3_x/x)\u00b2+(\u03c3_y/y)\u00b2)", "For repeated measurements: \u03c3_mean=\u03c3/\u221an"],
        traps: ["Adding standard deviations directly instead of using root-sum-of-squares", "Confusing precision (\u03c3 of readings) with precision of mean"],
      },
    ]
  },
  { id: "comp-leastsq", name: "Least Squares Adjustment",     level: 3, parentId: "surv-comp", category: "MSTE" ,
    problemTypes: [
      {
        id: "comp-ls-adjustment",
        name: "Least Squares Adjustment",
        boardFrequency: "medium",
        template: ["Set up observation equations (Ax=b form)", "Normal equations: A\u1d40Ax=A\u1d40b", "Solve for unknowns; compute residuals v=Ax\u2212b"],
        traps: ["Forgetting to weight observations by their reliability", "Setting up matrices with wrong number of unknowns vs observations"],
      },
    ]
  },
  { id: "comp-bearing", name: "Bearing & Azimuth Conversion", level: 3, parentId: "surv-comp", category: "MSTE" ,
    problemTypes: [
      {
        id: "comp-bear-compute",
        name: "Forward & Back Bearing Computation",
        boardFrequency: "high",
        template: ["Forward bearing from coords: \u03b8=arctan(\u0394E/\u0394N); adjust for quadrant", "Back bearing = forward bearing \u00b1 180\u00b0", "Azimuth to bearing: depends on quadrant"],
        traps: ["Using arctan(\u0394N/\u0394E) instead of arctan(\u0394E/\u0394N)", "Forgetting quadrant check when computing bearing from arctan"],
      },
    ]
  },
  // Under trans-hwy
  { id: "hwy-design", name: "Horizontal & Vertical Curves", level: 3, parentId: "trans-hwy", category: "MSTE" ,
    problemTypes: [
      {
        id: "hwy-horiz-elements",
        name: "Simple Horizontal Curve Elements",
        boardFrequency: "high",
        template: ["T=R\u00b7tan(I/2)", "L=R\u03b8=\u03c0RI/180", "M=R(1\u2212cos(I/2)); E=R(sec(I/2)\u22121)", "Stationing: PC=PI\u2212T, PT=PC+L"],
        traps: ["Using T=R\u00b7tan(I) instead of R\u00b7tan(I/2)", "Degree of curve vs radius confusion (arc definition: R=5729.58/D)"],
      },
      {
        id: "hwy-vert-curve",
        name: "Parabolic Vertical Curve",
        boardFrequency: "high",
        template: ["Rate of grade change r=(g\u2082\u2212g\u2081)/L", "Elevation at station x from VPC: y=VPC_elev+g\u2081x+rx\u00b2/2", "Highest/lowest point: x=\u2212g\u2081/r from VPC"],
        traps: ["Using g values as percentages (not decimals) in formulas", "Using x from PVI instead of from VPC"],
      },
      {
        id: "hwy-spiral",
        name: "Spiral Transition Curves",
        boardFrequency: "medium",
        template: ["Minimum spiral length for design speed", "\u03b8\u209b=Ls/2R (in radians)", "Shift p=Ls\u00b2/24R; tangent shift k=Ls/2\u2212Ls\u00b3/240R\u00b2"],
        traps: ["Confusing spiral angle with deflection angle", "Using degree of curve instead of radius in spiral formulas"],
      },
    ]
  },
  { id: "hwy-super",  name: "Superelevation & Widening",    level: 3, parentId: "trans-hwy", category: "MSTE" ,
    problemTypes: [
      {
        id: "hwy-super-rate",
        name: "Superelevation Rate & Runoff",
        boardFrequency: "high",
        template: ["e_max from DPWH standards (usually 8\u201310%)", "e=V\u00b2/(127R) for full superelevation", "Runoff length: transition from normal crown to full e"],
        traps: ["Using e in decimal form where percent is required (or vice versa)", "Forgetting that runoff length is applied before the curve begins"],
      },
    ]
  },
  { id: "hwy-sight",  name: "Sight Distance",               level: 3, parentId: "trans-hwy", category: "MSTE" ,
    problemTypes: [
      {
        id: "hwy-sight-ssd",
        name: "Stopping Sight Distance",
        boardFrequency: "high",
        template: ["SSD=0.278Vt+V\u00b2/(254f) (V in kph, f=friction coefficient)", "Break reaction distance + braking distance", "Compare to available sight distance on crest/sag curves"],
        traps: ["Using V in m/s instead of kph in the formula", "Forgetting to account for both reaction time and braking distance"],
      },
      {
        id: "hwy-sight-psd",
        name: "Passing Sight Distance",
        boardFrequency: "medium",
        template: ["PSD\u22487\u00d7SSD (rule of thumb)", "Exact: sum of four distance components (d1+d2+d3+d4)", "Applies to 2-lane roads only"],
        traps: ["Using SSD where PSD is required (PSD is much longer)", "Applying PSD to divided highways"],
      },
    ]
  },
  // Under trans-traf
  { id: "traf-flow",   name: "Traffic Flow Theory",   level: 3, parentId: "trans-traf", category: "MSTE" ,
    problemTypes: [
      {
        id: "traf-flow-fundamental",
        name: "Fundamental Traffic Flow Equation",
        boardFrequency: "high",
        template: ["q=k\u00b7v (flow=density\u00d7speed)", "q in veh/hr, k in veh/km, v in km/hr", "Space mean speed vs time mean speed distinction"],
        traps: ["Confusing space mean speed (harmonic mean) with time mean speed (arithmetic mean)", "Using wrong units: mixing veh/hr with veh/min"],
      },
      {
        id: "traf-flow-greenshields",
        name: "Greenshields Model",
        boardFrequency: "medium",
        template: ["v=v_f(1\u2212k/k_j)", "q=v_f\u00b7k\u2212(v_f/k_j)k\u00b2", "Max flow q_max=v_f\u00b7k_j/4 at k=k_j/2"],
        traps: ["Using k_j (jam density) where k is required", "Not recognizing parabolic q-k relationship"],
      },
    ]
  },
  { id: "traf-los",    name: "Level of Service",      level: 3, parentId: "trans-traf", category: "MSTE" ,
    problemTypes: [
      {
        id: "traf-los-v/c",
        name: "Volume-to-Capacity Ratio & LOS",
        boardFrequency: "high",
        template: ["v/c ratio determines LOS (A\u2013F)", "LOS A: free flow (v/c<0.35), LOS F: breakdown (v/c>1.0)", "PHF=hourly volume/(4\u00d7peak 15-min volume)"],
        traps: ["Using daily volume instead of peak-hour volume for v/c", "Ignoring peak-hour factor (PHF) adjustment"],
      },
    ]
  },
  { id: "traf-signal", name: "Signal Timing & Design",level: 3, parentId: "trans-traf", category: "MSTE" ,
    problemTypes: [
      {
        id: "traf-sig-webster",
        name: "Webster's Optimal Cycle Length",
        boardFrequency: "high",
        template: ["C\u2080=(1.5L+5)/(1\u2212\u03a3Y\u1d62) where L=total lost time", "Y=critical flow ratio per phase = q/s", "Allocate green time: g\u1d62=(Y\u1d62/\u03a3Y)(C\u2212L)"],
        traps: ["Forgetting to subtract total lost time L from effective green", "Using total flow instead of critical flow ratio Y per phase"],
      },
    ]
  },
  // Under trans-pave
  { id: "pave-flex",  name: "Flexible Pavement Design",  level: 3, parentId: "trans-pave", category: "MSTE" ,
    problemTypes: [
      {
        id: "pave-flex-aashto",
        name: "AASHTO Flexible Pavement Design",
        boardFrequency: "high",
        template: ["Compute design ESAL (18-kip equivalent)", "Select structural number SN using CBR/Mr chart", "Determine layer thicknesses using SN=\u03a3a\u1d62h\u1d62"],
        traps: ["Using total traffic volume instead of design ESAL", "Computing SN from layer thicknesses without layer coefficients a\u1d62"],
      },
      {
        id: "pave-flex-cbr",
        name: "CBR & Subgrade Strength",
        boardFrequency: "high",
        template: ["CBR from lab or field testing", "Mr (psi)=1500\u00d7CBR (for fine-grained soils)", "Higher CBR \u2192 thinner required pavement"],
        traps: ["Using CBR value directly in structural number formula", "Confusing soaked vs unsoaked CBR"],
      },
    ]
  },
  { id: "pave-rigid", name: "Rigid Pavement Design",     level: 3, parentId: "trans-pave", category: "MSTE" ,
    problemTypes: [
      {
        id: "pave-rigid-westergaard",
        name: "Rigid Pavement Slab Design",
        boardFrequency: "high",
        template: ["Compute radius of relative stiffness l=(Eh\u00b3/12(1\u2212\u03bc\u00b2)k)^0.25", "Corner, edge, interior loading conditions have different stress formulas", "Modulus of subgrade reaction k from plate load test"],
        traps: ["Using wrong loading position formula (corner vs edge vs interior)", "Not accounting for load transfer coefficient"],
      },
      {
        id: "pave-rigid-joints",
        name: "Joint Design & Spacing",
        boardFrequency: "medium",
        template: ["Contraction joints: prevent random cracking (6\u20139 m spacing)", "Expansion joints: allow thermal expansion (larger spacing)", "Dowel bars transfer load at transverse joints"],
        traps: ["Confusing contraction and expansion joint purpose", "Computing joint spacing from temperature range without considering frictional resistance"],
      },
    ]
  },
  { id: "pave-load",  name: "Load Equivalency Factors",  level: 3, parentId: "trans-pave", category: "MSTE" ,
    problemTypes: [
      {
        id: "pave-load-esal",
        name: "Equivalent Single Axle Load (ESAL)",
        boardFrequency: "high",
        template: ["LEF=(axle load/18,000)^n (n\u22484 for flexible)", "ESAL=\u03a3(trucks\u00d7LEF\u00d7trips\u00d7growth factor)", "Use truck factor from AASHTO tables for mixed traffic"],
        traps: ["Using total vehicle count instead of trucks-only for ESAL", "Applying wrong load equivalency exponent for pavement type"],
      },
    ]
  },
  // Under hyd-prop
  { id: "prop-density",   name: "Density & Specific Weight", level: 3, parentId: "hyd-prop", category: "HGE" ,
    problemTypes: [
      {
        id: "prop-den-basic",
        name: "Density, Unit Weight & SG Conversions",
        boardFrequency: "high",
        template: ["\u03c1=mass/volume (kg/m\u00b3)", "\u03b3=\u03c1g (kN/m\u00b3 with g=9.81)", "SG=\u03c1_substance/\u03c1_water=\u03b3_substance/\u03b3_water"],
        traps: ["Using \u03b3=9.81 kN/m\u00b3 for all fluids (that is water; use SG\u00d79.81 for others)", "Confusing mass density (kg/m\u00b3) with unit weight (kN/m\u00b3)"],
      },
    ]
  },
  { id: "prop-viscosity", name: "Viscosity",                 level: 3, parentId: "hyd-prop", category: "HGE" ,
    problemTypes: [
      {
        id: "prop-visc-newtons",
        name: "Newton's Law of Viscosity",
        boardFrequency: "medium",
        template: ["\u03c4=\u03bc(du/dy) \u2014 shear stress = dynamic viscosity \u00d7 velocity gradient", "Kinematic viscosity \u03bd=\u03bc/\u03c1", "Check units: \u03bc in Pa\u00b7s, \u03bd in m\u00b2/s"],
        traps: ["Confusing dynamic (\u03bc) with kinematic (\u03bd) viscosity", "Wrong units: using cP without converting to Pa\u00b7s (1 cP=0.001 Pa\u00b7s)"],
      },
    ]
  },
  { id: "prop-sg",        name: "Specific Gravity",          level: 3, parentId: "hyd-prop", category: "HGE" ,
    problemTypes: [
      {
        id: "prop-sg-compute",
        name: "Specific Gravity Applications",
        boardFrequency: "high",
        template: ["SG=weight in air/(weight in air\u2212weight in water)", "For blended fluids: weighted average SG", "Use SG to compute unit weight: \u03b3=SG\u00d79.81 kN/m\u00b3"],
        traps: ["Dividing by weight in water instead of buoyant force", "Using SG of water=1.0 for saltwater problems (use 1.025)"],
      },
    ]
  },
  // Under hyd-stat
  { id: "fstat-pressure",  name: "Hydrostatic Pressure",  level: 3, parentId: "hyd-stat", category: "HGE" ,
    problemTypes: [
      {
        id: "fstat-pres-hydrostatic",
        name: "Hydrostatic Pressure & Force on Surfaces",
        boardFrequency: "high",
        template: ["p=\u03b3h\u0304 (pressure at centroid depth)", "F=\u03b3h\u0304A", "Center of pressure: y_p=\u0233+I_G/(\u0233A)"],
        traps: ["Using depth to bottom (not centroid) for h\u0304", "Wrong I_G formula: use bh\u00b3/12 (centroidal), not bh\u00b3/3 (base)"],
      },
      {
        id: "fstat-pres-manometer",
        name: "Manometer Pressure Calculations",
        boardFrequency: "high",
        template: ["Start from one open end; work toward unknown pressure", "+ \u03b3h going down; \u2212 \u03b3h going up", "Sum all pressure increments = gauge pressure at end"],
        traps: ["Wrong sign when traversing up vs down in fluid columns", "Using same \u03b3 for different fluids in the manometer"],
      },
    ]
  },
  { id: "fstat-manometer", name: "Manometry",             level: 3, parentId: "hyd-stat", category: "HGE" ,
    problemTypes: [
      {
        id: "fstat-man-compound",
        name: "Compound Manometer Analysis",
        boardFrequency: "high",
        template: ["Label all fluid interfaces", "Write pressure equality at same horizontal level in same fluid", "Traverse step by step from known to unknown"],
        traps: ["Equating pressures across different fluid types at the same elevation", "Forgetting to convert column heights to pressure with correct \u03b3"],
      },
    ]
  },
  { id: "fstat-buoyancy",  name: "Buoyancy & Floatation", level: 3, parentId: "hyd-stat", category: "HGE" ,
    problemTypes: [
      {
        id: "fstat-buoy-archimedes",
        name: "Buoyancy & Floatation",
        boardFrequency: "high",
        template: ["F_B=\u03b3_fluid\u00d7V_displaced", "For floating: F_B=W_object \u2192 \u03b3_f\u00b7V_sub=\u03b3_obj\u00b7V_total", "Metacentric height GM for stability: GM>0 (stable)"],
        traps: ["Using total volume instead of submerged volume for partial submersion", "Confusing V_displaced with V_object when fully vs partially submerged"],
      },
      {
        id: "fstat-buoy-stability",
        name: "Stability of Floating Bodies",
        boardFrequency: "medium",
        template: ["BM=I/V_sub (I = second moment of waterplane area)", "GM=BM\u2212BG (G above B means BG positive)", "GM>0 \u2192 stable; GM<0 \u2192 unstable"],
        traps: ["Using volume of body instead of volume of displaced fluid", "Signing BG incorrectly based on relative position of B and G"],
      },
    ]
  },
  // Under hyd-dyn
  { id: "dyn-bernoulli",  name: "Bernoulli's Equation", level: 3, parentId: "hyd-dyn", category: "HGE" ,
    problemTypes: [
      {
        id: "dyn-bern-apply",
        name: "Bernoulli Equation Applications",
        boardFrequency: "high",
        template: ["p\u2081/\u03b3+V\u2081\u00b2/2g+z\u2081 = p\u2082/\u03b3+V\u2082\u00b2/2g+z\u2082+h_L", "Apply continuity first to find unknown velocities", "Include elevation head for non-horizontal flow"],
        traps: ["Forgetting elevation head in non-horizontal pipe problems", "Using \u03c1 where \u03b3 is needed (or forgetting to divide by g)"],
      },
      {
        id: "dyn-bern-torricelli",
        name: "Orifice & Nozzle Discharge",
        boardFrequency: "high",
        template: ["V=Cv\u221a(2gh) \u2014 theoretical velocity corrected by Cv", "Q=Cc\u00b7Cd\u00b7A\u2080\u221a(2gh) \u2014 where Cd=Cv\u00d7Cc", "For large tanks: assume V\u2081\u22480"],
        traps: ["Using Q=A\u2080\u221a(2gh) without discharge coefficient Cd", "Not assuming upstream velocity is zero for large tank problems"],
      },
    ]
  },
  { id: "dyn-continuity", name: "Continuity Equation",  level: 3, parentId: "hyd-dyn", category: "HGE" ,
    problemTypes: [
      {
        id: "dyn-cont-pipe",
        name: "Continuity in Pipe Systems",
        boardFrequency: "high",
        template: ["A\u2081V\u2081=A\u2082V\u2082 (incompressible flow)", "A=\u03c0d\u00b2/4", "Velocity increases when area decreases"],
        traps: ["Using diameter ratio instead of area ratio: V\u2082=V\u2081\u00d7(d\u2081/d\u2082) (wrong; should be (d\u2081/d\u2082)\u00b2)", "Forgetting the \u00b2 when computing area ratio from diameter"],
      },
    ]
  },
  { id: "dyn-energy",     name: "Energy & Momentum",    level: 3, parentId: "hyd-dyn", category: "HGE" ,
    problemTypes: [
      {
        id: "dyn-energy-headloss",
        name: "Energy Equation with Head Loss",
        boardFrequency: "high",
        template: ["H_1=H_2+h_L (total head upstream = downstream + losses)", "Add pump head H_p; subtract turbine head H_t", "Head = p/\u03b3 + V\u00b2/2g + z"],
        traps: ["Confusing head loss as energy added (should be subtracted on downstream side)", "Not identifying pump or turbine in the flow path"],
      },
    ]
  },
  // Under hyd-pipe
  { id: "pipe-darcyw",   name: "Darcy-Weisbach Equation", level: 3, parentId: "hyd-pipe", category: "HGE" ,
    problemTypes: [
      {
        id: "pipe-darcy-hf",
        name: "Darcy-Weisbach Head Loss",
        boardFrequency: "high",
        template: ["h_f=f\u00b7L\u00b7V\u00b2/(D\u00b72g) or h_f=f\u00b7L\u00b7Q\u00b2/(D\u00b72g\u00b7(\u03c0D\u00b2/4)\u00b2)", "Find f from Moody diagram using Re and \u03b5/D", "Re=VD/\u03bd; for turbulent fully rough: use Colebrook-White"],
        traps: ["Forgetting to square velocity in Darcy formula", "Using Hazen-Williams coefficient C where Darcy f is needed"],
      },
      {
        id: "pipe-darcy-hazenwilliams",
        name: "Hazen-Williams Formula",
        boardFrequency: "high",
        template: ["V=0.8492\u00b7C\u00b7R^0.63\u00b7S^0.54 (SI)", "Q=0.2785\u00b7C\u00b7D^2.63\u00b7S^0.54", "Apply for water distribution; not valid for non-water fluids"],
        traps: ["Using in-consistent units (mixing English and SI)", "Applying to fluids other than water at normal temperature"],
      },
    ]
  },
  { id: "pipe-minor",    name: "Minor Head Losses",       level: 3, parentId: "hyd-pipe", category: "HGE" ,
    problemTypes: [
      {
        id: "pipe-min-losses",
        name: "Minor (Local) Head Losses",
        boardFrequency: "high",
        template: ["h_m=K\u00b7V\u00b2/2g (K = loss coefficient)", "Sudden expansion: K=(1\u2212A\u2081/A\u2082)\u00b2", "Sudden contraction: K\u22480.5 (rule of thumb)", "Exit loss K=1.0; entrance K=0.5"],
        traps: ["Forgetting exit loss (K=1.0) at pipe discharge into reservoir", "Using wrong V (upstream vs downstream) in the formula"],
      },
    ]
  },
  { id: "pipe-networks", name: "Pipe Networks",           level: 3, parentId: "hyd-pipe", category: "HGE" ,
    problemTypes: [
      {
        id: "pipe-net-hardy",
        name: "Hardy-Cross Method",
        boardFrequency: "high",
        template: ["Assume initial flows satisfying continuity at each node", "Compute head loss in each pipe", "Correction \u0394Q=\u2212\u03a3hL/(n\u03a3|hL/Q|) per loop", "Iterate until \u0394Q converges"],
        traps: ["Wrong sign convention for loop flows (clockwise positive)", "Not satisfying continuity (\u03a3Q=0 at nodes) in initial assumption"],
      },
      {
        id: "pipe-net-parallel",
        name: "Pipes in Parallel",
        boardFrequency: "high",
        template: ["Head loss is equal in all parallel branches", "Q_total=\u03a3Q\u1d62 for each parallel path", "Solve using h_f equations simultaneously"],
        traps: ["Setting equal flows instead of equal head losses in parallel pipes", "Using series formula (adding head losses) for parallel pipes"],
      },
    ]
  },
  // Under hyd-open
  { id: "open-manning",       name: "Manning's Equation", level: 3, parentId: "hyd-open", category: "HGE" ,
    problemTypes: [
      {
        id: "open-man-velocity",
        name: "Manning's Equation for Velocity & Discharge",
        boardFrequency: "high",
        template: ["V=(1/n)\u00b7R^(2/3)\u00b7S^(1/2)", "R=A/P (hydraulic radius)", "Q=V\u00b7A"],
        traps: ["Using depth as hydraulic radius instead of A/P", "Forgetting to compute P correctly for non-rectangular sections"],
      },
      {
        id: "open-man-efficient",
        name: "Most Efficient Cross-Section",
        boardFrequency: "high",
        template: ["Rectangle: b=2y (width = twice depth)", "Trapezoid: half-hexagon; side slope z=1/\u221a3", "Circle: flows at D=0.938\u00b7D_full for max discharge"],
        traps: ["Confusing most efficient (hydraulic) with most economic (cost) section", "Rectangle: using b=y instead of b=2y"],
      },
    ]
  },
  { id: "open-critical",      name: "Critical Flow",      level: 3, parentId: "hyd-open", category: "HGE" ,
    problemTypes: [
      {
        id: "open-crit-froude",
        name: "Froude Number & Flow Classification",
        boardFrequency: "high",
        template: ["Fr=V/\u221a(gD) where D=A/T (hydraulic depth)", "Fr<1: subcritical (tranquil); Fr>1: supercritical (rapid); Fr=1: critical", "Critical depth: minimize specific energy"],
        traps: ["Using flow depth y instead of hydraulic depth D=A/T for non-rectangular sections", "Confusing subcritical with supercritical flow behavior"],
      },
      {
        id: "open-crit-depth",
        name: "Critical Depth Calculation",
        boardFrequency: "high",
        template: ["Rectangular: y_c=(q\u00b2/g)^(1/3) where q=Q/b", "Q\u00b2/g=A\u00b3/T at critical flow", "Minimum specific energy at critical depth: E_min=1.5y_c (rectangular)"],
        traps: ["Using total Q instead of unit discharge q for rectangular channels", "Applying rectangular critical depth formula to trapezoidal channels"],
      },
    ]
  },
  { id: "open-hydraulicjump", name: "Hydraulic Jump",     level: 3, parentId: "hyd-open", category: "HGE" ,
    problemTypes: [
      {
        id: "open-jump-seq",
        name: "Sequent Depths & Energy Loss",
        boardFrequency: "high",
        template: ["y\u2082/y\u2081=\u00bd(\u221a(1+8Fr\u2081\u00b2)\u22121)", "Energy loss: \u0394E=(y\u2082\u2212y\u2081)\u00b3/(4y\u2081y\u2082)", "Jump occurs from supercritical \u2192 subcritical"],
        traps: ["Using Fr\u2082 instead of Fr\u2081 in the sequent depth formula", "Forgetting that hydraulic jump always goes from super to subcritical"],
      },
    ]
  },
  // Under hyd-hydro
  { id: "hydro-runoff",     name: "Runoff Estimation",        level: 3, parentId: "hyd-hydro", category: "HGE" ,
    problemTypes: [
      {
        id: "hydro-runoff-rational",
        name: "Rational Method (Peak Runoff)",
        boardFrequency: "high",
        template: ["Q=CiA (C=runoff coefficient, i=rainfall intensity, A=area)", "Q in m\u00b3/s: Q=CiA/360 (A in ha, i in mm/hr)", "Use concentration time tc to find design storm intensity"],
        traps: ["Forgetting unit conversion: Q=CiA/360 (not Q=CiA) in metric", "Using a single C value when catchment has mixed land use (weight by area)"],
      },
      {
        id: "hydro-runoff-scs",
        name: "SCS Curve Number Method",
        boardFrequency: "medium",
        template: ["S=25400/CN\u2212254 (S in mm)", "Runoff Q_r=(P\u22120.2S)\u00b2/(P+0.8S) for P>0.2S", "Select CN based on land use and hydrologic soil group"],
        traps: ["Using P in inches in metric formula (or vice versa)", "Using CN for wrong antecedent moisture condition"],
      },
    ]
  },
  { id: "hydro-hydrograph", name: "Hydrograph Analysis",      level: 3, parentId: "hyd-hydro", category: "HGE" ,
    problemTypes: [
      {
        id: "hydro-hydro-unithydro",
        name: "Unit Hydrograph Method",
        boardFrequency: "high",
        template: ["UH ordinate \u00d7 rainfall excess depth = storm hydrograph ordinate", "Superposition for multi-period storms (lag by time interval)", "Add base flow to get total stream flow"],
        traps: ["Forgetting to lag unit hydrographs for subsequent time periods", "Not adding base flow to the computed direct runoff hydrograph"],
      },
    ]
  },
  { id: "hydro-flood",      name: "Flood Frequency Analysis", level: 3, parentId: "hyd-hydro", category: "HGE" ,
    problemTypes: [
      {
        id: "hydro-flood-freq",
        name: "Flood Frequency Analysis",
        boardFrequency: "medium",
        template: ["Rank annual maxima; compute return period T=n/(m) or (n+1)/m", "Log-Pearson Type III or Gumbel distribution for fitting", "Q_T=x\u0304+K\u00b7s (K from frequency factor table)"],
        traps: ["Using T=n/m instead of (n+1)/m for Weibull plotting position", "Confusing 100-year flood as occurring exactly once every 100 years"],
      },
    ]
  },
  // Under hyd-mach
  { id: "mach-pumps",    name: "Pumps & Pump Selection", level: 3, parentId: "hyd-mach", category: "HGE" ,
    problemTypes: [
      {
        id: "mach-pump-power",
        name: "Pump Power & Efficiency",
        boardFrequency: "high",
        template: ["Water power P_w=\u03b3QH (kW)", "Brake power P_b=P_w/\u03b7 (motor input)", "TDH=static head+friction losses+velocity head"],
        traps: ["Forgetting to include both suction and discharge static heads in TDH", "Using efficiency as a multiplier instead of divisor: P_b=\u03b7\u00b7P_w (wrong)"],
      },
      {
        id: "mach-pump-cavitation",
        name: "Cavitation & NPSH",
        boardFrequency: "medium",
        template: ["NPSH_A=p_atm/\u03b3\u2212z_s\u2212h_fs\u2212p_v/\u03b3", "Must have NPSH_A>NPSH_R", "Limit suction head to avoid cavitation"],
        traps: ["Forgetting vapor pressure p_v term in NPSH calculation", "Using absolute instead of gauge pressure in suction head"],
      },
    ]
  },
  { id: "mach-turbines", name: "Turbines",               level: 3, parentId: "hyd-mach", category: "HGE" ,
    problemTypes: [
      {
        id: "mach-turb-type",
        name: "Turbine Selection & Efficiency",
        boardFrequency: "medium",
        template: ["Pelton: high head, low flow (impulse)", "Francis: medium head and flow (reaction)", "Kaplan: low head, high flow (propeller)", "P=\u03b3QH\u03b7 (turbine power output)"],
        traps: ["Using gross head without subtracting losses for net head", "Confusing impulse (Pelton) and reaction turbine operating principles"],
      },
    ]
  },
  { id: "mach-affinity", name: "Affinity Laws",          level: 3, parentId: "hyd-mach", category: "HGE" ,
    problemTypes: [
      {
        id: "mach-aff-laws",
        name: "Pump Affinity Laws",
        boardFrequency: "high",
        template: ["Q\u2082/Q\u2081=N\u2082/N\u2081 (flow proportional to speed)", "H\u2082/H\u2081=(N\u2082/N\u2081)\u00b2 (head proportional to speed\u00b2)", "P\u2082/P\u2081=(N\u2082/N\u2081)\u00b3 (power proportional to speed\u00b3)"],
        traps: ["Squaring the speed ratio for flow instead of using linear ratio", "Cubing speed ratio for head instead of power"],
      },
    ]
  },
  // Under geo-basic
  { id: "soil-index",     name: "Index Properties",            level: 3, parentId: "geo-basic", category: "HGE" ,
    problemTypes: [
      {
        id: "soil-idx-phase",
        name: "Phase Diagram Calculations",
        boardFrequency: "high",
        template: ["Assume Vs=1 or Vt=1 as convenient basis", "Compute e=Vv/Vs, n=Vv/Vt", "w=Ww/Ws, S=Vw/Vv, \u03b3_d=Ws/Vt"],
        traps: ["Mixing up void ratio e (=Vv/Vs) and porosity n (=Vv/Vt)", "Using weight relationships where volume relationships are needed"],
      },
    ]
  },
  { id: "soil-weight",    name: "Weight-Volume Relationships", level: 3, parentId: "geo-basic", category: "HGE" ,
    problemTypes: [
      {
        id: "soil-wv-relations",
        name: "Weight-Volume Interrelationships",
        boardFrequency: "high",
        template: ["\u03b3=Gs\u00b7\u03b3_w\u00b7(1+w)/(1+e)", "\u03b3_d=Gs\u00b7\u03b3_w/(1+e)", "Se=Gs\u00b7w (fundamental identity)"],
        traps: ["Inverting the formula: using (1+e) as numerator instead of denominator", "Using w as decimal in Se=Gs\u00b7w then multiplying by 100 (should keep consistent)"],
      },
      {
        id: "soil-wv-submerged",
        name: "Submerged/Buoyant Unit Weight",
        boardFrequency: "high",
        template: ["\u03b3'=\u03b3_sat\u2212\u03b3_w", "\u03b3_sat=(Gs+e)\u00b7\u03b3_w/(1+e)", "Use \u03b3' for soil below water table in stress calculations"],
        traps: ["Using total unit weight instead of buoyant unit weight below water table", "Subtracting \u03b3_w from \u03b3_d instead of \u03b3_sat"],
      },
    ]
  },
  { id: "soil-atterberg", name: "Atterberg Limits",            level: 3, parentId: "geo-basic", category: "HGE" ,
    problemTypes: [
      {
        id: "soil-att-pi",
        name: "Plasticity Index & Consistency",
        boardFrequency: "high",
        template: ["PI=LL\u2212PL (plasticity index)", "LI=(w\u2212PL)/PI (liquidity index)", "Higher PI \u2192 more plastic/compressible clay"],
        traps: ["Using PL\u2212LL (getting negative PI)", "Confusing liquidity index (LI) with plasticity index (PI)"],
      },
      {
        id: "soil-att-activity",
        name: "Activity & Soil Classification",
        boardFrequency: "medium",
        template: ["Activity A=PI/%clay fraction", "Inactive: A<0.75; Normal: 0.75\u20131.25; Active: A>1.25", "Montmorillonite is highly active; kaolinite is inactive"],
        traps: ["Using total fines % instead of clay fraction in denominator", "Misidentifying soil activity class from Activity value"],
      },
    ]
  },
  // Under geo-class
  { id: "class-uscs",   name: "USCS Classification",   level: 3, parentId: "geo-class", category: "HGE" ,
    problemTypes: [
      {
        id: "class-uscs-system",
        name: "USCS Classification Procedure",
        boardFrequency: "high",
        template: ["Check if >50% passes #200 sieve (fine-grained: M or C)", "For coarse: % gravel vs sand; check Cu and Cc", "For fines: plot on plasticity chart; LL above/below 50"],
        traps: ["Using %passing #4 instead of #200 to determine coarse vs fine-grained", "Placing on plasticity chart without checking whether LL>50 (H vs L)"],
      },
    ]
  },
  { id: "class-aashto", name: "AASHTO Classification", level: 3, parentId: "geo-class", category: "HGE" ,
    problemTypes: [
      {
        id: "class-aashto-system",
        name: "AASHTO Classification & GI",
        boardFrequency: "high",
        template: ["Check sieves: #10, #40, #200 passing percentages", "Check LL and PI", "Group Index GI=(F\u221235)[0.2+0.005(LL\u221240)]+0.01(F\u221215)(PI\u221210)"],
        traps: ["Using USCS chart instead of AASHTO table", "Negative GI values: report as 0 (not negative)"],
      },
    ]
  },
  // Under geo-comp
  { id: "comp-proctor", name: "Proctor Compaction Test",  level: 3, parentId: "geo-comp", category: "HGE" ,
    problemTypes: [
      {
        id: "comp-proc-test",
        name: "Proctor Compaction Test",
        boardFrequency: "high",
        template: ["Plot \u03b3_d vs w curve", "Peak = Maximum Dry Density (MDD) at Optimum Moisture Content (OMC)", "Zero Air Voids curve: \u03b3_d=Gs\u00b7\u03b3_w/(1+Gs\u00b7w)"],
        traps: ["Confusing Standard Proctor (600 kN\u00b7m/m\u00b3) with Modified Proctor (2700 kN\u00b7m/m\u00b3)", "Plotting total unit weight instead of dry unit weight"],
      },
    ]
  },
  { id: "comp-field",   name: "Field Compaction Control", level: 3, parentId: "geo-comp", category: "HGE" ,
    problemTypes: [
      {
        id: "comp-field-control",
        name: "Field Compaction Control",
        boardFrequency: "high",
        template: ["Relative compaction RC=\u03b3_d,field/\u03b3_d,max\u00d7100%", "Specs typically require RC\u226595% (or 90% for subgrade)", "Sand cone/nuclear gauge for field density"],
        traps: ["Comparing field dry density to field total density instead of lab MDD", "Confusing relative compaction with degree of saturation"],
      },
    ]
  },
  // Under geo-perm
  { id: "perm-darcy",   name: "Darcy's Law",         level: 3, parentId: "geo-perm", category: "HGE" ,
    problemTypes: [
      {
        id: "perm-darcy-law",
        name: "Darcy's Law Applications",
        boardFrequency: "high",
        template: ["v=k\u00b7i (seepage velocity = permeability \u00d7 hydraulic gradient)", "Q=k\u00b7i\u00b7A", "i=\u0394h/L (head loss / flow path length)"],
        traps: ["Confusing seepage velocity v with pore water velocity v/n", "Using wrong cross-section (total area vs voids area)"],
      },
    ]
  },
  { id: "perm-flownet", name: "Flow Nets & Seepage", level: 3, parentId: "geo-perm", category: "HGE" ,
    problemTypes: [
      {
        id: "perm-fnet-analysis",
        name: "Flow Net & Seepage Quantity",
        boardFrequency: "high",
        template: ["Q=k\u00b7H\u00b7(Nf/Nd) per unit length", "Nf=number of flow channels, Nd=number of equipotential drops", "Pressure head at any point from head loss distribution"],
        traps: ["Inverting Nf/Nd ratio", "Confusing total head with pressure head at a point in the flow net"],
      },
    ]
  },
  // Under geo-cons
  { id: "cons-settlement", name: "Settlement Calculation", level: 3, parentId: "geo-cons", category: "HGE" ,
    problemTypes: [
      {
        id: "cons-set-primary",
        name: "Primary Consolidation Settlement",
        boardFrequency: "high",
        template: ["S_c=Cc\u00b7H/(1+e\u2080)\u00b7log((\u03c3'\u2080+\u0394\u03c3')/\u03c3'\u2080) for NC clay", "For OC clay: use Cs if \u03c3'\u2080+\u0394\u03c3'\u2264\u03c3'_p, else split calculation", "\u0394\u03c3' from Boussinesq stress distribution"],
        traps: ["Using Cs (swelling index) where Cc (compression index) is required for NC clay", "Forgetting to check overconsolidation ratio OCR before applying formula"],
      },
      {
        id: "cons-set-time",
        name: "Time Rate of Consolidation",
        boardFrequency: "high",
        template: ["Tv=Cv\u00b7t/H_dr\u00b2 (time factor)", "U=90%: Tv\u22480.848; U=50%: Tv\u22480.197", "H_dr = drainage path (H for single drainage, H/2 for double)"],
        traps: ["Using total layer thickness instead of drainage path H_dr", "Confusing single drainage (one boundary drains) with double drainage"],
      },
    ]
  },
  { id: "cons-terzaghi",   name: "Terzaghi's Theory",     level: 3, parentId: "geo-cons", category: "HGE" ,
    problemTypes: [
      {
        id: "cons-terz-theory",
        name: "Terzaghi Consolidation Theory",
        boardFrequency: "medium",
        template: ["Effective stress principle: \u03c3'=\u03c3\u2212u", "At t=0: all load carried by pore pressure (u=\u0394\u03c3)", "At t=\u221e: all load carried by soil skeleton (u=0)"],
        traps: ["Confusing total stress with effective stress in settlements", "Applying 1D consolidation to 3D loading without correction"],
      },
    ]
  },
  // Under geo-shear
  { id: "shear-mohr",     name: "Mohr's Circle",          level: 3, parentId: "geo-shear", category: "HGE" ,
    problemTypes: [
      {
        id: "shear-mohr-circle",
        name: "Mohr's Circle Stress Analysis",
        boardFrequency: "high",
        template: ["Plot (\u03c3_x,\u2212\u03c4_xy) and (\u03c3_y,\u03c4_xy); connect for diameter", "Center: ((\u03c3_x+\u03c3_y)/2, 0)", "Radius R=\u221a(((\u03c3_x\u2212\u03c3_y)/2)\u00b2+\u03c4_xy\u00b2)", "Principal stresses: C\u00b1R"],
        traps: ["Wrong sign convention for shear stress on Mohr's circle", "Measuring angle from wrong reference point (angle on circle = 2\u00d7 real angle)"],
      },
    ]
  },
  { id: "shear-triaxial", name: "Triaxial Test Analysis", level: 3, parentId: "geo-shear", category: "HGE" ,
    problemTypes: [
      {
        id: "shear-tri-params",
        name: "Triaxial Test & Mohr-Coulomb Parameters",
        boardFrequency: "high",
        template: ["\u03c3\u2081=\u03c3\u2083+\u0394\u03c3_f (principal stresses at failure)", "Plot multiple Mohr circles; draw common tangent \u2192 c and \u03c6", "Undrained (CU) vs drained (CD) test gives different parameters"],
        traps: ["Using total stress parameters for effective stress analysis", "Confusing UU, CU, and CD test conditions and their applicable \u03c6 values"],
      },
    ]
  },
  { id: "shear-direct",   name: "Direct Shear Test",      level: 3, parentId: "geo-shear", category: "HGE" ,
    problemTypes: [
      {
        id: "shear-dir-test",
        name: "Direct Shear Test",
        boardFrequency: "medium",
        template: ["\u03c4_f=c+\u03c3_n\u00b7tan\u03c6 (Mohr-Coulomb envelope)", "Plot \u03c4_f vs \u03c3_n for multiple tests", "For sands: c\u22480; for clays: both c and \u03c6 may be present"],
        traps: ["Using normal force instead of normal stress (divide by area)", "Confusing peak and residual strength in \u03c6 selection"],
      },
    ]
  },
  // Under geo-found
  { id: "found-bearing", name: "Bearing Capacity",        level: 3, parentId: "geo-found", category: "HGE" ,
    problemTypes: [
      {
        id: "found-bear-terzaghi",
        name: "Terzaghi Bearing Capacity",
        boardFrequency: "high",
        template: ["q_ult=cNc+qNq+0.5\u03b3BN\u03b3 (strip footing)", "q_net=q_ult\u2212\u03b3D_f (net capacity)", "FS=q_ult/q_applied (usually FS\u22653)"],
        traps: ["Forgetting the surcharge term q=\u03b3D_f (embedment contribution)", "Using wrong Nc,Nq,N\u03b3 factors for shallow vs deep footing"],
      },
      {
        id: "found-bear-meyerhof",
        name: "Meyerhof & General Bearing Capacity",
        boardFrequency: "high",
        template: ["q_ult=cNcFcsFcdFci+qNqFqsFqdFqi+0.5\u03b3BN\u03b3F\u03b3sF\u03b3dF\u03b3i", "Shape factors s, depth factors d, inclination factors i", "For square footing: use Fcs=1+0.4(B/L)=1.4"],
        traps: ["Applying strip footing formula without shape/depth correction for actual geometry", "Forgetting that depth factors increase capacity for embedded footings"],
      },
    ]
  },
  { id: "found-piles",   name: "Pile Foundation Design",  level: 3, parentId: "geo-found", category: "HGE" ,
    problemTypes: [
      {
        id: "found-pile-capacity",
        name: "Single Pile Capacity",
        boardFrequency: "high",
        template: ["Q_ult=Q_tip+Q_skin=q_b\u00b7A_b+f_s\u00b7A_s", "Driven piles: use SPT or static formulas", "Factor of safety FS=Q_ult/Q_allowable (typically FS=2\u20133)"],
        traps: ["Using area of pile cross-section for skin friction (use perimeter\u00d7length)", "Forgetting to add both tip resistance and skin friction"],
      },
    ]
  },
  { id: "found-gw",      name: "Ground Water Effects",    level: 3, parentId: "geo-found", category: "HGE" ,
    problemTypes: [
      {
        id: "found-gw-effect",
        name: "Groundwater Effects on Bearing Capacity",
        boardFrequency: "high",
        template: ["GWT at surface: use \u03b3' (buoyant) for all \u03b3 terms", "GWT at footing base: use \u03b3' in N\u03b3 term, total \u03b3 for surcharge", "GWT below B: no effect"],
        traps: ["Using \u03b3_sat instead of \u03b3' for submerged soil", "Applying a single GWT correction uniformly regardless of depth"],
      },
    ]
  },
  // Under str-anal
  { id: "anal-statics", name: "Static Equilibrium",      level: 3, parentId: "str-anal", category: "SEC" ,
    problemTypes: [
      {
        id: "anal-stat-reactions",
        name: "Support Reactions",
        boardFrequency: "high",
        template: ["Apply \u03a3Fx=0, \u03a3Fy=0, \u03a3M=0", "Take moments about unknown reaction location to isolate variables", "Verify with third equation"],
        traps: ["Forgetting to include applied moments in the equilibrium sum", "Taking moment about point that has two unknowns (use point with only one)"],
      },
      {
        id: "anal-stat-fbd",
        name: "Free Body Diagrams",
        boardFrequency: "high",
        template: ["Draw complete FBD showing all external forces and reactions", "Replace supports with reaction forces (pin: Rx,Ry; roller: one reaction)", "Include self-weight if not negligible"],
        traps: ["Omitting horizontal reaction at pin support (only roller has no H reaction)", "Forgetting couple/moment reactions at fixed/clamped supports"],
      },
    ]
  },
  { id: "anal-trusses", name: "Truss Analysis",          level: 3, parentId: "str-anal", category: "SEC" ,
    problemTypes: [
      {
        id: "anal-truss-joints",
        name: "Method of Joints",
        boardFrequency: "high",
        template: ["Compute support reactions first", "Start at joint with \u22642 unknowns", "\u03a3Fx=0 and \u03a3Fy=0 at each joint", "Tension positive, compression negative"],
        traps: ["Starting at a joint with >2 unknown members", "Sign error: assuming wrong force direction and not checking consistency"],
      },
      {
        id: "anal-truss-sections",
        name: "Method of Sections",
        boardFrequency: "high",
        template: ["Cut truss to expose desired member(s); \u22643 cuts", "Apply \u03a3Fx, \u03a3Fy, \u03a3M to isolated part", "Take moment about intersection of other two cut members to isolate target"],
        traps: ["Cutting through >3 members (too many unknowns)", "Taking moment about wrong point; not eliminating other unknown members"],
      },
    ]
  },
  { id: "anal-beams",   name: "Beam Analysis",           level: 3, parentId: "str-anal", category: "SEC" ,
    problemTypes: [
      {
        id: "anal-beam-sfd",
        name: "Shear Force & Bending Moment Diagrams",
        boardFrequency: "high",
        template: ["Draw FBD; compute reactions", "SFD: sum forces left of section \u2192 shear at that point", "BMD: sum moments left of section \u2192 moment at that point", "Verify: dM/dx=V at every point"],
        traps: ["Wrong sign for shear (upward force to left = positive shear convention)", "Not accounting for distributed load effect on shear (slope = w)"],
      },
      {
        id: "anal-beam-formulas",
        name: "Standard Beam Formula Application",
        boardFrequency: "high",
        template: ["Simply supported + central point load: M_max=PL/4", "Simply supported + UDL: M_max=wL\u00b2/8", "Cantilever + end load: M_max=PL", "Use formula table to read V, M, \u03b4 at critical locations"],
        traps: ["Using PL/4 for off-center loads (formula only valid for midpoint loads)", "Confusing cantilever and simply-supported formulas"],
      },
    ]
  },
  { id: "anal-frames",  name: "Frame Analysis",          level: 3, parentId: "str-anal", category: "SEC" ,
    problemTypes: [
      {
        id: "anal-frame-portal",
        name: "Portal Frame Analysis",
        boardFrequency: "high",
        template: ["Apply assumptions: inflection points at midheight of columns for approximate method", "Shear in columns: H/2 per column for symmetric frames", "Moments from shear \u00d7 distance to inflection point"],
        traps: ["Forgetting overturning moment contribution to column axial forces", "Applying symmetric frame assumptions to asymmetric frames"],
      },
    ]
  },
  { id: "anal-smd",     name: "Shear & Moment Diagrams", level: 3, parentId: "str-anal", category: "SEC" ,
    problemTypes: [
      {
        id: "anal-smd-concentrated",
        name: "SMD for Point Loads",
        boardFrequency: "high",
        template: ["V constant between loads; steps at concentrated forces", "M linear between loads; peak at zero shear", "Max M location: where SFD crosses zero"],
        traps: ["Continuing linear shear past a concentrated load without stepping", "Missing the moment at a pin support (M=0 at pins, not at interior hinges)"],
      },
      {
        id: "anal-smd-distributed",
        name: "SMD for Distributed Loads",
        boardFrequency: "high",
        template: ["V changes linearly under UDL (slope = w)", "M changes parabolically under UDL", "Max M at zero shear: x=V_left/w from left support"],
        traps: ["Using V=wL instead of finding the exact zero-shear location", "Drawing parabola in wrong direction (concave vs convex)"],
      },
    ]
  },
  // Under str-rc
  { id: "rc-beams",    name: "RC Beam Design",    level: 3, parentId: "str-rc", category: "SEC" ,
    problemTypes: [
      {
        id: "rc-beam-flexure",
        name: "Singly Reinforced Beam Flexural Design",
        boardFrequency: "high",
        template: ["a=As\u00b7fy/(0.85f'c\u00b7b)", "Mn=As\u00b7fy\u00b7(d\u2212a/2)", "Check \u03c1_min\u2264\u03c1\u2264\u03c1_max; \u03c6Mn\u2265Mu with \u03c6=0.90"],
        traps: ["Using d instead of b in denominator of 'a' formula", "Omitting \u03c6 factor when comparing to Mu"],
      },
      {
        id: "rc-beam-shear",
        name: "Shear Design (Stirrups)",
        boardFrequency: "high",
        template: ["Vc=0.17\u221af'c\u00b7b\u00b7d (SI)", "Vs=(Av\u00b7fy\u00b7d)/s", "s_max=d/2 or 600 mm (whichever is smaller)"],
        traps: ["Using MPa without correct factor: Vc formula coefficient depends on units", "Forgetting maximum stirrup spacing limits"],
      },
    ]
  },
  { id: "rc-columns",  name: "RC Column Design",  level: 3, parentId: "str-rc", category: "SEC" ,
    problemTypes: [
      {
        id: "rc-col-short",
        name: "Short Column Axial & Eccentric Load",
        boardFrequency: "high",
        template: ["Pn=0.85f'c(Ag\u2212Ast)+fy\u00b7Ast (pure compression)", "Interaction diagram for combined axial + moment", "\u03c6=0.65 for tied columns; \u03c6=0.75 for spiral"],
        traps: ["Using \u03c6=0.90 (beam value) for columns", "Forgetting to subtract Ast area from gross area in concrete term"],
      },
      {
        id: "rc-col-slender",
        name: "Slenderness & Effective Length",
        boardFrequency: "medium",
        template: ["kL/r \u2264 22: short column (no slenderness effect)", "r=0.3h for rectangular, 0.25D for circular", "Magnified moment method for slender columns"],
        traps: ["Using L instead of kL for slenderness ratio", "Using wrong r: section radius of gyration, not geometric radius"],
      },
    ]
  },
  { id: "rc-slabs",    name: "RC Slab Design",    level: 3, parentId: "str-rc", category: "SEC" ,
    problemTypes: [
      {
        id: "rc-slab-oneway",
        name: "One-Way Slab Design",
        boardFrequency: "high",
        template: ["One-way if L_long/L_short>2", "Design as beam with b=1m strip", "Minimum thickness: L/20 (simply supported); check deflection"],
        traps: ["Applying one-way design to two-way slabs (when ratio \u2264 2)", "Forgetting temperature & shrinkage steel perpendicular to span"],
      },
      {
        id: "rc-slab-twoway",
        name: "Two-Way Slab (Moment Coefficients)",
        boardFrequency: "high",
        template: ["M=C_a\u00b7w\u00b7L_a\u00b2 or C_b\u00b7w\u00b7L_b\u00b2 (direction a and b)", "Coefficient C depends on edge conditions and L_a/L_b ratio", "Use NSCP/ACI table for coefficients"],
        traps: ["Using one-way slab formula for two-way slab", "Applying coefficients from wrong edge condition (e.g., all edges continuous vs one discontinuous)"],
      },
    ]
  },
  { id: "rc-footings", name: "RC Footing Design", level: 3, parentId: "str-rc", category: "SEC" ,
    problemTypes: [
      {
        id: "rc-foot-spread",
        name: "Spread Footing Design",
        boardFrequency: "high",
        template: ["q_net=P/A \u2264 q_allowable", "Punching shear: Vc=0.33\u221af'c\u00b7b\u2080\u00b7d (b\u2080=perimeter at d/2 from column)", "Bending: critical section at face of column"],
        traps: ["Using gross bearing pressure instead of net pressure (forgetting overburden)", "Critical section for bending at centerline instead of column face"],
      },
    ]
  },
  // Under str-steel
  { id: "steel-tension",     name: "Tension Members",     level: 3, parentId: "str-steel", category: "SEC" ,
    problemTypes: [
      {
        id: "steel-ten-capacity",
        name: "Tension Member Capacity",
        boardFrequency: "high",
        template: ["Yielding: T_n=F_y\u00b7A_g", "Fracture: T_n=F_u\u00b7A_e (A_e=U\u00b7A_n)", "\u03d5T_n \u2265 T_u with \u03d5=0.90 (yielding) or 0.75 (fracture)"],
        traps: ["Forgetting shear lag factor U when bolted connections don't engage full section", "Using A_g (gross) instead of A_e (effective net) for fracture check"],
      },
      {
        id: "steel-ten-netarea",
        name: "Net Area & Shear Lag",
        boardFrequency: "high",
        template: ["A_n=A_g\u2212bolt_holes\u00b7(d_h+3mm)\u00b7t", "A_e=U\u00b7A_n (U depends on connection type)", "Stagger: s\u00b2/(4g) deduction for diagonal paths"],
        traps: ["Using bolt diameter instead of hole diameter (add 3mm for damage)", "Forgetting to check all possible failure paths in staggered connections"],
      },
    ]
  },
  { id: "steel-compression", name: "Compression Members", level: 3, parentId: "str-steel", category: "SEC" ,
    problemTypes: [
      {
        id: "steel-comp-column",
        name: "Column Axial Capacity",
        boardFrequency: "high",
        template: ["Compute \u03bb_c=KL/r\u03c0\u00b7\u221a(Fy/E)", "\u03bb_c\u22641.5: F_cr=0.658^(\u03bb_c\u00b2)\u00b7Fy", "\u03bb_c>1.5: F_cr=0.877/\u03bb_c\u00b2\u00b7Fy", "P_n=F_cr\u00b7A_g"],
        traps: ["Using L instead of kL (k depends on end conditions: fixed-fixed=0.5, pin-pin=1.0)", "Choosing wrong formula range (\u03bb_c\u22641.5 vs >1.5)"],
      },
      {
        id: "steel-comp-local",
        name: "Local Buckling & Compact Sections",
        boardFrequency: "medium",
        template: ["Check b/t ratio against \u03bb_p (compact) and \u03bb_r (non-compact)", "Flanges: b/2t; webs: h/tw", "Non-compact sections need reduced capacity"],
        traps: ["Using full b instead of b/2 for flange slenderness ratio", "Forgetting to check both flange and web for compactness"],
      },
    ]
  },
  { id: "steel-beams",       name: "Steel Beams",         level: 3, parentId: "str-steel", category: "SEC" ,
    problemTypes: [
      {
        id: "steel-beam-compact",
        name: "Compact Beam Bending Capacity",
        boardFrequency: "high",
        template: ["Compact section + adequate bracing: M_n=M_p=Z_x\u00b7F_y", "Z_x = plastic section modulus (from tables or compute)", "\u03d5M_n\u2265M_u with \u03d5=0.90"],
        traps: ["Using elastic section modulus S_x instead of plastic modulus Z_x for M_p", "Applying compact section formula to laterally unbraced beams"],
      },
      {
        id: "steel-beam-ltb",
        name: "Lateral Torsional Buckling",
        boardFrequency: "high",
        template: ["Check L_b vs L_p and L_r (bracing limits)", "L_b\u2264L_p: full plastic capacity", "L_p<L_b\u2264L_r: linear interpolation", "L_b>L_r: elastic LTB formula"],
        traps: ["Applying plastic moment capacity when L_b>L_p", "Not checking lateral bracing requirements before applying M_n=M_p"],
      },
    ]
  },
  { id: "steel-connections", name: "Connections",         level: 3, parentId: "str-steel", category: "SEC" ,
    problemTypes: [
      {
        id: "steel-conn-bolt",
        name: "Bolted Connection Capacity",
        boardFrequency: "high",
        template: ["Shear per bolt: \u03c6R_n=\u03c6\u00b7F_nv\u00b7A_b", "Bearing: \u03c6R_n=\u03c6\u00b72.4\u00b7F_u\u00b7d\u00b7t", "Check both bolt shear and bearing; take minimum"],
        traps: ["Forgetting to check both shear and bearing failure modes", "Using the number of shear planes incorrectly for double-shear connections"],
      },
      {
        id: "steel-conn-weld",
        name: "Welded Connection Capacity",
        boardFrequency: "high",
        template: ["Fillet weld: \u03d5R_n=0.75\u00b70.6\u00b7F_EXX\u00b7(0.707\u00b7w)\u00b7L", "Effective throat = 0.707w for 45\u00b0 fillet weld", "Check weld length and minimum size from code"],
        traps: ["Using weld size w as the throat (should multiply by 0.707 for fillet welds)", "Forgetting the 0.6 shear factor on FEXX"],
      },
    ]
  },
  // Under str-timber
  { id: "timber-beams",   name: "Timber Beam Design",   level: 3, parentId: "str-timber", category: "SEC" ,
    problemTypes: [
      {
        id: "timber-beam-flex",
        name: "Timber Beam Flexural Design",
        boardFrequency: "high",
        template: ["f_b=M/S \u2264 F'_b (adjusted bending stress)", "S=bh\u00b2/6 for rectangular section", "Adjust F_b with CD (load duration), CM (moisture), CF (size) factors"],
        traps: ["Forgetting adjustment factors (CD, CM, etc.) and using tabulated F_b directly", "Using moment of inertia I instead of section modulus S for bending stress"],
      },
      {
        id: "timber-beam-shear",
        name: "Timber Beam Shear Design",
        boardFrequency: "medium",
        template: ["f_v=1.5V/(bh) for rectangular section", "Check f_v \u2264 F'_v (adjusted shear stress)", "Critical section: at d from support (not at face)"],
        traps: ["Using f_v=VQ/Ib (general shear formula) when 1.5V/A applies only to rectangles", "Using V at support instead of V at d from support"],
      },
    ]
  },
  { id: "timber-columns", name: "Timber Column Design", level: 3, parentId: "str-timber", category: "SEC" ,
    problemTypes: [
      {
        id: "timber-col-capacity",
        name: "Timber Column Design (NDS)",
        boardFrequency: "high",
        template: ["Slenderness ratio: le/d \u2264 50", "Column stability factor Cp from NDS formula", "F'_c=F_c\u00d7CD\u00d7CM\u00d7Ct\u00d7CF\u00d7Cp"],
        traps: ["Using le/d>50 (exceeds slenderness limit)", "Forgetting Cp reduces column capacity for intermediate slenderness"],
      },
    ]
  },
  // Under con-pm
  { id: "pm-cpm",        name: "Critical Path Method",   level: 3, parentId: "con-pm", category: "SEC" ,
    problemTypes: [
      {
        id: "pm-cpm-network",
        name: "CPM Network & Critical Path",
        boardFrequency: "high",
        template: ["Forward pass: ES=max(EF of predecessors); EF=ES+duration", "Backward pass: LF=min(LS of successors); LS=LF\u2212duration", "TF=LS\u2212ES=LF\u2212EF; Critical: TF=0"],
        traps: ["Confusing ES and EF in forward pass: ES is start, EF=ES+duration", "Using 'minimum' instead of 'maximum' in forward pass for ES"],
      },
      {
        id: "pm-cpm-crashing",
        name: "Project Crashing",
        boardFrequency: "medium",
        template: ["Identify critical path; crash lowest cost-slope activity first", "Cost slope=(crash cost\u2212normal cost)/(normal time\u2212crash time)", "Continue crashing until target duration or all paths are critical"],
        traps: ["Crashing non-critical activities (wastes money without reducing project duration)", "Forgetting that crashing one path may create a new critical path"],
      },
    ]
  },
  { id: "pm-pert",       name: "PERT Analysis",          level: 3, parentId: "con-pm", category: "SEC" ,
    problemTypes: [
      {
        id: "pm-pert-calc",
        name: "PERT Expected Time & Variance",
        boardFrequency: "high",
        template: ["te=(a+4m+b)/6", "\u03c3\u00b2=((b\u2212a)/6)\u00b2", "Project variance=\u03a3\u03c3\u00b2 of critical path activities"],
        traps: ["Using (a+m+b)/3 instead of (a+4m+b)/6", "Summing standard deviations instead of variances (sum variances, then \u221a for \u03c3_project)"],
      },
    ]
  },
  { id: "pm-scheduling", name: "Bar Charts & Scheduling",level: 3, parentId: "con-pm", category: "SEC" ,
    problemTypes: [
      {
        id: "pm-sched-bar",
        name: "Bar Charts & S-Curves",
        boardFrequency: "medium",
        template: ["Gantt chart: horizontal bars show duration and schedule", "S-curve: cumulative cost/progress vs time", "Earned value: EV=%complete\u00d7BAC; compare to AC and PV"],
        traps: ["Confusing Planned Value (PV) with Earned Value (EV)", "Reading progress from bar chart without computing %complete\u00d7budget"],
      },
    ]
  },
  // Under con-est
  { id: "est-quantity", name: "Quantity Takeoff",   level: 3, parentId: "con-est", category: "SEC" ,
    problemTypes: [
      {
        id: "est-qty-concrete",
        name: "Concrete Quantity Takeoff",
        boardFrequency: "high",
        template: ["Volume of concrete = L\u00d7W\u00d7D (for slabs and walls)", "Add 5\u201310% waste factor", "Convert to bags of cement: bags=volume\u00d7cement ratio/bag volume"],
        traps: ["Computing surface area instead of volume", "Forgetting waste factor or using wrong mix ratio"],
      },
      {
        id: "est-qty-formwork",
        name: "Formwork & Rebar Quantification",
        boardFrequency: "high",
        template: ["Formwork area = contact surface area", "Rebar: L_total=\u03a3(bar length\u00d7number of bars); weight=L\u00d7unit weight", "Splices and hooks add to required bar length"],
        traps: ["Computing rebar volume instead of length then converting to weight", "Forgetting lap splice length in total rebar quantity"],
      },
    ]
  },
  { id: "est-unit",     name: "Unit Cost Analysis", level: 3, parentId: "con-est", category: "SEC" ,
    problemTypes: [
      {
        id: "est-unit-analysis",
        name: "Unit Cost Analysis",
        boardFrequency: "high",
        template: ["Unit cost = (material + labor + equipment + overhead) / quantity", "Productivity rates determine labor cost", "Apply overhead and profit factor to direct costs"],
        traps: ["Using contract unit price as production cost (ignores contractor's markup)", "Forgetting equipment idle time and mobilization costs"],
      },
    ]
  },
  { id: "est-bidding",  name: "Bidding & Contracts",level: 3, parentId: "con-est", category: "SEC" ,
    problemTypes: [
      {
        id: "est-bid-process",
        name: "Bidding & Contract Administration",
        boardFrequency: "medium",
        template: ["Prepare bill of quantities and cost estimate", "Apply markup for overhead and profit", "Submit bid within deadline; check bid bond requirements"],
        traps: ["Forgetting contingency in bid price", "Confusing lump-sum with unit-price contract implications"],
      },
    ]
  },
  // Under con-mat
  { id: "mat-concrete", name: "Concrete Technology", level: 3, parentId: "con-mat", category: "SEC" ,
    problemTypes: [
      {
        id: "mat-con-mix",
        name: "Concrete Mix Design",
        boardFrequency: "high",
        template: ["Select w/c ratio from target strength table", "Compute water content; derive cement content", "Determine aggregate proportions by weight or volume"],
        traps: ["Using w/c ratio >0.45 for structural concrete (too weak)", "Confusing water-cement ratio with water-aggregate ratio"],
      },
      {
        id: "mat-con-strength",
        name: "Concrete Compressive Strength & Testing",
        boardFrequency: "high",
        template: ["f'c from 28-day cylinder test (150\u00d7300mm standard)", "Characteristic strength: f'c=f_mean\u22121.34s", "Acceptance: average of 2 cylinders \u2265 f'c and neither below 0.85f'c"],
        traps: ["Using cube strength as cylinder strength without conversion (cube \u2248 1.25\u00d7cylinder)", "Reporting individual cylinder result as acceptance instead of average pair"],
      },
    ]
  },
  { id: "mat-steel",    name: "Steel Properties",    level: 3, parentId: "con-mat", category: "SEC" ,
    problemTypes: [
      {
        id: "mat-steel-prop",
        name: "Steel Material Properties",
        boardFrequency: "medium",
        template: ["Yield strength Fy; Ultimate Fu; E=200,000 MPa", "A36: Fy=250 MPa, Fu=400 MPa; A992: Fy=345 MPa", "Check Fy/Fu ratio \u2264 0.85 for compact ductility"],
        traps: ["Confusing Fy (yield point) with Fu (ultimate tensile strength)", "Using A36 values for A992 steel in design calculations"],
      },
    ]
  },
  { id: "mat-asphalt",  name: "Asphalt & Bitumen",   level: 3, parentId: "con-mat", category: "SEC" ,
    problemTypes: [
      {
        id: "mat-asp-mix",
        name: "Asphalt Mix Design (Marshall)",
        boardFrequency: "medium",
        template: ["Determine optimum bitumen content (OBC) from Marshall test", "OBC = average of % at max stability, max unit weight, and target % air voids", "Check stability, flow, VMA, VFA criteria"],
        traps: ["Using VMA instead of VFA for percent voids in asphalt mix", "Reading stability in kN without dividing by ring correction factor"],
      },
    ]
  },
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

/**
 * Get all problemTypes for a given Level 3 topic ID.
 * Returns an empty array for topics without problemTypes.
 */
export function getProblemTypes(topicId) {
  const topic = getTopicById(topicId);
  return topic?.problemTypes ?? [];
}

/**
 * Get a flat list of all problem types across all topics.
 */
export function getAllProblemTypes() {
  return topics
    .filter((t) => t.level === 3 && t.problemTypes)
    .flatMap((t) => t.problemTypes.map((pt) => ({ ...pt, topicId: t.id, topicName: t.name })));
}
