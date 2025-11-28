import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 포켓몬의 능력치를 분석하여 역할 판단
interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export function analyzePokemonRole(stats: any[]): string {
  // 능력치를 객체로 변환
  const statValues: PokemonStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };

  stats.forEach((stat) => {
    const statName = stat.stat.name;
    const value = stat.base_stat;

    if (statName === "hp") statValues.hp = value;
    else if (statName === "attack") statValues.attack = value;
    else if (statName === "defense") statValues.defense = value;
    else if (statName === "special-attack") statValues.specialAttack = value;
    else if (statName === "special-defense") statValues.specialDefense = value;
    else if (statName === "speed") statValues.speed = value;
  });

  const { attack, specialAttack, defense, specialDefense, hp } = statValues;

  // 공격 능력치 비교
  const attackDiff = Math.abs(attack - specialAttack);
  const isPhysical = attack > specialAttack;
  const isSpecial = specialAttack > attack;
  const isDualType = attackDiff <= 15; // 차이가 15 이하면 쌍두형

  // 방어 능력치 평균
  const avgDefense = (defense + specialDefense) / 2;
  const avgAttack = (attack + specialAttack) / 2;

  // 역할 판단
  if (isDualType) {
    return "쌍두형";
  } else if (isPhysical) {
    return "물리형";
  } else if (isSpecial) {
    return "특수형";
  }

  return "쌍두형";
}

// 종족값 합계 계산
export function calculateTotalStats(stats: any[]): number {
  return stats.reduce((total, stat) => total + stat.base_stat, 0);
}

// 능력치 이름을 한글로 변환
export function getKoreanStatName(statName: string): string {
  const statNameMap: { [key: string]: string } = {
    hp: "HP",
    attack: "공격",
    defense: "방어",
    "special-attack": "특수공격",
    "special-defense": "특수방어",
    speed: "스피드",
  };

  return statNameMap[statName] || statName;
}
