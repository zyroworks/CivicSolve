import json
import math
import os

def generate_svg():
    geojson_path = 'public/data/jharkhand.geojson'
    if not os.path.exists(geojson_path):
        print(f"Error: {geojson_path} not found.")
        return

    with open(geojson_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Calculate exact bounds
    all_points = []
    for feature in data['features']:
        geom = feature['geometry']
        def extract_pts(coords):
            for item in coords:
                if isinstance(item[0], list):
                    extract_pts(item)
                else:
                    all_points.append(item)
        extract_pts(geom['coordinates'])

    min_lng = min(p[0] for p in all_points)
    max_lng = max(p[0] for p in all_points)
    min_lat = min(p[1] for p in all_points)
    max_lat = max(p[1] for p in all_points)

    avg_lat = (min_lat + max_lat) / 2.0
    cos_factor = math.cos(math.radians(avg_lat))

    # Calculate Mercator metric spans
    span_x = (max_lng - min_lng) * cos_factor
    span_y = (max_lat - min_lat)

    view_w, view_h = 640, 480
    pad = 25
    scale_x = (view_w - 2 * pad) / span_x
    scale_y = (view_h - 2 * pad) / span_y
    scale = min(scale_x, scale_y)

    offset_x = pad + ((view_w - 2 * pad) - span_x * scale) / 2
    offset_y = pad + ((view_h - 2 * pad) - span_y * scale) / 2

    def project(lng, lat):
        x = offset_x + (lng - min_lng) * cos_factor * scale
        y = offset_y + (max_lat - lat) * scale
        return round(x, 2), round(y, 2)

    svg_paths = []
    district_labels = []

    district_colors = [
        "#0f1e36", "#122543", "#142c50", "#17335d", "#1a3a6b",
        "#112a4c", "#163158", "#1c3d6e", "#1e447b", "#183763",
        "#132849", "#152f55", "#193c68", "#1d4576", "#204e85",
        "#14294b", "#17355e", "#1b3f71", "#1e4881", "#225292",
        "#163056", "#193966", "#1e4379", "#214c89"
    ]

    for idx, feature in enumerate(data['features']):
        props = feature.get('properties', {})
        dist_name = props.get('Dist_Name', f'District {idx+1}')
        geom = feature['geometry']
        g_type = geom['type']

        color = district_colors[idx % len(district_colors)]
        is_highlight = dist_name in ['Ranchi', 'Palamu', 'Dhanbad', 'Hazaribagh', 'East Singhbhum']

        def ring_to_path(ring):
            pts = [project(p[0], p[1]) for p in ring]
            if not pts:
                return ""
            d = f"M {pts[0][0]} {pts[0][1]} "
            for p in pts[1:]:
                d += f"L {p[0]} {p[1]} "
            d += "Z"
            return d

        path_d_list = []
        ring_pts_for_centroid = []
        if g_type == 'Polygon':
            for ring in geom['coordinates']:
                path_d_list.append(ring_to_path(ring))
                ring_pts_for_centroid.extend(ring)
        elif g_type == 'MultiPolygon':
            for poly in geom['coordinates']:
                for ring in poly:
                    path_d_list.append(ring_to_path(ring))
                    ring_pts_for_centroid.extend(ring)

        full_d = " ".join(path_d_list)
        
        if ring_pts_for_centroid:
            c_lng = sum(p[0] for p in ring_pts_for_centroid) / len(ring_pts_for_centroid)
            c_lat = sum(p[1] for p in ring_pts_for_centroid) / len(ring_pts_for_centroid)
            cx, cy = project(c_lng, c_lat)
            district_labels.append((dist_name, cx, cy, is_highlight))

        stroke_color = "#38bdf8" if is_highlight else "#1e3a5f"
        stroke_width = "1.5" if is_highlight else "1"
        fill_opacity = "0.75" if is_highlight else "0.45"

        svg_paths.append(
            f'    <path id="dist-{idx}" data-district="{dist_name}" d="{full_d}" '
            f'fill="{color}" fill-opacity="{fill_opacity}" stroke="{stroke_color}" stroke-width="{stroke_width}" '
            f'class="district-path transition-all duration-200 hover:fill-opacity-90 hover:stroke-cyan-400" />'
        )

    markers = [
        {"id": "marker-water", "type": "Water", "label": "Water Supply Issue", "lat": 24.0384, "lng": 84.0700, "district": "Palamu", "priority": "P1", "color": "#00F0FF", "icon": "💧", "active": True},
        {"id": "marker-sanitation", "type": "Sanitation", "label": "Solid Waste Dumping", "lat": 23.3753, "lng": 85.3344, "district": "Ranchi", "priority": "P1", "color": "#F59E0B", "icon": "♻️", "active": False},
        {"id": "marker-road", "type": "Road", "label": "Damaged Culvert & Potholes", "lat": 23.7957, "lng": 86.4304, "district": "Dhanbad", "priority": "P2", "color": "#FB923C", "icon": "🛣️", "active": False},
        {"id": "marker-health", "type": "Healthcare", "label": "PHC Cold Storage Failure", "lat": 23.9925, "lng": 85.3637, "district": "Hazaribagh", "priority": "P1", "color": "#10B981", "icon": "🏥", "active": False},
        {"id": "marker-edu", "type": "Education", "label": "Digital Lab Connectivity", "lat": 22.8046, "lng": 86.2029, "district": "East Singhbhum", "priority": "P2", "color": "#818CF8", "icon": "🎓", "active": False},
    ]

    marker_svg = []
    for m in markers:
        mx, my = project(m['lng'], m['lat'])
        m['x'] = mx
        m['y'] = my
        marker_svg.append(f"""
    <!-- Marker: {m['label']} ({m['district']}) -->
    <g class="problem-marker {'active-marker' if m['active'] else ''}" transform="translate({mx}, {my})" data-type="{m['type']}" data-id="{m['id']}">
      {'<circle r="18" fill="none" stroke="' + m['color'] + '" stroke-width="1.5" opacity="0.4" class="animate-ping" />' if m['active'] else ''}
      <circle r="12" fill="{m['color']}" fill-opacity="0.25" stroke="{m['color']}" stroke-width="2" />
      <circle r="6" fill="{m['color']}" />
      <text y="4" text-anchor="middle" font-size="9" fill="#ffffff" font-weight="bold">{m['icon']}</text>
      <text y="-14" text-anchor="middle" font-size="10" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))">{m['district']}</text>
    </g>""")

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {view_w} {view_h}" class="w-full h-full drop-shadow-2xl">
  <defs>
    <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background grid decoration -->
  <g opacity="0.12" stroke="#38bdf8" stroke-width="0.5">
    {''.join(f'<line x1="{x}" y1="0" x2="{x}" y2="{view_h}" />' for x in range(0, view_w, 40))}
    {''.join(f'<line x1="0" y1="{y}" x2="{view_w}" y2="{y}" />' for y in range(0, view_h, 40))}
  </g>

  <!-- District Polygons -->
  <g id="districts-layer">
{chr(10).join(svg_paths)}
  </g>

  <!-- District Labels -->
  <g id="district-labels" font-family="'Inter', sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle" pointer-events="none">
{chr(10).join(f'    <text x="{l[1]}" y="{l[2]}" fill="{"#38bdf8" if l[3] else "#64748b"}" font-weight="{"700" if l[3] else "500"}" opacity="0.8">{l[0]}</text>' for l in district_labels if l[3] or l[0] in ['Dumka', 'Giridih', 'Bokaro', 'Latehar', 'Garhwa', 'Deoghar', 'Gumla', 'West Singhbhum'])}
  </g>

  <!-- Problem Markers -->
  <g id="markers-layer">
{''.join(marker_svg)}
  </g>
</svg>"""

    os.makedirs('public', exist_ok=True)
    with open('public/jharkhand_state_map.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    with open('scripts/jharkhand_svg_data.json', 'w', encoding='utf-8') as f:
        json.dump({"svg": svg_content, "markers": markers}, f, indent=2)

    print("Jharkhand SVG generated successfully!")

if __name__ == '__main__':
    generate_svg()
