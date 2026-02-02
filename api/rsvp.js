import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // 👇 VERY IMPORTANT (body parse fix)
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { response } = body;

    const filePath = path.join(process.cwd(), "responses.json");

    let data = { yes: 0, no: 0 };

    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    if (response === "yes") data.yes++;
    if (response === "no") data.no++;

    fs.writeFileSync(filePath, JSON.stringify(data));

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("RSVP ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
return res.status(200).json({
  success: true,
  message: "Thanks for confirming ❤️"
});
