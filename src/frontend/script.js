document.getElementById("merge-button").addEventListener("click", function () {
  const files = document.getElementById("pdf-files").files;

  if (files.length === 0) {
    alert("Please select PDF files to merge.");
    return;
  }

  document.getElementById("upload-section").classList.add("hidden");
  document.getElementById("progress-section").classList.remove("hidden");

  // Call the actual merge function instead of simulating it
  mergeFiles(files).then((mergedPdfUrl) => {
    document.getElementById("progress-section").classList.add("hidden");
    document.getElementById("result-section").classList.remove("hidden");
    if (mergedPdfUrl) {
      // Trigger download
      window.open(mergedPdfUrl, "_blank");
    } else {
      alert("Failed to merge PDFs.");
    }
  });
});

// Function to send files to the server for merging
async function mergeFiles(files) {
  const formData = new FormData();

  // Append all selected files to formData
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files[i]);
  }

  try {
    const response = await fetch("http://localhost:3000/api/pdf/merge", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to merge PDFs.");
    }

    // Assuming the server sends back the URL of the merged PDF
    const result = await response.json();

    console.log(result);
    return result.mergedPdfUrl; // Replace with the actual key in your server response
  } catch (error) {
    console.error("Error merging PDFs:", error);
    alert("There was an error merging the PDFs. Please try again.");
    return null;
  }
}
