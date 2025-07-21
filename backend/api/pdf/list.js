export default function handler(req, res) {
  const pdfs = [
    {
      filename: "CH I Cours algèbre SupNum.pdf",
      title: "Chapitre I - Introduction à l'Algèbre",
      size: 204800, // taille en bytes
      lastModified: new Date().toISOString()
    },
    {
      filename: "CH 2 Cours algèbre SupNum.pdf",
      title: "Chapitre II - Espaces vectoriels",
      size: 310000,
      lastModified: new Date().toISOString()
    },

    {
      filename: "CH 3 Cours algèbre SupNum.pdf",
      title: "Chapitre II - Espaces vectoriels",
      size: 310000,
      lastModified: new Date().toISOString()
    }
    
  ];

  res.status(200).json({
    success: true,
    pdfs
  });
}
