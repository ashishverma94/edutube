import * as React from "react"
import { cn } from "@/lib/utils"
import { OTPInput, OTPInputContext } from "input-otp"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex items-center justify-center text-sm transition-all outline-none",
        "h-9 w-9 border-y border-r border-input shadow-xs",
        "flex-1 h-14 rounded-xl border-2 text-center text-2xl font-mono font-black border-surface-300 bg-surface-100 text-gray-900",
        "data-[active=true]:z-10 data-[active=true]:border-primary-500 data-[active=true]:bg-primary-100 data-[active=true]:shadow-[0_0_0_4px_rgba(2,174,2,0.08)]",
        "aria-invalid:border-red-500 aria-invalid:bg-red-50 aria-invalid:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]",
        "data-[active=true]:aria-invalid:border-red-500 border-3 data-[active=true]:aria-invalid:ring-2 data-[active=true]:aria-invalid:ring-red-500/20",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}


export { InputOTP, InputOTPGroup, InputOTPSlot }
