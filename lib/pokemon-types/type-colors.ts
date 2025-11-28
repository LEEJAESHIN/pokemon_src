import typeColors from "./type-colors.json";

// PokeAPI 타입 이름을 한글 타입 이름으로 매핑
const typeNameMap: { [key: string]: string } = {
  normal: "노말",
  fire: "불꽃",
  water: "물",
  electric: "전기",
  grass: "풀",
  ice: "얼음",
  fighting: "격투",
  poison: "독",
  ground: "땅",
  flying: "비행",
  psychic: "에스퍼",
  bug: "벌레",
  rock: "바위",
  ghost: "고스트",
  dragon: "드래곤",
  dark: "악",
  steel: "강철",
  fairy: "페어리",
  unknown: "???",
};

export function getTypeColor(typeName: string): string {
  return typeColors[typeName as keyof typeof typeColors] || typeColors.unknown;
}

export function getKoreanTypeName(typeName: string): string {
  return typeNameMap[typeName] || typeName;
}
