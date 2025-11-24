import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { Prescription } from '../types/prescription';

export const generatePrescriptionPDF = async (prescription: Prescription): Promise<void> => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Constants
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Colors
    const primaryColor = '#06B6D4'; // Cyan
    const textColor = '#1F2937'; // Gray-800
    const lightGray = '#F3F4F6';

    // Helper function to add text
    const addText = (text: string, x: number, y: number, size: number = 10, style: 'normal' | 'bold' = 'normal') => {
        pdf.setFont('helvetica', style);
        pdf.setFontSize(size);
        pdf.setTextColor(textColor);
        pdf.text(text, x, y);
    };

    // Helper function to draw box
    const drawBox = (x: number, y: number, width: number, height: number, fillColor?: string) => {
        if (fillColor) {
            pdf.setFillColor(fillColor);
            pdf.rect(x, y, width, height, 'F');
        }
        pdf.setDrawColor(200);
        pdf.rect(x, y, width, height);
    };

    // ===== HEADER SECTION =====
    // Header background
    pdf.setFillColor(primaryColor);
    pdf.rect(0, 0, pageWidth, 45, 'F');

    // Doctor Information - Left Side
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Dr. ${prescription.doctor.name}`, margin, 15);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(prescription.doctor.specialty, margin, 22);
    pdf.text(`N° d'inscription: ${prescription.doctor.licenseNumber}`, margin, 28);

    // Cabinet Information - Right Side
    pdf.setFontSize(10);
    const rightX = pageWidth - margin;
    pdf.text(prescription.doctor.cabinetName, rightX, 15, { align: 'right' });
    pdf.text(prescription.doctor.cabinetAddress, rightX, 20, { align: 'right' });
    pdf.text(`Tél: ${prescription.doctor.phone}`, rightX, 25, { align: 'right' });
    if (prescription.doctor.email) {
        pdf.text(`Email: ${prescription.doctor.email}`, rightX, 30, { align: 'right' });
    }

    yPosition = 50;

    // ===== QR CODE & BARCODE SECTION =====
    // Generate QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(prescription.qrCodeData || prescription.id, {
        width: 60,
        margin: 1,
    });
    pdf.addImage(qrCodeDataUrl, 'PNG', margin, yPosition, 25, 25);

    // Prescription Title and Number
    pdf.setTextColor(textColor);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ORDONNANCE MÉDICALE', pageWidth / 2, yPosition + 10, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`N°: ${prescription.prescriptionNumber}`, pageWidth / 2, yPosition + 17, { align: 'center' });
    pdf.text(`Date: ${new Date(prescription.date).toLocaleDateString('fr-DZ')}`, pageWidth / 2, yPosition + 23, { align: 'center' });

    yPosition += 35;

    // ===== PATIENT INFORMATION SECTION =====
    drawBox(margin, yPosition, contentWidth, 35, lightGray);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    addText('INFORMATIONS DU PATIENT', margin + 5, yPosition + 7, 12, 'bold');

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const patientInfo = [
        `Nom et Prénom: ${prescription.patient.fullName}`,
        `Date de naissance: ${new Date(prescription.patient.dateOfBirth).toLocaleDateString('fr-DZ')}  •  Âge: ${prescription.patient.age} ans  •  Sexe: ${prescription.patient.gender}`,
        `Adresse: ${prescription.patient.address}`,
        `Téléphone: ${prescription.patient.phone}${prescription.patient.weight ? `  •  Poids: ${prescription.patient.weight} kg` : ''}`,
    ];

    let patientY = yPosition + 15;
    patientInfo.forEach(info => {
        addText(info, margin + 5, patientY, 9);
        patientY += 5;
    });

    yPosition += 40;

    // ===== DIAGNOSIS SECTION =====
    if (prescription.diagnosis) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        addText('Diagnostic:', margin, yPosition, 10, 'bold');
        pdf.setFont('helvetica', 'normal');
        addText(prescription.diagnosis, margin + 25, yPosition);
        yPosition += 8;
    }

    // ===== MEDICATIONS SECTION =====
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    addText('PRESCRIPTION', margin, yPosition, 12, 'bold');
    yPosition += 8;

    prescription.medications.forEach((med, index) => {
        // Medication box
        const medBoxHeight = 25;
        drawBox(margin, yPosition, contentWidth, medBoxHeight);

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        addText(`${index + 1}. ${med.name}`, margin + 3, yPosition + 6, 11, 'bold');

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        addText(`${med.dosage} - ${med.form}`, margin + 3, yPosition + 11, 9);
        addText(`Posologie: ${med.posology}`, margin + 3, yPosition + 16, 9);
        addText(`Durée: ${med.duration}  •  Quantité: ${med.quantity} ${med.unit}`, margin + 3, yPosition + 21, 9);

        if (med.doNotSubstitute) {
            pdf.setTextColor(220, 38, 38); // Red
            pdf.setFont('helvetica', 'bold');
            addText('NE PAS SUBSTITUER', pageWidth - margin - 40, yPosition + 6, 9, 'bold');
            pdf.setTextColor(textColor);
        }

        yPosition += medBoxHeight + 3;
    });

    // ===== RECOMMENDATIONS SECTION =====
    if (prescription.recommendations) {
        yPosition += 5;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        addText('Recommandations:', margin, yPosition, 10, 'bold');
        yPosition += 5;
        pdf.setFont('helvetica', 'normal');
        const recommendations = pdf.splitTextToSize(prescription.recommendations, contentWidth - 10);
        pdf.text(recommendations, margin + 5, yPosition);
        yPosition += recommendations.length * 5;
    }

    // ===== FOOTER SECTION =====
    const footerY = pageHeight - 50;

    // Renewals
    if (prescription.renewalsAllowed > 0) {
        addText(`Renouvelable ${prescription.renewalsAllowed} fois`, margin, footerY);
    } else {
        addText('Non renouvelable', margin, footerY);
    }

    // Signature Section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    addText('Signature et Cachet du Médecin:', pageWidth - margin - 60, footerY, 10, 'bold');

    // Signature box
    drawBox(pageWidth - margin - 60, footerY + 5, 60, 30);

    if (prescription.signatureDataUrl) {
        pdf.addImage(prescription.signatureDataUrl, 'PNG', pageWidth - margin - 58, footerY + 7, 56, 26);
    }

    // Barcode at bottom
    if (prescription.barcodeData) {
        try {
            const canvas = document.createElement('canvas');
            JsBarcode(canvas, prescription.barcodeData, {
                format: "CODE128",
                displayValue: true,
                fontSize: 10,
                margin: 0,
                height: 40
            });
            const barcodeDataUrl = canvas.toDataURL("image/png");

            // Add barcode centered at the bottom
            pdf.addImage(barcodeDataUrl, 'PNG', (pageWidth - 50) / 2, pageHeight - 25, 50, 15);
        } catch (error) {
            console.error("Error generating barcode:", error);
            // Fallback text if barcode fails
            pdf.setFontSize(8);
            addText(`ID: ${prescription.id}`, pageWidth / 2, pageHeight - 10, 8, 'normal');
        }
    }

    // Save PDF
    pdf.save(`Ordonnance_${prescription.patient.fullName.replace(/\s/g, '_')}_${new Date(prescription.date).toISOString().split('T')[0]}.pdf`);
};
