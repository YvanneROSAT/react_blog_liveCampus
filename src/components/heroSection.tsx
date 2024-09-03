import {TypographyH1, TypographyP} from "@/components/ui/typography";

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center h-96">
            <TypographyH1>Welcome to my blog</TypographyH1>
            <TypographyP>
                This is a blog about all things web development. I hope you enjoy it!
            </TypographyP>
        </div>
    )
}