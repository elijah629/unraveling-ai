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
  TODO = 19,
  SHOHEI_OHTANI = 23,
}

export function encodeMUID(author: Author, topic: Topic): string {
  const product = author * topic
  return product.toString(16).padStart(4, "0").toUpperCase()
}

export function decodeMUID(muid: string): { author: Author; topic: Topic } | false {
  const product = Number.parseInt(muid, 16)

  // Check all possible author values
  for (const author of Object.values(Author)) {
    // Skip if not a number (enum contains both keys and values)
    if (typeof author !== "number") continue

    // If product is divisible by author, check if quotient is a valid topic
    if (product % author === 0) {
      const topic = product / author
      if (Object.values(Topic).includes(topic)) {
        return { author, topic: topic as Topic }
      }
    }
  }

  return false
}

