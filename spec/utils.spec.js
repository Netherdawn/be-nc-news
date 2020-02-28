const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("If passed an empty array, will return an empty array", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("If passed an array of a single item with only unix date, will return array with element's date swapped for valid string date", () => {
    const input = [{ created_at: 1542284514171 }];
    expect(formatDates(input)).to.eql([
      { created_at: "Thu, 15 Nov 2018 12:21:54 GMT" }
    ]);
  });
  it("If passed an array of a single item array with full data set incling unix date, will return array with element's date swapped for valid string date and additional info", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(formatDates(input)).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu, 15 Nov 2018 12:21:54 GMT",
        votes: 100
      }
    ]);
  });
  it("If passed a long array with full data set including unix date, will return long array with date swapped for valid string date and additional info", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    expect(formatDates(input)).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "Thu, 15 Nov 2018 12:21:54 GMT",
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: "Sun, 16 Nov 2014 12:21:54 GMT"
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "Wed, 17 Nov 2010 12:21:54 GMT"
      }
    ]);
  });
  it("expect returned array and objects to not bve mutated versions of the original input", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const expected = formatDates(input);
    expect(expected).to.not.equal(input);
    for (let i = 0; i < expected.length; i++) {
      expect(expected[i]).to.not.equal(input[i]);
    }
  });
});

describe("makeRefObj", () => {
  it("returns an empty object if passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("when passed an array of a single item with simple object, returns reference key with keyvalue pair of title to article_id", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(makeRefObj(input)).to.eql({
      "Living in the shadow of a great man": 1
    });
  });
  it("when passed an array of a single item with complex object, returns reference key with keyvalue pair of title to article_id", () => {
    const input = [
      { article_id: 1, title: "Living in the shadow of a great man" }
    ];
    expect(makeRefObj(input)).to.eql({
      "Living in the shadow of a great man": 1
    });
  });
  it("when passed long array with complex objects, returns reference key with each keyvalue pair of titles to article_id's", () => {
    const input = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        article_id: 2,
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    expect(makeRefObj(input)).to.eql({
      "Living in the shadow of a great man": 1,
      "Sony Vaio; or, The Laptop": 2,
      "Eight pug gifs that remind me of mitch": 3
    });
  });
});

describe("formatComments", () => {
  it("when passed an empty array returns an empty array", () => {
    expect(formatComments([])).to.eql([]);
  });
  it("when passed a simple array with a simple object adds a keyvalue pair for the matching title from the ref obj", () => {
    const input = [
      {
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "whazzam"
      }
    ];
    const refObj = { "They're not exactly dogs, are they?": 1 };
    const result = formatComments(input, refObj);
    expect(result[0]).to.contain.keys(["article_id"]);
    expect(result[0].article_id).to.eql(1);
  });
  it("when passed a an array of a single item with a complex object adds a keyvalue pair for the matching title from the ref obj", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const refObj = { "They're not exactly dogs, are they?": 1 };
    const result = formatComments(input, refObj);
    expect(result[0]).to.contain.keys(["article_id"]);
    expect(result[0].article_id).to.eql(1);
  });
  it("when passed an array of a single item with a simple object changess a keyvalue pair of created_by to author", () => {
    const input = [
      {
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "whazzam"
      }
    ];
    const refObj = { "They're not exactly dogs, are they?": 1 };
    const result = formatComments(input, refObj);
    expect(result[0]).to.contain.keys(["author"]);
    expect(result[0]).to.not.contain.keys(["created_by"]);
    expect(result[0].author).to.eql("whazzam");
  });
  it("when passed an array of a single item with a complex object changess a keyvalue pair of created_by to author", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const refObj = { "They're not exactly dogs, are they?": 1 };
    const result = formatComments(input, refObj);
    expect(result[0]).to.contain.keys(["author"]);
    expect(result[0]).to.not.contain.keys(["created_by"]);
    expect(result[0].author).to.eql("butter_bridge");
  });
  it("when passed a long array with a complex object adds a keyvalue pair for the matching title from the ref obj for each item", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389
      }
    ];
    const refObj = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2
    };

    const testRefObj = {
      1: "They're not exactly dogs, are they?",
      2: "Living in the shadow of a great man"
    };

    const result = formatComments(input, refObj);
    result.forEach(item => {
      expect(item).to.contain.keys(["article_id"]);
      expect(item).to.not.contain.keys(["belongs_to"]);
      if (item.article_id === 1) {
        expect(testRefObj[item.article_id]).to.eql(
          "They're not exactly dogs, are they?"
        );
      } else {
        expect(testRefObj[item.article_id]).to.eql(
          "Living in the shadow of a great man"
        );
      }
    });
  });
  it("when passed a long array with a complex object changes keyvalue pair of created_by to author for each item", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389
      }
    ];
    const refObj = {
      "They're not exactly dogs, are they?": 1,
      "Living in the shadow of a great man": 2
    };

    const result = formatComments(input, refObj);

    for (let i = 0; i < result.length; i++) {
      expect(result[i]).to.contain.keys(["author"]);
      expect(result[i]).to.not.contain.keys(["created_by"]);
      expect(result[i].author).to.eql(input[i].created_by);
    }
  });
  it("expect the return array to not be a mutated version of the original", () => {
    it("when passed a long array with a complex object adds a keyvalue pair for the matching title from the ref obj for each item", () => {
      const input = [
        {
          body:
            "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          belongs_to: "They're not exactly dogs, are they?",
          created_by: "butter_bridge",
          votes: 16,
          created_at: 1511354163389
        },
        {
          body:
            "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          belongs_to: "Living in the shadow of a great man",
          created_by: "butter_bridge",
          votes: 14,
          created_at: 1479818163389
        },
        {
          body:
            "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
          belongs_to: "Living in the shadow of a great man",
          created_by: "icellusedkars",
          votes: 100,
          created_at: 1448282163389
        }
      ];
      const refObj = {
        "They're not exactly dogs, are they?": 1,
        "Living in the shadow of a great man": 2
      };
      const result = formatComments(input, refObj);
      expect(result).to.not.equal(input);
      for (let i = 0; i < result.length; i++) {
        expect(result[i].to.not.equal(input[i]));
      }
    });
  });
});
