import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const useGeneratePDF = () => {
  const portfolioData = usePortfolioData()
  const { personalInfo, summary, skills, experience, education, projects } = portfolioData

  const generateCV = async () => {
    if (!personalInfo?.value) {
      console.error('Personal info not available')
      return
    }

    const doc = new jsPDF()
    
    // Define colors
    const primaryColor: [number, number, number] = [40, 167, 69]
    const textColor: [number, number, number] = [50, 50, 50]
    const lightGray: [number, number, number] = [245, 245, 245]
    
    let yPosition = 20

    // Add avatar if available
    try {
      // Try to load avatar from public folder
      const response = await fetch('/images/avatar.jpg')
      if (response.ok) {
        const blob = await response.blob()
        const reader = new FileReader()
        
        await new Promise((resolve) => {
          reader.onloadend = () => {
            try {
              const base64data = reader.result as string
              doc.addImage(base64data, 'JPEG', 165, 15, 30, 30)
            } catch (e) {
              console.warn('Could not add avatar to PDF')
            }
            resolve(true)
          }
          reader.readAsDataURL(blob)
        })
      }
    } catch (e) {
      console.warn('Could not load avatar:', e)
    }

    // Header - Personal Info
    doc.setFontSize(26)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text(personalInfo.value.name || 'N/A', 20, yPosition)
    
    yPosition += 8
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...textColor)
    doc.text(personalInfo.value.title || '', 20, yPosition)
    
    yPosition += 12
    
    // Contact info in table
    doc.setFontSize(9)
    const contactInfo = [
      ['Email', personalInfo.value.email || ''],
      ['Phone', personalInfo.value.phone || ''],
      ['Location', personalInfo.value.location || ''],
      ['GitHub', personalInfo.value.github || ''],
      ['LinkedIn', personalInfo.value.linkedin || '']
    ]
    
    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: contactInfo,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 1.5, textColor: textColor },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 25 },
        1: { cellWidth: 'auto' }
      },
      margin: { left: 20 }
    })
    
    yPosition = (doc as any).lastAutoTable.finalY + 10

    // About Section
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('ABOUT ME', 20, yPosition)
    
    // Underline
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(0.5)
    doc.line(20, yPosition + 1, 60, yPosition + 1)
    
    yPosition += 8
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...textColor)
    const aboutText = summary?.value || personalInfo.value.about || 'N/A'
    const splitAbout = doc.splitTextToSize(aboutText, 170)
    doc.text(splitAbout, 20, yPosition)
    yPosition += splitAbout.length * 5 + 10

    // Skills Section
    if (skills?.value && skills.value.length > 0) {
      if (yPosition > 220) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...primaryColor)
      doc.text('SKILLS', 20, yPosition)
      doc.setDrawColor(...primaryColor)
      doc.setLineWidth(0.5)
      doc.line(20, yPosition + 1, 45, yPosition + 1)
      yPosition += 8

      skills.value.forEach((category) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 20
        }

        const skillsData = category.items.map(skill => [
          skill.name,
          `${skill.years} year${skill.years > 1 ? 's' : ''}`
        ])

        autoTable(doc, {
          startY: yPosition,
          head: [[category.category, 'Experience']],
          body: skillsData,
          theme: 'striped',
          headStyles: {
            fillColor: primaryColor,
            fontSize: 10,
            fontStyle: 'bold',
            halign: 'left'
          },
          styles: {
            fontSize: 9,
            cellPadding: 3,
            font: 'helvetica'
          },
          columnStyles: {
            0: { cellWidth: 120 },
            1: { cellWidth: 50, halign: 'center' }
          },
          margin: { left: 20, right: 20 }
        })

        yPosition = (doc as any).lastAutoTable.finalY + 8
      })
    }

    // Experience Section
    if (experience?.value && experience.value.length > 0) {
      if (yPosition > 200) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...primaryColor)
      doc.text('WORK EXPERIENCE', 20, yPosition)
      doc.setDrawColor(...primaryColor)
      doc.setLineWidth(0.5)
      doc.line(20, yPosition + 1, 75, yPosition + 1)
      yPosition += 10

      experience.value.forEach((exp, index) => {
        if (yPosition > 230) {
          doc.addPage()
          yPosition = 20
        }

        // Calculate height needed for this experience block
        const descLines = exp.description ? doc.splitTextToSize(exp.description, 166).length : 0
        const blockHeight = 12 + descLines * 4.5 + 5

        // Check if block fits on current page
        if (yPosition + blockHeight > 270) {
          doc.addPage()
          yPosition = 20
        }

        // Experience item with background box
        doc.setFillColor(...lightGray)
        doc.roundedRect(20, yPosition - 3, 170, blockHeight, 2, 2, 'F')

        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...primaryColor)
        doc.text(exp.title || '', 25, yPosition + 3)
        yPosition += 7

        doc.setFontSize(9)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(100, 100, 100)
        doc.text(`${exp.company || ''} | ${exp.period || ''}`, 25, yPosition)
        yPosition += 6

        if (exp.description) {
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(...textColor)
          const splitDescription = doc.splitTextToSize(exp.description, 160)
          doc.text(splitDescription, 25, yPosition)
          yPosition += splitDescription.length * 4.5
        }
        
        yPosition += 8
      })
    }

    // Education Section
    if (education?.value && education.value.length > 0) {
      if (yPosition > 220) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...primaryColor)
      doc.text('EDUCATION', 20, yPosition)
      doc.setDrawColor(...primaryColor)
      doc.setLineWidth(0.5)
      doc.line(20, yPosition + 1, 55, yPosition + 1)
      yPosition += 8

      const eduData = education.value.map(edu => [
        edu.degree || '',
        edu.school || '',
        edu.year || '',
        edu.description || ''
      ])

      autoTable(doc, {
        startY: yPosition,
        head: [['Degree', 'Institution', 'Year', 'Details']],
        body: eduData,
        theme: 'grid',
        headStyles: {
          fillColor: primaryColor,
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 4
        },
        columnStyles: {
          0: { cellWidth: 50, fontStyle: 'bold' },
          1: { cellWidth: 50 },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 50 }
        },
        margin: { left: 20, right: 20 }
      })

      yPosition = (doc as any).lastAutoTable.finalY + 10
    }

    // Portfolio Projects
    if (projects?.value && projects.value.length > 0) {
      if (yPosition > 200) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...primaryColor)
      doc.text('PORTFOLIO PROJECTS', 20, yPosition)
      doc.setDrawColor(...primaryColor)
      doc.setLineWidth(0.5)
      doc.line(20, yPosition + 1, 85, yPosition + 1)
      yPosition += 8

      const projectsData = projects.value.map(project => [
        project.title || '',
        project.description ? project.description.substring(0, 120) + '...' : '',
        (project.technologies || project.tags || []).join(', '),
        project.link || ''
      ])

      autoTable(doc, {
        startY: yPosition,
        head: [['Project', 'Description', 'Technologies', 'Link']],
        body: projectsData,
        theme: 'striped',
        headStyles: {
          fillColor: primaryColor,
          fontSize: 9,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          overflow: 'linebreak'
        },
        columnStyles: {
          0: { cellWidth: 35, fontStyle: 'bold' },
          1: { cellWidth: 70 },
          2: { cellWidth: 45 },
          3: { cellWidth: 30, fontSize: 7 }
        },
        margin: { left: 20, right: 20 }
      })

      yPosition = (doc as any).lastAutoTable.finalY + 10
    }    // Footer on all pages
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString()}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      )
      
      // Watermark
      doc.setFontSize(9)
      doc.setTextColor(...primaryColor)
      doc.text(
        personalInfo.value.name || '',
        20,
        doc.internal.pageSize.height - 10
      )
    }

    // Save the PDF
    const fileName = `CV_${(personalInfo.value.name || 'CV').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }

  return {
    generateCV
  }
}
