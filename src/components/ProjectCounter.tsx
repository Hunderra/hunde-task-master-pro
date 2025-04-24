
import { Badge } from "@/components/ui/badge"

interface ProjectCounterProps {
  count: number
}

export function ProjectCounter({ count }: ProjectCounterProps) {
  if (count === 0) return null
  
  return (
    <Badge variant="secondary" className="ml-auto">
      {count}
    </Badge>
  )
}
