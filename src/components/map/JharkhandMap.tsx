import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Challenge } from '../../types';
import { LocateFixed, ZoomIn, ZoomOut, Layers, Compass, Map as MapIcon } from 'lucide-react';
import { 
  JHARKHAND_GEOJSON, 
  JHARKHAND_MASK_GEOJSON, 
  DISTRICT_CENTROIDS,
  JHARKHAND_BOUNDS 
} from '../../data/jharkhandGeoJSON';

interface JharkhandMapProps {
  challenges: Challenge[];
  selectedChallenge: Challenge | null;
  onSelectChallenge: (challenge: Challenge) => void;
  selectedDistrict?: string;
  onSelectDistrict?: (district: string) => void;
  className?: string;
}

// Distinct cohesive color palette for the 24 districts of Jharkhand
const DISTRICT_PALETTE: string[] = [
  '#1E3A8A', '#1E40AF', '#1D4ED8', '#2563EB', '#0284C7',
  '#0369A1', '#075985', '#0F766E', '#0D9488', '#14B8A6',
  '#1E293B', '#334155', '#1E3A5F', '#1B3B6F', '#212D40',
  '#114B5F', '#1A535C', '#1D3557', '#2A475E', '#1C3144',
  '#2C5282', '#2B6CB0', '#3182CE', '#2B4C7E'
];

