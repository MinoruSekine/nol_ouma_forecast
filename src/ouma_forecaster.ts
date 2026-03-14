/**
 * @overview Forecast quest of "Ouma-Irai"
 *           in Nobunaga's ambition Online.
 *
 * @author Minoru Sekine
 * @copyright Copyright 2026 Minoru Sekine
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

export type OumaForecastResult =
  | { succeeded: true; dungeon: string; quest: string }
  | { succeeded: false; error_detail: string };

type OumaForecastIndex =
  | { succeeded: true; dungeon: number; quest: number }
  | { succeeded: false; error_detail: string };

const oumaDict = [
  {
    dict_date: new Date('2026-01-01T09:30:00+0900'),
    dungeon_index: 1,
    quest_index: 4
  },
  {
    dict_date: new Date('2026-01-07T09:30:00+0900'),
    dungeon_index: 2,
    quest_index: 4
  },
  {
    dict_date: new Date('2026-01-14T09:30:00+0900'),
    dungeon_index: 3,
    quest_index: 3
  },
  {
    dict_date: new Date('2026-01-21T09:30:00+0900'),
    dungeon_index: 0,
    quest_index: 0
  }
] as const;

const oumaMap = [
    ['安計呂山の庵', ['危険な旅路', '御札の力', '鬼婆の獲物', '誾千代の白猫']],
    ['幻影館', ['村に平和を', '強欲領主', '変化の館', '利休と唐獅子', '金品奪還']],
    ['龍爪山古刹', ['いたずら天狗', '天狗崇拝者', '白と黒の野望', '敗者の魂', '破れた書物']],
    ['鶯谷姫塚', ['奇異なるもの', '宝物の守護者', '盗掘現場', '歴史探訪', '眠る者の怒り']]
] as const;

const dungeonSwitchDay: number = 3;  // Wed.
const dungeonSwitchHours: number = 0;  // 09:30JST
const dungeonSwitchMin: number = 30;

function isAfterDungeonSwitch(date: Date): boolean {
  return ((date.getUTCDay() == dungeonSwitchDay)
    && (((date.getUTCHours() == dungeonSwitchHours) && (date.getUTCMinutes() >= dungeonSwitchMin))
      || (date.getUTCHours() > dungeonSwitchHours)));
}

function getPrevQuestDate(date: Date): Date {
  const result = new Date(date);
  if (isAfterDungeonSwitch(result)) {
    result.setUTCDate(result.getUTCDate() - 22);
  } else {
    result.setUTCDate(result.getUTCDate() - 1);
  }
  result.setUTCHours(dungeonSwitchHours);
  result.setUTCMinutes(dungeonSwitchMin);
  result.setUTCSeconds(0);
  result.setUTCMilliseconds(0);

  return result;
}

function forecastOumaIndex(date: Date): OumaForecastIndex {
  if (date >= oumaDict[0].dict_date) {
    for (const i of oumaDict) {
      if (date.getTime() === i.dict_date.getTime()) {
        return { succeeded: true, dungeon: i.dungeon_index, quest: i.quest_index };
      }
    }

    const prevOumaIndex = forecastOumaIndex(getPrevQuestDate(date));
    if (prevOumaIndex.succeeded) {
      const numQuestsInDungeon = oumaMap[prevOumaIndex.dungeon][1].length;
      const quest_index = (prevOumaIndex.quest + 1) % numQuestsInDungeon;
      return { succeeded: true, dungeon: prevOumaIndex.dungeon, quest: quest_index };
    } else {
      return { succeeded: false, error_detail: prevOumaIndex.error_detail };
    }
  } else {
    return { succeeded: false, error_detail: "2025 or earlier is not supported." };
  }
}

export function forecastOuma(date: Date): OumaForecastResult {
  const resultIndex = forecastOumaIndex(date);
  if (resultIndex.succeeded) {
    return {
      succeeded: true,
      dungeon: oumaMap[resultIndex.dungeon][0],
      quest: oumaMap[resultIndex.dungeon][1][resultIndex.quest]
    };
  } else {
    return resultIndex;
  }
}
