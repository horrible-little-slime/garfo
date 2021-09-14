import { runChoice, toSlot, totalTurnsPlayed, visitUrl } from "kolmafia";
import { $familiar, $item, $items, $slot, get, getSaleValue, have, Requirement } from "libram";
import { pickBjorn } from "./bjorn";
import { BonusEquipMode, itemFamiliar } from "./lib";

export function freeFightOutfit() {}
export function embezzlerOutfit() {}
export function elfOutfit() {
  const forceEquips: Item[] = $items`mafia thumb ring`;
  if (
    have($item`protonic accelerator pack`) &&
    forceEquips.every((item) => toSlot(item) !== $slot`back`) &&
    get("questPAGhost") === "unstarted" &&
    get("nextParanormalActivity") <= totalTurnsPlayed()
  )
    forceEquips.push($item`protonic accelerator pack`);

  if (itemFamiliar() === $familiar`Reagnimated Gnome`) {
    forceEquips.push($item`gnomish housemaid's kgnee`);
    if (!have($item`gnomish housemaid's kgnee`)) {
      visitUrl("arena.php");
      runChoice(4);
    }
  }

  const bjornChoice = pickBjorn(BonusEquipMode.ELF);

  new Requirement(
    [
      `${0.15 * get("valueOfAdventure")} Item Drop`,
      ...(itemFamiliar() === $familiar`Reagnimated Gnome`
        ? [`${(get("valueOfAdventure") * 1.1) / Math.pow(1000 - (20 + 100), 2)} Familiar Weight`]
        : []),
    ],
    {
      forceEquip: forceEquips,
      bonusEquip: new Map<Item, number>([
        [$item`Buddy Bjorn`, bjornChoice.probability * bjornChoice.meatVal()],
        [$item`lucky gold ring`, 400],
        [$item`Mr. Cheeng's spectacles`, 250],
        [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
        [$item`Mr. Screege's spectacles`, 180],
        ...snowSuit(),
        ...mayflowerBouquet(),
        [$item`garbage sticker`, 100],
      ]),
    }
  );
}

function snowSuit() {
  if (!have($item`Snow Suit`) || get("_carrotNoseDrops") >= 3) return new Map<Item, number>([]);

  return new Map<Item, number>([[$item`Snow Suit`, getSaleValue($item`carrot nose`) / 10]]);
}

function mayflowerBouquet() {
  // +40% meat drop 12.5% of the time (effectively 5%)
  // Drops flowers 50% of the time, wiki says 5-10 a day.
  // Theorized that flower drop rate drops off but no info on wiki.
  // During testing I got 4 drops then the 5th took like 40 more adventures
  // so let's just assume rate drops by 11% with a min of 1% ¯\_(ツ)_/¯

  if (!have($item`Mayflower bouquet`) || get("_mayflowerDrops") >= 10)
    return new Map<Item, number>([]);

  const averageFlowerValue =
    getSaleValue(
      ...$items`tin magnolia, upsy daisy, lesser grodulated violet, half-orchid, begpwnia`
    ) * Math.max(0.01, 0.5 - get("_mayflowerDrops") * 0.11);
  return new Map<Item, number>([[$item`Mayflower bouquet`, averageFlowerValue]]);
}
