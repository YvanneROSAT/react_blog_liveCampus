import {TypographyH1, TypographyP} from "@/components/ui/typography";

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center h-96">
            <TypographyH1>Bienvenue sur mon blog</TypographyH1>
            <TypographyP>
                Ceci est un blog sur le développement web. J'espère que vous l'apprécierez !
            </TypographyP>
        </div>
    )
}