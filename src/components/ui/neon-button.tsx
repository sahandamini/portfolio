import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ButtonNeon = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => (
  <Button
    className={cn(
      "bg-indigo-500 text-primary-foreground hover:bg-indigo-600 dark:text-foreground shadow-lg shadow-indigo-400 dark:shadow-indigo-700",
      className
    )}
    {...props}
  />
);

export default ButtonNeon;
