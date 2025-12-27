export const translations = {
  events: {
    'Electromagnetic Storm': 'Электромагнитная буря',
    'Harvester': 'Королева',
    'Lush Blooms': 'Пышное цветение',
    'Matriarch': 'Матриарх',
    'Night Raid': 'Ночной рейд',
    'Uncovered Caches': 'Обнаруженные тайники',
    'Launch Tower Loot': 'Добыча пусковой башни',
    'Cold Snap': 'Заморозки',
    'Husk Graveyard': 'Кладбище обломков',
    'Prospecting Probes': 'Разведочные зонды',
    'Locked Gate': 'Запертые врата',
    'Supply Drop': 'Сброс припасов',
    'Hidden Bunker': 'Скрытый бункер'
  },
  maps: {
    'Dam': 'Поле боя у дамбы',
    'Buried City': 'Погребённый город',
    'Spaceport': 'Космопорт',
    'Blue Gate': 'Синие ворота',
    'Stella Montis': 'Стелла Монтис'
  }
}

export function translate(text, type) {
  if (type === 'event') {
    return translations.events[text] || text
  } else if (type === 'map') {
    return translations.maps[text] || text
  }
  return text
}

