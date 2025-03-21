"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Clock, ArrowUpCircle } from "lucide-react"
import Link from "next/link"

// Mock auction data
const mockAuctions = [
  {
    id: "auction1",
    title: "Vintage Camera Collection",
    description: "A collection of rare vintage cameras from the 1950s.",
    currentBid: 200,
    minBidIncrement: 10,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    image: "/placeholder.svg?height=200&width=300",
    bids: 12,
  },
  {
    id: "auction2",
    title: "Antique Wooden Desk",
    description: "Beautifully crafted wooden desk from the Victorian era.",
    currentBid: 350,
    minBidIncrement: 25,
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    image: "/placeholder.svg?height=200&width=300",
    bids: 8,
  },
  {
    id: "auction3",
    title: "Rare Vinyl Records Set",
    description: "Collection of limited edition vinyl records from the 70s and 80s.",
    currentBid: 100,
    minBidIncrement: 5,
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    image: "/placeholder.svg?height=200&width=300",
    bids: 20,
  },
  {
    id: "auction4",
    title: "Modern Art Painting",
    description: "Original abstract painting by contemporary artist.",
    currentBid: 1000,
    minBidIncrement: 50,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    image: "/placeholder.svg?height=200&width=300",
    bids: 15,
  },
]

export default function AuctionList() {
  const [auctions, setAuctions] = useState(mockAuctions)
  const [bidAmounts, setBidAmounts] = useState<Record<string, number>>({})
  const { toast } = useToast()

  // Update time remaining every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render to update time displays
      setAuctions([...auctions])
    }, 1000)

    return () => clearInterval(interval)
  }, [auctions])

  const formatTimeRemaining = (endTimeStr: string) => {
    const endTime = new Date(endTimeStr).getTime()
    const now = Date.now()
    const diff = endTime - now

    if (diff <= 0) return "Ended"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m ${seconds}s`
  }

  const handleBidChange = (auctionId: string, value: string) => {
    const numValue = Number.parseInt(value, 10)
    if (!isNaN(numValue)) {
      setBidAmounts({
        ...bidAmounts,
        [auctionId]: numValue,
      })
    }
  }

  const placeBid = (auctionId: string) => {
    const auction = auctions.find((a) => a.id === auctionId)
    const bidAmount = bidAmounts[auctionId]

    if (!auction) return

    if (!bidAmount || bidAmount < auction.currentBid + auction.minBidIncrement) {
      toast({
        title: "Invalid bid amount",
        description: `Your bid must be at least $${auction.currentBid + auction.minBidIncrement}`,
        variant: "destructive",
      })
      return
    }

    // Update auction with new bid
    const updatedAuctions = auctions.map((a) => {
      if (a.id === auctionId) {
        return {
          ...a,
          currentBid: bidAmount,
          bids: a.bids + 1,
        }
      }
      return a
    })

    setAuctions(updatedAuctions)

    // Clear bid input
    setBidAmounts({
      ...bidAmounts,
      [auctionId]: 0,
    })

    toast({
      title: "Bid placed successfully!",
      description: `You are now the highest bidder on ${auction.title}`,
    })
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      {auctions.map((auction) => (
        <Card key={auction.id} className="overflow-hidden">
          <div className="relative">
            <img src={auction.image || "/placeholder.svg"} alt={auction.title} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 bg-background/90 text-foreground px-2 py-1 rounded-md flex items-center gap-1 text-sm">
              <Clock className="h-3 w-3" />
              {formatTimeRemaining(auction.endTime)}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg truncate">{auction.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">{auction.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current bid:</span>
                <span className="font-medium">${auction.currentBid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bids:</span>
                <span>{auction.bids}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <Input
                type="number"
                placeholder={`$${auction.currentBid + auction.minBidIncrement}+`}
                value={bidAmounts[auction.id] || ""}
                onChange={(e) => handleBidChange(auction.id, e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={() => placeBid(auction.id)}>
                <ArrowUpCircle className="h-4 w-4 mr-1" />
                Bid
              </Button>
            </div>
            <Link href={`/auctions/${auction.id}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

