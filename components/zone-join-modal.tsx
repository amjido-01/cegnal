"use client"

import { CheckCircle2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ZoneJoinModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  zoneName: string
  isFree?: boolean
}

export function ZoneJoinModal({ isOpen, onClose, onConfirm, zoneName, isFree = true }: ZoneJoinModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="items-center space-y-4">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-blue-600" />
          </div>

          <AlertDialogTitle className="text-xl text-center text-balance">
            Are you sure you want to join <span className="text-blue-600">{zoneName}</span>
            {isFree && " for free"}?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center text-muted-foreground">
            You will get access to all signals and updates from this zone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col gap-3 sm:flex-col">
          <AlertDialogAction
            onClick={onConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium"
          >
            Proceed to Zone
          </AlertDialogAction>
          <AlertDialogCancel onClick={onClose} className="w-full py-3 text-base font-medium mt-0">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
