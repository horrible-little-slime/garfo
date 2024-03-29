import {
  buy,
  getCounters,
  haveEffect,
  inebrietyLimit,
  itemAmount,
  myAdventures,
  myInebriety,
  numericModifier,
  print,
  totalTurnsPlayed,
  use,
  useFamiliar,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $skill,
  get,
  getKramcoWandererChance,
  have,
  Requirement,
} from "libram";
import {
  advMacroAA,
  determineDraggableZoneAndEnsureAccess,
  itemFamiliar,
  meatFamiliar,
  PropertyManager,
  setChoice,
} from "./lib";
import { elfOutfit, embezzlerOutfit, freeFightOutfit } from "./outfit";
import Macro from "./combat";

function turnsEstimate(): number {
  return myAdventures() + (myInebriety() > inebrietyLimit() ? 0 : 60);
}

export function main(): void {
  const potionsNeeded = Math.ceil(
    (myAdventures() - haveEffect($effect`Transpondent`)) /
      numericModifier($item`transporter transponder`, "Effect Duration")
  );

  if (!have($item`transporter transponder`, potionsNeeded)) {
    buy(potionsNeeded - itemAmount($item`transporter transponder`), $item`transporter transponder`);
  }
  use(potionsNeeded, $item`transporter transponder`);

  if (get("_saberForceUses") < 5) {
    useFamiliar($familiar`Ninja Pirate Zombie Robot`);
    freeFightOutfit(new Requirement([], { forceEquip: $items`Fourth of May Cosplay Saber` }));
    setChoice(1387, 3);
    advMacroAA(
      $location`Domed City of Grimacia`,
      Macro.skill("use the force"),
      () => get("_saberForceUses") < 5
    );
  }

  PropertyManager.set({
    customCombatScript: "twiddle",
    battleAction: "custom combat script",
    dontStopForCounters: true,
    maximizerFoldables: true,
    trackVoteMonster: "free",
    autoSatisfyWithMall: true,
    autoSatisfyWithNPCs: true,
    autoSatisfyWithStorage: true,
    hpAutoRecovery: 0.35,
    hpAutoRecoveryTarget: 1.0,
    mpAutoRecovery: 0.25,
    mpAutoRecoveryTarget: 0.5,
  });

  while (
    turnsEstimate() > itemAmount($item`Map to Safety Shelter Grimace Prime`) &&
    myInebriety() <= inebrietyLimit()
  ) {
    if (
      get("_voteFreeFights") < 3 &&
      have($item`"I Voted!" sticker`) &&
      totalTurnsPlayed() % 11 === 1
    ) {
      useFamiliar($familiar`Ninja Pirate Zombie Robot`);
      freeFightOutfit(new Requirement([], { forceEquip: $items`"I Voted!" sticker` }));
      const freeVotesThusfar = get("_voteFreeFights");
      advMacroAA(
        determineDraggableZoneAndEnsureAccess(),
        Macro.stasis().kill(),
        () =>
          get("_voteFreeFights") === freeVotesThusfar &&
          have($item`"I Voted!" sticker`) &&
          totalTurnsPlayed() % 11 === 1
      );
    }

    if (getCounters("Digitize", -11, 0) !== "") {
      useFamiliar(meatFamiliar());
      embezzlerOutfit();
      advMacroAA(
        determineDraggableZoneAndEnsureAccess(),
        Macro.externalIf(
          myAdventures() * 1.1 <
            (3 - get("_sourceTerminalDigitizeUses")) *
              (5 *
                (get("_sourceTerminalDigitizeMonsterCount") *
                  (1 + get("_sourceTerminalDigitizeMonsterCount"))) -
                3),
          Macro.trySkill($skill`Digitize`)
        )
          .skill($skill`Sing Along`)
          .attack()
          .repeat(),
        () => getCounters("Digitize", -11, 0) !== ""
      );
    }

    if (have($item`protonic accelerator pack`) && get("questPAGhost") !== "unstarted") {
      const ghostLocation = get("ghostLocation") || $location`none`;
      if (ghostLocation === $location`none`) {
        throw `Something went wrong with my ghosts. Dammit, Walter Peck!`;
      }
      useFamiliar($familiar`Ninja Pirate Zombie Robot`);
      freeFightOutfit(new Requirement([], { forceEquip: $items`protonic accelerator pack` }));
      advMacroAA(
        ghostLocation,
        Macro.trySkill($skill`Shoot Ghost`)
          .trySkill($skill`Shoot Ghost`)
          .trySkill($skill`Shoot Ghost`)
          .trySkill($skill`Trap Ghost`),
        () => get("questPAGhost") !== "unstarted"
      );
    }

    if (have($item`Kramco Sausage-o-Matic™`) && getKramcoWandererChance() >= 1) {
      useFamiliar($familiar`Ninja Pirate Zombie Robot`);
      freeFightOutfit(new Requirement([], { forceEquip: $items`Kramco Sausage-o-Matic™` }));
      advMacroAA(
        determineDraggableZoneAndEnsureAccess(),
        Macro.stasis().kill(),
        () => getKramcoWandererChance() >= 1
      );
    }

    useFamiliar(itemFamiliar());
    elfOutfit();
    advMacroAA($location`Domed City of Grimacia`, Macro.kill());

    if (haveEffect($effect`Transpondent`) < myAdventures()) use($item`transporter transponder`);
  }

  if (
    itemAmount($item`distention pill`) <
    itemAmount($item`synthetic dog hair pill`) +
      itemAmount($item`Map to Safety Shelter Grimace Prime`)
  ) {
    setChoice(536, 1);
    while (
      itemAmount($item`distention pill`) <
        itemAmount($item`synthetic dog hair pill`) +
          itemAmount($item`Map to Safety Shelter Grimace Prime`) &&
      myAdventures() > 0
    ) {
      use($item`Map to Safety Shelter Grimace Prime`);
    }
  }
  setChoice(536, 2);
  while (have($item`Map to Safety Shelter Grimace Prime`) && myAdventures() > 0) {
    use($item`Map to Safety Shelter Grimace Prime`);
  }

  if (myAdventures() > 0) {
    print("Ran out of maps!", "red");
  } else if (have($item`Map to Safety Shelter Grimace Prime`)) {
    print("Ran out of turns!", "red");
  }
  PropertyManager.resetAll();
}
