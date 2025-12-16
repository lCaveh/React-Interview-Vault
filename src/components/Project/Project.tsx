import React, { useState, useEffect, ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LiveProvider, LiveEditor, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';
import solutions from '@configs/solutions';
import './Project.css';

const MOBILE_BREAKPOINT = 768;

const processCodeForLive = (code: string): string => {
    return code
        .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
        .replace(/^import\s+['"].*?['"];?\s*$/gm, '')
        .replace(/^export\s+(const|function|class)\s+/gm, '$1 ')
        .replace(/^export\s+default\s+\w+;?\s*$/gm, '')
        .replace(/\n\s*data-testid=\{`[^`]+`\}/g, '')
        .replace(/\n\s*data-testid="[^"]+"/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};

const Project = (): ReactElement => {
    const navigate = useNavigate();
    const { solutionId: solutionIdParam } = useParams<{ solutionId: string }>();
    const [activeTab, setActiveTab] = useState<'component' | 'css' | 'preview'>('component');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const solutionIdNum = parseInt(solutionIdParam || '0');
    const solution = solutions.find((s) => s.id === solutionIdNum);

    const initialCode = solution?.code ? processCodeForLive(solution.code) : '';
    const [componentCode, setComponentCode] = useState(initialCode);
    const [cssCode, setCssCode] = useState(solution?.css || '');

    if (!solution) {
        return <div className="project-container">Solution not found</div>;
    }

    const scope = {
        React,
        useState: React.useState,
        useEffect: React.useEffect,
        useCallback: React.useCallback,
        useMemo: React.useMemo,
        useRef: React.useRef,
        useContext: React.useContext,
        useReducer: React.useReducer,
    };

    const liveCode = `${componentCode}

render(<${solution.componentName} />)`;

    const renderPreview = () => (
        <LiveProvider
            code={liveCode}
            scope={scope}
            noInline={true}
            theme={themes.vsLight}
        >
            <div className="preview-wrapper">
                <style>{cssCode}</style>
                <LivePreview />
            </div>
        </LiveProvider>
    );

    const renderComponentEditor = () => (
        <LiveProvider
            code={componentCode}
            theme={themes.vsLight}
            language="tsx"
        >
            <LiveEditor
                onChange={setComponentCode}
                className="live-editor"
                data-testid="component-textarea"
            />
        </LiveProvider>
    );

    const renderCssEditor = () => (
        <LiveProvider
            code={cssCode}
            theme={themes.vsLight}
            language="css"
        >
            <LiveEditor
                onChange={setCssCode}
                className="live-editor"
                data-testid="css-textarea"
            />
        </LiveProvider>
    );

    return (
        <main className="project-container" id="main-content">
            <header className="project-header">
                <button
                    className="back-button"
                    onClick={() => navigate('/main')}
                    data-testid="back-button"
                    aria-label="Go back to solutions list"
                >
                    ← Back
                </button>
                <h1>{solution.title}</h1>
            </header>

            <div className="project-content">
                <section className="left-panel" aria-label="Code editor">
                    <nav className="tabs" role="tablist" aria-label="Editor tabs">
                        <button
                            className={`tab ${activeTab === 'component' ? 'active' : ''}`}
                            onClick={() => setActiveTab('component')}
                            data-testid="tab-component"
                            role="tab"
                            aria-selected={activeTab === 'component'}
                            aria-controls="panel-component"
                            id="tab-component"
                        >
                            React Component
                        </button>
                        <button
                            className={`tab ${activeTab === 'css' ? 'active' : ''}`}
                            onClick={() => setActiveTab('css')}
                            data-testid="tab-css"
                            role="tab"
                            aria-selected={activeTab === 'css'}
                            aria-controls="panel-css"
                            id="tab-css"
                        >
                            CSS
                        </button>
                        <button
                            className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preview')}
                            data-testid="tab-preview"
                            role="tab"
                            aria-selected={activeTab === 'preview'}
                            aria-controls="panel-preview"
                            id="tab-preview"
                        >
                            Preview
                        </button>
                    </nav>

                    <div className="code-editor">
                        {activeTab === 'component' && (
                            <div
                                role="tabpanel"
                                id="panel-component"
                                aria-labelledby="tab-component"
                            >
                                {renderComponentEditor()}
                            </div>
                        )}
                        {activeTab === 'css' && (
                            <div
                                role="tabpanel"
                                id="panel-css"
                                aria-labelledby="tab-css"
                            >
                                {renderCssEditor()}
                            </div>
                        )}
                        {activeTab === 'preview' && isMobile && (
                            <div
                                data-testid="preview-iframe-mobile"
                                role="tabpanel"
                                id="panel-preview"
                                aria-labelledby="tab-preview"
                                aria-label="Live preview of your component"
                            >
                                {renderPreview()}
                            </div>
                        )}
                    </div>
                </section>

                {!isMobile && (
                    <aside className="right-panel" aria-label="Live preview">
                        <div className="preview-header">
                            <h2>Preview</h2>
                        </div>
                        <div
                            data-testid="preview-iframe-desktop"
                            aria-label="Live preview of your component"
                            role="region"
                        >
                            {renderPreview()}
                        </div>
                    </aside>
                )}
            </div>
        </main>
    );
};

export { Project };
