const links = [
  { url: 'https://link1.com', usedBy: null },
  { url: 'https://link2.com', usedBy: null },
  { url: 'https://link3.com', usedBy: null },
];

export default function handler(req, res) {
  const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Busca un enlace asignado a esta IP
  const assignedLink = links.find(link => link.usedBy === userIP);

  if (assignedLink) {
    return res.status(200).json({ link: assignedLink.url });
  }

  // Encuentra un enlace no asignado
  const unusedLink = links.find(link => link.usedBy === null);

  if (unusedLink) {
    unusedLink.usedBy = userIP; // Marca el enlace como usado por esta IP
    return res.status(200).json({ link: unusedLink.url });
  }

  return res.status(404).json({ message: 'No more links available' });
}
