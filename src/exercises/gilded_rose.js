class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map((i) => new Item(i.name, i.sellIn, i.quality));
  }
  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case "Aged Brie":
          item.quality = item.quality + (item.sellIn > 0 ? 1 : 2);
          item.sellIn--;
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          item.quality =
            item.quality + (item.sellIn > 10 ? 1 : item.sellIn > 5 ? 2 : 3);
          if (item.sellIn <= 0) {
            item.quality = 0;
          }
          item.sellIn--;
          break;
        default:
          item.quality = item.quality - (item.sellIn > 0 ? 1 : 2);
          item.sellIn--;
      }

      item.quality = item.quality > 50 ? 50 : item.quality;
      item.quality = item.quality < 0 ? 0 : item.quality;
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
