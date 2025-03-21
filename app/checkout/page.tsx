"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Check } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Mock data for checkout items
const mockCheckoutItems = [
  {
    id: "item1",
    title: "Antique Wooden Desk",
    finalBid: 450,
    shippingCost: 50,
    tax: 45,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "item2",
    title: "Rare Vinyl Records Set",
    finalBid: 120,
    shippingCost: 15,
    tax: 12,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const subtotal = mockCheckoutItems.reduce((sum, item) => sum + item.finalBid, 0)
  const shipping = mockCheckoutItems.reduce((sum, item) => sum + item.shippingCost, 0)
  const tax = mockCheckoutItems.reduce((sum, item) => sum + item.tax, 0)
  const total = subtotal + shipping + tax

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment successful!",
        description: "Your items will be shipped soon.",
        action: (
          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        ),
      })
      router.push("/profile")
    }, 2000)
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid gap-10 md:grid-cols-[1fr_350px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(123) 456-7890" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-5 w-5" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" placeholder="John Doe" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCheckoutItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">Final Bid: ${item.finalBid}</p>
                    </div>
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Complete Purchase"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

