import { jsPDF } from 'jspdf';
import { CareerAnalysisResult } from '../types';

export function exportResultToPDF(result: CareerAnalysisResult) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const { profile, scores, gapAnalysis, roadmap, predictions, salaryForecast, futureProof, interviewPrep, jobMatches } = result;

  let y = 20;

  // Global Page break checking utility
  function checkPageBreak(heightNeeded: number) {
    if (y + heightNeeded > 270) {
      doc.addPage();
      y = 25; // Reset y with some padding
    }
  }

  // Draw dividing horizontal lines
  function drawDivider() {
    checkPageBreak(8);
    y += 2;
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.2);
    doc.line(20, y, 190, y);
    y += 6;
  }

  // Draw elegant styled headings
  function drawHeading(text: string, level: 1 | 2 | 3) {
    if (level === 1) {
      checkPageBreak(18);
      y += 4;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // slate-900 / dark corporate
      doc.text(text, 20, y);
      
      // Indigo design bar underscore
      y += 2;
      doc.setDrawColor(79, 70, 229); // Brand Indigo
      doc.setLineWidth(1.2);
      doc.line(20, y, 40, y);
      y += 8;
    } else if (level === 2) {
      checkPageBreak(14);
      y += 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42); // Slate-900
      doc.text(text, 20, y);
      
      // Subtle cyan accent indicator under headings
      y += 1.5;
      doc.setDrawColor(6, 182, 212); // Brand Teal
      doc.setLineWidth(0.6);
      doc.line(20, y, 30, y);
      y += 6;
    } else {
      checkPageBreak(10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85); // Slate-700
      doc.text(text, 20, y);
      y += 5;
    }
  }

  // Wrapped Paragraph Printing with auto page break handling
  function writeParagraph(text: string, fontSize: number = 9.5, style: 'normal' | 'bold' | 'italic' = 'normal', color: [number, number, number] = [71, 85, 105]) {
    doc.setFont('helvetica', style);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);

    const maxWidth = 170; // 210 - margins
    const lines = doc.splitTextToSize(text, maxWidth);
    
    lines.forEach((line: string) => {
      checkPageBreak(5);
      doc.text(line, 20, y);
      y += 4.5;
    });
  }

  // Grid/List styled bullet point
  function writeBullet(label: string, value: string) {
    checkPageBreak(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85); // Slate-700
    doc.text(`•  ${label}:`, 24, y);
    
    // Auto-wrap the value text starting past the label
    const labelW = doc.getTextWidth(`•  ${label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // Slate-600

    const maxValW = 170 - labelW;
    const lines = doc.splitTextToSize(value, maxValW);
    
    lines.forEach((line: string, idx: number) => {
      if (idx > 0) {
        checkPageBreak(5);
        doc.text(line, 24 + labelW, y);
      } else {
        doc.text(line, 24 + labelW, y);
      }
      y += 4.5;
    });
    y += 1;
  }

  // Custom table generator with cell wrapping support
  function drawGenericTable(headers: string[], rows: string[][], colWidths: number[]) {
    checkPageBreak(15);
    
    // Header
    doc.setFillColor(15, 23, 42); // slate-900 / Dark
    doc.rect(20, y, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    
    let currentX = 20;
    headers.forEach((header, idx) => {
      doc.text(header, currentX + 2, y + 5.5);
      currentX += colWidths[idx];
    });
    
    y += 8;

    // Rows
    rows.forEach((row, rowIdx) => {
      // Pre-compute row height based on cell with most text wrapping
      let maxCellHeight = 8;
      row.forEach((cell, cellIdx) => {
        const cellW = colWidths[cellIdx] - 4;
        const lines = doc.splitTextToSize(cell, cellW);
        const cellH = lines.length * 4.5 + 4;
        if (cellH > maxCellHeight) maxCellHeight = cellH;
      });

      checkPageBreak(maxCellHeight);

      // Alternating Backgrounds
      if (rowIdx % 2 === 1) {
        doc.setFillColor(248, 250, 252); // slate-50
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, y, 170, maxCellHeight, 'F');
      
      // Bottom Row border
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.15);
      doc.line(20, y + maxCellHeight, 190, y + maxCellHeight);

      // Print cells
      currentX = 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85); // slate-700

      row.forEach((cell, cellIdx) => {
        const cellW = colWidths[cellIdx] - 4;
        const lines = doc.splitTextToSize(cell, cellW);
        lines.forEach((line: string, lineIdx: number) => {
          doc.text(line, currentX + 2, y + 5 + (lineIdx * 4.2));
        });
        currentX += colWidths[cellIdx];
      });

      y += maxCellHeight;
    });
    
    y += 4;
  }

  // ==================== PAGE 1: COVER PAGE ====================
  // Draw gorgeous dark geometric header representing active artificial intelligence nodes
  doc.setFillColor(11, 16, 32); // deep primary dark background
  doc.rect(0, 0, 210, 110, 'F');

  // Decorative vector circles and grids for design aesthetics
  doc.setFillColor(79, 70, 229, 0.15); // Indigo
  doc.circle(20, 20, 50, 'F');
  doc.setFillColor(6, 182, 212, 0.12); // Cyan
  doc.circle(190, 85, 30, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('SKILLGAP AI', 20, 45);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(6, 182, 212); // Brand Cyan
  doc.text('INTELLIGENT CAREER ROADMAP & PROFILE ANALYSIS', 20, 55);

  // Line separating block
  doc.setDrawColor(79, 70, 229);
  doc.setLineWidth(1.5);
  doc.line(20, 62, 120, 62);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Advanced Multi-point Resume Evaluation & Learning Path Prediction', 20, 72);
  doc.text(`Generated on ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, 78);

  // Profile Credentials Frame
  y = 125;
  drawHeading('EXECUTIVE SUMMARY & PROFILE INTAKE', 1);
  writeBullet('Candidate Name', profile.name || 'Professional Analyst');
  writeBullet('Extracted Title', profile.title || 'Tech Specialist');
  writeBullet('Primary Path Targeted', result.predictions ? Object.keys(predictions)[0] || 'AI Platform Architecture' : 'Digital Infrastructure Transformation');
  writeBullet('Overall Career Readiness', `${scores.careerReadiness}%`);
  writeBullet('Resume Evaluation Strength', `${scores.resumeStrength}/100`);
  writeBullet('Employability Index Score', `${scores.employabilityIndex}%`);
  
  y += 5;
  drawHeading('FUTURE-PROOF STABILITY INDEX', 2);
  writeBullet('Stability Index Score', `${futureProof.futureProofScore}/100`);
  writeBullet('Automation Exposure Risk', futureProof.automationRisk || 'Low');
  writeBullet('Generative AI Impact Risk', futureProof.aiDisruptionRisk || 'Low');
  writeBullet('Resilience Narrative', futureProof.stabilityExplanation || 'Consistent demand with high upskill potential.');

  // ==================== PAGE 2: METRICS, WORK EXPERIENCE ====================
  doc.addPage();
  y = 20;

  drawHeading('CORE CAPABILITY METRICS', 1);
  
  // Radial bar equivalents represented as tables for high definition display exports
  const metricHeaders = ['Evaluation Parameter', 'Score', 'Market Alignment & Industry Significance'];
  const metricRows = [
    ['Career Readiness', `${scores.careerReadiness}%`, 'Evaluates alignment of present skills against live modern industrial requisites.'],
    ['Employability Index', `${scores.employabilityIndex}%`, 'Proportion of relevant open requisitions matching your core profile requirements.'],
    ['Market Strength', `${scores.marketDemand}%`, 'Quantifies the historical and projected hiring velocities of the stated path.'],
    ['Resume Strength', `${scores.resumeStrength}%`, 'Checks resume formatting clarity, semantic metric highlights, and structure indices.'],
    ['Interview Readiness', `${scores.interviewReadiness}%`, 'Assesses candidate readiness across algorithmic, architectural, and behavioral grids.']
  ];
  drawGenericTable(metricHeaders, metricRows, [45, 20, 105]);

  drawHeading('EXTRACTED PROFESSIONAL EXPERIENCE MILESTONES', 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  writeParagraph('The following chronological experience segments were extracted and mapped by AI parsing algorithms:');
  y += 4;

  profile.experience.forEach((job) => {
    checkPageBreak(30);
    doc.setDrawColor(79, 70, 229, 0.4);
    doc.setLineWidth(0.8);
    doc.line(20, y, 20, y + 16); // Left indicator vertical line

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(`${job.role} — ${job.company}`, 24, y + 4);

    doc.setFont('Helvetica-Bold', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(79, 70, 229);
    doc.text(job.duration || 'N/A', 24, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    let listOffset = y + 12;
    if (job.highlights && job.highlights.length > 0) {
      const topHighlights = job.highlights.slice(0, 3);
      topHighlights.forEach((hl) => {
        const wrapHl = doc.splitTextToSize(`• ${hl}`, 160);
        checkPageBreak(wrapHl.length * 4);
        wrapHl.forEach((wLine: string) => {
          doc.text(wLine, 24, listOffset);
          listOffset += 4;
        });
      });
      y = listOffset + 3;
    } else {
      y += 18;
    }
  });

  // ==================== PAGE 3: DEEP SKILL GAP & CRITICAL RECOMMENDATIONS ====================
  doc.addPage();
  y = 20;

  drawHeading('DETAILED SHADOW SKILL GAP ANALYSIS', 1);
  writeParagraph('Matches active proficiency registers against verified target role requisites. Sub-100% metrics represent urgent opportunities for upskilling:');
  y += 4;

  const gapHeaders = ['Technology / Capacity', 'Role Subject Area', 'Relevance', 'Proficiency Meter', 'Market Demand'];
  const gapRows = gapAnalysis.skillsBreakdown.map(item => [
    item.skill,
    item.category,
    `${item.relevance}%`,
    `${item.proficiency}%`,
    `${item.requiredLevel}% Target`
  ]);
  drawGenericTable(gapHeaders, gapRows, [40, 45, 25, 30, 30]);

  drawHeading('CRITICAL MISSING GAP UPSKILL RECOMMENDATIONS', 2);
  
  gapAnalysis.missingSkills.forEach((item) => {
    checkPageBreak(25);
    doc.setFillColor(241, 245, 249); // light grey block
    doc.rect(20, y, 170, 18, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(220, 38, 38); // Red
    doc.text(`[${item.priority}]  ${item.name}`, 23, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const splitDesc = doc.splitTextToSize(item.description, 164);
    doc.text(splitDesc, 23, y + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(79, 70, 229);
    doc.text(`Recommended resource: ${item.resourceName} (${item.resourceType}) — ${item.resourceLink}`, 23, y + 14.5);

    y += 21;
  });

  // ==================== PAGE 4: TRANSITION FORECASTS & SALARY GRAPHS ====================
  doc.addPage();
  y = 20;

  drawHeading('PREDICTIVE CAREER TRANSITION MODELLING', 1);
  writeParagraph('Below are the transition probabilities and preparation windows for primary upskilling trajectories:');
  y += 4;

  const predHeaders = ['Predicted Target Career', 'Current Fit', 'Potential Fit', 'Transition Prob.', 'Prep Horizon'];
  const predRows = Object.values(predictions).map(item => [
    item.targetRole,
    `${item.currentReadiness}%`,
    `${item.futureReadiness}%`,
    `${item.successProbability}% Success Rate`,
    `${item.estimatedTimeWeeks} Weeks Plan`
  ]);
  drawGenericTable(predHeaders, predRows, [45, 22, 22, 41, 40]);

  drawHeading('UPSKILLED BASE COMPENSATIONAL OUTLOOKS', 1);
  writeParagraph(`Current Estimated Market Comp: $${salaryForecast.currentSalaryEstimate.toLocaleString()}/yr. Projected Upgraded Target Comp: $${salaryForecast.futureSalaryEstimate.toLocaleString()}/yr.`);
  y += 4;

  const salHeaders = ['Milestone Horizon Year', 'Baseline Proj. (No Upskill)', 'Accelerated Proj. (Upskilled Stack)', 'Strategic Growth Differential'];
  const salRows = salaryForecast.projections.map(item => {
    const diff = item.upskilledSalary - item.baseSalary;
    return [
      item.year,
      `$${item.baseSalary.toLocaleString()}`,
      `$${item.upskilledSalary.toLocaleString()}`,
      `+$${diff.toLocaleString()} / year`
    ];
  });
  drawGenericTable(salHeaders, salRows, [44, 42, 42, 42]);

  // ==================== PAGE 5 & 6: ADVANCED CHRONOLOGICAL STEP ROADMAPS ====================
  doc.addPage();
  y = 20;

  drawHeading('PROGRESSIVE CAREER TRANSFORM ROADMAP (5 STAGES)', 1);
  writeParagraph('The following customized progressive training cycles map your clear milestones spanning over 12 months:');
  y += 5;

  const planStages = [
    { title: 'STAGE 1: 30-DAY INITIATIVE', data: roadmap.plan30Days },
    { title: 'STAGE 2: 60-DAY ACCELERATION', data: roadmap.plan60Days },
    { title: 'STAGE 3: 90-DAY CONSOLIDATION', data: roadmap.plan90Days },
    { title: 'STAGE 4: 6-MONTH MILESTONES', data: roadmap.plan6Months },
    { title: 'STAGE 5: 12-MONTH LEADERSHIP', data: roadmap.plan12Months }
  ];

  planStages.forEach((stage, sIdx) => {
    // Stage Title Block
    checkPageBreak(40);
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(20, y, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(stage.title, 23, y + 5);
    y += 10;

    // Timeline attributes
    if (stage.data.skillsToLearn && stage.data.skillsToLearn.length > 0) {
      writeBullet('Target Skills to master', stage.data.skillsToLearn.join(', '));
    }
    if (stage.data.certifications && stage.data.certifications.length > 0) {
      writeBullet('Qualifications/Certs', stage.data.certifications.join(', '));
    }
    if (stage.data.projects && stage.data.projects.length > 0) {
      writeBullet('Practical Sandbox Project', stage.data.projects.join(', '));
    }
    if (stage.data.portfolioTasks && stage.data.portfolioTasks.length > 0) {
      writeBullet('Portfolio Implementations', stage.data.portfolioTasks.join(', '));
    }
    if (stage.data.networkingActions && stage.data.networkingActions.length > 0) {
      writeBullet('Networking & Visibility', stage.data.networkingActions.join(', '));
    }
    if (stage.data.interviewPrep && stage.data.interviewPrep.length > 0) {
      writeBullet('Interview Technique Focus', stage.data.interviewPrep.join(', '));
    }

    y += 4;
  });

  // ==================== PAGE 7: INTERVIEW PREPARATION MODULE ====================
  doc.addPage();
  y = 20;

  drawHeading('AI INTERVIEW SCENARIO & ASSESSMENT PREPARATION', 1);
  writeParagraph(`Resume-driven interview prep. Targeted confidence index indicator: ${interviewPrep.confidenceScore}% readiness rating.`);
  y += 5;

  drawHeading('BEHAVIORAL EXPERIENCE SCENARIO Q&A', 2);
  const starList = interviewPrep.behavioralQuestions.slice(0, 2);
  starList.forEach((item, idx) => {
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`Q${idx+1}: ${item.question}`, 20, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const wrapAns = doc.splitTextToSize(`STAR response strategy: ${item.answerGuide}`, 168);
    wrapAns.forEach((line: string) => {
      checkPageBreak(5);
      doc.text(line, 21, y);
      y += 4;
    });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(79, 70, 229);
    doc.text(`Pro HR Highlight Tip: ${item.starFrameworkTip}`, 21, y + 1);
    y += 7;
  });

  drawHeading('CORE TECHNICAL CONSTRUCT SCREENERS', 2);
  const techList = interviewPrep.technicalQuestions.slice(0, 2);
  techList.forEach((item, idx) => {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`Q${idx+1}: ${item.question}`, 20, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const wrapExp = doc.splitTextToSize(`Rigorous Model Solution: ${item.expectedAnswer}`, 168);
    wrapExp.forEach((line: string) => {
      checkPageBreak(5);
      doc.text(line, 21, y);
      y += 4;
    });
    y += 3;
  });

  // ==================== PAGE 8: REAL-TIME CORPORATE JOB ALIGNMENTS ====================
  doc.addPage();
  y = 20;

  drawHeading('CORRELATED ACTIVE JOB POSTING MATCHES', 1);
  writeParagraph('The following matches were queried to isolate modern hiring pipelines best fitting your updated qualification tracks:');
  y += 5;

  jobMatches.forEach((item, index) => {
    checkPageBreak(42);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(20, y, 170, 36, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${index + 1}. ${item.title} — ${item.company}`, 24, y + 6);

    doc.setFont('helvetica', 'semibold');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 182, 212); // Brand Cyan
    doc.text(`Match Score Index: ${item.matchScore}%  |  Location: ${item.location}  |  Compensation: ${item.salary}`, 24, y + 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    if (item.strengthAreas && item.strengthAreas.length > 0) {
      doc.text(`Outstanding Alignments: ${item.strengthAreas.slice(0, 3).join(', ')}`, 24, y + 17);
    }
    if (item.missingRequirements && item.missingRequirements.length > 0) {
      doc.text(`Identified Requirements Gap: ${item.missingRequirements.join(', ')}`, 24, y + 22);
    }
    if (item.improvementSuggestions && item.improvementSuggestions.length > 0) {
      doc.text(`Strategic Directives: ${item.improvementSuggestions.slice(0, 2).join(', ')}`, 24, y + 27);
    }

    y += 40;
  });

  // ==================== RUN COMPILATION PASS FOR MULTIPAGE HEADING / FOOTING INDICATORS ====================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Header (omit on front cover page)
    if (i > 1) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // Slate 400
      doc.text('SKILLGAP AI CAREER INTELLIGENCE PLATFORM', 20, 11);
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.3);
      doc.line(20, 13, 190, 13);
    }
    
    // Bottom Horizontal Footer line
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.3);
    doc.line(20, 285, 190, 285);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 150, 170); // slate-450
    doc.text('Confidential Career Development Report — Empowered by SkillGap AI', 20, 290);
    doc.text(`Page ${i} of ${totalPages}`, 190, 290, { align: 'right' });
  }

  // Trigger download action in client sandbox web frames
  const originalName = profile.name ? profile.name.replace(/\s+/g, '_') : 'Candidate';
  doc.save(`SkillGap_AI_Career_Roadmap_${originalName}.pdf`);
}
