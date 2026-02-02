import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // ✅ body safe parse (Vercel fix)
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const response = body?.response;

    if (response !== "yes" && response !== "no") {
      return res.status(400).json({ message: "Invalid response" });
    }

    const filePath = path.join(process.cwd(), "responses.json");

    let data = { yes: 0, no: 0 };

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf-8");
      data = JSON.parse(file);
    }

    if (response === "yes") data.yes += 1;
    if (response === "no") data.no += 1;

    fs.writeFileSync(filePath, JSON.stringify(data));

    return res.status(200).json({
      success: true,
      message: "Response saved ❤️"
    });

  } catch (err) {
    console.error("RSVP ERROR:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message
    });
  }
}
