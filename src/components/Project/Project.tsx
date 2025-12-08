import React, { useState, ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import solutions from '@configs/solutions';
import './Project.css';

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

    const solutionIdNum = parseInt(solutionIdParam || '0');
    const solution = solutions[solutionIdNum];

    const initialCode = solution?.code ? processCodeForLive(solution.code) : '';
    const [componentCode, setComponentCode] = useState(initialCode);
    const [cssCode, setCssCode] = useState(solution?.css || '');

    if (!solution) {
        return <div className="project-container">Solution not found</div>;
    }

    const scope = { React, useState: React.useState };

    const liveCode = `${componentCode}

render(<TicTacToe />)`;

    const renderPreview = () => (
        <LiveProvider
            code={liveCode}
            scope={scope}
            noInline={true}
        >
            <div className="preview-wrapper">
                <style>{cssCode}</style>
                <LivePreview className="live-preview" />
                <LiveError className="live-error" />
            </div>
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
                        {activeTab === 'component' && (
                            <textarea
                                value={componentCode}
                                onChange={(e) => setComponentCode(e.target.value)}
                                className="editor-textarea"
                                placeholder="React component code..."
                                data-testid="component-textarea"
                                spellCheck="false"
                            />
                        )}
                        {activeTab === 'css' && (
                            <textarea
                                value={cssCode}
                                onChange={(e) => setCssCode(e.target.value)}
                                className="editor-textarea"
                                placeholder="Enter CSS code..."
                                data-testid="css-textarea"
                                spellCheck="false"
                            />
                        )}
                        {activeTab === 'preview' && (
                            <div className="mobile-preview-container" data-testid="preview-iframe-mobile">
                                {renderPreview()}
                            </div>
                        )}
                    </div>
                </div>

                <div className="right-panel">
                    <div className="preview-header">
                        <h2>Preview</h2>
                    </div>
                    <div className="preview-container" data-testid="preview-iframe-desktop">
                        {renderPreview()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Project };
