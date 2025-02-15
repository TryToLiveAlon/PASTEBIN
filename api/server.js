const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// GET request → Converts to POST
app.get("/generate", async (req, res) => {
    const options = {
        code: req.query.code,
        backgroundColor: req.query.backgroundColor || "rgba(171, 184, 195, 1)",
        dropShadow: req.query.dropShadow === "true",
        dropShadowBlurRadius: req.query.dropShadowBlurRadius || "68px",
        dropShadowOffsetY: req.query.dropShadowOffsetY || "20px",
        exportSize: req.query.exportSize || "2x",
        fontCustom: req.query.fontCustom || "",
        fontSize: req.query.fontSize || "14px",
        fontFamily: req.query.fontFamily || "Hack",
        firstLineNumber: parseInt(req.query.firstLineNumber) || 1,
        language: req.query.language || "auto",
        lineHeight: req.query.lineHeight || "133%",
        lineNumbers: req.query.lineNumbers === "true",
        paddingHorizontal: req.query.paddingHorizontal || "56px",
        paddingVertical: req.query.paddingVertical || "56px",
        prettify: req.query.prettify === "true",
        selectedLines: req.query.selectedLines || "",
        theme: req.query.theme || "seti",
        watermark: req.query.watermark === "true",
        width: parseInt(req.query.width) || 536,
        widthAdjustment: req.query.widthAdjustment === "true",
        windowControls: req.query.windowControls === "true",
        windowTheme: req.query.windowTheme || "none",
    };

    if (!options.code) {
        return res.status(400).json({ error: "Missing 'code' parameter" });
    }

    try {
        // Send POST request to Carbonara API
        const response = await axios.post("https://carbonara.solopov.dev/api/cook", options, {
            responseType: "arraybuffer",
        });

        // Set response as image
        res.setHeader("Content-Type", "image/png");
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate image", details: error.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
      
