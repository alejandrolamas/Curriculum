import { create } from 'zustand';

export type Section = 'home' | 'profile' | 'experience' | 'projects' | 'skills' | 'blog' | 'contact';

// Phases: idle -> zoomOut (if not from home) -> zoomToNode -> showContent -> idle
type TransitionPhase = 'idle' | 'zoomOut' | 'zoomToNode' | 'showContent';

interface NeuralState {
  // Navigation
  activeSection: Section;
  previousSection: Section | null;
  setActiveSection: (section: Section, updateUrl?: boolean) => void;
  
  // Mobile detection
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  
  // Transition Animation
  transitionPhase: TransitionPhase;
  setTransitionPhase: (phase: TransitionPhase) => void;
  targetSection: Section | null;
  initiateTransition: (section: Section, updateUrl?: boolean) => void;
  
  // Camera target for zoom animation
  cameraTarget: [number, number, number];
  setCameraTarget: (target: [number, number, number]) => void;
  cameraLookAt: [number, number, number];
  setCameraLookAt: (lookAt: [number, number, number]) => void;
  isZooming: boolean;
  setIsZooming: (zooming: boolean) => void;
  
  // Command Palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  
  // Theme - always dark for space effect
  isDarkMode: true;
  
  // 3D Scene
  cameraPosition: [number, number, number];
  setCameraPosition: (position: [number, number, number]) => void;
  
  // Core expanded state
  coreExpanded: boolean;
  setCoreExpanded: (expanded: boolean) => void;
  
  // Mouse position for particles
  mousePosition: { x: number; y: number };
  setMousePosition: (position: { x: number; y: number }) => void;
  
  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Modal states
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  
  // Blog post for deep linking
  activeBlogPostId: number | null;
  setActiveBlogPostId: (id: number | null, updateUrl?: boolean, slug?: string) => void;
}

// Node positions in 3D space - constellation in top-left area
// Centered enough to be visible but still left-biased
export const nodePositions: Record<Section, [number, number, number]> = {
  home: [0, 0, 0],
  profile:    [-3.5,   2.0,   0],
  experience: [-2.0,   0.8,   0],
  projects:   [-4.0,  -0.5,   0],
  skills:     [-1.0,   2.5,   0],
  blog:       [-2.8,   3.2,   0],
  contact:    [-0.5,   0.0,   0],
};

// Mobile-friendly positions (more centered)
export const mobileNodePositions: Record<Section, [number, number, number]> = {
  home: [0, 0, 0],
  profile:    [-1.5,   1.8,   0],
  experience: [-0.3,   0.8,   0],
  projects:   [-2.0,  -0.3,   0],
  skills:     [ 0.8,   2.0,   0],
  blog:       [-1.0,   2.8,   0],
  contact:    [ 1.0,   0.0,   0],
};

// Camera for HOME: positioned to see planets
export const HOME_CAMERA_POSITION: [number, number, number] = [0, 0, 15];
export const HOME_CAMERA_LOOKAT: [number, number, number] = [0, 0, 0];

// Mobile camera position (same Z, slightly higher to see all planets)
export const MOBILE_HOME_CAMERA_POSITION: [number, number, number] = [0, 1, 15];

// Camera for SECTION: zooms close to the node (original style zoom)
export const getCameraPositionForNode = (section: Section, isMobile: boolean = false): [number, number, number] => {
  if (section === 'home') return isMobile ? MOBILE_HOME_CAMERA_POSITION : HOME_CAMERA_POSITION;
  const positions = isMobile ? mobileNodePositions : nodePositions;
  const nodePos = positions[section];
  // Camera close to node for nice zoom effect
  return [nodePos[0], nodePos[1], nodePos[2] + 3];
};

export const getCameraLookAtForNode = (section: Section, isMobile: boolean = false): [number, number, number] => {
  if (section === 'home') return HOME_CAMERA_LOOKAT;
  const positions = isMobile ? mobileNodePositions : nodePositions;
  const nodePos = positions[section];
  return [nodePos[0], nodePos[1], nodePos[2]];
};

