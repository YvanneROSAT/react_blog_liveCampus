import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import { ChevronRight, Mail } from "lucide-react";

export default function DesignSysteme() {
  return (
    <div className="scroll-m-20 p-24">
      <TypographyH1>Taxing Laughter: The Joke Tax Chronicles</TypographyH1>
      <TypographyH2>The People of the Kingdom</TypographyH2>
      <TypographyH3>The Joke Tax</TypographyH3>
      <TypographyH4>People stopped telling jokes</TypographyH4>
      <TypographyP>
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </TypographyP>
      <div className="flex gap-5 pt-4">
        <TypographyH3>Button</TypographyH3>
        <Button>Read More</Button>
        <Button variant="destructive">Read More</Button>
        <Button variant="outline">Read More</Button>
        <Button variant="secondary">Read More</Button>
        <Button variant="ghost">Read More</Button>
        <Button variant="link">Read More</Button>
      </div>
      <div className="flex gap-5 pt-5">
      <TypographyH3>Button size</TypographyH3>
        <Button size="default">Read More</Button>
        <Button size="sm">Read More</Button>
        <Button size="lg">Read More</Button>
        <Button size="icon"><ChevronRight className="h-4 w-4" /></Button>
        <Button><Mail className="mr-2 h-4 w-4" />Login with Email</Button>
      </div>
    </div>
  );
}
