export type CarnavalGroup = {
  name: string;
};

export type Carnaval = {
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  /** Heure de départ, 24 h (HH:MM). */
  departure: string;
  /** Ordre de passage, du premier au dernier. */
  groups: CarnavalGroup[];
  /**
   * Plan du parcours, une image.
   * Original dans media/carnaval/ (plan.png, plan.jpg ou plan.jpeg).
   * Fichier publié : public/media/carnaval/plan.webp
   */
  plan: string;
};

export const carnaval: Carnaval = {
  date: '2027-01-23',
  departure: '20:00',
  groups: [
    { name: 'Group 1' },
    { name: 'Group 2' },
    { name: 'Group 3' },
    { name: 'Group 4' },
    { name: 'Group 5' },
    { name: 'Group 6' },
    { name: 'Group 7' }
  ],
  plan: 'media/carnaval/plan.webp',
};
