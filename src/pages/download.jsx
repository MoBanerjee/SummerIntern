import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Summary from './summary'; 
import { toast } from 'react-toastify';
import { Button, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import APIManager from '../APIManager/APIManager'

const PdfDownloadComponent = () => {
  const navigate = useNavigate();
  
  const handleDownloadPDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) {
      console.error('Element with id "pdf-content" not found.');
      return;
    }

    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const pageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('downloaded-file.pdf');
      toast.success("Your PDF of the Summary Report was downloaded successfully!");
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });

    try {
      
      APIManager.makeLogEntry({})
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: 'blue' }}>
        <Toolbar>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleDownloadPDF}
            sx={{ marginRight: 'auto' }}
          >
            Download PDF
          </Button>

          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>Close</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box id="pdf-content">
        <Summary />
      </Box>
    </Box>
  );
};

export default PdfDownloadComponent;
