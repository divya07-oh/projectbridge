import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, ArrowUpRight, TrendingUp, Calendar, CreditCard, Download } from "lucide-react"

export default function BusinessPayments() {
  const payments = [
    { id: "tx1", project: "Restaurant Website", student: "Arjun Mehta", amount: "₹5,000", status: "Completed", date: "2024-05-01" },
    { id: "tx2", project: "Landing Page Design", student: "Priya Sharma", amount: "₹2,500", status: "Pending", date: "2024-05-10" },
    { id: "tx3", project: "Logo Redesign", student: "Rahul Verma", amount: "₹1,500", status: "Completed", date: "2024-04-20" },
    { id: "tx4", project: "Data Entry", student: "Arjun Mehta", amount: "₹800", status: "Completed", date: "2024-04-15" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Payments & Billing</h1>
          <p className="text-muted-foreground">Manage your project payments and view transaction history.</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Download Invoice Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹7,300</div>
              <div className="flex items-center text-xs text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3 mr-1" /> +12%
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹2,500</div>
              <div className="flex items-center text-xs text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                1 Project
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <div className="h-6 w-8 bg-muted rounded border flex items-center justify-center text-[10px] font-bold">VISA</div>
                <span className="font-medium text-sm">•••• 4242</span>
              </div>
              <Button variant="link" className="p-0 h-auto text-xs">Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Chart Mock */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending</CardTitle>
          <CardDescription>Your project expenditure over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full flex items-end justify-between gap-2 pt-4 px-2">
            {[40, 25, 60, 30, 85, 45].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full max-w-[40px]">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-500 ${i === 5 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`} 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'][i]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent payments made to students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/50 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-tl-md">Transaction ID</th>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium rounded-tr-md">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((tx, i) => (
                  <tr key={tx.id} className={`border-b last:border-0 hover:bg-muted/30 transition-colors`}>
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{tx.id.toUpperCase()}</td>
                    <td className="px-4 py-4 font-medium">{tx.project}</td>
                    <td className="px-4 py-4">{tx.student}</td>
                    <td className="px-4 py-4 text-muted-foreground">{tx.date}</td>
                    <td className="px-4 py-4 font-medium">{tx.amount}</td>
                    <td className="px-4 py-4">
                      <Badge variant="outline" className={
                        tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                        'bg-amber-50 text-amber-600 border-amber-200'
                      }>
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
