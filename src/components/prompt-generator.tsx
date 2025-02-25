"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

const CELINE_DION = `As the youngest of fourteen children, Celine Dion was born on March 30, 1968, to Adhemer Dion and Terese Tanguay in the city of Charlemagne, Quebec, Canada. Her early life had always been deeply rooted in music; her parents, being musicians, owned a small piano bar named Le Vieux Baril where Celine and her siblings would perform. Although Dion lived in impoverished conditions, her parents continuously supported all of her musical aspirations. “Ever since I was a young girl, I always had only one dream: to be a singer,” states Dion in a 1994 interview with People magazine. She began pursuing this dream at the age of twelve, when she recorded a demo tape titled, “Ce n’etait qu’un reve”, with her mother and brother Jacques. One of Dion’s older brothers then sent the tape to music manager Rene Angelil in 1980, who was moved to tears by Celine’s voice. At that moment, Angelil decided to make Dion a star, and proceeded to mortgage his home to finance her debut record, “La voix du bon Dieu”. The record became a local hit, and encouraged her to participate in the Yamaha World Popular Song Festival in Tokyo, Japan, where she ended up winning “Top Performer” and “Best Song”. Rene Angelil’s and Celine’s parents’ unwavering belief in her paved the way for future successes in her career.`;
const CELINE_DION_OUTLINE = `I. **Introduction**  
   A. Background information on Celine Dion  
   B. Introduction to her early life and family background  
   C. Thesis statement: Despite growing up in poverty, Dion’s musical family and dedicated mentors helped her achieve early success in her career.  

II. **Early Life and Musical Beginnings**  
   A. Born on March 30, 1968, in Charlemagne, Quebec, Canada  
   B. Youngest of fourteen children in a musically inclined family  
   C. Parents owned a small piano bar, *Le Vieux Baril*, where she and her siblings performed  

III. **Pursuing Her Dream of Becoming a Singer**  
   A. Expressed passion for music from a young age  
   B. Created a demo tape, *Ce n’etait qu’un rêve*, at age twelve with her mother and brother  
   C. Older brother sent the tape to music manager Rene Angelil  

IV. **Discovery and Early Career Success**  
   A. Rene Angelil’s emotional reaction to her voice and decision to support her career  
   B. Angelil mortgaged his home to finance her debut album, *La voix du bon Dieu*  
   C. The album’s local success and its impact on her early career  

V. **Breakthrough at the Yamaha World Popular Song Festival**  
   A. Participation in the festival in Tokyo, Japan  
   B. Winning “Top Performer” and “Best Song” awards  
   C. Validation of her talent and the role of her family and manager in her success  

VI. **Conclusion**  
   A. Restate how her family’s and Angelil’s belief in her shaped her career  
   B. Summary of key moments in her early career  
   C. Closing thoughts on how her early struggles contributed to her later global success`;


const THE_HISTORY_OF_SPIDER_MAN = `The creator of Spider-man, Stan Lee, was wondering what to do next with the superhero franchise, Marvel. He wanted to make his next character unique:
“I never have any special model in mind when I write something. What you do is you try to imagine the character himself and then your biggest problem is staying true to the character you’ve imagined all the time that you're writing him, and the only model I had was a sort of generic average man. Maybe a little bit like me, because in school I wasn't exactly the captain of the football team and the most popular guy. [Peter Parker] was an average guy in school and so I was able to sort of figure —well— what would happen to me if I was in those situations?”`;
const THE_HISTORY_OF_SPIDER_MAN_OUTLINE = `I. **Introduction**  
   A. Introduction to Stan Lee and his role in Marvel  
   B. His desire to create a unique superhero character  
   C. Thesis statement: Stan Lee’s vision for Spider-Man was inspired by the idea of an average person facing extraordinary circumstances, making the character relatable and enduring.  

II. **Stan Lee’s Approach to Character Creation**  
   A. No specific model in mind when writing new characters  
   B. Focus on imagining the character’s personality and staying true to it  
   C. Desire to create someone unique within the superhero genre  

III. **Peter Parker as an “Average Man” Superhero**  
   A. Inspiration drawn from everyday, relatable experiences  
   B. Lee’s personal experiences as an average student influenced Peter Parker  
   C. Departure from traditional superheroes—Parker was not the strongest, most popular, or most confident  

IV. **The Relatability and Success of Spider-Man**  
   A. Peter Parker’s struggles resonated with readers (school, self-doubt, personal challenges)  
   B. Unlike traditional heroes, Spider-Man balanced real-life issues with heroism  
   C. The success of the character cemented Marvel’s reputation for humanizing superheroes  

V. **Conclusion**  
   A. Recap of Stan Lee’s creative philosophy and approach to Spider-Man  
   B. The impact of making a superhero grounded in reality  
   C. Closing thoughts on Spider-Man’s lasting appeal and influence in the superhero genre`;

