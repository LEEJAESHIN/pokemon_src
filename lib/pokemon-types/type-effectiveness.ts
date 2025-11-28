// 타입 상성표
// 0 = 효과 없음 (엑스), 0.5 = 효과 별로 (세모), 1 = 보통, 2 = 효과 굉장 (동그라미)

export const typeEffectiveness: {
  [attackType: string]: { [defenseType: string]: number };
} = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5,
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
};

// 방어 상성 계산 (포켓몬이 공격받을 때)
export function getDefensiveEffectiveness(pokemonTypes: string[]) {
  const effectiveness: { [type: string]: number } = {};

  // 모든 타입에 대해 기본값 1 설정
  const allTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  allTypes.forEach((type) => {
    effectiveness[type] = 1;
  });

  // 각 공격 타입에 대해 방어 상성 계산
  allTypes.forEach((attackType) => {
    let multiplier = 1;

    // 포켓몬의 각 타입에 대해 상성 적용
    pokemonTypes.forEach((defenseType) => {
      const typeEffect = typeEffectiveness[attackType]?.[defenseType];
      if (typeEffect !== undefined) {
        multiplier *= typeEffect;
      }
    });

    effectiveness[attackType] = multiplier;
  });

  return effectiveness;
}

// 공격 상성 계산 (포켓몬이 공격할 때)
export function getOffensiveEffectiveness(pokemonTypes: string[]) {
  const effectiveness: { [type: string]: number } = {};

  // 모든 타입에 대해 기본값 1 설정
  const allTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  allTypes.forEach((type) => {
    effectiveness[type] = 1;
  });

  // 포켓몬의 타입 중 하나라도 효과적이면 표시
  pokemonTypes.forEach((attackType) => {
    const attackEffects = typeEffectiveness[attackType] || {};

    allTypes.forEach((defenseType) => {
      const typeEffect = attackEffects[defenseType];
      if (typeEffect !== undefined) {
        // 가장 높은 배율 사용
        effectiveness[defenseType] = Math.max(
          effectiveness[defenseType],
          typeEffect
        );
      }
    });
  });

  return effectiveness;
}
