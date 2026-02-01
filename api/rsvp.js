let counts = { yes: 0, no: 0 };

export default function handler(req, res) {
  if (req.method === "POST") {
    const { response } = req.body;

    if (response === "yes") counts.yes++;
    if (response === "no") counts.no++;

    return res.status(200).json({
      message: "Thanks for confirming ❤️"
    });
  }

  if (req.method === "GET") {
    return res.status(200).json(counts);
  }

  res.status(405).json({ error: "Method not allowed" });
}
