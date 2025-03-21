"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

// Mock data for user profile
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "January 2023",
  bidsCount: 42,
  winsCount: 7,
}

// Mock data for bidding history
const mockBiddingHistory = [
  {
    id: "bid1",
    auctionId: "auction1",
    auctionTitle: "Vintage Camera Collection",
    bidAmount: 250,
    bidTime: "2023-05-15T14:30:00",
    status: "outbid",
  },
  {
    id: "bid2",
    auctionId: "auction2",
    auctionTitle: "Antique Wooden Desk",
    bidAmount: 450,
    bidTime: "2023-06-20T10:15:00",
    status: "winning",
  },
  {
    id: "bid3",
    auctionId: "auction3",
    auctionTitle: "Rare Vinyl Records Set",
    bidAmount: 120,
    bidTime: "2023-07-05T16:45:00",
    status: "won",
  },
  {
    id: "bid4",
    auctionId: "auction4",
    auctionTitle: "Modern Art Painting",
    bidAmount: 1200,
    bidTime: "2023-08-10T09:30:00",
    status: "won",
  },
]

// Mock data for won auctions
const mockWonAuctions = mockBiddingHistory.filter((bid) => bid.status === "won")

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [biddingHistory, setBiddingHistory] = useState(mockBiddingHistory)
  const [wonAuctions, setWonAuctions] = useState(mockWonAuctions)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium">{user.joinDate}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bids</p>
                    <p className="font-medium">{user.bidsCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wins</p>
                    <p className="font-medium">{user.winsCount}</p>
                  </div>
                </div>
                <Button className="w-full">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Security
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Tabs defaultValue="bidding-history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bidding-history">Bidding History</TabsTrigger>
              <TabsTrigger value="won-auctions">Won Auctions</TabsTrigger>
            </TabsList>
            <TabsContent value="bidding-history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bidding History</CardTitle>
                  <CardDescription>View all your past bids and their current status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {biddingHistory.length > 0 ? (
                      biddingHistory.map((bid) => (
                        <div key={bid.id} className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-1">
                            <h3 className="font-medium">{bid.auctionTitle}</h3>
                            <p className="text-sm text-muted-foreground">
                              Bid: ${bid.bidAmount} • {new Date(bid.bidTime).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <Badge
                              variant={
                                bid.status === "winning" ? "default" : bid.status === "won" ? "success" : "secondary"
                              }
                            >
                              {bid.status === "winning" ? "Currently Winning" : bid.status === "won" ? "Won" : "Outbid"}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">You haven't placed any bids yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="won-auctions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Won Auctions</CardTitle>
                  <CardDescription>View all auctions you've won and proceed to checkout</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {wonAuctions.length > 0 ? (
                      wonAuctions.map((auction) => (
                        <div key={auction.id} className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-1">
                            <h3 className="font-medium">{auction.auctionTitle}</h3>
                            <p className="text-sm text-muted-foreground">
                              Final Bid: ${auction.bidAmount} • {new Date(auction.bidTime).toLocaleDateString()}
                            </p>
                          </div>
                          <Button size="sm">Checkout</Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">You haven't won any auctions yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

