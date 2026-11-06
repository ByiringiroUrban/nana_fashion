import { describe, expect, it } from "vitest";
import { cartTotals } from "@/lib/cart";

describe("cart totals", () => {
  it("uses discount price when available and sums quantities", () => {
    // m1 sale 19,500 x2 ; m2 full 22,000 x1
    expect(cartTotals([{ id: "m1", qty: 2 }, { id: "m2", qty: 1 }])).toEqual({ count: 3, total: 61000 });
  });
});
