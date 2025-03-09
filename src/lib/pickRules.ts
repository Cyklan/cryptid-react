import { type GameRule } from "../models/rule";
import { removeAtIndex } from "../util/removeAtIndex";

const HOW_MANY_OF_TYPE_MAX = 2;

const ruleCache: string[] = [];

export function pickRules(rules: GameRule[], n = 4) {
  const gameRules: GameRule[] = [];

  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * rules.length);
    const rule = rules[index];
    if (
      gameRules.filter((r) => r.type === rule.type).length >=
      HOW_MANY_OF_TYPE_MAX
    ) {
      i--;
      continue;
    }

    rules = removeAtIndex(rules, index);

    gameRules.push(rule);
  }

  const ruleId = gameRules
    .map((r) => r.id)
    .sort()
    .join("");
  if (ruleCache.includes(ruleId)) {
    return pickRules(rules);
  }

  ruleCache.push(ruleId);

  return gameRules;
}
