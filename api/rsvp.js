import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const filePath = path.join(process.cwd(), "responses.json");

  let data = { yes: 0, no: 0 };
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  const { response } = req.body;

  if (response === "yes") data.yes++;
  if (response === "no") data.no++;

  fs.writeFileSync(filePath, JSON.stringify(data));

  res.status(200).json({ message: "Saved ❤️" });
}
