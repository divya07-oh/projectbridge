import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MOCK_USER } from "@/data/mockData"
import { Wallet, TrendingUp, Download, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EarningsPage() {
  const payments = [
    { id: "1", date: "2024-05-15", project: "Restaurant Website", amount: 5000, status: "Completed" },
    { id: "2", date: "2024-04-28", project: "React Native Bug Fix", amount: 2500, status: "Completed" },
    { id: "3", date: "2024-04-10", project: "Logo Design", amount: 3000, status: "Completed" },
    { id: "4", date: "2024-03-22", project: "Inventory Tracker", amount: 8000, status: "Completed" },
  ]

  // Mock data for the chart - we will use a simple bar representation using div since we don't have a charting library installed.
  const chartData = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 8000 },
    { month: "Apr", amount: 5500 },
    { month: "May", amount: 5000 },
    { month: "Jun", amount: 0 },
  ]
  const maxAmount = Math.max(...chartData.map(d => d.amount), 10000)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Earnings</h1>
          <p className="text-muted-foreground">Manage your revenue and payment history.</p>
        </div>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Statement</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">₹{(MOCK_USER.stats.totalEarnings || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available for Withdrawal</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹5,000</div>
            <p className="text-xs text-muted-foreground mt-1">From recently completed projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Clearance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">₹0</div>
            <p className="text-xs text-muted-foreground mt-1">No pending payments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>Your revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2 pt-4">
              {chartData.map((data, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2">
                  <div 
                    className="w-full bg-primary/20 rounded-t-sm relative group"
                    style={{ height: `${(data.amount / maxAmount) * 100}%`, minHeight: data.amount > 0 ? '4px' : '0' }}
                  >
                    {data.amount > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                        ₹{data.amount}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>Transfer balance to your bank account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bank Account</span>
                <span className="font-medium">HDFC Bank ****1234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available Balance</span>
                <span className="font-medium">₹5,000</span>
              </div>
            </div>
            <Button className="w-full h-12" size="lg">Withdraw ₹5,000</Button>
            <p className="text-xs text-center text-muted-foreground">
              Transfers usually take 1-2 business days.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>All your completed and pending transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{payment.project}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}