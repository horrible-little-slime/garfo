import { myFamiliar } from "kolmafia";
import { $familiar, $item, $items, get, getSaleValue, have } from "libram";
import { NumericModifier } from "libram/dist/modifierTypes";

export type BjornedFamiliar = {
  familiar: Familiar;
  meatVal: () => number;
  probability: number;
  dropPredicate?: () => boolean;
  modifier?: { modifier: NumericModifier; value: number };
};

const bjornFams: BjornedFamiliar[] = [
  {
    familiar: $familiar`Puck Man`,
    meatVal: () => getSaleValue($item`yellow pixel`),
    probability: 0.25,
    dropPredicate: () => get("_yellowPixelDropsCrown") < 25,
  },
  {
    familiar: $familiar`Ms. Puck Man`,
    meatVal: () => getSaleValue($item`yellow pixel`),
    probability: 0.25,
    dropPredicate: () => get("_yellowPixelDropsCrown") < 25,
  },
  {
    familiar: $familiar`Grimstone Golem`,
    meatVal: () => getSaleValue($item`grimstone mask`),
    probability: 0.5,
    dropPredicate: () => get("_grimstoneMaskDropsCrown") < 1,
  },
  {
    familiar: $familiar`Knob Goblin Organ Grinder`,
    meatVal: () => 30,
    probability: 1,
  },
  {
    familiar: $familiar`Happy Medium`,
    meatVal: () => 30,
    probability: 1,
  },
  {
    familiar: $familiar`Garbage Fire`,
    meatVal: () => getSaleValue($item`burning newspaper`),
    probability: 0.5,
    dropPredicate: () => get("_garbageFireDropsCrown") < 3,
  },
  {
    familiar: $familiar`Machine Elf`,
    meatVal: () =>
      getSaleValue(
        ...$items`abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose`
      ),
    probability: 0.2,
    dropPredicate: () => get("_abstractionDropsCrown") < 25,
  },
  {
    familiar: $familiar`Trick-or-Treating Tot`,
    meatVal: () => getSaleValue($item`hoarded candy wad`),
    probability: 0.5,
    dropPredicate: () => get("_hoardedCandyDropsCrown") < 3,
  },
  {
    familiar: $familiar`Warbear Drone`,
    meatVal: () => getSaleValue($item`warbear whosit`),
    probability: 1 / 4.5,
  },
  {
    familiar: $familiar`Li'l Xenomorph`,
    meatVal: () => getSaleValue($item`lunar isotope`),
    probability: 0.05,
    dropPredicate: undefined,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 15 },
  },
  {
    familiar: $familiar`Pottery Barn Owl`,
    meatVal: () => getSaleValue($item`volcanic ash`),
    probability: 0.1,
  },
  {
    familiar: $familiar`Grim Brother`,
    meatVal: () => getSaleValue($item`grim fairy tale`),
    probability: 1,
    dropPredicate: () => get("_grimFairyTaleDropsCrown") < 2,
  },
  {
    familiar: $familiar`Optimistic Candle`,
    meatVal: () => getSaleValue($item`glob of melted wax`),
    probability: 1,
    dropPredicate: () => get("_optimisticCandleDropsCrown") < 3,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 15 },
  },
  {
    familiar: $familiar`Adventurous Spelunker`,
    meatVal: () =>
      getSaleValue(
        ...$items`teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore`
      ),
    probability: 1,
    dropPredicate: () => get("_oreDropsCrown") < 6,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 15 },
  },
  {
    familiar: $familiar`Twitching Space Critter`,
    meatVal: () => getSaleValue($item`space beast fur`),
    probability: 1,
    dropPredicate: () => get("_spaceFurDropsCrown") < 1,
  },
  {
    familiar: $familiar`Party Mouse`,
    meatVal: () => 50,
    /*
    The below code is more accurate. However, party mouse is virtually never going to be worthwhile and this causes so many useless mall hits it isn't funny.
      getSaleValue(
        ...Item.all().filter(
          (booze) =>
            ["decent", "good"].includes(booze.quality) &&
            booze.inebriety > 0 &&
            booze.tradeable &&
            booze.discardable &&
            !$items`glass of "milk", cup of "tea", thermos of "whiskey", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy`.includes(
              booze
            )
        )
      ),
      */
    probability: 0.05,
  },
  {
    familiar: $familiar`Yule Hound`,
    meatVal: () => getSaleValue($item`candy cane`),
    probability: 1,
  },
  {
    familiar: $familiar`Gluttonous Green Ghost`,
    meatVal: () =>
      getSaleValue(...$items`bean burrito, enchanted bean burrito, jumping bean burrito`),
    probability: 1,
  },
  {
    familiar: $familiar`Reassembled Blackbird`,
    meatVal: () => getSaleValue($item`blackberry`),
    probability: 1,
    dropPredicate: undefined,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 15 },
  },
  {
    familiar: $familiar`Reconstituted Crow`,
    meatVal: () => getSaleValue($item`blackberry`),
    probability: 1,
    dropPredicate: undefined,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 15 },
  },
  {
    familiar: $familiar`Hunchbacked Minion`,
    meatVal: () =>
      0.02 * getSaleValue($item`disembodied brain`) + 0.98 * getSaleValue($item`skeleton bone`),
    probability: 1,
  },
  {
    familiar: $familiar`Reanimated Reanimator`,
    meatVal: () => getSaleValue(...$items`hot wing, broken skull`),
    probability: 1,
  },
  {
    familiar: $familiar`Attention-Deficit Demon`,
    meatVal: () =>
      getSaleValue(
        ...$items`chorizo brownies, white chocolate and tomato pizza, carob chunk noodles`
      ),
    probability: 1,
  },
  {
    familiar: $familiar`Piano Cat`,
    meatVal: () => getSaleValue(...$items`beertini, papaya slung, salty slug, tomato daiquiri`),
    probability: 1,
  },
  {
    familiar: $familiar`Golden Monkey`,
    meatVal: () => getSaleValue($item`gold nuggets`),
    probability: 0.5,
  },
  {
    familiar: $familiar`Robot Reindeer`,
    meatVal: () => getSaleValue(...$items`candy cane, eggnog, fruitcake, gingerbread bugbear`),
    probability: 0.3,
  },
  {
    familiar: $familiar`Stocking Mimic`,
    meatVal: () =>
      getSaleValue(
        ...$items`Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint`
      ),
    probability: 0.3,
  },
  {
    familiar: $familiar`BRICKO chick`,
    meatVal: () => getSaleValue($item`BRICKO brick`),
    probability: 1,
  },
  {
    familiar: $familiar`Cotton Candy Carnie`,
    meatVal: () => getSaleValue($item`cotton candy pinch`),
    probability: 1,
  },
  {
    familiar: $familiar`Untamed Turtle`,
    meatVal: () => getSaleValue(...$items`snailmail bits, turtlemail bits, turtle wax`),
    probability: 0.35,
  },
  {
    familiar: $familiar`Astral Badger`,
    meatVal: () => 2 * getSaleValue(...$items`spooky mushroom, Knob mushroom, Knoll mushroom`),
    probability: 1,
  },
  {
    familiar: $familiar`Green Pixie`,
    meatVal: () => getSaleValue($item`bottle of tequila`),
    probability: 0.2,
  },
  {
    familiar: $familiar`Angry Goat`,
    meatVal: () => getSaleValue($item`goat cheese pizza`),
    probability: 1,
  },
  {
    familiar: $familiar`Adorable Seal Larva`,
    meatVal: () =>
      getSaleValue(
        ...$items`stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets`
      ),
    probability: 0.35,
  },
  {
    familiar: $familiar`Ancient Yuletide Troll`,
    meatVal: () => getSaleValue(...$items`candy cane, eggnog, fruitcake, gingerbread bugbear`),
    probability: 0.3,
  },
  {
    familiar: $familiar`Sweet Nutcracker`,
    meatVal: () => getSaleValue(...$items`candy cane, eggnog, fruitcake, gingerbread bugbear`),
    probability: 0.3,
  },
  {
    familiar: $familiar`Hand Turkey`,
    meatVal: () => 30,
    probability: 1,
  },
  {
    familiar: $familiar`Leprechaun`,
    meatVal: () => 30,
    probability: 1,
  },
  {
    familiar: $familiar`Ghost of Crimbo Commerce`,
    meatVal: () => 30,
    probability: 1,
  },
  {
    familiar: $familiar`Rockin' Robin`,
    meatVal: () => 60,
    probability: 1,
    dropPredicate: undefined,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 15 },
  },
  {
    familiar: $familiar`Feral Kobold`,
    meatVal: () => 30,
    probability: 1,
    dropPredicate: undefined,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 15 },
  },
  {
    familiar: $familiar`Oily Woim`,
    meatVal: () => 30,
    probability: 1,
    dropPredicate: undefined,
    modifier: { modifier: "Item Drop" as NumericModifier, value: 10 },
  },
  {
    familiar: $familiar`Misshapen Animal Skeleton`,
    meatVal: () => 30,
    probability: 1,
    dropPredicate: undefined,
    modifier: { modifier: "Familiar Weight" as NumericModifier, value: 5 },
  },
  {
    familiar: $familiar`Frozen Gravy Fairy`,
    // drops a cold nugget every combat, 5 of which can be used to make a cold wad
    meatVal: () => Math.max(0.2 * getSaleValue($item`cold wad`), getSaleValue($item`cold nuggets`)),
    probability: 1,
  },
  {
    familiar: $familiar`Stinky Gravy Fairy`,
    // drops a stench nugget every combat, 5 of which can be used to make a stench wad
    meatVal: () =>
      Math.max(0.2 * getSaleValue($item`stench wad`), getSaleValue($item`stench nuggets`)),
    probability: 1,
  },
  {
    familiar: $familiar`Sleazy Gravy Fairy`,
    // drops a sleaze nugget every combat, 5 of which can be used to make a sleaze wad
    meatVal: () =>
      Math.max(0.2 * getSaleValue($item`sleaze wad`), getSaleValue($item`sleaze nuggets`)),
    probability: 1,
  },
  {
    familiar: $familiar`Spooky Gravy Fairy`,
    // drops a spooky nugget every combat, 5 of which can be used to make a spooky wad
    meatVal: () =>
      Math.max(0.2 * getSaleValue($item`spooky wad`), getSaleValue($item`spooky nuggets`)),
    probability: 1,
  },
  {
    familiar: $familiar`Flaming Gravy Fairy`,
    // drops a hot nugget every combat, 5 of which can be used to make a hot wad
    meatVal: () => Math.max(0.2 * getSaleValue($item`hot wad`), getSaleValue($item`hot nuggets`)),
    probability: 1,
  },
].filter((bjornFam) => have(bjornFam.familiar));

const bjornList: BjornedFamiliar[] = [];

function generateBjornList(): void {
  bjornList.push(...[...bjornFams].sort((a, b) => bjornValue(b) - bjornValue(a)));
}

export function pickBjorn(): BjornedFamiliar {
  if (!bjornList.length) {
    generateBjornList();
  }
  while (bjornList[0].dropPredicate && !bjornList[0].dropPredicate()) bjornList.shift();
  if (myFamiliar() !== bjornList[0].familiar) return bjornList[0];
  while (bjornList[1].dropPredicate && !bjornList[1].dropPredicate()) bjornList.splice(1, 1);
  return bjornList[1];
}

export const bjornValue: (choice: BjornedFamiliar) => number = (choice: BjornedFamiliar) =>
  !choice.dropPredicate || choice.dropPredicate() ? choice.meatVal() * choice.probability : 0;
