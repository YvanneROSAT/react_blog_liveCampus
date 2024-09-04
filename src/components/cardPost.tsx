import { TypographyH4, TypographyP } from "./ui/typography";
import { Link } from "react-router-dom";

type CardPostProps = {
    title: string;
    author: string;
    slug: string;
    summary: string;
    category: string;
    created_at: Date;
};

export default function CardPost({title, author, slug, summary, category, created_at}: CardPostProps) {
    return (
        <ul className="bg-slate-200 px-8 py-4 rounded-lg shadow-lg">
            <li>
                <TypographyH4 className="text-center">{title}</TypographyH4>
                <TypographyP className="text-sm leading-normal mb-3">{summary}</TypographyP>
                <p>
                    <strong>Auteur:</strong> {author}
                </p>
                <p>
                    <strong>Catégorie:</strong> {category}
                </p>
                <p>
                    <strong>Date de création:</strong>{" "}
                    {new Date(created_at).toLocaleDateString()}
                </p>
                <Link to={`post/${slug}`} className="text-blue-500 hover:underline">Lire plus</Link>
            </li>
        </ul>
    );

}