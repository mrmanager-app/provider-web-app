import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="bg-card border-border flex h-16 w-full shrink-0 items-center justify-between border-b pt-5 pr-9 pb-4 pl-8">
      <div className="flex items-center gap-2">
        <div className="bg-primary flex size-8 items-center justify-center rounded-sm text-xs text-white">
          MR
        </div>
        <span className="text-primary-foreground text-base leading-5 font-semibold">
          Mr. Manager
        </span>
      </div>
      <div className="flex items-center gap-4.5">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <span className="text-primary-foreground text-base font-semibold">
            username
          </span>
          <span className="text-muted-foreground text-sm">
            email@example.com
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
