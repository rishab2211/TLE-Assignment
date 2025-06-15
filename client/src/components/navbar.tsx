import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center  p-4 dark:bg-neutral-900 bg-neutral-100">
      <div className="text-lg font-semibold flex items-center gap-2">
        <img
          src="https://www.tle-eliminators.com/static/media/tle-eliminators.866328c32b7a996da404503789dfe6c0.svg"
          width={20}
          height={20}
        />
        <span>Student Management System</span>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <Avatar>
          <AvatarImage
            src="https://github.com/rishab2211.png"
            alt="@rishab-raj"
          />
          <AvatarFallback>Admin</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
