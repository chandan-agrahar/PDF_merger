import { Hono } from "hono";
import PDFMerger from "pdf-merger-js";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { promises as fs } from "fs"; 


const pdf = new Hono();
const merger = new PDFMerger();

pdf.get("/", (c) => {
  return c.text("Hello from Hono!");
});



pdf.post("/merge", async (c) => {
    try {
        const formData = await c.req.formData();
        const files = formData.getAll("file") as File[];

        if (files.length === 0) {
            return c.json({ error: "No files uploaded" }, 400);
        }

        // Temporary storage path for uploaded files
        const tempDir = path.join(__dirname, "temp");
        const mergedPdfPath = path.join(tempDir, "merged.pdf");

        // Ensure temp directory exists
        await fs.mkdir(tempDir, { recursive: true });
        // Process each uploaded file
        for (const file of files) {
            const filePath = path.join(tempDir, file.name);
            const buffer = await file.arrayBuffer();
            writeFileSync(filePath, new Uint8Array(buffer));

            // Add the file to the merger
            await merger.add(filePath);
        }

        // Set metadata (optional)
        await merger.setMetadata({
            producer: "pdf-merger-js based script",
            author: "John Doe",
            creator: "John Doe",
            title: "My life as John Doe"
        });

        // Save the merged PDF
        await merger.save(mergedPdfPath);

        // Optionally: Serve the merged PDF as a downloadable file
        return c.json({ message: "PDFs merged successfully", mergedPdfUrl: "/src/backend/temp/merged.pdf" });

    } catch (error) {
        console.error("Error merging PDFs:", error);
        return c.json({ error: "Failed to merge PDFs" }, 500);
    }
});
export default pdf;
