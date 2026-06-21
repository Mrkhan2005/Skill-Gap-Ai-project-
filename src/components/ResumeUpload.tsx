import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { UploadCloud, FileText, CheckCircle2, ChevronRight, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { mockDataAnalystResult, mockDeveloperResult } from '../store/mockData';

export default function ResumeUpload() {
  const { setActiveResult, setIsLoadingAnalysis, isLoadingAnalysis, login, userSession, setActiveDashboardTab } = useStore();
  const [dragActive, setDragActive] = useState(false);
  const [pasteMode, setPasteMode] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | 'warning' | ''; msg: string }>({ type: '', msg: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process file contents as direct binary payload
  const handleFile = (file: File) => {
    setFeedback({ type: '', msg: '' });
    const allowedTypes: Record<string, string> = {
      'pdf': 'application/pdf',
      'txt': 'text/plain',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword'
    };

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = allowedTypes[ext] || file.type || 'application/octet-stream';

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const base64Parts = dataUrl.split(';base64,');
        const base64Data = base64Parts[1] || '';
        
        setIsLoadingAnalysis(true);
        setFeedback({ type: 'success', msg: `Directly uploading and analyzing resume file "${file.name}" with Gemini...` });
        
        await triggerDirectAnalysis({
          mimeType,
          data: base64Data,
          name: file.name
        });
      } else {
        setFeedback({ type: 'error', msg: 'Could not process the uploaded file.' });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerDirectAnalysis = async (fileObj: { mimeType: string, data: string, name: string }) => {
    setIsLoadingAnalysis(true);
    setFeedback({ type: '', msg: '' });

    // Make sure user is logged in
    if (!userSession.isAuthed) {
      login('guest@skillgap.ai', 'AI Evaluator');
    }

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(userSession.token ? { 'Authorization': `Bearer ${userSession.token}` } : {})
        },
        body: JSON.stringify({ 
          fileData: {
            mimeType: fileObj.mimeType,
            data: fileObj.data
          },
          resumeName: fileObj.name 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Server processing error');
      }

      setActiveResult(data);

      // Persist analysis to Cloud SQL if user is authenticated with Firebase
      if (userSession.token) {
        try {
          await fetch('/api/save-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userSession.token}`
            },
            body: JSON.stringify({
              fileName: fileObj.name || 'Resume_Direct_Upload',
              analysisResult: data
            })
          });
        } catch (saveErr) {
          console.warn('Failed to persist resume analysis in Cloud SQL:', saveErr);
        }
      }

      setFeedback({ type: 'success', msg: `Career intelligence completed directly from original file: ${fileObj.name}!` });
      setActiveDashboardTab('overview');
    } catch (err: any) {
      console.warn('Direct file analysis fell back to simulated intelligence profile:', err);
      
      const isDataAnalyst = fileObj.name.toLowerCase().includes('data') || fileObj.name.toLowerCase().includes('analyst') || fileObj.name.toLowerCase().includes('excel') || fileObj.name.toLowerCase().includes('stat');
      const fallbackResult = isDataAnalyst ? mockDataAnalystResult : mockDeveloperResult;

      const errorMsg = err?.message || 'Server connection timed out.';

      setFeedback({ 
        type: 'warning', 
        msg: `Processed "${fileObj.name}" using local template matching. (Reason: ${errorMsg})` 
      });

      setTimeout(() => {
        setActiveResult(fallbackResult);
        setActiveDashboardTab('overview');
      }, 200);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const triggerAnalysis = async (customText?: string) => {
    const textToAnalyze = customText || resumeText;
    if (!textToAnalyze || textToAnalyze.trim().length < 50) {
      setFeedback({ type: 'error', msg: 'Please input rich resume summaries detailing roles, experience milestones, types and projects.' });
      return;
    }

    setFeedback({ type: '', msg: '' });
    setIsLoadingAnalysis(true);

    // Make sure user is logged in
    if (!userSession.isAuthed) {
      login('guest@skillgap.ai', 'AI Evaluator');
    }

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(userSession.token ? { 'Authorization': `Bearer ${userSession.token}` } : {})
        },
        body: JSON.stringify({ resumeText: textToAnalyze, resumeName: 'Uploaded_Resume.txt' })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Server processing error');
      }

      setActiveResult(data);

      // Persist analysis to Cloud SQL if user is authenticated with Firebase
      if (userSession.token) {
        try {
          await fetch('/api/save-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userSession.token}`
            },
            body: JSON.stringify({
              fileName: 'Uploaded_Resume.txt',
              analysisResult: data
            })
          });
        } catch (saveErr) {
          console.warn('Failed to persist text resume analysis in Cloud SQL:', saveErr);
        }
      }

      setFeedback({ type: 'success', msg: 'Gemini Agent completed profiling!' });
      setActiveDashboardTab('overview');
    } catch (err: any) {
      console.warn('Backend API error - activating safe mock profiles fallback:', err.message);
      
      // Determine if text suggests data analysis or software development to provide the ultimate responsive mock
      const isDataAnalyst = textToAnalyze.toLowerCase().includes('data') || textToAnalyze.toLowerCase().includes('analyst') || textToAnalyze.toLowerCase().includes('excel');
      const fallbackResult = isDataAnalyst ? mockDataAnalystResult : mockDeveloperResult;
      
      const errorMsg = err?.message || 'Server connection timed out.';

      setFeedback({ 
        type: 'warning', 
        msg: `Processed resume details using local template matching. (Reason: ${errorMsg})` 
      });

      setTimeout(() => {
        setActiveResult(fallbackResult);
        setActiveDashboardTab('overview');
      }, 200);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const loadPresetResume = (preset: 'Developer' | 'Analyst') => {
    const targetResult = preset === 'Developer' ? mockDeveloperResult : mockDataAnalystResult;
    setIsLoadingAnalysis(true);
    setFeedback({ type: 'success', msg: `Loading ${preset} Intelligence Profile...` });
    
    if (!userSession.isAuthed) {
      login('guest@skillgap.ai', 'AI Evaluator');
    }

    setTimeout(() => {
      setActiveResult(targetResult);
      setActiveDashboardTab('overview');
      setIsLoadingAnalysis(false);
    }, 150);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="glass-liquid-panel p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-indigo-600/5">
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-indigo-600/10 to-transparent blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl rounded-full"></div>
        </div>

        <div className="relative">
          {/* Header */}
          <div className="text-center md:text-left mb-8">
            <h2 className="heading-font text-2xl md:text-3xl font-extrabold text-white">
              Launch Career Analysis
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">
              Securely analyze your profile to receive comprehensive skill metrics, 360 roadmaps, and forecast salary growths.
            </p>
          </div>

          {/* Preset Buttons - Single Click Sandbox Demos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => loadPresetResume('Developer')}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-indigo-500/20 hover:border-indigo-500/60 hover:bg-slate-900/90 transition duration-300 text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Demo Software Resume</h4>
                  <p className="text-xs text-slate-400 font-medium">Alex Rivera • React Intern</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-indigo-400 hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => loadPresetResume('Analyst')}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-slate-900/90 transition duration-300 text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Demo Data Analyst Resume</h4>
                  <p className="text-xs text-slate-400 font-medium">Marcus Vance • Statistical Analyst</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-cyan-400 hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Toggle Paste Mode */}
          <div className="flex justify-center md:justify-end gap-2 mb-6 text-sm">
            <button
              onClick={() => setPasteMode(false)}
              className={`px-4 py-1.5 rounded-lg border font-semibold transition ${
                !pasteMode
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                  : 'border-white/5 hover:border-white/10 hover:bg-white/5 text-slate-400'
              }`}
            >
              Document Upload
            </button>
            <button
              onClick={() => setPasteMode(true)}
              className={`px-4 py-1.5 rounded-lg border font-semibold transition ${
                pasteMode
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                  : 'border-white/5 hover:border-white/10 hover:bg-white/5 text-slate-400'
              }`}
            >
              Paste Resume Form
            </button>
          </div>

          {/* Feedback message node */}
          {feedback.msg && (
            <div className={`p-4 rounded-2xl mb-6 flex flex-col gap-2 border text-left ${
              feedback.type === 'error' 
                ? 'bg-red-500/10 border-red-500/20 text-red-300' 
                : feedback.type === 'warning'
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                : 'bg-green-500/10 border-green-500/20 text-green-300'
            }`}>
              <div className="flex items-start gap-3">
                {feedback.type === 'error' ? (
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-400" />
                ) : feedback.type === 'warning' ? (
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-400 font-bold animate-pulse" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-green-400" />
                )}
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-semibold text-white">
                    {feedback.type === 'error' ? 'Analysis Error' : feedback.type === 'warning' ? 'Offline Fallback Enabled' : 'Success'}
                  </p>
                  <p className="text-xs md:text-sm mt-1 leading-relaxed opacity-90">{feedback.msg}</p>
                  
                  {feedback.type === 'warning' && (
                    <div className="mt-3 p-3 bg-slate-950/40 rounded-xl border border-amber-500/10 text-[11px] md:text-xs text-slate-300 space-y-2">
                      <p className="font-bold text-amber-400 flex items-center gap-1 font-sans">
                        💡 How to activate live cloud resume analysis:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-400 font-medium font-sans">
                        <li>Locate the developer <strong className="text-white">Settings Gear (⚙️)</strong> of your visual workspace.</li>
                        <li>Click on the <strong className="text-white">Secrets</strong> tab.</li>
                        <li>Create a secret key with name <strong className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded">GEMINI_API_KEY</strong>.</li>
                        <li>Paste your Google Gemini API Key (starts with <code className="text-amber-300 bg-amber-500/10 px-1 py-0.5 rounded font-mono">AIzaSy</code>) and click save.</li>
                        <li>Refresh the workspace page or re-upload your resume files for instant premium Cloud analysis!</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Interactive Drag & Drop Area */}
          {!pasteMode ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => !isLoadingAnalysis && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 md:p-12 text-center transition duration-300 relative group min-h-[220px] flex flex-col items-center justify-center ${
                dragActive 
                  ? 'border-indigo-500 bg-indigo-500/5' 
                  : 'border-white/10 hover:border-white/25 bg-slate-900/20 hover:bg-slate-900/40'
              } ${isLoadingAnalysis ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".txt,.pdf,.docx"
                onChange={handleFileInputChange}
                disabled={isLoadingAnalysis}
              />
              {isLoadingAnalysis ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 animate-spin">
                    <RefreshCw className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg">Analyzing Resume File directly with Gemini...</h3>
                  <p className="text-slate-400 text-xs md:text-sm max-w-sm">
                    All dashboard tabs will automatically refresh once the live intelligence profile is compiled.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-white text-base md:text-lg">Drag & Drop Resume</h3>
                  <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-sm">
                    Supports standard PDF, Microsoft Word, or simple TXT profiles.
                  </p>
                  <span className="text-indigo-400 font-bold text-xs mt-4 group-hover:underline">
                    or select from directory
                  </span>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
                  Paste Resume Highlights (Skills, Experience, Projects)
                </label>
                <textarea
                  rows={8}
                  placeholder="Alex Rivera&#10;Junior Web Developer&#10;Skills: React, JavaScript, TypeScript, Git&#10;Experience: Frontend Intern at PixelCraft Software designing clean component models..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full glass-input rounded-2xl py-3 px-4 text-white text-sm font-mono focus:outline-none"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => triggerAnalysis()}
                  disabled={isLoadingAnalysis}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/25 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoadingAnalysis ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Gemini Career Architect Syncing...
                    </>
                  ) : (
                    'Analyze Resume Content with Gemini'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
