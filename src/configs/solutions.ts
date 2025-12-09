export interface SolutionMeta {
  id: number;
  title: string;
  description: string;
  image: string;
  componentName: string;
}

export interface SolutionConfig extends SolutionMeta {
  component: React.ComponentType;
  code: string;
  css: string;
}

// Each solution folder exports: default (component), meta, code, css
interface SolutionModule {
  default: React.ComponentType;
  meta: SolutionMeta;
  code: string;
  css: string;
}

// Dynamically load all solutions using require.context
// Each solution folder must have: index.ts that exports default, meta, code, css
const solutionContext = require.context(
  '../components/Solutions',
  true,
  /^\.\/[^/]+\/index\.ts$/
);

const solutions: SolutionConfig[] = [];

solutionContext.keys().forEach((key: string) => {
  try {
    const module = solutionContext(key) as SolutionModule;

    if (module.meta && module.default) {
      solutions.push({
        ...module.meta,
        component: module.default,
        code: module.code || '',
        css: module.css || '',
      });
    }
  } catch (e) {
    console.error(`Failed to load solution from ${key}:`, e);
  }
});

// Sort by id
solutions.sort((a, b) => a.id - b.id);

export default solutions;