export const JharkhandMap: React.FC<JharkhandMapProps> = ({
  challenges,
  selectedChallenge,
  onSelectChallenge,
  selectedDistrict = 'ALL',
  onSelectDistrict,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const maskLayerRef = useRef<L.GeoJSON | null>(null);
  const districtsLayerRef = useRef<L.GeoJSON | null>(null);
  const districtLabelsLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [useTileOverlay, setUseTileOverlay] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Calculate strict Jharkhand bounding box
    const southWest = L.latLng(JHARKHAND_BOUNDS[0][0], JHARKHAND_BOUNDS[0][1]);
    const northEast = L.latLng(JHARKHAND_BOUNDS[1][0], JHARKHAND_BOUNDS[1][1]);
    const jharkhandBounds = L.latLngBounds(southWest, northEast);

    const map = L.map(mapContainerRef.current, {
      center: [23.65, 85.61],
      zoom: 8,
      minZoom: 7,
      maxZoom: 16,
      maxBounds: jharkhandBounds.pad(0.1),
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    });

    // 1. Primary Jharkhand Districts Layer (Main Geographic Shape)
    const districtsLayer = L.geoJSON(JHARKHAND_GEOJSON, {
      style: (feature) => {
        const distName = feature?.properties?.Dist_Name || '';
        const isSelected = selectedDistrict !== 'ALL' && 
          distName.toLowerCase() === selectedDistrict.toLowerCase();

        // Stable color per district
        const featureIdx = Math.abs(
          distName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
        ) % DISTRICT_PALETTE.length;
        const baseColor = DISTRICT_PALETTE[featureIdx];

        return {
          fillColor: isSelected ? '#00F5D4' : baseColor,
          fillOpacity: isSelected ? 0.85 : 0.65,
          color: isSelected ? '#FFFFFF' : '#38BDF8',
          weight: isSelected ? 3.5 : 1.5,
          opacity: 0.95,
          dashArray: isSelected ? undefined : '2, 3',
        };
      },
      onEachFeature: (feature, layer) => {
        const distName = feature?.properties?.Dist_Name || '';
        
        // Count matching challenges for tooltip
        const count = challenges.filter(
          (c) => c.location.district.toLowerCase() === distName.toLowerCase()
        ).length;

        layer.bindTooltip(
          `<div class="p-1 text-center font-sans">
            <div class="font-extrabold text-xs text-slate-900 uppercase tracking-wide">${distName}</div>
            <div class="text-[11px] font-semibold text-primary-600 mt-0.5">
              ${count} ${count === 1 ? 'Challenge' : 'Challenges'} Reported
            </div>
            <div class="text-[9px] text-slate-400 mt-0.5 font-medium">Click district to filter</div>
          </div>`,
          { sticky: true, className: 'civicsolve-district-tooltip' }
        );

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              fillOpacity: 0.9,
              weight: 3,
              color: '#FFFFFF',
            });
            target.bringToFront();
            if (markersLayerRef.current) {
              // Keep markers above highlighted polygons
              markersLayerRef.current.eachLayer((m: any) => m.setZIndexOffset?.(500));
            }
          },
          mouseout: (e) => {
            districtsLayer.resetStyle(e.target);
          },
          click: () => {
            if (onSelectDistrict) {
              onSelectDistrict(distName);
            }
            const b = (layer as any).getBounds?.();
            if (b && b.isValid()) {
              map.fitBounds(b, { padding: [40, 40], maxZoom: 11, duration: 1.0 });
            }
          },
        });
      },
    }).addTo(map);
    districtsLayerRef.current = districtsLayer;

    // 2. District Centroid Label Badges
    const districtLabelsLayer = L.layerGroup().addTo(map);
    districtLabelsLayerRef.current = districtLabelsLayer;

    // 3. Challenge Markers Layer
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    mapInstanceRef.current = map;

    // Fit strictly to Jharkhand GeoJSON bounds
    const layerBounds = districtsLayer.getBounds();
    if (layerBounds.isValid()) {
      map.fitBounds(layerBounds, {
        padding: [24, 24],
        maxZoom: 9,
      });
    }

    // Auto-fit strictly to Jharkhand after container layout settles
    const fitTimer = setTimeout(() => {
      map.invalidateSize();
      if (layerBounds.isValid()) {
        map.fitBounds(layerBounds, {
          padding: [24, 24],
          maxZoom: 9,
        });
      }
    }, 150);

    return () => {
      clearTimeout(fitTimer);
      map.remove();
      mapInstanceRef.current = null;
      districtsLayerRef.current = null;
      districtLabelsLayerRef.current = null;
      markersLayerRef.current = null;
      tileLayerRef.current = null;
      maskLayerRef.current = null;
    };

  }, []);

  // Toggle Street Base Layer + 100% Solid Inverted Mask
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (useTileOverlay) {
      if (!tileLayerRef.current) {
        const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          opacity: 0.9,
        });
        tileLayerRef.current = tile;
      }
      tileLayerRef.current.addTo(map);
      tileLayerRef.current.bringToBack();

      // Solid Mask (100% opaque outside Jharkhand)
      if (!maskLayerRef.current) {
        const mask = L.geoJSON(JHARKHAND_MASK_GEOJSON, {
          style: {
            fillColor: '#0B132B',
            fillOpacity: 1.0, // 100% SOLID — zero leakage of other states or India
            color: '#3B82F6',
            weight: 3.5,
            opacity: 1,
          },
          interactive: false,
        });
        maskLayerRef.current = mask;
      }
      maskLayerRef.current.addTo(map);
    } else {
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }
      if (maskLayerRef.current) {
        map.removeLayer(maskLayerRef.current);
      }
    }
  }, [useTileOverlay]);

  // Update District Highlights when selectedDistrict changes
  useEffect(() => {
    const districtsLayer = districtsLayerRef.current;
    if (!districtsLayer) return;

    districtsLayer.setStyle((feature) => {
      const distName = feature?.properties?.Dist_Name || '';
      const isSelected = selectedDistrict !== 'ALL' && 
        distName.toLowerCase() === selectedDistrict.toLowerCase();

      const featureIdx = Math.abs(
        distName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
      ) % DISTRICT_PALETTE.length;
      const baseColor = DISTRICT_PALETTE[featureIdx];

      return {
        fillColor: isSelected ? '#00F5D4' : baseColor,
        fillOpacity: isSelected ? 0.9 : useTileOverlay ? 0.45 : 0.7,
        color: isSelected ? '#FFFFFF' : '#38BDF8',
        weight: isSelected ? 3.5 : 1.5,
        opacity: 0.95,
        dashArray: isSelected ? undefined : '2, 3',
      };
    });
  }, [selectedDistrict, useTileOverlay]);

  // Update District Label Badges
  useEffect(() => {
    const districtLabelsLayer = districtLabelsLayerRef.current;
    if (!districtLabelsLayer) return;

    districtLabelsLayer.clearLayers();

    Object.entries(DISTRICT_CENTROIDS).forEach(([name, coords]) => {
      // Find challenge count in this district
      const count = challenges.filter(
        (c) => c.location.district.toLowerCase() === name.toLowerCase()
      ).length;

      const isSelected = selectedDistrict !== 'ALL' && 
        selectedDistrict.toLowerCase() === name.toLowerCase();

      const labelHtml = `
        <div class="pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 select-none group transition-transform hover:scale-110">
          <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md border backdrop-blur-md transition-all ${
            isSelected
              ? 'bg-cyan-400 text-slate-950 border-white ring-2 ring-cyan-300 scale-110 font-extrabold'
              : 'bg-slate-900/85 text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:text-white'
          }">
            <span>${name}</span>
            ${
              count > 0
                ? `<span class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold ${
                    isSelected ? 'bg-slate-950 text-cyan-400' : 'bg-primary-600 text-white'
                  }">${count}</span>`
                : ''
            }
          </div>
        </div>
      `;

      const labelIcon = L.divIcon({
        className: 'civicsolve-district-label',
        html: labelHtml,
        iconSize: [0, 0],
      });

      const labelMarker = L.marker([coords.lat, coords.lng], {
        icon: labelIcon,
        interactive: true,
        zIndexOffset: isSelected ? 800 : 100,
      });

      labelMarker.on('click', () => {
        if (onSelectDistrict) {
          onSelectDistrict(name);
        }
      });

      districtLabelsLayer.addLayer(labelMarker);
    });
  }, [challenges, selectedDistrict, onSelectDistrict]);

  // Update Challenge Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // Render markers strictly for challenges located inside Jharkhand
    challenges.forEach((challenge) => {
      if (!challenge.location || typeof challenge.location.lat !== 'number' || typeof challenge.location.lng !== 'number') {
        return;
      }

      const isSelected = selectedChallenge?.id === challenge.id;
      const isP1 = challenge.priority === 'P1';
      const isP2 = challenge.priority === 'P2';
      const isResolved = challenge.status === 'RESOLVED' || challenge.status === 'DEPLOYED';

      let primaryColor = '#3B82F6'; // P3
      let badgeLabel = 'P3';

      if (isResolved) {
        primaryColor = '#10B981'; // Resolved
        badgeLabel = 'Resolved';
      } else if (isP1) {
        primaryColor = '#EF4444'; // P1 Urgent
        badgeLabel = 'P1 Urgent';
      } else if (isP2) {
        primaryColor = '#F59E0B'; // P2 Elevated
        badgeLabel = 'P2 Medium';
      }

      const iconHtml = `
        <div class="relative group cursor-pointer" style="transform: translate(-50%, -100%);">
          ${
            isP1 && !isResolved
              ? `<div class="absolute -inset-2.5 rounded-full bg-rose-500/40 animate-ping" style="top: -2px; left: -2px; width: 36px; height: 36px;"></div>`
              : ''
          }
          <div 
            class="relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-200 ${
              isSelected ? 'scale-125 ring-4 ring-offset-2 ring-white z-50' : 'hover:scale-115'
            }"
            style="
              width: ${isSelected ? '38px' : '30px'};
              height: ${isSelected ? '38px' : '30px'};
              background-color: ${primaryColor};
              border: 2.5px solid #FFFFFF;
            "
          >
            <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="currentColor"></circle>
            </svg>
          </div>
          <div 
            class="w-2 h-2 mx-auto rotate-45 -mt-1 shadow-md"
            style="background-color: ${primaryColor};"
          ></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'civicsolve-custom-marker',
        html: iconHtml,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      });

      const marker = L.marker([challenge.location.lat, challenge.location.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1200 : isP1 ? 700 : 300,
      });

      const uploadedImg = challenge.mediaUrl || challenge.media?.[0]?.file_url;
      const hasUploadedImage = Boolean(uploadedImg && uploadedImg.trim().length > 0);

      const formattedDate = challenge.createdAt 
        ? new Date(challenge.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Recently reported';

      let statusLabel = 'Reported';
      let statusBadgeStyle = 'background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE;';
      if (challenge.status === 'RESOLVED' || challenge.status === 'DEPLOYED') {
        statusLabel = 'Solved';
        statusBadgeStyle = 'background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0;';
      } else if (challenge.status === 'IN_PROGRESS' || challenge.status === 'FIELD_PILOT' || challenge.status === 'LAB_MATCHED') {
        statusLabel = 'In Progress';
        statusBadgeStyle = 'background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A;';
      }

      const safeTitle = (challenge.title || 'Civic Challenge').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      const rawDesc = challenge.description || 'Community reported issue requiring technical assessment and municipal resolution.';
      const safeDesc = (rawDesc.length > 95 ? rawDesc.slice(0, 95) + '...' : rawDesc)
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      const locationText = `${challenge.location.ward ? challenge.location.ward + ', ' : ''}${challenge.location.district}`;

      const imageHeaderHtml = hasUploadedImage
        ? `
          <div style="width: 100%; height: 130px; position: relative; background: #F1F5F9; overflow: hidden;">
            <img 
              src="${uploadedImg}" 
              alt="${safeTitle}" 
              style="width: 100%; height: 100%; object-fit: cover; display: block;" 
              onerror="this.parentElement.style.display='none';"
            />
            <div style="position: absolute; top: 8px; left: 8px; background: rgba(15, 23, 42, 0.82); backdrop-filter: blur(4px); color: #ffffff; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.025em;">
              ${challenge.category}
            </div>
            <div style="position: absolute; top: 8px; right: 8px; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 6px; ${statusBadgeStyle}">
              ${statusLabel}
            </div>
          </div>
        `
        : `
          <div style="padding: 12px 14px 4px 14px; display: flex; align-items: center; justify-content: space-between;">
            <span style="background: #F1F5F9; color: #334155; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.025em;">
              ${challenge.category}
            </span>
            <span style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 6px; ${statusBadgeStyle}">
              ${statusLabel}
            </span>
          </div>
        `;

      const popupContent = `
        <div style="font-family: Inter, system-ui, -apple-system, sans-serif; width: 280px; max-width: 90vw; background: #ffffff; border-radius: 12px; overflow: hidden;">
          ${imageHeaderHtml}
          <div style="padding: 12px 14px 14px 14px;">
            <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: #64748B; margin-bottom: 4px;">
              <span style="color: #EF4444; font-size: 12px;">📍</span>
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${locationText}</span>
            </div>
            <h4 style="font-size: 13px; font-weight: 700; color: #0F172A; margin: 0 0 6px 0; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${safeTitle}
            </h4>
            <p style="font-size: 11px; color: #475569; margin: 0 0 10px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${safeDesc}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; margin-bottom: 10px; border-top: 1px solid #F1F5F9; font-size: 10px; color: #94A3B8;">
              <span>Reported: ${formattedDate}</span>
              <span style="font-weight: 700; color: ${primaryColor}; background: #F8FAFC; padding: 1px 6px; border-radius: 4px; border: 1px solid #E2E8F0;">${badgeLabel}</span>
            </div>
            <a 
              href="/challenges/${challenge.id}" 
              style="display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; text-align: center; background: #2563EB; color: #ffffff; font-size: 12px; font-weight: 600; padding: 8px 12px; border-radius: 8px; text-decoration: none; box-sizing: border-box;"
            >
              <span>View Problem</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      `;


      marker.bindPopup(popupContent, {
        className: 'civicsolve-rich-popup',
        maxWidth: 300,
        offset: [0, -10],
      });


      marker.on('click', () => {
        onSelectChallenge(challenge);
      });

      markersLayer.addLayer(marker);
    });
  }, [challenges, selectedChallenge, onSelectChallenge]);

  // Smooth fly to selected challenge
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedChallenge) return;

    map.flyTo(
      [selectedChallenge.location.lat, selectedChallenge.location.lng],
      Math.max(map.getZoom(), 12),
      {
        duration: 1.2,
        easeLinearity: 0.25,
      }
    );
  }, [selectedChallenge]);

  // Reset strictly to Jharkhand bounds
  const handleResetToJharkhand = () => {
    const map = mapInstanceRef.current;
    const districtsLayer = districtsLayerRef.current;
    if (!map) return;

    if (districtsLayer && districtsLayer.getBounds().isValid()) {
      map.fitBounds(districtsLayer.getBounds(), {
        padding: [30, 30],
        maxZoom: 9,
        duration: 1.0,
      });
    }
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className={`relative w-full h-full bg-[#0B132B] overflow-hidden ${className}`}>
      {/* High-Tech GIS Blueprint Background Grid (Zero India Map) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Map Target Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Prominent Jharkhand GIS Header Badge */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-blue-500/30 shadow-2xl pointer-events-none">
        <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="flex flex-col">
          <span className="text-xs font-black tracking-wider uppercase text-white">
            Jharkhand Community Map
          </span>
          <span className="text-[10px] text-cyan-400 font-mono font-bold">
            24 Districts • GeoJSON Standalone GIS
          </span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 bottom-8 z-20 flex flex-col gap-2 shadow-2xl">
        {/* Toggle Layer Mode */}
        <button
          onClick={() => setUseTileOverlay(!useTileOverlay)}
          title={useTileOverlay ? 'Switch to Vector GIS Mode' : 'Switch to Street Details Mode'}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl border transition-all hover:scale-105 ${
            useTileOverlay
              ? 'bg-cyan-400 text-slate-950 border-white'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700/80'
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Reset to Jharkhand */}
        <button
          onClick={handleResetToJharkhand}
          title="Reset View to Jharkhand"
          className="w-10 h-10 bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-white rounded-xl flex items-center justify-center shadow-xl border border-slate-700/80 transition-all hover:scale-105"
        >
          <LocateFixed className="w-4 h-4" />
        </button>

        {/* Zoom In & Out */}
        <div className="flex flex-col rounded-xl overflow-hidden shadow-xl border border-slate-700/80">
          <button
            onClick={handleZoomIn}
            title="Zoom in"
            className="w-10 h-10 bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors border-b border-slate-800"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom out"
            className="w-10 h-10 bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
