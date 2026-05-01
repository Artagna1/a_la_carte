export const LAYER_CONFIG = [
  {
    type: 'clients',
    label: 'Le Client',
    number: '01',
    subtitle: 'Ton commanditaire',
    renderContent: (item) => `${item.name} — ${item.profession} — ${item.city}`,
  },
  {
    type: 'commandes',
    label: 'La Commande',
    number: '02',
    subtitle: "Ce qu'il te demande",
    renderContent: (item) => item.content,
  },
  {
    type: 'publics',
    label: 'Le Public cible',
    number: '03',
    subtitle: "À qui tu t'adresses",
    renderContent: (item) => item.content,
  },
  {
    type: 'contraintes',
    label: 'La Contrainte créative',
    number: '04',
    subtitle: 'Ta limite formelle ou culturelle',
    renderContent: (item) => item.content,
    badge: (item) => item.category,
  },
]
