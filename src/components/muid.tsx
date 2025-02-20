"use client"

import type React from "react"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Author, encodeMUID, Topic, decodeMUID } from "@/lib/muid"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowDown, ArrowUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  { label: "TODO", value: Topic.TODO },
  { label: "Shohei Ohtani", value: Topic.SHOHEI_OHTANI },
]

const getAuthorLabel = (value: Author) => authorOptions.find((o) => o.value === value)?.label || "Unknown"
const getTopicLabel = (value: Topic) => topicOptions.find((o) => o.value === value)?.label || "Unknown"

export function MUIDEncoder() {
  const [author, setAuthor] = useState<Author>(Author.O3_MINI)
  const [topic, setTopic] = useState<Topic>(Topic.CELINE_DION)

  const muid = encodeMUID(author, topic)

  return (
    <Card className="p-6">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Author</Label>
            <Select value={String(author)} onValueChange={(x) => setAuthor(Number(x))}>
              <SelectTrigger>
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
            <Label>Topic</Label>
            <Select value={String(topic)} onValueChange={(x) => setTopic(Number(x))}>
              <SelectTrigger>
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
        </div>
        <div className="flex justify-center">
          <ArrowDown className="text-muted-foreground" />
        </div>
        <div className="flex justify-center">
          <Card className="bg-muted px-6 py-3">
            <span className="font-mono text-4xl font-bold tracking-wider">{muid}</span>
          </Card>
        </div>
      </div>
    </Card>
  )
}

export function MUIDDecoder() {
  const [input, setInput] = useState("")

  // Validate hex format
  const isValidFormat = /^[0-9A-F]{4}$/.test(input)
  const decoded = isValidFormat ? decodeMUID(input) : false

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    if (value.length <= 4 && /^[0-9A-F]*$/.test(value)) {
      setInput(value)
    }
  }

  return (
    <Card className="p-6">
      <div className="grid gap-6">
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
    </Card>
  )
}

