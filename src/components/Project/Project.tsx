import React, { useState, useEffect, ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
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

    const scope = { React, useState: React.useState };

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
                <LiveError className="live-error" />
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
        <div className="project-container">
            <div className="project-header">
                <button
                    className="back-button"
                    onClick={() => navigate('/main')}
                    data-testid="back-button"
                    aria-label="Back to main"
                >
                    ← Back
                </button>
                <h1>{solution.title}</h1>
            </div>

            <div className="project-content">
                <div className="left-panel">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'component' ? 'active' : ''}`}
                            onClick={() => setActiveTab('component')}
                            data-testid="tab-component"
                        >
                            React Component
                        </button>
                        <button
                            className={`tab ${activeTab === 'css' ? 'active' : ''}`}
                            onClick={() => setActiveTab('css')}
                            data-testid="tab-css"
                        >
                            CSS
                        </button>
                        <button
                            className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preview')}
                            data-testid="tab-preview"
                        >
                            Preview
                        </button>
                    </div>

                    <div className="code-editor">
                        {activeTab === 'component' && renderComponentEditor()}
                        {activeTab === 'css' && renderCssEditor()}
                        {activeTab === 'preview' && isMobile && (
                            <div data-testid="preview-iframe-mobile">
                                {renderPreview()}
                            </div>
                        )}
                    </div>
                </div>

                {!isMobile && (
                    <div className="right-panel">
                        <div className="preview-header">
                            <h2>Preview</h2>
                        </div>
                        <div data-testid="preview-iframe-desktop">
                            {renderPreview()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Project };
