import { MOCK_APPLICATIONS } from "@/data/mockData"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink, MoreHorizontal } from "lucide-react"

export default function ApplicationsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">Accepted</Badge>
      case 'Rejected':
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20">Rejected</Badge>
      case 'Reviewed':
        return <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Reviewed</Badge>
      default:
        return <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Applications</h1>
        <p className="text-muted-foreground">Track the status of your project proposals.</p>
      </div>

      <div className="border rounded-md bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_APPLICATIONS.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.projectTitle}</TableCell>
                <TableCell>{app.company}</TableCell>
                <TableCell>{new Date(app.appliedOn).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {MOCK_APPLICATIONS.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}