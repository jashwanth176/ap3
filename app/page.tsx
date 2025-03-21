import AuctionList from "@/components/auction-list"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Unique Items at Auction
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Bid on exclusive items from around the world. Our real-time platform ensures you never miss a chance
                  to win.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auctions">
                  <Button size="lg">
                    Browse Auctions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              src="/placeholder.svg?height=550&width=800"
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Auctions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Explore our most popular auctions ending soon. Don't miss your chance to bid!
              </p>
            </div>
          </div>
          <AuctionList />
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our auction platform is simple to use and secure for all transactions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="grid gap-2 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up for free and complete your profile to start bidding on items.
              </p>
            </div>
            <div className="grid gap-2 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Place Your Bids</h3>
              <p className="text-muted-foreground">Browse auctions and place bids on items you're interested in.</p>
            </div>
            <div className="grid gap-2 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Win & Checkout</h3>
              <p className="text-muted-foreground">
                If you win, complete your purchase securely through our checkout process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