const TOM_BRADY = `Tom Brady beginning his career. What he did in his career of binging.Tom Brady was born Aug 3 1977 . As he started to become a good player. He was really good at baseball and football.  When he was younger he wanted to go pro in baseball. And he wanted to go pro in football. He had the opportunity to be good as a kid but even better in his NFL career. Tom Brady what did he do in his NFL career? Tom Brady got drafted in the 2000 and 2001 years. At the beginning of his career he was the 3rd starter for the New England Patriots. In the 2 seasons the starting got hurt. He got the starting spot and his first super Bow out of many. That is a bit about Tom Brady's life and NFL career. TOM Brady went to the super bowl 10 times. He won 7 of the 10 super bowls of his whole career.  Everyone says he is the best player . He has seven more Super Bowls than other teams and players. He is the best player and he will for a bit. He did play for a long time but he has a lot of super bowls then more teams.`;
const TOM_BRADY_OUTLINE = `I. **Introduction**  
   A. Introduction to Tom Brady and his significance in football  
   B. Brief mention of his early athletic talents in both baseball and football  
   C. Thesis statement: Tom Brady’s dedication and perseverance led him from an uncertain beginning to becoming one of the greatest NFL players of all time.  

II. **Tom Brady’s Early Life and Athletic Background**  
   A. Born on August 3, 1977  
   B. Talented in both baseball and football during his youth  
   C. Considered going pro in baseball but ultimately pursued football  

III. **Beginning of His NFL Career**  
   A. Drafted in the 2000 NFL Draft by the New England Patriots  
   B. Initially the third-string quarterback for the team  
   C. Earned the starting position after an injury to the starting quarterback  

IV. **Rise to Stardom and Super Bowl Success**  
   A. Led the Patriots to his first Super Bowl victory early in his career  
   B. Continued success, appearing in 10 Super Bowls in total  
   C. Won 7 Super Bowls, more than any individual player or some entire teams  

V. **Legacy and Impact on Football**  
   A. Considered one of the greatest quarterbacks in NFL history  
   B. Known for his longevity, leadership, and winning mentality  
   C. His records and achievements set a high standard in the sport  

VI. **Conclusion**  
   A. Recap of his journey from an uncertain start to becoming an NFL legend  
   B. Emphasis on his work ethic and competitive spirit  
   C. Final thoughts on his lasting legacy in football history`;

const SHOHEI_OHTANI = `When Shohei got traded from the Angles to the Dodgers he went thru tommy john surgery he was not doing well.He did pretty good with the Angles and maybe he can do better with the dodgers he is going to pitch next year Shohei is good but he needs to get better at hitting and working on it.from playing as a dodger he shows skill and dedication. Shohei Ohtani is better at baseball than most athletes.Ohtani can hit and pitch and he can play anywhere in the outfield meaning that he can throw pretty well.Shohei won rookie of the year in 2018 and led the year in home runs and pitching.When Shohei players he proves that he is really good and proves that he can improve.Shohei is a baseball savant,doing what has never been done in MLB history. Ohtani was not only gratified to resume playing as a dodger.He threw 100+ and still hit a home run.He also hit ten home runs and 100 strikeouts.he also said it brings out his unique rhythm.Played for the the Japanese  team and struck out the last batter and made it to the championship game.He led the season in home runs and pitching.`;
const SHOHEI_OHTANI_OUTLINE = `I. **Introduction**  
   A. Introduction to Shohei Ohtani and his significance in baseball  
   B. Recent trade from the Angels to the Dodgers and recovery from Tommy John surgery  
   C. Thesis statement: Shohei Ohtani’s unique abilities as both a pitcher and hitter make him one of the most extraordinary players in MLB history.  

II. **Ohtani’s Early Success and Achievements**  
   A. Won AL Rookie of the Year in 2018  
   B. Excelled in both hitting and pitching, leading in home runs and strikeouts  
   C. His ability to play multiple positions sets him apart from most athletes  

III. **Challenges and Comeback**  
   A. Underwent Tommy John surgery, affecting his ability to pitch  
   B. Continued working on improving his hitting and overall performance  
   C. Transition from the Angels to the Dodgers and his potential to improve further  

IV. **Ohtani’s Unique Skills and Unprecedented Achievements**  
   A. Can both hit and pitch at an elite level  
   B. Threw over 100 mph while hitting home runs in the same game  
   C. Led the season in both home runs and pitching performances  

V. **International Success and Legacy**  
   A. Played for the Japanese national team and led them to a championship game  
   B. Struck out the last batter in a crucial moment  
   C. Demonstrates skill, dedication, and a strong work ethic  

VI. **Conclusion**  
   A. Recap of Ohtani’s journey from the Angels to the Dodgers  
   B. Emphasis on his exceptional two-way playing ability  
   C. Final thoughts on his impact and potential future success in MLB`;


