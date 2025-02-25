export enum Author {
  O3_MINI = 101,
  DEEPSEEK_R1 = 103,
  GEMINI = 107,
  HUMAN_1 = 109,
  HUMAN_2 = 113,
  HUMAN_3 = 127,
}

export enum Topic {
  CELINE_DION = 13,
  THE_HISTORY_OF_SPIDER_MAN = 17,
  TOM_BRADY = 19,
  SHOHEI_OHTANI = 23,
}

export enum HumanizedStatus {
  HUMANIZED = 3,
  NOT_HUMANIZED = 5
}

export function encodeMUID(author: Author, topic: Topic, humanized_status: HumanizedStatus): string {
  const product = author * topic * humanized_status;
  return product.toString(16).padStart(4, "0").toUpperCase()
}

function enumVals(enumObj: object): Set<number> {
  return new Set(Object.values(enumObj).filter(x => typeof x === "number"));
}


class PrimeDecoder<T extends Record<string, number>> {
  private product: number;
  private fields: Partial<T> | false = {};

  constructor(product: number) {
    this.product = product;
  }

  addField(key: string, enumObj: object): this {
    if (this.fields === false) {
      return this;
    }

    const vals = enumVals(enumObj);

    for (const val of vals) {
      if (this.product % val === 0) {
        (this.fields as Record<string, number>)[key] = val;
        this.product /= val;

        return this;
      }
    }
    this.fields = false;
    return this;
  }

  decode(): T | false {
    return this.fields === false ? false : (this.fields as T);
  }
}

export function decodeMUID(muid: string): { author: Author; topic: Topic; humanized_status: HumanizedStatus } | false {
  const product = Number.parseInt(muid, 16);

  const decoder = new PrimeDecoder<{
    author: Author;
    topic: Topic;
    humanized_status: HumanizedStatus;
  }>(product)
    .addField("author", Author)
    .addField("topic", Topic)
    .addField("humanized_status", HumanizedStatus);

  return decoder.decode();
}
