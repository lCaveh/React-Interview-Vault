import React, { useState, ReactElement, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '@configs/projects';
import solutions from '@configs/solutions';
import './Project.css';

const Project = (): ReactElement => {
    const navigate = useNavigate();
    const { solutionId: solutionIdParam } = useParams<{ solutionId: string }>();
    const [activeTab, setActiveTab] = useState<'component' | 'css' | 'preview'>('component');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const mobileIframeRef = useRef<HTMLIFrameElement>(null);

    const solutionIdNum = parseInt(solutionIdParam || '0');
    const solution = solutions[solutionIdNum];
    const solutionProject = PROJECTS.find((project) => project.id === solutionIdNum);

    const [componentCode, setComponentCode] = useState(solution?.code || '');
    const [cssCode, setCssCode] = useState(solution?.css || '');

    if (!solutionProject || !solution) {
        return <div className="project-container">Solution not found</div>;
    }

    const getIframeContent = () => {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
          ${cssCode}
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          const React = window.React;
          const ReactDOM = window.ReactDOM;

          ${componentCode}
          
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(TicTacToe));
        <\/script>
      </body>
      </html>
    `;
    };

    const handleSubmit = () => {
        const html = `data:text/html;charset=utf-8,${encodeURIComponent(getIframeContent())}`;
        if (iframeRef.current) {
            iframeRef.current.src = html;
        }
        if (mobileIframeRef.current) {
            mobileIframeRef.current.src = html;
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSubmit();
        }, 500);

        return () => clearTimeout(timer);
    }, [componentCode, cssCode]);

    useEffect(() => {
        if ((activeTab as 'component' | 'css' | 'preview') === 'preview') {
            handleSubmit();
        }
    }, [activeTab]);

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
                <h1>{solutionProject.title}</h1>
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
                            className={`tab ${(activeTab as 'component' | 'css' | 'preview') === 'preview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preview' as any)}
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
                                placeholder="Enter React component code..."
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
                        {(activeTab as 'component' | 'css' | 'preview') === 'preview' && (
                            <div className="mobile-preview-container">
                                <iframe
                                    ref={mobileIframeRef}
                                    className="preview-iframe"
                                    title="Code Preview"
                                    sandbox="allow-scripts allow-popups"
                                    data-testid="preview-iframe-mobile"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="right-panel">
                    <div className="preview-header">
                        <h2>Preview</h2>
                    </div>
                    <div className="preview-container">
                        <iframe
                            ref={iframeRef}
                            className="preview-iframe"
                            title="Code Preview"
                            sandbox="allow-scripts allow-popups"
                            data-testid="preview-iframe-desktop"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Project };