enum Grade {
  A,
  F
}
function prompt(reference: string, outline: string, grade: Grade) {
  let p = `You are tasked with generating a new single paragraph essay based on a provided outline and topic, while replicating the writing style of a reference paragraph. Your goal is to mimic the reference paragraph’s grammar, voice, and style, but not its structure. Do not copy content or ideas from the reference paragraph.\n\n`;

  if (grade === Grade.A) {
    p += `The reference paragraph is well written, with perfect grammar and a clear, coherent structure. The new paragraph should mirror this high-quality writing: polished, refined, and grammatically flawless. Ensure clarity and coherence, while using your own structure and original ideas. This paragraph should recive a passing grade, or Grade A.`
  } else if (grade === Grade.F) {
    p += `The reference paragraph is poorly written. It has as many mistakes as possible, with frequent grammatical errors, shifting perspectives, and a weak structure. Incorporate similar errors and inconsistencies to replicate the poor writing quality, while still following the provided outline and topic. Include as many spelling mistakes as possible relative to the example. This paragraph should receive a failing grade, or a Grade F.`;
  }

  p += `

## Reference
${reference}

## Outline
${outline}`;
  return p;
}

// Give the opposite grade N essay.
const topicOptions = [
  { label: "Celine Dion", value: 0 },
  { label: "The History of Spider-Man", value: 1 },
  { label: "Tom Brady", value: 2 },
  { label: "Shohei Ohtani", value: 3 },
]

const refs: { reference: string, outline: string, grade: Grade }[] = [
  { reference: THE_HISTORY_OF_SPIDER_MAN, outline: CELINE_DION_OUTLINE, grade: Grade.A },
  { reference: CELINE_DION, outline: THE_HISTORY_OF_SPIDER_MAN_OUTLINE, grade: Grade.A },
  { reference: SHOHEI_OHTANI, outline: TOM_BRADY_OUTLINE, grade: Grade.F },
  { reference: TOM_BRADY, outline: SHOHEI_OHTANI_OUTLINE, grade: Grade.F },
]

export function PromptGenerator() {
  const [topic, setTopic] = useState<number | null>(null);

  return <Card>
    <CardHeader>
      <CardTitle>
        Prompt Generator
      </CardTitle>
      <CardDescription>
        Generates a prompt for a model to generate a new essay based on an original essay
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Label className="text-sm font-medium">Topic</Label>
      <Select value={topic?.toString()} onValueChange={(x) => setTopic(Number(x))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a topic" />
        </SelectTrigger>
        <SelectContent>
          {topicOptions.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardContent>
    <CardFooter>
      {topic !== null && <PromptDisplay prompt={prompt(refs[topic].reference, refs[topic].outline, refs[topic].grade)} />}
    </CardFooter>
  </Card>
}

function PromptDisplay({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    toast("Copied to clipboard")

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div className="relative rounded-lg border bg-card p-6 shadow-sm">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-8 w-8"
            aria-label={copied ? "Copied" : "Copy text"}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <article className="prose prose-neutral dark:prose-invert lg:prose-lg">
          <div className="whitespace-pre-wrap">{prompt}</div>
        </article>
      </div>
    </div>
  )
}
