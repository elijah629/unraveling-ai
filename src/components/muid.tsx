"use client"

import type React from "react"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Author, encodeMUID, Topic, decodeMUID, HumanizedStatus } from "@/lib/muid"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowDown, ArrowUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "./ui/switch"
import { MUIDDisplay } from "./muid-display"

const authorOptions = [
  { label: "o3-mini", value: Author.O3_MINI },
  { label: "Deepseek R1", value: Author.DEEPSEEK_R1 },
  { label: "gemini", value: Author.GEMINI },
  { label: "human-1", value: Author.HUMAN_1 },
  { label: "human-2", value: Author.HUMAN_2 },
  { label: "human-3", value: Author.HUMAN_3 },
]

const topicOptions = [
  { label: "Celine Dion", value: Topic.CELINE_DION },
  { label: "The History of Spider-Man", value: Topic.THE_HISTORY_OF_SPIDER_MAN },
  { label: "Tom Brady", value: Topic.TOM_BRADY },
  { label: "Shohei Ohtani", value: Topic.SHOHEI_OHTANI },
]

const getAuthorLabel = (value: Author) => authorOptions.find((o) => o.value === value)?.label || "Unknown"
const getTopicLabel = (value: Topic) => topicOptions.find((o) => o.value === value)?.label || "Unknown"


export function MUIDEncoder() {
  const [author, setAuthor] = useState<Author | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [humanizedStatus, setHumanizedStatus] = useState<HumanizedStatus>(HumanizedStatus.NOT_HUMANIZED);

  const muid = author && topic !== null ? encodeMUID(author, topic, humanizedStatus) : null

  return (
    <Card>
      <CardHeader>
        <CardTitle>MUID Encoder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Author</Label>
            <Select value={author?.toString()} onValueChange={(x) => setAuthor(Number(x))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an author" />
              </SelectTrigger>
              <SelectContent>
                {authorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
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
          </div>
          <div className="flex items-center justify-between sm:col-span-2">
            <Label htmlFor="humanized-switch" className="text-sm font-medium">
              Humanized
            </Label>
            <Switch
              id="humanized-switch"
              checked={humanizedStatus === HumanizedStatus.HUMANIZED}
              onCheckedChange={(checked) =>
                setHumanizedStatus(checked ? HumanizedStatus.HUMANIZED : HumanizedStatus.NOT_HUMANIZED)
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-center">
        <ArrowDown className="text-muted-foreground" />
        <MUIDDisplay muid={muid} />
      </CardFooter>
    </Card>
  )
}

export function MUIDDecoder() {
  const [input, setInput] = useState("")
  const isValidFormat = /^[0-9A-F]{4}$/.test(input)
  const decoded = isValidFormat ? decodeMUID(input) : null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    if (value.length <= 4 && /^[0-9A-F]*$/.test(value)) {
      setInput(value)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>MUID Decoder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Enter MUID</Label>
          <Input
            value={input}
            onChange={handleInputChange}
            className="font-mono font-bold text-center text-2xl"
            maxLength={4}
            placeholder="0000"
          />
        </div>
        <div className="py-6 space-y-6">
          <div className="flex justify-center">
            <ArrowUp className="text-muted-foreground" />
          </div>
          {input && (
            <div>
              {decoded ? (
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Author</Label>
                      <div className="font-medium">{getAuthorLabel(decoded.author)}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Topic</Label>
                      <div className="font-medium">{getTopicLabel(decoded.topic)}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">Humanized</Label>
                      <div className="font-medium">{decoded.humanized_status === HumanizedStatus.HUMANIZED ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {!isValidFormat
                      ? "Please enter a valid 4-digit hexadecimal number"
                      : "Invalid MUID - this combination does not exist"}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

