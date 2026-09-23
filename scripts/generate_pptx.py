import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Color Constants
BG_DARK = RGBColor(7, 13, 30)          # #070D1E Deep Dark Navy
CARD_BG = RGBColor(15, 23, 42)         # #0F172A Dark Slate
CARD_INNER = RGBColor(17, 24, 39)      # #111827
CYAN = RGBColor(0, 240, 255)           # #00F0FF Electric Cyan
BLUE = RGBColor(37, 99, 235)           # #2563EB Royal Blue
EMERALD = RGBColor(16, 185, 129)       # #10B981 Emerald
AMBER = RGBColor(245, 158, 11)         # #F59E0B Amber
RED = RGBColor(239, 68, 68)            # #EF4444 Red
WHITE = RGBColor(255, 255, 255)
TEXT_MUTED = RGBColor(148, 163, 184)   # #94A3B8
TEXT_DIM = RGBColor(100, 116, 139)     # #64748B
BORDER_CYAN = RGBColor(56, 189, 248)   # #38BDF8

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, slide_num_str, title_text, subtitle_text):
        # Pill badge
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.45), Inches(2.8), Inches(0.35))
        pill.fill.solid()
        pill.fill.fore_color.rgb = CARD_BG
        pill.line.color.rgb = CYAN
        pill.line.width = Pt(1)
        tf_pill = pill.text_frame
        tf_pill.word_wrap = True
        p_pill = tf_pill.paragraphs[0]
        p_pill.text = f"SLIDE {slide_num_str} • CIVICSOLVE"
        p_pill.font.size = Pt(9.5)
        p_pill.font.bold = True
        p_pill.font.color.rgb = CYAN
        p_pill.alignment = PP_ALIGN.CENTER

        # Brand header on right
        brand_box = slide.shapes.add_textbox(Inches(10.2), Inches(0.4), Inches(2.4), Inches(0.4))
        tf_b = brand_box.text_frame
        p_b = tf_b.paragraphs[0]
        p_b.text = "CivicSolve 2026"
        p_b.font.size = Pt(11)
        p_b.font.bold = True
        p_b.font.color.rgb = WHITE
        p_b.alignment = PP_ALIGN.RIGHT

        # Title and Subtitle Box
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.8), Inches(0.95))
        tf = title_box.text_frame
        tf.word_wrap = True
        p_title = tf.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = WHITE

        p_sub = tf.add_paragraph()
        p_sub.text = subtitle_text
        p_sub.font.size = Pt(11.5)
        p_sub.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 1: THE PROBLEM
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)
    add_header(s1, "01", "Real Problems. Disconnected Solutions.", "Grassroots civic crises remain unresolved due to systemic ecosystem fragmentation.")

    # 4 Disconnected Stakeholders row
    stakeholders = [
        ("🧑 CITIZEN", "Isolated Grievances", "No transparent tracking, zero feedback loops, lost in municipal bureaucracy.", RED),
        ("🏛️ GOVERNMENT", "Administrative Silos", "Overwhelmed ward officers, procurement delays, manual complaint backlogs.", RED),
        ("🎓 UNIVERSITIES", "Shelved Capstones", "3M+ student engineering projects end in archives without real civic deployment.", RED),
        ("🏭 INDUSTRY", "Untracked CSR", "Corporate grants disbursed into isolated programs with zero live telemetry.", RED)
    ]

    sh_width = Inches(2.7)
    sh_height = Inches(1.8)
    sh_top = Inches(1.9)
    spacing = Inches(0.3)

    for i, (st_name, st_status, st_desc, color) in enumerate(stakeholders):
        left = Inches(0.8) + i * (sh_width + spacing)
        card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, sh_top, sh_width, sh_height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = color
        card.line.width = Pt(1.5)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_top = Inches(0.12)
        tf.margin_left = Inches(0.15)
        tf.margin_right = Inches(0.15)

        p0 = tf.paragraphs[0]
        p0.text = st_name
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = WHITE

        p1 = tf.add_paragraph()
        p1.text = f"❌ {st_status}"
        p1.font.size = Pt(10.5)
        p1.font.bold = True
        p1.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = st_desc
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = TEXT_MUTED

    # Middle: Visual Problem Flow Diagram
    flow_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.9), Inches(11.733), Inches(1.8))
    flow_box.fill.solid()
    flow_box.fill.fore_color.rgb = CARD_BG
    flow_box.line.color.rgb = RED
    flow_box.line.width = Pt(1.5)

    tf_flow_label = flow_box.text_frame
    p_fl = tf_flow_label.paragraphs[0]
    p_fl.text = "⚠️ THE BROKEN STATUS QUO PIPELINE (HIGH FRICTION & ZERO DEPLOYMENT)"
    p_fl.font.size = Pt(10)
    p_fl.font.bold = True
    p_fl.font.color.rgb = RED

    flow_nodes = [
        ("🧑 CITIZEN\nProblem Reported", BLUE, True),
        ("❌ Scattered Data\nUnstructured", CARD_INNER, False),
        ("❌ Manual Triage\nBottleneck", CARD_INNER, False),
        ("❌ No Right Team\nSkill Mismatch", CARD_INNER, False),
        ("❌ Limited Collab\nNo R&D Mesh", CARD_INNER, False),
        ("❌ Low Deployment\nZero Impact", RED, False)
    ]

    node_w = Inches(1.6)
    node_h = Inches(0.9)
    node_top = Inches(4.5)
    start_left = Inches(1.1)
    step_gap = Inches(0.4)

    for idx, (node_text, n_color, is_citizen) in enumerate(flow_nodes):
        n_left = start_left + idx * (node_w + step_gap)
        n_shape = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, n_left, node_top, node_w, node_h)
        n_shape.fill.solid()
        n_shape.fill.fore_color.rgb = CARD_INNER
        n_shape.line.color.rgb = CYAN if is_citizen else RED
        n_shape.line.width = Pt(1.5 if is_citizen else 1)

        tf_n = n_shape.text_frame
        tf_n.word_wrap = True
        p_n = tf_n.paragraphs[0]
        p_n.text = node_text
        p_n.font.size = Pt(9.5)
        p_n.font.bold = True
        p_n.font.color.rgb = WHITE if is_citizen else RGBColor(252, 165, 165)
        p_n.alignment = PP_ALIGN.CENTER

        if idx < len(flow_nodes) - 1:
            arr = s1.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, n_left + node_w + Inches(0.08), node_top + Inches(0.3), Inches(0.24), Inches(0.3))
            arr.fill.solid()
            arr.fill.fore_color.rgb = RED
            arr.line.fill.background()

    # Bottom statement banner
    quote_box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.95), Inches(11.733), Inches(0.95))
    quote_box.fill.solid()
    quote_box.fill.fore_color.rgb = CARD_BG
    quote_box.line.color.rgb = CYAN
    quote_box.line.width = Pt(1.5)

    tf_q = quote_box.text_frame
    tf_q.word_wrap = True
    p_q = tf_q.paragraphs[0]
    p_q.text = "“Great ideas exist. What is missing is a connected path from problem → solution → deployment.”"
    p_q.font.size = Pt(14)
    p_q.font.bold = True
    p_q.font.color.rgb = WHITE
    p_q.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 2: THE CIVICSOLVE ECOSYSTEM
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "02", "One Platform. One Connected Innovation Ecosystem.", "Unifying Citizens, Municipalities, Universities, and Industry into an AI-orchestrated pipeline.")

    # Center Hero: CivicSolve Core
    core_box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.7), Inches(1.85), Inches(3.9), Inches(2.5))
    core_box.fill.solid()
    core_box.fill.fore_color.rgb = CARD_BG
    core_box.line.color.rgb = CYAN
    core_box.line.width = Pt(2.5)
    tf_core = core_box.text_frame
    tf_core.word_wrap = True
    p_c1 = tf_core.paragraphs[0]
    p_c1.text = "⚡ CIVICSOLVE"
    p_c1.font.size = Pt(18)
    p_c1.font.bold = True
    p_c1.font.color.rgb = CYAN
    p_c1.alignment = PP_ALIGN.CENTER

    p_c2 = tf_core.add_paragraph()
    p_c2.text = "AI-POWERED ORCHESTRATION CORE"
    p_c2.font.size = Pt(9.5)
    p_c2.font.bold = True
    p_c2.font.color.rgb = WHITE
    p_c2.alignment = PP_ALIGN.CENTER

    p_c3 = tf_core.add_paragraph()
    p_c3.text = "\n• Neural Triage & Severity 0-100\n• Ward Commissioner Triage Queue\n• Autonomous Lab Matching Engine\n• Corporate CSR & Cloud Grants"
    p_c3.font.size = Pt(9)
    p_c3.font.color.rgb = TEXT_MUTED

    # Top: Citizens
    top_box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.7), Inches(4.5), Inches(3.9), Inches(0.95))
    top_box.fill.solid()
    top_box.fill.fore_color.rgb = CARD_BG
    top_box.line.color.rgb = BORDER_CYAN
    tf_top = top_box.text_frame
    tf_top.word_wrap = True
    p_t = tf_top.paragraphs[0]
    p_t.text = "🧑 CITIZENS → Submit Problems\nGeotagged reports + EXIF evidence + Community Endorsements"
    p_t.font.size = Pt(9.5)
    p_t.font.color.rgb = WHITE

    # Left: Universities
    left_box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(3.6), Inches(1.8))
    left_box.fill.solid()
    left_box.fill.fore_color.rgb = CARD_BG
    left_box.line.color.rgb = BORDER_CYAN
    tf_l = left_box.text_frame
    tf_l.word_wrap = True
    p_l = tf_l.paragraphs[0]
    p_l.text = "🎓 UNIVERSITIES → Build Teams"
    p_l.font.size = Pt(12)
    p_l.font.bold = True
    p_l.font.color.rgb = CYAN
    p_l2 = tf_l.add_paragraph()
    p_l2.text = "👥 Student Squads + Faculty PIs\nMatch domain skillsets to convert academic capstones into accredited, funded civic prototypes."
    p_l2.font.size = Pt(9.5)
    p_l2.font.color.rgb = TEXT_MUTED

    # Right: Government
    right_box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.9), Inches(2.2), Inches(3.6), Inches(1.8))
    right_box.fill.solid()
    right_box.fill.fore_color.rgb = CARD_BG
    right_box.line.color.rgb = EMERALD
    tf_r = right_box.text_frame
    tf_r.word_wrap = True
    p_r = tf_r.paragraphs[0]
    p_r.text = "🏛️ GOVERNMENT → Validate & Prioritize"
    p_r.font.size = Pt(12)
    p_r.font.bold = True
    p_r.font.color.rgb = EMERALD
    p_r2 = tf_r.add_paragraph()
    p_r2.text = "📜 1-Click Ward Sanction\nMunicipal commissioners review prioritized challenges, grant testbed access, and audit public rollout."
    p_r2.font.size = Pt(9.5)
    p_r2.font.color.rgb = TEXT_MUTED

    # Bottom: Central 8-Stage Flow Ribbon (Largest Visual Element)
    flow_box_s2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.65), Inches(11.733), Inches(1.4))
    flow_box_s2.fill.solid()
    flow_box_s2.fill.fore_color.rgb = CARD_BG
    flow_box_s2.line.color.rgb = CYAN
    flow_box_s2.line.width = Pt(1.5)

    tf_f2 = flow_box_s2.text_frame
    p_f2 = tf_f2.paragraphs[0]
    p_f2.text = "⚡ MAIN PLATFORM LIFELINE: PROBLEM → AI → VALIDATION → MATCHING → COLLAB → PROTOTYPE → DEPLOYMENT → IMPACT"
    p_f2.font.size = Pt(10)
    p_f2.font.bold = True
    p_f2.font.color.rgb = CYAN

    s2_steps = ["Problem", "AI Analysis", "Validation", "Matching", "Collab", "Prototype", "Deploy", "Impact"]
    step_w = Inches(1.25)
    step_h = Inches(0.65)
    for idx, step_name in enumerate(s2_steps):
        s_left = Inches(1.0) + idx * (step_w + Inches(0.18))
        s_box = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, s_left, Inches(6.15), step_w, step_h)
        s_box.fill.solid()
        s_box.fill.fore_color.rgb = CARD_INNER
        s_box.line.color.rgb = EMERALD if idx == 7 else CYAN
        tf_s = s_box.text_frame
        p_s = tf_s.paragraphs[0]
        p_s.text = f"0{idx+1} {step_name}"
        p_s.font.size = Pt(8.5)
        p_s.font.bold = True
        p_s.font.color.rgb = WHITE
        p_s.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 3: AI FLOW
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "03", "From a Citizen Complaint to an Actionable Challenge", "Gemini NLP transforms messy citizen grievances into high-precision, actionable engineering dossiers.")

    # Left: Citizen Intake Card
    intake_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.9), Inches(3.6), Inches(4.3))
    intake_box.fill.solid()
    intake_box.fill.fore_color.rgb = CARD_BG
    intake_box.line.color.rgb = BORDER_CYAN
    tf_in = intake_box.text_frame
    tf_in.word_wrap = True
    p_in0 = tf_in.paragraphs[0]
    p_in0.text = "📱 CITIZEN INTAKE FORM"
    p_in0.font.size = Pt(12)
    p_in0.font.bold = True
    p_in0.font.color.rgb = CYAN

    p_in1 = tf_in.add_paragraph()
    p_in1.text = "• Raw Citizen Text:\n“Water supply is irregular in my locality and community handpumps show dangerous white mineral deposits.”\n\n• GPS Lock: Chainpur, Palamu (24.03°N, 84.07°E)\n• Timestamp: 10 Sep 2026\n• Evidence: 📷 well_pump.jpg (3.1 MB)\n\n[ 📤 Submit to CivicSolve AI Engine ]"
    p_in1.font.size = Pt(9.5)
    p_in1.font.color.rgb = WHITE

    # Center: Glowing AI Engine Block
    ai_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.7), Inches(1.9), Inches(3.9), Inches(4.3))
    ai_box.fill.solid()
    ai_box.fill.fore_color.rgb = CARD_BG
    ai_box.line.color.rgb = CYAN
    ai_box.line.width = Pt(2)
    tf_ai = ai_box.text_frame
    tf_ai.word_wrap = True
    p_ai0 = tf_ai.paragraphs[0]
    p_ai0.text = "⚡ CIVICSOLVE AI ENGINE"
    p_ai0.font.size = Pt(14)
    p_ai0.font.bold = True
    p_ai0.font.color.rgb = CYAN
    p_ai0.alignment = PP_ALIGN.CENTER

    p_ai1 = tf_ai.add_paragraph()
    p_ai1.text = "GEMINI 2.5 FLASH NEURAL TRIAGE\n"
    p_ai1.font.size = Pt(8.5)
    p_ai1.font.bold = True
    p_ai1.font.color.rgb = WHITE
    p_ai1.alignment = PP_ALIGN.CENTER

    p_ai2 = tf_ai.add_paragraph()
    p_ai2.text = (
        "🧠 NLP Analysis → Intent & Entity Extraction\n"
        "🏷️ Categorization → Potable Water & Infrastructure\n"
        "📍 Location Analysis → Palamu Ward #5 Bounds\n"
        "⚠️ Severity Score → 91 / 100 (Critical P1)\n"
        "🔍 Duplicate Detection → 12 Reports Clustered\n"
        "📊 Impact Analysis → 3,200+ Rural Inhabitants\n"
        "🤝 Team Recommendation → NIT Jamshedpur Lab"
    )
    p_ai2.font.size = Pt(9.5)
    p_ai2.font.color.rgb = TEXT_MUTED

    # Right: Problem Intelligence Card
    dossier_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.9), Inches(1.9), Inches(3.6), Inches(4.3))
    dossier_box.fill.solid()
    dossier_box.fill.fore_color.rgb = CARD_BG
    dossier_box.line.color.rgb = EMERALD
    dossier_box.line.width = Pt(2)
    tf_dos = dossier_box.text_frame
    tf_dos.word_wrap = True
    p_d0 = tf_dos.paragraphs[0]
    p_d0.text = "AI DOSSIER #JH-7102"
    p_d0.font.size = Pt(12)
    p_d0.font.bold = True
    p_d0.font.color.rgb = EMERALD

    p_d1 = tf_dos.add_paragraph()
    p_d1.text = (
        "Problem: Water Fluoride Contamination\n"
        "Category: Infrastructure / Water Quality\n"
        "Location: Chainpur, Palamu (Jharkhand)\n"
        "Priority: P1 — High Urgency (Red Triage)\n"
        "Impact: 3,200+ Community Members\n"
        "Similar Reports: 12 Merged Cases\n"
        "Suggested Domain: Civil / Environmental Eng\n\n"
        "🏛️ Govt Sanction Queue → 🎓 University Match\n"
        "Assigned Lab: NIT Jamshedpur Water Tech Lab"
    )
    p_d1.font.size = Pt(9.5)
    p_d1.font.color.rgb = WHITE

    # Bottom Pipeline ribbon
    b_pipe = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.35), Inches(11.733), Inches(0.65))
    b_pipe.fill.solid()
    b_pipe.fill.fore_color.rgb = CARD_BG
    b_pipe.line.color.rgb = CYAN
    tf_bp = b_pipe.text_frame
    p_bp = tf_bp.paragraphs[0]
    p_bp.text = "RAW COMPLAINT  ➔  AI INTELLIGENCE  ➔  ACTIONABLE CHALLENGE"
    p_bp.font.size = Pt(11)
    p_bp.font.bold = True
    p_bp.font.color.rgb = CYAN
    p_bp.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 4: INTERACTIVE MAP + PRODUCT
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "04", "See Problems Where They Actually Exist", "Authentic Jharkhand state GIS layer embedded seamlessly inside the CivicSolve home-page portal.")

    # Outer Browser Mockup
    browser = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.85), Inches(11.733), Inches(4.7))
    browser.fill.solid()
    browser.fill.fore_color.rgb = CARD_BG
    browser.line.color.rgb = BORDER_CYAN
    browser.line.width = Pt(1.5)

    tf_br = browser.text_frame
    p_br = tf_br.paragraphs[0]
    p_br.text = "🛡️ CivicSolve Jharkhand Portal | Filters: All 24 Districts  •  💧 Water  •  ⚠️ P1 Critical Only"
    p_br.font.size = Pt(10)
    p_br.font.bold = True
    p_br.font.color.rgb = CYAN

    # Left: Jharkhand State Map Card
    map_inner = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.1), Inches(2.35), Inches(6.6), Inches(3.95))
    map_inner.fill.solid()
    map_inner.fill.fore_color.rgb = CARD_INNER
    map_inner.line.color.rgb = BORDER_CYAN
    tf_m = map_inner.text_frame
    p_m0 = tf_m.paragraphs[0]
    p_m0.text = "🗺️ JHARKHAND STATE ONLY (24 DISTRICT BOUNDARIES)"
    p_m0.font.size = Pt(11)
    p_m0.font.bold = True
    p_m0.font.color.rgb = CYAN

    p_m1 = tf_m.add_paragraph()
    p_m1.text = (
        "\n• [💧 WATER - P1] Chainpur, Palamu (ACTIVE SELECTED MARKER)\n"
        "• [♻️ SANITATION - P1] Morabadi, Ranchi (Solid Waste Accumulation)\n"
        "• [🛣️ ROAD - P2] Bank More, Dhanbad (Culvert Collapse)\n"
        "• [🏥 HEALTH - P1] Sadar, Hazaribagh (PHC Cold Storage Failure)\n"
        "• [🎓 EDUCATION - P2] Bistupur, East Singhbhum (Lab Connectivity)\n\n"
        "📍 Exact geospatial coordinates locked with district bounding box.\n"
        "No full India map — strictly Jharkhand localized civic telemetry."
    )
    p_m1.font.size = Pt(9.5)
    p_m1.font.color.rgb = WHITE

    # Right: Active Selected Marker Popup Details Card
    detail_inner = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.9), Inches(2.35), Inches(4.3), Inches(3.95))
    detail_inner.fill.solid()
    detail_inner.fill.fore_color.rgb = CARD_INNER
    detail_inner.line.color.rgb = CYAN
    detail_inner.line.width = Pt(2)
    tf_det = detail_inner.text_frame
    tf_det.word_wrap = True
    p_dt0 = tf_det.paragraphs[0]
    p_dt0.text = "SELECTED POPUP: #JH-7102"
    p_dt0.font.size = Pt(12)
    p_dt0.font.bold = True
    p_dt0.font.color.rgb = CYAN

    p_dt1 = tf_det.add_paragraph()
    p_dt1.text = (
        "Problem: Water Supply & Fluoride Contamination\n"
        "📍 Location: Chainpur Block, Palamu, Jharkhand\n"
        "🖼️ Evidence: Verified Field Image (EXIF Validated)\n"
        "⚠️ Priority: P1 Critical (Red Alert)\n"
        "📊 Impact: 3,200+ Rural Residents\n"
        "🏛️ Govt Status: GOVT_VALIDATED (Sanctioned)\n"
        "👥 Assigned Team: NIT Jamshedpur Water Tech Lab\n\n"
        "Pipeline Arrow:\n"
        "Map Marker ➔ Problem Details ➔ Evidence Photo ➔ Solution Team"
    )
    p_dt1.font.size = Pt(9.5)
    p_dt1.font.color.rgb = WHITE

    # Bottom flow strip
    b_wf = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.65), Inches(11.733), Inches(0.5))
    b_wf.fill.solid()
    b_wf.fill.fore_color.rgb = CARD_BG
    b_wf.line.color.rgb = BORDER_CYAN
    tf_bw = b_wf.text_frame
    p_bw = tf_bw.paragraphs[0]
    p_bw.text = "Location (Palamu)  ➔  Problem (Fluoride)  ➔  Evidence (EXIF Photo)  ➔  Validation (Ward Sanction)  ➔  Solution (NIT JSR)"
    p_bw.font.size = Pt(9.5)
    p_bw.font.bold = True
    p_bw.font.color.rgb = WHITE
    p_bw.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 5: END-TO-END SOLUTION FLOW + TECHNOLOGY
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "05", "From Problem to Deployment", "A rigorous 8-stage innovation lifecycle backed by an enterprise-grade modern tech stack.")

    # Top: 8-Stage Horizontal Journey Flowchart (Main Flowchart)
    flow_top = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.85), Inches(11.733), Inches(3.0))
    flow_top.fill.solid()
    flow_top.fill.fore_color.rgb = CARD_BG
    flow_top.line.color.rgb = CYAN
    flow_top.line.width = Pt(1.5)
    tf_ft = flow_top.text_frame
    p_ft = tf_ft.paragraphs[0]
    p_ft.text = "⚡ THE CIVICSOLVE 8-STAGE VALUE CREATION PIPELINE"
    p_ft.font.size = Pt(11)
    p_ft.font.bold = True
    p_ft.font.color.rgb = CYAN

    stages = [
        ("01", "🧑 Citizen", "Submit Problem\nGeotagged + Photo"),
        ("02", "🤖 AI Engine", "Analyze & Classify\nSeverity 0-100"),
        ("03", "🏛️ Government", "Validate & Prioritize\nWard Sanction"),
        ("04", "🎓 University", "Find Relevant Domain\nSkillset Routing"),
        ("05", "👥 Student+Faculty", "Build Solution Team\nCapstone Squad"),
        ("06", "🏭 Industry", "Mentor & Fund\nCSR Hardware Kit"),
        ("07", "💡 Prototype", "Build & Test\nField IoT Pilot"),
        ("08", "🚀 Deployment", "Implement & Measure\nPublic Social Audit")
    ]

    st_w = Inches(1.3)
    st_h = Inches(2.0)
    for idx, (num, entity, desc) in enumerate(stages):
        x = Inches(1.0) + idx * (st_w + Inches(0.16))
        box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.4), st_w, st_h)
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_INNER
        box.line.color.rgb = EMERALD if idx == 7 else BORDER_CYAN
        box.line.width = Pt(1.5)
        tf_s5 = box.text_frame
        tf_s5.word_wrap = True
        p1 = tf_s5.paragraphs[0]
        p1.text = f"STAGE {num}"
        p1.font.size = Pt(9)
        p1.font.bold = True
        p1.font.color.rgb = EMERALD if idx == 7 else CYAN
        p1.alignment = PP_ALIGN.CENTER

        p2 = tf_s5.add_paragraph()
        p2.text = entity
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p2.alignment = PP_ALIGN.CENTER

        p3 = tf_s5.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(8.5)
        p3.font.color.rgb = TEXT_MUTED
        p3.alignment = PP_ALIGN.CENTER

    # Bottom: Technology Architecture Strip
    tech_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.05), Inches(11.733), Inches(2.0))
    tech_box.fill.solid()
    tech_box.fill.fore_color.rgb = CARD_BG
    tech_box.line.color.rgb = BORDER_CYAN
    tf_tb = tech_box.text_frame
    p_tb = tf_tb.paragraphs[0]
    p_tb.text = "🛠️ TECHNOLOGY ARCHITECTURE STRIP"
    p_tb.font.size = Pt(10.5)
    p_tb.font.bold = True
    p_tb.font.color.rgb = CYAN

    tech_layers = [
        ("Frontend", "React 18 + Vite", "Tailwind CSS • Responsive"),
        ("Backend", "APIs + Auth", "Node.js • Express • Firebase"),
        ("Database", "Supabase / PG", "Relational Schema • Audit Logs"),
        ("AI Engine", "Gemini 2.5 NLP", "Severity Score • Deduplication"),
        ("GIS & Maps", "Leaflet + GeoJSON", "Jharkhand District Vector"),
        ("Storage", "Evidence Vault", "Geotagged Photo Hashes")
    ]

    t_w = Inches(1.78)
    t_h = Inches(1.1)
    for idx, (layer, stack, detail) in enumerate(tech_layers):
        x = Inches(1.0) + idx * (t_w + Inches(0.18))
        b = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.5), t_w, t_h)
        b.fill.solid()
        b.fill.fore_color.rgb = CARD_INNER
        b.line.color.rgb = BORDER_CYAN
        tf_b = b.text_frame
        tf_b.word_wrap = True
        p_ly = tf_b.paragraphs[0]
        p_ly.text = layer
        p_ly.font.size = Pt(9)
        p_ly.font.bold = True
        p_ly.font.color.rgb = CYAN

        p_st = tf_b.add_paragraph()
        p_st.text = stack
        p_st.font.size = Pt(9.5)
        p_st.font.bold = True
        p_st.font.color.rgb = WHITE

        p_dt = tf_b.add_paragraph()
        p_dt.text = detail
        p_dt.font.size = Pt(8)
        p_dt.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 6: IMPACT + WINNING VISION
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "06", "Turning Community Problems Into Real-World Impact", "Bridging grassroots pain points with deployable innovation for a self-reliant India.")

    # Top: Visual Transformation Graphic (Left -> Center -> Right)
    trans_left = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.85), Inches(3.6), Inches(1.6))
    trans_left.fill.solid()
    trans_left.fill.fore_color.rgb = CARD_BG
    trans_left.line.color.rgb = RED
    trans_left.line.width = Pt(1.5)
    tf_tl = trans_left.text_frame
    p_tl0 = tf_tl.paragraphs[0]
    p_tl0.text = "🧑🤝🧑 REAL COMMUNITY PROBLEM"
    p_tl0.font.size = Pt(11)
    p_tl0.font.bold = True
    p_tl0.font.color.rgb = RED
    p_tl1 = tf_tl.add_paragraph()
    p_tl1.text = "❌ Unstructured  •  ❌ Unvalidated\n❌ Disconnected  •  ❌ Difficult to solve"
    p_tl1.font.size = Pt(9.5)
    p_tl1.font.color.rgb = RGBColor(252, 165, 165)

    trans_center = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.7), Inches(1.85), Inches(3.9), Inches(1.6))
    trans_center.fill.solid()
    trans_center.fill.fore_color.rgb = CARD_BG
    trans_center.line.color.rgb = CYAN
    trans_center.line.width = Pt(2.5)
    tf_tc = trans_center.text_frame
    p_tc0 = tf_tc.paragraphs[0]
    p_tc0.text = "⚡ CIVICSOLVE AI PLATFORM"
    p_tc0.font.size = Pt(14)
    p_tc0.font.bold = True
    p_tc0.font.color.rgb = CYAN
    p_tc0.alignment = PP_ALIGN.CENTER
    p_tc1 = tf_tc.add_paragraph()
    p_tc1.text = "THE INNOVATION CATALYST\nQuad-Helix Match & Telemetry Pipeline"
    p_tc1.font.size = Pt(9.5)
    p_tc1.font.color.rgb = WHITE
    p_tc1.alignment = PP_ALIGN.CENTER

    trans_right = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.9), Inches(1.85), Inches(3.6), Inches(1.6))
    trans_right.fill.solid()
    trans_right.fill.fore_color.rgb = CARD_BG
    trans_right.line.color.rgb = EMERALD
    trans_right.line.width = Pt(1.5)
    tf_tr = trans_right.text_frame
    p_tr0 = tf_tr.paragraphs[0]
    p_tr0.text = "🎯 MEASURABLE IMPACT"
    p_tr0.font.size = Pt(11)
    p_tr0.font.bold = True
    p_tr0.font.color.rgb = EMERALD
    p_tr1 = tf_tr.add_paragraph()
    p_tr1.text = "🎓 Student Team + 🏛️ Govt + 🏭 Industry\n💡 Verified Prototype ➔ 🚀 Field Deployment"
    p_tr1.font.size = Pt(9.5)
    p_tr1.font.color.rgb = RGBColor(167, 243, 208)

    # 4 Large Visual Impact Cards
    impact_cards = [
        ("FASTER", "Problem Identification", "AI NLP parses and geotags complaints in seconds, slashing manual triage by over 85%."),
        ("SMARTER", "Problem Prioritization", "Severity scoring (0-100) and deduplication eliminate backlogs and prioritize water/health crises."),
        ("STRONGER", "Stakeholder Collaboration", "Turns dormant student capstones into accredited municipal solutions with CSR funding."),
        ("REAL", "Deployment & Impact", "Tangible field-deployed IoT hardware, water filtration units, and telemetry social audits.")
    ]

    imp_w = Inches(2.7)
    imp_h = Inches(1.8)
    imp_top = Inches(3.65)
    for idx, (kw, title, desc) in enumerate(impact_cards):
        left = Inches(0.8) + idx * (imp_w + Inches(0.3))
        b = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, imp_top, imp_w, imp_h)
        b.fill.solid()
        b.fill.fore_color.rgb = CARD_BG
        b.line.color.rgb = EMERALD if idx == 3 else BORDER_CYAN
        b.line.width = Pt(1.5)
        tf_i = b.text_frame
        tf_i.word_wrap = True
        p_k = tf_i.paragraphs[0]
        p_k.text = kw
        p_k.font.size = Pt(16)
        p_k.font.bold = True
        p_k.font.color.rgb = CYAN if idx < 3 else EMERALD

        p_t = tf_i.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(10.5)
        p_t.font.bold = True
        p_t.font.color.rgb = WHITE

        p_d = tf_i.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(8.5)
        p_d.font.color.rgb = TEXT_MUTED

    # Bottom Journey Super-Arrow
    super_arrow = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.65), Inches(11.733), Inches(0.65))
    super_arrow.fill.solid()
    super_arrow.fill.fore_color.rgb = CARD_BG
    super_arrow.line.color.rgb = CYAN
    super_arrow.line.width = Pt(1.5)
    tf_sa = super_arrow.text_frame
    p_sa = tf_sa.paragraphs[0]
    p_sa.text = "PROBLEM  ➔  AI  ➔  COLLABORATION  ➔  INNOVATION  ➔  DEPLOYMENT  ➔  IMPACT"
    p_sa.font.size = Pt(11)
    p_sa.font.bold = True
    p_sa.font.color.rgb = CYAN
    p_sa.alignment = PP_ALIGN.CENTER

    # Final Statement
    stmt_box = s6.shapes.add_textbox(Inches(0.8), Inches(6.45), Inches(11.733), Inches(0.7))
    tf_stmt = stmt_box.text_frame
    p_st = tf_stmt.paragraphs[0]
    p_st.text = "“CivicSolve doesn’t just collect problems. It creates the pathway to solve them.”"
    p_st.font.size = Pt(14)
    p_st.font.bold = True
    p_st.font.color.rgb = WHITE
    p_st.alignment = PP_ALIGN.CENTER

    output_pptx = "CivicSolve_Presentation.pptx"
    prs.save(output_pptx)
    print(f"Presentation saved successfully to {output_pptx}!")

if __name__ == "__main__":
    create_presentation()
