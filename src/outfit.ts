import {
  bjornifyFamiliar,
  enthroneFamiliar,
  haveEquipped,
  runChoice,
  toSlot,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
import { $familiar, $item, $items, $slot, get, have, Requirement } from "libram";
import { pickBjorn } from "./bjorn";
import { BonusEquipMode, itemFamiliar } from "./lib";

export function freeFightOutfit(...requirements: Requirement[]): void {
  const compiledReqs = Requirement.merge(requirements);
  const forceEquips: Item[] = $items`Loathing Legion helicopter`;
  if (
    have($item`protonic accelerator pack`) &&
    forceEquips.every((item) => toSlot(item) !== $slot`back`) &&
    get("questPAGhost") === "unstarted" &&
    get("nextParanormalActivity") <= totalTurnsPlayed()
  )
    forceEquips.push($item`protonic accelerator pack`);

  const bjornChoice = pickBjorn(BonusEquipMode.FREE);
  const bjornalike =
    forceEquips.some((equip) => toSlot(equip) === $slot`back`) ||
    (compiledReqs.maximizeOptions.forceEquip &&
      compiledReqs.maximizeOptions.forceEquip.some((equip) => toSlot(equip) === $slot`back`))
      ? $item`Crown of Thrones`
      : $item`Buddy Bjorn`;

  const bonusEquips = new Map<Item, number>([
    [bjornalike, bjornChoice.probability * bjornChoice.meatVal()],
    [$item`lucky gold ring`, 400],
    [$item`Mr. Cheeng's spectacles`, 250],
    [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
    [$item`Mr. Screege's spectacles`, 180],
  ]);

  const freeFightReq = new Requirement(["14.52 Familiar Weight"], {
    forceEquip: forceEquips,
    bonusEquip: bonusEquips,
  });
  Requirement.maximize(compiledReqs, freeFightReq);
  if (haveEquipped($item`Buddy Bjorn`)) bjornifyFamiliar(bjornChoice.familiar);
  if (haveEquipped($item`Crown of Thrones`)) enthroneFamiliar(bjornChoice.familiar);
}
export function embezzlerOutfit(...requirements: Requirement[]): void {
  const compiledReqs = Requirement.merge(requirements);

  const forceEquips: Item[] = [];

  const bjornChoice = pickBjorn(BonusEquipMode.EMBEZZLER);
  const bjornalike =
    forceEquips.some((equip) => toSlot(equip) === $slot`back`) ||
    (compiledReqs.maximizeOptions.forceEquip &&
      compiledReqs.maximizeOptions.forceEquip.some((equip) => toSlot(equip) === $slot`back`))
      ? $item`Crown of Thrones`
      : $item`Buddy Bjorn`;

  const bonusEquips = new Map<Item, number>([
    [bjornalike, bjornChoice.probability * bjornChoice.meatVal()],
    [$item`lucky gold ring`, 400],
    [$item`Mr. Cheeng's spectacles`, 250],
    [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
    [$item`Mr. Screege's spectacles`, 180],
    [$item`mafia thumb ring`, 0.04 * get("valueOfAdventure")],
  ]);
  Requirement.maximize(
    compiledReqs,
    new Requirement(["10.25 Meat Drop"], {
      forceEquip: forceEquips,
      bonusEquip: bonusEquips,
    })
  );
  if (haveEquipped($item`Buddy Bjorn`)) bjornifyFamiliar(bjornChoice.familiar);
  if (haveEquipped($item`Crown of Thrones`)) enthroneFamiliar(bjornChoice.familiar);
}
export function elfOutfit(): void {
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
  const bjornalike = forceEquips.some((equip) => toSlot(equip) === $slot`back`)
    ? $item`Crown of Thrones`
    : $item`Buddy Bjorn`;

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
        [bjornalike, bjornChoice.probability * bjornChoice.meatVal()],
        [$item`lucky gold ring`, 400],
        [$item`Mr. Cheeng's spectacles`, 250],
        [$item`pantogram pants`, get("_pantogramModifier").includes("Drops Items") ? 100 : 0],
        [$item`Mr. Screege's spectacles`, 180],
        [$item`garbage sticker`, 100],
      ]),
      preventEquip: $items`broken champagne bottle`,
    }
  ).maximize();

  if (haveEquipped($item`Buddy Bjorn`)) bjornifyFamiliar(bjornChoice.familiar);
  if (haveEquipped($item`Crown of Thrones`)) enthroneFamiliar(bjornChoice.familiar);
}
