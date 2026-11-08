import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
    try {
        const { result } = req.body;

        if (!result) {
            return res.status(400).json({
                error: "No content provided"
            });
        }

        const doc = new PDFDocument({
            margin: 50,
            size: "A4"
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="ExamNotesAI.pdf"'
        );

        doc.pipe(res);

        // Title
        doc.fontSize(20)
            .text("ExamNotes AI", { align: "center" });

        doc.moveDown();

        // Importance
        doc.fontSize(14)
            .text(`Importance: ${result.importance || "N/A"}`);

        doc.moveDown();

        // Subtopics
        doc.fontSize(16).text("Sub Topics");
        doc.moveDown(0.5);

        Object.entries(result.subTopics || {}).forEach(([star, topics]) => {
            doc.fontSize(13).text(`${star} Topics:`);

            (topics || []).forEach((topic) => {
                doc.fontSize(12).text(`- ${topic}`);
            });

            doc.moveDown(0.5);
        });

        // Notes
        doc.fontSize(16).text("Notes");
        doc.moveDown(0.5);

        doc.fontSize(12).text(
            (result.notes || "").replace(/[#*]/g, "")
        );

        doc.moveDown();

        // Revision Points
        doc.fontSize(16).text("Revision Points");
        doc.moveDown(0.5);

        (result.revisionPoints || []).forEach((point) => {
            doc.fontSize(12).text(`- ${point}`);
        });

        doc.moveDown();

        // Questions
        doc.fontSize(16).text("Important Questions");
        doc.moveDown(0.5);

        doc.fontSize(13).text("Short Questions:");

        (result.questions?.short || []).forEach((question) => {
            doc.fontSize(12).text(`- ${question}`);
        });

        doc.moveDown(0.5);

        doc.fontSize(13).text("Long Questions:");

        (result.questions?.long || []).forEach((question) => {
            doc.fontSize(12).text(`- ${question}`);
        });

        doc.moveDown(0.5);

        doc.fontSize(13).text("Diagram Question:");

        doc.fontSize(12).text(
            result.questions?.diagram || "No diagram question available"
        );

        // VERY IMPORTANT: Finish the PDF
        doc.end();

    } catch (error) {
        console.error("PDF generation error:", error);

        if (res.headersSent) {
            res.destroy(error);
        } else {
            res.status(500).json({
                message: "Unable to generate PDF"
            });
        }
    }
};