// Zoom out position (bird's eye for section-to-section transitions)
export const ZOOM_OUT_POSITION: [number, number, number] = [0, 0, 10];
export const ZOOM_OUT_LOOKAT: [number, number, number] = [0, 0, 0];

export const useNeuralStore = create<NeuralState>((set, get) => ({
  // Navigation
  activeSection: 'home',
  previousSection: null,
  setActiveSection: (section, updateUrl = true) => {
    const isMobile = get().isMobile;
    const cameraPos = getCameraPositionForNode(section, isMobile);
    const lookAt = getCameraLookAtForNode(section, isMobile);
    
    // Update URL hash
    if (updateUrl && typeof window !== 'undefined') {
      const hash = section === 'home' ? '' : `#${section}`;
      window.history.replaceState(null, '', hash || window.location.pathname);
    }
    
    set((state) => ({ 
      previousSection: state.activeSection,
      activeSection: section,
      coreExpanded: false,
      transitionPhase: 'idle',
      targetSection: null,
      // Keep camera at section position
      cameraTarget: cameraPos,
      cameraLookAt: lookAt,
      isZooming: section !== 'home',
      // Clear blog post when changing section
      activeBlogPostId: section === 'blog' ? state.activeBlogPostId : null,
    }));
  },
  
  // Mobile detection
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  
  // Transition Animation
  transitionPhase: 'idle',
  setTransitionPhase: (phase) => set({ transitionPhase: phase }),
  targetSection: null,
  initiateTransition: (section, updateUrl = true) => {
    const currentSection = get().activeSection;
    const isMobile = get().isMobile;
    const isFromHome = currentSection === 'home';
    
    // Update URL hash
    if (updateUrl && typeof window !== 'undefined') {
      const hash = section === 'home' ? '' : `#${section}`;
      window.history.replaceState(null, '', hash || window.location.pathname);
    }
    
    if (isFromHome) {
      // From home: go directly to node
      const cameraPos = getCameraPositionForNode(section, isMobile);
      const lookAt = getCameraLookAtForNode(section, isMobile);
      set({ 
        targetSection: section, 
        transitionPhase: 'zoomToNode',
        cameraTarget: cameraPos,
        cameraLookAt: lookAt,
        isZooming: true,
      });
    } else {
      // From another section: zoom out first, then to node
      set({ 
        targetSection: section, 
        transitionPhase: 'zoomOut',
        cameraTarget: ZOOM_OUT_POSITION,
        cameraLookAt: ZOOM_OUT_LOOKAT,
        isZooming: true,
      });
    }
  },
  
  // Camera zoom
  cameraTarget: [0, 0, 10],
  setCameraTarget: (target) => set({ cameraTarget: target }),
  cameraLookAt: [0, 0, 0],
  setCameraLookAt: (lookAt) => set({ cameraLookAt: lookAt }),
  isZooming: false,
  setIsZooming: (zooming) => set({ isZooming: zooming }),
  
  // Command Palette
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  
  // Theme - always dark for space
  isDarkMode: true,
  
  // 3D Scene
  cameraPosition: [0, 0, 8],
  setCameraPosition: (position) => set({ cameraPosition: position }),
  
  // Core
  coreExpanded: false,
  setCoreExpanded: (expanded) => set({ coreExpanded: expanded }),
  
  // Mouse
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (position) => set({ mousePosition: position }),
  
  // Loading
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // Modal
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal }),
  
  // Blog post deep linking (stores slug instead of id)
  activeBlogPostId: null,
  setActiveBlogPostId: (id, updateUrl = true, slug?: string) => {
    if (updateUrl && typeof window !== 'undefined') {
      if (id && slug) {
        window.history.replaceState(null, '', `#blog/${slug}`);
      } else if (id) {
        window.history.replaceState(null, '', `#blog/post/${id}`);
      } else {
        const currentSection = get().activeSection;
        const hash = currentSection === 'home' ? '' : `#${currentSection}`;
        window.history.replaceState(null, '', hash || window.location.pathname);
      }
    }
    set({ activeBlogPostId: id });
  },
}));
