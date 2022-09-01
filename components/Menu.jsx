import css from '../styles/Menu.module.css'
import Image from 'next/image';
import { urlFor } from "../lib/client";
import Link from 'next/link';

export default function Menu({pizzas}) {

    return (
        <div className={css.container}>
            <div className={css.heading}>
                <span>OUR Menu</span>
                <span>Menu that always</span>
                <span>make you Fall In Love</span>
            </div>

            {/* pizzas */}
            <div className={css.menu}>
                {
                    pizzas.map((pizza, id) => {
                        const src = urlFor(pizza.image).url()
                        return (
                            <div className={css.pizza} key={id}>
                                <div className={css.imageWrapper}>
                                    <Link href={`./pizza/${pizza.slug.current}`}>
                                        <Image
                                            loader = {() => src}
                                            src={src}
                                            alt=""
                                            objectFit='cover'
                                            layout='fill'
                                        />
                                    </Link>
                                </div>
                                <span>{pizza.name}</span>
                                <span>
                                    <span style={{color: "var(--themeRed)"}}>
                                        <span>&#8377;</span>
                                    </span>
                                    {pizza.price[1]}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}