import { TitreProps } from '../../../interface/components/common/titre.interface';

function Titre({ title, balise = 'h1', hasBorderBottom = false }: TitreProps) {
    const TagName = balise as keyof JSX.IntrinsicElements;
    let titreClass = 'titre';
    if (hasBorderBottom) {
        titreClass += ' gradient-border';
    }

    return <TagName className={titreClass}>{title}</TagName>;
}

export default Titre;
