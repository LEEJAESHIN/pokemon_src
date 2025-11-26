import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search } from "lucide-react";
import { searchPokemon, getPokemonSpecies, getKoreanName, getCompetitiveStats } from "@/lib/pokemon-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  let pokemon = null;
  let koreanName = "";
  let competitiveStats = null;

  if (query) {
    pokemon = await searchPokemon(query);
    if (pokemon) {
      const species = await getPokemonSpecies(pokemon.id);
      if (species) {
        koreanName = getKoreanName(species);
      }
      // Pokemoem 배틀 통계 가져오기 (한국 배틀 데이터)
      competitiveStats = await getCompetitiveStats(pokemon.id);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-3xl px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/PokeSrc_logo.png"
            alt="PokéSrc Logo"
            width={200}
            height={66}
            priority
          />
        </div>

        <div className="relative w-full mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <form action="/search" method="get">
            <Input
              name="q"
              defaultValue={query}
              className="bg-white rounded-full px-6 py-3 pl-12 w-full"
              placeholder="포켓몬 이름을 검색하세요."
            />
          </form>
        </div>

        {!query ? (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <p className="text-gray-400">검색어를 입력해주세요.</p>
          </div>
        ) : !pokemon ? (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <p className="text-gray-600">
              &quot;{query}&quot;에 대한 검색 결과를 찾을 수 없습니다.
            </p>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl">
                  {koreanName || pokemon.name}
                  <span className="text-lg text-gray-500 ml-2">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </span>
                </CardTitle>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <Badge key={type.type.name} variant="secondary">
                      {type.type.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <Image
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={koreanName || pokemon.name}
                    width={300}
                    height={300}
                    className="w-full max-w-[300px] h-auto"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4">기본 정보</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">높이:</span> {pokemon.height / 10}m
                    </p>
                    <p>
                      <span className="font-medium">무게:</span> {pokemon.weight / 10}kg
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-4">능력치</h3>
                  <div className="space-y-2">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.stat.name} className="flex items-center gap-2">
                        <span className="w-32 text-sm">{stat.stat.name}:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-sm">{stat.base_stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {pokemon && competitiveStats && (
          <div className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">대전 추천 정보 (한국 랭크배틀)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg">타입</h4>
                    <div className="flex gap-2">
                      {pokemon.types.map((type) => (
                        <Badge key={type.type.name} variant="secondary" className="text-base">
                          {type.type.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg">추천 특성</h4>
                    <div className="space-y-2">
                      {competitiveStats.abilities.map((ability, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="capitalize">{ability.name}</span>
                          <span className="text-sm text-gray-500">{ability.usage.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg">추천 성격</h4>
                    <div className="space-y-2">
                      {competitiveStats.natures.map((nature, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="capitalize">{nature.name}</span>
                          <span className="text-sm text-gray-500">{nature.usage.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg">추천 도구</h4>
                    <div className="space-y-2">
                      {competitiveStats.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="capitalize">{item.name}</span>
                          <span className="text-sm text-gray-500">{item.usage.toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">추천 기술</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {competitiveStats.moves.map((move, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="capitalize font-medium">{move.name}</span>
                      <span className="text-sm text-gray-500">{move.usage.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
