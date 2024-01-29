import LogoLight from "@/assets/svg/logo-light"
import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"

const NavigationBar = ({ className }: { className?: ClassValue }) => (
  <nav className={cn("px-8 flex items-center", className)}>
    <LogoLight className="h-4" />
  </nav>
)

export default NavigationBar
