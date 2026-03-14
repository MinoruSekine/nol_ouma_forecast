/**
 * @overview Tests for forecasting quest of "Ouma-Irai"
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

import { forecastOuma } from '../src/ouma_forecaster.js'

import { describe, test } from 'node:test';
import * as assert  from 'node:assert';

describe('forecastOuma', () => {
  test('Before 2026/01/01 must be unsupported', () => {
    const result = forecastOuma(new Date("2025-12-31T00:00:00Z"));
    assert.strictEqual(result.succeeded, false);
  });

  const test_cases = [
    { date_str: "2026-01-01T09:30:00+0900",
      expected_dungeon: "幻影館",
      expected_quest: "金品奪還" },
    { date_str: "2026-01-07T00:30:00Z",
      expected_dungeon: "龍爪山古刹",
      expected_quest: "破れた書物" },
    { date_str: "2026-01-14T00:30:00Z",
      expected_dungeon: "鶯谷姫塚",
      expected_quest: "歴史探訪" },
    { date_str: "2026-01-21T00:30:00Z",
      expected_dungeon: "安計呂山の庵",
      expected_quest: "危険な旅路" },
    { date_str: "2026-01-28T09:30+0900",
      expected_dungeon: "幻影館",
      expected_quest: "村に平和を" },
    { date_str: "2026-03-18T00:29:59Z",
      expected_dungeon: "鶯谷姫塚",
      expected_quest: "眠る者の怒り" },
    { date_str: "2026-03-18T00:30:00Z",
      expected_dungeon: "安計呂山の庵",
      expected_quest: "鬼婆の獲物" }
  ];
  test_cases.forEach(({ date_str, expected_dungeon, expected_quest }) => {
    test(`${date_str} must be ${expected_dungeon}:${expected_quest}`, () => {
      const result = forecastOuma(new Date(date_str));
      assert.ok(result.succeeded);
      assert.ok(result.dungeon.includes(expected_dungeon), `${result.dungeon}`);
      assert.ok(result.quest.includes(expected_quest), `${result.quest}`);
    });
  });
});
