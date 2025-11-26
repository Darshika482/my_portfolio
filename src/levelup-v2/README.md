# LevelUp V2 - Performance & Engineering Guidelines

## Performance Budgets
- **GPU Memory**: < 100 MB extra (aim for < 100 KB textures where possible).
- **Triangle Count**: < 10k triangles total for visible scene.
- **Draw Calls**: Minimize (use InstancedMesh).
- **FPS**: 60fps on mid-range, 30fps fallback on low-end.
- **Load Time**: LCP < 1s.

## 3D Guidelines
- **Lights**: Max 1 Ambient + 1 Directional/Rim.
- **Shadows**: OFF (bake if necessary, but avoid for this style).
- **Post-processing**: Minimal (single bloom or none).
- **Textures**: Use compressed formats (WebP, KTX2) or procedural generation.
- **Geometry**: Low-poly primitives (Sphere: 64-128 verts).

## Fallback Strategy
- **Low-end/Mobile**: Cap `devicePixelRatio` to 1.5.
- **No WebGL**: Show static PNG of the hero card.
- **Reduced Motion**: Respect user preference.

## Directory Structure
- `components/`: React components.
- `modules/`: Vanilla Three.js logic (lazy-loaded).
- `styles/`: Scoped CSS.
