const { Shop, Item } = require("./gilded_rose.js");

describe("Gilded Rose", () => {
  const inventory = [];

  beforeEach(async () => {
    inventory.push(new Item("Normal Item", 2, 5));
    inventory.push(new Item("Aged Brie", 2, 0));
    inventory.push(new Item("Sulfuras, Hand of Ragnaros", 0, 20));
    inventory.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 5)
    );
  });

  const timeTravel = (numOfDays) => {
    const gildedRose = new Shop(inventory);

    for (let i = 1; i <= numOfDays - 1; i++) {
      gildedRose.updateQuality();
    }

    return gildedRose.updateQuality();
  };

  it("should decrease sellIn and quality by 1 per day for normal items", () => {
    let items = timeTravel(1);
    expect(items[0].name).toBe("Normal Item");
    expect(items[0].sellIn).toEqual(1);
    expect(items[0].quality).toEqual(4);

    items = timeTravel(2);
    expect(items[0].name).toBe("Normal Item");
    expect(items[0].sellIn).toEqual(0);
    expect(items[0].quality).toEqual(3);
  });

  it("should decrease normal items' quality by 2 per day after sellIn reaches 0", () => {
    const items = timeTravel(3);
    expect(items[0].name).toBe("Normal Item");
    expect(items[0].sellIn).toEqual(-1);
    expect(items[0].quality).toEqual(1);
  });

  it("item quality will never drop below 0", () => {
    const items = timeTravel(50);
    expect(items[0].name).toBe("Normal Item");
    expect(items[0].quality).toEqual(0);
  });

  it("Aged Brie's quality increases by 1 per day before sellIn reaches 0", () => {
    const items = timeTravel(2);
    expect(items[1].name).toBe("Aged Brie");
    expect(items[1].sellIn).toEqual(0);
    expect(items[1].quality).toEqual(2);
  });

  it("Aged Brie's quality increases twice as fast after sellIn reaches 0", () => {
    const items = timeTravel(4);
    expect(items[1].name).toBe("Aged Brie");
    expect(items[1].sellIn).toEqual(-2);
    expect(items[1].quality).toEqual(6);
  });

  it("item quality is never more than 50", () => {
    const items = timeTravel(50);
    expect(items[1].name).toBe("Aged Brie");
    expect(items[1].quality).toEqual(50);
  });

  it("Sulfuras' quality and sellIn does not decrease over time", () => {
    let items = timeTravel(50);
    expect(items[2].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[2].sellIn).toEqual(0);
    expect(items[2].quality).toEqual(20);
  });

  it("Backstage Passes' quality increases by 1 per day when concert's more than 10 days away", () => {
    const items = timeTravel(1);
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toEqual(14);
    expect(items[3].quality).toEqual(6);
  });

  it("Backstage Passes' quality increases by 2 per day when concert's less than 10 days but more than 5 days away", () => {
    let items = timeTravel(5);
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toEqual(10);
    expect(items[3].quality).toEqual(10);

    items = timeTravel(6);
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toEqual(9);
    expect(items[3].quality).toEqual(12);
  });

  it("Backstage Passes' quality increases by 3 per day when concert's less than 5 days away", () => {
    let items = timeTravel(10);
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toEqual(5);
    expect(items[3].quality).toEqual(20);

    items = timeTravel(11);
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toEqual(4);
    expect(items[3].quality).toEqual(23);
  });

  it("Backstage Passes' quality drops to 0 after concert's over", () => {
    let items = timeTravel(15);
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toEqual(0);
    expect(items[3].quality).toEqual(35);

    items = timeTravel(16);
    expect(items[3].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[3].sellIn).toEqual(-1);
    expect(items[3].quality).toEqual(0);
  });
});
