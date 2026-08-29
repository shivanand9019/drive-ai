package com.drive.driveai.ai.extractor;



import com.drive.driveai.exception.FileStorageException;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.IOException;
import java.io.InputStream;

public class PdfTextExtractor {

    public String extractText(InputStream inputStream) {
        try (PDDocument document = Loader.loadPDF(inputStream.readAllBytes())) {
            PDFTextStripper pdfTextStripper = new PDFTextStripper();
            return pdfTextStripper.getText(document);

        } catch (IOException e) {

           throw new FileStorageException("Extraction failed",e);
        }
    }
}
