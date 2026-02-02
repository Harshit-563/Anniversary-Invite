import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "responses.json");

  if (!fs.existsSync(filePath)) {
    return res.status(200).json({ yes: 0, no: 0 });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.status(200).json(data);
}
