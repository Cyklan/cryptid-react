import { useEffect, useState } from "react";
import "./App.css";
import { Tile } from "./models/tile";
import { Board } from "./models/board";
import { GameRule, generateAllRules } from "./models/rule";
import { pickRules } from "./lib/pickRules";
import { findCryptidForRule, validate } from "./lib/validate";
import { GridBitmask } from "./util/GridBitmask";

function App() {
  const [tiles, setTiles] = useState<Tile[][]>([]);
  const [rules, setRules] = useState<GameRule[]>([]);
  const [visibleRules, setVisibleRules] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [ruleBitfields, setRuleBitfields] = useState<bigint[]>([]);

  useEffect(() => {
    const board = new Board();
    setTiles(board.tiles);
    const rules = generateAllRules();
    while (true) {
      const gameRules = pickRules(structuredClone(rules));
      if (validate(board, gameRules)) {
        setRules(gameRules);
        const bitfields = gameRules.map((rule) =>
          findCryptidForRule(board, rule)
        );
        setRuleBitfields(bitfields);
        break;
      }
    }
  }, []);

  const grids = ruleBitfields.map(
    (bitfield) => new GridBitmask(12, 9, bitfield)
  );

  return (
    <>
      <div className="main">
        {tiles.map((col, i) => (
          <div key={`col-${i}`} className="col">
            {col.map((cell, j) => (
              <div
                key={`cell-${i}-${j}`}
                className={`hexagon ${cell.terrain} ${cell.territory}`}
              >
                {cell.structure && (
                  <div
                    className={`structure ${cell.structure?.color} ${cell.structure?.type}`}
                  ></div>
                )}
                {visibleRules.map(
                  (visible, k) =>
                    visible &&
                    grids[k].getCell(j, i) && (
                      <div
                        key={`debug-${i}-${j}-${k}`}
                        className={`debug ${k}`}
                      >
                        {k + 1}
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="rulecontrols">
          {rules.map((rule, index) => (
            <button
              onClick={() => {
                const visible = [...visibleRules];
                visible[index] = !visible[index];
                setVisibleRules(visible);
              }}
              key={rule.id + "button"}
            >
              {visibleRules[index] ? "Hide" : "Show"} rule {index + 1}
            </button>
          ))}
          <br />
          <pre>
            {rules.map((rule) => JSON.stringify(rule, null, 2)).join("\n")}
          </pre>
        </div>
      </div>
    </>
  );
}

export default App;
