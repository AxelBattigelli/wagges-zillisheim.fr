export type ArchiveEvent = {
  name: string;
  /** Date ISO (AAAA-MM-JJ). Le jour de la semaine est calculé à l'affichage. */
  date: string;
  /** Chemin relatif. Originaux dans media/, WebP et WebM publiés dans public/. */
  media: string;
};

export const archives: ArchiveEvent[] = [
  {
    name: 'Carnaval de Lörrach',
    date: '2025',
    media: 'media/archives/2025/lörrach',
  },
  {
    name: 'Carnaval de Pfastatt',
    date: '2025',
    media: 'media/archives/2025/pfastatt',
  },
  {
    name: 'Internationales Narrentreffen de Schwörstadt',
    date: '2024-02-04',
    media: 'media/archives/2024/schwörstadt',
  },
  {
    name: 'Carnaval de Lörrach',
    date: '2024-02-11',
    media: 'media/archives/2024/lörrach',
  },
  {
    name: 'Carnaval de Pfastatt',
    date: '2024',
    media: 'media/archives/2024/pfastatt',
  },
  {
    name: 'Carnaval de Schlierbach',
    date: '2024',
    media: 'media/archives/2024/schlierbach',
  },
];
